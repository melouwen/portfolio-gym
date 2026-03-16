"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AnimationProvider } from "@/contexts/AnimationContext";
import { SoundProvider } from "@/contexts/SoundContext";
import { CursorGlow } from "@/components/effects/CursorGlow";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AnimationProvider>
          <SoundProvider>
            <CursorGlow />
            {children}
          </SoundProvider>
        </AnimationProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

