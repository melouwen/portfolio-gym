"use client";

import { MotionReveal } from "@/components/motion/MotionReveal";
import { Section } from "@/components/ui/Section";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/cn";

const DISCOUNTS_DATA = [
  {
    id: "continuous",
    value: "-10%",
    text: { uk: "Безперервний абонемент", en: "Continuous membership" },
  },
  {
    id: "family",
    value: "-10%",
    text: { uk: "Сімейний абонемент", en: "Family membership" },
  },
  {
    id: "students",
    value: "-10%",
    text: { uk: "Для учнів та студентів", en: "For pupils and students" },
  },
  {
    id: "military-card",
    value: "-20%",
    text: { uk: "Для військових на Клубні Карти", en: "For military on Club Cards" },
    highlight: true,
  },
  {
    id: "military-pt",
    value: "-10%",
    text: { uk: "Для військових на персональні тренування", en: "For military on personal training" },
  },
];

export function DiscountsSection() {
  const { language } = useLanguage();

  const texts = {
    eyebrow: { uk: "СПЕЦІАЛЬНІ ПРОПОЗИЦІЇ", en: "Special Offers" },
    title: { uk: "Постійні знижки", en: "Permanent Discounts" },
    note1: { uk: "* Знижки не сумуються", en: "* Discounts do not stack" },
    note2: {
      uk: "* Деякі з них потребують наявності відповідних документів",
      en: "* Some require appropriate documents"
    },
  };

  return (
    // Ще більше зменшено відступи для мобільних (py-8)
    <Section id="discounts" className="relative overflow-hidden py-8 sm:py-20">

      {/* Фонове світіння */}
      <div className="absolute top-0 right-0 h-[20rem] w-[20rem] sm:h-[30rem] sm:w-[30rem] -translate-y-1/2 translate-x-1/2 rounded-full bg-[var(--smg-primary)] opacity-[0.03] blur-[80px] pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-[1000px] px-4 sm:px-6">

        {/* ЗАГОЛОВОК */}
        <div className="mb-6 sm:mb-10 flex flex-col items-start text-left">
          <MotionReveal>
            {/* Менший бейдж */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--smg-primary)]/40 bg-[var(--smg-primary)]/10 px-2.5 py-1 sm:px-3 sm:py-1.5 mb-3 sm:mb-4 text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--smg-primary)] backdrop-blur-md">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--smg-primary)] opacity-75"></span>
                <span className="relative inline-flex size-1.5 rounded-full bg-[var(--smg-primary)] shadow-[0_0_8px_var(--smg-primary)]"></span>
              </span>
              {language === "uk" ? texts.eyebrow.uk : texts.eyebrow.en}
            </div>
          </MotionReveal>

          <MotionReveal delay={0.05}>
            {/* Менший заголовок (text-2xl на моб) */}
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white sm:text-4xl lg:text-5xl">
              {language === "uk" ? texts.title.uk : texts.title.en}
            </h2>
          </MotionReveal>
        </div>

        {/* СПИСОК ЗНИЖОК */}
        <div className="flex flex-col">
          <div className="h-px w-full bg-white/10" />

          {DISCOUNTS_DATA.map((item, idx) => (
            <MotionReveal key={item.id} delay={0.1 + idx * 0.05}>
              {/* Компактніші рядки (py-3, gap-3) */}
              <div className="group relative flex flex-row items-center justify-between gap-3 border-b border-white/10 py-3 transition-colors duration-300 hover:border-[var(--smg-primary)]/50 sm:gap-6 sm:py-6 cursor-default [-webkit-tap-highlight-color:transparent]">

                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--smg-primary)]/0 via-[var(--smg-primary)]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Відсоток (Бейдж) - ще менший */}
                <div className={cn(
                  "shrink-0 flex items-center justify-center rounded-full border transition-all duration-300 px-2.5 py-1 sm:px-5 sm:py-2",
                  item.highlight
                    ? "border-[var(--smg-primary)] bg-[var(--smg-primary)]/10 text-[var(--smg-primary)] shadow-[0_0_15px_-3px_var(--smg-primary)] group-hover:bg-[var(--smg-primary)] group-hover:text-white"
                    : "border-white/20 text-white group-hover:border-[var(--smg-primary)] group-hover:text-[var(--smg-primary)]"
                )}>
                  {/* Текст відсотка (text-sm на моб) */}
                  <span className="text-sm font-black tracking-tighter sm:text-2xl lg:text-3xl">
                    {item.value}
                  </span>
                </div>

                {/* Текст знижки - менший шрифт (text-[11px]) */}
                <div className="flex-1 text-left sm:text-right">
                  <h3 className="text-[11px] leading-snug font-bold uppercase tracking-wider text-white/80 transition-colors duration-300 group-hover:text-white sm:text-lg lg:text-xl">
                    {language === "uk" ? item.text.uk : item.text.en}
                  </h3>
                </div>

              </div>
            </MotionReveal>
          ))}
        </div>

        {/* ЗНОСКИ (ПРИМІТКИ) - мініатюрні */}
        <MotionReveal delay={0.4}>
          <div className="mt-5 flex flex-col items-start justify-start gap-1 sm:mt-8">
            <p className="text-[8px] font-bold uppercase tracking-widest text-white/40 sm:text-[10px]">
              {language === "uk" ? texts.note1.uk : texts.note1.en}
            </p>
            <p className="text-[8px] font-bold uppercase tracking-widest text-white/40 sm:text-[10px]">
              {language === "uk" ? texts.note2.uk : texts.note2.en}
            </p>
          </div>
        </MotionReveal>

      </div>
    </Section>
  );
}