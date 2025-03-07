import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException({ status: 401, message: 'Invalid Credentials' });

    const payload = { 
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };
    return {
      status: 200,
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(
    name: string,
    lastName: string,
    email: string,
    phone: number,
    role: string,
    password: string,
    confirmPassword: string
  )
  {
    const user = await this.usersService.findByEmail( email );
    if(user)
      throw new ConflictException({ status: 409, message: `There is an user with email ${email}.` });

    if(password !== confirmPassword)
      throw new ConflictException({ status: 409, message: "The passwords are not the same." });

    const hashed_passwd = await bcrypt.hash(password, 10);

    await this.usersService.create({ name, lastName, email, phone, password: hashed_passwd, role });

    return {
      status: 201,
      message: "User created successfully."
    };
  }
}
