import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PartnerService } from './partner.service';
import { CreatePartnerDto } from './dto/create-partner.dto';

@ApiTags('Partners')
@Controller('partners')
export class PartnerController {
    constructor(private readonly partnerService: PartnerService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new partner' })
    @ApiResponse({ status: 201, description: 'Partner created successfully' })
    create(@Body() createPartnerDto: CreatePartnerDto) {
        return this.partnerService.create(createPartnerDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all active partners' })
    @ApiResponse({ status: 200, description: 'List of partners' })
    findAll() {
        return this.partnerService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get partner by ID' })
    @ApiResponse({ status: 200, description: 'Partner details' })
    @ApiResponse({ status: 404, description: 'Partner not found' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.partnerService.findOne(id);
    }
}
