"use client";

import { Navbar } from "../components/Navbar";
import { useSupabaseUser } from "../lib/useSupabaseUser";

export default function Home() {
  const user = useSupabaseUser();
  return (
    <>
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center py-16 px-4 overflow-hidden bg-gradient-to-br from-blue-100 via-blue-200 to-purple-100 dark:from-blue-200 dark:via-blue-900 dark:to-black">
        {/* <iframe
          src="https://www.youtube.com/embed/RUbeyE84S3Y"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Miami DJ Background"
        /> */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center">
          {user && (
            <div className="mb-4 text-lg font-bold text-neon-green drop-shadow-xl animate-pulse dark:text-green-400">Welcome, {user.email}!</div>
          )}
          <h1 className="text-5xl font-extrabold text-blue-700 drop-shadow-xl animate-pulse mb-4 dark:text-blue-300">Miami DJ & Live Music Entertainment</h1>
          <p className="text-lg text-blue-900 mb-8 max-w-2xl dark:text-blue-200">Book Miami's best DJs, bands, and entertainers for your next event. Weddings, parties, corporate events, and more—experience the ultimate Miami vibe!</p>
          <a href="/book" className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-200 via-blue-400 to-purple-200 text-blue-900 font-bold text-lg shadow-xl hover:scale-110 hover:from-purple-200 hover:to-blue-200 transition-all duration-300 focus:ring-4 focus:ring-blue-200 dark:bg-gradient-to-r dark:from-blue-200 dark:via-blue-900 dark:to-purple-900 dark:text-white dark:focus:ring-blue-200 mb-4">Book Now</a>
          {!user && (
            <div className="flex gap-4 justify-center">
              <a href="/login" className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-200 via-blue-400 to-purple-200 text-blue-900 font-bold shadow-xl hover:scale-110 transition-all duration-300 focus:ring-4 focus:ring-blue-200 dark:bg-gradient-to-r dark:from-blue-200 dark:via-blue-900 dark:to-purple-900 dark:text-white dark:focus:ring-blue-200">Login</a>
              <a href="/signup" className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-200 via-blue-400 to-purple-200 text-blue-900 font-bold shadow-xl hover:scale-110 transition-all duration-300 focus:ring-4 focus:ring-blue-200 dark:bg-gradient-to-r dark:from-blue-200 dark:via-blue-900 dark:to-purple-900 dark:text-white dark:focus:ring-blue-200">Sign Up</a>
            </div>
          )}
        </div>
      </section>
      <section className="py-12 px-4 bg-gradient-to-br from-blue-100 via-blue-200 to-purple-100 dark:from-blue-200 dark:via-purple-900 dark:to-blue-900">
        <h2 className="text-3xl font-extrabold text-blue-700 drop-shadow-xl animate-pulse mb-8 text-center dark:text-blue-300">Featured Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-purple-100 dark:from-blue-200 dark:via-purple-900 dark:to-blue-900 rounded-2xl shadow-2xl p-6 flex flex-col items-center border-4 border-blue-200 dark:border-blue-300">
            <span className="text-2xl font-extrabold text-blue-700 drop-shadow-xl animate-pulse mb-2 dark:text-blue-300">DJ Sets</span>
            <p className="text-blue-900 dark:text-blue-200">High-energy Miami DJ performances for any event.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-purple-100 dark:from-blue-200 dark:via-purple-900 dark:to-blue-900 rounded-2xl shadow-2xl p-6 flex flex-col items-center border-4 border-blue-200 dark:border-blue-300">
            <span className="text-2xl font-extrabold text-blue-700 drop-shadow-xl animate-pulse mb-2 dark:text-blue-300">Live Bands</span>
            <p className="text-blue-900 dark:text-blue-200">Top local bands playing Latin, pop, and more.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-purple-100 dark:from-blue-200 dark:via-purple-900 dark:to-blue-900 rounded-2xl shadow-2xl p-6 flex flex-col items-center border-4 border-blue-200 dark:border-blue-300">
            <span className="text-2xl font-extrabold text-blue-700 drop-shadow-xl animate-pulse mb-2 dark:text-blue-300">Event Production</span>
            <p className="text-blue-900 dark:text-blue-200">Sound, lighting, and full event management.</p>
          </div>
        </div>
      </section>
      <section className="py-12 px-4 bg-gradient-to-br from-blue-100 via-blue-200 to-purple-100 dark:from-blue-200 dark:via-blue-900 dark:to-black text-center">
        <h2 className="text-2xl font-extrabold text-blue-700 drop-shadow-xl animate-pulse mb-4 dark:text-blue-300">Ready to party?</h2>
        <p className="text-lg text-blue-900 mb-6 dark:text-blue-200">Contact us for custom packages, availability, and more info.</p>
        <a href="/contact" className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-200 via-blue-400 to-purple-200 text-blue-900 font-bold text-lg shadow-xl hover:scale-110 hover:from-purple-200 hover:to-blue-200 transition-all duration-300 focus:ring-4 focus:ring-blue-200 dark:bg-gradient-to-r dark:from-blue-200 dark:via-blue-900 dark:to-purple-900 dark:text-white dark:focus:ring-blue-200">Contact Us</a>
      </section>
    </>
  );
}
