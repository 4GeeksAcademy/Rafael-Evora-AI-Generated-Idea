import React from "react";

const ENTERTAINMENT_OPTIONS = [
  {
    key: "dj_only",
    label: "DJ Only",
    description: "Professional DJ performance for your event.",
  },
  {
    key: "single_band",
    label: "Single Live Band Only",
    description: "One live band for a unique musical experience.",
  },
  {
    key: "dj_band_combo",
    label: "DJ + Band Combo",
    description: "Combination of DJ and live band for maximum variety.",
  },
  {
    key: "only_technical",
    label: "Only Technical",
    description: "No entertainment, only technical setup.",
  },
  {
    key: "multiple_bands",
    label: "Multiple Bands Option",
    description: "Several bands for diverse entertainment (add-on).",
  },
  {
    key: "multiple_djs",
    label: "Multiple DJs Option",
    description: "Multiple DJs for more variety (add-on).",
  },
  {
    key: "hora_loca",
    label: "Hora Loca",
    description: "Fun, energetic show (add-on).",
  },
  {
    key: "dancers",
    label: "Dancers",
    description: "Professional dancers for your event (add-on).",
  },
];

export const BookingEntertainment: React.FC<{
  value: string[];
  onChange: (val: string[]) => void;
  eventName?: string;
}> = ({ value, onChange, eventName }) => {
  const handleToggle = (key: string) => {
    if (value.includes(key)) {
      onChange(value.filter((k) => k !== key));
    } else {
      onChange([...value, key]);
    }
  };
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-200 dark:text-blue-100">
        Entertainment Selection{eventName ? ` for ${eventName}` : ""}
      </h2>
      <p className="mb-4 text-blue-300 dark:text-blue-200">
        Select Entertainment Type(s)
      </p>
      <div className="flex flex-col gap-3">
        {ENTERTAINMENT_OPTIONS.map((opt) => (
          <label
            key={opt.key}
            className="flex items-center bg-white/60 dark:bg-blue-900/40 rounded-xl px-4 py-3 shadow border border-blue-100 dark:border-blue-700 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-800 transition"
          >
            <input
              type="checkbox"
              className="mr-3 w-5 h-5 accent-blue-500"
              checked={value.includes(opt.key)}
              onChange={() => handleToggle(opt.key)}
            />
            <span className="font-semibold text-lg text-blue-900 dark:text-blue-100 mr-2">
              {opt.label}
            </span>
            <span className="text-blue-500 dark:text-blue-200 text-base">
              {opt.description}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
