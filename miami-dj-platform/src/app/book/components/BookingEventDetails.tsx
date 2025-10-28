import React from "react";

export const BookingEventDetails: React.FC<{
  event_name: string;
  date: string;
  onEventNameChange: (val: string) => void;
  onDateChange: (val: string) => void;
}> = ({ event_name, date, onEventNameChange, onDateChange }) => {
  const minDate = new Date().toISOString().split("T")[0];
  const maxDate = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 3);
    return d.toISOString().split("T")[0];
  })();
  const [dateError, setDateError] = React.useState("");

  const handleDateBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val) {
      if (val < minDate) {
        setDateError(`Date must not be before today.`);
        onDateChange("");
      } else if (val > maxDate) {
        setDateError(`Date must not be later than 3 years from today.`);
        onDateChange("");
      } else {
        setDateError("");
      }
    } else {
      setDateError("");
    }
  };

  return (
    <div className="mb-4">
      <label className="block font-bold mb-2 dark:text-blue-300">
        Event Name
      </label>
      <input
        type="text"
        className="w-full p-2 border rounded mb-2"
        value={event_name}
        onChange={(e) => onEventNameChange(e.target.value)}
        placeholder="Event name. Example: Sussy's Wedding"
      />
      <label className="block font-bold mb-2 dark:text-blue-300">
        Event Date
      </label>
      <input
        type="date"
        className={`w-full p-2 border rounded ${dateError ? "border-red-400" : ""}`}
        value={date}
        min={minDate}
        max={maxDate}
        onChange={(e) => onDateChange(e.target.value)}
        onBlur={handleDateBlur}
      />
      {dateError && (
        <div className="text-red-500 text-sm mt-1">{dateError}</div>
      )}
    </div>
  );
};
