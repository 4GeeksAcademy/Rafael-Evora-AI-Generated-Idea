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
  const [isDark, setIsDark] = React.useState(false);
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDark(document.documentElement.classList.contains('dark'));
      const observer = new MutationObserver(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
      return () => observer.disconnect();
    }
  }, []);
  const navBg = isDark
    ? "linear-gradient(70deg, #0a0a0a 0%, #0a0a0a 28%, #18181b 42%, #18181b 100%)"
    : "linear-gradient(70deg, #0a0a0a 0%, #0a0a0a 28%, #fff 42%, #fff 100%)";
  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800"
      style={{ background: navBg }}
    >
      <div
        className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2"
        style={{ background: navBg }}
      >
        <div className="flex items-center gap-2">
          <Link href="/">
            <img src="/arove-logo-black copy.svg" alt="Arove Logo" className="h-8 w-auto block dark:hidden" />
            <img src="/arove-logo-black.svg" alt="Arove Logo" className="h-8 w-auto hidden dark:block" />
          </Link>
          <Link href="/" className="font-bold text-xl text-white">
            Arove Entertainment
          </Link>
        </div>
        <div className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-base font-medium text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <>
              <span className="text-sm text-black dark:text-white">{user.email}</span>
              <button onClick={handleLogout} className="bg-gray-700 text-white dark:text-white px-3 py-1 rounded font-semibold text-sm hover:bg-gray-500 transition-colors">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="bg-gray-700 text-white px-3 py-1 rounded font-semibold text-sm hover:bg-gray-500 transition-colors">Login</Link>
              <Link href="/signup" className="bg-gray-700 text-white px-3 py-1 rounded font-semibold text-sm hover:bg-gray-500 transition-colors">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
