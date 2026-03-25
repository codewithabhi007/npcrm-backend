import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Project } from '../../project/entities/project.entity';

@Entity()
export class Locality {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    city: string;

    @Column({ nullable: true })
    image: string; // Image URL

    @Column({ type: 'text', nullable: true })
    description: string;

    @OneToMany(() => Project, (project) => project.locality)
    projects: Project[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
