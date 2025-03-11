import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @Post('login')
  login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.login(email, password);
  }

  @Post('signup')
  signup(
    @Body('name') name: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('phone') phone: number,
    @Body('role') role: string,
    @Body('password') password: string,
    @Body('confirmPassword') confirmPassword: string
  ) {
    return this.authService.signup(
      name,
      lastName,
      email,
      phone,
      role,
      password,
      confirmPassword
    );
  }

  @Get("me")
  @UseGuards(AuthGuard("jwt"))
  me(@Request() req){
    return this.authService.me(req.user.email);
  }
}
