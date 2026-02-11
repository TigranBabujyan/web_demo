# Project Logic & Functionality

## Architecture Overview
Paranoid Visuals Web is a full-stack application with a decoupled frontend and backend. The frontend handles rendering, 3D graphics, and user interactions. The backend manages content data, contact form submissions, and will eventually handle admin operations, merch, and user-uploaded 3D content.

```
┌─────────────────┐       ┌──────────────────┐       ┌──────────────┐
│   Frontend      │──API──│    Backend       │───────│   Database   │
│   Next.js 16    │       │    NestJS        │       │   (TBD)      │
│   React 19      │       │    TypeScript    │       │              │
│   Three.js      │       │    REST API      │       │              │
│   Framer Motion │       │                  │       │              │
└─────────────────┘       └──────────────────┘       └──────────────┘
```

---

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router, Server Components)
- **UI Library**: React 19
- **3D Graphics**: Three.js (GLTFLoader for .glb models)
- **Animations**: Framer Motion
- **Styling**: Modular CSS + TailwindCSS 4 (PostCSS)
- **Language**: TypeScript

### Backend
- **Runtime**: Node.js
- **Framework**: NestJS 11
- **Language**: TypeScript
- **Testing**: Jest + Supertest
- **Linting**: ESLint + Prettier

### Database (To Be Decided)

**Recommendation:** For this project, here are the best options:

| Database | Pros | Cons | Best For |
|----------|------|------|----------|
| **PostgreSQL** | Relational, strong typing, great for structured content, scalable | More setup, rigid schema | If content has clear structure (works, courses, merch) |
| **MongoDB** | Flexible schema, easy to start, good for varied content shapes | Less strict, can get messy | If content structure will change frequently |
| **SQLite** | Zero config, file-based, great for small apps | Not great for production scale | Quick prototyping phase |

> [!NOTE]
> **Suggestion**: PostgreSQL with Prisma ORM — best fit for structured e-commerce + content management with type safety matching the TypeScript stack.

Answer: **SQLite**
---

## Core Functionality

### Feature 1: Interactive 3D Hero Section
**Description**: Full-screen hero with physics-based 3D models that users can drag and interact with.

**Logic Flow**:
1. Three.js scene initializes with camera, lighting, and renderer
2. GLTFLoader loads .glb model files from `/public/models/`
3. PhysicsObject class wraps each model with velocity, boundaries, and collision
4. Models float with perpetual motion, bouncing off screen edges
5. Raycaster detects mouse clicks on models for drag interaction
6. User drags model → velocity transfers on release (throw effect)

**Key Components**:
- `Hero3D.tsx` — Three.js scene with physics engine
- `HeroSection.tsx` — Wrapper combining 3D scene with content overlay
- `Hero.tsx` — Text-based hero content

**Current Models** (all placeholders):
- `pest_damage.glb` (3.3 MB)
- `river_statue.glb` (15 MB)
- `scan_01.glb` (7 MB)
- `boxing_day.glb` (78 MB — needs optimization)

**Future**: Specific interactions and animations to be defined by the user.

---

### Feature 2: Featured Works (Dynamic from DB)
**Description**: Portfolio showcase displaying work cards organized in rows. Content is fully dynamic — managed from the backend.

**Logic Flow**:
1. Frontend fetches `/api/sections` from backend on page load
2. If backend is unavailable, fallback mock data is used
3. Data is structured as Sections → Rows → Cards
4. `FeaturedWorks` renders sections, `WorkCard` renders individual cards
5. **Future**: Adding/removing cards in the DB auto-updates the frontend

**Key Components**:
- `FeaturedWorks.tsx` — Section renderer with rows
- `WorkCard.tsx` — Individual card with image, category, title, description

**Data Structure**:
```typescript
interface Card {
  id: string;
  image: string;
  category: string;
  title: string;
  description: string;
}

interface Row {
  id: string;
  cards: Card[];
}

interface Section {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  rows: Row[];
}
```

---

### Feature 3: Course Section
**Description**: Displays 3D modeling courses offered by the company with pricing.

**Logic Flow**:
1. Course data will be fetched from backend API
2. Display as cards with course name, description, and price
3. Dynamic — managed from backend

**Key Components**:
- `CourseSection.tsx` — Course cards display

**Future Data Structure** (suggested):
```typescript
interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  image?: string;
  duration?: string;
  level?: string; // beginner, intermediate, advanced
}
```

---

### Feature 4: Contact Form
**Description**: Contact form that captures customer inquiries and stores them in the backend.

**Logic Flow**:
1. User fills out contact form on the frontend
2. Form data is submitted to backend API endpoint
3. Backend stores the submission in the database
4. **Future**: Admin panel displays submitted inquiries

**Key Components**:
- `ContactSection.tsx` — Contact form UI

**Future Data Structure** (suggested):
```typescript
interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: Date;
  isRead: boolean;
}
```

---

### Feature 5: Navigation & Header
**Description**: Animated header with desktop nav links and fullscreen mobile menu overlay.

**Logic Flow**:
1. Header renders with logo, navigation links, and hamburger button
2. Desktop: shows nav links inline (THE OTHER SIDE, / WORKS, CONTACT)
3. Mobile: hamburger opens fullscreen animated overlay menu
4. Framer Motion handles entry/exit animations
5. Menu includes social links and copyright

**Key Components**:
- `Header.tsx` — Full navigation component
- `HeaderWrapper.tsx` — Client-side wrapper for server components
- `Footer.tsx` — Site footer

**Menu Links**: WORKS, ABOUT, CONTACT, COURSE, MERCH, THE OTHER SIDE

---

### Feature 6: "The Other Side" (Future — Placeholder Now)
**Description**: A dedicated space where users will upload and demo their 3D models or animations in an immersive environment.

**Current Status**: Placeholder page only.

**Future Logic**:
1. Users upload .glb/.gltf 3D models or animations
2. Models are rendered in a Three.js viewer
3. VR device support for immersive viewing
4. Sharing and showcase capabilities

---

### Feature 7: Merchandise Shop (Future)
**Description**: Small online shop for company merchandise with payment processing.

**Future Logic**:
1. Product catalog managed from admin/backend
2. Shopping cart functionality
3. Payment gateway integration
4. Order management

---

## API Endpoints

### Currently Implemented
| Method | Path | Description | Status |
|--------|------|-------------|--------|
| `GET` | `/api/sections` | Fetch all featured works sections | ✅ Working |

### Planned Endpoints (Future)
| Method | Path | Description | Status |
|--------|------|-------------|--------|
| `GET` | `/api/courses` | Fetch all courses | ⏳ Pending |
| `POST` | `/api/contact` | Submit contact form | ⏳ Pending |
| `GET` | `/api/merch` | Fetch merchandise catalog | ⏳ Future |
| `POST` | `/api/merch/orders` | Place merch order | ⏳ Future |
| `CRUD` | `/api/admin/*` | Admin panel operations | ⏳ Future |

> [!NOTE]
> **Questions deferred to future**: Full API design, data flow patterns, and detailed endpoint specifications will be defined when the database and admin panel are implemented.

---

## State Management
- React Server Components for data fetching (Next.js App Router)
- Client-side `useState` for UI state (menu open/close, form inputs)
- Three.js internal state for 3D scene management

---

## Key Design Patterns
- **Component modularity**: Each UI section is a self-contained component with its own CSS module
- **Server-first rendering**: Data fetching happens on the server, with client components only where needed
- **Fallback data pattern**: Frontend gracefully degrades with No data if backend is unavailable
- **Physics simulation**: Custom PhysicsObject class for 3D model interactions

> [!NOTE]
> **Deferred**: User will specify additional design patterns in the future.

---

## Design Source

> [!IMPORTANT]
> **All pages must strictly follow Figma designs provided by the user.**
> Figma files exist for every page — no creative deviation without approval.

---

## Security Considerations (Future)
- Admin panel authentication
- Contact form rate limiting & spam protection
- Payment data security (PCI compliance for merch shop)
- File upload validation for "The Other Side" feature
- CORS configuration for production

---

## Performance Considerations
- 3D model optimization (compress large .glb files)
- Adaptive 3D resolution for older devices (future)
- Image optimization and lazy loading
- Code splitting via Next.js dynamic imports
- CDN for static assets in production

---

**Last Updated**: 2026-02-11
