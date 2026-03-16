"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { useSound } from "@/contexts/SoundContext";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md";
  sound?: "button" | "toggle" | "soft" | "none";
};

export const IconButton = forwardRef<HTMLButtonElement, Props>(function IconButton(
  { size = "md", sound = "soft", className, onClick, ...props },
  ref
) {
  const { play } = useSound();
  const base =
    "inline-flex items-center justify-center rounded-full border border-[var(--smg-border)] bg-[color-mix(in_oklab,var(--smg-card)_70%,transparent)] text-[var(--smg-text)] shadow-[var(--smg-shadow-soft)] transition duration-150 ease-out hover:border-[var(--smg-primary)] hover:text-[var(--smg-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--smg-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--smg-bg)]";

  const sizes: Record<NonNullable<Props["size"]>, string> = {
    sm: "h-9 w-9 text-sm",
    md: "h-10 w-10 text-sm",
  };

  return (
    <button
      ref={ref}
      className={cn(base, sizes[size], className)}
      onClick={(e) => {
        if (sound !== "none") play(sound === "soft" ? "soft" : sound);
        onClick?.(e);
      }}
      {...props}
    />
  );
});

