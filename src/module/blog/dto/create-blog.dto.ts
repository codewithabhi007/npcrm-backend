import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateBlogDto {
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsString()
    @IsOptional()
    author?: string;

    @IsDateString()
    @IsOptional()
    published_date?: string;

    @IsBoolean()
    @IsOptional()
    is_published?: boolean;
}
