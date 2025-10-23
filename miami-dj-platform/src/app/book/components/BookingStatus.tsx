import React from "react";

export const BookingStatus: React.FC<{
  status: "success" | "error" | null;
}> = ({ status }) => {
  if (!status) return null;
  return (
    <div
      className={`mb-4 p-2 rounded font-bold ${
        status === "success"
          ? "bg-green-200 text-green-800"
          : "bg-red-200 text-red-800"
      }`}
    >
      {status === "success"
        ? "Booking submitted successfully!"
        : "There was an error submitting your booking."}
    </div>
  );
};
