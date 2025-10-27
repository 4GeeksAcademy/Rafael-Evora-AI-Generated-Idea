import React from "react";

export const BookingEventDetails: React.FC<{
  event_name: string;
  date: string;
  onEventNameChange: (val: string) => void;
  onDateChange: (val: string) => void;
}> = ({ event_name, date, onEventNameChange, onDateChange }) => (
  <div className="mb-4">
    <label className="block font-bold mb-2">Event Name</label>
    <input
      type="text"
      className="w-full p-2 border rounded mb-2"
      value={event_name}
      onChange={(e) => onEventNameChange(e.target.value)}
      placeholder="Event name"
    />
    <label className="block font-bold mb-2">Event Date</label>
    <input
      type="date"
      className="w-full p-2 border rounded"
      value={date}
      min={new Date().toISOString().split("T")[0]}
      onChange={(e) => onDateChange(e.target.value)}
    />
  </div>
);
