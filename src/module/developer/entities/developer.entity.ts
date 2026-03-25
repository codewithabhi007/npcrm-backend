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
export class Developer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    logo: string; // Logo URL

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'json', nullable: true })
    contact_info: {
        email?: string;
        phone?: string;
        website?: string;
        address?: string;
    };

    @OneToMany(() => Project, (project) => project.developer)
    projects: Project[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
