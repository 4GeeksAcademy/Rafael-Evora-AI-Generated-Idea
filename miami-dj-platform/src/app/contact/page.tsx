import React from "react";

export default function ContactPage() {
  return (
    <div className="min-h-screen py-6 px-2 sm:py-12 sm:px-4 bg-gradient-to-br from-blue-100 via-blue-200 to-purple-100 dark:from-blue-200 dark:via-blue-900 dark:to-black flex flex-col items-center">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-blue-700 drop-shadow-xl animate-pulse dark:text-blue-300">Contact Us</h1>
      <div className="max-w-xl w-full bg-gradient-to-br from-blue-50 via-blue-100 to-purple-50 dark:from-blue-900 dark:via-blue-900 dark:to-black rounded-lg shadow p-4 sm:p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">Company Info</h2>
        <p className="mb-2 text-blue-900 dark:text-blue-200">Miami DJ & Live Music Entertainment</p>
        <p className="mb-2 text-blue-900 dark:text-blue-200">4841 NW 1st AVE Miami, FL 33127</p>
        <p className="mb-2 text-blue-900 dark:text-blue-200">Phone: <a href="tel:+13052242637" className="text-blue-700 dark:text-blue-200">(305) 2242637</a></p>
        <p className="mb-2 text-blue-900 dark:text-blue-200">Email: <a href="mailto:arove.llc@gmail.com" className="text-blue-700 dark:text-blue-200">arove.llc@gmail.com</a></p>
        <p className="mb-2 text-blue-900 dark:text-blue-200">Hours: Mon-Sun 9am-7pm</p>
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
      <div className="max-w-xl w-full bg-gradient-to-br from-blue-50 via-blue-100 to-purple-50 dark:from-blue-900 dark:via-blue-900 dark:to-black rounded-lg shadow p-4 sm:p-6">
        <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">Send Us a Message</h2>
        <form className="flex flex-col gap-3">
          <input type="text" placeholder="Your Name" className="p-2 border rounded w-full text-blue-900 dark:text-blue-200 bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700 placeholder-blue-400 dark:placeholder-blue-500" required />
          <input type="email" placeholder="Your Email" className="p-2 border rounded w-full text-blue-900 dark:text-blue-200 bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700 placeholder-blue-400 dark:placeholder-blue-500" required />
          <textarea placeholder="Your Message" className="p-2 border rounded w-full text-blue-900 dark:text-blue-200 bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700 placeholder-blue-400 dark:placeholder-blue-500" rows={4} required />
          <button type="submit" className="bg-gradient-to-r from-blue-200 via-blue-400 to-purple-200 text-blue-900 font-bold text-sm px-4 py-2 rounded hover:scale-105 transition-all duration-300 w-full">Send Message</button>
        </form>
      </div>
    </div>
  );
}
