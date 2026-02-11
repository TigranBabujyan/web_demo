---
name: Figma Design Analyzer
description: Analyzes Figma designs and creates comprehensive implementation plans for web development
version: 1.0.0
author: AI Assistant
tags: [figma, design, planning, implementation, web-development]
---

# Figma Design Analyzer Skill

## Purpose

This skill enables AI assistants to analyze Figma design files and create detailed implementation plans for web development. It retrieves design specifications, extracts design tokens, identifies components, and generates actionable development roadmaps.

---

## When to Use This Skill

Invoke this skill when:
- User asks to "analyze Figma designs"
- User requests an "implementation plan" for a design
- User wants to "extract design system" from Figma
- User mentions "Figma" in context of building/implementing a website
- User asks to "plan development" based on designs

---

## Prerequisites

Before using this skill, ensure:
1. ✅ Figma MCP server is configured in `mcp_config.json`
2. ✅ Environment variables are set in `.env`:
   - `FIGMA_API_KEY` - Personal access token from Figma
   - `FIGMA_FILE_KEY` - File ID from Figma URL
   - `FIGMA_NODE_ID` - (Optional) Specific node to analyze

---

## Skill Workflow

### Phase 1: Discovery & Analysis

#### Step 1: Fetch Figma Data
```
Use MCP tools to retrieve design data:
- mcp_figma_get_figma_file(fileKey) → Get entire file structure
- mcp_figma_get_figma_node(fileKey, nodeId) → Get specific node details
```

#### Step 2: Parse Design Structure
Analyze the retrieved data to identify:
- **Pages** - All pages in the Figma file
- **Sections** - Top-level sections on each page
- **Frames** - Individual frames and artboards
- **Components** - Reusable component instances
- **Design Tokens** - Colors, typography, spacing, effects

#### Step 3: Extract Design System
From the parsed data, extract:
- **Color Palette** - All colors used (RGB values → HEX)
- **Typography Scale** - Font families, sizes, weights, line heights
- **Spacing System** - Padding, margins, gaps from layout properties
- **Component Variants** - Button states, card types, etc.
- **Layout Patterns** - Grid systems, auto-layout configurations

### Phase 2: Planning & Documentation

#### Step 4: Create Implementation Plan
Generate `implementation_plan.md` with:
1. **Project Overview**
   - Design file name and last modified date
   - Number of pages and components
   - Technology stack recommendations

2. **Design System Documentation**
   - Color variables (CSS custom properties)
   - Typography scale
   - Spacing tokens
   - Component inventory

3. **Page-by-Page Breakdown**
   - For each page/frame:
     - Layout structure
     - Components needed
     - Assets to export
     - Interactive elements

4. **Development Roadmap**
   - Phase 1: Setup & Design System
   - Phase 2: Component Library
   - Phase 3: Page Implementation
   - Phase 4: Interactions & Animations

5. **Asset Export List**
   - Images (with imageRef IDs)
   - Icons/SVGs (vector elements)
   - GIFs/Videos (with gifRef IDs)

#### Step 5: Create Supporting Documents

**design_tokens.json** - Structured design system
```json
{
  "colors": {
    "primary": "#ffffff",
    "secondary": "#a49f9e",
    "accent": "#bfb8b7"
  },
  "typography": {
    "fontFamily": {
      "primary": "Google Sans"
    },
    "fontSize": {
      "base": "16px",
      "small": "14px"
    }
  },
  "spacing": {
    "xs": "8px",
    "sm": "16px",
    "md": "24px",
    "lg": "32px"
  }
}
```

**component_inventory.md** - List of all components
```markdown
# Component Inventory

## Buttons
- Primary Button (with hover state)
- Secondary Button
- Text Link

## Cards
- Project Card
- Blog Card

## Navigation
- Header
- Footer
- Mobile Menu
```

### Phase 3: Implementation Guidance

#### Step 6: Provide Next Steps
After creating the plan, guide the user:
1. Review the implementation plan
2. Prioritize which pages/components to build first
3. Export required assets from Figma
4. Set up project structure
5. Begin implementation

---

## Output Format

### Primary Output: implementation_plan.md

Structure:
```markdown
# Implementation Plan: [Design File Name]

## Overview
- File: [Name]
- Last Modified: [Date]
- Pages: [Count]
- Components: [Count]

## Design System

### Colors
[Color palette with HEX values]

### Typography
[Font families, sizes, weights]

### Spacing
[Spacing scale]

## Pages

### [Page Name]
**Node ID:** [ID]
**Dimensions:** [Width] × [Height]

#### Layout Structure
[Description of layout]

#### Components Required
- [Component 1]
- [Component 2]

#### Assets to Export
- [Asset 1] (imageRef: [ID])
- [Asset 2] (gifRef: [ID])

## Development Roadmap

### Phase 1: Foundation
- [ ] Set up project structure
- [ ] Create design system CSS
- [ ] Configure build tools

### Phase 2: Components
- [ ] Build Button component
- [ ] Build Card component
- [ ] Build Navigation component

### Phase 3: Pages
- [ ] Implement Homepage
- [ ] Implement About page
- [ ] Implement Contact page

### Phase 4: Polish
- [ ] Add animations
- [ ] Optimize performance
- [ ] Test responsiveness

## Verification Plan
[How to test the implementation]
```

---

## Key Extraction Rules

### Colors
- Extract from `fills` property
- Convert RGB to HEX: `rgb(r, g, b)` → `#RRGGBB`
- Group by usage (primary, secondary, text, background)
- Check for `boundVariables` to identify design tokens

### Typography
- Extract from `style` property in TEXT nodes
- Capture: `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`
- Create typography scale based on unique sizes

### Spacing
- Extract from layout properties: `paddingLeft`, `paddingRight`, `paddingTop`, `paddingBottom`
- Extract from: `itemSpacing`, `layoutGrow`, `layoutSizing`
- Identify patterns and create spacing tokens

### Components
- Identify by `type: "INSTANCE"` or `type: "COMPONENT"`
- Track `componentId` for variants
- Document `componentProperties` for states

### Images/Assets
- Look for `imageRef` in fills
- Look for `gifRef` for animated content
- Track `absoluteBoundingBox` for dimensions

---

## Example Invocations

### User Request 1:
> "Analyze my Figma designs and create an implementation plan"

**Skill Actions:**
1. Read `FIGMA_FILE_KEY` from `.env`
2. Call `mcp_figma_get_figma_file(fileKey)`
3. Parse entire file structure
4. Extract design system
5. Create `implementation_plan.md`
6. Create `design_tokens.json`
7. Create `component_inventory.md`
8. Notify user for review

### User Request 2:
> "Get the Homepage design and plan its implementation"

**Skill Actions:**
1. Read `FIGMA_FILE_KEY` and `FIGMA_NODE_ID` from `.env`
2. Call `mcp_figma_get_figma_node(fileKey, nodeId)`
3. Parse Homepage node structure
4. Extract components and assets
5. Create focused implementation plan for Homepage only
6. List required components
7. Provide implementation steps

### User Request 3:
> "Extract the design system from Figma"

**Skill Actions:**
1. Fetch entire Figma file
2. Traverse all nodes to collect:
   - All unique colors
   - All typography styles
   - All spacing values
3. Create `design_tokens.json`
4. Create CSS custom properties file
5. Document usage guidelines

---

## Best Practices

### 1. Always Start with Full File Fetch
- Get the complete picture before diving into specifics
- Understand the overall structure and design system
- Identify reusable patterns and components

### 2. Extract Design Tokens First
- Colors, typography, and spacing are foundational
- Create a design system before building components
- Use CSS custom properties for maintainability

### 3. Identify Component Hierarchy
- Start with atomic components (buttons, inputs)
- Build molecules (cards, forms)
- Assemble organisms (headers, sections)
- Construct pages (templates)

### 4. Plan for Responsiveness
- Check `constraints` properties
- Look for multiple breakpoint frames
- Document responsive behavior

### 5. Document Interactive Elements
- Identify `interactions` and `transitionNodeID`
- Document hover states, animations
- Note transition durations and easing

### 6. Asset Management
- Create organized export list
- Group by type (images, icons, videos)
- Note required formats and sizes

---

## Error Handling

### Missing Environment Variables
```
If FIGMA_API_KEY or FIGMA_FILE_KEY is missing:
1. Inform user about missing configuration
2. Point to setup documentation
3. Do not proceed with analysis
```

### API Errors
```
If Figma API returns errors:
1. Check API key validity
2. Verify file access permissions
3. Confirm file key is correct
4. Provide clear error message to user
```

### Empty or Invalid Data
```
If fetched data is empty or malformed:
1. Verify node ID exists in file
2. Check if file has been deleted
3. Suggest refreshing API token
```

---

## Integration with Development

### After Planning Phase
Once the implementation plan is created and approved:

1. **Setup Phase**
   - Create project structure
   - Install dependencies
   - Configure build tools

2. **Design System Phase**
   - Create CSS custom properties from tokens
   - Set up typography system
   - Configure spacing utilities

3. **Component Phase**
   - Build components in priority order
   - Test each component in isolation
   - Document component APIs

4. **Page Phase**
   - Assemble components into pages
   - Implement routing
   - Add page-specific logic

5. **Polish Phase**
   - Add animations and transitions
   - Optimize performance
   - Test across browsers

---

## Success Criteria

A successful Figma analysis should produce:

✅ **Complete Implementation Plan** - Clear roadmap with phases and tasks  
✅ **Design System Documentation** - Colors, typography, spacing extracted  
✅ **Component Inventory** - List of all components to build  
✅ **Asset Export List** - All images/icons/videos identified  
✅ **Development Roadmap** - Prioritized task list  
✅ **Verification Plan** - How to test the implementation  

---

## Version History

- **v1.0.0** (2026-02-12) - Initial skill creation
  - Full file analysis capability
  - Design token extraction
  - Implementation plan generation
  - Component inventory creation
