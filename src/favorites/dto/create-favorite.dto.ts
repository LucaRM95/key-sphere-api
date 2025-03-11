import { IsString, IsUUID } from "class-validator";

export class CreateFavoriteDto {
    @IsUUID()
    id: string

    @IsUUID()
    userId: string;

    @IsUUID()
    propertyId: string;
}
