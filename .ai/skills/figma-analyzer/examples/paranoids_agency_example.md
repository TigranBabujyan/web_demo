# Example: Paranoids Agency Website

This example shows the output from analyzing the Paranoids Agency Figma design file.

---

## File Information

- **File Name:** Paranoids Agency - Website Design
- **File Key:** `yatvO2qBSEksHbV7Zc49KC`
- **Last Modified:** February 10, 2026
- **Node Analyzed:** `93-1305` (Homepage Section)

---

## Design System Extracted

### Colors

```css
:root {
  /* Primary */
  --color-white: #ffffff;
  --color-black: #000000;
  
  /* Text */
  --color-text-primary: #ffffff;
  --color-text-secondary: #a49f9e;
  --color-text-muted: #bfb8b7;
}
```

### Typography

```css
:root {
  /* Font Family */
  --font-primary: 'Google Sans', sans-serif;
  
  /* Font Sizes */
  --font-size-sm: 14px;
  --font-size-base: 16px;
  
  /* Font Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  
  /* Line Heights */
  --line-height-normal: 1.5;
  
  /* Letter Spacing */
  --letter-spacing-tight: -0.32px;
  --letter-spacing-wide: 0.32px;
}
```

### Spacing

```css
:root {
  --spacing-sm: 10px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
}
```

---

## Pages Identified

### Homepage (Node: 93-1305)

**Dimensions:** 1512px × 800px

#### Sections:
1. **Hero Section** (67:119)
   - Background gradient (radial, 6% opacity)
   - Hero visual (animated GIF)
   - Description text
   - CTA button

2. **Featured Works Section** (67:125)
   - Section label: "/ works"
   - Section title: "FEATURED WORKS"

---

## Components Found

### Button Component (ID: 82:964)

**Variants:**
- Default (ID: 82:974)
- Hover (ID: 82:966)

**Properties:**
- Text: "START A PROJECT"
- Font: Google Sans Medium, 16px
- Letter spacing: -0.32px
- Layout: Horizontal with 10px gap
- Border radius: 99px (pill shape)
- Includes arrow icon (20×20px)

**Interaction:**
- Trigger: ON_HOVER
- Transition: Smart animate, 200ms ease-in-out
- Effect: Transforms to hover variant

---

## Assets to Export

| Asset | Type | Ref ID | Dimensions | Usage |
|-------|------|--------|------------|-------|
| Hero Visual | GIF | fd966fe3294e6da1a70be6ed8559f3050865d979 | 1294×970 | Hero section background |
| Hero Visual (static) | Image | 29e95f249883f88bf7543f7b9755d444cc1b0673 | 1294×970 | Fallback image |
| Arrow Icon | Vector | - | 20×20 | Button icon |

---

## Layout Patterns

### Hero Section Layout
```
Horizontal Auto-Layout
├── Alignment: Space-between
├── Padding: 32px all sides
├── Height: 800px (fixed)
└── Width: 1512px (fill)
```

### Button Layout
```
Horizontal Auto-Layout
├── Alignment: Center
├── Gap: 10px
├── Padding: Hug content
└── Border radius: 99px
```

---

## Interactive Elements

### Button Hover Animation
- **Trigger:** Mouse hover
- **Duration:** 200ms
- **Easing:** Ease-in-out
- **Type:** Smart animate
- **Effect:** Likely arrow movement or scale change

---

## Implementation Recommendations

### Phase 1: Setup
1. Set up Next.js or Vite project
2. Install Google Fonts (Google Sans)
3. Create design system CSS file

### Phase 2: Components
1. Build Button component
   - Default state
   - Hover state with animation
   - Arrow icon (SVG)

### Phase 3: Homepage
1. Hero section
   - Background gradient
   - Animated hero visual (GIF → WebP)
   - Description text
   - CTA button
2. Featured Works section
   - Section label
   - Section title

### Phase 4: Polish
1. Add smooth scroll animations
2. Optimize images (GIF → WebP)
3. Test responsiveness

---

## Technology Stack Used

- **Framework:** Next.js (recommended)
- **Styling:** CSS Modules with custom properties
- **Fonts:** Google Fonts (Google Sans)
- **Animation:** Framer Motion for button hover
- **Image Optimization:** next/image with WebP

---

## Development Timeline

- **Week 1:** Setup + Design System
- **Week 2:** Button Component + Hero Section
- **Week 3:** Featured Works Section
- **Week 4:** Polish + Testing

---

## Notes

- The design uses a minimalist aesthetic with high contrast
- Typography is clean with Google Sans throughout
- Animations are subtle (200ms transitions)
- Layout uses auto-layout (Flexbox in CSS)
- Color palette is very limited (mostly white/gray/black)
- Design appears to be dark mode by default
