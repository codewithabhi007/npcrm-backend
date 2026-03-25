import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DeveloperService } from './developer.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';

@ApiTags('Developers')
@Controller('developers')
export class DeveloperController {
    constructor(private readonly developerService: DeveloperService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new developer' })
    @ApiResponse({ status: 201, description: 'Developer created successfully' })
    create(@Body() createDeveloperDto: CreateDeveloperDto) {
        return this.developerService.create(createDeveloperDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all developers' })
    @ApiResponse({ status: 200, description: 'List of all developers' })
    findAll() {
        return this.developerService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get developer by ID with projects' })
    @ApiResponse({ status: 200, description: 'Developer details with projects' })
    @ApiResponse({ status: 404, description: 'Developer not found' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.developerService.findOne(id);
    }
}
