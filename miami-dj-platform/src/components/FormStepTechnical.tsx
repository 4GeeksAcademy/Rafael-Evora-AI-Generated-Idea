import React from "react";

import { useFormContext } from "react-hook-form";

export const FormStepTechnical: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Technical Preferences</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Lighting & Smoke Show</label>
        <select {...register("lightSmokeShow", { required: true })} className="w-full p-2 border rounded">
          <option value="">Select...</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        {errors.lightSmokeShow && <span className="text-red-500 text-sm">Please select an option.</span>}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Audio Setup</label>
        <select {...register("audioSetup", { required: true })} className="w-full p-2 border rounded">
          <option value="">Select...</option>
          <option value="direct">Direct/Party</option>
          <option value="indirect">Indirect/Ambient</option>
          <option value="combo">Combination</option>
        </select>
        {errors.audioSetup && <span className="text-red-500 text-sm">Please select an audio setup.</span>}
      </div>
    </div>
  );
};
