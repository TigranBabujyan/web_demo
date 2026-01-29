import { Injectable } from '@nestjs/common';

export interface Card {
    id: string;
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
    private sections: Section[] = [
        {
            id: 'works',
            label: '/ works',
            title: 'FEATURED WORKS',
            subtitle:
                'Concept-driven work turned into real outcomes.\nIdeas developed through research, intuition, and making until they create value.',
            rows: [
                {
                    id: 'row-1',
                    cards: [
                        {
                            id: 'card-1',
                            image:
                                'https://images.unsplash.com/photo-1634017839464-5c339bbe3c35?w=800&q=80',
                            category: 'Logo Animation',
                            title: "Don't Panic",
                            description: 'Branding for creative agency',
                        },
                        {
                            id: 'card-2',
                            image:
                                'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80',
                            category: 'Logo Animation',
                            title: "Don't Panic",
                            description: 'Branding for creative agency',
                        },
                    ],
                },
                {
                    id: 'row-2',
                    cards: [
                        {
                            id: 'card-3',
                            image:
                                'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
                            category: 'UI/UX Design',
                            title: 'Nebula Dashboard',
                            description: 'Product design for fintech',
                        },
                        {
                            id: 'card-4',
                            image:
                                'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&q=80',
                            category: 'Motion Design',
                            title: 'Flux Experience',
                            description: 'Immersive brand experience',
                        },
                    ],
                },
            ],
        },
    ];

    findAll(): Section[] {
        return this.sections;
    }
}
