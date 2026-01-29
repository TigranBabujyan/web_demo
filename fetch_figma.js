const axios = require('axios');
const fs = require('fs');
const path = require('path');

const FIGMA_TOKEN = process.env.FIGMA_TOKEN || 'YOUR_FIGMA_TOKEN';
const FILE_KEY = 'yatvO2qBSEksHbV7Zc49KC';
const NODE_ID = '93-1305'; // Specific node from URL

async function getFigmaDesign() {
    try {
        console.log(`Fetching Figma file: ${FILE_KEY}...`);

        // We can also use the /nodes endpoint to get just the specific node, which is lighter
        const response = await axios.get(`https://api.figma.com/v1/files/${FILE_KEY}/nodes?ids=${NODE_ID.replace('-', ':')}`, {
            headers: { 'X-Figma-Token': FIGMA_TOKEN }
        });

        // Also get the full file styles/components if possible, or just the file info for context
        // But let's start with the specific node to avoid massive payloads

        const designData = {
            name: response.data.name,
            lastModified: response.data.lastModified,
            nodes: response.data.nodes,
            // We might want to fetch images later based on image refs
        };

        const outputDir = './skills';
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        const outputPath = path.join(outputDir, 'ui-context.json');
        fs.writeFileSync(outputPath, JSON.stringify(designData, null, 2));
        console.log(`✅ Figma design context exported to ${outputPath}`);

        // Let's also create a summary of colors and texts found in the node
        summarizeDesign(response.data.nodes);

    } catch (error) {
        console.error("❌ Error fetching Figma data:", error.response ? error.response.data : error.message);
    }
}

function summarizeDesign(nodes) {
    // A simple helper to log what we found - this will appear in the terminal output for the agent to read
    console.log("--- Design Summary ---");
    const k = Object.keys(nodes)[0];
    const root = nodes[k].document;

    console.log(`Root Node: ${root.name} (${root.type})`);

    // Recursive search for interesting props
    const colors = new Set();
    const texts = new Set();

    function traverse(node) {
        if (node.fills) {
            node.fills.forEach(fill => {
                if (fill.type === 'SOLID') {
                    const { r, g, b } = fill.color;
                    const hex = rgbToHex(r, g, b);
                    colors.add(hex);
                }
            });
        }
        if (node.type === 'TEXT' && node.characters) {
            texts.add(node.characters.substring(0, 50).replace(/\n/g, ' '));
        }
        if (node.children) {
            node.children.forEach(traverse);
        }
    }

    traverse(root);

    console.log("Colors found:", Array.from(colors));
    console.log("Text samples:", Array.from(texts).slice(0, 5));
}

function rgbToHex(r, g, b) {
    const toHex = (c) => {
        const hex = Math.round(c * 255).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };
    return "#" + toHex(r) + toHex(g) + toHex(b);
}

getFigmaDesign();
