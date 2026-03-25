import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Query,
    ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { SearchProjectDto } from './dto/search-project.dto';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new project' })
    @ApiResponse({ status: 201, description: 'Project created successfully' })
    create(@Body() createProjectDto: CreateProjectDto) {
        return this.projectService.create(createProjectDto);
    }

    @Get('search')
    @ApiOperation({ summary: 'Search projects with filters' })
    @ApiResponse({ status: 200, description: 'List of projects matching search criteria' })
    search(@Query() searchDto: SearchProjectDto) {
        return this.projectService.findAll(searchDto);
    }

    @Get('recommended')
    @ApiOperation({ summary: 'Get recommended/featured projects' })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiResponse({ status: 200, description: 'List of recommended projects' })
    getRecommended(@Query('limit', new ParseIntPipe({ optional: true })) limit?: number) {
        return this.projectService.getRecommended(limit || 10);
    }

    @Get('newly-launched')
    @ApiOperation({ summary: 'Get newly launched projects' })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiResponse({ status: 200, description: 'List of newly launched projects' })
    getNewlyLaunched(@Query('limit', new ParseIntPipe({ optional: true })) limit?: number) {
        return this.projectService.getNewlyLaunched(limit || 10);
    }

    @Get('trending')
    @ApiOperation({ summary: 'Get trending projects' })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiResponse({ status: 200, description: 'List of trending projects' })
    getTrending(@Query('limit', new ParseIntPipe({ optional: true })) limit?: number) {
        return this.projectService.getTrending(limit || 10);
    }

    @Get('by-locality/:localityId')
    @ApiOperation({ summary: 'Get projects by locality' })
    @ApiResponse({ status: 200, description: 'List of projects in the specified locality' })
    getByLocality(@Param('localityId', ParseIntPipe) localityId: number) {
        return this.projectService.getByLocality(localityId);
    }

    @Get('filters')
    @ApiOperation({ summary: 'Get available filter options' })
    @ApiResponse({ status: 200, description: 'Available filter options for projects' })
    getFilterOptions() {
        return this.projectService.getFilterOptions();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get project by ID' })
    @ApiResponse({ status: 200, description: 'Project details' })
    @ApiResponse({ status: 404, description: 'Project not found' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.projectService.findOne(id);
    }
}
