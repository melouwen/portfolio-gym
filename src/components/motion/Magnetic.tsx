"use client";

import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useAnimationSettings } from "@/contexts/AnimationContext";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";

type Props = {
  children: ReactNode;
  strength?: number; // px
  className?: string;
};

export function Magnetic({ children, strength = 10, className }: Props) {
  const { animationsEnabled } = useAnimationSettings();
  const reduced = useReducedMotionPreference();
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 280, damping: 18, mass: 0.4 });

  if (!animationsEnabled || reduced || strength <= 0) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        x.set((dx / (r.width / 2)) * strength);
        y.set((dy / (r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

