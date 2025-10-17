import React from "react";

interface ProgressBarProps {
  steps: string[];
  currentStep: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center gap-4 w-full max-w-xl mx-auto">
      {steps.map((step, idx) => (
        <div key={step} className="flex-1 flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors duration-300 ${idx <= currentStep ? "bg-blue-200 text-blue-700" : "bg-blue-50 text-blue-400 dark:bg-gray-700 dark:text-white"}`}
          >
            {idx + 1}
          </div>
          <span className={`mt-2 text-xs font-medium text-blue-700 dark:text-white`}>{step}</span>
        </div>
      ))}
    </div>
  );
};
