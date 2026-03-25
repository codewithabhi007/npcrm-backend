import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Partner } from './entities/partner.entity';
import { CreatePartnerDto } from './dto/create-partner.dto';

@Injectable()
export class PartnerService {
    constructor(
        @InjectRepository(Partner)
        private readonly partnerRepository: Repository<Partner>,
    ) {}

    async create(createPartnerDto: CreatePartnerDto): Promise<Partner> {
        const partner = this.partnerRepository.create(createPartnerDto);
        return await this.partnerRepository.save(partner);
    }

    async findAll(): Promise<Partner[]> {
        return await this.partnerRepository.find({
            where: { is_active: true },
            order: { name: 'ASC' },
        });
    }

    async findOne(id: number): Promise<Partner> {
        const partner = await this.partnerRepository.findOne({
            where: { id, is_active: true },
        });

        if (!partner) {
            throw new NotFoundException(`Partner with ID ${id} not found`);
        }

        return partner;
    }
}
