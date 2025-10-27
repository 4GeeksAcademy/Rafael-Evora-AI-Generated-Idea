"use client";
import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    // Check if email already exists
    const { data: existingUser, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();
    if (existingUser) {
      setMessage("Email is already in use.");
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setMessage(error.message);
    } else {
      // Insert name and surname into users table if signup is successful
      if (data.user) {
        await supabase.from("users").insert({
          id: data.user.id,
          email,
          name,
          surname,
        });
      }
      setMessage(
        "Signup successful! Please check your email to confirm your account."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-blue-600 to-purple-900 dark:from-purple-900 dark:via-blue-900 dark:to-black">
      <form
        onSubmit={handleSignup}
        className="bg-gradient-to-br from-blue-900 via-purple-800 to-blue-700 dark:from-black dark:via-purple-900 dark:to-blue-900 p-8 rounded-2xl shadow-2xl max-w-md w-full border-4 border-neon-green dark:border-green-400"
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center text-neon-green drop-shadow-xl animate-pulse dark:text-green-400">
          Sign Up
        </h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border-none rounded-xl text-black dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 shadow focus:ring-4 focus:ring-neon-green dark:focus:ring-green-400"
          required
        />
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          className="w-full p-3 mb-4 border-none rounded-xl text-black dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 shadow focus:ring-4 focus:ring-neon-green dark:focus:ring-green-400"
          required
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 mb-4 border-none rounded-xl text-black dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 shadow focus:ring-4 focus:ring-neon-green dark:focus:ring-green-400"
          required
        />
        <button
          type="submit"
          className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-neon-green via-blue-400 to-purple-500 text-black font-bold text-base shadow-xl hover:scale-110 hover:from-purple-500 hover:to-neon-green transition-all duration-300 focus:ring-4 focus:ring-neon-green dark:bg-gradient-to-r dark:from-green-400 dark:via-blue-900 dark:to-purple-900 dark:text-white dark:focus:ring-green-400"
        >
          Sign Up
        </button>
        {message && (
          <p className="mt-4 text-center text-neon-green dark:text-green-400">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
