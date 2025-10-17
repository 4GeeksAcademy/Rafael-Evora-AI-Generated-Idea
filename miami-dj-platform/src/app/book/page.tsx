"use client";
import React, { useState, useEffect } from "react";
import { ProgressBar } from "../../components/ProgressBar";
import { FormStepEventDetails } from "../../components/FormStepEventDetails";
import { FormStepEntertainment } from "../../components/FormStepEntertainment";
import { FormStepTechnical } from "../../components/FormStepTechnical";
import { FormStepClientInfo } from "../../components/FormStepClientInfo";
import { useForm, FormProvider } from "react-hook-form";
import { useCart } from "../../lib/contexts/CartContext";
import { useRouter } from "next/navigation";

export default function BookPage() {
  const steps = ["Event Details", "Entertainment", "Technical", "Client Info"];
  const [currentStep, setCurrentStep] = useState(0);
  const methods = useForm({ mode: "onTouched" });
  const router = useRouter();
  const { addItem, updateItem } = useCart();

  // Only update cart when user navigates steps, and only with relevant step data
  const stepFields: Record<string, string[]> = {
    "Event Details": ["eventDate", "eventTime", "finishTime"],
    "Entertainment": ["entertainmentType", "artist", "specialRequests"],
    "Technical": ["lighting", "audioSetup", "otherTechnical"],
    "Client Info": ["clientName", "clientEmail", "clientPhone", "clientNotes"],
  };

  const updateCartStep = () => {
    const stepName = steps[currentStep];
    const allValues = methods.getValues();
    const fields = stepFields[stepName] || [];
    const stepData: Record<string, any> = {};
    fields.forEach((field) => {
      if (allValues[field] !== undefined) stepData[field] = allValues[field];
    });
    addItem({ step: stepName, data: stepData });
  };

  const handleNext = async () => {
    const valid = await methods.trigger();
    if (valid) {
      updateCartStep();
      setCurrentStep((s) => Math.min(steps.length - 1, s + 1));
    }
  };

  const handlePrevious = () => {
    updateCartStep();
    setCurrentStep((s) => Math.max(0, s - 1));
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
      <div className="min-h-screen py-6 px-2 sm:py-12 sm:px-4 bg-gradient-to-br from-purple-700 via-blue-600 to-purple-900 dark:from-purple-900 dark:via-blue-900 dark:to-black flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-neon-green mb-8 text-center drop-shadow-xl animate-pulse dark:text-green-400">Book Your Event</h1>
        <ProgressBar steps={steps} currentStep={currentStep} />
        <FormProvider {...methods}>
          <form className="mt-8 w-full max-w-xl bg-gradient-to-br from-blue-900 via-purple-800 to-blue-700 dark:from-black dark:via-purple-900 dark:to-blue-900 rounded-2xl shadow-2xl p-6 sm:p-8 text-white border-4 border-neon-green dark:border-green-400" onSubmit={methods.handleSubmit(onSubmit)}>
            {currentStep === 0 && <FormStepEventDetails />}
            {currentStep === 1 && <FormStepEntertainment />}
            {currentStep === 2 && <FormStepTechnical />}
            {currentStep === 3 && <FormStepClientInfo />}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-green via-blue-400 to-purple-500 text-black font-bold text-base shadow-xl hover:scale-110 hover:from-purple-500 hover:to-neon-green transition-all duration-300 focus:ring-4 focus:ring-neon-green dark:bg-gradient-to-r dark:from-green-400 dark:via-blue-900 dark:to-purple-900 dark:text-white dark:focus:ring-green-400"
                onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                disabled={currentStep === 0}
              >
                Previous
              </button>
              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-green via-blue-400 to-purple-500 text-black font-bold text-base shadow-xl hover:scale-110 hover:from-purple-500 hover:to-neon-green transition-all duration-300 focus:ring-4 focus:ring-neon-green dark:bg-gradient-to-r dark:from-green-400 dark:via-blue-900 dark:to-purple-900 dark:text-white dark:focus:ring-green-400"
                  onClick={handleNext}
                  disabled={currentStep === steps.length - 1}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-green via-blue-400 to-purple-500 text-black font-bold text-base shadow-xl hover:scale-110 hover:from-purple-500 hover:to-neon-green transition-all duration-300 focus:ring-4 focus:ring-neon-green dark:bg-gradient-to-r dark:from-green-400 dark:via-blue-900 dark:to-purple-900 dark:text-white dark:focus:ring-green-400"
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
