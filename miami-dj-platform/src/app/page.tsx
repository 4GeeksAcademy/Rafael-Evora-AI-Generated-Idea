"use client";

import { Navbar } from "../components/Navbar";
import { useSupabaseUser } from "../lib/useSupabaseUser";

export default function Home() {
  const user = useSupabaseUser();
  return (
    <>
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center py-16 px-4 overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/RUbeyE84S3Y"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Miami DJ Background"
        />
        <div className="relative z-10 w-full flex flex-col items-center justify-center">
          {user && (
            <div className="mb-4 text-lg font-semibold text-black dark:text-white">Welcome, {user.email}!</div>
          )}
          <h1 className="text-5xl font-extrabold text-black dark:text-white mb-4">Miami DJ & Live Music Entertainment</h1>
          <p className="text-lg text-black dark:text-white mb-8 max-w-2xl">Book Miami's best DJs, bands, and entertainers for your next event. Weddings, parties, corporate events, and more—experience the ultimate Miami vibe!</p>
          <a href="/book" className="bg-gray-700 text-white px-6 py-3 rounded-full font-semibold text-lg shadow hover:bg-gray-500 transition-colors mb-4">Book Now</a>
          {!user && (
            <div className="flex gap-4 justify-center">
              <a href="/login" className="bg-gray-700 text-white px-4 py-2 rounded font-semibold text-sm hover:bg-gray-500 transition-colors">Login</a>
              <a href="/signup" className="bg-gray-700 text-white px-4 py-2 rounded font-semibold text-sm hover:bg-gray-500 transition-colors">Sign Up</a>
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 opacity-40 z-5 pointer-events-none" />
      </section>
      <section className="py-12 px-4 bg-white dark:bg-black">
        <h2 className="text-3xl font-bold text-black dark:text-white mb-8 text-center">Featured Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-2xl font-bold text-black dark:text-white mb-2">DJ Sets</span>
            <p className="text-black dark:text-white">High-energy Miami DJ performances for any event.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-2xl font-bold text-black dark:text-white mb-2">Live Bands</span>
            <p className="text-black dark:text-white">Top local bands playing Latin, pop, and more.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-2xl font-bold text-black dark:text-white mb-2">Event Production</span>
            <p className="text-black dark:text-white">Sound, lighting, and full event management.</p>
          </div>
        </div>
      </section>
      <section className="py-12 px-4 bg-gray-900 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to party?</h2>
        <p className="text-lg text-white mb-6">Contact us for custom packages, availability, and more info.</p>
        <a href="/contact" className="bg-gray-700 text-white px-6 py-3 rounded-full font-semibold text-lg shadow hover:bg-gray-500 transition-colors">Contact Us</a>
      </section>
    </>
  );
}
