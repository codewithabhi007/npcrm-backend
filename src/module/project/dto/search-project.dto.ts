import { IsString, IsNumber, IsEnum, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export enum ProjectType {
    PROJECTS = 'projects',
    RESALE = 'resale',
    RENTALS = 'rentals',
    EVENTS = 'events',
}

export class SearchProjectDto {
    @IsString()
    @IsOptional()
    city?: string;

    @IsEnum(ProjectType)
    @IsOptional()
    type?: ProjectType;

    @IsString()
    @IsOptional()
    search?: string; // Search in project name, locality, developer

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    @Min(0)
    price_min?: number;

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    @Min(0)
    price_max?: number;

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    @Min(0)
    sqft_min?: number;

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    @Min(0)
    sqft_max?: number;

    @IsString()
    @IsOptional()
    bhk?: string; // e.g., '1', '2', '3', '4'

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    locality_id?: number;

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    developer_id?: number;

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    @Min(1)
    page?: number = 1;

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    @Min(1)
    @Max(50)
    limit?: number = 10;
}
