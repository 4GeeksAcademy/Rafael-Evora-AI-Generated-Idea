"use client";

import { Navbar } from "../components/Navbar";
import { useSupabaseUser } from "../lib/useSupabaseUser";

export default function Home() {
  const user = useSupabaseUser();
  return (
    <>
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center py-16 px-4 overflow-hidden bg-gradient-to-br from-purple-700 via-blue-600 to-purple-900 dark:from-purple-900 dark:via-blue-900 dark:to-black">
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
            <div className="mb-4 text-lg font-bold text-neon-green drop-shadow-xl animate-pulse dark:text-green-400">Welcome, {user.email}!</div>
          )}
          <h1 className="text-5xl font-extrabold text-neon-green drop-shadow-xl animate-pulse mb-4 dark:text-green-400">Miami DJ & Live Music Entertainment</h1>
          <p className="text-lg text-white mb-8 max-w-2xl">Book Miami's best DJs, bands, and entertainers for your next event. Weddings, parties, corporate events, and more—experience the ultimate Miami vibe!</p>
          <a href="/book" className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-green via-blue-400 to-purple-500 text-black font-bold text-lg shadow-xl hover:scale-110 hover:from-purple-500 hover:to-neon-green transition-all duration-300 focus:ring-4 focus:ring-neon-green dark:bg-gradient-to-r dark:from-green-400 dark:via-blue-900 dark:to-purple-900 dark:text-white dark:focus:ring-green-400 mb-4">Book Now</a>
          {!user && (
            <div className="flex gap-4 justify-center">
              <a href="/login" className="px-4 py-2 rounded-xl bg-gradient-to-r from-neon-green via-blue-400 to-purple-500 text-black font-bold shadow-xl hover:scale-110 transition-all duration-300 focus:ring-4 focus:ring-neon-green dark:bg-gradient-to-r dark:from-green-400 dark:via-blue-900 dark:to-purple-900 dark:text-white dark:focus:ring-green-400">Login</a>
              <a href="/signup" className="px-4 py-2 rounded-xl bg-gradient-to-r from-neon-green via-blue-400 to-purple-500 text-black font-bold shadow-xl hover:scale-110 transition-all duration-300 focus:ring-4 focus:ring-neon-green dark:bg-gradient-to-r dark:from-green-400 dark:via-blue-900 dark:to-purple-900 dark:text-white dark:focus:ring-green-400">Sign Up</a>
            </div>
          )}
        </div>
      </section>
      <section className="py-12 px-4 bg-gradient-to-br from-blue-900 via-purple-800 to-blue-700 dark:from-black dark:via-purple-900 dark:to-blue-900">
        <h2 className="text-3xl font-extrabold text-neon-green drop-shadow-xl animate-pulse mb-8 text-center dark:text-green-400">Featured Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-blue-900 via-purple-800 to-blue-700 dark:from-black dark:via-purple-900 dark:to-blue-900 rounded-2xl shadow-2xl p-6 flex flex-col items-center border-4 border-neon-green dark:border-green-400">
            <span className="text-2xl font-extrabold text-neon-green drop-shadow-xl animate-pulse mb-2 dark:text-green-400">DJ Sets</span>
            <p className="text-white">High-energy Miami DJ performances for any event.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-purple-800 to-blue-700 dark:from-black dark:via-purple-900 dark:to-blue-900 rounded-2xl shadow-2xl p-6 flex flex-col items-center border-4 border-neon-green dark:border-green-400">
            <span className="text-2xl font-extrabold text-neon-green drop-shadow-xl animate-pulse mb-2 dark:text-green-400">Live Bands</span>
            <p className="text-white">Top local bands playing Latin, pop, and more.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-purple-800 to-blue-700 dark:from-black dark:via-purple-900 dark:to-blue-900 rounded-2xl shadow-2xl p-6 flex flex-col items-center border-4 border-neon-green dark:border-green-400">
            <span className="text-2xl font-extrabold text-neon-green drop-shadow-xl animate-pulse mb-2 dark:text-green-400">Event Production</span>
            <p className="text-white">Sound, lighting, and full event management.</p>
          </div>
        </div>
      </section>
      <section className="py-12 px-4 bg-gradient-to-br from-purple-700 via-blue-600 to-purple-900 dark:from-purple-900 dark:via-blue-900 dark:to-black text-center">
        <h2 className="text-2xl font-extrabold text-neon-green drop-shadow-xl animate-pulse mb-4 dark:text-green-400">Ready to party?</h2>
        <p className="text-lg text-white mb-6">Contact us for custom packages, availability, and more info.</p>
        <a href="/contact" className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-green via-blue-400 to-purple-500 text-black font-bold text-lg shadow-xl hover:scale-110 hover:from-purple-500 hover:to-neon-green transition-all duration-300 focus:ring-4 focus:ring-neon-green dark:bg-gradient-to-r dark:from-green-400 dark:via-blue-900 dark:to-purple-900 dark:text-white dark:focus:ring-green-400">Contact Us</a>
      </section>
    </>
  );
}
