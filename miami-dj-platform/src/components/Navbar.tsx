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
  // Track last menu button click to avoid double close
  const lastMenuBtnClick = React.useRef<number>(0);
  // Track last cart button click to avoid double close
  const lastCartBtnClick = React.useRef<number>(0);
  const cartBoxRef = React.useRef<HTMLDivElement>(null);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  // Close cart when clicking outside
  React.useEffect(() => {
    if (!cartOpen && !menuOpen) return;
    function handleClickOutside(event: MouseEvent) {
      // Ignore if cart button or menu button was just clicked
      if (Date.now() - lastCartBtnClick.current < 100) return;
      if (Date.now() - lastMenuBtnClick.current < 100) return;
      if (
        cartBoxRef.current &&
        !cartBoxRef.current.contains(event.target as Node)
      ) {
        setCartOpen(false);
      }
      // Close menu if open and click outside
      const menuBox = document.getElementById("navbar-menu-box");
      if (menuOpen && menuBox && !menuBox.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartOpen, menuOpen]);
  const user = useSupabaseUser();
  const [profileName, setProfileName] = React.useState<string | null>(null);
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };
  const [isDark, setIsDark] = React.useState(false);
  const { items } = useCart();
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDark(document.documentElement.classList.contains("dark"));
      const observer = new MutationObserver(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
      return () => observer.disconnect();
    }
  }, []);

  // Fetch user's name from profile API
  React.useEffect(() => {
    if (!user) {
      setProfileName(null);
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `/api/user/profile?user_id=${encodeURIComponent(user.id)}`
        );
        if (res.status === 404) {
          // Fallback for admin or missing user
          setProfileName(user.email || "Admin");
          return;
        }
        if (!res.ok) {
          console.error(
            "Navbar: Failed to fetch profile",
            res.status,
            res.statusText
          );
          setProfileName(null);
          return;
        }
        const text = await res.text();
        if (!text) {
          setProfileName(null);
          return;
        }
        let name = null;
        try {
          const data = JSON.parse(text);
          if (data && data.user && (data.user.name || data.user.surname)) {
            name = `${data.user.name || ""} ${data.user.surname || ""}`.trim();
          }
        } catch (err) {
          console.error("Navbar: Error parsing profile JSON", err);
        }
        setProfileName(name);
      } catch (err) {
        console.error("Navbar: Fetch error", err);
        setProfileName(null);
      }
    })();
  }, [user]);

  const navBg = isDark
    ? "linear-gradient(90deg, rgba(30,41,59,0.70) 0%, rgba(49,46,129,0.85) 40%, rgba(30,41,59,0.85) 100%)"
    : "linear-gradient(90deg, rgba(199,210,254,0.70) 0%, rgba(165,180,252,0.85) 40%, rgba(199,210,254,0.85) 100%)";
  // ...existing code...
  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-blue-200 dark:border-blue-400 shadow-lg"
      style={{ background: navBg }}
    >
      <div
        className="w-full flex items-center justify-between gap-2 px-2 py-2 sm:gap-8 sm:px-4 md:gap-16 md:px-8 md:py-5"
        style={{ background: navBg }}
      >
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <Link href="/">
            <img
              src="/arove-logo.png"
              alt="Arove Logo"
              className="h-10 w-auto max-w-[120px] block drop-shadow-[0_0_24px_rgba(165,180,252,0.7)] transition-all duration-300 hover:drop-shadow-[0_0_48px_rgba(165,180,252,1)]"
              style={{
                filter:
                  "drop-shadow(0 0 32px #a5b4fc) drop-shadow(0 0 16px #fff)",
                transition: "filter 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.filter =
                  "drop-shadow(0 0 64px #a5b4fc) drop-shadow(0 0 32px #fff)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.filter =
                  "drop-shadow(0 0 32px #a5b4fc) drop-shadow(0 0 16px #fff)")
              }
            />
          </Link>
          {/* Hide header text on small screens */}
          <Link
            href="/"
            className="font-extrabold text-lg sm:text-2xl md:text-3xl text-white drop-shadow-xl animate-pulse truncate hidden sm:block"
          >
            Arove Entertainment
          </Link>
        </div>
        {/* Desktop nav */}
        <div className="hidden md:flex gap-4 sm:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-base font-bold text-blue-700 dark:text-blue-200 hover:text-blue-400 dark:hover:text-blue-300 transition-colors drop-shadow"
            >
              {item.name}
            </Link>
          ))}
          {/* User/profile button/text completely removed from desktop nav */}
        </div>
        {/* Hamburger menu for mobile */}
        <div className="md:hidden flex items-center relative">
          {/* User profile link/text completely removed from mobile nav */}
          <button
            id="navbar-cart-btn"
            onMouseDown={(e) => {
              lastCartBtnClick.current = Date.now();
              e.stopPropagation();
              setCartOpen((open) => {
                if (!open) setMenuOpen(false); // opening cart closes menu
                return !open;
              });
            }}
            className="relative px-2 py-2 rounded-xl bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 shadow border border-blue-300 dark:border-blue-700 ml-2 mr-3"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              className="w-6 h-6 text-black dark:text-white"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61l1.38-7.39H6" />
            </svg>
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-200 text-blue-900 rounded-full px-2 text-xs font-bold border border-blue-400">
                {items.length}
              </span>
            )}
          </button>
          <ThemeToggle />
          {cartOpen && (
            <div
              ref={cartBoxRef}
              className="absolute right-0 top-12 w-80 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-blue-200 dark:via-blue-900 dark:to-blue-900 shadow-2xl rounded-2xl border-4 border-blue-200 dark:border-blue-300 z-50 p-4 flex flex-col gap-2 max-h-[60vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-extrabold mb-2 text-blue-700 drop-shadow-xl animate-pulse dark:text-blue-300">
                Your Cart
              </h3>
              {items.length === 0 ? (
                <span className="text-blue-700">Cart is empty</span>
              ) : (
                items.map((item, idx) => {
                  return (
                    <div
                      key={item.step}
                      className="bg-gradient-to-r from-blue-200 via-blue-400 to-blue-100 dark:from-blue-200 dark:via-blue-900 dark:to-blue-900 rounded-xl p-3 mb-2 shadow flex flex-col gap-1"
                    >
                      <div className="font-bold text-blue-700 dark:text-blue-200 text-lg mb-1">
                        {item.step.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                      {item.data && typeof item.data === "object" ? (
                        <ul className="text-sm text-blue-900 dark:text-blue-200 pl-2">
                          {Object.entries(item.data).map(([key, value]) => (
                            <li key={key} className="mb-1">
                              <span className="font-semibold capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}:
                              </span>{" "}
                              <span>{String(value)}</span>
                            </li>
                          ))}
                          {/* Overnight event logic */}
                          {item.data?.startTime !== undefined &&
                            item.data?.finishTime !== undefined &&
                            String(item.data.startTime) ===
                              String(item.data.finishTime) && (
                              <li className="mb-1 text-pink-600 font-bold">
                                Overnight event
                              </li>
                            )}
                        </ul>
                      ) : (
                        <span className="text-blue-900 dark:text-blue-200">
                          {String(item.data)}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
          <button
            aria-label="Open menu"
            id="navbar-menu-btn"
            className="p-2 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-400 transition-all duration-300 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-100 dark:from-blue-400 dark:via-blue-700 dark:to-blue-400 shadow-lg hover:scale-105 ml-2"
            onMouseDown={(e) => {
              lastMenuBtnClick.current = Date.now();
              e.stopPropagation();
              setMenuOpen((open) => {
                if (!open) setCartOpen(false); // opening menu closes cart
                return !open;
              });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              className="w-6 h-6 text-black dark:text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {menuOpen && (
            <div
              id="navbar-menu-box"
              className="absolute right-0 top-12 w-64 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-blue-200 dark:via-blue-900 dark:to-blue-900 shadow-2xl rounded-2xl border-4 border-blue-200 dark:border-blue-300 z-50 p-4 flex flex-col gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base font-bold text-blue-700 dark:text-blue-200 hover:text-blue-400 dark:hover:text-blue-300 transition-colors drop-shadow"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {user && (
                <Link
                  href="/profile"
                  className="text-base font-bold text-blue-700 dark:text-blue-200 hover:text-blue-400 dark:hover:text-blue-300 transition-colors drop-shadow border border-blue-300 dark:border-blue-700 rounded-xl px-4 py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  {user.email || "User"}
                </Link>
              )}
              {user ? (
                <>
                  <span className="text-sm text-white dark:text-green-400 font-bold">
                    {user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 h-12 rounded-xl bg-blue-500 text-white font-bold shadow-xl border-2 border-blue-700 transition-all duration-200 focus:ring-4 focus:ring-blue-200 dark:bg-blue-700 dark:text-white dark:focus:ring-blue-400 hover:bg-blue-700 hover:border-blue-500 hover:shadow-2xl active:bg-blue-800 dark:hover:bg-blue-900"
                  >
                    <span className="transition-all duration-200 hover:font-extrabold">
                      Logout
                    </span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 h-12 rounded-xl bg-blue-500 text-white font-bold shadow-xl border-2 border-blue-700 transition-all duration-200 focus:ring-4 focus:ring-blue-200 dark:bg-blue-700 dark:text-white dark:focus:ring-blue-400 hover:bg-blue-700 hover:border-blue-500 hover:shadow-2xl active:bg-blue-800 dark:hover:bg-blue-900"
                  >
                    <span className="transition-all duration-200 hover:font-extrabold">
                      Login
                    </span>
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 h-12 rounded-xl bg-blue-500 text-white font-bold shadow-xl border-2 border-blue-700 transition-all duration-200 focus:ring-4 focus:ring-blue-200 dark:bg-blue-700 dark:text-white dark:focus:ring-blue-400 hover:bg-blue-700 hover:border-blue-500 hover:shadow-2xl active:bg-blue-800 dark:hover:bg-blue-900"
                  >
                    <span className="transition-all duration-200 hover:font-extrabold">
                      Sign Up
                    </span>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-1 sm:gap-2 relative">
          {user && (
            <Link
              href="/profile"
              className="text-base font-bold text-blue-700 dark:text-blue-200 hover:text-blue-400 dark:hover:text-blue-300 transition-colors drop-shadow mr-2"
              style={{ cursor: "pointer" }}
            ></Link>
          )}
          <ThemeToggle />
          <button
            aria-label="Cart"
            id="navbar-cart-btn-desktop"
            className="p-2 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-400 transition-all duration-300 relative bg-gradient-to-r from-blue-200 via-blue-300 to-blue-100 dark:from-blue-400 dark:via-blue-700 dark:to-blue-400 shadow-lg hover:scale-105"
            onMouseDown={(e) => {
              lastCartBtnClick.current = Date.now();
              e.stopPropagation();
              setCartOpen((open) => !open);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              className="w-6 h-6 text-black dark:text-white"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61l1.38-7.39H6" />
            </svg>
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-200 text-blue-900 rounded-full px-2 text-xs font-bold border border-blue-400">
                {items.length}
              </span>
            )}
          </button>
          {cartOpen && (
            <div className="absolute right-0 top-12 w-80 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-blue-200 dark:via-blue-900 dark:to-blue-900 shadow-2xl rounded-2xl border-4 border-blue-200 dark:border-blue-300 z-50 p-4 flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
              <h3 className="text-lg font-extrabold mb-2 text-blue-700 drop-shadow-xl animate-pulse dark:text-blue-300">
                Your Cart
              </h3>
              {items.length === 0 ? (
                <span className="text-blue-700">Cart is empty</span>
              ) : (
                items.map((item, idx) => {
                  return (
                    <div
                      key={item.step}
                      className="bg-gradient-to-r from-blue-200 via-blue-400 to-blue-100 dark:from-blue-200 dark:via-blue-900 dark:to-blue-900 rounded-xl p-3 mb-2 shadow flex flex-col gap-1"
                    >
                      <div className="font-bold text-blue-700 dark:text-blue-200 text-lg mb-1">
                        {item.step.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                      {item.data && typeof item.data === "object" ? (
                        <ul className="text-sm text-blue-900 dark:text-blue-200 pl-2">
                          {Object.entries(item.data).map(([key, value]) => (
                            <li key={key} className="mb-1">
                              <span className="font-semibold capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}:
                              </span>{" "}
                              <span>{String(value)}</span>
                            </li>
                          ))}
                          {/* Overnight event logic */}
                          {item.data?.startTime !== undefined &&
                            item.data?.finishTime !== undefined &&
                            String(item.data.startTime) ===
                              String(item.data.finishTime) && (
                              <li className="mb-1 text-pink-600 font-bold">
                                Overnight event
                              </li>
                            )}
                        </ul>
                      ) : (
                        <span className="text-blue-900 dark:text-blue-200">
                          {String(item.data)}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* ---------------THIS USER----------------- */}
          {user ? (
            <>
              <Link
                href="/profile"
                className="text-base font-bold text-blue-700 dark:text-blue-200 hover:text-blue-400 dark:hover:text-blue-300 transition-colors drop-shadow border border-blue-300 dark:border-blue-700 rounded-xl px-4 py-2"
                style={{ cursor: "pointer" }}
              >
                {profileName ? profileName.split(" ")[0] : user.email || "User"}
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 h-12 rounded-xl bg-blue-500 text-white font-bold shadow-xl border-2 border-blue-700 transition-all duration-200 focus:ring-4 focus:ring-blue-200 dark:bg-blue-700 dark:text-white dark:focus:ring-blue-400 hover:bg-blue-700 hover:border-blue-500 hover:shadow-2xl active:bg-blue-800 dark:hover:bg-blue-900"
              >
                <span className="transition-all duration-200 hover:font-extrabold">
                  Logout
                </span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 h-12 rounded-xl bg-blue-500 text-white font-bold shadow-xl border-2 border-blue-700 transition-all duration-200 focus:ring-4 focus:ring-blue-200 dark:bg-blue-700 dark:text-white dark:focus:ring-blue-400 hover:bg-blue-700 hover:border-blue-500 hover:shadow-2xl active:bg-blue-800 dark:hover:bg-blue-900"
              >
                <span className="transition-all duration-200 hover:font-extrabold">
                  Login
                </span>
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 h-12 rounded-xl bg-blue-500 text-white font-bold shadow-xl border-2 border-blue-700 transition-all duration-200 focus:ring-4 focus:ring-blue-200 dark:bg-blue-700 dark:text-white dark:focus:ring-blue-400 hover:bg-blue-700 hover:border-blue-500 hover:shadow-2xl active:bg-blue-800 dark:hover:bg-blue-900"
              >
                <span className="transition-all duration-200 hover:font-extrabold">
                  Sign Up
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
