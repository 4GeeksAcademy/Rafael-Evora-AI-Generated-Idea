import React from "react";

export default function ContactPage() {
  return (
    <div className="min-h-screen py-6 px-2 sm:py-12 sm:px-4 bg-white dark:bg-black flex flex-col items-center">
      <h1 className="text-3xl font-bold text-black dark:text-white mb-8 text-center">Contact Us</h1>
      <div className="max-w-xl w-full bg-white dark:bg-gray-900 rounded-lg shadow p-4 sm:p-6 mb-8">
        <h2 className="text-xl font-semibold text-black dark:text-white mb-2">Company Info</h2>
        <p className="mb-2 text-black dark:text-white">Miami DJ & Live Music Entertainment</p>
        <p className="mb-2 text-black dark:text-white">4841 NW 1st AVE Miami, FL 33127</p>
        <p className="mb-2 text-black dark:text-white">Phone: <a href="tel:+13052242637" className="text-gray-700 dark:text-white">(305) 2242637</a></p>
        <p className="mb-2 text-black dark:text-white">Email: <a href="mailto:arove.llc@gmail.com" className="text-gray-700 dark:text-white">arove.llc@gmail.com</a></p>
        <p className="mb-2 text-black dark:text-white">Hours: Mon-Sun 9am-7pm</p>
        <div className="mt-4">
          <iframe
            title="Miami Location"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-80.134%2C25.782%2C-80.130%2C25.786&amp;layer=mapnik"
            width="100%"
            height="200"
            className="rounded"
            style={{ border: 0 }}
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="max-w-xl w-full bg-white dark:bg-gray-900 rounded-lg shadow p-4 sm:p-6">
        <h2 className="text-xl font-semibold text-black dark:text-white mb-2">Send Us a Message</h2>
        <form className="flex flex-col gap-3">
          <input type="text" placeholder="Your Name" className="p-2 border rounded w-full text-black dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500" required />
          <input type="email" placeholder="Your Email" className="p-2 border rounded w-full text-black dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500" required />
          <textarea placeholder="Your Message" className="p-2 border rounded w-full text-black dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500" rows={4} required />
          <button type="submit" className="bg-gray-700 text-white font-semibold text-sm px-4 py-2 rounded hover:bg-gray-500 transition-colors w-full">Send Message</button>
        </form>
      </div>
    </div>
  );
}
