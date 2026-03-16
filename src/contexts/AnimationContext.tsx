"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { safeLocalStorageGet, safeLocalStorageSet } from "@/lib/localStorage";

type AnimationContextValue = {
  animationsEnabled: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
  toggleAnimations: () => void;
};

const AnimationContext = createContext<AnimationContextValue | undefined>(undefined);

const STORAGE_KEY = "smg.animationsEnabled";

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [animationsEnabled, setAnimationsEnabledState] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = safeLocalStorageGet<boolean | null>(STORAGE_KEY, null);
    if (typeof stored === "boolean") return stored;
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    return !prefersReduced;
  });

  const value = useMemo<AnimationContextValue>(() => {
    const setAnimationsEnabled = (enabled: boolean) => {
      setAnimationsEnabledState(enabled);
      safeLocalStorageSet(STORAGE_KEY, enabled);
    };
    const toggleAnimations = () => setAnimationsEnabled(!animationsEnabled);
    return { animationsEnabled, setAnimationsEnabled, toggleAnimations };
  }, [animationsEnabled]);

  return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>;
}

export function useAnimationSettings() {
  const ctx = useContext(AnimationContext);
  if (!ctx) throw new Error("useAnimationSettings must be used within AnimationProvider");
  return ctx;
}

