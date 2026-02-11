# AI Skills Directory

This directory contains reusable AI skills that can be invoked to perform specialized tasks.

---

## 📁 Available Skills

### 🎨 [Figma Analyzer](./skills/figma-analyzer/)

Analyzes Figma design files and creates comprehensive implementation plans for web development.

**Invoke with:**
```
"Analyze my Figma designs and create an implementation plan"
"Use the Figma analyzer skill"
"Extract design system from Figma"
```

**Outputs:**
- Implementation plan with development roadmap
- Design tokens (JSON + CSS)
- Component inventory
- Asset export list

**Documentation:** [Read more →](./skills/figma-analyzer/README.md)

---

## 🚀 How to Use Skills

### Method 1: Natural Language
Simply mention the skill or its purpose in your request:
```
"Analyze my Figma designs"
"Create an implementation plan from Figma"
```

### Method 2: Direct Invocation
Explicitly ask to use a skill:
```
"Use the Figma analyzer skill on my design file"
```

---

## 📖 Skill Structure

Each skill follows this structure:

```
.ai/skills/[skill-name]/
├── SKILL.md              # Main skill documentation
├── README.md             # Quick start guide
├── templates/            # Output templates
│   └── *.md, *.json
└── examples/             # Real-world examples
    └── *.md
```

---

## ✨ Creating New Skills

To create a new skill:

1. **Create skill directory:**
   ```
   .ai/skills/[skill-name]/
   ```

2. **Add SKILL.md** with:
   - YAML frontmatter (name, description, tags)
   - Purpose and when to use
   - Prerequisites
   - Workflow steps
   - Output format
   - Best practices

3. **Add README.md** with:
   - Quick start guide
   - Usage examples
   - Configuration
   - Troubleshooting

4. **Create templates/** for output files

5. **Add examples/** with real-world usage

6. **Update this README** to list the new skill

---

## 🎯 Skill Categories

### Design & Planning
- **Figma Analyzer** - Design analysis and implementation planning

### Development
- *(Future skills)*

### Testing & QA
- *(Future skills)*

### Documentation
- *(Future skills)*

---

## 📚 Documentation

Each skill includes:
- ✅ **SKILL.md** - Complete technical documentation
- ✅ **README.md** - Quick start and usage guide
- ✅ **Templates** - Structured output formats
- ✅ **Examples** - Real-world use cases

---

## 🔧 Configuration

Skills may require configuration in:
- `.env` - Environment variables
- `mcp_config.json` - MCP server configuration
- Project-specific config files

Check each skill's README for specific requirements.

---

## 🤝 Contributing

To improve existing skills or add new ones:
1. Follow the skill structure above
2. Document thoroughly
3. Provide examples
4. Update this main README

---

## 📝 Version History

- **2026-02-12** - Added Figma Analyzer skill (v1.0.0)
- **2026-02-12** - Created AI skills directory structure
