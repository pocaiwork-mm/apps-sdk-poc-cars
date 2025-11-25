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
  {
    model: "MNOJ Verve",
    year: 2024,
    price: "$22,500",
    type: "Sedan",
    imageUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1000&q=80",
    description: "Efficient and stylish sedan for everyday driving",
  },
  {
    model: "MNOJ Swiftie",
    year: 2024,
    price: "$15,200",
    type: "Hatchback",
    imageUrl: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1000&q=80",
    description: "Compact hatchback with nimble handling",
  },
  {
    model: "MNOJ Voyager",
    year: 2022,
    price: "$26,800",
    type: "MPV",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80",
    description: "Spacious MPV perfect for families and cargo",
  },
];
