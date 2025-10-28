import React from "react";

interface BookingNotesProps {
  value: string;
  onChange: (val: string) => void;
}

export const BookingNotes: React.FC<BookingNotesProps> = ({
  value,
  onChange,
}) => (
  <div className="mb-6">
    <label className="block font-bold mb-2 text-blue-700 dark:text-blue-300">
      Additional Notes
    </label>
    <textarea
      className="w-full rounded-xl bg-blue-50/80 border-2 border-blue-300 shadow-md p-4 text-lg mb-2 min-h-[100px]"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Add any special requests or notes for your event here..."
    />
  </div>
);
