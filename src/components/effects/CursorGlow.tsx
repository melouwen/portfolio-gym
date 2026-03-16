"use client";

import { useEffect, useRef } from "react";
import { useAnimationSettings } from "@/contexts/AnimationContext";

export function CursorGlow() {
  const { animationsEnabled } = useAnimationSettings();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (!animationsEnabled || reduceMotion) {
      el.style.opacity = "0";
      return;
    }

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        el.style.transform = `translate3d(${x - 140}px, ${y - 140}px, 0)`;
        el.style.opacity = "1";
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [animationsEnabled]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[280px] w-[280px] rounded-full opacity-0 blur-3xl transition-opacity duration-300"
      style={{
        background:
          "radial-gradient(circle, rgba(255,107,26,0.22), rgba(255,145,81,0.10), transparent 65%)",
        mixBlendMode: "screen",
      }}
    />
  );
}

