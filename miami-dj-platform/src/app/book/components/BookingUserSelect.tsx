import React, { useState, useEffect } from "react";

type User = { id: string; email: string; name?: string; surname?: string };

export const BookingUserSelect: React.FC<{
  value: string;
  onChange: (val: string) => void;
}> = ({ value, onChange }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/user/profile/list")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load users");
        setLoading(false);
      });
  }, []);

  return (
    <div className="mb-4">
      <label className="block font-bold mb-2">User</label>
      {loading ? (
        <div>Loading users...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <select
          className="w-full p-2 border rounded"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select a user</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.email} {u.name || ""} {u.surname || ""}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
