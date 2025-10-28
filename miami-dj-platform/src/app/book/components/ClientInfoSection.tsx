import React, { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

interface ClientInfoSectionProps {
  userLoggedIn: boolean;
  userName?: string;
  userSurname?: string;
  userEmail?: string;
  clientName: string;
  setClientName: (val: string) => void;
  clientEmail: string;
  setClientEmail: (val: string) => void;
  clientPhone: string;
  setClientPhone: (val: string) => void;
  clientNameError: boolean;
  clientEmailError: boolean;
  clientPhoneError: boolean;
  address: string;
  setAddress: (val: string) => void;
  state: string;
  setState: (val: string) => void;
  zip: string;
  setZip: (val: string) => void;
}

export const ClientInfoSection: React.FC<ClientInfoSectionProps> = ({
  userLoggedIn,
  userName,
  userSurname,
  userEmail,
  clientName,
  setClientName,
  clientEmail,
  setClientEmail,
  clientPhone,
  setClientPhone,
  clientNameError,
  clientEmailError,
  clientPhoneError,
  address,
  setAddress,
  state,
  setState,
  zip,
  setZip,
}) => {
  useEffect(() => {
    if (userLoggedIn) {
      const fullName = [userName, userSurname].filter(Boolean).join(" ");
      if (fullName && !clientName) setClientName(fullName);
      if (userEmail && !clientEmail) setClientEmail(userEmail);
      // If you have phone/address, autofill here as well
    }
  }, [
    userLoggedIn,
    userName,
    userSurname,
    userEmail,
    clientName,
    clientEmail,
    setClientName,
    setClientEmail,
  ]);
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold mb-6 text-blue-400 dark:text-blue-100">
        Your Information
      </h2>
      <>
        <div className="mb-6">
          <label className="block font-bold mb-2 text-blue-700 dark:text-blue-100">
            Full Name
          </label>
          <input
            type="text"
            className={`w-full rounded-xl bg-blue-50/80 border-2 ${
              clientNameError ? "border-red-400" : "border-blue-300"
            } shadow-md p-4 text-lg mb-2`}
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
          {clientNameError && (
            <div className="text-red-500 text-sm">Full name is required.</div>
          )}
        </div>
        <div className="mb-6">
          <label className="block font-bold mb-2 text-blue-700 dark:text-blue-100">
            Email
          </label>
          <input
            type="email"
            className={`w-full rounded-xl bg-blue-50/80 border-2 ${
              clientEmailError ? "border-red-400" : "border-blue-300"
            } shadow-md p-4 text-lg mb-2`}
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
          />
          {clientEmailError && (
            <div className="text-red-500 text-sm">Valid email is required.</div>
          )}
        </div>
        <div className="mb-6">
          <label className="block font-bold mb-2 text-blue-700 dark:text-blue-100">
            Phone Number
          </label>
          <input
            type="tel"
            className={`w-full rounded-xl bg-blue-50/80 border-2 ${
              clientPhoneError ? "border-red-400" : "border-blue-300"
            } shadow-md p-4 text-lg mb-2`}
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
          />
          {clientPhoneError && (
            <div className="text-red-500 text-sm">
              Valid phone number is required.
            </div>
          )}
        </div>
        <div className="mb-6">
          <label className="block font-bold mb-2 text-blue-700 dark:text-blue-100">
            Event Address
          </label>
          <input
            type="text"
            className="w-full rounded-xl bg-blue-50/80 border-2 border-blue-300 shadow-md p-4 text-lg mb-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street Address"
          />
          <div className="flex gap-4 mt-2">
            <input
              type="text"
              className="w-32 rounded-xl bg-blue-50/80 border-2 border-blue-300 shadow-md p-4 text-lg mb-2"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
            />
            <input
              type="text"
              className="w-32 rounded-xl bg-blue-50/80 border-2 border-blue-300 shadow-md p-4 text-lg mb-2"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="Zip Code"
            />
          </div>
        </div>
      </>
    </div>
  );
};
