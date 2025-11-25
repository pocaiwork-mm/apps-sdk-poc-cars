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

type CarsToolResponse = {
  result?: string;
  structuredContent?: {
    count?: number;
    filters?: Record<string, unknown>;
    recommendations?: CarData[];
    timestamp?: string;
  };
  isError?: boolean;
} | null;

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
      console.warn("[useCarsRecommendation] 🚀 Starting fetch with params:", { budget, vehicleType, preferredBrand });

      // Call the MCP tool with parameters
      const response = await callTool("mnoj_cars_recommendation", {
        budget: budget || "above 0",
        vehicleType: vehicleType || "SUV",
        preferredBrand: preferredBrand,
      });

      console.warn("[useCarsRecommendation] 📥 Raw response:", response);

      if (!response) {
        console.warn("[useCarsRecommendation] ⚠️ No response from tool");
        setCars([]);
        return;
      }

      // The response has structuredContent at the top level with recommendations inside
      // response.structuredContent.recommendations = CarData[]
      const toolResponse = response as CarsToolResponse;
      let recommendations = toolResponse?.structuredContent?.recommendations;
      console.warn("[useCarsRecommendation] 🔍 Extracted recommendations from structuredContent:", recommendations);
      
      if (Array.isArray(recommendations)) {
        console.warn("[useCarsRecommendation] ✅ Setting cars with", recommendations.length, "items:", recommendations);
        setCars(recommendations);
      } else {
        console.warn("[useCarsRecommendation] ❌ No valid recommendations found, setting empty array");
        setCars([]);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to fetch cars";
      console.warn("[useCarsRecommendation] 💥 Error:", errorMsg, err);
      setError(errorMsg);
      setCars([]);
    } finally {
      setLoading(false);
      console.warn("[useCarsRecommendation] ⏹️ Fetch complete");
    }
  };

  useEffect(() => {
    fetchCars();
  }, [budget, vehicleType, preferredBrand]);

  return { cars, loading, error, refetch: fetchCars };
}
