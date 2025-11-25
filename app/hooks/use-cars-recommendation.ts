import { useEffect, useState } from "react";
import { useCallTool } from "./use-call-tool";

export type CarData = {
  model: string;
  year: number;
  price: string;
  description: string;
  imageUrl?: string;
};

export type UseCarsRecommendationReturn = {
  cars: CarData[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

type ToolResult = {
  result?: {
    structuredContent?: {
      recommendations?: CarData[];
    };
  };
};

/**
 * Hook to fetch MNOJ cars recommendations from MCP tool (generic POC)
 * 
 * @param budget - Optional budget range filter
 * @param vehicleType - Optional vehicle type filter
 * @param preferredBrand - Optional brand preference filter
 * @returns Object containing cars data, loading state, and error state
 * 
 * @example
 * ```tsx
 * const { cars, loading, error } = useCarsRecommendation("20000-30000", "SUV");
 * ```
 */
export function useCarsRecommendation(
  budget?: string,
  vehicleType?: "SUV" | "Sedan" | "Hatchback" | "MPV",
  preferredBrand?: string
): UseCarsRecommendationReturn {
  const [cars, setCars] = useState<CarData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const callTool = useCallTool();

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);

      // Call the MCP tool with parameters
      const response = await callTool("mnoj_cars_recommendation", {
        budget: budget || "above 0",
        vehicleType: vehicleType || "SUV",
        preferredBrand: preferredBrand,
      });

      if (!response) {
        setCars([]);
        return;
      }

      // Parse the response - it could be JSON string or object
      let toolResult: ToolResult = {};
      if (typeof response.result === "string") {
        try {
          toolResult = JSON.parse(response.result);
        } catch {
          toolResult = response as unknown as ToolResult;
        }
      } else {
        toolResult = response as unknown as ToolResult;
      }

      const recommendations = toolResult?.result?.structuredContent?.recommendations;
      if (Array.isArray(recommendations)) {
        setCars(recommendations);
      } else {
        setCars([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch cars");
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [budget, vehicleType, preferredBrand]);

  return { cars, loading, error, refetch: fetchCars };
}
