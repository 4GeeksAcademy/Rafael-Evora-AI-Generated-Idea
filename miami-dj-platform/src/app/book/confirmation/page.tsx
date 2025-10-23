export default function BookingConfirmation() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200 dark:from-blue-900 dark:via-purple-900 dark:to-blue-900">
      <div className="bg-white dark:bg-blue-900 rounded-2xl shadow-lg p-8 max-w-md w-full text-center border-4 border-blue-200 dark:border-blue-400">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4 dark:text-blue-200">
          Booking Confirmed!
        </h1>
        <p className="text-lg text-blue-700 dark:text-blue-200 mb-6">
          Thank you for your booking. We have received your request and will
          contact you soon.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-blue-200 via-blue-300 to-purple-200 text-blue-700 font-bold text-base shadow-lg hover:scale-105 transition-all duration-300 focus:ring-4 focus:ring-blue-200 dark:bg-gradient-to-r dark:from-blue-400 dark:via-blue-700 dark:to-purple-400 dark:text-blue-200 dark:focus:ring-blue-400"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
