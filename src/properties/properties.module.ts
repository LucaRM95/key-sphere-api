import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PropertiesController } from './properties.controller'
import { PropertiesService } from './properties.service'
import { Property, PropertyImage } from './entities'
import { User } from '../users/entities'

@Module( {
    controllers: [ PropertiesController ],
    providers: [ PropertiesService ],
    imports: [
        TypeOrmModule.forFeature( [
            User,
            Property,
            PropertyImage
        ] )
    ],
    exports: [ PropertiesService ]
} )
export class PropertiesModule { }
