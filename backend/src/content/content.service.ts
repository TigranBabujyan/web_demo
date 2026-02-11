import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Work, Page, Contact } from '../db/seed-data';

export interface Card {
    id: number;
    image: string;
    category: string;
    title: string;
    description: string;
}

export interface Row {
    id: string;
    cards: Card[];
}

export interface Section {
    id: string;
    label: string;
    title: string;
    subtitle: string;
    rows: Row[];
}

@Injectable()
export class ContentService {
    constructor(private readonly dbService: DbService) { }

    // Get all sections for homepage featured works
    findAll(): Section[] {
        const featuredWorks = this.dbService.getFeaturedWorks();

        // Transform to the format expected by FeaturedWorks component
        const cards: Card[] = featuredWorks.map(work => ({
            id: work.id,
            image: work.mainImage,
            category: work.category,
            title: work.title,
            description: work.description,
        }));

        return [
            {
                id: 'works',
                label: '/ works',
                title: 'FEATURED WORKS',
                subtitle: 'Concept-driven work turned into real outcomes.\nIdeas developed through research, intuition, and making until they create value.',
                rows: [
                    {
                        id: 'row-1',
                        cards: cards.slice(0, 2),
                    },
                    {
                        id: 'row-2',
                        cards: cards.slice(2, 4),
                    },
                ],
            },
        ];
    }

    // Get page content by slug
    getPageBySlug(slug: string): Page | null {
        return this.dbService.getPageBySlug(slug);
    }

    // Get paginated works
    getWorks(page: number = 1, limit: number = 8, category?: string) {
        return this.dbService.getWorks(page, limit, category);
    }

    // Get work by ID
    getWorkById(id: number): Work | null {
        return this.dbService.getWorkById(id);
    }

    // Get all categories
    getCategories(): string[] {
        return this.dbService.getCategories();
    }

    // Create contact submission
    createContact(data: Contact): Contact {
        return this.dbService.createContact(data);
    }
}
