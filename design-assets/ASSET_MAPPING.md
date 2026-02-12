# Asset Mapping & Integration Guide

**Last Updated:** 2026-02-12

---

## Current 3D Implementation

### Hero3D Component
**File:** `frontend/components/Hero3D.tsx`

**Features:**
- ✅ Interactive 3D canvas with Three.js
- ✅ GLTFLoader for `.glb` model loading
- ✅ Physics simulation (floating, bouncing models)
- ✅ Drag-and-drop interaction
- ✅ Responsive design
- ✅ Smooth animations

**Currently Loaded Models:**
1. `pest_damage.glb` - Scale: 0.8, Position: (-3, 1)
2. `river_statue.glb` - Scale: 0.5, Position: (0, 0)
3. `scan_01.glb` - Scale: 0.6, Position: (3, -1)
4. `boxing_day.glb` - Not currently used in config

---

## Designer Assets Analysis

### Provided 3D Models (OBJ Format)

| Model Name | Category | C4D Size | OBJ Size | Suggested Use |
|------------|----------|----------|----------|---------------|
| **2d.obj** | 2D Design | 532 KB | 12.8 MB | Works page - 2D category |
| **3d motion design.obj** | Motion Design | 29.9 MB | 29.0 MB | **Hero section** (main visual) |
| **uiux.obj** | UI/UX | 816 KB | 337 KB | Works page - UI/UX category |
| **VR.obj** | VR/Immersive | 7.3 MB | 11.8 MB | Works page - VR category |
| **PRODUCT bottle.obj** | Product Design | - | 1.1 MB | Works page - Product category |
| **Product design 2.obj** | Product Design | 1.9 MB | 3.4 MB | Works page - Product category |
| **minilab sound design.obj** | Sound Design | 7.3 MB | 8.6 MB | Works page - Sound category |
| **about us.obj** | About Page | 2.2 MB | 8.4 MB | About page visual |

---

## Integration Strategy

### Phase 1: Convert OBJ to GLB ✅ PRIORITY

**Why GLB?**
- Three.js GLTFLoader requires GLB/GLTF format
- Better compression than OBJ
- Includes materials and textures in single file
- Faster loading times

**Conversion Options:**

#### Option A: Online Conversion (Recommended for Quick Start)
1. Use https://products.aspose.app/3d/conversion/obj-to-glb
2. Upload OBJ + MTL files
3. Download converted GLB files
4. Place in `frontend/public/models/`

#### Option B: Blender Batch Conversion (Recommended for Quality)
1. Install Blender (free, open-source)
2. Use Blender's OBJ import → GLB export
3. Optimize mesh and materials
4. Export with compression

#### Option C: Node.js Script (Automated)
```bash
npm install -g obj2gltf
obj2gltf -i input.obj -o output.glb
```

### Phase 2: Update Hero3D Component

**Replace current models with designer models:**

```typescript
// frontend/components/Hero3D.tsx (lines 71-75)
const models = [
    { path: "/models/3d_motion_design.glb", scale: 1.2, x: -2, y: 0.5 },
    { path: "/models/vr.glb", scale: 0.8, x: 2, y: -0.5 },
    { path: "/models/uiux.glb", scale: 0.6, x: 0, y: 1.5 },
];
```

**Recommended Hero Models:**
- **Primary:** `3d_motion_design.glb` (largest, most impressive)
- **Secondary:** `vr.glb` (VR theme fits agency)
- **Tertiary:** `uiux.glb` (smallest file, fast load)

### Phase 3: Works Page Integration

**Create work category cards with 3D previews:**

Each work category gets its corresponding 3D model:
- 2D Design → `2d.glb`
- 3D Motion Design → `3d_motion_design.glb`
- UI/UX → `uiux.glb`
- VR/Immersive → `vr.glb`
- Product Design → `product_bottle.glb` or `product_design_2.glb`
- Sound Design → `minilab_sound_design.glb`

**Implementation:**
- Create smaller 3D canvas components for work cards
- Or render static thumbnails from 3D models
- Link to detailed project pages

### Phase 4: About Page Integration

**Use `about_us.glb` for About page visual:**
- Similar Hero3D component setup
- Single model display
- Slower rotation for elegance

---

## File Organization

### Current Structure
```
design-assets/
└── raw/
    ├── 2d.obj + 2d.mtl + 2d.c4d
    ├── 3d motion design.obj + 3d_motion_design.mtl + 3d motion design.c4d
    ├── uiux.obj + uiux.mtl + uiux.c4d
    ├── VR.obj + VR.mtl + VR.c4d
    ├── PRODUCT bottle.obj + PRODUCT_bottle.mtl
    ├── Product design 2.obj + Product_design_2.mtl + Product design 2.c4d
    ├── minilab sound design.obj + minilab_sound_design.mtl + minilab sound design.c4d
    └── about us.obj + about_us.mtl + about us.c4d
```

### Target Structure (After Conversion)
```
frontend/public/models/
├── 2d.glb
├── 3d_motion_design.glb
├── uiux.glb
├── vr.glb
├── product_bottle.glb
├── product_design_2.glb
├── minilab_sound_design.glb
└── about_us.glb
```

---

## Next Steps

### Immediate Actions
1. **Convert OBJ to GLB** - Choose conversion method
2. **Test models** - Load in Hero3D to verify quality
3. **Optimize file sizes** - Compress if needed (target: <5MB per model)
4. **Update Hero3D config** - Replace placeholder models
5. **Test performance** - Ensure smooth loading and interaction

### Future Enhancements
- [ ] Add loading progress indicators
- [ ] Implement model switching/rotation
- [ ] Create 3D work category previews
- [ ] Add About page 3D visual
- [ ] Optimize models for mobile devices
- [ ] Add fallback images for low-end devices

---

## Questions for User

1. **Do you have access to Blender** for high-quality conversion?
2. **Should I help set up automated conversion** using Node.js tools?
3. **Which models should be prioritized** for the hero section?
4. **Do you want interactive 3D on all pages** or just the homepage?

---

## Technical Notes

- **Three.js version:** 0.182.0 (already installed)
- **GLTFLoader:** Already imported and working
- **Current models:** 4 GLB files in `public/models/`
- **Physics system:** Custom implementation, works well
- **Performance:** Good with 3 models, may need optimization for more
