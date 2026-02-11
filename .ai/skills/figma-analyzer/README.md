# Figma Analyzer Skill

A comprehensive AI skill for analyzing Figma designs and creating detailed implementation plans for web development.

---

## 📁 Skill Structure

```
.ai/skills/figma-analyzer/
├── SKILL.md                          # Main skill documentation
├── README.md                         # This file
├── templates/
│   ├── implementation_plan_template.md
│   ├── design_tokens_template.json
│   └── component_inventory_template.md
└── examples/
    └── paranoids_agency_example.md
```

---

## 🚀 Quick Start

### Invoke the Skill

Simply ask the AI assistant:

```
"Analyze my Figma designs and create an implementation plan"
```

or

```
"Use the Figma analyzer skill to plan development"
```

### What It Does

1. **Fetches** your Figma design file using the MCP server
2. **Analyzes** all pages, components, and design tokens
3. **Extracts** colors, typography, spacing, and layout patterns
4. **Creates** comprehensive implementation documentation:
   - Implementation plan with development roadmap
   - Design tokens (JSON + CSS)
   - Component inventory
   - Asset export list

---

## 📋 Prerequisites

Before using this skill, ensure:

1. **Figma MCP Server** is configured
   - Check `mcp_config.json` has Figma server entry
   
2. **Environment Variables** are set in `.env`:
   ```bash
   FIGMA_API_KEY=your_figma_api_key
   FIGMA_FILE_KEY=your_figma_file_key
   FIGMA_NODE_ID=optional_specific_node_id
   ```

3. **Figma Access Token** is valid
   - Get from: Figma → Settings → Personal Access Tokens

---

## 💡 Usage Examples

### Example 1: Full Site Analysis
```
User: "Analyze the entire Figma file and create an implementation plan"

AI will:
- Fetch entire Figma file
- Parse all pages and sections
- Extract design system
- Create implementation_plan.md
- Create design_tokens.json
- Create component_inventory.md
```

### Example 2: Specific Page
```
User: "Get the Homepage design and plan its implementation"

AI will:
- Fetch specific Homepage node
- Analyze layout and components
- Create focused implementation plan
- List required components and assets
```

### Example 3: Design System Only
```
User: "Extract the design system from Figma"

AI will:
- Fetch entire file
- Extract all colors, typography, spacing
- Create design_tokens.json
- Create CSS custom properties file
```

---

## 📤 Output Files

### implementation_plan.md
Comprehensive plan including:
- Design system (colors, typography, spacing)
- Page-by-page breakdown
- Component inventory
- Development roadmap (phased approach)
- Asset export list
- Verification plan

### design_tokens.json
Structured design tokens:
```json
{
  "colors": { ... },
  "typography": { ... },
  "spacing": { ... },
  "borderRadius": { ... },
  "shadows": { ... }
}
```

### component_inventory.md
Complete component list:
- Atomic components (buttons, inputs, icons)
- Molecule components (cards, forms)
- Organism components (header, footer, sections)
- Component dependencies
- Build order recommendations

---

## 🎯 Key Features

✅ **Automatic Design Token Extraction** - Colors, typography, spacing  
✅ **Component Hierarchy Analysis** - Atomic design structure  
✅ **Layout Pattern Recognition** - Auto-layout, grids, constraints  
✅ **Asset Identification** - Images, icons, GIFs to export  
✅ **Interactive Element Detection** - Hover states, animations  
✅ **Development Roadmap** - Phased implementation plan  
✅ **Responsive Design Analysis** - Breakpoints and constraints  

---

## 🔧 Configuration

### Figma File Setup

1. **Get File Key** from Figma URL:
   ```
   https://www.figma.com/design/FILE_KEY/file-name
   ```

2. **Get Node ID** (optional) by selecting a frame and checking URL:
   ```
   https://www.figma.com/design/FILE_KEY/name?node-id=93-1305
   ```

3. **Add to `.env`**:
   ```bash
   FIGMA_FILE_KEY=yatvO2qBSEksHbV7Zc49KC
   FIGMA_NODE_ID=93-1305
   ```

---

## 📖 How It Works

### Phase 1: Discovery
1. Read configuration from `.env`
2. Fetch Figma data via MCP tools
3. Parse document structure

### Phase 2: Analysis
1. Traverse node tree
2. Extract design tokens
3. Identify components and patterns
4. Map layout structures

### Phase 3: Documentation
1. Generate implementation plan
2. Create design tokens file
3. Build component inventory
4. List assets to export

---

## 🎨 Design System Extraction

The skill automatically extracts:

### Colors
- From `fills` property
- Converts RGB to HEX
- Groups by usage (primary, text, background)
- Identifies design variables

### Typography
- Font families and weights
- Font sizes and line heights
- Letter spacing
- Creates typography scale

### Spacing
- Padding and margins
- Layout gaps
- Creates spacing tokens

### Components
- Identifies component instances
- Maps component variants
- Documents component states

---

## 🚦 Best Practices

1. **Start with full file analysis** - Get the complete picture
2. **Extract design system first** - Foundation before components
3. **Build atomically** - Atoms → Molecules → Organisms → Pages
4. **Plan for responsiveness** - Check constraints and breakpoints
5. **Document interactions** - Hover states, animations, transitions

---

## 🐛 Troubleshooting

### "Missing FIGMA_API_KEY"
- Add your Figma personal access token to `.env`
- Get from: Figma → Settings → Personal Access Tokens

### "File not found"
- Verify `FIGMA_FILE_KEY` is correct
- Check file access permissions
- Ensure file hasn't been deleted

### "Invalid node ID"
- Verify node exists in the file
- Check node ID format (use hyphen: 93-1305)
- Try fetching entire file first

---

## 📚 Related Documentation

- [SKILL.md](./SKILL.md) - Complete skill documentation
- [HOW_TO_GET_FIGMA_IDS.md](../../HOW_TO_GET_FIGMA_IDS.md) - Guide to extracting Figma IDs
- [FIGMA_FULL_FILE_WORKFLOW.md](../../FIGMA_FULL_FILE_WORKFLOW.md) - Full file analysis workflow

---

## 🔄 Version History

- **v1.0.0** (2026-02-12)
  - Initial skill creation
  - Full file analysis capability
  - Design token extraction
  - Implementation plan generation
  - Component inventory creation

---

## 🤝 Contributing

To improve this skill:
1. Update `SKILL.md` with new extraction rules
2. Add new templates to `templates/`
3. Document examples in `examples/`
4. Update version history

---

## 📝 License

This skill is part of the project's AI tooling and follows the project's license.
