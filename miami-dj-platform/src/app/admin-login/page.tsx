"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);
    // First, try to sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage(
        error.message === "Invalid login credentials"
          ? "Incorrect admin email or password."
          : error.message
      );
      setIsError(true);
      return;
    }
    // Check if user is in admin_users table
    const { data: adminUser, error: adminError } = await supabase
      .from("admin_users")
      .select("id")
      .eq("email", email)
      .single();
    if (adminError || !adminUser) {
      setMessage("You are not authorized to login as admin.");
      setIsError(true);
      // Optionally, sign out the user if not admin
      await supabase.auth.signOut();
      return;
    }
    setMessage("Admin login successful! Redirecting...");
    setIsError(false);
    setTimeout(() => router.push("/admin"), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-purple-700 dark:from-black dark:via-green-900 dark:to-blue-900">
      <form
        onSubmit={handleAdminLogin}
        className="bg-gradient-to-br from-green-900 via-blue-800 to-purple-700 dark:from-black dark:via-green-900 dark:to-blue-900 p-8 rounded-2xl shadow-2xl max-w-md w-full border-4 border-green-400 dark:border-green-600"
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center text-green-400 drop-shadow-xl animate-pulse dark:text-green-300">
          Admin Login
        </h1>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border-none rounded-xl text-black dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 shadow focus:ring-4 focus:ring-green-400 dark:focus:ring-green-600"
          required
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border-none rounded-xl text-black dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 shadow focus:ring-4 focus:ring-green-400 dark:focus:ring-green-600"
          required
        />
        <button
          type="submit"
          className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 text-black font-bold text-base shadow-xl hover:scale-110 hover:from-purple-500 hover:to-green-400 transition-all duration-300 focus:ring-4 focus:ring-green-400 dark:bg-gradient-to-r dark:from-green-600 dark:via-blue-900 dark:to-purple-900 dark:text-white dark:focus:ring-green-600"
        >
          Admin Login
        </button>
        {message && (
          <p
            className={`mt-4 text-center font-bold ${
              isError
                ? "text-red-500 dark:text-red-400"
                : "text-green-500 dark:text-green-400"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
