"use client";

import { cn } from "@/lib/cn";
import { motion } from "framer-motion";

type Props = React.PropsWithChildren<{
  id: string;
  className?: string;
  containerClassName?: string;
}>;

export function Section({ id, className, containerClassName, children }: Props) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative w-full",
        // Оригінальні відступи: дають секціям "дихати", без жорстких обмежень
        "py-16 sm:py-24 lg:py-32",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 sm:h-24 lg:h-32">
        <div className="absolute inset-x-[20%] top-1/2 h-8 -translate-y-1/2 bg-white/6 blur-3xl" />
        <div
          className="absolute inset-0 bg-white/[0.02]"
          style={{ clipPath: "polygon(0 52%, 100% 12%, 100% 72%, 0 100%)" }}
        />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            clipPath: "polygon(0 52%, 100% 16%, 100% 18%, 0 54%)",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
          }}
        />
      </div>

      <div
        className={cn(
          "relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-12",
          containerClassName
        )}
      >
        {children}
      </div>
    </motion.section>
  );
}