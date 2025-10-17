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
    // Overnight if finish time is earlier than start time
    return finishH < startH || (finishH === startH && finishM < startM);
  })();

  return (
    <div>
      <h2 className="text-2xl font-extrabold mb-4 text-neon-green drop-shadow-xl animate-pulse dark:text-green-400">Event Details</h2>
      <div className="mb-4">
        <label className="block mb-1 font-bold text-white dark:text-green-400">Event Date</label>
        <input
          type="date"
          {...register("eventDate", {
            required: true,
            validate: value => {
              const today = new Date();
              const selected = new Date(value);
              today.setHours(0, 0, 0, 0);
              selected.setHours(0, 0, 0, 0);
              const maxDate = new Date(today);
              maxDate.setFullYear(today.getFullYear() + 3);
              return (
                selected >= today && selected <= maxDate
              ) || "Event date must be today or within 3 years from now.";
            }
          })}
          className="w-full p-3 mb-2 border-none rounded-xl text-black dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 shadow focus:ring-4 focus:ring-neon-green dark:focus:ring-green-400"
          min={new Date().toISOString().split('T')[0]}
          max={(() => { const d = new Date(); d.setFullYear(d.getFullYear() + 3); return d.toISOString().split('T')[0]; })()}
        />
        {errors.eventDate && <span className="text-red-500 text-sm">{typeof errors.eventDate.message === 'string' ? errors.eventDate.message : "Event date is required."}</span>}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-bold text-white dark:text-green-400">Starting Time</label>
        <input type="time" {...register("eventTime", { required: true })} className="w-full p-3 mb-2 border-none rounded-xl text-black dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 shadow focus:ring-4 focus:ring-neon-green dark:focus:ring-green-400" />
        {errors.eventTime && <span className="text-red-500 text-sm">Starting time is required.</span>}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-bold text-white dark:text-green-400">Finish Time</label>
        <input type="time" {...register("finishTime", { required: true })} className="w-full p-3 mb-2 border-none rounded-xl text-black dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 shadow focus:ring-4 focus:ring-neon-green dark:focus:ring-green-400" />
        {errors.finishTime && <span className="text-red-500 text-sm">Finish time is required.</span>}
        {isOvernight && (
          <span className="inline-flex items-center gap-2 px-2 py-1 rounded bg-yellow-100 text-yellow-800 font-semibold text-sm border border-yellow-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
            Overnight event
          </span>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-bold text-white dark:text-green-400">Guest Count</label>
        <input type="number" {...register("guestCount", { required: true, min: 10, max: 1000 })} className="w-full p-3 mb-2 border-none rounded-xl text-black dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 shadow focus:ring-4 focus:ring-neon-green dark:focus:ring-green-400" min={10} max={1000} />
        {errors.guestCount && <span className="text-red-500 text-sm">Guest count must be between 10 and 1000.</span>}
      </div>
    </div>
  );
};
