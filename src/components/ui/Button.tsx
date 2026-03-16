"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { useSound } from "@/contexts/SoundContext";
import { Magnetic } from "@/components/motion/Magnetic";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  sound?: "button" | "toggle" | "soft" | "none";
  magnetic?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    variant = "primary",
    size = "md",
    sound = "button",
    magnetic = variant !== "ghost",
    className,
    onClick,
    ...props
  },
  ref
) {
  const { play } = useSound();

  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--smg-radius-pill)] font-semibold transition duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--smg-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--smg-bg)] disabled:pointer-events-none disabled:opacity-60";

  const variants: Record<NonNullable<Props["variant"]>, string> = {
    primary:
      "bg-gradient-to-r from-[var(--smg-primary-soft)] to-[var(--smg-primary)] text-white shadow-[var(--smg-shadow-glow)] hover:translate-y-[-1px] hover:shadow-[var(--smg-shadow-glow)]",
    secondary:
      "border border-[var(--smg-border)] bg-[color-mix(in_oklab,var(--smg-card)_65%,transparent)] text-[var(--smg-text)] hover:border-[var(--smg-primary)] hover:text-[var(--smg-primary)]",
    ghost:
      "text-[var(--smg-muted)] hover:bg-[color-mix(in_oklab,var(--smg-card)_75%,transparent)] hover:text-[var(--smg-text)]",
  };

  const sizes: Record<NonNullable<Props["size"]>, string> = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-5 text-sm",
  };

  return (
    <Magnetic className="inline-flex" strength={magnetic ? 10 : 0}>
      <button
        ref={ref}
        className={cn(
          base,
          variants[variant],
          sizes[size],
          className
        )}
        onClick={(e) => {
          if (sound !== "none") play(sound === "soft" ? "soft" : sound);
          onClick?.(e);
        }}
        {...props}
      />
    </Magnetic>
  );
});