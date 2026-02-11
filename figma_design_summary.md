# Figma Design Summary: Paranoids Agency - Website Design

**File Name:** Paranoids Agency - Website Design  
**Last Modified:** February 10, 2026 at 12:49 PM  
**File Key:** `yatvO2qBSEksHbV7Zc49KC`  
**Node ID:** `93-1305` (Homepage Section)

---

## 📐 Design Overview

This is a **Homepage design** for a design agency website with a modern, clean aesthetic featuring:
- **Layout:** 1512px × 800px viewport 
- **Primary Font:** Google Sans (Regular 400, Medium 500)
- **Design Style:** Minimal, with subtle gradients and modern typography

---

## 🎨 Color Palette

### Primary Colors
- **White:** `rgb(255, 255, 255)` - Primary text, buttons
- **Light Gray:** `rgb(164, 159, 158)` / `#a49f9e` - Subtitle text
- **Medium Gray:** `rgb(191, 184, 183)` / `#bfb8b7` - Section labels

### Background
- **Radial Gradient:** White to transparent (6% opacity)
- Background uses design tokens with Variable IDs

---

## 📋 Key Sections

### 1. **Hero Section** (Section 1)
**Position:** Top of page  
**Dimensions:** 1512px × 800px  
**Layout:** Horizontal layout with space-between alignment  
**Padding:** 32px all sides

#### Components:
- **Hero Visual** (ID: 82:835)
  - Type: Image/GIF rectangle
  - Dimensions: 1294px × 970px
  - Contains animated visual (has both `imageRef` and `gifRef`)
  - Positioned center with absolute positioning

- **Gradient Background Element** (ID: 280:1847)
  - Type: Radial gradient ellipse
  - Opacity: 6%
  - White gradient fading to transparent
  
- **Hero Text** (ID: 67:120)
  - Text: *"Independent design agency working across motion, branding, product, UI/UX, and immersive design, turning ideas into real outcomes."*
  - Font: Google Sans Regular, 16px
  - Color: `rgb(164, 159, 158)`
  - Letter spacing: 0.32px
  - Line height: 24px (150%)
  - Width: 400px
  - Position: Bottom left area

- **Hero Button** (ID: 82:974) - Component Instance
  - Text: "START A PROJECT"
  - Font: Google Sans Medium, 16px
  - Color: White
  - Includes arrow icon (2 vector elements)
  - Layout: Horizontal with 10px spacing
  - Corner radius: 99px (pill shape)
  - **Interactive:** Has hover state with smart animate transition (200ms ease-in-out)
  - Transitions to variant ID: 82:966 on hover

---

### 2. **Featured Works Section** (Section 2)
**Position:** Below hero  
**Layout Label:** "/ works"

#### Components:
- **Section Label** (ID: 67:127)
  - Text: "/ works"
  - Font: Google Sans Regular, 14px
  - Color: `rgb(191, 184, 183)`
  - Letter spacing: 0.14px
  - Full width stretch layout

- **Section Title** (ID: 67:129)
  - Text: "FEATURED WORKS"
  - Font: Google Sans
  - Color: White
  - Full width layout

---

## 🔧 Design Tokens & Variables

The design uses Figma Variables (bound variables) for:
- **Fills** - Background colors and text colors
- **Variable IDs referenced:**
  - `VariableID:23:86` - White color (buttons, titles)
  - `VariableID:23:87` - Gray text color (descriptions)
  - `VariableID:23:92` - Section background
  - `VariableID:23:94` - Frame background
  - `VariableID:23:126` - Label text color

This suggests the design uses a **design system** with reusable color tokens.

---

## 🎯 Interactive Elements

### Button Component (ID: 82:964)
- **States:** Default (shown), Hover (ID: 82:966)
- **Animation:** Smart animate transition on hover
- **Duration:** 200ms
- **Easing:** Ease-in-out
- **Trigger:** ON_HOVER

---

## 📦 Assets Required

1. **Hero Visual**
   - Image Ref: `29e95f249883f88bf7543f7b9755d444cc1b0673`
   - GIF Ref: `fd966fe3294e6da1a70be6ed8559f3050865d979`
   - Needs to be exported from Figma

2. **Arrow Icon**
   - 2 vector elements (20×20px frame)
   - White color
   - Can be exported as SVG

---

## 💡 Implementation Notes

### Typography
```css
/* Hero Description */
font-family: 'Google Sans', sans-serif;
font-weight: 400;
font-size: 16px;
line-height: 24px; /* 150% */
letter-spacing: 0.32px;
color: rgb(164, 159, 158);

/* Button Text */
font-family: 'Google Sans', sans-serif;
font-weight: 500;
font-size: 16px;
letter-spacing: -0.32px;
color: white;

/* Section Label */
font-family: 'Google Sans', sans-serif;
font-weight: 400;
font-size: 14px;
line-height: 17.528px;
letter-spacing: 0.14px;
color: rgb(191, 184, 183);
```

### Layout Structure
```
Homepage (Section)
└── Homepage (Frame - 1512×800)
    ├── Hero Section (Frame)
    │   ├── Background Gradient
    │   ├── Hero Visual (Image/GIF)
    │   ├── Hero Text
    │   └── Hero Button (Component)
    └── Featured Works Section (Frame)
        ├── Section Label ("/ works")
        └── Section Title ("FEATURED WORKS")
```

### Spacing
- **Container padding:** 32px
- **Button internal spacing:** 10px between text and arrow
- **Layout mode:** Auto-layout horizontal/vertical
- **Alignment:** Space-between, bottom-aligned content

---

## 📸 Next Steps

To implement this design, you'll need to:

1. **Export the hero visual/GIF** from Figma
2. **Export the arrow icon** as SVG
3. **Load Google Sans font** in your project
4. **Implement the button hover animation** using CSS transitions or JavaScript
5. **Set up responsive breakpoints** (current design is 1512px wide)

Would you like me to export any specific assets or create the HTML/CSS implementation?
