import React from "react";

import { useFormContext } from "react-hook-form";

export const FormStepEventDetails: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Event Details</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Event Date</label>
        <input type="date" {...register("eventDate", { required: true })} className="w-full p-2 border rounded" min={new Date().toISOString().split('T')[0]} />
        {errors.eventDate && <span className="text-red-500 text-sm">Event date is required.</span>}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Event Time</label>
        <input type="time" {...register("eventTime", { required: true })} className="w-full p-2 border rounded" />
        {errors.eventTime && <span className="text-red-500 text-sm">Event time is required.</span>}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Guest Count</label>
        <input type="number" {...register("guestCount", { required: true, min: 10, max: 1000 })} className="w-full p-2 border rounded" min={10} max={1000} />
        {errors.guestCount && <span className="text-red-500 text-sm">Guest count must be between 10 and 1000.</span>}
      </div>
    </div>
  );
};
