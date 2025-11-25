import { Widget } from "@/app/mcp/utility/types";

export const carsWidget: Widget = {
  id: "mahindra_cars_recommendation",
  title: "Mahindra Cars Recommendation",
  templateUri: "ui://widget/cars-recommendation.html",
  invoking: "Loading car recommendations...",
  invoked: "Car recommendations loaded",
  description:
    "Displays recommended Mahindra cars based on user preferences",
  widgetDomain: "https://mahindra.com",
};
