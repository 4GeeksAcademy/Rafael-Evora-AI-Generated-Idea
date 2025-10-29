import React from "react";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  features: string[];
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  image,
  features,
}) => {
  return (
    <div className="relative rounded-2xl shadow-lg overflow-hidden flex flex-col border-2 border-blue-200 dark:border-blue-400">
      {/* Blurred background for DJ Services only */}
      {title === "DJ Services" && (
        <div className="absolute inset-0 w-full h-full z-0">
          {/* <Image
            src="/dj-sets-05.jpg"
            alt="DJ Services Background"
            layout="fill"
            objectFit="cover"
            className="blur-md brightness-75"
          /> */}
        </div>
      )}
      <div
        className={
          title === "DJ Services"
            ? "relative z-10 p-6 flex-1 flex flex-col"
            : "p-6 flex-1 flex flex-col"
        }
      >
        <h2 className="text-2xl font-extrabold text-blue-700 mb-2 drop-shadow animate-pulse dark:text-blue-300">
          {title}
        </h2>
        <p className="text-blue-700 mb-4 dark:text-white">{description}</p>
        <ul className="list-disc list-inside text-sm text-blue-700 mb-4 dark:text-white">
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
           <a href="/book" className="mt-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-200 via-blue-300 to-purple-200 text-blue-700 font-bold text-base shadow-lg hover:scale-105 hover:from-purple-200 hover:to-blue-200 transition-all duration-300 focus:ring-4 focus:ring-blue-200 dark:bg-gradient-to-r dark:from-blue-400 dark:via-blue-700 dark:to-purple-400 dark:text-blue-200 dark:focus:ring-blue-400 flex items-center justify-center">
             Book This Service
           </a>
      </div>
    </div>
  );
};
