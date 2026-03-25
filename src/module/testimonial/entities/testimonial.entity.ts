import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity()
export class Testimonial {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    client_name: string;

    @Column({ nullable: true })
    profession: string;

    @Column({ nullable: true })
    location: string;

    @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
    rating: number; // e.g., 4.5

    @Column({ type: 'text' })
    review_text: string;

    @Column({ nullable: true })
    image: string; // Client image URL

    @Column({ default: true })
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;
}
