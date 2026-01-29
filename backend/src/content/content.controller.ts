import { Controller, Get } from '@nestjs/common';
import { ContentService, Section } from './content.service';

@Controller('api/sections')
export class ContentController {
    constructor(private readonly contentService: ContentService) { }

    @Get()
    findAll(): Section[] {
        return this.contentService.findAll();
    }
}
