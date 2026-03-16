"use client";

import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useAnimationSettings } from "@/contexts/AnimationContext";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  maxDeg?: number;
};

export function TiltCard({ children, className, maxDeg = 9 }: Props) {
  const { animationsEnabled } = useAnimationSettings();
  const reduced = useReducedMotionPreference();
  const ref = useRef<HTMLDivElement | null>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 220, damping: 20, mass: 0.35 });
  const sy = useSpring(ry, { stiffness: 220, damping: 20, mass: 0.35 });

  if (!animationsEnabled || reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      style={{ rotateX: sx, rotateY: sy, transformStyle: "preserve-3d" }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width; // 0..1
        const py = (e.clientY - r.top) / r.height; // 0..1
        ry.set((px - 0.5) * maxDeg);
        rx.set(-(py - 0.5) * maxDeg);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      <div style={{ transform: "translateZ(0.01px)" }}>{children}</div>
    </motion.div>
  );
}

