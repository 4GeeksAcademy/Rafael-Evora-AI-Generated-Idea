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
  return (
    <ul className="space-y-4">
      {bookings.map((booking) => (
        <li
          key={booking.id}
          className="bg-blue-100 dark:bg-blue-900 rounded-xl p-4 shadow"
        >
          <div className="font-bold text-blue-700 dark:text-blue-200">
            Event Date: {booking.eventDate}
          </div>
          <div className="text-blue-900 dark:text-blue-200">
            Time: {booking.eventTime}
          </div>
          {booking.address_snapshot && (
            <div className="text-blue-900 dark:text-blue-200 mt-2">
              <span className="font-semibold">Address:</span>{" "}
              {typeof booking.address_snapshot === "string"
                ? booking.address_snapshot
                : JSON.stringify(booking.address_snapshot)}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default BookingList;
