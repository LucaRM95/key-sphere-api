import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { isUUID } from 'class-validator'
import { DataSource, Repository } from 'typeorm'

import { PaginationDto } from '../commons/dto/pagination.dto'
import { PostgreSQLErrorCodes } from '../commons/enums/db-error-codes.enum'
import { CreatePropertyDto } from './dto/create-property.dto'
import { UpdatePropertyDto } from './dto/update-property.dto'
import { Property, PropertyImage } from './entities'
import { User } from 'src/users/entities'

@Injectable()
export class PropertiesService {
    private readonly _logger = new Logger( 'PropertiesService' )

    constructor (
        @InjectRepository( Property ) private readonly _propertyRepository: Repository<Property>,
        @InjectRepository( User ) private readonly _userRepository: Repository<User>,
        @InjectRepository( PropertyImage ) private readonly _propertyImageRepository: Repository<PropertyImage>,
        private readonly _dataSource: DataSource
    ) { }

    async create ( createPropertyDto: CreatePropertyDto ) {
        try {
            const { ownerId, images = [], ...propertyDetails } = createPropertyDto

            const owner = await this._userRepository.findOneBy({ id: ownerId });
            const property = this._propertyRepository.create( {
                ...propertyDetails,
                images: images.map( url => this._propertyImageRepository.create( { url } ) ),
                owner
            } )

            await this._propertyRepository.save( property )
            return { status: 200, message: "Property created successfully!" }
        } catch ( error ) {
            return {status: 400, message: this._handleDBException( error )}
        }
    }

    async findAll ( { limit = 10, offset = 0 }: PaginationDto ) {
        const { 0: data, 1: totalResults } = await this._propertyRepository.findAndCount( {
            take: limit, skip: offset,
            relations: {
                images: true
            }
        } )
        if ( !data.length || totalResults == 0 )
            throw new NotFoundException( `There aren't results for the search` )

        return {
            offset, limit,
            partialResults: data.length, totalResults,
            data: data.map( ( { images, ...property } ) => ( { ...property, images: images.map( img => img.url ) } ) )
        }
    }

    async findOne ( term: string ) {
        let property: Property

        if ( isUUID( term ) )
            property = await this._propertyRepository.findOneBy( { id: term } )

        if ( !property )
            property = await this._propertyRepository.createQueryBuilder( 'property' )
                .where( 'UPPER(title) = UPPER(:title) or slug = LOWER(:slug)', { title: term, slug: term } )
                .leftJoinAndSelect( 'property.images', 'propertyImages' )
                .getOne()

        if ( !property )
            throw new NotFoundException( `There are no results for the search. Search term: ${ term }` )

        return property
    }

    async findOnePlain ( term: string ) {
        const { images = [], ...rest } = await this.findOne( term )
        return {
            ...rest,
            images: images.map( image => image.url )
        }
    }

    async update ( id: string, updatePropertyDto: UpdatePropertyDto ) {
        const { images, ...toUpdate } = updatePropertyDto

        const property = await this._propertyRepository.preload( {
            id, ...toUpdate
        } )

        if ( !property )
            throw new NotFoundException( `Product with id '${ id }' not found` )

        const queryRunner = this._dataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            if ( images ) {
                await queryRunner.manager.delete( PropertyImage, {
                    product: { id }
                } )

                property.images = images.map( url => this._propertyImageRepository.create( { url } ) )
            }

            await queryRunner.manager.save( property )
            await queryRunner.commitTransaction()
            await queryRunner.release()

            return this.findOnePlain( id )

        } catch ( error ) {
            await queryRunner.rollbackTransaction()
            await queryRunner.release()

            this._handleDBException( error )
        }
    }

    async remove ( id: string ) {
        const product = await this.findOne( id )
        await this._propertyRepository.remove( product )
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

    async deleteAllProperties () {
        const query = this._propertyRepository.createQueryBuilder( 'product' )

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
