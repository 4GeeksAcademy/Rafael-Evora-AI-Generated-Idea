import Image from "next/image";
import { Navbar } from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <section className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-teal-200 to-coral-100 text-center py-16 px-4">
        <h1 className="text-5xl font-extrabold text-teal mb-4">Miami DJ & Live Music Entertainment</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">Book Miami's best DJs, bands, and entertainers for your next event. Weddings, parties, corporate events, and more—experience the ultimate Miami vibe!</p>
        <a href="/book" className="bg-teal text-white px-6 py-3 rounded-full font-semibold text-lg shadow hover:bg-coral transition-colors">Book Now</a>
      </section>
      <section className="py-12 px-4 bg-white dark:bg-black">
        <h2 className="text-3xl font-bold text-teal mb-8 text-center">Featured Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-2xl font-bold text-coral mb-2">DJ Sets</span>
            <p className="text-gray-600 dark:text-gray-400">High-energy Miami DJ performances for any event.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-2xl font-bold text-coral mb-2">Live Bands</span>
            <p className="text-gray-600 dark:text-gray-400">Top local bands playing Latin, pop, and more.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-2xl font-bold text-coral mb-2">Event Production</span>
            <p className="text-gray-600 dark:text-gray-400">Sound, lighting, and full event management.</p>
          </div>
        </div>
      </section>
      <section className="py-12 px-4 bg-coral-50 dark:bg-coral-900 text-center">
        <h2 className="text-2xl font-bold text-teal mb-4">Ready to party?</h2>
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">Contact us for custom packages, availability, and more info.</p>
        <a href="/contact" className="bg-coral text-white px-6 py-3 rounded-full font-semibold text-lg shadow hover:bg-teal transition-colors">Contact Us</a>
      </section>
    </>
  );
}
