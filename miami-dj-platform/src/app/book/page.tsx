"use client";
import React, { useState } from "react";
import { ProgressBar } from "../../components/ProgressBar";
import { FormStepEventDetails } from "../../components/FormStepEventDetails";
import { FormStepEntertainment } from "../../components/FormStepEntertainment";
import { FormStepTechnical } from "../../components/FormStepTechnical";
import { FormStepClientInfo } from "../../components/FormStepClientInfo";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function BookPage() {
  const steps = ["Event Details", "Entertainment", "Technical", "Client Info"];
  const [currentStep, setCurrentStep] = useState(0);
  const methods = useForm({ mode: "onTouched" });
  const router = useRouter();

  const handleNext = async () => {
    const valid = await methods.trigger();
    if (valid) setCurrentStep((s) => Math.min(steps.length - 1, s + 1));
  };

  const onSubmit = async (data: any) => {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push("/book/confirmation");
    } else {
      alert("There was an error submitting your booking. Please try again.");
    }
  };

  return (
    <>
      <div className="min-h-screen py-6 px-2 sm:py-12 sm:px-4 bg-white dark:bg-black flex flex-col items-center">
        <h1 className="text-3xl font-bold text-teal dark:text-gray-200 mb-8 text-center">Book Your Event</h1>
        <ProgressBar steps={steps} currentStep={currentStep} />
        <FormProvider {...methods}>
          <form className="mt-8 w-full max-w-xl bg-white dark:bg-gray-900 rounded-lg shadow p-4 sm:p-6 text-gray-800 dark:text-gray-200" onSubmit={methods.handleSubmit(onSubmit)}>
            {currentStep === 0 && <FormStepEventDetails />}
            {currentStep === 1 && <FormStepEntertainment />}
            {currentStep === 2 && <FormStepTechnical />}
            {currentStep === 3 && <FormStepClientInfo />}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                disabled={currentStep === 0}
              >
                Previous
              </button>
              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-teal text-white"
                  onClick={handleNext}
                  disabled={currentStep === steps.length - 1}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-teal text-white"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
// ...existing code...
