import { Injectable, OnModuleInit } from '@nestjs/common';
import Database from 'better-sqlite3';
import * as path from 'path';
import { SEED_DATA, Work, Page, Contact } from './seed-data';

@Injectable()
export class DbService implements OnModuleInit {
    private db: Database.Database;

    constructor() {
        const dbPath = path.join(process.cwd(), 'paranoid.db');
        this.db = new Database(dbPath);
        this.db.pragma('journal_mode = WAL');
    }

    onModuleInit() {
        this.initializeSchema();
        this.seedDatabase();
    }

    private initializeSchema() {
        // Pages table
        this.db.exec(`
      CREATE TABLE IF NOT EXISTS pages (
        slug TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL
      );
    `);

        // Works table
        this.db.exec(`
      CREATE TABLE IF NOT EXISTS works (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        year INTEGER NOT NULL,
        client TEXT NOT NULL,
        mainImage TEXT NOT NULL,
        images TEXT NOT NULL
      );
    `);

        // Contacts table
        this.db.exec(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT,
        budget TEXT,
        message TEXT NOT NULL,
        createdAt TEXT NOT NULL
      );
    `);
    }

    private seedDatabase() {
        // Check if data already seeded
        const existingWorks = this.db.prepare('SELECT COUNT(*) as count FROM works').get() as { count: number };
        if (existingWorks.count > 0) {
            return; // Already seeded
        }

        // Seed pages
        const insertPage = this.db.prepare('INSERT OR REPLACE INTO pages (slug, title, content) VALUES (?, ?, ?)');
        insertPage.run(SEED_DATA.homepage.slug, SEED_DATA.homepage.title, JSON.stringify(SEED_DATA.homepage.sections));
        insertPage.run(SEED_DATA.about.slug, SEED_DATA.about.title, JSON.stringify(SEED_DATA.about.sections));
        insertPage.run(SEED_DATA.contact.slug, SEED_DATA.contact.title, JSON.stringify(SEED_DATA.contact.sections));

        // Seed works
        const insertWork = this.db.prepare(`
      INSERT INTO works (title, category, description, year, client, mainImage, images)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

        for (const work of SEED_DATA.works) {
            insertWork.run(
                work.title,
                work.category,
                work.description,
                work.year,
                work.client,
                work.mainImage,
                JSON.stringify(work.images),
            );
        }

        console.log('✅ Database seeded successfully');
    }

    // Get page by slug
    getPageBySlug(slug: string): Page | null {
        const row = this.db.prepare('SELECT * FROM pages WHERE slug = ?').get(slug) as any;
        if (!row) return null;

        return {
            slug: row.slug,
            title: row.title,
            sections: JSON.parse(row.content),
        };
    }

    // Get paginated works with optional category filter
    getWorks(page: number = 1, limit: number = 8, category?: string): { works: Work[]; total: number; totalPages: number } {
        const offset = (page - 1) * limit;

        let query = 'SELECT * FROM works';
        let countQuery = 'SELECT COUNT(*) as count FROM works';
        const params: any[] = [];

        if (category && category !== 'all') {
            query += ' WHERE category = ?';
            countQuery += ' WHERE category = ?';
            params.push(category);
        }

        query += ' ORDER BY year DESC, id DESC LIMIT ? OFFSET ?';

        const rows = this.db.prepare(query).all(...params, limit, offset) as any[];
        const totalRow = this.db.prepare(countQuery).get(...params) as { count: number };

        const works = rows.map((row) => ({
            id: row.id,
            title: row.title,
            category: row.category,
            description: row.description,
            year: row.year,
            client: row.client,
            mainImage: row.mainImage,
            images: JSON.parse(row.images),
        }));

        return {
            works,
            total: totalRow.count,
            totalPages: Math.ceil(totalRow.count / limit),
        };
    }

    // Get single work by ID
    getWorkById(id: number): Work | null {
        const row = this.db.prepare('SELECT * FROM works WHERE id = ?').get(id) as any;
        if (!row) return null;

        return {
            id: row.id,
            title: row.title,
            category: row.category,
            description: row.description,
            year: row.year,
            client: row.client,
            mainImage: row.mainImage,
            images: JSON.parse(row.images),
        };
    }

    // Get all work categories
    getCategories(): string[] {
        const rows = this.db.prepare('SELECT DISTINCT category FROM works ORDER BY category').all() as { category: string }[];
        return rows.map((row) => row.category);
    }

    // Create contact form submission
    createContact(data: Contact): Contact {
        const now = new Date().toISOString();
        const result = this.db
            .prepare(
                `INSERT INTO contacts (name, email, company, budget, message, createdAt)
         VALUES (?, ?, ?, ?, ?, ?)`,
            )
            .run(data.name, data.email, data.company || null, data.budget || null, data.message, now);

        return {
            id: result.lastInsertRowid as number,
            ...data,
            createdAt: now,
        };
    }

    // Get featured works (first 4 works)
    getFeaturedWorks(): Work[] {
        const rows = this.db.prepare('SELECT * FROM works ORDER BY year DESC, id DESC LIMIT 4').all() as any[];
        return rows.map((row) => ({
            id: row.id,
            title: row.title,
            category: row.category,
            description: row.description,
            year: row.year,
            client: row.client,
            mainImage: row.mainImage,
            images: JSON.parse(row.images),
        }));
    }
}
