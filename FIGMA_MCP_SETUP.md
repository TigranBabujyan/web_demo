# Figma MCP Server Setup Guide

This guide explains how to set up the Figma MCP server for use with Antigravity or other MCP-compatible clients.

## Prerequisites

- Node.js installed
- Figma API key ([Get one here](https://www.figma.com/developers/api#access-tokens))

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Figma API Key

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your Figma API key:

```
FIGMA_API_KEY=your_actual_figma_api_key
```

> ⚠️ **Important**: Never commit your `.env` file with real API keys!

### 3. Configure Antigravity MCP

To use this server with Antigravity, you need to update Antigravity's MCP configuration file:

**Location**: `C:\Users\<YOUR_USERNAME>\.gemini\antigravity\mcp_config.json` (Windows)
or `~/.gemini/antigravity/mcp_config.json` (macOS/Linux)

**Add or update the Figma server entry**:

```json
{
  "mcpServers": {
    "figma": {
      "command": "node",
      "args": [
        "<ABSOLUTE_PATH_TO_PROJECT>/figma-mcp-server.js"
      ],
      "env": {
        "FIGMA_API_KEY": "<YOUR_FIGMA_API_KEY>"
      }
    }
  }
}
```

**Replace these placeholders**:
- `<ABSOLUTE_PATH_TO_PROJECT>`: Full path to your project directory
  - Example (Windows): `C:\\Users\\YourName\\Projects\\web_demo\\figma-mcp-server.js`
  - Example (macOS/Linux): `/Users/YourName/Projects/web_demo/figma-mcp-server.js`
- `<YOUR_FIGMA_API_KEY>`: Your actual Figma API key

**After updating, restart Antigravity** to load the new configuration.

## Available MCP Tools

Once configured, the following tools are available:

### `get_figma_file`
Get complete information about a Figma file
- **Input**: `fileKey` (string)

### `get_figma_node`
Get a specific node/frame from a Figma file
- **Input**: `fileKey` (string), `nodeId` (string, e.g., "93-1305")

### `get_figma_comments`
Get all comments from a Figma file
- **Input**: `fileKey` (string)

### `export_figma_image`
Export a node as an image
- **Input**: `fileKey` (string), `nodeId` (string), `format` (png/jpg/svg/pdf), `scale` (optional, 1-4)

## Testing

You can test the server manually:

```bash
# The server uses stdio transport, so it's designed to be called by an MCP client
# For testing, you can verify it starts without errors:
node figma-mcp-server.js
# Press Ctrl+C to stop
```

## Troubleshooting

### "FIGMA_API_KEY environment variable is required"
Make sure you've added the `FIGMA_API_KEY` to your Antigravity MCP config or set it as an environment variable.

### Server not showing up in Antigravity
1. Verify the file path in `mcp_config.json` is correct and uses absolute paths
2. Restart Antigravity after making changes
3. Check that the `figma-mcp-server.js` file exists at the specified path

### API errors
- Verify your Figma API key is valid
- Ensure you have access to the Figma file you're trying to read
- Check that the file key and node IDs are correct

## Security Notes

- **Never commit your `.env` file** - it's already in `.gitignore`
- Store your Figma API key securely
- Consider using environment-specific API keys for different machines
- Rotate your API keys regularly

## File Structure

```
web_demo/
├── figma-mcp-server.js    # MCP server implementation
├── package.json           # Node.js dependencies
├── mcp_config.json        # Template MCP configuration
├── .env.example           # Environment variable template
├── .env                   # Your actual API keys (gitignored)
└── FIGMA_MCP_SETUP.md     # This file
```
