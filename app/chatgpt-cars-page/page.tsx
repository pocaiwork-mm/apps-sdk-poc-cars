"use client";

import React from "react";
import CarCard from '../widgets-ui/CarCard';
import { useCarsRecommendation } from '../hooks/use-cars-recommendation';

export default function ChatGPTCarsPage() {
  const { cars: recommendedCars, loading, error } = useCarsRecommendation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white mb-6">MNOJ — Cars</h1>
          <div className="py-8 text-center text-sm text-slate-600 dark:text-slate-300">Loading recommendations…</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white mb-6">MNOJ — Cars</h1>
          <div className="py-8 text-center text-sm text-red-600 dark:text-red-400">Error: {error}</div>
        </div>
      </div>
    );
  }


  // Use cars from the hook and ensure a placeholder image when missing
  const placeholderImage =
    "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1000&q=80";

  const displayCars = recommendedCars.map((car) => ({
    ...car,
    imageUrl: car?.imageUrl ?? placeholderImage,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">MNOJ — Cars</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{recommendedCars?.length} vehicles in our collection</p>
          </div>
        </div>

        {displayCars.length === 0 ? (
          <div className="py-12 text-center text-sm text-slate-600 dark:text-slate-300">
            <p>No cars available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {displayCars?.map((car, index) => (
              <div key={index} className="">
                <div className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                  <CarCard
                    imageUrl={car.imageUrl}
                    model={car.model}
                    year={car.year}
                    price={car.price}
                  />
                  <div className="mt-2 text-xs text-slate-500 dark:text-slate-300 px-1">{car.description}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
