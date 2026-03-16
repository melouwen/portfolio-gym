"use client";

import { useEffect, useMemo, useState } from "react";
import { useAnimationSettings } from "@/contexts/AnimationContext";

type Props = {
  value: number;
  durationMs?: number;
  suffix?: string;
};

export function AnimatedCounter({ value, durationMs = 1100, suffix = "" }: Props) {
  const { animationsEnabled } = useAnimationSettings();
  const [display, setDisplay] = useState(0);

  const target = useMemo(() => Math.max(0, Math.floor(value)), [value]);

  useEffect(() => {
    if (!animationsEnabled) return;

    let raf = 0;
    const start = performance.now();
    const from = 0;
    const to = target;

    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animationsEnabled, durationMs, target]);

  const shown = animationsEnabled ? display : target;

  return (
    <span className="tabular-nums">
      {shown}
      {suffix}
    </span>
  );
}

