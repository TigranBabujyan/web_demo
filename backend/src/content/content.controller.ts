import { Controller, Get, Post, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ContentService, Section } from './content.service';
import type { Work, Page, Contact } from '../db/seed-data';

@Controller('api')
export class ContentController {
    constructor(private readonly contentService: ContentService) { }

    // Existing endpoint for featured works sections (used by homepage)
    @Get('sections')
    findAll(): Section[] {
        return this.contentService.findAll();
    }

    // Get page content by slug
    @Get('pages/:slug')
    getPage(@Param('slug') slug: string): Page {
        const page = this.contentService.getPageBySlug(slug);
        if (!page) {
            throw new HttpException('Page not found', HttpStatus.NOT_FOUND);
        }
        return page;
    }

    // Get paginated works with optional category filter
    @Get('works')
    getWorks(
        @Query('page') page: string = '1',
        @Query('limit') limit: string = '8',
        @Query('category') category?: string,
    ) {
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);

        if (isNaN(pageNum) || pageNum < 1) {
            throw new HttpException('Invalid page number', HttpStatus.BAD_REQUEST);
        }
        if (isNaN(limitNum) || limitNum < 1 || limitNum > 50) {
            throw new HttpException('Invalid limit (1-50)', HttpStatus.BAD_REQUEST);
        }

        return this.contentService.getWorks(pageNum, limitNum, category);
    }

    // Get all work categories
    @Get('works/categories')
    getCategories(): { categories: string[] } {
        return { categories: this.contentService.getCategories() };
    }

    // Get single work by ID
    @Get('works/:id')
    getWorkById(@Param('id') id: string): Work {
        const workId = parseInt(id, 10);
        if (isNaN(workId)) {
            throw new HttpException('Invalid work ID', HttpStatus.BAD_REQUEST);
        }

        const work = this.contentService.getWorkById(workId);
        if (!work) {
            throw new HttpException('Work not found', HttpStatus.NOT_FOUND);
        }
        return work;
    }

    // Create contact form submission
    @Post('contact')
    createContact(@Body() contactData: Contact): { success: boolean; message: string; data: Contact } {
        // Basic validation
        if (!contactData.name || !contactData.email || !contactData.message) {
            throw new HttpException(
                'Missing required fields: name, email, message',
                HttpStatus.BAD_REQUEST,
            );
        }

        const contact = this.contentService.createContact(contactData);
        return {
            success: true,
            message: 'Contact form submitted successfully',
            data: contact,
        };
    }
}
