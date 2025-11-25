import { createMcpHandler } from "mcp-handler";
import initializeMcp from "@/app/mcp/init";

// Expose an SSE-compatible route at /mcp/sse
// The MCP handler will treat GET on this path as an SSE connection.
const handler = createMcpHandler(initializeMcp, undefined, {
  sseEndpoint: "/mcp/sse",
  // Keep default streamable endpoint unchanged
});

export const GET = handler;
export const POST = handler;
