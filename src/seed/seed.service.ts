import { Injectable } from '@nestjs/common';
import { PropertiesService } from '../properties/properties.service'
import { initialData } from './data/seed-data'
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SeedService {
    constructor ( 
        private readonly _propertiesService: PropertiesService,
        private readonly _userService: UsersService 
    ) { }

    async runSeed () {
        await this._insertNewProperties();
        await this._insertNewUsers();
        return 'Seed Executed';
    }

    private async _insertNewProperties () {
        await this._propertiesService.deleteAllProducts()

        const seedProperties = initialData.properties

        const insertPromises = []

        seedProperties.forEach( property => {
            insertPromises.push( this._propertiesService.create( property ) )
        } )

        await Promise.all( insertPromises )

        return
    }

    private async _insertNewUsers () {
        await this._userService.deleteAllUsers();

        const seedUsers = initialData.users;

        const instertPromises = [];

        seedUsers.forEach( user => {
            instertPromises.push( this._userService.create(user) );
        });

        await Promise.all( instertPromises );

        return
    }
}
