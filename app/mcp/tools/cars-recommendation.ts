import { z } from "zod";
import { carsData, Car } from "@/app/mcp/data/cars";
import { Widget, WidgetMetadata } from "@/app/mcp/utility/types";
import { widgetMeta } from "@/app/mcp/utility/helpers";

export type CarsRecommendationInput = {
  budget: string;
  vehicleType: "SUV" | "Sedan" | "Hatchback" | "MPV";
  preferredBrand?: string;
};

export type CarsRecommendationOutput = {
  content: Array<{
    type: string;
    text: string;
  }>;
  structuredContent: {
    recommendations: Car[];
    count: number;
    filters: {
      budget: string;
      vehicleType: string;
      preferredBrand?: string;
    };
    timestamp: string;
  };
  _meta: WidgetMetadata;
};

export const carsRecommendationTool = {
  schema: z.object({
    budget: z
      .string()
      .describe(
        "Budget range (e.g., 'under 20000', '20000-30000', 'above 30000')"
      ),
    vehicleType: z
      .enum(["SUV", "Sedan", "Hatchback", "MPV"])
      .describe("Type of vehicle preference"),
    preferredBrand: z
      .string()
      .optional()
      .describe(
        "Preferred Mahindra brand (e.g., XUV, Scorpio, Bolero)"
      ),
  }),

  handler: (widget: Widget) =>
    async (
      input: CarsRecommendationInput
    ): Promise<CarsRecommendationOutput> => {
      const { budget, vehicleType, preferredBrand } = input;

      // Here will call actual api or database to get recommendations - POC its mocked
      
      // Here we filter from static data for demonstration
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
            text: `Found ${recommendations.length} Mahindra cars matching your criteria (Budget: ${budget}, Type: ${vehicleType}${preferredBrand ? `, Brand: ${preferredBrand}` : ""})`,
          },
        ],
        structuredContent: {
          recommendations,
          count: recommendations.length,
          filters: { budget, vehicleType, preferredBrand },
          timestamp: new Date().toISOString(),
        },
        _meta: widgetMeta(widget),
      };
    },
};
