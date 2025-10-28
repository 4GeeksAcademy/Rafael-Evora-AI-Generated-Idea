import React from "react";

export interface Booking {
  id: number;
  eventDate: string;
  eventTime: string;
  address_snapshot?: any;
}

interface BookingListProps {
  bookings: Booking[];
  loading: boolean;
}

const BookingList: React.FC<BookingListProps> = ({ bookings, loading }) => {
  if (loading) {
    return (
      <div className="text-blue-700 dark:text-blue-200">
        Loading bookings...
      </div>
    );
  }
  if (bookings.length === 0) {
    return (
      <div className="text-blue-700 dark:text-blue-200">No bookings found.</div>
    );
  }
  // Sort bookings by proximity to event date (soonest first)
  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(a.eventDate);
    const dateB = new Date(b.eventDate);
    return dateA.getTime() - dateB.getTime();
  });
  return (
    <ul className="space-y-4">
      {sortedBookings.map((booking: any) => (
        <li
          key={booking.id}
          className="bg-blue-100 dark:bg-blue-900 rounded-xl p-4 shadow"
        >
          <div className="font-bold text-blue-700 dark:text-blue-200">
            Event Name: {booking.event_name || booking.eventName}
          </div>
          <div className="text-blue-900 dark:text-blue-200">
            Status:{" "}
            <span
              className={
                booking.status?.toLowerCase() === "confirmed"
                  ? "text-green-600 dark:text-green-400"
                  : booking.status?.toLowerCase() === "pending"
                    ? "text-yellow-600 dark:text-yellow-400"
                    : booking.status?.toLowerCase() === "approved"
                      ? "text-green-600 dark:text-green-400"
                      : booking.status?.toLowerCase() === "requested"
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-blue-600 dark:text-blue-400"
              }
            >
              {booking.status?.toLowerCase() === "confirmed"
                ? "Confirmed"
                : booking.status?.toLowerCase() === "pending"
                  ? "Pending"
                  : booking.status || "requested"}
            </span>
          </div>
          <div className="text-blue-900 dark:text-blue-200">
            Event Date: {booking.event_date || booking.eventDate}
          </div>
          <div className="text-blue-900 dark:text-blue-200">
            Time: {booking.start_time || booking.eventTime} -{" "}
            {booking.end_time || ""}
          </div>
          {booking.address_snapshot && (
            <div className="text-blue-900 dark:text-blue-200 mt-2">
              <span className="font-semibold">Address:</span>{" "}
              {typeof booking.address_snapshot === "string"
                ? booking.address_snapshot
                : JSON.stringify(booking.address_snapshot)}
            </div>
          )}
          {booking.address && (
            <div className="text-blue-900 dark:text-blue-200 mt-2">
              <span className="font-semibold">Address:</span> {booking.address}
            </div>
          )}
          {booking.notes && (
            <div className="text-blue-900 dark:text-blue-200 mt-2">
              <span className="font-semibold">Notes:</span> {booking.notes}
            </div>
          )}
          {booking.technical_preferences && (
            <div className="text-blue-900 dark:text-blue-200 mt-2">
              <span className="font-semibold">Technical Preferences:</span>{" "}
              {booking.technical_preferences}
            </div>
          )}
          {booking.lighting && (
            <div className="text-blue-900 dark:text-blue-200 mt-2">
              <span className="font-semibold">Lighting:</span>{" "}
              {booking.lighting}
            </div>
          )}
          {booking.audio && (
            <div className="text-blue-900 dark:text-blue-200 mt-2">
              <span className="font-semibold">Audio:</span> {booking.audio}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default BookingList;
