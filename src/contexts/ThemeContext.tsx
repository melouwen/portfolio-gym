"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { safeLocalStorageGet, safeLocalStorageSet } from "@/lib/localStorage";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "smg.theme";

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const body = document.body;
  body.classList.remove("theme-light", "theme-dark");
  body.classList.add(theme === "light" ? "theme-light" : "theme-dark");

  // Tailwind dark: strategy "class"
  const html = document.documentElement;
  if (theme === "dark") html.classList.add("dark");
  else html.classList.remove("dark");
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const stored = safeLocalStorageGet<Theme | null>(STORAGE_KEY, null);
    if (stored) return stored;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(() => {
    const setTheme = (next: Theme) => {
      setThemeState(next);
      safeLocalStorageSet(STORAGE_KEY, next);
      applyTheme(next);
    };
    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
    return { theme, setTheme, toggleTheme };
  }, [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

