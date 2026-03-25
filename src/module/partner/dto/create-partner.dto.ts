import { IsString, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { PartnerType } from '../entities/partner.entity';

export class CreatePartnerDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    logo?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(PartnerType)
    @IsOptional()
    partner_type?: PartnerType;

    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}
