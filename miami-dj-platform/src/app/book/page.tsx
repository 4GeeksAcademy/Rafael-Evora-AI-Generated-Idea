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
  // ...existing code...
  // ...existing code...
  // Autofill client info state for logged-in user

  // Simulate user authentication (replace with real user context)
  const userLoggedIn = false; // set to true to simulate logged-in user
  const user = {
    name: "John",
    surname: "Doe",
    email: "john@example.com",
  };

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
  const [stepError, setStepError] = useState<string>("");

  useEffect(() => {
    if (userLoggedIn) {
      const fullName = [user.name, user.surname].filter(Boolean).join(" ");
      if (fullName && !clientName) setClientName(fullName);
      if (user.email && !clientEmail) setClientEmail(user.email);
    }
  }, [
    userLoggedIn,
    user.name,
    user.surname,
    user.email,
    clientName,
    clientEmail,
    setClientName,
    setClientEmail,
  ]);

  // Validation helpers
  const validateEmail = (email: string) => /.+@.+\..+/.test(email);
  const validatePhone = (phone: string) =>
    /^\d{10,}$/.test(phone.replace(/\D/g, ""));

  function roundToNearest5(timeStr: string) {
    if (!timeStr) return "";
    const [h, m] = timeStr.split(":").map(Number);
    if (isNaN(h) || isNaN(m)) return timeStr;
    let rounded = Math.round(m / 5) * 5;
    if (rounded === 60) {
      // roll over to next hour
      return `${(h + 1).toString().padStart(2, "0")}:00`;
    }
    return `${h.toString().padStart(2, "0")}:${rounded.toString().padStart(2, "0")}`;
  }

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
    // Step 0: Event Details
    if (currentStep === 0) {
      if (!date)
        return { isValid: false, error: "Please select an event date." };
      // Date range: today to 3 years from now
      const today = new Date();
      const selectedDate = new Date(date);
      const maxDate = new Date(today);
      maxDate.setFullYear(today.getFullYear() + 3);
      if (selectedDate < today)
        return { isValid: false, error: "Event date cannot be in the past." };
      if (selectedDate > maxDate)
        return {
          isValid: false,
          error: "Event date cannot be more than 3 years from now.",
        };
      if (!startTime)
        return { isValid: false, error: "Please select a start time." };
      if (!endTime)
        return { isValid: false, error: "Please select an end time." };
      // Time format: HH:mm, increments of 5
      const validTime = (t: string) => {
        const [h, m] = t.split(":").map(Number);
        return !isNaN(h) && !isNaN(m) && m % 5 === 0;
      };
      if (!validTime(startTime))
        return {
          isValid: false,
          error: "Start time must be in 5-minute increments.",
        };
      if (!validTime(endTime))
        return {
          isValid: false,
          error: "End time must be in 5-minute increments.",
        };
      return { isValid: true };
    }
    // Step 1: Entertainment
    if (currentStep === 1) {
      if (entertainment.length === 0)
        return {
          isValid: false,
          error: "Please select at least one entertainment option.",
        };
      return { isValid: true };
    }
    // Step 2: Technical
    if (currentStep === 2) {
      if (!lighting || !audio)
        return {
          isValid: false,
          error: "Please select lighting and audio preferences.",
        };
      return { isValid: true };
    }
    // Step 3: Client Info
    if (currentStep === 3) {
      if (userLoggedIn) return { isValid: true };
      if (!clientName.trim())
        return { isValid: false, error: "Please enter your name." };
      if (!validateEmail(clientEmail))
        return { isValid: false, error: "Please enter a valid email address." };
      if (!validatePhone(clientPhone))
        return { isValid: false, error: "Please enter a valid phone number." };
      if (!address.trim())
        return { isValid: false, error: "Please enter your event address." };
      if (!state.trim())
        return { isValid: false, error: "Please enter your state." };
      if (!zip.trim())
        return { isValid: false, error: "Please enter your zip code." };
      // Example: guest count validation (if you have a guestCount field)
      // if (guestCount < 20 || guestCount > 1500)
      //   return { isValid: false, error: "Guest count must be between 20 and 1500." };
      return { isValid: true };
    }
    if (currentStep === 4) {
      return { isValid: true };
    }
    return { isValid: true };
  };

  // Navigation
  const handleNext = () => {
    // Show error immediately if invalid
    const { isValid, error } = canNext();
    setStepError(
      isValid ? "" : error || "Please fill out all required fields."
    );
    if (!isValid) {
      if (currentStep === 3 && !userLoggedIn) {
        setClientNameError(!clientName.trim());
        setClientEmailError(!validateEmail(clientEmail));
        setClientPhoneError(!validatePhone(clientPhone));
      }
      return;
    }
    setCurrentStep((s) => {
      if (s === 3) return 4; // Go to Notes step
      return Math.min(steps.length - 1, s + 1);
    });
  };
  const handlePrevious = () => setCurrentStep((s) => Math.max(0, s - 1));

  // Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Do nothing here; confirmation should only show when user clicks Request Booking
  };
  const confirmBooking = async () => {
    setShowConfirm(false);
    setSubmitting(true);
    // Generate event name if not provided
    let finalEventName = eventName;
    if (!finalEventName) {
      if (!date) {
        finalEventName =
          (userLoggedIn ? `${user.name} ${user.surname}` : clientName) +
          "'s event";
      } else {
        const d = new Date(date);
        const month = d.toLocaleString("default", { month: "long" });
        const day = d.getDate();
        const year = d.getFullYear();
        const suffix = (n: number) => {
          if (n >= 11 && n <= 13) return "th";
          switch (n % 10) {
            case 1:
              return "st";
            case 2:
              return "nd";
            case 3:
              return "rd";
            default:
              return "th";
          }
        };
        const firstName =
          (userLoggedIn ? `${user.name} ${user.surname}` : clientName).split(
            " "
          )[0] || "";
        finalEventName = `${month} ${day}${suffix(day)} ${year} ${firstName}'s event`;
      }
      setEventName(finalEventName);
    }
    try {
      const res = await fetch("/api/booking_request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userLoggedIn ? `${user.name} ${user.surname}` : clientName,
          email: userLoggedIn ? user.email : clientEmail,
          user_id: userLoggedIn ? "user-id-placeholder" : null, // Replace with real user id if available
          event_name: finalEventName,
          event_date: date,
          start_time: startTime,
          end_time: endTime,
          overnight: startTime > endTime,
          entertainment_section: entertainment.join(", "),
          audio: audio || "",
          lighting: lighting || "",
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
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <div className="flex-1">
                  <label className="block font-bold mb-2 dark:text-blue-300">
                    Start Time
                  </label>
                  <input
                    type="time"
                    step="300"
                    className="w-full p-2 border rounded"
                    value={startTime}
                    onChange={(e) =>
                      setStartTime(roundToNearest5(e.target.value))
                    }
                    onBlur={(e) =>
                      setStartTime(roundToNearest5(e.target.value))
                    }
                  />
                </div>
                <div className="flex-1 sm:mt-0">
                  <label className="block font-bold mb-2 dark:text-blue-300">
                    End Time
                  </label>
                  <input
                    type="time"
                    step="300"
                    className="w-full p-2 border rounded"
                    value={endTime}
                    onChange={(e) =>
                      setEndTime(roundToNearest5(e.target.value))
                    }
                    onBlur={(e) => setEndTime(roundToNearest5(e.target.value))}
                  />
                  {startTime && endTime && endTime < startTime && (
                    <div className="flex items-center justify-center my-2">
                      <span className="inline-flex items-center gap-2 px-2 py-1 rounded bg-yellow-100 text-yellow-800 font-semibold text-sm border border-yellow-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 text-yellow-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                          />
                        </svg>
                        Overnight event
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
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
            <label className="block font-bold mb-2 dark:text-blue-300">
              Technical Preferences
            </label>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-1 dark:text-blue-300">
                  Lighting
                </label>
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
                <label className="block mb-1 dark:text-blue-300">Audio</label>
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
            userName={user?.name}
            userSurname={user?.surname}
            userEmail={user?.email}
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
            user={userLoggedIn ? `${user.name} ${user.surname}` : clientName}
            address={address}
            event_name={
              eventName
                ? eventName
                : (() => {
                    if (!date)
                      return userLoggedIn
                        ? `${user.name} ${user.surname}'s event`
                        : `${clientName}'s event`;
                    const d = new Date(date);
                    const month = d.toLocaleString("default", {
                      month: "long",
                    });
                    const day = d.getDate();
                    const year = d.getFullYear();
                    const suffix = (n: number) => {
                      if (n >= 11 && n <= 13) return "th";
                      switch (n % 10) {
                        case 1:
                          return "st";
                        case 2:
                          return "nd";
                        case 3:
                          return "rd";
                        default:
                          return "th";
                      }
                    };
                    const firstName =
                      (userLoggedIn
                        ? `${user.name} ${user.surname}`
                        : clientName
                      ).split(" ")[0] || "";
                    return `${month} ${day}${suffix(day)} ${year} ${firstName}'s event`;
                  })()
            }
            date={date}
            notes={notes}
            start_time={startTime}
            end_time={endTime}
            overnight={startTime && endTime ? endTime < startTime : undefined}
            entertainment_section={entertainment.join(", ")}
            audio={audio}
            lighting={lighting}
            state={state}
            zip={zip}
            technical_preferences={undefined}
          />
        )}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between mt-8 w-full">
          {stepError && (
            <div className="text-red-600 font-semibold text-center mb-2">
              {stepError}
            </div>
          )}
          {!redirecting && (
            <div className="flex flex-row gap-4 w-full justify-between">
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
                  disabled={submitting}
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-200 via-blue-300 to-purple-200 text-blue-700 font-bold text-base shadow-lg hover:scale-105 hover:from-purple-200 hover:to-blue-200 transition-all duration-300 focus:ring-4 focus:ring-blue-200 dark:bg-gradient-to-r dark:from-blue-400 dark:via-blue-700 dark:to-purple-400 dark:text-blue-200 dark:focus:ring-blue-400"
                  disabled={submitting}
                  onClick={() => {
                    const { isValid, error } = canNext();
                    if (!isValid) {
                      setStepError(
                        error || "Please fill out all required fields."
                      );
                      return;
                    }
                    setShowConfirm(true);
                  }}
                >
                  {submitting ? "Submitting..." : "Request Booking"}
                </button>
              )}
            </div>
          )}
        </div>
        <BookingStatus status={status} />
        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white dark:bg-blue-900 rounded-xl shadow-xl p-8 max-w-md w-full text-center">
              <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">
                Confirm Booking Request
              </h2>
              <p className="mb-6 dark:text-blue-300">
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
