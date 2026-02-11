#!/usr/bin/env node

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} = require('@modelcontextprotocol/sdk/types.js');
const axios = require('axios');

const FIGMA_TOKEN = process.env.FIGMA_API_KEY || process.env.FIGMA_TOKEN;

if (!FIGMA_TOKEN) {
    console.error('Error: FIGMA_API_KEY environment variable is required');
    process.exit(1);
}

// Create MCP server
const server = new Server(
    {
        name: 'figma-mcp-server',
        version: '1.0.0',
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: 'get_figma_file',
                description: 'Get information about a Figma file',
                inputSchema: {
                    type: 'object',
                    properties: {
                        fileKey: {
                            type: 'string',
                            description: 'The Figma file key (from the URL)',
                        },
                    },
                    required: ['fileKey'],
                },
            },
            {
                name: 'get_figma_node',
                description: 'Get a specific node from a Figma file',
                inputSchema: {
                    type: 'object',
                    properties: {
                        fileKey: {
                            type: 'string',
                            description: 'The Figma file key',
                        },
                        nodeId: {
                            type: 'string',
                            description: 'The node ID (format: 93-1305, will be converted to 93:1305)',
                        },
                    },
                    required: ['fileKey', 'nodeId'],
                },
            },
            {
                name: 'get_figma_comments',
                description: 'Get comments from a Figma file',
                inputSchema: {
                    type: 'object',
                    properties: {
                        fileKey: {
                            type: 'string',
                            description: 'The Figma file key',
                        },
                    },
                    required: ['fileKey'],
                },
            },
            {
                name: 'export_figma_image',
                description: 'Export an image from Figma',
                inputSchema: {
                    type: 'object',
                    properties: {
                        fileKey: {
                            type: 'string',
                            description: 'The Figma file key',
                        },
                        nodeId: {
                            type: 'string',
                            description: 'The node ID to export',
                        },
                        format: {
                            type: 'string',
                            enum: ['png', 'jpg', 'svg', 'pdf'],
                            description: 'Export format',
                        },
                        scale: {
                            type: 'number',
                            description: 'Scale factor (1-4 for raster, ignored for SVG)',
                        },
                    },
                    required: ['fileKey', 'nodeId', 'format'],
                },
            },
        ],
    };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
        switch (name) {
            case 'get_figma_file': {
                const response = await axios.get(
                    `https://api.figma.com/v1/files/${args.fileKey}`,
                    {
                        headers: { 'X-Figma-Token': FIGMA_TOKEN },
                    }
                );
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(response.data, null, 2),
                        },
                    ],
                };
            }

            case 'get_figma_node': {
                const nodeId = args.nodeId.replace('-', ':');
                const response = await axios.get(
                    `https://api.figma.com/v1/files/${args.fileKey}/nodes?ids=${nodeId}`,
                    {
                        headers: { 'X-Figma-Token': FIGMA_TOKEN },
                    }
                );
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(response.data, null, 2),
                        },
                    ],
                };
            }

            case 'get_figma_comments': {
                const response = await axios.get(
                    `https://api.figma.com/v1/files/${args.fileKey}/comments`,
                    {
                        headers: { 'X-Figma-Token': FIGMA_TOKEN },
                    }
                );
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(response.data, null, 2),
                        },
                    ],
                };
            }

            case 'export_figma_image': {
                const nodeId = args.nodeId.replace('-', ':');
                const params = {
                    ids: nodeId,
                    format: args.format,
                };
                if (args.scale) {
                    params.scale = args.scale;
                }

                const response = await axios.get(
                    `https://api.figma.com/v1/images/${args.fileKey}`,
                    {
                        headers: { 'X-Figma-Token': FIGMA_TOKEN },
                        params,
                    }
                );
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(response.data, null, 2),
                        },
                    ],
                };
            }

            default:
                throw new Error(`Unknown tool: ${name}`);
        }
    } catch (error) {
        const errorMessage = error.response?.data || error.message;
        return {
            content: [
                {
                    type: 'text',
                    text: `Error: ${JSON.stringify(errorMessage, null, 2)}`,
                },
            ],
            isError: true,
        };
    }
});

// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('Figma MCP server running on stdio');
}

main().catch((error) => {
    console.error('Server error:', error);
    process.exit(1);
});
