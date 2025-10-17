import React from "react";

import { useFormContext } from "react-hook-form";

// Main options (auto-uncheck others)
const mainOptions = [
  { label: "DJ Only", value: "djOnly", description: "Professional DJ performance for your event." },
  { label: "Single Live Band Only", value: "singleLiveBand", description: "One live band for a unique musical experience." },
  { label: "DJ + Band Combo", value: "djBandCombo", description: "Combination of DJ and live band for maximum variety." },
  { label: "Only Technical", value: "onlyTechnical", description: "No entertainment, only technical setup." }
];
// Add-on options (can be toggled independently)
const addonOptions = [
  { label: "Multiple Bands Option", value: "multipleBands", description: "Several bands for diverse entertainment (add-on)." },
  { label: "Multiple DJs Option", value: "multipleDjs", description: "Multiple DJs for more variety (add-on)." },
  { label: "Hora Loca", value: "horaLoca", description: "Fun, energetic show (add-on)." },
  { label: "Dancers", value: "dancers", description: "Professional dancers for your event (add-on)." }
];

export const FormStepEntertainment: React.FC = () => {
  const { formState: { errors }, watch, setValue } = useFormContext();
  // Ensure entertainmentType is an array
  React.useEffect(() => {
    const val = watch("entertainmentType");
    if (!Array.isArray(val)) setValue("entertainmentType", []);
  }, [watch, setValue]);
  const selected = watch("entertainmentType") || [];

  // Handle main option selection (auto-uncheck others)
  const handleMainChange = (value: string) => {
    setValue("entertainmentType", [value]);
  };
  // Handle add-on selection (toggle)
  const handleAddonChange = (value: string) => {
    let newSelected = Array.isArray(selected) ? [...selected] : [];
    if (newSelected.includes(value)) {
      newSelected = newSelected.filter(v => v !== value);
    } else {
      newSelected.push(value);
    }
    setValue("entertainmentType", newSelected);
  };
  // Mutually exclusive logic for bands
  const isSingleBandSelected = selected.includes("Single Live Band");
  const isMultipleBandsSelected = selected.includes("Multiple Live Bands");
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-blue-700 drop-shadow animate-pulse dark:text-blue-200">Entertainment Selection</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium text-blue-700 dark:text-blue-200">Select Entertainment Type(s)</label>
        <div className="grid grid-cols-1 gap-3">
          {/* Main options */}
          {mainOptions.map(opt => {
            const isSelected = selected[0] === opt.value;
            return (
              <label
                key={opt.value}
                className={`flex items-center gap-3 p-3 rounded border transition-colors duration-200 cursor-pointer ${isSelected ? "bg-blue-100 border-blue-200 shadow-lg" : "bg-blue-50 dark:bg-black border-blue-100 dark:border-gray-900 opacity-40 grayscale"}`}
              >
                <input
                  type="checkbox"
                  value={opt.value}
                  checked={isSelected}
                  onChange={() => handleMainChange(opt.value)}
                  className="accent-blue-200"
                />
                <span className="font-semibold text-blue-700 dark:text-blue-200">{opt.label}</span>
                <span className="text-xs text-blue-400 dark:text-gray-300">{opt.description}</span>
              </label>
            );
          })}
          {/* Add-on options */}
          {addonOptions.map(opt => {
            const isSelected = selected.includes(opt.value);
            // Disable add-ons if Only Technical is selected
            const disableAddons = selected[0] === "onlyTechnical";
            return (
              <label
                key={opt.value}
                className={`flex items-center gap-3 p-3 rounded border transition-colors duration-200 cursor-pointer ${isSelected ? "bg-blue-100 border-blue-200 shadow-lg" : "bg-blue-50 dark:bg-black border-blue-100 dark:border-gray-900 opacity-40 grayscale"} ${disableAddons ? "opacity-50 grayscale cursor-not-allowed" : ""}`}
              >
                <input
                  type="checkbox"
                  value={opt.value}
                  checked={isSelected}
                  onChange={() => handleAddonChange(opt.value)}
                  className="accent-blue-200"
                  disabled={disableAddons}
                />
                <span className="font-semibold text-blue-700 dark:text-blue-200">{opt.label}</span>
                <span className="text-xs text-blue-400 dark:text-gray-300">{opt.description}</span>
              </label>
            );
          })}
        </div>
        {errors.entertainmentType && <span className="text-red-500 text-sm">Select at least one entertainment type.</span>}
      </div>
    </div>
  );
};
