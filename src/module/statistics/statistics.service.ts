import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../project/entities/project.entity';
import { Developer } from '../developer/entities/developer.entity';
import { Partner, PartnerType } from '../partner/entities/partner.entity';

@Injectable()
export class StatisticsService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        @InjectRepository(Developer)
        private readonly developerRepository: Repository<Developer>,
        @InjectRepository(Partner)
        private readonly partnerRepository: Repository<Partner>,
    ) {}

    async getStatistics() {
        const [projectsCount, developersCount, partners] = await Promise.all([
            this.projectRepository.count(),
            this.developerRepository.count(),
            this.partnerRepository.find({ where: { is_active: true } }),
        ]);

        // Count partners by type
        const interiorCount = partners.filter((p) => p.partner_type === PartnerType.INTERIOR).length;
        const bankNbfcCount = partners.filter(
            (p) => p.partner_type === PartnerType.BANK || p.partner_type === PartnerType.NBFC,
        ).length;
        const lawyerCount = partners.filter((p) => p.partner_type === PartnerType.LAWYER).length;

        // Count team members (this could be from a separate entity in the future)
        // For now, we'll use a placeholder or count from partners
        const teamCount = partners.length;

        return {
            projects: projectsCount,
            builders: developersCount,
            interior_decoration: interiorCount,
            banks_nbfcs: bankNbfcCount,
            team_partners: teamCount,
            lawyers: lawyerCount,
        };
    }
}
