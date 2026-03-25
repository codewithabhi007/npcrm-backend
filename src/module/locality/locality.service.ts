import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Locality } from './entities/locality.entity';
import { CreateLocalityDto } from './dto/create-locality.dto';

@Injectable()
export class LocalityService {
    constructor(
        @InjectRepository(Locality)
        private readonly localityRepository: Repository<Locality>,
    ) {}

    async create(createLocalityDto: CreateLocalityDto): Promise<Locality> {
        const locality = this.localityRepository.create(createLocalityDto);
        return await this.localityRepository.save(locality);
    }

    async findAll(): Promise<Locality[]> {
        return await this.localityRepository.find({
            order: { name: 'ASC' },
        });
    }

    async findOne(id: number): Promise<Locality> {
        const locality = await this.localityRepository.findOne({
            where: { id },
            relations: ['projects'],
        });

        if (!locality) {
            throw new NotFoundException(`Locality with ID ${id} not found`);
        }

        return locality;
    }

    async findByCity(city: string): Promise<Locality[]> {
        return await this.localityRepository.find({
            where: { city },
            order: { name: 'ASC' },
        });
    }
}
