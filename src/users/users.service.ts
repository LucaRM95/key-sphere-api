import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource, Repository } from 'typeorm';
import { PostgreSQLErrorCodes } from 'src/commons/enums/db-error-codes.enum';
import { isUUID } from 'class-validator';
import { User } from './entities';
import { InjectRepository } from '@nestjs/typeorm';



@Injectable()
export class UsersService {
  private readonly _logger = new Logger('UsersService');

  constructor (
    @InjectRepository( User ) private readonly _userRepository: Repository<User>,
    private readonly _dataSource: DataSource
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this._userRepository.create(createUserDto)

      await this._userRepository.save( user );
      return user;
    } catch (error) {
      this._handleDBException( error )
    }
  }

  async findOne(uid: string) {
    let user: User

    if( isUUID(uid)) 
      user = await this._userRepository.findOneBy({ id: uid });

    if( !user )
      throw new NotFoundException(`There are no results for the search. Search uid: ${ uid }`);
  
    return user;
  }

  async findByEmail(email: string) {
    let user: User;
    
    if(email.length > 0){
      user = await this._userRepository.findOne({ where: { email }, relations: ['properties'] });
    }
    if(email.length === 0)
      throw new NotFoundException(`There are no results for the search. Search uid: ${ email }`);


    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this._userRepository.preload( {
        id, ...updateUserDto
    } )

    if ( !user )
        throw new NotFoundException( `User with id '${ id }' not found` )

    const queryRunner = this._dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      await queryRunner.manager.save( user )
      await queryRunner.commitTransaction()
      await queryRunner.release()

      return user;
    } catch ( error ) {
      await queryRunner.rollbackTransaction()
      await queryRunner.release()

      this._handleDBException( error )
    }
  }

  async remove(id: string) {
    const user = await this.findOne( id )
    await this._userRepository.remove( user )
  }

  private _handleDBException ( error: any ) {
    if ( error.code === PostgreSQLErrorCodes.NOT_NULL_VIOLATION )
        throw new BadRequestException( error.detail )

    if ( error.code === PostgreSQLErrorCodes.UNIQUE_VIOLATION )
        throw new BadRequestException( error.detail )

    this._logger.error( error )
    console.error( error )
    throw new InternalServerErrorException( "Unexpected error, check server logs" )
  }

  async deleteAllUsers () {
    const query = this._userRepository.createQueryBuilder( 'user' )

    try {
        return await query
            .delete()
            .where( {} )
            .execute()
    } catch ( error ) {
        this._handleDBException( error )
    }
}
}
