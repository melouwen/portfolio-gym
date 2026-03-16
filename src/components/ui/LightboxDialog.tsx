"use client";

import { useEffect, useRef } from "react";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/cn";

type Props = {
  open: boolean;
  src?: string;
  alt?: string;
  onClose: () => void;
};

export function LightboxDialog({ open, src, alt, onClose }: Props) {
  const ref = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    const onCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    dialog.addEventListener("cancel", onCancel);
    return () => dialog.removeEventListener("cancel", onCancel);
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      className={cn(
        "w-[min(1000px,95vw)] rounded-[var(--smg-radius-card)] border border-[var(--smg-border)] bg-[color-mix(in_oklab,var(--smg-card)_85%,transparent)] p-0 text-[var(--smg-text)] shadow-[var(--smg-shadow-soft)] backdrop:bg-black/60"
      )}
      onClose={onClose}
    >
      <div className="flex items-center justify-between border-b border-[var(--smg-border)] px-4 py-3">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--smg-muted)]">
          SMG Gallery
        </p>
        <IconButton aria-label="Close" onClick={onClose} size="sm">
          ✕
        </IconButton>
      </div>

      <div className="p-3 sm:p-4">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt ?? ""}
            className="h-auto w-full rounded-[calc(var(--smg-radius-card)-6px)] object-cover"
          />
        ) : (
          <div className="h-[40vh] w-full rounded-[calc(var(--smg-radius-card)-6px)] bg-[var(--smg-border)]" />
        )}
      </div>
    </dialog>
  );
}

