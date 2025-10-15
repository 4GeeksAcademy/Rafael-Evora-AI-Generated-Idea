import React from "react";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  features: string[];
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, image, features }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden flex flex-col">
      <div className="relative h-48 w-full">
        <Image src={image} alt={title} layout="fill" objectFit="cover" className="rounded-t-lg" />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h2 className="text-xl font-bold text-coral mb-2">{title}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>
        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mb-4">
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <button className="mt-auto bg-teal text-white px-4 py-2 rounded hover:bg-coral transition-colors">Book This Service</button>
      </div>
    </div>
  );
};
