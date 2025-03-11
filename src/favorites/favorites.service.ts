import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities';
import { Repository } from 'typeorm';
import { Property } from 'src/properties/entities';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,

    @InjectRepository(Property)
    private readonly _propertyRepository: Repository<Property>,

    @InjectRepository(Favorite)
    private readonly _favoriteRepository: Repository<Favorite>,
  ){}

  async addFavorite(dto: CreateFavoriteDto) {
    const user = await this._userRepository.findOneBy({ id: dto.userId });
    const property = await this._propertyRepository.findOne({ where: { id: dto.propertyId } });
  
    if (!user || !property) throw new NotFoundException({ status: 404, message: 'User or Property not found' });
  
    const favorite = this._favoriteRepository.create({ user, property });
    return this._favoriteRepository.save(favorite);
  }
  
}
