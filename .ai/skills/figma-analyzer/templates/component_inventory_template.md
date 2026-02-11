# Component Inventory

**Generated:** [Date]  
**Source:** [Figma File Name]

---

## Overview

- **Total Components:** [Count]
- **Component Variants:** [Count]
- **Unique Patterns:** [Count]

---

## Atomic Components

### Buttons

#### Primary Button
- **Node ID:** [ID]
- **Variants:** Default, Hover, Active, Disabled
- **Sizes:** Small, Medium, Large
- **Properties:**
  - Border radius: 99px
  - Padding: 12px 24px
  - Font: Google Sans Medium, 16px
  - Transition: 200ms ease-in-out
- **States:**
  - Default: White text on transparent background
  - Hover: Scale 1.05, arrow animation
  - Active: Scale 0.95
  - Disabled: 50% opacity

#### Secondary Button
- **Node ID:** [ID]
- **Variants:** Default, Hover, Active, Disabled
- **Properties:**
  - Border: 1px solid
  - Background: Transparent
  - Hover: Background fill

### Inputs

#### Text Input
- **Node ID:** [ID]
- **States:** Default, Focus, Error, Disabled
- **Properties:**
  - Height: 48px
  - Padding: 12px 16px
  - Border radius: 8px

### Icons

#### Icon System
- **Format:** SVG
- **Sizes:** 16px, 20px, 24px, 32px
- **Icons:**
  - Arrow Right
  - Arrow Left
  - Menu
  - Close
  - Search
  - User
  - [Add more as identified]

---

## Molecule Components

### Cards

#### Project Card
- **Node ID:** [ID]
- **Layout:** Vertical auto-layout
- **Properties:**
  - Padding: 24px
  - Gap: 16px
  - Border radius: 12px
  - Background: Semi-transparent
- **Children:**
  - Image (16:9 aspect ratio)
  - Title (H3)
  - Description (Body text)
  - CTA Link

#### Blog Card
- **Node ID:** [ID]
- **Layout:** Horizontal auto-layout
- **Properties:**
  - Padding: 16px
  - Gap: 12px
- **Children:**
  - Thumbnail (square)
  - Content (title + date)

### Form Elements

#### Form Group
- **Components:**
  - Label
  - Input
  - Error message
  - Helper text

---

## Organism Components

### Navigation

#### Header
- **Node ID:** [ID]
- **Layout:** Horizontal space-between
- **Properties:**
  - Height: 80px
  - Padding: 0 32px
  - Position: Sticky
  - Background: Transparent with blur
- **Children:**
  - Logo
  - Navigation menu
  - CTA button

#### Footer
- **Node ID:** [ID]
- **Layout:** Grid (3 columns)
- **Properties:**
  - Padding: 64px 32px
  - Background: Dark
- **Children:**
  - Company info
  - Navigation links
  - Social icons

### Sections

#### Hero Section
- **Node ID:** [ID]
- **Layout:** Horizontal space-between
- **Properties:**
  - Height: 800px
  - Padding: 32px
- **Children:**
  - Hero visual (left)
  - Hero content (right)
    - Heading
    - Description
    - CTA button

#### Features Section
- **Node ID:** [ID]
- **Layout:** Vertical
- **Properties:**
  - Padding: 64px 32px
  - Gap: 48px
- **Children:**
  - Section title
  - Feature grid (3 columns)

---

## Component Dependencies

```
Pages
├── Homepage
│   ├── Header (organism)
│   ├── Hero Section (organism)
│   │   ├── Button (atom)
│   │   └── Hero Visual (asset)
│   ├── Features Section (organism)
│   │   └── Feature Card (molecule) ×3
│   └── Footer (organism)
│       └── Social Icons (atoms)
```

---

## Reusable Patterns

### Auto-Layout Patterns
1. **Horizontal Space-Between** - Used in header, hero
2. **Vertical Stack** - Used in cards, sections
3. **Grid Layout** - Used in feature grids, footer

### Spacing Patterns
- **Section Padding:** 64px vertical, 32px horizontal
- **Component Padding:** 24px
- **Element Spacing:** 16px gap
- **Text Spacing:** 8px gap

### Color Patterns
- **Primary Actions:** White text on dark background
- **Secondary Actions:** Border with transparent background
- **Text Hierarchy:** White (primary), Gray (secondary), Light Gray (muted)

---

## Component Build Order

### Phase 1: Atoms (Week 1)
1. Button (all variants)
2. Input (all states)
3. Icon system
4. Typography components

### Phase 2: Molecules (Week 2)
1. Card components
2. Form groups
3. Navigation items
4. Social links

### Phase 3: Organisms (Week 3)
1. Header
2. Footer
3. Hero section
4. Features section

### Phase 4: Templates (Week 4)
1. Homepage template
2. Content page template
3. Form page template

---

## Component Testing Checklist

### Visual Testing
- [ ] Matches Figma design pixel-perfect
- [ ] All variants render correctly
- [ ] Responsive behavior works
- [ ] Dark mode support (if applicable)

### Functional Testing
- [ ] All interactive states work (hover, active, focus)
- [ ] Keyboard navigation works
- [ ] Screen reader accessible
- [ ] Form validation works

### Performance Testing
- [ ] No layout shifts
- [ ] Smooth animations (60fps)
- [ ] Fast initial render
- [ ] Optimized re-renders

---

## Notes

- Components should be built in isolation (Storybook recommended)
- Each component should have TypeScript types/PropTypes
- All components should be accessible (WCAG 2.1 AA)
- Components should be responsive by default
