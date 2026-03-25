import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Query,
    ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LocalityService } from './locality.service';
import { CreateLocalityDto } from './dto/create-locality.dto';

@ApiTags('Localities')
@Controller('localities')
export class LocalityController {
    constructor(private readonly localityService: LocalityService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new locality' })
    @ApiResponse({ status: 201, description: 'Locality created successfully' })
    create(@Body() createLocalityDto: CreateLocalityDto) {
        return this.localityService.create(createLocalityDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all localities' })
    @ApiResponse({ status: 200, description: 'List of all localities' })
    findAll(@Query('city') city?: string) {
        if (city) {
            return this.localityService.findByCity(city);
        }
        return this.localityService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get locality by ID with projects' })
    @ApiResponse({ status: 200, description: 'Locality details with projects' })
    @ApiResponse({ status: 404, description: 'Locality not found' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.localityService.findOne(id);
    }
}
