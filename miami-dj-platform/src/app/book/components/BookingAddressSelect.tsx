import React, { useState, useEffect } from "react";

type Address = { id: string; label?: string; address?: string };

export const BookingAddressSelect: React.FC<{
  value: string;
  onChange: (val: string) => void;
}> = ({ value, onChange }) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/user/profile/addresses")
      .then((res) => res.json())
      .then((data) => {
        setAddresses(data.addresses || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load addresses");
        setLoading(false);
      });
  }, []);

  return (
    <div className="mb-4">
      <label className="block font-bold mb-2">Address</label>
      {loading ? (
        <div>Loading addresses...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <select
          className="w-full p-2 border rounded"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select an address</option>
          {addresses.map((a) => (
            <option key={a.id} value={a.id}>
              {a.label || a.address || a.id}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
