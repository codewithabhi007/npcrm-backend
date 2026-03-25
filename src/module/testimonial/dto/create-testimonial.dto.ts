import { IsString, IsNumber, IsOptional, IsBoolean, Min, Max } from 'class-validator';

export class CreateTestimonialDto {
    @IsString()
    client_name: string;

    @IsString()
    @IsOptional()
    profession?: string;

    @IsString()
    @IsOptional()
    location?: string;

    @IsNumber()
    @Min(0)
    @Max(5)
    @IsOptional()
    rating?: number;

    @IsString()
    review_text: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}
