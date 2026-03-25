import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateDeveloperDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    logo?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsObject()
    @IsOptional()
    contact_info?: {
        email?: string;
        phone?: string;
        website?: string;
        address?: string;
    };
}
