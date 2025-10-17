import React from "react";
import { ServiceCard } from "../../components/ServiceCard";

const services = [
  {
    title: "DJ Services",
    description: "Professional Miami DJs for any event, with custom playlists and top-tier equipment.",
    image: "/dj.jpg",
    features: ["Custom Playlists", "MC Services", "Lighting Effects"],
  },
  {
    title: "Live Bands",
    description: "Talented live bands covering a variety of genres to energize your event.",
    image: "/band.jpg",
    features: ["Multiple Genres", "Flexible Set Lengths", "Audience Interaction"],
  },
  {
    title: "Lighting & Smoke Shows",
    description: "Dynamic lighting and smoke effects to create a memorable atmosphere.",
    image: "/lighting.jpg",
    features: ["LED Lighting", "Smoke Machines", "Custom Effects"],
  },
  {
    title: "Audio Production",
    description: "High-quality audio setup and production for events of any size.",
    image: "/audio.jpg",
    features: ["Premium Sound", "On-site Technician", "Wireless Mics", "Conferences"],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-6 px-2 sm:py-12 sm:px-4 bg-gradient-to-br from-purple-700 via-blue-600 to-purple-900 dark:from-purple-900 dark:via-blue-900 dark:to-black">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-neon-green drop-shadow-xl animate-pulse dark:text-green-400">Our Services</h1>
      <div className="grid gap-4 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </div>
  );
}
