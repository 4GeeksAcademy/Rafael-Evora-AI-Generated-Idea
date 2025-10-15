import React from "react";

import { useFormContext } from "react-hook-form";

export const FormStepEventDetails: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();
  // Watch values for overnight logic
  const startTime = useFormContext().watch("eventTime");
  const finishTime = useFormContext().watch("finishTime");
  // Helper to check if finish time is past midnight
  const isOvernight = (() => {
    if (!startTime || !finishTime) return false;
    // Compare as HH:MM
    const [startH, startM] = startTime.split(":").map(Number);
    const [finishH, finishM] = finishTime.split(":").map(Number);
    // If finish hour < start hour, or finish hour == 0, it's overnight
    return finishH < startH || (finishH === 0 && finishM === 0);
  })();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Event Details</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Event Date</label>
        <input type="date" {...register("eventDate", { required: true })} className="w-full p-2 border rounded" min={new Date().toISOString().split('T')[0]} />
        {errors.eventDate && <span className="text-red-500 text-sm">Event date is required.</span>}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Starting Time</label>
        <input type="time" {...register("eventTime", { required: true })} className="w-full p-2 border rounded" />
        {errors.eventTime && <span className="text-red-500 text-sm">Starting time is required.</span>}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Finish Time</label>
        <input type="time" {...register("finishTime", { required: true })} className="w-full p-2 border rounded" />
        {errors.finishTime && <span className="text-red-500 text-sm">Finish time is required.</span>}
        {isOvernight && <span className="text-blue-600 text-sm font-semibold">Overnight event</span>}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Guest Count</label>
        <input type="number" {...register("guestCount", { required: true, min: 10, max: 1000 })} className="w-full p-2 border rounded" min={10} max={1000} />
        {errors.guestCount && <span className="text-red-500 text-sm">Guest count must be between 10 and 1000.</span>}
      </div>
    </div>
  );
};
