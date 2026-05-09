"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isLight = resolvedTheme === "light";
  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isLight ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center gap-1 rounded-full bg-primary p-1 shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-colors duration-300 dark:bg-neutral-900"
    >
      {/* Light mode button */}
      <div
        className={`
          flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300
          ${
          isLight
            ? "bg-black text-white"
            : "bg-transparent text-white dark:text-white"
        }
        `}
      >
        <Sun size={16} strokeWidth={2} />
      </div>

      {/* Dark mode button */}
      <div
        className={`
          flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300
          ${
          isDark
            ? "bg-black text-white"
            : "bg-transparent text-black dark:text-white"
        }
        `}
      >
        <Moon size={16} strokeWidth={2} />
      </div>
    </button>
  );
}