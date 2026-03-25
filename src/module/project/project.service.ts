import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between, In } from 'typeorm';
import { Project, ProjectStatus } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { SearchProjectDto } from './dto/search-project.dto';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) {}

    async create(createProjectDto: CreateProjectDto): Promise<Project> {
        const project = this.projectRepository.create(createProjectDto);
        return await this.projectRepository.save(project);
    }

    async findAll(searchDto: SearchProjectDto) {
        const {
            search,
            city,
            price_min,
            price_max,
            sqft_min,
            sqft_max,
            bhk,
            locality_id,
            developer_id,
            page = 1,
            limit = 10,
        } = searchDto;

        const queryBuilder = this.projectRepository
            .createQueryBuilder('project')
            .leftJoinAndSelect('project.locality', 'locality')
            .leftJoinAndSelect('project.developer', 'developer')
            .where('1=1');

        // Search by project name, locality, or developer
        if (search) {
            queryBuilder.andWhere(
                '(project.name ILIKE :search OR locality.name ILIKE :search OR developer.name ILIKE :search)',
                { search: `%${search}%` },
            );
        }

        // Filter by city
        if (city) {
            queryBuilder.andWhere('locality.city ILIKE :city', { city: `%${city}%` });
        }

        // Price range filter
        if (price_min !== undefined || price_max !== undefined) {
            if (price_min !== undefined && price_max !== undefined) {
                queryBuilder.andWhere(
                    '(project.price_min <= :price_max AND project.price_max >= :price_min)',
                    { price_min, price_max },
                );
            } else if (price_min !== undefined) {
                queryBuilder.andWhere('project.price_max >= :price_min', { price_min });
            } else if (price_max !== undefined) {
                queryBuilder.andWhere('project.price_min <= :price_max', { price_max });
            }
        }

        // Sqft range filter
        if (sqft_min !== undefined || sqft_max !== undefined) {
            if (sqft_min !== undefined && sqft_max !== undefined) {
                queryBuilder.andWhere(
                    '(project.sqft_min <= :sqft_max AND project.sqft_max >= :sqft_min)',
                    { sqft_min, sqft_max },
                );
            } else if (sqft_min !== undefined) {
                queryBuilder.andWhere('project.sqft_max >= :sqft_min', { sqft_min });
            } else if (sqft_max !== undefined) {
                queryBuilder.andWhere('project.sqft_min <= :sqft_max', { sqft_max });
            }
        }

        // BHK filter - check if bhk is in the bhk_options array
        if (bhk) {
            queryBuilder.andWhere('project.bhk_options LIKE :bhkPattern', {
                bhkPattern: `%${bhk}%`,
            });
        }

        // Locality filter
        if (locality_id) {
            queryBuilder.andWhere('project.locality_id = :locality_id', { locality_id });
        }

        // Developer filter
        if (developer_id) {
            queryBuilder.andWhere('project.developer_id = :developer_id', { developer_id });
        }

        // Pagination
        const skip = (page - 1) * limit;
        queryBuilder.skip(skip).take(limit);

        // Order by created_at desc
        queryBuilder.orderBy('project.created_at', 'DESC');

        const [data, total] = await queryBuilder.getManyAndCount();

        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findOne(id: number): Promise<Project> {
        const project = await this.projectRepository.findOne({
            where: { id },
            relations: ['locality', 'developer'],
        });

        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }

        // Increment view count
        project.view_count += 1;
        await this.projectRepository.save(project);

        return project;
    }

    async getRecommended(limit: number = 10): Promise<Project[]> {
        return await this.projectRepository.find({
            where: { is_featured: true },
            relations: ['locality', 'developer'],
            take: limit,
            order: { created_at: 'DESC' },
        });
    }

    async getNewlyLaunched(limit: number = 10): Promise<Project[]> {
        return await this.projectRepository.find({
            where: { is_new: true },
            relations: ['locality', 'developer'],
            take: limit,
            order: { created_at: 'DESC' },
        });
    }

    async getTrending(limit: number = 10): Promise<Project[]> {
        // Trending based on view_count and favorite_count
        return await this.projectRepository.find({
            relations: ['locality', 'developer'],
            take: limit,
            order: {
                view_count: 'DESC',
                favorite_count: 'DESC',
            },
        });
    }

    async getByLocality(localityId: number): Promise<Project[]> {
        return await this.projectRepository.find({
            where: { locality_id: localityId },
            relations: ['locality', 'developer'],
            order: { created_at: 'DESC' },
        });
    }

    async getFilterOptions() {
        // Get distinct values for filters
        const projects = await this.projectRepository.find({
            relations: ['locality', 'developer'],
        });

        const cities = [...new Set(projects.map((p) => p.locality.city))];
        const localities = [...new Set(projects.map((p) => ({ id: p.locality.id, name: p.locality.name })))];
        const developers = [...new Set(projects.map((p) => ({ id: p.developer.id, name: p.developer.name })))];
        const bhkOptions = [...new Set(projects.flatMap((p) => p.bhk_options || []))];

        const priceRange = {
            min: Math.min(...projects.map((p) => Number(p.price_min))),
            max: Math.max(...projects.map((p) => Number(p.price_max))),
        };

        const sqftRange = {
            min: Math.min(...projects.map((p) => Number(p.sqft_min))),
            max: Math.max(...projects.map((p) => Number(p.sqft_max))),
        };

        return {
            cities,
            localities,
            developers,
            bhk_options: bhkOptions.sort(),
            price_range: priceRange,
            sqft_range: sqftRange,
        };
    }
}
