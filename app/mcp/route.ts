import { baseURL } from "@/baseUrl";
import { createMcpHandler } from "mcp-handler";
import { getAppsSdkCompatibleHtml } from "@/app/mcp/utility/helpers";
import { carsWidget } from "@/app/mcp/widgets/index";
import { carsRecommendationTool } from "@/app/mcp/tools/cars-recommendation";
import { createCarsWidgetResource } from "@/app/mcp/resources/cars-widget";

const handler = createMcpHandler(async (server) => {
  // Fetch cars page HTML
  const carsHtml = await getAppsSdkCompatibleHtml(baseURL, "/chatgpt-cars-page");

  // Set up cars widget with fetched HTML
  carsWidget.html = carsHtml;

  // Register Cars Widget Resource
  const carsResourceConfig = createCarsWidgetResource(carsWidget, carsHtml);
  server.registerResource(
    "cars-widget",
    carsWidget.templateUri,
    carsResourceConfig.options,
    carsResourceConfig.handler
  );

  // Register Cars Recommendation Tool
  server.registerTool(
    carsWidget.id,
    {
      title: carsWidget.title,
      description:
        "Get personalized Mahindra car recommendations based on budget, vehicle type, and preferences",
      inputSchema: carsRecommendationTool.schema,
      _meta: {
        "openai/outputTemplate": carsWidget.templateUri,
        "openai/toolInvocation/invoking": carsWidget.invoking,
        "openai/toolInvocation/invoked": carsWidget.invoked,
        "openai/widgetAccessible": false,
        "openai/resultCanProduceWidget": true,
      },
    },
    carsRecommendationTool.handler(carsWidget)
  );
});

export const GET = handler;
export const POST = handler;
