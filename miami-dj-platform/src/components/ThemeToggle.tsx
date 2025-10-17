"use client";
import React from "react";
import { useTheme } from "../lib/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="p-2 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors duration-300"
    >
      {theme === "light" ? (
        <Sun className="w-6 h-6 text-yellow-400" />
      ) : (
        <Moon className="w-6 h-6 text-blue-400" />
      )}
    </button>
  );
};
