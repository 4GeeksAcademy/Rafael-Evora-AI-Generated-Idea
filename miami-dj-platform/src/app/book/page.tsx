"use client";
import React, { useState, useEffect } from "react";
import { BookingEntertainment } from "./components/BookingEntertainment";
import { BookingAddressSelect } from "./components/BookingAddressSelect";
import { BookingEventDetails } from "./components/BookingEventDetails";
import { BookingNotes } from "./components/BookingNotes";
import { BookingSummary } from "./components/BookingSummary";
import { BookingStatus } from "./components/BookingStatus";
import { ClientInfoSection } from "./components/ClientInfoSection";

export default function BookPage() {
  // Simulate user authentication (replace with real user context)
  const userLoggedIn = false; // set to true to simulate logged-in user
  const userFullName = "John Doe";
  const userEmail = "john@example.com";

  // State
  const [currentStep, setCurrentStep] = useState(0);
  const [date, setDate] = useState("");
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [entertainment, setEntertainment] = useState<string[]>([]);
  const [lighting, setLighting] = useState<"yes" | "no" | undefined>(undefined);
  const [audio, setAudio] = useState<
    "direct" | "indirect" | "combination" | undefined
  >(undefined);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  useEffect(() => {
    if (status === "success") {
      setRedirecting(true);
      setTimeout(() => {
        window.location.href = "/book/confirmation";
      }, 1500);
    }
  }, [status]);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  // Validation errors
  const [clientNameError, setClientNameError] = useState(false);
  const [clientEmailError, setClientEmailError] = useState(false);
  const [clientPhoneError, setClientPhoneError] = useState(false);

  // Validation helpers
  const validateEmail = (email: string) => /.+@.+\..+/.test(email);
  const validatePhone = (phone: string) =>
    /^\d{10,}$/.test(phone.replace(/\D/g, ""));

  // Steps
  const steps = [
    "Event Details",
    "Services",
    "Technical",
    "Client Info",
    "Notes",
    "Summary",
  ];

  // Step validation
  const canNext = () => {
    if (currentStep === 0) {
      return !!date && !!startTime && !!endTime && startTime < endTime;
    }
    if (currentStep === 1) {
      return entertainment.length > 0;
    }
    if (currentStep === 2) {
      return !!lighting && !!audio;
    }
    if (currentStep === 3) {
      if (userLoggedIn) return true;
      return (
        clientName.trim().length > 0 &&
        validateEmail(clientEmail) &&
        validatePhone(clientPhone) &&
        address.trim().length > 0
      );
    }
    if (currentStep === 4) {
      return true; // Notes are optional
    }
    return true;
  };

  // Navigation
  const handleNext = () => {
    console.log("handleNext clicked");
    console.log("currentStep", currentStep);
    console.log("userLoggedIn", userLoggedIn);
    console.log("clientName", clientName);
    console.log("clientEmail", clientEmail);
    console.log("clientPhone", clientPhone);
    console.log("canNext()", canNext());
    if (currentStep === 3 && !userLoggedIn) {
      setClientNameError(clientName.trim().length === 0);
      setClientEmailError(!validateEmail(clientEmail));
      setClientPhoneError(!validatePhone(clientPhone));
      if (!canNext()) {
        console.log("Validation failed in handleNext");
        return;
      }
    }
    if (canNext()) {
      console.log("Advancing step");
      // Always advance to the next step (Notes) after Client Info
      setCurrentStep((s) => {
        if (s === 3) return 4; // Go to Notes step
        return Math.min(steps.length - 1, s + 1);
      });
    }
  };
  const handlePrevious = () => setCurrentStep((s) => Math.max(0, s - 1));

  // Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };
  const confirmBooking = async () => {
    setShowConfirm(false);
    setSubmitting(true);
    try {
      const res = await fetch("/api/booking_request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userLoggedIn ? userFullName : clientName,
          email: userLoggedIn ? userEmail : clientEmail,
          user_id: userLoggedIn ? "user-id-placeholder" : null, // Replace with real user id if available
          event_name: eventName,
          event_date: date,
          start_time: startTime,
          end_time: endTime,
          overnight: startTime > endTime,
          entertainment_section: entertainment.join(", "),
          technical_preferences: `Lighting: ${lighting || ""}, Audio: ${
            audio || ""
          }`,
          address: address,
          state: state,
          zip: zip,
          notes: notes,
        }),
      });
      if (!res.ok) throw new Error("Failed to submit booking");
      setStatus("success");
    } catch (err) {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-6 px-2 sm:py-12 sm:px-4 bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200 dark:from-blue-900 dark:via-purple-900 dark:to-blue-900 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-8 text-center drop-shadow animate-pulse dark:text-blue-200">
        Request a Booking for your event
      </h1>
      <form
        className="mt-8 w-full max-w-xl bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200 dark:from-blue-900 dark:via-purple-900 dark:to-blue-900 rounded-2xl shadow-lg p-6 sm:p-8 text-blue-700 border-4 border-blue-200 dark:border-blue-400"
        onSubmit={handleSubmit}
      >
        {currentStep === 0 && (
          <>
            <BookingEventDetails
              event_name={eventName}
              date={date}
              onEventNameChange={setEventName}
              onDateChange={setDate}
            />
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-bold mb-2">Start Time</label>
                <input
                  type="time"
                  className="w-full p-2 border rounded"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block font-bold mb-2">End Time</label>
                <input
                  type="time"
                  className="w-full p-2 border rounded"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
            {startTime && endTime && startTime >= endTime && (
              <div className="text-red-600 mt-2">
                End time must be after start time.
              </div>
            )}
            {date && startTime && endTime && startTime > endTime && (
              <div className="text-blue-700 mt-2">
                Overnight event: {startTime} → {endTime} (next day)
              </div>
            )}
          </>
        )}
        {currentStep === 1 && (
          <BookingEntertainment
            value={entertainment}
            onChange={setEntertainment}
            eventName={eventName}
          />
        )}
        {currentStep === 2 && (
          <div className="mb-4">
            <label className="block font-bold mb-2">
              Technical Preferences
            </label>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-1">Lighting</label>
                <select
                  className="w-full p-2 border rounded"
                  value={lighting || ""}
                  onChange={(e) => setLighting(e.target.value as any)}
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block mb-1">Audio</label>
                <select
                  className="w-full p-2 border rounded"
                  value={audio || ""}
                  onChange={(e) => setAudio(e.target.value as any)}
                >
                  <option value="">Select</option>
                  <option value="direct">Direct</option>
                  <option value="indirect">Indirect</option>
                  <option value="combination">Combination</option>
                </select>
              </div>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <ClientInfoSection
            userLoggedIn={userLoggedIn}
            userFullName={userFullName}
            userEmail={userEmail}
            clientName={clientName}
            setClientName={setClientName}
            clientEmail={clientEmail}
            setClientEmail={setClientEmail}
            clientPhone={clientPhone}
            setClientPhone={setClientPhone}
            clientNameError={clientNameError}
            clientEmailError={clientEmailError}
            clientPhoneError={clientPhoneError}
            address={address}
            setAddress={setAddress}
            state={state}
            setState={setState}
            zip={zip}
            setZip={setZip}
          />
        )}
        {currentStep === 4 && (
          <BookingNotes value={notes} onChange={setNotes} />
        )}
        {currentStep === 5 && (
          <BookingSummary
            user={userLoggedIn ? userFullName : clientName}
            address={address}
            event_name={eventName}
            date={date}
            notes={notes}
          />
        )}
        <div className="flex justify-between mt-8">
          {!redirecting && (
            <>
              <button
                type="button"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-200 via-blue-300 to-purple-200 text-blue-700 font-bold text-base shadow-lg hover:scale-105 hover:from-purple-200 hover:to-blue-200 transition-all duration-300 focus:ring-4 focus:ring-blue-200 dark:bg-gradient-to-r dark:from-blue-400 dark:via-blue-700 dark:to-purple-400 dark:text-blue-200 dark:focus:ring-blue-400"
                onClick={handlePrevious}
                disabled={currentStep === 0 || submitting}
              >
                Previous
              </button>
              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-200 via-blue-300 to-purple-200 text-blue-700 font-bold text-base shadow-lg hover:scale-105 hover:from-purple-200 hover:to-blue-200 transition-all duration-300 focus:ring-4 focus:ring-blue-200 dark:bg-gradient-to-r dark:from-blue-400 dark:via-blue-700 dark:to-purple-400 dark:text-blue-200 dark:focus:ring-blue-400"
                  onClick={handleNext}
                  disabled={submitting || !canNext()}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-200 via-blue-300 to-purple-200 text-blue-700 font-bold text-base shadow-lg hover:scale-105 hover:from-purple-200 hover:to-blue-200 transition-all duration-300 focus:ring-4 focus:ring-blue-200 dark:bg-gradient-to-r dark:from-blue-400 dark:via-blue-700 dark:to-purple-400 dark:text-blue-200 dark:focus:ring-blue-400"
                  disabled={submitting || !canNext()}
                >
                  {submitting ? "Submitting..." : "Request Booking"}
                </button>
              )}
            </>
          )}
        </div>
        <BookingStatus status={status} />
        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white dark:bg-blue-900 rounded-xl shadow-xl p-8 max-w-md w-full text-center">
              <h2 className="text-2xl font-bold mb-4 text-blue-700">
                Confirm Booking Request
              </h2>
              <p className="mb-6">
                Are all fields filled in with your event requests?
              </p>
              <div className="flex justify-center gap-6">
                <button
                  className="px-6 py-2 rounded-xl bg-blue-200 text-blue-800 font-bold shadow hover:bg-blue-300"
                  onClick={confirmBooking}
                >
                  YES
                </button>
                <button
                  className="px-6 py-2 rounded-xl bg-gray-200 text-gray-800 font-bold shadow hover:bg-gray-300"
                  onClick={() => setShowConfirm(false)}
                >
                  NO
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
