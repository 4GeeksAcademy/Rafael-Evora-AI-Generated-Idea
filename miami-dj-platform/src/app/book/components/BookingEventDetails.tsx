"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = dynamic(() => import("react-datepicker").then(mod => mod.default), { ssr: false }) as React.FC<any>;

export const BookingEventDetails: React.FC<{
  event_name: string;
  date: string;
  onEventNameChange: (val: string) => void;
  onDateChange: (val: string) => void;
}> = ({ event_name, date, onEventNameChange, onDateChange }) => {
  const minDate = new Date();
  const maxDate = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 3);
    return d;
  })();
  const [dateError, setDateError] = React.useState("");

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
      <DatePicker
        selected={date ? new Date(date) : null}
        onChange={(d: Date | null) => {
          if (!d) {
            onDateChange("");
            setDateError("");
            return;
          }
          if (d < minDate) {
            setDateError("Date must not be before today.");
            onDateChange("");
          } else if (d > maxDate) {
            setDateError("Date must not be later than 3 years from today.");
            onDateChange("");
          } else {
            setDateError("");
            onDateChange(d.toISOString().split("T")[0]);
          }
        }}
        minDate={minDate}
        maxDate={maxDate}
        dateFormat="yyyy-MM-dd"
        className={`w-full p-2 border rounded ${dateError ? "border-red-400" : ""}`}
        placeholderText="Select event date"
        showPopperArrow={false}
        disabledKeyboardNavigation
        dayClassName={(date: Date) => date < minDate ? "bg-gray-200 text-gray-400" : ""}
      />
      {dateError && (
        <div className="text-red-500 text-sm mt-1">{dateError}</div>
      )}
    </div>
  );
};
