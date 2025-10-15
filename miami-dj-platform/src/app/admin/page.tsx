"use client";
import React from "react";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function AdminPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient(
    "https://zvxgwcwyuybebdktzpgl.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2eGd3Y3d5dXliZWJka3R6cGdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NDQ5MTEsImV4cCI6MjA3NjEyMDkxMX0.6pPTfXUI2df4QTKbXV1AVrNE1TsG3Dn-ONhN6AxZH7g"
  );

  useEffect(() => {
    async function fetchBookings() {
      setLoading(true);
      const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
      if (!error && data) setBookings(data);
      setLoading(false);
    }
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen py-6 px-2 sm:py-12 sm:px-4 bg-white dark:bg-black flex flex-col items-center">
      <h1 className="text-3xl font-bold text-teal mb-8 text-center">Admin Dashboard</h1>
      <div className="max-w-4xl w-full bg-white dark:bg-gray-900 rounded-lg shadow p-4 sm:p-6">
        <h2 className="text-xl font-semibold mb-4">Bookings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Name</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Event</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Date</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Email</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-2 py-4 text-center text-gray-500 dark:text-gray-400">Loading...</td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-2 py-4 text-center text-gray-500 dark:text-gray-400">No bookings found.</td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id}>
                    <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{b.name}</td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{b.event}</td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{b.date}</td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm text-green-600 dark:text-green-400">{b.status}</td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{b.email}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-gray-600 dark:text-gray-400 text-sm">Booking management features will appear here.</div>
      </div>
    </div>
  );
}
