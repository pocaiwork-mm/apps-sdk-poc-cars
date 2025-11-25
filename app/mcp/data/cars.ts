export type Car = {
  model: string;
  year: number;
  price: string;
  type: "SUV" | "Sedan" | "Hatchback" | "MPV";
  imageUrl?: string;
  description: string;
};

export const carsData: Car[] = [
  {
    model: "MNOJ XUV700",
    year: 2024,
    price: "$32,000",
    type: "SUV",
    imageUrl: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1000&q=80",
    description: "Premium SUV with advanced features",
  },
  {
    model: "MNOJ Scorpio",
    year: 2023,
    price: "$28,500",
    type: "SUV",
    imageUrl: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1000&q=80",
    description: "Rugged and reliable SUV",
  },
  {
    model: "MNOJ Bolero",
    year: 2023,
    price: "$18,000",
    type: "SUV",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80",
    description: "Affordable family SUV",
  },
];
