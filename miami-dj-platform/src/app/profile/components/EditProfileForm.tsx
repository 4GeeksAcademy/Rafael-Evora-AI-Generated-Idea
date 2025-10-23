import React, { useState, useEffect, useRef } from "react";
import AddressInput from "./AddressInput";
import { Address } from "./AddressList";

interface UserProfile {
  id: string;
  email: string;
  name?: string;
  surname?: string;
}

interface EditProfileFormProps {
  profile: UserProfile;
  addresses: Address[];
  onCancel: () => void;
  onSave: (profile: UserProfile, addresses: Address[]) => void;
}

const LABEL_OPTIONS = ["Home", "Work", "Other"];

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  profile,
  addresses,
  onCancel,
  onSave,
}) => {
  const [name, setName] = useState(profile.name || "");
  const [surname, setSurname] = useState(profile.surname || "");
  const [localAddresses, setLocalAddresses] = useState<Address[]>(addresses);
  const [newLabel, setNewLabel] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newZip, setNewZip] = useState("");
  const [newState, setNewState] = useState("");
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Listen for address deletions from view mode
  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent;
      if (custom.detail && custom.detail.id) {
        setLocalAddresses((prev) =>
          prev.filter((a) => a.id !== custom.detail.id)
        );
      }
    };
    window.addEventListener("address-deleted", handler);
    return () => window.removeEventListener("address-deleted", handler);
  }, []);

  const handleAddressChange = (
    idx: number,
    field: "label" | "address" | "zip_code" | "state",
    value: string
  ) => {
    setLocalAddresses((prev) =>
      prev.map((addr, i) => (i === idx ? { ...addr, [field]: value } : addr))
    );
  };

  const handleAddAddress = async () => {
    if (!newLabel.trim() || !newAddress.trim()) return;
    setSaving(true);
    setError(null);
    const newAddr: Address = {
      id: Math.random().toString(36).slice(2),
      label: newLabel,
      address: newAddress,
      zip_code: newZip,
      state: newState,
    };
    try {
      const updatedAddresses = [...localAddresses, newAddr];
      const res = await fetch("/api/user/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: profile.id,
          name,
          surname,
          addresses: updatedAddresses.map(
            ({ label, address, zip_code, state }) => ({
              label,
              address,
              zip_code,
              state,
            })
          ),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add address");
      }
      setLocalAddresses(updatedAddresses);
      setNewLabel("");
      setNewAddress("");
      setNewZip("");
      setNewState("");
      onSave({ ...profile, name, surname }, updatedAddresses);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
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
          addresses: localAddresses.map(
            ({ label, address, zip_code, state }) => ({
              label,
              address,
              zip_code,
              state,
            })
          ),
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
          <label className="block text-sm font-semibold mb-1 text-blue-900 dark:text-blue-200">
            Name
          </label>
          <input
            className="w-full px-3 py-2 rounded border border-blue-300 dark:border-blue-700 bg-white dark:bg-blue-900 text-blue-900 dark:text-blue-100"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1 text-blue-900 dark:text-blue-200">
            Surname
          </label>
          <input
            className="w-full px-3 py-2 rounded border border-blue-300 dark:border-blue-700 bg-white dark:bg-blue-900 text-blue-900 dark:text-blue-100"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1 text-blue-900 dark:text-blue-200">
          Addresses
        </label>
        <ul className="space-y-2">
          {localAddresses.map((addr, idx) => (
            <li key={addr.id} className="flex flex-wrap gap-2 items-center">
              <select
                className="px-2 py-1 rounded border border-blue-300 dark:border-blue-700 bg-white dark:bg-blue-900 text-blue-900 dark:text-blue-100 w-28"
                value={addr.label}
                onChange={(e) =>
                  handleAddressChange(idx, "label", e.target.value)
                }
                required
              >
                {LABEL_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
                <option value={addr.label}>{addr.label}</option>
              </select>
              <input
                className="flex-1 px-2 py-1 rounded border border-blue-300 dark:border-blue-700 bg-white dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                value={addr.address}
                onChange={(e) =>
                  handleAddressChange(idx, "address", e.target.value)
                }
                placeholder="Address"
                required
              />
              <input
                className="w-20 px-2 py-1 rounded border border-blue-300 dark:border-blue-700 bg-white dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                value={addr.zip_code || ""}
                onChange={(e) =>
                  handleAddressChange(idx, "zip_code", e.target.value)
                }
                placeholder="Zip"
              />
              <input
                className="w-20 px-2 py-1 rounded border border-blue-300 dark:border-blue-700 bg-white dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                value={addr.state || ""}
                onChange={(e) =>
                  handleAddressChange(idx, "state", e.target.value)
                }
                placeholder="State"
              />
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 mt-2">
          <select
            className="px-2 py-1 rounded border border-blue-300 dark:border-blue-700 bg-white dark:bg-blue-900 text-blue-900 dark:text-blue-100 w-28"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
          >
            <option value="">Label</option>
            {LABEL_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <AddressInput
            label="Address"
            value={newAddress}
            onChange={setNewAddress}
            suggestions={addressSuggestions}
            onSuggestionSelect={setNewAddress}
            onInput={setNewAddress}
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
            placeholder="Address"
          />
          <input
            className="w-20 px-2 py-1 rounded border border-blue-300 dark:border-blue-700 bg-white dark:bg-blue-900 text-blue-900 dark:text-blue-100"
            value={newZip}
            onChange={(e) => setNewZip(e.target.value)}
            placeholder="Zip"
          />
          <input
            className="w-20 px-2 py-1 rounded border border-blue-300 dark:border-blue-700 bg-white dark:bg-blue-900 text-blue-900 dark:text-blue-100"
            value={newState}
            onChange={(e) => setNewState(e.target.value)}
            placeholder="State"
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
      </div>
    </form>
  );
};

export default EditProfileForm;
