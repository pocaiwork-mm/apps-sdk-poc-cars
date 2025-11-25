"use client";

import React, { useRef } from "react";
import CarCard from '../widgets-ui/CarCard';
import { useCarsRecommendation } from '../hooks/use-cars-recommendation';
import { useIsChatGptApp } from '../hooks/use-is-chatgpt-app';
import { carsData } from '../mcp/data/cars';

export default function ChatGPTCarsPage() {
  // Determine environment and fetch cars data using the hook when inside ChatGPT
  const isChat = useIsChatGptApp();
  const { cars: recommendedCars, loading, error } = useCarsRecommendation();

  // If not running inside ChatGPT, fall back to local static data
  const cars = isChat ? recommendedCars : carsData;

  if (isChat && loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">MNOJ Cars</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-12">Explore our latest collection of vehicles</p>
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading cars...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isChat && error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">MNOJ Cars</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-12">Explore our latest collection of vehicles</p>
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }


  // Use cars from the hook and ensure a placeholder image when missing
  const placeholderImage =
    "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1000&q=80";

  const displayCars = cars.map((car) => ({
    ...car,
    imageUrl: car.imageUrl ?? placeholderImage,
  }));

  const carouselRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">MNOJ Cars</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-12">Explore our latest collection of vehicles</p>
        
        {/* Grid of cards (simple layout). Use local data when not in ChatGPT. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {displayCars?.map((car, index) => (
            <div key={index}>
              <CarCard
                imageUrl={car.imageUrl}
                model={car.model}
                year={car.year}
                price={car.price}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
