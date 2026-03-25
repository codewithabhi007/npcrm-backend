import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog)
        private readonly blogRepository: Repository<Blog>,
    ) {}

    async create(createBlogDto: CreateBlogDto): Promise<Blog> {
        const blog = this.blogRepository.create(createBlogDto);
        return await this.blogRepository.save(blog);
    }

    async findAll(page: number = 1, limit: number = 10): Promise<{ data: Blog[]; total: number; page: number; limit: number; totalPages: number }> {
        const [data, total] = await this.blogRepository.findAndCount({
            where: { is_published: true },
            order: { published_date: 'DESC', created_at: 'DESC' },
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

    async findOne(id: number): Promise<Blog> {
        const blog = await this.blogRepository.findOne({
            where: { id, is_published: true },
        });

        if (!blog) {
            throw new NotFoundException(`Blog with ID ${id} not found`);
        }

        return blog;
    }
}
