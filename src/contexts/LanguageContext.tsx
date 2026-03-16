"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import type { Language } from "@/config/languages";
import { safeLocalStorageGet, safeLocalStorageSet } from "@/lib/localStorage";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "smg.language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return "uk";
    return safeLocalStorageGet<Language>(STORAGE_KEY, "uk");
  });

  const value = useMemo<LanguageContextValue>(() => {
    const setLanguage = (next: Language) => {
      setLanguageState(next);
      safeLocalStorageSet(STORAGE_KEY, next);
    };
    const toggleLanguage = () => setLanguage(language === "uk" ? "en" : "uk");
    return { language, setLanguage, toggleLanguage };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

