"use client";
import { useSupabaseUser } from "../../lib/useSupabaseUser";
import { supabase } from "../../lib/supabaseClient";
import React, { useEffect, useState } from "react";
// --- EditProfileForm and Props ---

interface Booking {
  id: number;
  eventDate: string;
  eventTime: string;
  address_snapshot?: any;
  [key: string]: any;
}
interface UserProfile {
  id: string;
  email: string;
  name?: string;
  surname?: string;
}
interface Address {
  id: string;
  label: string;
  address: string;
}

export default function ProfilePage() {
  const user = useSupabaseUser();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    console.log("ProfilePage: user.id", user.id); // DEBUG
    // Fetch bookings for the logged-in user
    fetch("/api/bookings?user_id=" + encodeURIComponent(user.id))
      .then(async (res) => {
        if (!res.ok) return { bookings: [] };
        const text = await res.text();
        if (!text) return { bookings: [] };
        try {
          return JSON.parse(text);
        } catch {
          return { bookings: [] };
        }
      })
      .then((data) => {
        setBookings(data.bookings || []);
        setLoading(false);
      });
    // Fetch user profile and addresses
    fetch("/api/user/profile?user_id=" + encodeURIComponent(user.id)).then(
      async (res) => {
        if (!res.ok) {
          setProfileError("Failed to load profile (" + res.status + ")");
          return null;
        }
        const text = await res.text();
        if (!text) {
          setProfileError("No profile data returned.");
          return null;
        }
        try {
          const data = JSON.parse(text);
          if (!data.user) {
            setProfileError("No user profile found.");
            return null;
          }
          setProfile(data.user);
          setAddresses(data.addresses || []);
          return data;
        } catch (e) {
          setProfileError("Invalid profile response.");
          console.error("Profile fetch error:", e, text);
          return null;
        }
      }
    );
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div className="bg-white dark:bg-black p-8 rounded-xl shadow-xl">
          <h1 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">
            Please log in to view your profile.
          </h1>
        </div>
      </div>
    );
  }

  const handleDeleteAccount = async () => {
    setDeleting(true);
    setDeleteMessage(null);
    // Delete from Supabase Auth
    const { error } = await supabase.auth.admin.deleteUser(user.id);
    if (error) {
      setDeleteMessage("Failed to delete account: " + error.message);
      setDeleting(false);
      return;
    }
    setDeleteMessage("Your account has been deleted. Hope to see you soon!");
    setTimeout(() => {
      window.location.href = "/";
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-gradient-to-br from-blue-100/40 via-gray-200/30 to-blue-200/40 dark:from-blue-900/40 dark:via-slate-800/30 dark:to-gray-900/40">
      <div className="w-full max-w-2xl bg-white dark:bg-blue-950 rounded-2xl shadow-2xl p-8 border-2 border-blue-200 dark:border-blue-800">
        <h1 className="text-3xl font-extrabold text-blue-700 dark:text-blue-300 mb-6">
          My Profile
        </h1>
        <div className="mb-8">
          {profileError ? (
            <div className="text-red-600 dark:text-red-400 font-semibold">
              {profileError}
            </div>
          ) : profile ? (
            <div className="flex flex-col gap-2">
              <div className="font-bold text-lg text-blue-900 dark:text-white">
                Name: {profile.name || "-"} {profile.surname || "-"}
              </div>
              <div className="text-blue-900 dark:text-white">
                Email: {profile.email}
              </div>
              <div className="text-blue-900 dark:text-white">
                <span className="font-semibold">Addresses:</span>
                {addresses.length === 0 ? (
                  <span> None</span>
                ) : (
                  <ul className="list-disc ml-6">
                    {addresses.map((addr) => (
                      <li key={addr.id}>
                        <span className="font-semibold dark:text-white">
                          {addr.label}:
                        </span>{" "}
                        {addr.address}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button
                className="mt-2 px-4 py-2 rounded bg-blue-500 text-white font-bold hover:bg-blue-700 transition"
                onClick={() => setEditMode((v) => !v)}
              >
                {editMode ? "Cancel" : "Edit Profile"}
              </button>
              {editMode && profile && (
                <EditProfileForm
                  profile={profile}
                  addresses={addresses}
                  onCancel={() => setEditMode(false)}
                  onSave={(updatedProfile, updatedAddresses) => {
                    setProfile(updatedProfile);
                    setAddresses(updatedAddresses);
                    setEditMode(false);
                  }}
                />
              )}
              {!editMode && (
                <button
                  className="mt-2 px-4 py-2 rounded bg-red-600 text-white font-bold hover:bg-red-800 transition"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete Account
                </button>
              )}
              {/* Delete Account Modal */}
              {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                  <div className="bg-white dark:bg-blue-950 p-8 rounded-xl shadow-2xl border-2 border-blue-200 dark:border-blue-800 max-w-md w-full text-center">
                    <h2 className="text-xl font-bold text-red-700 mb-4">
                      Delete Account
                    </h2>
                    <p className="mb-4 text-blue-900 dark:text-white">
                      Are you sure you want to delete your account? This action
                      cannot be undone.
                      <br />
                      Hope to see you soon!
                    </p>
                    {deleteMessage && (
                      <div className="mb-2 text-green-600 dark:text-green-400">
                        {deleteMessage}
                      </div>
                    )}
                    <div className="flex gap-4 justify-center">
                      <button
                        className="px-4 py-2 rounded bg-red-600 text-white font-bold hover:bg-red-800 transition disabled:opacity-60"
                        onClick={handleDeleteAccount}
                        disabled={deleting}
                      >
                        {deleting ? "Deleting..." : "Yes, Delete"}
                      </button>
                      <button
                        className="px-4 py-2 rounded bg-gray-400 text-white font-bold hover:bg-gray-600 transition"
                        onClick={() => setShowDeleteModal(false)}
                        disabled={deleting}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-blue-900 dark:text-blue-200">
              Loading profile...
            </div>
          )}
        </div>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
          My Bookings
        </h2>
        {loading ? (
          <div className="text-blue-700 dark:text-blue-200">
            Loading bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-blue-700 dark:text-blue-200">
            No bookings found.
          </div>
        ) : (
          <ul className="space-y-4">
            {bookings.map((booking) => (
              <li
                key={booking.id}
                className="bg-blue-100 dark:bg-blue-900 rounded-xl p-4 shadow"
              >
                <div className="font-bold text-blue-700 dark:text-blue-200">
                  Event Date: {booking.eventDate}
                </div>
                <div className="text-blue-900 dark:text-blue-200">
                  Time: {booking.eventTime}
                </div>
                {booking.address_snapshot && (
                  <div className="text-blue-900 dark:text-blue-200 mt-2">
                    <span className="font-semibold">Address:</span>{" "}
                    {typeof booking.address_snapshot === "string"
                      ? booking.address_snapshot
                      : JSON.stringify(booking.address_snapshot)}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// --- EditProfileForm and Props ---
interface EditProfileFormProps {
  profile: UserProfile;
  addresses: Address[];
  onCancel: () => void;
  onSave: (profile: UserProfile, addresses: Address[]) => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  profile,
  addresses,
  onCancel,
  onSave,
}) => {
  const [name, setName] = React.useState(profile.name || "");
  const [surname, setSurname] = React.useState(profile.surname || "");
  const [localAddresses, setLocalAddresses] =
    React.useState<Address[]>(addresses);
  const [newLabel, setNewLabel] = React.useState("");
  const [newAddress, setNewAddress] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleAddressChange = (
    idx: number,
    field: "label" | "address",
    value: string
  ) => {
    setLocalAddresses((prev) =>
      prev.map((addr, i) => (i === idx ? { ...addr, [field]: value } : addr))
    );
  };

  const handleRemoveAddress = (idx: number) => {
    setLocalAddresses((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddAddress = () => {
    if (!newLabel.trim() || !newAddress.trim()) return;
    setLocalAddresses((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).slice(2),
        label: newLabel,
        address: newAddress,
      },
    ]);
    setNewLabel("");
    setNewAddress("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/user/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: profile.id,
          name,
          surname,
          addresses: localAddresses.map(({ label, address }) => ({
            label,
            address,
          })),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update profile");
      }
      onSave({ ...profile, name, surname }, localAddresses);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input
            className="w-full px-3 py-2 rounded border border-blue-300 dark:border-blue-700 bg-white dark:bg-blue-900 text-blue-900 dark:text-blue-100"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1">Surname</label>
          <input
            className="w-full px-3 py-2 rounded border border-blue-300 dark:border-blue-700 bg-white dark:bg-blue-900 text-blue-900 dark:text-blue-100"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Addresses</label>
        <ul className="space-y-2">
          {localAddresses.map((addr, idx) => (
            <li key={addr.id} className="flex gap-2 items-center">
              <input
                className="px-2 py-1 rounded border border-blue-300 dark:border-blue-700 bg-white dark:bg-blue-900 text-blue-900 dark:text-blue-100 w-32"
                value={addr.label}
                onChange={(e) =>
                  handleAddressChange(idx, "label", e.target.value)
                }
                placeholder="Label"
                required
              />
              <input
                className="flex-1 px-2 py-1 rounded border border-blue-300 dark:border-blue-700 bg-white dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                value={addr.address}
                onChange={(e) =>
                  handleAddressChange(idx, "address", e.target.value)
                }
                placeholder="Address"
                required
              />
              <button
                type="button"
                className="ml-2 px-2 py-1 rounded bg-red-500 text-white hover:bg-red-700"
                onClick={() => handleRemoveAddress(idx)}
                title="Remove address"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
        <div className="flex gap-2 mt-2">
          <input
            className="px-2 py-1 rounded border border-blue-300 dark:border-blue-700 bg-white dark:bg-blue-900 text-blue-900 dark:text-blue-100 w-32"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Label"
          />
          <input
            className="flex-1 px-2 py-1 rounded border border-blue-300 dark:border-blue-700 bg-white dark:bg-blue-900 text-blue-900 dark:text-blue-100"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            placeholder="Address"
          />
          <button
            type="button"
            className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-700"
            onClick={handleAddAddress}
            disabled={!newLabel.trim() || !newAddress.trim()}
          >
            Add
          </button>
        </div>
      </div>
      {error && <div className="text-red-600 dark:text-red-400">{error}</div>}
      <div className="flex gap-4 mt-4 items-center">
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-800 transition disabled:opacity-60"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          className="px-4 py-2 rounded bg-gray-400 text-white font-bold hover:bg-gray-600 transition"
          onClick={onCancel}
          disabled={saving}
        >
          Cancel
        </button>
        <button
          type="button"
          className="ml-auto px-3 py-1 text-xs rounded bg-red-600 text-white font-bold hover:bg-red-800 transition"
          onClick={() => (window as any).setShowDeleteModal?.(true)}
          disabled={saving}
          title="Delete Account"
        >
          Delete Account
        </button>
      </div>
    </form>
  );
};
