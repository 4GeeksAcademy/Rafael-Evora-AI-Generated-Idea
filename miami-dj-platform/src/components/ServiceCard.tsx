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
    <div className="bg-gradient-to-br from-blue-900 via-purple-800 to-blue-700 dark:from-black dark:via-purple-900 dark:to-blue-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col border-4 border-neon-green dark:border-green-400">
      <div className="relative h-48 w-full">
        <Image src={image} alt={title} layout="fill" objectFit="cover" className="rounded-t-2xl" />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h2 className="text-2xl font-extrabold text-neon-green mb-2 drop-shadow-xl animate-pulse dark:text-green-400">{title}</h2>
        <p className="text-white mb-4">{description}</p>
        <ul className="list-disc list-inside text-sm text-white mb-4">
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <button className="mt-auto px-6 py-3 rounded-xl bg-gradient-to-r from-neon-green via-blue-400 to-purple-500 text-black font-bold text-base shadow-xl hover:scale-110 hover:from-purple-500 hover:to-neon-green transition-all duration-300 focus:ring-4 focus:ring-neon-green dark:bg-gradient-to-r dark:from-green-400 dark:via-blue-900 dark:to-purple-900 dark:text-white dark:focus:ring-green-400">Book This Service</button>
      </div>
    </div>
  );
};
