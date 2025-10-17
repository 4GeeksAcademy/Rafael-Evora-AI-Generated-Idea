import React from "react";

import { useFormContext } from "react-hook-form";

export const FormStepTechnical: React.FC = () => {
  const { register, formState: { errors }, watch } = useFormContext();
  const selectedLightSmoke = watch("lightSmokeShow");
  const selectedAudio = watch("audioSetup");
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-blue-700 drop-shadow animate-pulse dark:text-blue-200">Technical Preferences</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium text-blue-700 dark:text-blue-200">Lighting & Smoke Show</label>
        <div className="grid grid-cols-1 gap-3">
          <label className={`flex items-center gap-3 p-3 rounded border transition-colors duration-200 ${selectedLightSmoke === "yes" ? "bg-blue-100 border-blue-200 shadow-lg" : "bg-blue-50 dark:bg-black border-blue-100 dark:border-gray-900 opacity-40 grayscale"}`}>
            <input type="radio" value="yes" {...register("lightSmokeShow", { required: true })} className="accent-blue-200" />
            <span className="font-semibold text-blue-700 dark:text-blue-200">Yes</span>
            <span className="text-xs text-blue-400 dark:text-gray-300">Includes lighting effects and smoke show for a dramatic atmosphere.</span>
          </label>
          <label className={`flex items-center gap-3 p-3 rounded border transition-colors duration-200 ${selectedLightSmoke === "no" ? "bg-blue-100 border-blue-200 shadow-lg" : "bg-blue-50 dark:bg-black border-blue-100 dark:border-gray-900 opacity-40 grayscale"}`}>
            <input type="radio" value="no" {...register("lightSmokeShow", { required: true })} className="accent-blue-200" />
            <span className="font-semibold text-blue-700 dark:text-blue-200">No</span>
            <span className="text-xs text-blue-400 dark:text-gray-300">No additional lighting or smoke effects, standard setup only.</span>
          </label>
        </div>
        {errors.lightSmokeShow && <span className="text-red-500 text-sm">Please select an option.</span>}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium text-blue-700 dark:text-blue-200">Audio Setup</label>
        <div className="grid grid-cols-1 gap-3">
          <label className={`flex items-center gap-3 p-3 rounded border transition-colors duration-200 ${selectedAudio === "direct" ? "bg-blue-100 border-blue-200 shadow-lg" : "bg-blue-50 dark:bg-black border-blue-100 dark:border-gray-900 opacity-40 grayscale"}`}>
            <input type="radio" value="direct" {...register("audioSetup", { required: true })} className="accent-blue-200" />
            <span className="font-semibold text-blue-700 dark:text-blue-200">Direct/Party</span>
            <span className="text-xs text-blue-400 dark:text-gray-300">Loud, energetic, best for dancing and parties.</span>
          </label>
          <label className={`flex items-center gap-3 p-3 rounded border transition-colors duration-200 ${selectedAudio === "indirect" ? "bg-blue-100 border-blue-200 shadow-lg" : "bg-blue-50 dark:bg-black border-blue-100 dark:border-gray-900 opacity-40 grayscale"}`}>
            <input type="radio" value="indirect" {...register("audioSetup", { required: true })} className="accent-blue-200" />
            <span className="font-semibold text-blue-700 dark:text-blue-200">Indirect/Ambient</span>
            <span className="text-xs text-blue-400 dark:text-gray-300">Soft, background music, ideal for mingling.</span>
          </label>
          <label className={`flex items-center gap-3 p-3 rounded border transition-colors duration-200 ${selectedAudio === "combo" ? "bg-blue-100 border-blue-200 shadow-lg" : "bg-blue-50 dark:bg-black border-blue-100 dark:border-gray-900 opacity-40 grayscale"}`}>
            <input type="radio" value="combo" {...register("audioSetup", { required: true })} className="accent-blue-200" />
            <span className="font-semibold text-blue-700 dark:text-blue-200">Combination</span>
            <span className="text-xs text-blue-400 dark:text-gray-300">Mix of party and ambient, flexible for all events.</span>
          </label>
        </div>
        {errors.audioSetup && <span className="text-red-500 text-sm">Please select an audio setup.</span>}
      </div>
    </div>
  );
};
