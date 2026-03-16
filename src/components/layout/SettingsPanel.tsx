"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { IconButton } from "@/components/ui/IconButton";
import { Switch } from "@/components/ui/Switch";
import { Slider } from "@/components/ui/Slider";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAnimationSettings } from "@/contexts/AnimationContext";
import { useSound } from "@/contexts/SoundContext";
import { LANGUAGE_LABELS } from "@/config/languages";
import { cn } from "@/lib/cn";
import { CONTENT, pickLang } from "@/content/siteContent";

// Словник для перекладу інтерфейсу
const UI_TEXTS = {
  language: { uk: "Мова інтерфейсу", en: "Language" },
  animations: { uk: "Анімації", en: "Animations" },
  toggleAnimations: { uk: "Увімкнути/Вимкнути", en: "Toggle animations" },
  soundVolume: { uk: "Гучність звуку", en: "Sound Volume" },
};

// SVG Іконки
const Icons = {
  Settings: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
  Sparkles: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M3 5h4"/></svg>,
};

export function SettingsPanel() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  // Реф тепер на всьому контейнері (включаючи кнопку)
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { language, toggleLanguage } = useLanguage();
  const { animationsEnabled, toggleAnimations } = useAnimationSettings();
  const { volume, setVolume, play } = useSound();

  const labels = useMemo(() => CONTENT.header, []);

  const handleLanguageChange = () => {
    play("toggle");
    toggleLanguage();
  };

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    function handleOutside(event: MouseEvent) {
      // Якщо клік відбувся поза межами і кнопки, і панелі — закриваємо
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  const currentLang = (language === "en" ? "en" : "uk") as keyof typeof UI_TEXTS.language;

  return (
    <div className="relative" ref={containerRef}>
      <IconButton
        aria-label={pickLang(labels.settings, language)}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          play("button");
          setOpen((prev) => !prev);
        }}
        className={cn(
          "transition-transform duration-300",
          open && "rotate-90 bg-[var(--smg-primary-soft)] text-[var(--smg-primary)]"
        )}
      >
        <Icons.Settings />
      </IconButton>

      <div
        id={panelId}
        className={cn(
          // ОСЬ ТУТ ГОЛОВНА ЗМІНА:
          // 1. -right-14 на мобільних зсуває панель вправо
          // 2. md:right-0 повертає на місце для ПК
          // 3. max-w-[calc(100vw-2rem)] не дає їй бути ширшою за екран
          "absolute -right-14 sm:-right-16 md:right-0 top-14 z-50 w-[20rem] max-w-[calc(100vw-2rem)] origin-top-right rounded-2xl border border-white/10 bg-[#07070a]/95 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-2xl transition-all duration-200 ease-out",
          open
            ? "scale-100 opacity-100 translate-y-0"
            : "pointer-events-none scale-95 opacity-0 -translate-y-2"
        )}
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--smg-primary)] text-white shadow-sm">
            <Icons.Settings className="h-4 w-4" />
          </div>
          <p className="text-sm font-bold uppercase tracking-wider text-white">
            {pickLang(labels.settings, language)}
          </p>
        </div>

        <div className="flex flex-col gap-5">

          {/* LANGUAGE CONTROL */}
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-white/60">
              {UI_TEXTS.language[currentLang]}
            </span>
            <div className="flex w-32 rounded-full border border-white/10 bg-white/5 p-1">
              <button
                type="button"
                onClick={language !== "uk" ? handleLanguageChange : undefined}
                className={cn(
                  "flex flex-1 items-center justify-center rounded-full py-1.5 text-xs font-bold transition-all duration-200",
                  language === "uk"
                    ? "bg-[var(--smg-primary)] text-white shadow-sm"
                    : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                {LANGUAGE_LABELS.uk}
              </button>
              <button
                type="button"
                onClick={language !== "en" ? handleLanguageChange : undefined}
                className={cn(
                  "flex flex-1 items-center justify-center rounded-full py-1.5 text-xs font-bold transition-all duration-200",
                  language === "en"
                    ? "bg-[var(--smg-primary)] text-white shadow-sm"
                    : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                {LANGUAGE_LABELS.en}
              </button>
            </div>
          </div>

          <div className="h-px w-full bg-white/10" />

          {/* ANIMATIONS CONTROL */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-white/60">
              <Icons.Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">{UI_TEXTS.animations[currentLang]}</span>
            </div>
            <Switch
              checked={animationsEnabled}
              onChange={toggleAnimations}
              label={UI_TEXTS.toggleAnimations[currentLang]}
            />
          </div>

          <div className="h-px w-full bg-white/10" />

          {/* SOUND CONTROL */}
          <div className="pt-1">
            <Slider
              label={UI_TEXTS.soundVolume[currentLang]}
              value={volume}
              onChange={setVolume}
            />
          </div>
        </div>
      </div>
    </div>
  );
}