"use client";

import { useRouter } from "next/navigation";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { Section } from "@/components/ui/Section";
import { useLanguage } from "@/contexts/LanguageContext";
import { CONTENT, pickLang } from "@/content/siteContent";
import { cn } from "@/lib/cn";

export function ServicesSection() {
  const { language } = useLanguage();
  const router = useRouter();
  const c = CONTENT.services;

  return (
    // Зменшено відступи секції
    <Section id="services" className="py-16 sm:py-24 relative overflow-hidden">

      {/* Легке світіння на фоні */}
      <div className="absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-[var(--smg-primary)]/5 blur-[100px] pointer-events-none" />

      {/* Заголовок секції */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-5 px-4 sm:px-6 lg:px-12 w-full mx-auto max-w-[1720px]">
        <div className="max-w-3xl text-left">
          <MotionReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--smg-primary)]/30 bg-[var(--smg-primary)]/10 px-3 py-1.5 mb-4 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--smg-primary)] backdrop-blur-md">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--smg-primary)] opacity-75"></span>
                <span className="relative inline-flex size-1.5 rounded-full bg-[var(--smg-primary)] shadow-[0_0_8px_var(--smg-primary)]"></span>
              </span>
              {language === "uk" ? "Що ми пропонуємо" : "What we offer"}
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            {/* Менший заголовок */}
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black uppercase tracking-tighter text-white lg:leading-[1.05]">
              {pickLang(c.title, language)}
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <p className="mt-4 text-xs sm:text-sm lg:text-base leading-relaxed text-white/60 max-w-lg">
              {pickLang(c.subtitle, language)}
            </p>
          </MotionReveal>
        </div>

        {/* Підказка "Свайпай" */}
        <MotionReveal delay={0.2}>
          <div className="hidden md:flex items-center gap-2 text-white/30 mb-2">
          </div>
        </MotionReveal>
      </div>

      {/* Гарантовані стилі для ідеальної безкінечної стрічки */}
      <style>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .scrolling-wrapper {
          animation: infinite-scroll 45s linear infinite;
          will-change: transform;
        }
        .marquee-container:hover .scrolling-wrapper {
          animation-play-state: paused;
        }
      `}</style>

      {/* Безкінечна стрічка (Marquee) */}
      <div className="marquee-container mt-8 sm:mt-12 flex overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">

        {[...Array(2)].map((_, arrayIdx) => (
          <div
            key={arrayIdx}
            aria-hidden={arrayIdx === 1}
            className="scrolling-wrapper flex shrink-0 gap-4 sm:gap-5 pr-4 sm:pr-5 py-4"
          >
            {c.items.map((service, idx) => (
              <article
                key={`${service.id}-${idx}`}
                onClick={() => router.push(`/services/${service.slug}`)}
                // ЗМЕНШЕНІ КАРТКИ: моб 280x380, ПК 340x460
                className="group/card cursor-pointer relative h-[380px] w-[280px] sm:h-[460px] sm:w-[340px] flex-none overflow-hidden rounded-[2rem] bg-[#0a0a0f] shadow-2xl ring-1 ring-white/5 transition-all duration-500 hover:ring-[var(--smg-primary)]/50 hover:shadow-[0_0_40px_rgba(255,107,26,0.15)] [-webkit-tap-highlight-color:transparent]"
              >
                {/* Зображення */}
                <div className="absolute inset-0">
                  <img
                    src={service.heroImage}
                    alt={pickLang(service.title, language)}
                    className="h-full w-full object-cover object-center scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover/card:bg-transparent transition-colors duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-[#07070a]/60 to-transparent opacity-95" />
                </div>

                {/* Верхні бейджі */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                  <div className="flex items-center gap-1.5 rounded-full bg-black/40 border border-white/10 px-2.5 py-1.5 backdrop-blur-md">
                    <svg className="w-3 h-3 text-[var(--smg-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white">
                      {service.durationMin} {language === "uk" ? "хв" : "min"}
                    </span>
                  </div>

                  <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                    <span className="size-1.5 rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    {pickLang(service.difficulty, language)}
                  </span>
                </div>

                {/* Контент знизу */}
                <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end p-5 sm:p-6 z-10 h-full">

                  {/* Зменшений шрифт назви послуги */}
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase text-white drop-shadow-md mb-2 transition-transform duration-500 group-hover/card:-translate-y-1.5">
                    {pickLang(service.title, language)}
                  </h3>

                  <p className="line-clamp-2 text-[11px] sm:text-xs leading-relaxed text-white/60 mb-5 sm:mb-6 font-medium transition-transform duration-500 group-hover/card:-translate-y-1.5">
                    {pickLang(service.description, language)}
                  </p>

                  {/* Компактніша кнопка */}
                  <div className="flex w-full items-center justify-between rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-md transition-all duration-500 group-hover/card:bg-[var(--smg-primary)] group-hover/card:border-[var(--smg-primary)] group-hover/card:shadow-[0_10px_20px_rgba(255,107,26,0.3)]">
                    <span className="pl-4 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 transition-colors duration-500 group-hover/card:text-white">
                      {language === "uk" ? "Детальніше" : "Explore"}
                    </span>

                    <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white text-black transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:-rotate-45 group-hover/card:scale-95">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>

                </div>
              </article>
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
}