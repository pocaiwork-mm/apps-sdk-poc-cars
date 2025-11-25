import { useEffect, useState } from "react";
import { useCallTool } from "./use-call-tool";
import { useWidgetProps } from "./use-widget-props";
import { useIsChatGptApp } from "./use-is-chatgpt-app";
import { useOpenAIGlobal } from "./use-openai-global";
import { carsData } from "../mcp/data/cars";

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
  // Shape when called directly via useCallTool
  structuredContent?: {
    count?: number;
    filters?: Record<string, unknown>;
    recommendations?: CarData[];
    timestamp?: string;
  };
  // In case tool returns recommendations at the top level
  recommendations?: CarData[];
  isError?: boolean;
  error?: string;
} | null;

// Shape of the widget props coming from ChatGPT tool output
type CarsWidgetProps = {
  recommendations?: CarData[];
  structuredContent?: {
    recommendations?: CarData[];
  };
  result?: {
    structuredContent?: {
      recommendations?: CarData[];
    };
  };
};

// Shape of the OpenAI global tool input (arguments the model used)
type CarsToolInput = {
  budget?: string;
  vehicleType?: "SUV" | "Sedan" | "Hatchback" | "MPV";
  preferredBrand?: string;
};

/**
 * Hook to fetch MNOJ car recommendations.
 *
 * Behavior:
 * - Inside ChatGPT:
 *   - Primary source: widget props (tool output) via useWidgetProps.
 *   - refetch(): actively calls the MCP tool again using toolInput.
 * - Outside ChatGPT:
 *   - Uses local static carsData.
 */
export function useCarsRecommendation(): UseCarsRecommendationReturn {
  const isChat = useIsChatGptApp();

  const toolOutput = useWidgetProps<CarsWidgetProps>();
  const isFetchingTool = typeof toolOutput === "undefined";

  const toolInput = useOpenAIGlobal("toolInput") as CarsToolInput | null;

  const [cars, setCars] = useState<CarData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const callTool = useCallTool();

  const extractRecommendationsFromWidget = (output?: CarsWidgetProps): CarData[] => {
    if (!output) return [];
    return (
      output.result?.structuredContent?.recommendations ??
      output.structuredContent?.recommendations ??
      output.recommendations ??
      []
    );
  };

  const extractRecommendationsFromResponse = (response: CarsToolResponse): CarData[] => {
    if (!response) return [];
    return (
      response.structuredContent?.recommendations ??
      response.recommendations ??
      []
    );
  };

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);

      // Defaults if the model did not provide anything
      const effectiveBudget = toolInput?.budget ?? "under 20000";
      const effectiveVehicleType =
        toolInput?.vehicleType ?? "SUV";
      const effectivePreferredBrand = toolInput?.preferredBrand;

      const payload = {
        budget: effectiveBudget,
        vehicleType: effectiveVehicleType,
        preferredBrand: effectivePreferredBrand,
      };

      console.warn("[useCarsRecommendation] 🚀 Refetch with payload:", payload);

      const response = (await callTool(
        "mnoj_cars_recommendation",
        payload
      )) as CarsToolResponse;

      console.warn("[useCarsRecommendation] 📥 Raw refetch response:", response);

      const recommendations = extractRecommendationsFromResponse(response);

      if (recommendations.length > 0) {
        setCars(recommendations);
      } else {
        setCars([]);
      }
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to fetch cars";
      console.warn("[useCarsRecommendation] 💥 Error:", errorMsg, err);
      setError(errorMsg);
      setCars([]);
    } finally {
      setLoading(false);
      console.warn("[useCarsRecommendation] ⏹️ Refetch complete");
    }
  };

  useEffect(() => {
    setError(null);

    if (isChat) {
      // In ChatGPT: wait for widget props (tool output)
      if (isFetchingTool) {
        setLoading(true);
        return;
      }

      const recommendations = extractRecommendationsFromWidget(toolOutput);
      console.warn(
        "[useCarsRecommendation] 📊 Widget tool output:",
        toolOutput,
        "→ recommendations:",
        recommendations
      );

      setCars(recommendations);
      setLoading(false);
    } else {
      // Outside ChatGPT: use static data
      console.warn(
        "[useCarsRecommendation] 🌐 Not in ChatGPT, using local static data"
      );
      setCars(carsData);
      setLoading(false);
    }
  }, [isChat, isFetchingTool, toolOutput]);

  return { cars, loading, error, refetch: fetchCars };
}
