"use client";

import { useEffect, useState } from "react";

type Options = {
  sectionIds: string[];
  rootMargin?: string;
};

export function useScrollSpy({ sectionIds, rootMargin = "-55% 0px -40% 0px" }: Options) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop
          );

        if (visible[0]) setActiveId((visible[0].target as HTMLElement).id);
      },
      { rootMargin }
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [sectionIds, rootMargin]);

  return activeId;
}

