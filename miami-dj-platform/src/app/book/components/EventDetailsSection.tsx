import React from "react";

interface EventDetailsProps {
  event_name: string;
  setEventName: (name: string) => void;
  date: string;
  setDate: (date: string) => void;
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
  guestCount: number | undefined;
  setGuestCount: (count: number | undefined) => void;
}

export const EventDetailsSection: React.FC<EventDetailsProps> = ({
  event_name,
  setEventName,
  date,
  setDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  guestCount,
  setGuestCount,
}) => (
  <div className="mb-8">
    <h2 className="text-3xl font-bold mb-6 text-blue-700">Event Details</h2>
    <div className="space-y-4">
      <div>
        <label className="block font-bold mb-2 text-blue-700">Event Name</label>
        <input
          type="text"
          className="w-full rounded-xl bg-blue-50/80 border-0 shadow-md p-4 text-lg focus:ring-2 focus:ring-blue-300 mb-2"
          value={event_name}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Sussy's Party"
          required
        />
      </div>
      <div>
        <label className="block font-bold mb-2 text-blue-700">Event Date</label>
        <input
          type="date"
          className="w-full rounded-xl bg-blue-50/80 border-0 shadow-md p-4 text-lg focus:ring-2 focus:ring-blue-300 mb-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-bold mb-2 text-blue-700">
          Starting Time
        </label>
        <input
          type="time"
          className="w-full rounded-xl bg-blue-50/80 border-0 shadow-md p-4 text-lg focus:ring-2 focus:ring-blue-300 mb-2"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-bold mb-2 text-blue-700">
          Finish Time
        </label>
        <input
          type="time"
          className="w-full rounded-xl bg-blue-50/80 border-0 shadow-md p-4 text-lg focus:ring-2 focus:ring-blue-300 mb-2"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-bold mb-2 text-blue-700">
          Guest Count
        </label>
        <input
          type="number"
          min="20"
          max="1500"
          className="w-full rounded-xl bg-blue-50/80 border-0 shadow-md p-4 text-lg focus:ring-2 focus:ring-blue-300 mb-2"
          value={guestCount === undefined ? "" : guestCount}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= 20 && val <= 1500) {
              setGuestCount(val);
            } else {
              setGuestCount(undefined);
            }
          }}
          placeholder="Number of guests (20-1500)"
          required
        />
        {guestCount !== undefined && (guestCount < 20 || guestCount > 1500) && (
          <div className="text-red-500 text-sm mt-1">
            Guest count must be between 20 and 1500.
          </div>
        )}
      </div>
    </div>
  </div>
);
