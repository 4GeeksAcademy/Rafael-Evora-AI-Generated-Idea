"use client";

import { Navbar } from "../components/Navbar";
import { useSupabaseUser } from "../lib/useSupabaseUser";

export default function Home() {
  const user = useSupabaseUser();
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start text-center bg-gradient-to-br from-blue-100/40 via-gray-200/30 to-blue-200/40 dark:from-blue-900/40 dark:via-slate-800/30 dark:to-gray-900/40 relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
        // Replace src with your video file in /public or a URL
        src="/AROVE-Webpage-LandingPage-Video.mov"
      />
      {/* Overlay for readability */}
      <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-blue-100/20 via-gray-100/15 to-blue-200/20 dark:from-blue-900/30 dark:via-slate-800/20 dark:to-gray-900/30 z-0 pointer-events-none" />
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center py-16 px-4 overflow-hidden z-10">
        <div className="relative z-10 w-full flex flex-col items-center justify-center">
          {user && (
            <div className="mb-4 text-lg font-bold text-neon-green drop-shadow-xl dark:text-green-400">
              Welcome, {user.email}!
            </div>
          )}
          <div
            className="inline-block px-6 py-4 rounded-3xl mb-4 shadow-2xl border-0"
            style={{
              background:
                "radial-gradient(circle, rgba(30,58,138,0.85) 70%, rgba(30,58,138,0.0) 100%)",
              backdropFilter: "blur(8px)",
            }}
          >
            <h1 className="text-5xl font-extrabold text-white drop-shadow-xl">
              Miami DJ & Live Music Entertainment
            </h1>
          </div>
          <div
            className="inline-block px-4 py-2 rounded-3xl mb-8 max-w-2xl shadow-xl border-0"
            style={{
              background:
                "radial-gradient(circle, rgba(30,58,138,0.7) 70%, rgba(30,58,138,0.0) 100%)",
              backdropFilter: "blur(6px)",
            }}
          >
            <p className="text-lg text-white">
              Book Miami's best DJs, bands, and entertainers for your next
              event. Weddings, parties, corporate events, and more—experience
              the ultimate Miami vibe!
            </p>
          </div>
          <a
            href="/book"
            className="px-6 py-3 rounded-xl bg-blue-500 text-white font-bold text-lg shadow-xl border-2 border-blue-700 transition-all duration-200 focus:ring-4 focus:ring-blue-200 dark:bg-blue-700 dark:text-white dark:border-blue-400 hover:bg-blue-700 hover:border-blue-500 hover:shadow-2xl active:bg-blue-800 dark:hover:bg-blue-900 mb-4"
          >
            <span className="transition-all duration-200 hover:font-extrabold">
              Book Now
            </span>
          </a>
          {!user && (
            <div className="flex gap-4 justify-center">
              <a
                href="/login"
                className="px-4 py-2 rounded-xl bg-blue-500 text-white font-bold shadow-xl border-2 border-blue-700 transition-all duration-200 focus:ring-4 focus:ring-blue-200 dark:bg-blue-700 dark:text-white dark:border-blue-400 hover:bg-blue-700 hover:border-blue-500 hover:shadow-2xl active:bg-blue-800 dark:hover:bg-blue-900"
              >
                Login
              </a>
              <a
                href="/signup"
                className="px-4 py-2 rounded-xl bg-blue-500 text-white font-bold shadow-xl border-2 border-blue-700 transition-all duration-200 focus:ring-4 focus:ring-blue-200 dark:bg-blue-700 dark:text-white dark:border-blue-400 hover:bg-blue-700 hover:border-blue-500 hover:shadow-2xl active:bg-blue-800 dark:hover:bg-blue-900"
              >
                Sign Up
              </a>
            </div>
          )}
        </div>
      </section>
      <section className="py-12 px-4">
        <h2 className="text-3xl font-extrabold text-blue-700 drop-shadow-xl mb-8 text-center dark:text-blue-300">
          Featured Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <a
            href="/services/dj-sets"
            className="rounded-2xl shadow-2xl p-6 flex flex-col items-center transition-colors cursor-pointer border-0"
            style={{
              background:
                "radial-gradient(circle, rgba(30,58,138,0.85) 70%, rgba(30,58,138,0.0) 100%)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="text-2xl font-extrabold text-white drop-shadow-xl mb-2">
              DJ Sets
            </span>
            <p className="text-white">
              High-energy Miami DJ performances for any event.
            </p>
          </a>
          <a
            href="/services/live-bands"
            className="rounded-2xl shadow-2xl p-6 flex flex-col items-center transition-colors cursor-pointer border-0"
            style={{
              background:
                "radial-gradient(circle, rgba(30,58,138,0.85) 70%, rgba(30,58,138,0.0) 100%)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="text-2xl font-extrabold text-white drop-shadow-xl mb-2">
              Live Bands
            </span>
            <p className="text-white">
              Top local bands playing Latin, pop, and more.
            </p>
          </a>
          <a
            href="/services/event-production"
            className="rounded-2xl shadow-2xl p-6 flex flex-col items-center transition-colors cursor-pointer border-0"
            style={{
              background:
                "radial-gradient(circle, rgba(30,58,138,0.85) 70%, rgba(30,58,138,0.0) 100%)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="text-2xl font-extrabold text-white drop-shadow-xl mb-2">
              Event Production
            </span>
            <p className="text-white">
              Sound, lighting, and full event management.
            </p>
          </a>
        </div>
      </section>
      <section
        className="w-[70%] mx-auto py-6 px-4 text-center rounded-t-3xl shadow-lg border-0"
        style={{
          background:
            "radial-gradient(circle, rgba(30,58,138,0.85) 70%, rgba(30,58,138,0.0) 100%)",
          backdropFilter: "blur(8px)",
        }}
      >
        <h2 className="text-2xl font-extrabold text-white drop-shadow-2xl mb-4">
          Ready to party?
        </h2>
        <p className="text-lg text-white mb-6">
          Contact us for custom packages, availability, and more info.
        </p>
        <a
          href="/contact"
          className="px-6 py-3 h-12 rounded-xl shadow-2xl border-0 text-white font-bold text-lg"
          style={{
            background:
              "radial-gradient(circle, rgba(30,58,138,0.85) 70%, rgba(30,58,138,0.0) 100%)",
            backdropFilter: "blur(6px)",
          }}
        >
          <span className="transition-all duration-200 hover:font-extrabold">
            Contact Us
          </span>
        </a>
      </section>
    </div>
  );
}
