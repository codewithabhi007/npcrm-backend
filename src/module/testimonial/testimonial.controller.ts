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
import { TestimonialService } from './testimonial.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';

@ApiTags('Testimonials')
@Controller('testimonials')
export class TestimonialController {
    constructor(private readonly testimonialService: TestimonialService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new testimonial' })
    @ApiResponse({ status: 201, description: 'Testimonial created successfully' })
    create(@Body() createTestimonialDto: CreateTestimonialDto) {
        return this.testimonialService.create(createTestimonialDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all active testimonials' })
    @ApiResponse({ status: 200, description: 'List of testimonials' })
    findAll(
        @Query('page', new ParseIntPipe({ optional: true })) page?: number,
        @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    ) {
        return this.testimonialService.findAll(page || 1, limit || 10);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get testimonial by ID' })
    @ApiResponse({ status: 200, description: 'Testimonial details' })
    @ApiResponse({ status: 404, description: 'Testimonial not found' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.testimonialService.findOne(id);
    }
}
