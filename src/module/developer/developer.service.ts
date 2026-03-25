import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Developer } from './entities/developer.entity';
import { CreateDeveloperDto } from './dto/create-developer.dto';

@Injectable()
export class DeveloperService {
    constructor(
        @InjectRepository(Developer)
        private readonly developerRepository: Repository<Developer>,
    ) {}

    async create(createDeveloperDto: CreateDeveloperDto): Promise<Developer> {
        const developer = this.developerRepository.create(createDeveloperDto);
        return await this.developerRepository.save(developer);
    }

    async findAll(): Promise<Developer[]> {
        return await this.developerRepository.find({
            order: { name: 'ASC' },
        });
    }

    async findOne(id: number): Promise<Developer> {
        const developer = await this.developerRepository.findOne({
            where: { id },
            relations: ['projects'],
        });

        if (!developer) {
            throw new NotFoundException(`Developer with ID ${id} not found`);
        }

        return developer;
    }
}
