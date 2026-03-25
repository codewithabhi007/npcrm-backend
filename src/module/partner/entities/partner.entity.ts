import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

export enum PartnerType {
    BUILDER = 'builder',
    BANK = 'bank',
    NBFC = 'nbfc',
    INTERIOR = 'interior',
    LAWYER = 'lawyer',
    OTHER = 'other',
}

@Entity()
export class Partner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    logo: string; // Logo URL

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({
        type: 'enum',
        enum: PartnerType,
        default: PartnerType.OTHER,
    })
    partner_type: PartnerType;

    @Column({ default: true })
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
