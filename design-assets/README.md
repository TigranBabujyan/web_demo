# Designer Assets Directory

This directory contains all design assets provided by the design team for the Paranoid Visuals website.

## Directory Structure

```
design-assets/
├── images/          # Static images (JPG, PNG, WebP)
├── fonts/           # Custom font files (TTF, WOFF, WOFF2)
├── icons/           # Icon files (SVG, PNG)
├── animations/      # Animated assets (GIF, MP4, WebM, Lottie JSON)
├── raw/             # Original design files and unprocessed assets
└── README.md        # This file
```

## Asset Categories

### Images
- Hero visuals
- Background images
- Project thumbnails
- Team photos
- Any other static imagery

### Fonts
- Custom typefaces
- Web font files
- Font licensing documentation

### Icons
- UI icons
- Social media icons
- Navigation icons
- Decorative elements

### Animations
- Hero animations (GIF/video)
- Loading animations
- Transition effects
- Lottie animations

### Raw
- Original Figma exports
- PSD/AI files
- Unoptimized assets
- Reference materials

## Usage Guidelines

1. **Place files in appropriate subdirectories** based on asset type
2. **Use descriptive filenames** (e.g., `hero-animation.gif`, `logo-icon.svg`)
3. **Optimize assets** before moving to production directories:
   - Images → `frontend/public/images/`
   - Fonts → `frontend/public/fonts/`
   - Icons → `frontend/public/icons/`
   - Animations → `frontend/public/animations/`

## Integration with Figma Design

Based on the Figma design analysis, we need the following assets:

### Priority Assets (from Figma)
- [ ] **Hero Visual/Animation**
  - Image Ref: `29e95f249883f88bf7543f7b9755d444cc1b0673`
  - GIF Ref: `fd966fe3294e6da1a70be6ed8559f3050865d979`
  - Dimensions: 1294px × 970px
  
- [ ] **Arrow Icon** (for buttons)
  - 2 vector elements
  - 20×20px frame
  - White color
  - Export as SVG

- [ ] **Google Sans Font**
  - Weights needed: Regular (400), Medium (500)
  - Already available via Google Fonts

### Additional Assets to Collect
- [ ] Project/work images
- [ ] Team member photos
- [ ] Brand logos
- [ ] Social media icons
- [ ] Any custom illustrations

## Next Steps

1. **Upload designer files** to this directory
2. **Analyze and categorize** each asset
3. **Map assets to Figma components** and pages
4. **Optimize and prepare** for production use
5. **Update frontend** to reference new assets

---

**Last Updated:** 2026-02-12  
**Maintained By:** Development Team
