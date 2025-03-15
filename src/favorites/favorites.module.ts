import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from 'src/properties/entities';
import { User } from 'src/users/entities';
import { Favorite } from './entities/favorite.entity';

@Module({
  controllers: [FavoritesController],
  imports: [
      TypeOrmModule.forFeature( [
          User,
          Property,
          Favorite
      ] )
  ],
  providers: [FavoritesService],
})
export class FavoritesModule {}
