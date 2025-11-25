'use client';

import React from 'react';
import CarCard from '../widgets-ui/CarCard';
import { useCarsRecommendation } from '../hooks/use-cars-recommendation';

export default function ChatGPTCarsPage() {
  // Fetch cars data using the hook
  const { cars, loading, error } = useCarsRecommendation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Mahindra Cars</h1>
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Mahindra Cars</h1>
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

  // Fallback data if no cars are fetched
  const displayCars = cars.length > 0 ? cars : [
    {
      imageUrl: '/images/car1.jpg',
      model: 'Mahindra XUV700',
      year: 2024,
      price: '$32,000'
    },
    {
      imageUrl: '/images/car2.jpg',
      model: 'Mahindra Scorpio',
      year: 2023,
      price: '$28,500'
    },
    {
      imageUrl: '/images/car3.jpg',
      model: 'Mahindra Bolero',
      year: 2023,
      price: '$18,000'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Mahindra Cars</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-12">Explore our latest collection of vehicles</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCars.map((car, index) => (
            <CarCard
              key={index}
              imageUrl={car.imageUrl}
              model={car.model}
              year={car.year}
              price={car.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
