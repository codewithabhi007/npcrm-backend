import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Locality } from '../../locality/entities/locality.entity';
import { Developer } from '../../developer/entities/developer.entity';

export enum ProjectStatus {
    UPCOMING = 'upcoming',
    ONGOING = 'ongoing',
    COMPLETED = 'completed',
    LAUNCHED = 'launched',
}

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    price_min: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    price_max: number;

    @Column({ type: 'decimal', precision: 8, scale: 2 })
    sqft_min: number;

    @Column({ type: 'decimal', precision: 8, scale: 2 })
    sqft_max: number;

    @Column('simple-array', { nullable: true })
    bhk_options: string[]; // e.g., ['1', '2', '3', '4']

    @Column('simple-array', { nullable: true })
    images: string[]; // Array of image URLs

    @Column({
        type: 'enum',
        enum: ProjectStatus,
        default: ProjectStatus.UPCOMING,
    })
    status: ProjectStatus;

    @Column({ default: false })
    is_featured: boolean; // For recommended projects

    @Column({ default: false })
    is_new: boolean; // For newly launched projects

    @Column({ default: 0 })
    view_count: number; // For trending calculation

    @Column({ default: 0 })
    favorite_count: number; // For trending calculation

    @ManyToOne(() => Locality, (locality) => locality.projects, { nullable: false })
    @JoinColumn({ name: 'locality_id' })
    locality: Locality;

    @Column()
    locality_id: number;

    @ManyToOne(() => Developer, (developer) => developer.projects, { nullable: false })
    @JoinColumn({ name: 'developer_id' })
    developer: Developer;

    @Column()
    developer_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
