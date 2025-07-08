import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "copilot-mcp-server",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});


// Example tool: echo
server.tool(
  "echo",
  "Echoes back the input string",
  { text: z.string().describe("Text to echo") },
  async ({ text }) => ({
    content: [{ type: "text", text }],
  })
);

// Playwright tool: get page title
server.tool(
  "playwright-get-title",
  "Fetches the title of a web page using Playwright.",
  { url: z.string().url().describe("URL of the page to fetch title from") },
  async ({ url }) => {
    const { chromium } = await import("playwright");
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const title = await page.title();
    await browser.close();
    return { content: [{ type: "text", text: title }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Copilot MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
