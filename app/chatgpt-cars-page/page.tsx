"use client";

import React, { useRef } from "react";
import CarCard from '../widgets-ui/CarCard';
import { useCarsRecommendation } from '../hooks/use-cars-recommendation';

export default function ChatGPTCarsPage() {
  // Fetch cars data using the hook
  const { cars, loading, error } = useCarsRecommendation();

  if (loading) {
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

  if (error) {
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
        
        {/* Carousel */}
        <div className="relative">
          <button
            aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-md"
            onClick={() => {
              const el = carouselRef.current;
              if (el) el.scrollBy({ left: -el.clientWidth, behavior: 'smooth' });
            }}
          >
            ‹
          </button>

          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scroll-smooth py-6 px-4 snap-x snap-mandatory hide-scrollbar"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {displayCars?.map((car, index) => (
              <div key={index} className="snap-center flex-shrink-0 min-w-[280px] sm:min-w-[340px] md:min-w-[420px]">
                <CarCard
                  imageUrl={car.imageUrl}
                  model={car.model}
                  year={car.year}
                  price={car.price}
                />
              </div>
            ))}
          </div>

          <button
            aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-md"
            onClick={() => {
              const el = carouselRef.current;
              if (el) el.scrollBy({ left: el.clientWidth, behavior: 'smooth' });
            }}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
