"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { Section } from "@/components/ui/Section";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/cn";

const SCHEDULE_DATA = [
  {
    id: "mon",
    day: { uk: "Понеділок", en: "Monday" },
    classes: [
      { time: "8:30", name: "BODY PUMP", serviceSlug: "body-pump", trainer: { uk: "Уляна", en: "Uliana" }, trainerId: "t3", duration: "55 хв" },
      { time: "17:10", name: "FUNCTIONAL + STR.", serviceSlug: "functional", trainer: { uk: "Дар'я", en: "Daria" }, trainerId: "t8", duration: "55 хв" },
      { time: "18:00", name: "FITNESS", serviceSlug: "fitness", trainer: { uk: "Ірина", en: "Iryna" }, trainerId: "t6", duration: "55 хв" },
      { time: "19:00", name: "PILATES", serviceSlug: "pilates", trainer: { uk: "Ірина", en: "Iryna" }, trainerId: "t6", duration: "55 хв" },
    ],
  },
  {
    id: "tue",
    day: { uk: "Вівторок", en: "Tuesday" },
    classes: [
      { time: "17:10", name: "BODY PUMP", serviceSlug: "body-pump", trainer: { uk: "Уляна", en: "Uliana" }, trainerId: "t3", duration: "55 хв" },
      { time: "18:10", name: "PILATES", serviceSlug: "pilates", trainer: { uk: "Ірина", en: "Iryna" }, trainerId: "t6", duration: "55 хв" },
      { time: "19:00", name: "HIIT", serviceSlug: "hiit", trainer: { uk: "Ірина", en: "Iryna" }, trainerId: "t6", duration: "55 хв" },
    ],
  },
  {
    id: "wed",
    day: { uk: "Середа", en: "Wednesday" },
    classes: [
      { time: "8:30", name: "BODY PUMP", serviceSlug: "body-pump", trainer: { uk: "Уляна", en: "Uliana" }, trainerId: "t3", duration: "55 хв" },
      { time: "17:10", name: "FUNCTIONAL + STR.", serviceSlug: "functional", trainer: { uk: "Дар'я", en: "Daria" }, trainerId: "t8", duration: "55 хв" },
      { time: "18:00", name: "FITNESS", serviceSlug: "fitness", trainer: { uk: "Ірина", en: "Iryna" }, trainerId: "t6", duration: "55 хв" },
      { time: "19:00", name: "PILATES", serviceSlug: "pilates", trainer: { uk: "Ірина", en: "Iryna" }, trainerId: "t6", duration: "55 хв" },
    ],
  },
  {
    id: "thu",
    day: { uk: "Четвер", en: "Thursday" },
    classes: [
      { time: "17:10", name: "BODY PUMP", serviceSlug: "body-pump", trainer: { uk: "Уляна", en: "Uliana" }, trainerId: "t3", duration: "55 хв" },
      { time: "18:10", name: "PILATES", serviceSlug: "pilates", trainer: { uk: "Ірина", en: "Iryna" }, trainerId: "t6", duration: "55 хв" },
      { time: "19:00", name: "HIIT", serviceSlug: "hiit", trainer: { uk: "Ірина", en: "Iryna" }, trainerId: "t6", duration: "55 хв" },
    ],
  },
  {
    id: "fri",
    day: { uk: "П'ятниця", en: "Friday" },
    classes: [
      { time: "8:30", name: "BODY PUMP", serviceSlug: "body-pump", trainer: { uk: "Уляна", en: "Uliana" }, trainerId: "t3", duration: "55 хв" },
      { time: "18:00", name: "FITNESS", serviceSlug: "fitness", trainer: { uk: "Ірина", en: "Iryna" }, trainerId: "t6", duration: "55 хв" },
      { time: "19:00", name: "PILATES", serviceSlug: "pilates", trainer: { uk: "Ірина", en: "Iryna" }, trainerId: "t6", duration: "55 хв" },
    ],
  },
  {
    id: "sat",
    day: { uk: "Субота", en: "Saturday" },
    classes: [
      { time: "10:00", name: "STRETCHING", serviceSlug: "stretching", trainer: { uk: "Дар'я", en: "Daria" }, trainerId: "t8", duration: "55 хв" },
      { time: "11:00", name: "BODY PUMP", serviceSlug: "body-pump", trainer: { uk: "Уляна", en: "Uliana" }, trainerId: "t3", duration: "55 хв" },
      { time: "12:00", name: "HIIT", serviceSlug: "hiit", trainer: { uk: "Ірина", en: "Iryna" }, trainerId: "t6", duration: "55 хв" },
      { time: "13:00", name: "PILATES", serviceSlug: "pilates", trainer: { uk: "Ірина", en: "Iryna" }, trainerId: "t6", duration: "55 хв" },
    ],
  },
  {
    id: "sun",
    day: { uk: "Неділя", en: "Sunday" },
    classes: [],
  },
];

export function ScheduleSection() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("mon");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const today = new Date().getDay();

    const daysMap: Record<number, string> = {
      0: "sun", 1: "mon", 2: "tue", 3: "wed", 4: "thu", 5: "fri", 6: "sat"
    };

    setActiveTab(daysMap[today]);
  }, []);

  const activeData = SCHEDULE_DATA.find((d) => d.id === activeTab);
  const hasClasses = activeData && activeData.classes.length > 0;

  const texts = {
    eyebrow: { uk: "ГРУПОВІ ТРЕНУВАННЯ", en: "Class Schedule" },
    title: { uk: "Розклад", en: "Training Schedule" },
    note: { uk: "Попередній запис обов'язковий", en: "Pre-registration is mandatory" },
    closedTitle: { uk: "Вихідний день", en: "Day Off" },
    closedDesc: {
      uk: "У цей день зал не працює. Відпочивайте та відновлюйте сили для нових досягнень!",
      en: "The gym is closed today. Rest and recover for your next achievements!"
    }
  };

  return (
    <Section id="schedule" className="relative overflow-hidden py-16 sm:py-20">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[30rem] w-[30rem] rounded-full bg-[var(--smg-primary)] opacity-[0.03] blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-[1000px]">

        {/* ЗАГОЛОВОК */}
        <div className="mb-10 flex flex-col items-start text-left px-4 sm:px-6">
          <MotionReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--smg-primary)]/40 bg-[var(--smg-primary)]/10 px-3 py-1 mb-4 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--smg-primary)] backdrop-blur-md">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--smg-primary)] opacity-75"></span>
                <span className="relative inline-flex size-1.5 rounded-full bg-[var(--smg-primary)] shadow-[0_0_8px_var(--smg-primary)]"></span>
              </span>
              {language === "uk" ? texts.eyebrow.uk : texts.eyebrow.en}
            </div>
          </MotionReveal>

          <MotionReveal delay={0.05}>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white sm:text-4xl lg:text-5xl">
              {language === "uk" ? texts.title.uk : texts.title.en}
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <div className="mt-4 inline-flex items-center gap-2 text-[10px] font-medium text-white/50 bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/10">
              <svg className="size-3.5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {language === "uk" ? texts.note.uk : texts.note.en}
            </div>
          </MotionReveal>
        </div>

        {/* НОВИЙ ДИЗАЙН КНОПОК ДНІВ (Виправлено скрол на мобільних) */}
        <MotionReveal delay={0.15}>
          <div className="relative w-full">
            {/* Контейнер, який дозволяє горизонтальний скрол */}
            <div className="flex w-full overflow-x-auto px-4 sm:px-6 pb-6 pt-2 [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

              {/* Сама панель з кнопками (w-max дозволяє їй бути ширшою за екран, shrink-0 не дає стискатись) */}
              <div className="flex w-max shrink-0 items-center gap-1 rounded-2xl border border-white/5 bg-[#0a0a0f]/80 p-1.5 shadow-lg backdrop-blur-md">
                {SCHEDULE_DATA.map((item) => {
                  const isActive = activeTab === item.id;

                  if (!mounted && isActive) return <div key={item.id} className="opacity-0 px-5 py-2.5" />;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={cn(
                        "outline-none focus:outline-none ring-0 focus:ring-0 active:outline-none [-webkit-tap-highlight-color:transparent] whitespace-nowrap rounded-xl px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] transition-all duration-300",
                        isActive
                          ? "bg-[var(--smg-primary)] text-white shadow-[0_4px_12px_-2px_var(--smg-primary)]"
                          : "bg-transparent text-white/40 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {language === "uk" ? item.day.uk : item.day.en}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </MotionReveal>

        {/* КОНТЕНТ (КАРТКИ АБО ПОВІДОМЛЕННЯ ПРО ВИХІДНИЙ) */}
        <div className="mt-2 px-4 sm:px-6 min-h-[300px]">
          {hasClasses ? (
            <div key={activeTab} className="flex flex-col gap-2">
              {activeData?.classes.map((cls, idx) => (
                <MotionReveal key={idx} delay={0.1 + idx * 0.05} className="w-full">
                  <div className="group relative flex flex-col sm:flex-row sm:items-center justify-between overflow-hidden rounded-3xl border border-white/5 bg-[#0a0a0f]/80 p-4 sm:px-6 sm:py-5 shadow-lg backdrop-blur-md transition-all duration-500 hover:border-[var(--smg-primary)]/30 hover:bg-[#0f0f15] hover:shadow-xl">
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[var(--smg-primary)]/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
                      <div className="flex flex-col">
                        <span className="text-2xl font-black tracking-tighter text-white sm:text-3xl">
                          {cls.time}
                        </span>
                        <span className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-white/30">
                          {language === "uk" ? "55 хв" : "55 min"}
                        </span>
                      </div>

                      <div className="hidden h-10 w-px bg-white/10 sm:block" />

                      <Link href={`/services/${cls.serviceSlug}`} className="group/link flex flex-col items-start w-fit outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-black uppercase tracking-wider text-white transition-colors duration-300 group-hover/link:text-[var(--smg-primary)] sm:text-xl">
                            {cls.name}
                          </h3>
                          <svg className="size-4 text-[var(--smg-primary)] opacity-0 -translate-x-2 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </div>
                        <span className="mt-1 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                          <span className="size-1 rounded-full bg-[var(--smg-primary)] transition-shadow duration-300 group-hover/link:shadow-[0_0_8px_var(--smg-primary)]"></span>
                          {language === "uk" ? "Дізнатись більше" : "Learn More"}
                        </span>
                      </Link>
                    </div>

                    <div className="relative z-10 mt-4 flex items-center sm:mt-0">
                      <Link href={`/trainers?trainer=${cls.trainerId}`} className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] pr-4 pl-1.5 py-1.5 transition-all hover:border-[var(--smg-primary)] hover:bg-[var(--smg-primary)]/10 outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]">
                        <div className="flex size-8 items-center justify-center rounded-full bg-black/50 border border-white/5">
                          <svg className="size-4 text-[var(--smg-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/40">
                            {language === "uk" ? "Тренер" : "Trainer"}
                          </span>
                          <span className="text-xs font-black uppercase tracking-wider text-white">
                            {language === "uk" ? cls.trainer.uk : cls.trainer.en}
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </MotionReveal>
              ))}
            </div>
          ) : (
            <MotionReveal key="empty-state">
              <div className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-[#0a0a0f]/80 p-12 text-center shadow-lg backdrop-blur-md sm:p-20">
                <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-white/[0.03] border border-white/10 text-white/20">
                  <svg className="size-10 text-[var(--smg-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.25V21" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15h7.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5.25v.01" />
                  </svg>
                </div>
                <h3 className="mb-3 text-2xl font-black uppercase tracking-wider text-white">
                  {language === "uk" ? texts.closedTitle.uk : texts.closedTitle.en}
                </h3>
                <p className="max-w-md text-sm font-medium leading-relaxed text-white/50">
                  {language === "uk" ? texts.closedDesc.uk : texts.closedDesc.en}
                </p>
              </div>
            </MotionReveal>
          )}
        </div>

      </div>
    </Section>
  );
}