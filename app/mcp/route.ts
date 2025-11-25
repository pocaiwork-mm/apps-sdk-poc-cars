import { baseURL } from "@/baseUrl";
import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import { carsData, Car } from "@/app/mcp/data/cars";

const getAppsSdkCompatibleHtml = async (baseUrl: string, path: string) => {
  const result = await fetch(`${baseUrl}${path}`);
  return await result.text();
};

type ContentWidget = {
  id: string;
  title: string;
  templateUri: string;
  invoking: string;
  invoked: string;
  html: string;
  description: string;
  widgetDomain: string;
};

function widgetMeta(widget: ContentWidget) {
  return {
    "openai/outputTemplate": widget.templateUri,
    "openai/toolInvocation/invoking": widget.invoking,
    "openai/toolInvocation/invoked": widget.invoked,
    "openai/widgetAccessible": false,
    "openai/resultCanProduceWidget": true,
  } as const;
}

const handler = createMcpHandler(async (server) => {
  const html = await getAppsSdkCompatibleHtml(baseURL, "/");
  const carsHtml = await getAppsSdkCompatibleHtml(baseURL, "/chatgpt-cars-page");

  // Content Widget
  const contentWidget: ContentWidget = {
    id: "show_content",
    title: "Show Content",
    templateUri: "ui://widget/content-template.html",
    invoking: "Loading content...",
    invoked: "Content loaded",
    html: html,
    description: "Displays the homepage content",
    widgetDomain: "https://nextjs.org/docs",
  };
  
  server.registerResource(
    "content-widget",
    contentWidget.templateUri,
    {
      title: contentWidget.title,
      description: contentWidget.description,
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": contentWidget.description,
        "openai/widgetPrefersBorder": true,
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${contentWidget.html}</html>`,
          _meta: {
            "openai/widgetDescription": contentWidget.description,
            "openai/widgetPrefersBorder": true,
            "openai/widgetDomain": contentWidget.widgetDomain,
          },
        },
      ],
    })
  );

  server.registerTool(
    contentWidget.id,
    {
      title: contentWidget.title,
      description:
        "Fetch and display the homepage content with the name of the user",
      inputSchema: {
        name: z.string().describe("The name of the current user to display on the homepage"),
      },
      _meta: widgetMeta(contentWidget),
    },
    async ({ name }) => {
      return {
        content: [
          {
            type: "text",
            text: name,
          },
        ],
        structuredContent: {
          name: name,
          timestamp: new Date().toISOString(),
        },
        _meta: widgetMeta(contentWidget),
      };
    }
  );

  // Cars Recommendation Widget (generic POC: MNOJ)
  const carsWidget: ContentWidget = {
    id: "mnoj_cars_recommendation",
    title: "MNOJ Cars Widget",
    templateUri: "ui://widget/cars-widget.html",
    invoking: "Finding the perfect MNOJ for you...",
    invoked: "Cars recommendations ready",
    html: carsHtml,
    description: "Displays a MNOJ Car Widget with styling",
    widgetDomain: "https://example.com",
  };

  server.registerResource(
    "cars-widget-html",
    carsWidget.templateUri,
    {
      title: carsWidget.title,
      description: carsWidget.description,
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": carsWidget.description,
        "openai/widgetPrefersBorder": true,
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${carsWidget.html}</html>`,
          _meta: {
            "openai/widgetDescription": carsWidget.description,
            "openai/widgetPrefersBorder": true,
            "openai/widgetDomain": carsWidget.widgetDomain,
          },
        },
      ],
    })
  );

  server.registerTool(
    carsWidget.id,
    {
      title: carsWidget.title,
      description:
        "Get MNOJ car recommendations based on budget, vehicle type, and preferences from the MNOJ catalog",
      inputSchema: {
        budget: z
          .string()
          .describe("Budget range (e.g., 'under 20000', '20000-30000', 'above 30000')"),
        vehicleType: z
          .enum(["SUV", "Sedan", "Hatchback", "MPV"])
          .describe("Type of vehicle preference"),
        preferredBrand: z
          .string()
          .optional()
          .describe("Preferred MNOJ brand (e.g., XUV, Scorpio, Bolero)"),
      },
      _meta: widgetMeta(carsWidget),
    },
    async ({ budget, vehicleType, preferredBrand }) => {
      // Filter cars based on criteria
      const recommendations = carsData.filter((car) => {
        const typeMatch = !vehicleType || car.type === vehicleType;
        const brandMatch =
          !preferredBrand ||
          car.model.toLowerCase().includes(preferredBrand.toLowerCase());
        return typeMatch && brandMatch;
      });

      return {
        content: [
          {
            type: "text",
            text: `Found ${recommendations.length} MNOJ cars matching your criteria (Budget: ${budget}, Type: ${vehicleType}${preferredBrand ? `, Brand: ${preferredBrand}` : ""})`,
          },
        ],
        structuredContent: {
          recommendations,
          count: recommendations.length,
          filters: { budget, vehicleType, preferredBrand },
          timestamp: new Date().toISOString(),
        },
        _meta: widgetMeta(carsWidget),
      };
    }
  );
});



export const GET = handler;
export const POST = handler;