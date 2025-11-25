//car card reactjs and taiwlind component widgget show car image and limited details mahindra

import React from 'react';
import Image from 'next/image';

interface CarCardProps {
  imageUrl: string;
  model: string;
  year: number;
  price: string;
}

const CarCard: React.FC<CarCardProps> = ({ imageUrl, model, year, price }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800">
      <Image 
        src={imageUrl} 
        alt={`${model} image`} 
        width={400} 
        height={250} 
        className="w-full h-48 object-cover"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{model}</div>
        <p className="text-gray-700 dark:text-gray-300 text-base">
          Year: {year}
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-base">
          Price: {price}
        </p>
      </div>
    </div>
  );
};

export default CarCard;

