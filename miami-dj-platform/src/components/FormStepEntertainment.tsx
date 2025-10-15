import React from "react";

import { useFormContext } from "react-hook-form";

const options = [
  "DJ Only",
  "Single Live Band",
  "Multiple Live Bands",
  "DJ + Band Combo"
];

export const FormStepEntertainment: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className="text-gray-800 dark:text-gray-200">
      <h2 className="text-xl font-bold mb-4">Entertainment Selection</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Select Entertainment Type(s)</label>
        <div className="flex flex-wrap gap-4">
          {options.map((opt) => (
            <label key={opt} className="flex items-center gap-2">
              <input type="checkbox" value={opt} {...register("entertainment", { required: true })} />
              <span className="dark:text-gray-200">{opt}</span>
            </label>
          ))}
        </div>
        {errors.entertainment && <span className="text-red-500 text-sm">Select at least one entertainment type.</span>}
      </div>
    </div>
  );
};
