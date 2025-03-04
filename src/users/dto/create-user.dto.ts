import { IsEmail, IsNumber, IsOptional, IsString, IsStrongPassword, MinLength } from 'class-validator'

export class CreateUserDto {
    @IsString()
    @MinLength( 1 )
    name: string

    @IsString()
    @MinLength(1)
    lastName: string
    
    @IsEmail()
    email: string

    @IsStrongPassword()
    password: string

    @IsNumber()
    @IsOptional()
    phone?: number

    @IsNumber()
    @IsOptional()
    celPhone?: number
}