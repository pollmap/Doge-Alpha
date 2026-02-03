"use client";

import { Sun, Moon } from "lucide-react";
import { useSettingsStore } from "@/store/useSettingsStore";

export function ThemeToggle() {
  const { theme, setTheme } = useSettingsStore();

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(next);
  };

  return (
    <button
      onClick={toggle}
      className="p-2 rounded text-[var(--c-text-tertiary)] hover:text-[var(--c-text-secondary)] hover:bg-[var(--c-bg-hover)] transition-colors"
      aria-label="테마 전환"
    >
      {theme === "dark" ? (
        <Sun className="w-3.5 h-3.5" strokeWidth={1.75} />
      ) : (
        <Moon className="w-3.5 h-3.5" strokeWidth={1.75} />
      )}
    </button>
  );
}
