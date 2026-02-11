# How to Get Figma IDs

## 🔑 Getting the File Key

The **File Key** is in the Figma URL when you open a file.

### Figma URL Format:
```
https://www.figma.com/design/{FILE_KEY}/{file-name}
```

### Example:
```
https://www.figma.com/design/yatvO2qBSEksHbV7Zc49KC/Paranoids-Agency-Website-Design
                              ^^^^^^^^^^^^^^^^^^^^^^
                              This is your FILE_KEY
```

**Your current file key:** `yatvO2qBSEksHbV7Zc49KC`

---

## 🎯 Getting the Node ID

The **Node ID** identifies a specific frame, component, or element within your Figma file.

### Method 1: From the URL (Easiest)

1. **Open your Figma file**
2. **Select the frame/component** you want to reference
3. **Look at the URL** - it will update to include the node ID:

```
https://www.figma.com/design/yatvO2qBSEksHbV7Zc49KC/file-name?node-id=93-1305
                                                                    ^^^^^^^
                                                                    NODE_ID
```

> **Note:** Figma shows node IDs with a hyphen (`93-1305`), but the API uses a colon (`93:1305`). Most tools handle this conversion automatically.

### Method 2: Copy Link to Selection

1. **Right-click** on a frame/component in Figma
2. Select **"Copy link to selection"** or **"Copy/Paste as" → "Copy link"**
3. The copied link will contain the node ID:
   ```
   https://www.figma.com/design/yatvO2qBSEksHbV7Zc49KC/file-name?node-id=93-1305&...
   ```

### Method 3: Using Figma Plugins

1. Install a plugin like **"Node ID"** or **"Copy Node ID"**
2. Select your frame/component
3. Run the plugin to copy the node ID directly

---

## 📋 Quick Reference

### Current Configuration

Your `.env` file should look like this:

```bash
# Figma API Configuration
FIGMA_API_KEY=key
FIGMA_FILE_KEY=yatvO2qBSEksHbV7Zc49KC
FIGMA_NODE_ID=93-1305
```

### Where to Find Each Value:

| Variable | Where to Find | Example |
|----------|---------------|---------|
| `FIGMA_API_KEY` | Figma Account Settings → Personal Access Tokens | `figd_YOUR_TOKEN_HERE` |
| `FIGMA_FILE_KEY` | URL between `/design/` and next `/` | `yatvO2qBSEksHbV7Zc49KC` |
| `FIGMA_NODE_ID` | URL parameter `node-id=` or right-click → Copy link | `93-1305` |

---

## 🔍 Finding Specific Elements

### To get IDs for different pages/frames:

1. **Navigate to the page** you want in Figma
2. **Select the top-level frame** (e.g., "Homepage", "About Page", etc.)
3. **Copy the link** or check the URL
4. **Extract the node ID** from the URL

### Example: Multiple Pages

```bash
# Homepage
FIGMA_NODE_ID_HOMEPAGE=93-1305

# About Page
FIGMA_NODE_ID_ABOUT=94-2106

# Contact Page
FIGMA_NODE_ID_CONTACT=95-3207
```

---

## 💡 Pro Tips

1. **Bookmark important frames** - Use Figma's bookmark feature to quickly navigate to key frames
2. **Use descriptive frame names** - Makes it easier to identify which node ID corresponds to what
3. **Document your node IDs** - Keep a reference of important node IDs in your project documentation
4. **Test with the MCP server** - Use the Figma MCP tools to verify you have the correct IDs

---

## 🧪 Testing Your IDs

You can test if your IDs are correct by asking me to fetch the Figma data:

```
"Get the Figma file information"
"Get the specific node from Figma"
```

I'll use the IDs from your `.env` file automatically!
