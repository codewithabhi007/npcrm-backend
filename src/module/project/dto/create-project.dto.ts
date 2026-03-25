import { IsString, IsNumber, IsArray, IsEnum, IsBoolean, IsOptional, Min } from 'class-validator';
import { ProjectStatus } from '../entities/project.entity';

export class CreateProjectDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @Min(0)
    price_min: number;

    @IsNumber()
    @Min(0)
    price_max: number;

    @IsNumber()
    @Min(0)
    sqft_min: number;

    @IsNumber()
    @Min(0)
    sqft_max: number;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    bhk_options?: string[];

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    images?: string[];

    @IsEnum(ProjectStatus)
    @IsOptional()
    status?: ProjectStatus;

    @IsBoolean()
    @IsOptional()
    is_featured?: boolean;

    @IsBoolean()
    @IsOptional()
    is_new?: boolean;

    @IsNumber()
    locality_id: number;

    @IsNumber()
    developer_id: number;
}
