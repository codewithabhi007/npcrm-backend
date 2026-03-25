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
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@ApiTags('Blogs')
@Controller('blogs')
export class BlogController {
    constructor(private readonly blogService: BlogService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new blog post' })
    @ApiResponse({ status: 201, description: 'Blog post created successfully' })
    create(@Body() createBlogDto: CreateBlogDto) {
        return this.blogService.create(createBlogDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all published blog posts' })
    @ApiResponse({ status: 200, description: 'List of blog posts' })
    findAll(
        @Query('page', new ParseIntPipe({ optional: true })) page?: number,
        @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    ) {
        return this.blogService.findAll(page || 1, limit || 10);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get blog post by ID' })
    @ApiResponse({ status: 200, description: 'Blog post details' })
    @ApiResponse({ status: 404, description: 'Blog post not found' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.blogService.findOne(id);
    }
}
