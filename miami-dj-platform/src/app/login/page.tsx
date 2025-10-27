"use client";
"use client";
import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      if (error.message === "Email not confirmed") {
        setMessage("Email not confirmed");
        setIsError(true);
      } else {
        setMessage(
          error.message === "Invalid login credentials"
            ? "Incorrect email or password. Please try again."
            : error.message
        );
        setIsError(true);
      }
    } else {
      setMessage("Login successful! Redirecting...");
      setIsError(false);
      setTimeout(() => router.push("/"), 1000);
    }
  };

  const handleResendConfirmation = async () => {
    setMessage("");
    const { error } = await supabase.auth.resend({ type: "signup", email });
    if (error) {
      setMessage("Failed to resend confirmation email: " + error.message);
      setIsError(true);
    } else {
      setMessage("Confirmation email resent! Please check your inbox.");
      setIsError(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-blue-600 to-purple-900 dark:from-purple-900 dark:via-blue-900 dark:to-black">
      <form
        onSubmit={handleLogin}
        className="bg-gradient-to-br from-blue-900 via-purple-800 to-blue-700 dark:from-black dark:via-purple-900 dark:to-blue-900 p-8 rounded-2xl shadow-2xl max-w-md w-full border-4 border-neon-green dark:border-green-400"
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center text-neon-green drop-shadow-xl animate-pulse dark:text-green-400">
          Login
        </h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border-none rounded-xl text-black dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 shadow focus:ring-4 focus:ring-neon-green dark:focus:ring-green-400"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border-none rounded-xl text-black dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 shadow focus:ring-4 focus:ring-neon-green dark:focus:ring-green-400"
          required
        />
        <button
          type="submit"
          className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-neon-green via-blue-400 to-purple-500 text-black font-bold text-base shadow-xl hover:scale-110 hover:from-purple-500 hover:to-neon-green transition-all duration-300 focus:ring-4 focus:ring-neon-green dark:bg-gradient-to-r dark:from-green-400 dark:via-blue-900 dark:to-purple-900 dark:text-white dark:focus:ring-green-400"
        >
          Login
        </button>
        {message && (
          <>
            <p
              className={`mt-4 text-center font-bold ${
                isError
                  ? "text-red-500 dark:text-red-400"
                  : "text-green-500 dark:text-green-400"
              }`}
            >
              {message}
            </p>
            {message === "Email not confirmed" && (
              <button
                type="button"
                className="mt-2 w-full px-6 py-2 rounded-xl bg-gradient-to-r from-red-400 via-blue-400 to-purple-500 text-white font-bold text-base shadow-xl hover:scale-105 transition-all duration-300 focus:ring-4 focus:ring-red-400 dark:bg-gradient-to-r dark:from-red-400 dark:via-blue-900 dark:to-purple-900 dark:text-white dark:focus:ring-red-400"
                onClick={handleResendConfirmation}
              >
                Resend Confirmation Email
              </button>
            )}
          </>
        )}
        <div className="mt-6 text-center">
          <a
            href="/admin-login"
            className="text-green-400 hover:underline font-semibold"
          >
            Admin Login
          </a>
        </div>
      </form>
    </div>
  );
}
