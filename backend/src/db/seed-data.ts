export interface Work {
    id: number;
    title: string;
    category: string;
    description: string;
    year: number;
    client: string;
    mainImage: string;
    images: string[];
}

export interface Page {
    slug: string;
    title: string;
    sections: Section[];
}

export interface Section {
    id: string;
    type: 'hero' | 'featured_works' | 'text_image' | 'text_only' | 'services' | 'partners';
    label?: string;
    title?: string;
    subtitle?: string;
    content?: string;
    image?: string;
    imagePosition?: 'left' | 'right';
    buttonText?: string;
    buttonHref?: string;
    tagline?: string;
    variant?: 'default' | 'olive' | 'dark';
    data?: any; // For works, services, partners data
}

export interface Contact {
    id?: number;
    name: string;
    email: string;
    company?: string;
    budget?: string;
    message: string;
    createdAt?: string;
}

// Hardcoded content matching Figma designs
export const SEED_DATA = {
    // Homepage content
    homepage: {
        slug: 'home',
        title: 'Homepage',
        sections: [
            {
                id: 'hero',
                type: 'hero' as const,
                subtitle: 'Independent design agency working across motion, branding, product, UI/UX, and immersive design, turning ideas into real outcomes.',
                buttonText: 'START A PROJECT',
                buttonHref: '/contact',
            },
            {
                id: 'featured-works',
                type: 'featured_works' as const,
                label: '/ works',
                title: 'FEATURED WORKS',
                subtitle: 'Concept-driven work turned into real outcomes.\nIdeas developed through research, intuition, and making until they create value.',
            },
            {
                id: 'course',
                type: 'text_image' as const,
                label: '/courses',
                title: 'LEARN DESIGN\nTHE HARD WAY',
                subtitle: 'A practical advanced course to grow as a design generalist.\nBuilt from real projects and real mistakes.',
                buttonText: 'ORDER NOW',
                buttonHref: '/course',
                tagline: 'No theory loops. No corporate fluff.',
                image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&q=80',
                imagePosition: 'right' as const,
            },
            {
                id: 'contact-cta',
                type: 'text_only' as const,
                label: '/ contact',
                title: 'READY TO BREAK RULES?',
                subtitle: 'If you want impact you know what to do.\nIf you want safe, this probably isn\'t for you.',
                buttonText: 'CONTACT US',
                buttonHref: '/contact',
                tagline: 'We reply only to serious ideas.',
                variant: 'olive' as const,
            },
        ],
    },

    // About page content
    about: {
        slug: 'about',
        title: 'About Us',
        sections: [
            {
                id: 'about-intro',
                type: 'text_only' as const,
                label: '/ about',
                title: 'WE ARE PARANOIDS',
                subtitle: 'An independent design agency obsessed with doing work that matters.',
                content: 'We don\'t do what everyone else does. We challenge ideas, question briefs, and push boundaries. Our work spans motion design, branding, product design, UI/UX, and immersive experiences—all driven by one goal: real outcomes, not vanity metrics.',
            },
            {
                id: 'services',
                type: 'services' as const,
                title: 'WHAT WE DO',
                data: [
                    { icon: 'branding', name: 'Branding', description: 'Visual identity systems that stick' },
                    { icon: 'motion', name: 'Motion Design', description: 'Animation that tells stories' },
                    { icon: 'ui-ux', name: 'UI/UX Design', description: 'Interfaces people actually use' },
                    { icon: '3d', name: '3D & Immersive', description: 'Experiences beyond the screen' },
                    { icon: 'product', name: 'Product Design', description: 'Design that drives growth' },
                    { icon: 'sound', name: 'Sound Design', description: 'Audio that elevates experience' },
                ],
            },
            {
                id: 'partners',
                type: 'partners' as const,
                title: 'TRUSTED BY',
                data: [
                    { name: 'Nike', logo: '' },
                    { name: 'Google', logo: '' },
                    { name: 'Apple', logo: '' },
                    { name: 'Spotify', logo: '' },
                    { name: 'Adobe', logo: '' },
                    { name: 'Meta', logo: '' },
                ],
            },
        ],
    },

    // Contact page content
    contact: {
        slug: 'contact',
        title: 'Contact Us',
        sections: [
            {
                id: 'contact-form',
                type: 'text_only' as const,
                label: '/ contact',
                title: 'LET\'S TALK',
                subtitle: 'Got a project in mind? Want to collaborate? Fill out the form and we\'ll get back to you within 48 hours.',
                content: 'Email: hello@paranoids.agency\nInstagram: @paranoids.agency\nLinkedIn: linkedin.com/company/paranoids',
            },
        ],
    },

    // Works data
    works: [
        {
            id: 1,
            title: 'Don\'t Panic',
            category: 'Branding',
            description: 'Complete brand identity for a creative agency',
            year: 2024,
            client: 'Don\'t Panic Studios',
            mainImage: 'https://images.unsplash.com/photo-1634017839464-5c339bbe3c35?w=1200&q=80',
            images: [
                'https://images.unsplash.com/photo-1634017839464-5c339bbe3c35?w=800&q=80',
                'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80',
            ],
        },
        {
            id: 2,
            title: 'Nebula Dashboard',
            category: 'UI/UX',
            description: 'Product design for fintech platform',
            year: 2024,
            client: 'Nebula Finance',
            mainImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80',
            images: [
                'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
            ],
        },
        {
            id: 3,
            title: 'Flux Experience',
            category: 'Motion',
            description: 'Immersive brand experience with 3D motion',
            year: 2023,
            client: 'Flux Studios',
            mainImage: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=1200&q=80',
            images: [
                'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&q=80',
            ],
        },
        {
            id: 4,
            title: 'Quantum Branding',
            category: 'Branding',
            description: 'Brand identity for tech startup',
            year: 2024,
            client: 'Quantum Labs',
            mainImage: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1200&q=80',
            images: [],
        },
        {
            id: 5,
            title: 'Echo UI Kit',
            category: 'UI/UX',
            description: 'Design system for SaaS platform',
            year: 2023,
            client: 'Echo Technologies',
            mainImage: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200&q=80',
            images: [],
        },
        {
            id: 6,
            title: 'Prism 3D',
            category: '3D',
            description: '3D product visualization',
            year: 2024,
            client: 'Prism Designs',
            mainImage: 'https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=1200&q=80',
            images: [],
        },
        {
            id: 7,
            title: 'Velocity Logo',
            category: 'Logo Animation',
            description: 'Animated logo for sports brand',
            year: 2023,
            client: 'Velocity Athletics',
            mainImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80',
            images: [],
        },
        {
            id: 8,
            title: 'Aurora Product',
            category: 'Product Design',
            description: 'Mobile app design for wellness platform',
            year: 2024,
            client: 'Aurora Health',
            mainImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
            images: [],
        },
    ],
};
