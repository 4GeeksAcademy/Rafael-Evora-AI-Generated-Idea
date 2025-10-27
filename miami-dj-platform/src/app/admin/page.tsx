"use client";
type ConfirmModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
};

function ConfirmModal({ onConfirm, onCancel, message }: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-sm">
        <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
        <p className="mb-6">{message}</p>
        <div className="flex gap-4 justify-end">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={onConfirm}
          >
            YES
          </button>
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded"
            onClick={onCancel}
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
type EditModalProps = {
  booking: BookingRequest | null;
  onClose: () => void;
  onSave: (
    updated: Partial<BookingRequest>
  ) => Promise<{ error?: { message: string } } | undefined>;
};

function EditModal({ booking, onClose, onSave }: EditModalProps) {
  const [form, setForm] = useState<Partial<BookingRequest>>(() => {
    let entertainmentArr: string[] = [];
    let technicalPref = "";
    let lightingPref = "";
    let audioPref = "";
    if (booking) {
      // Always use values from booking_request if available
      const source = booking.status === "approved" ? booking : booking;
      if (
        typeof source.entertainment_section === "string" &&
        source.entertainment_section
      ) {
        entertainmentArr = source.entertainment_section
          .split(/, ?/)
          .filter(Boolean);
      } else if (Array.isArray(source.entertainment_section)) {
        entertainmentArr = source.entertainment_section;
      }
      if (typeof source.technical_preferences === "string") {
        technicalPref = source.technical_preferences;
      }
      if (typeof source.lighting === "string") {
        lightingPref = source.lighting;
      }
      if (typeof source.audio === "string") {
        audioPref = source.audio;
      }
    }
    return {
      ...booking,
      entertainment_section: entertainmentArr,
      lighting: lightingPref,
      audio: audioPref,
      technical_preferences: technicalPref,
    };
  });
  const [error, setError] = useState<string>("");
  if (!booking) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="mb-4">
          {!booking || !booking.id ? (
            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-200">
              Admin Create New Booking
            </h2>
          ) : (
            <h2 className="text-xl font-bold">Edit Booking</h2>
          )}
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setError("");
            // Always include technical_preferences in payload
            let payload = { ...form };
            payload.technical_preferences = form.technical_preferences || "";
            // Ensure entertainment_section is null if no boxes checked
            if (
              Array.isArray(payload.entertainment_section) &&
              payload.entertainment_section.length === 0
            ) {
              payload.entertainment_section = null;
            }
            try {
              const result = await onSave(payload);
              if (result?.error) {
                setError(result.error.message || "Error creating booking.");
              }
            } catch (err: any) {
              setError(err?.message || "Error creating booking.");
            }
          }}
          className="flex flex-col gap-3"
        >
          {error && (
            <div className="text-red-600 font-semibold mb-2">{error}</div>
          )}
          <input
            type="text"
            placeholder="Name"
            value={form.name || ""}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="p-2 rounded border"
          />
          <input
            type="text"
            placeholder="Surname"
            value={form.surname || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, surname: e.target.value }))
            }
            className="p-2 rounded border"
          />
          <input
            type="text"
            placeholder="Event Name"
            value={form.event_name || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, event_name: e.target.value }))
            }
            className="p-2 rounded border"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email || ""}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="p-2 rounded border"
          />
          <textarea
            placeholder="Notes"
            value={form.notes || ""}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            className="p-2 rounded border"
          />
          <label className="block mb-1 text-blue-900 dark:text-blue-200">
            Status
          </label>
          <select
            className="p-2 rounded border w-full bg-white dark:bg-gray-900 text-blue-900 dark:text-blue-200"
            value={form.status || "pending"}
            onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
            required
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="done!">Done!</option>
          </select>
          <input
            type="date"
            placeholder="Event Date"
            value={form.event_date || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, event_date: e.target.value }))
            }
            className="p-2 rounded border"
          />
          {/* Created At is auto-set, so hide from form */}
          <input
            type="time"
            placeholder="Start Time"
            value={form.start_time || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, start_time: e.target.value }))
            }
            className="p-2 rounded border"
          />
          <input
            type="time"
            placeholder="End Time"
            value={form.end_time || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, end_time: e.target.value }))
            }
            className="p-2 rounded border"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={!!form.overnight}
              onChange={(e) =>
                setForm((f) => ({ ...f, overnight: e.target.checked }))
              }
            />
            <span className="font-semibold text-blue-900 dark:text-blue-200">
              Overnight
            </span>
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-blue-900 dark:text-blue-200">
              Entertainment Section
            </span>
            <div className="flex flex-col gap-2 p-2 rounded border bg-white dark:bg-gray-900">
              {[
                { key: "dj_only", label: "DJ Only" },
                { key: "single_band", label: "Single Live Band Only" },
                { key: "dj_band_combo", label: "DJ + Band Combo" },
                { key: "only_technical", label: "Only Technical" },
                { key: "multiple_bands", label: "Multiple Bands Option" },
                { key: "multiple_djs", label: "Multiple DJs Option" },
                { key: "hora_loca", label: "Hora Loca" },
                { key: "dancers", label: "Dancers" },
              ].map((opt) => (
                <label key={opt.key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={
                      Array.isArray(form.entertainment_section)
                        ? form.entertainment_section.includes(opt.key)
                        : false
                    }
                    onChange={(e) => {
                      const arr = Array.isArray(form.entertainment_section)
                        ? form.entertainment_section
                        : [];
                      setForm((f) => {
                        let newArr = Array.isArray(arr) ? arr.slice() : [];
                        if (e.target.checked) {
                          if (!newArr.includes(opt.key)) {
                            newArr.push(opt.key);
                          }
                        } else {
                          newArr = newArr.filter((k) => k !== opt.key);
                        }
                        // Ensure uniqueness
                        newArr = Array.from(new Set(newArr));
                        return {
                          ...f,
                          entertainment_section: newArr,
                        };
                      });
                    }}
                  />
                  <span className="font-semibold text-lg text-blue-900 dark:text-blue-200">
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-blue-900 dark:text-blue-200">
              Technical Preferences
            </span>
            <textarea
              className="w-full p-2 border rounded bg-white dark:bg-gray-900 text-blue-900 dark:text-blue-200 mb-2"
              placeholder="Enter technical preferences..."
              value={form.technical_preferences || ""}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  technical_preferences: e.target.value,
                }))
              }
            />
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-1 text-blue-900 dark:text-blue-200">
                  Lighting
                </label>
                <select
                  className="w-full p-2 border rounded bg-white dark:bg-gray-900 text-blue-900 dark:text-blue-200"
                  value={form.lighting || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, lighting: e.target.value }))
                  }
                >
                  <option value="">Select lighting option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block mb-1 text-blue-900 dark:text-blue-200">
                  Audio
                </label>
                <select
                  className="w-full p-2 border rounded bg-white dark:bg-gray-900 text-blue-900 dark:text-blue-200"
                  value={form.audio || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, audio: e.target.value }))
                  }
                >
                  <option value="">Select audio option</option>
                  <option value="direct">Direct</option>
                  <option value="indirect">Indirect</option>
                  <option value="combination">Combination</option>
                </select>
              </div>
            </div>
          </label>
          {/* Address section at the bottom */}
          <div className="mt-6 border-t pt-4">
            <h3 className="font-bold mb-2 text-blue-900 dark:text-blue-200">
              Address Details
            </h3>
            <div className="flex gap-4 mb-2">
              <input
                type="text"
                placeholder="Address"
                value={form.address || ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, address: e.target.value }))
                }
                className="flex-1 p-2 rounded border"
              />
              <input
                type="text"
                placeholder="State"
                value={form.state || ""}
                maxLength={2}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    state: e.target.value.toUpperCase(),
                  }))
                }
                className="w-24 p-2 rounded border ml-2"
              />
              <input
                type="number"
                placeholder="Zip"
                value={form.zip || ""}
                min={0}
                max={99999}
                onChange={(e) =>
                  setForm((f) => ({ ...f, zip: e.target.value }))
                }
                className="w-20 p-2 rounded border ml-2"
              />
            </div>
            {/* End address section */}
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
import { supabase } from "../../lib/supabaseClient";

type BookingRequest = {
  id: string;
  name: string;
  surname?: string;
  event_name: string;
  event_date?: string;
  date?: string;
  status: string;
  email: string;
  notes?: string;
  user_id?: string;
  address_id?: string;
  created_at?: string;
  address?: string;
  start_time?: string;
  end_time?: string;
  overnight?: boolean;
  entertainment_section?: string | string[] | null;
  technical_preferences?: string;
  lighting?: string;
  audio?: string;
  state?: string;
  zip?: string;
};

export default function AdminPage() {
  const [deleteModal, setDeleteModal] = useState<BookingRequest | null>(null);
  const [editModal, setEditModal] = useState<BookingRequest | null>(null);
  const [createModal, setCreateModal] = useState<boolean>(false);
  const handleEdit = async (booking: BookingRequest) => {
    setEditModal(booking);
  };

  const handleEditSave = async (updated: Partial<BookingRequest>) => {
    if (!editModal) return;
    let payload = { ...updated };
    // Restrict status to allowed values only
    const allowedStatuses = ["pending", "confirmed", "done!"];
    if (!allowedStatuses.includes(payload.status || "")) {
      payload.status = "pending";
    }
    payload.technical_preferences = updated.technical_preferences || "";
    payload.lighting = updated.lighting || "";
    payload.audio = updated.audio || "";
    if (Array.isArray(payload.entertainment_section)) {
      payload.entertainment_section =
        payload.entertainment_section.length > 0
          ? payload.entertainment_section.join(", ")
          : null;
    }
    const { error } = await supabase
      .from("booking_request")
      .update(payload)
      .eq("id", editModal.id);
    if (error) {
      setError(error.message || "Error updating booking.");
      return { error };
    }
    setEditModal(null);
    // Refresh booking_request for UI consistency
    const { data: reqData } = await supabase
      .from("booking_request")
      .select("*")
      .order("created_at", { ascending: false });
    setRequests(reqData || []);
    return undefined;
  };

  const handleDelete = (booking: BookingRequest) => {
    setDeleteModal(booking);
  };

  const confirmDelete = async () => {
    if (!deleteModal) return;
    const table =
      deleteModal.status === "approved" ? "bookings" : "booking_request";
    const { error } = await supabase
      .from(table)
      .delete()
      .eq("id", deleteModal.id);
    if (error) {
      alert(`Delete failed: ${error.message}`);
      return;
    }
    setDeleteModal(null);
    // Remove from local state immediately for instant UI update
    setRequests((prev) => prev.filter((r) => r.id !== deleteModal.id));
    // Optionally, re-fetch for consistency
    setLoading(true);
    const { data } = await supabase
      .from("booking_request")
      .select("*")
      .order("created_at", { ascending: false });
    setRequests(data || []);
    setLoading(false);
  };

  const handleCreate = async (newBooking: Partial<BookingRequest>) => {
    // Only send fields that exist in booking_request table
    const {
      name,
      event_name,
      event_date,
      date,
      status,
      address_id,
      created_at,
      start_time,
      end_time,
      overnight,
      entertainment_section,
      address,
      state,
      zip,
      email,
      notes,
      user_id,
      technical_preferences,
    } = newBooking;
    const bookingRequestPayload = {
      name,
      event_name,
      event_date,
      date,
      status,
      email,
      notes,
      user_id,
      address_id,
      created_at,
      start_time,
      end_time,
      overnight,
      entertainment_section: Array.isArray(entertainment_section)
        ? entertainment_section.join(", ")
        : entertainment_section,
      address,
      state,
      zip,
      lighting: newBooking.lighting || "",
      audio: newBooking.audio || "",
    };
    const { error: bookingReqError } = await supabase
      .from("booking_request")
      .insert(bookingRequestPayload);
    if (bookingReqError) return { error: bookingReqError };
    setCreateModal(false);
    // Refresh data
    const { data } = await supabase
      .from("booking_request")
      .select("*")
      .order("created_at", { ascending: false });
    setRequests(data || []);
  };
  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRequests() {
      setLoading(true);
      const { data, error } = await supabase
        .from("booking_request")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) setError(error.message);
      setRequests(data || []);
      setLoading(false);
    }
    fetchRequests();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    const { error } = await supabase
      .from("booking_request")
      .update({ status })
      .eq("id", id);
    if (error) {
      setError(error.message);
      return;
    }
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status } : req))
    );
  };

  return (
    <div className="min-h-screen py-6 px-2 sm:py-12 sm:px-4 bg-white dark:bg-black flex flex-col items-center">
      <h1 className="text-3xl font-bold text-teal mb-8 text-center">
        Admin Dashboard
      </h1>
      <div className="max-w-6xl w-full min-h-[700px] bg-white dark:bg-gray-900 text-gray-500 rounded-lg shadow p-8 sm:p-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Bookings List</h2>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setCreateModal(true)}
          >
            Create New Booking
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <style>{`
              @media (min-width: 640px) {
                .bookings-row:hover {
                  background-color: #23272f !important;
                }
                .dark .bookings-row:hover {
                  background-color: #2d3748 !important;
                }
              }
            `}</style>
            <thead>
              <tr>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Name
                </th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Event
                </th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Date
                </th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Status
                </th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Email
                </th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Notes
                </th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  <span className="block sticky right-0 bg-white dark:bg-gray-900 z-10">
                    Actions
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-2 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-2 py-4 text-center text-red-500"
                  >
                    {error}
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-2 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No booking requests found.
                  </td>
                </tr>
              ) : (
                requests.map((req, idx) => (
                  <tr
                    key={req.id}
                    className="bookings-row transition-colors duration-200"
                  >
                    <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {req.name}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {req.event_name}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {req.event_date}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                      <span
                        className={
                          req.status.toLowerCase() === "pending"
                            ? "text-[#ff2222] font-extrabold animate-pulse drop-shadow"
                            : req.status.toLowerCase() === "confirmed"
                            ? "text-green-600 dark:text-green-400"
                            : "text-gray-700 dark:text-gray-300"
                        }
                        style={
                          req.status.toLowerCase() === "pending"
                            ? { textTransform: "lowercase" }
                            : {}
                        }
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {req.email}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {req.notes || "-"}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm">
                      <div className="sticky right-0 bg-white dark:bg-gray-900 z-10 flex gap-2">
                        <button
                          className="px-3 py-1 mr-2 bg-green-500 text-white rounded hover:bg-green-600"
                          onClick={() =>
                            handleStatusChange(req.id, "confirmed")
                          }
                          disabled={req.status === "confirmed"}
                        >
                          Confirmed
                        </button>
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() => handleStatusChange(req.id, "pending")}
                          disabled={req.status === "pending"}
                        >
                          Pending
                        </button>
                        <button
                          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 ml-2"
                          onClick={() => handleEdit(req)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-900 ml-2"
                          onClick={() => handleDelete(req)}
                        >
                          Delete
                        </button>
                        {deleteModal && (
                          <ConfirmModal
                            message={`This will permanently delete the booking${
                              deleteModal.status === "approved"
                                ? " (confirmed)"
                                : " request"
                            }. Are you sure?`}
                            onConfirm={confirmDelete}
                            onCancel={() => setDeleteModal(null)}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {editModal && (
          <EditModal
            booking={editModal}
            onClose={() => setEditModal(null)}
            onSave={handleEditSave}
          />
        )}
        {createModal && (
          <EditModal
            booking={{
              id: "",
              name: "",
              event_name: "",
              event_date: "",
              status: "pending",
              email: "",
              notes: "",
            }}
            onClose={() => setCreateModal(false)}
            onSave={handleCreate}
          />
        )}
      </div>
    </div>
  );
}
