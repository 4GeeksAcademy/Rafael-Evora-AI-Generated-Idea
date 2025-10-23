import React from "react";

interface BookingSummaryProps {
  user: string;
  address: string;
  event_name: string;
  date: string;
  notes: string;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  user,
  address,
  event_name,
  date,
  notes,
}) => (
  <div className="mb-8">
    <h2 className="text-3xl font-bold mb-6 text-blue-700">Booking Summary</h2>
    <div className="mb-4 text-lg text-blue-900 dark:text-blue-200">
      <div>
        <strong>Name:</strong> {user}
      </div>
      <div>
        <strong>Event Name:</strong> {event_name}
      </div>
      <div>
        <strong>Date:</strong> {date}
      </div>
      <div>
        <strong>Address:</strong> {address}
      </div>
      {notes && (
        <div>
          <strong>Notes:</strong> {notes}
        </div>
      )}
    </div>
  </div>
);
