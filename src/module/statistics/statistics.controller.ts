import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StatisticsService } from './statistics.service';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
    constructor(private readonly statisticsService: StatisticsService) {}

    @Get()
    @ApiOperation({ summary: 'Get platform statistics' })
    @ApiResponse({
        status: 200,
        description: 'Platform statistics including projects count, builders, partners, etc.',
    })
    getStatistics() {
        return this.statisticsService.getStatistics();
    }
}
