import React from "react";

import { useFormContext } from "react-hook-form";

export const FormStepTechnical: React.FC = () => {
  const { register, formState: { errors }, watch } = useFormContext();
  const selectedLightSmoke = watch("lightSmokeShow");
  const selectedAudio = watch("audioSetup");
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Technical Preferences</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Lighting & Smoke Show</label>
        <div className="grid grid-cols-1 gap-3">
          <label className={`flex items-center gap-3 p-3 rounded border transition-colors duration-200 ${selectedLightSmoke === "yes" ? "bg-neon-green/80 border-neon-green shadow-xl" : "bg-gray-900 dark:bg-black border-gray-800 dark:border-gray-900 opacity-40 grayscale"}`}>
            <input type="radio" value="yes" {...register("lightSmokeShow", { required: true })} className="accent-neon-green" />
            <span className="font-semibold">Yes</span>
            <span className="text-xs text-gray-700 dark:text-gray-300">Includes lighting effects and smoke show for a dramatic atmosphere.</span>
          </label>
          <label className={`flex items-center gap-3 p-3 rounded border transition-colors duration-200 ${selectedLightSmoke === "no" ? "bg-neon-green/80 border-neon-green shadow-xl" : "bg-gray-900 dark:bg-black border-gray-800 dark:border-gray-900 opacity-40 grayscale"}`}>
            <input type="radio" value="no" {...register("lightSmokeShow", { required: true })} className="accent-neon-green" />
            <span className="font-semibold">No</span>
            <span className="text-xs text-gray-700 dark:text-gray-300">No additional lighting or smoke effects, standard setup only.</span>
          </label>
        </div>
        {errors.lightSmokeShow && <span className="text-red-500 text-sm">Please select an option.</span>}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Audio Setup</label>
        <div className="grid grid-cols-1 gap-3">
          <label className={`flex items-center gap-3 p-3 rounded border transition-colors duration-200 ${selectedAudio === "direct" ? "bg-neon-green/80 border-neon-green shadow-xl" : "bg-gray-900 dark:bg-black border-gray-800 dark:border-gray-900 opacity-40 grayscale"}`}>
            <input type="radio" value="direct" {...register("audioSetup", { required: true })} className="accent-neon-green" />
            <span className="font-semibold">Direct/Party</span>
            <span className="text-xs text-gray-700 dark:text-gray-300">Loud, energetic, best for dancing and parties.</span>
          </label>
          <label className={`flex items-center gap-3 p-3 rounded border transition-colors duration-200 ${selectedAudio === "indirect" ? "bg-neon-green/80 border-neon-green shadow-xl" : "bg-gray-900 dark:bg-black border-gray-800 dark:border-gray-900 opacity-40 grayscale"}`}>
            <input type="radio" value="indirect" {...register("audioSetup", { required: true })} className="accent-neon-green" />
            <span className="font-semibold">Indirect/Ambient</span>
            <span className="text-xs text-gray-700 dark:text-gray-300">Soft, background music, ideal for mingling.</span>
          </label>
          <label className={`flex items-center gap-3 p-3 rounded border transition-colors duration-200 ${selectedAudio === "combo" ? "bg-neon-green/80 border-neon-green shadow-xl" : "bg-gray-900 dark:bg-black border-gray-800 dark:border-gray-900 opacity-40 grayscale"}`}>
            <input type="radio" value="combo" {...register("audioSetup", { required: true })} className="accent-neon-green" />
            <span className="font-semibold">Combination</span>
            <span className="text-xs text-gray-700 dark:text-gray-300">Mix of party and ambient, flexible for all events.</span>
          </label>
        </div>
        {errors.audioSetup && <span className="text-red-500 text-sm">Please select an audio setup.</span>}
      </div>
    </div>
  );
};
