'use client';

import React, { useState } from 'react';

interface CarCardProps {
  imageUrl?: string;
  model: string;
  year: number;
  price: string;
}

const PlaceholderImage = () => (
  <svg
    className="w-full h-full text-gray-300 dark:text-gray-600"
    viewBox="0 0 400 250"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="400" height="250" fill="currentColor" opacity="0.1" />
    <circle cx="200" cy="80" r="40" fill="currentColor" opacity="0.3" />
    <path
      d="M 100 200 Q 200 100 300 200"
      stroke="currentColor"
      strokeWidth="3"
      fill="none"
      opacity="0.3"
    />
  </svg>
);

const CarCard: React.FC<CarCardProps> = ({ imageUrl, model, year, price }) => {
  const [imageError, setImageError] = useState(false);

  const hasValidImage = imageUrl && !imageError;

  return (
    <div className="flex flex-col rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      {/* Image Container */}
      <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
        {hasValidImage ? (
          <img
            src={imageUrl}
            alt={`${model}`}
            width={400}
            height={250}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
            <PlaceholderImage />
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="flex-1 flex flex-col px-4 py-3 sm:px-6 sm:py-4">
        {/* Model Name */}
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {model}
        </h3>

        {/* Details */}
        <div className="flex-1 space-y-1 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Year:</span>
            <span className="font-medium text-gray-900 dark:text-white">{year}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Price:</span>
            <span className="font-semibold text-green-600 dark:text-green-400">{price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;

