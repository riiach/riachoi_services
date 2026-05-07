"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);

      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleTheme = () => {

    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {

      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center gap-1 rounded-full bg-white dark:bg-neutral-900 p-1 shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-colors duration-300"
    >

      {/* Light mode button */}
      <div
        className={`
          flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300
          ${theme === "light"
          ? "bg-black text-white"
          : "bg-transparent text-black dark:text-white"}
        `}
      >
        <Sun size={16} strokeWidth={2} />
      </div>

      {/* Dark mode button */}
      <div
        className={`
          flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300
          ${theme === "dark"
          ? "bg-black text-white"
          : "bg-transparent text-black dark:text-white"}
        `}
      >
        <Moon size={16} strokeWidth={2} />
      </div>
    </button>
  );
}