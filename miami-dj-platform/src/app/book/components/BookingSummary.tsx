import React from "react";

interface BookingSummaryProps {
  user: string;
  address: string;
  event_name: string;
  date: string;
  notes: string;
  start_time?: string;
  end_time?: string;
  overnight?: boolean;
  entertainment_section?: string;
  audio?: string;
  lighting?: string;
  state?: string;
  zip?: string;
  technical_preferences?: string;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  user,
  address,
  event_name,
  date,
  notes,
  start_time,
  end_time,
  overnight,
  entertainment_section,
  audio,
  lighting,
  state,
  zip,
  technical_preferences,
}) => (
  <div className="mb-8">
    <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-300">
      Booking Summary
    </h2>
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
      {start_time && (
        <div>
          <strong>Start Time:</strong> {start_time}
        </div>
      )}
      {end_time && (
        <div>
          <strong>End Time:</strong> {end_time}
        </div>
      )}
      {overnight !== undefined && (
        <div>
          <strong>Overnight:</strong> {overnight ? "Yes" : "No"}
        </div>
      )}
      <div>
        <strong>Address:</strong> {address}
      </div>
      {state && (
        <div>
          <strong>State:</strong> {state}
        </div>
      )}
      {zip && (
        <div>
          <strong>Zip Code:</strong> {zip}
        </div>
      )}
      {entertainment_section && (
        <div>
          <strong>Entertainment:</strong> {entertainment_section}
        </div>
      )}
      {audio && (
        <div>
          <strong>Audio:</strong> {audio}
        </div>
      )}
      {lighting && (
        <div>
          <strong>Lighting:</strong> {lighting}
        </div>
      )}
      {technical_preferences && (
        <div>
          <strong>Technical Preferences:</strong> {technical_preferences}
        </div>
      )}
      {/* Add more technicals/services if available */}
      {/* Example: DJ Services, Live Bands, Event Production, etc. */}
      {notes && (
        <div>
          <strong>Notes:</strong> {notes}
        </div>
      )}
    </div>
  </div>
);
