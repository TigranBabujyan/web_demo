---
description: Analyze Figma designs and create implementation plans
---

# Figma Design Analysis Workflow

This workflow analyzes Figma design files and creates comprehensive implementation plans for web development.

## Prerequisites

Ensure the following environment variables are set in `.env`:
- `FIGMA_API_KEY` - Your Figma personal access token
- `FIGMA_FILE_KEY` - The Figma file ID from the URL
- `FIGMA_NODE_ID` - (Optional) Specific node/page to analyze

## Steps

### 1. Verify Figma MCP Configuration

Check that the Figma MCP server is properly configured:
- Verify `mcp_config.json` includes the Figma server
- Confirm environment variables are set

### 2. Fetch Figma Design Data

Use the Figma skill to retrieve design data:
- Read the `.ai/skills/figma-analyzer/SKILL.md` for detailed instructions
- Use MCP tools to fetch the Figma file or specific nodes
- Parse the design structure

### 3. Extract Design System

Analyze and extract:
- Color palette (RGB → HEX conversion)
- Typography scale (fonts, sizes, weights)
- Spacing system (padding, margins, gaps)
- Component variants and states
- Layout patterns

### 4. Generate Implementation Plan

Create comprehensive documentation:
- `implementation_plan.md` - Full development roadmap
- `design_tokens.json` - Structured design system
- `component_inventory.md` - List of all components

### 5. Review and Approve

Present the implementation plan to the user for review and approval before proceeding with development.

## Expected Outputs

After running this workflow, you should have:
- ✅ Complete implementation plan with phases and tasks
- ✅ Design system documentation (colors, typography, spacing)
- ✅ Component inventory
- ✅ Asset export list
- ✅ Development roadmap

## Next Steps

After the plan is approved:
1. Set up project structure
2. Create design system CSS
3. Build component library
4. Implement pages
5. Add interactions and polish
