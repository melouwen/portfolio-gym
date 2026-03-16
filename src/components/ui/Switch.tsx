"use client";

import { cn } from "@/lib/cn";
import { useSound } from "@/contexts/SoundContext";

type Props = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  disabled?: boolean;
};

export function Switch({ checked, onChange, label, disabled }: Props) {
  const { play } = useSound();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => {
        play("toggle");
        onChange(!checked);
      }}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-150 ease-out disabled:opacity-60",
        checked ? "bg-[var(--smg-primary)]" : "bg-[var(--smg-border)]"
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 rounded-full bg-white shadow-[var(--smg-shadow-soft)] transition-transform duration-150 ease-out",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
}

