import React from "react";

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Booking Confirmed!</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">Thank you for your request. We have received your booking and will contact you soon.</p>
      <a href="/" className="bg-blue-200 text-blue-700 px-6 py-2 rounded hover:bg-blue-300 transition-colors">Back to Home</a>
    </div>
  );
}
