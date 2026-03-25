import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Testimonial } from './entities/testimonial.entity';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';

@Injectable()
export class TestimonialService {
    constructor(
        @InjectRepository(Testimonial)
        private readonly testimonialRepository: Repository<Testimonial>,
    ) {}

    async create(createTestimonialDto: CreateTestimonialDto): Promise<Testimonial> {
        const testimonial = this.testimonialRepository.create(createTestimonialDto);
        return await this.testimonialRepository.save(testimonial);
    }

    async findAll(page: number = 1, limit: number = 10): Promise<{ data: Testimonial[]; total: number; page: number; limit: number; totalPages: number }> {
        const [data, total] = await this.testimonialRepository.findAndCount({
            where: { is_active: true },
            order: { created_at: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });

        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findOne(id: number): Promise<Testimonial> {
        const testimonial = await this.testimonialRepository.findOne({
            where: { id, is_active: true },
        });

        if (!testimonial) {
            throw new NotFoundException(`Testimonial with ID ${id} not found`);
        }

        return testimonial;
    }
}
