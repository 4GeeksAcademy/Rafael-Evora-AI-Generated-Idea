export default function EventProduction() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-blue-700 dark:via-blue-900 dark:to-black">
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-4xl font-extrabold text-blue-700 dark:text-blue-300 mb-4">
          Event Production
        </h1>
        <p className="text-lg text-blue-900 dark:text-blue-200 max-w-2xl mb-8">
          Full event production services: sound, lighting, management, and more.
          Let us handle the details so you can enjoy your event stress-free.
          Contact us for details and booking!
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-8">
          <a
            href="/services/dj-sets"
            className="bg-white dark:bg-blue-950 rounded-2xl shadow-xl p-6 flex flex-col items-center w-64 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors cursor-pointer border-2 border-blue-200 dark:border-blue-800"
          >
            <span className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2">
              DJ Sets
            </span>
            <span className="text-blue-900 dark:text-blue-200 text-sm">
              High-energy Miami DJ performances for any event.
            </span>
          </a>
          <a
            href="/services/live-bands"
            className="bg-white dark:bg-blue-950 rounded-2xl shadow-xl p-6 flex flex-col items-center w-64 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors cursor-pointer border-2 border-blue-200 dark:border-blue-800"
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
      <section className="relative z-10 w-[70%] mx-auto py-6 px-4 text-center rounded-t-3xl border-t-4 border-blue-200 dark:border-blue-900 shadow-lg bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 dark:from-blue-900 dark:via-indigo-900 dark:to-blue-900">
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
