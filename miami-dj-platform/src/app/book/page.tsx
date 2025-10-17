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
      <div className="min-h-screen py-6 px-2 sm:py-12 sm:px-4 bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200 dark:from-blue-900 dark:via-purple-900 dark:to-blue-900 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-8 text-center drop-shadow animate-pulse dark:text-blue-200">Book Your Event</h1>
        <ProgressBar steps={steps} currentStep={currentStep} />
        <FormProvider {...methods}>
          <form className="mt-8 w-full max-w-xl bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200 dark:from-blue-900 dark:via-purple-900 dark:to-blue-900 rounded-2xl shadow-lg p-6 sm:p-8 text-blue-700 border-4 border-blue-200 dark:border-blue-400" onSubmit={methods.handleSubmit(onSubmit)}>
            {currentStep === 0 && <FormStepEventDetails />}
            {currentStep === 1 && <FormStepEntertainment />}
            {currentStep === 2 && <FormStepTechnical />}
            {currentStep === 3 && <FormStepClientInfo />}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-200 via-blue-300 to-purple-200 text-blue-700 font-bold text-base shadow-lg hover:scale-105 hover:from-purple-200 hover:to-blue-200 transition-all duration-300 focus:ring-4 focus:ring-blue-200 dark:bg-gradient-to-r dark:from-blue-400 dark:via-blue-700 dark:to-purple-400 dark:text-blue-200 dark:focus:ring-blue-400"
                onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                disabled={currentStep === 0}
              >
                Previous
              </button>
              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-200 via-blue-300 to-purple-200 text-blue-700 font-bold text-base shadow-lg hover:scale-105 hover:from-purple-200 hover:to-blue-200 transition-all duration-300 focus:ring-4 focus:ring-blue-200 dark:bg-gradient-to-r dark:from-blue-400 dark:via-blue-700 dark:to-purple-400 dark:text-blue-200 dark:focus:ring-blue-400"
                  onClick={handleNext}
                  disabled={currentStep === steps.length - 1}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-200 via-blue-300 to-purple-200 text-blue-700 font-bold text-base shadow-lg hover:scale-105 hover:from-purple-200 hover:to-blue-200 transition-all duration-300 focus:ring-4 focus:ring-blue-200 dark:bg-gradient-to-r dark:from-blue-400 dark:via-blue-700 dark:to-purple-400 dark:text-blue-200 dark:focus:ring-blue-400"
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
