"use client";

import { useMemo, useEffect, useState } from "react";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { Section } from "@/components/ui/Section";
import { useLanguage } from "@/contexts/LanguageContext";
import { CONTENT, pickLang } from "@/content/siteContent";
import { cn } from "@/lib/cn";

function parseTimeToMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function getUtcPlus2Date() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 2 * 60 * 60 * 1000);
}

function isDayOff(open: string, close: string) {
  return open === "00:00" && close === "00:00";
}

function isOpenNow(dayIndex: number, open: string, close: string, now = new Date()) {
  if (isDayOff(open, close)) return false;

  const today = now.getDay();
  if (today !== dayIndex) return false;

  const minutes = now.getHours() * 60 + now.getMinutes();
  const o = parseTimeToMinutes(open);
  const c = parseTimeToMinutes(close);

  return minutes >= o && minutes < c;
}

export function WorkingHoursSection() {
  const { language } = useLanguage();
  const c = CONTENT.hours;

  const [now, setNow] = useState(getUtcPlus2Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setNow(getUtcPlus2Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  const today = now.getDay();

  const openNow = useMemo(
    () => c.schedule.some((d) => isOpenNow(d.day, d.open, d.close, now)),
    [c.schedule, now]
  );

  return (
    <Section id="working-hours">
      {/* Зменшено gap між колонками */}
      <div className="grid w-full gap-6 lg:grid-cols-[1fr,1.1fr] xl:grid-cols-[0.9fr,1.1fr] lg:items-center lg:gap-10">

        {/* ЛІВА КОЛОНКА: Текст, Статус та Кнопки */}
        <div className="flex flex-col justify-center">
          <MotionReveal>
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--smg-primary)] opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--smg-primary)]"></span>
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[var(--smg-primary)]">
                {language === "uk" ? "Режим роботи" : "Operating Hours"}
              </span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.05}>
            {/* Зменшено розмір заголовка */}
            <h2 className="mt-3 text-3xl font-black uppercase tracking-tighter text-foreground sm:text-4xl lg:text-5xl lg:leading-[1.05]">
              {pickLang(c.title, language)}
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            {/* Зменшено розмір тексту опису */}
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-white/60 sm:text-sm font-light">
              {pickLang(c.subtitle, language)}
            </p>
          </MotionReveal>

          {/* Картки поточного статусу */}
          <MotionReveal delay={0.15}>
            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {/* Зменшено падінги (p-3.5) */}
              <div className="relative overflow-hidden rounded-[1.25rem] bg-white/[0.02] border border-white/5 p-3.5 backdrop-blur-md transition-all">
                <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-[var(--smg-primary)]/10 blur-xl" />
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                  {language === "uk" ? "Статус клубу" : "Club Status"}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <div
                    className={cn(
                      "flex h-2 w-2 items-center justify-center rounded-full shadow-[0_0_12px_rgba(0,0,0,0.5)]",
                      openNow ? "bg-emerald-500 shadow-emerald-500/50" : "bg-rose-500 shadow-rose-500/50"
                    )}
                  />
                  <p
                    className={cn(
                      "text-base font-bold tracking-tight",
                      openNow ? "text-emerald-400" : "text-rose-400"
                    )}
                  >
                    {openNow ? pickLang(c.statusOpen, language) : pickLang(c.statusClosed, language)}
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[1.25rem] bg-white/[0.02] border border-white/5 p-3.5 backdrop-blur-md">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                  {language === "uk" ? "Місцевий час" : "Local Time"}
                </p>
                {/* Зменшено шрифт годинника */}
                <p className="mt-1.5 font-mono text-xl font-medium tracking-tight text-white sm:text-2xl">
                  {mounted
                    ? now.toLocaleTimeString(language === "uk" ? "uk-UA" : "en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "--:--"}
                </p>
              </div>
            </div>
          </MotionReveal>

          {/* Кнопки - зменшено висоту до h-11 */}
          <MotionReveal delay={0.2}>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <button
                className="flex h-11 min-w-[160px] items-center justify-center rounded-full bg-gradient-to-r from-[var(--smg-primary)] to-[#ff8a3d] px-6 text-[10px] font-black uppercase tracking-widest text-white shadow-[0_10px_20px_-5px_rgba(255,107,26,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_15px_30px_-5px_rgba(255,107,26,0.4)] active:scale-[0.98] outline-none [-webkit-tap-highlight-color:transparent]"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                {pickLang(c.ctaPrimary, language)}
              </button>

              <button
                className="flex h-11 min-w-[160px] items-center justify-center rounded-full border border-white/10 bg-transparent px-6 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-white/[0.05] active:scale-[0.98] outline-none [-webkit-tap-highlight-color:transparent]"
                onClick={() => window.open(`tel:${c.phone}`)}
              >
                {pickLang(c.ctaSecondary, language)}
              </button>
            </div>
          </MotionReveal>
        </div>

        {/* ПРАВА КОЛОНКА: Графік (Компактний) */}
        <MotionReveal delay={0.1}>
          {/* Зменшено падінги та скруглення: p-5 sm:p-6, rounded-[1.5rem] */}
          <div className="relative w-full rounded-[1.5rem] bg-[#0A0A0E] border border-white/10 p-5 shadow-2xl sm:p-6">
            <div className="absolute inset-0 overflow-hidden rounded-[1.5rem]">
              <div className="absolute -top-[20%] right-[10%] h-[50%] w-[50%] rounded-full bg-[var(--smg-primary)]/10 blur-[80px]" />
              <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <div className="relative z-10">
              <div className="mb-3 flex items-end justify-between">
                <h3 className="text-lg font-bold text-white">
                  {language === "uk" ? "Тижневий розклад" : "Weekly Schedule"}
                </h3>
                <span className="hidden text-[9px] font-medium uppercase tracking-widest text-white/30 sm:block">
                  {language === "uk" ? "Дні тижня" : "Weekdays"}
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                {c.schedule.map((d, idx) => {
                  const isToday = d.day === today;
                  const dayOff = isDayOff(d.open, d.close);

                  return (
                    <MotionReveal key={d.day} delay={0.15 + idx * 0.03}>
                      {/* Зменшено вертикальні відступи рядків: py-2 замість py-2.5 */}
                      <div
                        className={cn(
                          "group relative flex items-center justify-between rounded-xl px-3 py-2 transition-all duration-300",
                          isToday
                            ? "bg-[var(--smg-primary)]/10 border border-[var(--smg-primary)]/30 shadow-[inset_0_0_20px_rgba(255,107,26,0.05)]"
                            : "hover:bg-white/[0.03] hover:pl-4 border border-transparent"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          {/* Зменшено розмір тексту днів */}
                          <p
                            className={cn(
                              "text-xs sm:text-[13px] tracking-wide transition-colors",
                              isToday ? "font-bold text-white" : "font-medium text-white/60 group-hover:text-white/90"
                            )}
                          >
                            {language === "uk" ? d.uk : d.en}
                          </p>

                          {isToday && (
                            <span className="rounded bg-[var(--smg-primary)] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white">
                              {language === "uk" ? "Сьогодні" : "Today"}
                            </span>
                          )}
                        </div>

                        <div
                          className={cn(
                            "mx-3 hidden h-px flex-1 border-b border-dashed sm:block transition-colors",
                            isToday ? "border-[var(--smg-primary)]/30" : "border-white/5 group-hover:border-white/10"
                          )}
                        />

                        <div className="text-right">
                          {dayOff ? (
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                              {language === "uk" ? "Вихідний" : "Closed"}
                            </span>
                          ) : (
                            <div className={cn(
                              "flex items-center font-mono text-xs sm:text-[13px] transition-colors",
                              isToday ? "font-semibold text-[var(--smg-primary)]" : "text-white/60 group-hover:text-white"
                            )}>
                              <span>{d.open}</span>
                              <span className="mx-1.5 text-white/20">-</span>
                              <span>{d.close}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </MotionReveal>
                  );
                })}
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </Section>
  );
}