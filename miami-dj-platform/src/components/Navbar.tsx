"use client";
import React from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { useSupabaseUser } from "../lib/useSupabaseUser";
import { supabase } from "../lib/supabaseClient";
import { useCart } from "../lib/contexts/CartContext";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Book Now", href: "/book" },
  { name: "Contact Us", href: "/contact" },
];


export const Navbar: React.FC = () => {
  const user = useSupabaseUser();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };
  const [isDark, setIsDark] = React.useState(false);
  const { items } = useCart();
  const [cartOpen, setCartOpen] = React.useState(false);
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
    ? "linear-gradient(90deg, #0f172a 0%, #312e81 40%, #0f172a 100%)"
    : "linear-gradient(90deg, #7c3aed 0%, #2563eb 40%, #7c3aed 100%)";
  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-neon-green dark:border-green-400 shadow-xl"
      style={{ background: navBg }}
    >
      <div
        className="w-full flex items-center justify-center gap-16 px-8 py-5"
        style={{ background: navBg }}
      >
        <div className="flex items-center gap-4">
          <Link href="/">
            <img
              src="/arove-logo.png"
              alt="Arove Logo"
              className="h-12 w-auto block drop-shadow-[0_0_48px_rgba(124,58,237,1)] transition-all duration-300 hover:drop-shadow-[0_0_96px_rgba(124,58,237,1)]"
              style={{ filter: 'drop-shadow(0 0 64px #7c3aed) drop-shadow(0 0 32px #fff)', transition: 'filter 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.filter = 'drop-shadow(0 0 128px #7c3aed) drop-shadow(0 0 64px #fff)'}
              onMouseLeave={e => e.currentTarget.style.filter = 'drop-shadow(0 0 64px #7c3aed) drop-shadow(0 0 32px #fff)'}
            />
          </Link>
          <Link href="/" className="font-extrabold text-3xl text-white drop-shadow-xl animate-pulse">
            Arove Entertainment
          </Link>
        </div>
        <div className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-base font-bold text-white dark:text-green-400 hover:text-neon-green dark:hover:text-green-300 transition-colors drop-shadow"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2 relative">
          <ThemeToggle />
          <button
            aria-label="Cart"
            className="p-2 rounded-full focus:outline-none focus:ring-4 focus:ring-neon-green dark:focus:ring-green-400 transition-all duration-300 relative bg-gradient-to-r from-neon-green via-blue-400 to-purple-500 dark:from-green-400 dark:via-blue-900 dark:to-purple-900 shadow-xl hover:scale-110"
            onClick={() => setCartOpen((open) => !open)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-black dark:text-white">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61l1.38-7.39H6" />
            </svg>
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-neon-green text-black rounded-full px-2 text-xs font-bold">{items.length}</span>
            )}
          </button>
          {cartOpen && (
            <div className="absolute right-0 top-12 w-80 bg-gradient-to-br from-blue-900 via-purple-800 to-blue-700 dark:from-black dark:via-purple-900 dark:to-blue-900 shadow-2xl rounded-2xl border-4 border-neon-green dark:border-green-400 z-50 p-4 flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
              <h3 className="text-lg font-extrabold mb-2 text-neon-green drop-shadow-xl animate-pulse dark:text-green-400">Your Cart</h3>
              {items.length === 0 ? (
                <span className="text-white">Cart is empty</span>
              ) : (
                items.map((item, idx) => {
                  return (
                    <div key={item.step} className="bg-gradient-to-r from-neon-green via-blue-400 to-purple-500 dark:from-green-400 dark:via-blue-900 dark:to-purple-900 rounded-xl p-3 mb-2 shadow flex flex-col gap-1">
                      <div className="font-bold text-black dark:text-white text-lg mb-1">{item.step.replace(/([A-Z])/g, ' $1').trim()}</div>
                      {item.data && typeof item.data === 'object' ? (
                        <ul className="text-sm text-black dark:text-white pl-2">
                          {Object.entries(item.data).map(([key, value]) => (
                            <li key={key} className="mb-1">
                              <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span> <span>{String(value)}</span>
                            </li>
                          ))}
                          {/* Overnight event logic */}
                          {(item.data?.startTime !== undefined && item.data?.finishTime !== undefined && String(item.data.startTime) === String(item.data.finishTime)) && (
                            <li className="mb-1 text-pink-600 font-bold">Overnight event</li>
                          )}
                        </ul>
                      ) : (
                        <span className="text-black dark:text-white">{String(item.data)}</span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
          {user ? (
            <>
              <span className="text-sm text-white dark:text-green-400 font-bold">{user.email}</span>
              <button onClick={handleLogout} className="px-4 py-2 rounded-xl bg-gradient-to-r from-neon-green via-blue-400 to-purple-500 text-black font-bold shadow-xl hover:scale-110 transition-all duration-300 focus:ring-4 focus:ring-neon-green dark:bg-gradient-to-r dark:from-green-400 dark:via-blue-900 dark:to-purple-900 dark:text-white dark:focus:ring-green-400">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 rounded-xl bg-gradient-to-r from-neon-green via-blue-400 to-purple-500 text-black font-bold shadow-xl hover:scale-110 transition-all duration-300 focus:ring-4 focus:ring-neon-green dark:bg-gradient-to-r dark:from-green-400 dark:via-blue-900 dark:to-purple-900 dark:text-white dark:focus:ring-green-400">Login</Link>
              <Link href="/signup" className="px-4 py-2 rounded-xl bg-gradient-to-r from-neon-green via-blue-400 to-purple-500 text-black font-bold shadow-xl hover:scale-110 transition-all duration-300 focus:ring-4 focus:ring-neon-green dark:bg-gradient-to-r dark:from-green-400 dark:via-blue-900 dark:to-purple-900 dark:text-white dark:focus:ring-green-400">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
