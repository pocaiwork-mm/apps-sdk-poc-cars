"use client";

import React from "react";
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
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white mb-6">MNOJ — Cars</h1>
          <div className="py-8 text-center text-sm text-slate-600 dark:text-slate-300">Loading recommendations…</div>
        </div>
      </div>
    );
  }

  if (isChat && error) {
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

  const displayCars = cars.map((car) => ({
    ...car,
    imageUrl: car.imageUrl ?? placeholderImage,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">MNOJ — Cars</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{cars.length} vehicles in our collection</p>
          </div>

          <div className="flex items-center gap-3">
            {isChat ? (
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                </svg>
                Widget
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">Demo</span>
            )}
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
