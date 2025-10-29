"use client";
import { useState, useEffect } from "react";
export default function DJSets() {
  const images = [
    "/DJ-Sets-01.jpg",
    "/DJ-Sets-02.jpg",
    "/DJ-Sets-03.jpg",
    "/DJ-Sets-04.jpg",
    "/DJ-Sets-05.jpg",
    "/DJ-Sets-06.jpg",
  ];
  const [bgIndex, setBgIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((i) => (i + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Blurred background slideshow */}
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 w-full h-full z-0 transition-opacity duration-2000"
          style={{
            backgroundImage: `url('${src}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(4px) brightness(0.7)",
            opacity: i === bgIndex ? 1 : 0,
            transition: "opacity 2s",
          }}
        />
      ))}
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8 relative z-10">
        <div className="bg-gray-400 bg-opacity-75 rounded-2xl p-8 mb-8 dark:bg-blue-950 dark:bg-opacity-50">
          <h1 className="text-4xl font-extrabold text-blue-700 dark:text-blue-300 mb-4">
            DJ Sets
          </h1>
          <p className="text-lg text-blue-700 dark:text-blue-200 max-w-2xl mb-8">
            Experience Miami's top DJs for any event. High-energy performances,
            custom playlists, and the ultimate party vibe. Contact us for
            details and booking!
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-8">
          <a
            href="/services/event-production"
            className="bg-white bg-opacity-70 dark:bg-blue-950 dark:bg-opacity-70 rounded-2xl shadow-xl p-6 flex flex-col items-center w-64 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors cursor-pointer border-2 border-blue-200 dark:border-blue-800"
          >
            <span className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2">
              Event Production
            </span>
            <span className="text-blue-900 dark:text-blue-200 text-sm">
              Sound, lighting, and full event management.
            </span>
          </a>
          <a
            href="/services/live-bands"
            className="bg-white bg-opacity-70 dark:bg-blue-950 dark:bg-opacity-70 rounded-2xl shadow-xl p-6 flex flex-col items-center w-64 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors cursor-pointer border-2 border-blue-200 dark:border-blue-800"
          >
            <span className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2">
              Live Bands
            </span>
            <span className="text-blue-900 dark:text-blue-200 text-sm">
              Top local bands playing Latin, pop, and more.
            </span>
          </a>
        </div>
      </div>
      <section className="relative z-10 w-[70%] mx-auto py-6 px-4 text-center rounded-t-3xl border-t-4 border-blue-200 dark:border-blue-900 shadow-lg bg-white/70 dark:bg-blue-950/70">
        <h2 className="text-2xl font-extrabold text-blue-700 drop-shadow-xl animate-pulse mb-4 dark:text-blue-300">
          Ready to party?
        </h2>
        <p className="text-lg text-blue-900 mb-6 dark:text-blue-200">
          Contact us for custom packages, availability, and more info.
        </p>
        <a
          href="/contact"
          className="px-6 py-3 h-12 rounded-xl bg-blue-500 text-white font-bold text-lg shadow-xl border-2 border-blue-700 transition-all duration-200 focus:ring-4 focus:ring-blue-200 dark:bg-blue-700 dark:text-white dark:border-blue-400 hover:bg-blue-700 hover:border-blue-500 hover:shadow-2xl active:bg-blue-800 dark:hover:bg-blue-900"
        >
          <span className="transition-all duration-200 hover:font-extrabold">
            Contact Us
          </span>
        </a>
      </section>
    </div>
  );
}
