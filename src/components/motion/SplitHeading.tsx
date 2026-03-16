"use client";

import { motion } from "framer-motion";
import { useAnimationSettings } from "@/contexts/AnimationContext";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { cn } from "@/lib/cn";

type Props = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
};

export function SplitHeading({ children, className, as = "h2", delay = 0 }: Props) {
  const { animationsEnabled } = useAnimationSettings();
  const reduced = useReducedMotionPreference();

  const Tag = as;

  if (!animationsEnabled || reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  const words = children.split(" ");

  return (
    <Tag className={cn(className)}>
      <span className="sr-only">{children}</span>
      <motion.span
        aria-hidden
        className="inline"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.035, delayChildren: delay } },
        }}
      >
        {words.map((w, i) => (
          <motion.span
            key={`${w}-${i}`}
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)" },
            }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}

