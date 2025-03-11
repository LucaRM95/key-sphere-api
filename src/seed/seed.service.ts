import { Injectable } from '@nestjs/common';
import { PropertiesService } from '../properties/properties.service';
import { initialData } from './data/seed-data';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  private users = [];

  constructor(
    private readonly _propertiesService: PropertiesService,
    private readonly _userService: UsersService,
  ) {}

  async runSeed() {
    await this._insertNewUsers();
    await this._insertNewProperties();
    return { status: 200, message: 'Seed Executed' };
  }

  private async _insertNewUsers() {
    await this._propertiesService.deleteAllProperties();
    await this._userService.deleteAllUsers();

    const seedUsers = initialData.users;

    const insertPromises = seedUsers.map(async (user) => {
      const hashedPass = await bcrypt.hash(user.password, 10);
      return this._userService.create({ ...user, password: hashedPass });
    });

    this.users = await Promise.all(insertPromises);

    return;
  }

  private async _insertNewProperties() {
    const seedProperties = initialData.properties;

    const insertPromises = seedProperties.map((property) =>
      this._propertiesService.create({
        ...property,
        ownerId: this.users[Math.floor(Math.random() * 3)].id,
      }),
    );

    await Promise.all(insertPromises);

    return;
  }
}
