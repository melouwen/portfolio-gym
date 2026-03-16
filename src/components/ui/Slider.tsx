"use client";

import { cn } from "@/lib/cn";
import { useSound } from "@/contexts/SoundContext";

type Props = {
  value: number; // 0..1
  onChange: (v: number) => void;
  label: string;
  className?: string;
};

export function Slider({ value, onChange, label, className }: Props) {
  const { play } = useSound();
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <label className="text-xs text-[var(--smg-muted)]">{label}</label>
      <input
        aria-label={label}
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onPointerUp={() => play("soft")}
        onKeyUp={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") play("soft");
        }}
        className="h-1 w-full cursor-pointer appearance-none rounded-full bg-[var(--smg-border)] accent-[var(--smg-primary)]"
      />
      <span className="w-11 text-right text-xs text-[var(--smg-muted)]">
        {Math.round(value * 100)}%
      </span>
    </div>
  );
}

