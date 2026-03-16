"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Trainer } from "@/content/siteContent";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAnimationSettings } from "@/contexts/AnimationContext";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { CONTENT, pickLang } from "@/content/siteContent";
import { IconButton } from "@/components/ui/IconButton";
import { Button } from "@/components/ui/Button";
import { useSound } from "@/contexts/SoundContext";

type Props = {
  open: boolean;
  trainer: Trainer | null;
  onClose: () => void;
};

function getFocusable(container: HTMLElement) {
  const selectors =
    'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])';
  return Array.from(container.querySelectorAll<HTMLElement>(selectors)).filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
  );
}

export function TrainerModal({ open, trainer, onClose }: Props) {
  const { language } = useLanguage();
  const { animationsEnabled } = useAnimationSettings();
  const reduced = useReducedMotionPreference();
  const { play } = useSound();

  const rootRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const [mounted] = useState(true);

  const labels = useMemo(() => CONTENT.trainers, []);

  useEffect(() => {
    if (!open) return;
    play("modalOpen");
    closeBtnRef.current?.focus();
  }, [open, play]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        play("modalClose");
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const root = rootRef.current;
      if (!root) return;
      const focusables = getFocusable(root);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, play]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const motionOn = open && mounted && animationsEnabled && !reduced;

  const content = trainer ? (
    <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
      <div className="overflow-hidden rounded-[var(--smg-radius-card)] border border-[var(--smg-border)] bg-[color-mix(in_oklab,var(--smg-bg)_30%,transparent)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={trainer.photo}
          alt={pickLang(trainer.name, language)}
          className="h-[320px] w-full object-cover sm:h-[380px]"
        />
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--smg-muted)]">
          {pickLang(trainer.specialization, language)} ·{" "}
          {trainer.experienceYears} {language === "uk" ? "років досвіду" : "years"}
        </p>
        <h3 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
          {pickLang(trainer.name, language)}
        </h3>
        <p className="mt-4 text-sm leading-6 text-[var(--smg-muted)]">
          {pickLang(trainer.approach, language)}
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[var(--smg-radius-card)] border border-[var(--smg-border)] bg-[color-mix(in_oklab,var(--smg-card)_70%,transparent)] p-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--smg-muted)]">
              {pickLang(labels.tabs.achievements, language)}
            </p>
            <ul className="mt-3 grid gap-2 text-sm text-[var(--smg-muted)]">
              {(language === "uk" ? trainer.achievements.uk : trainer.achievements.en).map(
                (a) => (
                  <li key={a} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--smg-primary)]" />
                    <span>{a}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="rounded-[var(--smg-radius-card)] border border-[var(--smg-border)] bg-[color-mix(in_oklab,var(--smg-card)_70%,transparent)] p-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--smg-muted)]">
              {pickLang(labels.tabs.certificates, language)}
            </p>
            <ul className="mt-3 grid gap-2 text-sm text-[var(--smg-muted)]">
              {(language === "uk" ? trainer.certificates.uk : trainer.certificates.en).map(
                (c) => (
                  <li key={c} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
                    <span>{c}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            {pickLang(labels.cta, language)}
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              play("modalClose");
              onClose();
            }}
          >
            {language === "uk" ? "Закрити" : "Close"}
          </Button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] grid place-items-center px-3 py-6 sm:px-6"
          initial={motionOn ? { opacity: 0 } : false}
          animate={motionOn ? { opacity: 1 } : undefined}
          exit={motionOn ? { opacity: 0 } : undefined}
        >
          <motion.button
            type="button"
            aria-label={pickLang(labels.closeProfileAria, language)}
            className="absolute inset-0 bg-black/60"
            onClick={() => {
              play("modalClose");
              onClose();
            }}
            initial={motionOn ? { opacity: 0 } : false}
            animate={motionOn ? { opacity: 1 } : undefined}
            exit={motionOn ? { opacity: 0 } : undefined}
          />

          <motion.div
            ref={rootRef}
            role="dialog"
            aria-modal="true"
            aria-label={trainer ? pickLang(trainer.name, language) : pickLang(labels.viewProfile, language)}
            className="relative z-[1] w-full max-w-5xl rounded-[calc(var(--smg-radius-card)+10px)] border border-[var(--smg-border)] bg-[color-mix(in_oklab,var(--smg-card)_82%,transparent)] p-4 shadow-[var(--smg-shadow-soft)] backdrop-blur sm:p-6"
            initial={motionOn ? { opacity: 0, y: 22, filter: "blur(10px)", scale: 0.98 } : false}
            animate={motionOn ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 } : undefined}
            exit={motionOn ? { opacity: 0, y: 12, filter: "blur(10px)", scale: 0.98 } : undefined}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-[var(--smg-border)] pb-3">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--smg-muted)]">
                SMG · {pickLang(labels.viewProfile, language)}
              </p>
              <IconButton
                ref={closeBtnRef}
                aria-label={pickLang(labels.closeProfileAria, language)}
                onClick={() => {
                  play("modalClose");
                  onClose();
                }}
                sound="none"
                size="sm"
              >
                ✕
              </IconButton>
            </div>

            {content}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

