import { IsString, IsOptional } from 'class-validator';

export class CreateLocalityDto {
    @IsString()
    name: string;

    @IsString()
    city: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsString()
    @IsOptional()
    description?: string;
}
