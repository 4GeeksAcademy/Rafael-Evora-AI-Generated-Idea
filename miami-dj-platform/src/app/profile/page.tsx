"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSupabaseUser } from "../../lib/useSupabaseUser";
import { supabase } from "../../lib/supabaseClient";
import AddressList, { Address } from "./components/AddressList";
import EditProfileForm from "./components/EditProfileForm";
import BookingList, { Booking } from "./components/BookingList";
import DeleteAccountModal from "./components/DeleteAccountModal";

interface UserProfile {
  id: string;
  email: string;
  name?: string;
  surname?: string;
}

export default function ProfilePage() {
  const user = useSupabaseUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const initialProfile = useRef<UserProfile | null>(null);
  const initialAddresses = useRef<Address[] | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteStep, setDeleteStep] = useState<1 | 2>(1);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);

  // Fetch profile and bookings
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const bookingUrl = user.id
      ? "/api/bookings?user_id=" + encodeURIComponent(user.id)
      : user.email
      ? "/api/bookings?email=" + encodeURIComponent(user.email)
      : null;
    Promise.all([
      bookingUrl
        ? fetch(bookingUrl).then(async (res) => {
            if (!res.ok) return { bookings: [] };
            const text = await res.text();
            if (!text) return { bookings: [] };
            try {
              return JSON.parse(text);
            } catch {
              return { bookings: [] };
            }
          })
        : Promise.resolve({ bookings: [] }),
      fetch("/api/user/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id }),
      }).then(async (res) => {
        if (!res.ok) return { profile: null, addresses: [] };
        const data = await res.json();
        return data;
      }),
    ])
      .then(([bookingData, profileData]) => {
        setBookings(bookingData.bookings || []);
        setProfile(profileData.profile || null);
        setAddresses(profileData.addresses || []);
        initialProfile.current = profileData.profile || null;
        initialAddresses.current = profileData.addresses || [];
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  // Unsaved changes warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
        return e.returnValue;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [unsavedChanges]);

  const handleDeleteAccount = async () => {
    if (!user) return;
    setDeleting(true);
    setDeleteMessage(null);
    try {
      const res = await fetch("/api/user/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id }),
      });
      let data = null;
      let isJson = true;
      try {
        data = await res.json();
      } catch (jsonErr) {
        isJson = false;
      }
      if (!res.ok || (isJson && data && data.error)) {
        setDeleteMessage(
          "Failed to delete account: " +
            (isJson && data && data.error ? data.error : res.statusText)
        );
        setDeleting(false);
        return;
      }
      setDeleteMessage("Your account has been deleted. Hope to see you soon!");
      setDeleting(false);
      setShowDeleteModal(true); // keep modal open for goodbye
      setDeleteStep(1);
      setDeleteConfirmText("");
      setTimeout(() => {
        window.location.href = "/";
      }, 2500);
    } catch (err: any) {
      setDeleteMessage("Failed to delete account: " + (err?.message || err));
      setDeleting(false);
    }
  };

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

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-blue-900 dark:via-blue-800 dark:to-blue-950">
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
              <div className="font-bold text-lg text-blue-900 dark:text-blue-200">
                Name: {profile.name || "-"} {profile.surname || "-"}
              </div>
              <div className="text-blue-900 dark:text-blue-200">
                Email: {profile.email}
              </div>
              <AddressList
                addresses={addresses}
                onEditProfile={() => setEditMode(true)}
              />
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
                    initialProfile.current = updatedProfile;
                    initialAddresses.current = updatedAddresses;
                    setUnsavedChanges(false);
                  }}
                />
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
        <BookingList bookings={bookings} loading={loading} />
      </div>
      <button
        type="button"
        className="fixed bottom-6 right-6 px-4 py-2 rounded bg-red-600 text-white font-bold hover:bg-red-800 transition shadow-lg z-50"
        onClick={() => {
          setShowDeleteModal(true);
          setDeleteStep(1);
        }}
        title="Delete Account"
      >
        Delete Account
      </button>
      <DeleteAccountModal
        show={showDeleteModal}
        step={deleteStep}
        deleting={deleting}
        deleteConfirmText={deleteConfirmText}
        deleteMessage={deleteMessage}
        onContinue={() => setDeleteStep(2)}
        onCancel={() => {
          setShowDeleteModal(false);
          setDeleteStep(1);
          setDeleteConfirmText("");
        }}
        onDelete={handleDeleteAccount}
        onChangeConfirmText={setDeleteConfirmText}
      />
    </div>
  );
}
