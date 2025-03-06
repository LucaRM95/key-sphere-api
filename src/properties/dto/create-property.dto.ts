import { IsArray, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, IsUUID, MinLength } from 'class-validator'

export class CreatePropertyDto {
    @IsString()
    @MinLength( 1 )
    title: string

    @IsOptional()
    @IsString()
    description?: string

    @IsString()
    @MinLength(1)
    address: string
    
    @IsOptional()
    @IsString( { each: true } )
    @IsArray()
    images?: string[]

    @IsOptional()
    @IsNumber()
    @IsPositive()
    price?: number

    @IsOptional()
    @IsString()
    slug?: string

    @IsOptional()
    @IsString( { each: true } )
    @IsArray()
    tags?: string[]

    @IsNumber()
    area: number

    @IsNumber()
    rooms: number

    @IsNumber()
    beds: number

    @IsNumber()
    baths: number

    @IsBoolean()
    @IsOptional()
    status?: boolean

    @IsUUID()
    ownerId: string
}