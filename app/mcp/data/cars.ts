export type Car = {
  model: string;
  year: number;
  price: string;
  type: "SUV" | "Sedan" | "Hatchback" | "MPV";
  description: string;
};

export const carsData: Car[] = [
  {
    model: "Mahindra XUV700",
    year: 2024,
    price: "$32,000",
    type: "SUV",
    description: "Premium SUV with advanced features",
  },
  {
    model: "Mahindra Scorpio",
    year: 2023,
    price: "$28,500",
    type: "SUV",
    description: "Rugged and reliable SUV",
  },
  {
    model: "Mahindra Bolero",
    year: 2023,
    price: "$18,000",
    type: "SUV",
    description: "Affordable family SUV",
  },
];
