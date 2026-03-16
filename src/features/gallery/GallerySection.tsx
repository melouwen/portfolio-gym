"use client";

import { MotionReveal } from "@/components/motion/MotionReveal";
import { Section } from "@/components/ui/Section";
import { useLanguage } from "@/contexts/LanguageContext";
import { CONTENT, pickLang } from "@/content/siteContent";
import { cn } from "@/lib/cn";

export function GallerySection() {
  const { language } = useLanguage();

  const text = {
    eyebrow: { uk: "Наш простір", en: "Our Space" },
    title: { uk: "Атмосфера SMG", en: "SMG Atmosphere" },
    subtitle: { uk: "Метал, світло, ритм. Дивись, як виглядає тренування в преміальному клубі.", en: "Metal, light, rhythm. See what training in a premium club looks like." },
  };

  const images = [
    "/images/gallery/gallery-1.webp",
    "/images/gallery/gallery-2.webp",
    "/images/gallery/gallery-3.webp",
    "/images/gallery/gallery-4.webp"
  ];

  return (
    <Section id="gallery" className="relative overflow-hidden py-16 sm:py-24">

      {/* Фонове світіння */}
      <div className="absolute top-1/2 right-0 h-[400px] w-[400px] -translate-y-1/2 translate-x-1/3 rounded-full bg-[var(--smg-primary)]/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-[1720px] px-4 sm:px-6 lg:px-10 flex flex-col gap-8 sm:gap-12">

        {/* ШАПКА ГАЛЕРЕЇ (Текст вирівняно по лівому краю) */}
        <div className="flex flex-col items-start text-left max-w-3xl">
          <MotionReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--smg-primary)]/30 bg-[var(--smg-primary)]/10 px-3 py-1.5 mb-4 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--smg-primary)] backdrop-blur-md">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--smg-primary)] opacity-75"></span>
                <span className="relative inline-flex size-1.5 rounded-full bg-[var(--smg-primary)] shadow-[0_0_8px_var(--smg-primary)]"></span>
              </span>
              {language === "uk" ? text.eyebrow.uk : text.eyebrow.en}
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white">
              {language === "uk" ? text.title.uk : text.title.en}
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <p className="mt-4 text-xs sm:text-sm lg:text-base leading-relaxed text-white/60">
              {language === "uk" ? text.subtitle.uk : text.subtitle.en}
            </p>
          </MotionReveal>
        </div>

        {/* ПРЕМІАЛЬНА BENTO-СІТКА (Без інтерактиву) */}
        <MotionReveal delay={0.2} className="w-full">
          <div className="grid w-full grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 auto-rows-[160px] sm:auto-rows-[220px] md:auto-rows-[260px] lg:auto-rows-[320px]">

            {/* ФОТО 1: Велике зліва */}
            <div className="relative col-span-2 row-span-2 overflow-hidden rounded-[1.5rem] lg:rounded-[2.5rem] bg-[#0a0a0f] ring-1 ring-white/5 pointer-events-none">
              <img src={images[0]} alt="SMG Gym" className="h-full w-full object-cover opacity-90" />
            </div>

            {/* ФОТО 2: Широке справа зверху */}
            <div className="relative col-span-2 row-span-1 overflow-hidden rounded-[1.5rem] lg:rounded-[2.5rem] bg-[#0a0a0f] ring-1 ring-white/5 pointer-events-none">
              <img src={images[1]} alt="SMG Details" className="h-full w-full object-cover opacity-90" />
            </div>

            {/* ФОТО 3: Квадратне знизу */}
            <div className="relative col-span-1 row-span-1 overflow-hidden rounded-[1.5rem] lg:rounded-[2.5rem] bg-[#0a0a0f] ring-1 ring-white/5 pointer-events-none">
              <img src={images[2]} alt="SMG Vibe" className="h-full w-full object-cover opacity-90" />
            </div>

            {/* ФОТО 4: Квадратне знизу */}
            <div className="relative col-span-1 row-span-1 overflow-hidden rounded-[1.5rem] lg:rounded-[2.5rem] bg-[#0a0a0f] ring-1 ring-white/5 pointer-events-none">
              <img src={images[3]} alt="SMG Equipment" className="h-full w-full object-cover opacity-90" />
            </div>

          </div>
        </MotionReveal>

      </div>
    </Section>
  );
}