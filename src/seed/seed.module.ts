import { SeedService } from './seed.service'
import { SeedController } from './seed.controller'
import { PropertiesModule } from 'src/properties/properties.module'
import { Module } from '@nestjs/common'
import { UsersModule } from 'src/users/users.module'

@Module( {
    imports: [ UsersModule, PropertiesModule ],
    controllers: [ SeedController ],
    providers: [ SeedService ]
} )
export class SeedModule { }
