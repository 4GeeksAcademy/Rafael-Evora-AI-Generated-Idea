"use client";
import React from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { useSupabaseUser } from "../lib/useSupabaseUser";
import { supabase } from "../lib/supabaseClient";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Book Now", href: "/book" },
  { name: "Contact", href: "/contact" },
];

export const Navbar: React.FC = () => {
  const user = useSupabaseUser();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };
  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-black bg-opacity-80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <Link href="/">
            <img src="/arove-logo-black.svg" alt="Arove Logo" className="h-8 w-auto" />
          </Link>
          <Link href="/" className="font-bold text-xl text-teal dark:text-gray-200">
            Arove Entertainment
          </Link>
        </div>
        <div className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-base font-medium hover:text-coral transition-colors dark:text-gray-200"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <>
              <span className="text-sm text-gray-700 dark:text-gray-200">{user.email}</span>
              <button onClick={handleLogout} className="bg-gray-700 text-white px-3 py-1 rounded font-semibold text-sm hover:bg-coral transition-colors">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="bg-teal text-white px-3 py-1 rounded font-semibold text-sm hover:bg-coral transition-colors">Login</Link>
              <Link href="/signup" className="bg-coral text-white px-3 py-1 rounded font-semibold text-sm hover:bg-teal transition-colors">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
