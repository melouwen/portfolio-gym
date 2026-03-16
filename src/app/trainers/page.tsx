"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { CONTENT, pickLang, type Trainer } from "@/content/siteContent";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { cn } from "@/lib/cn";

function SectionDivider() {
  return (
    // Зменшено відступи на мобільному (py-8 замість py-12)
    <div className="relative flex w-full items-center justify-center py-8 sm:py-20">
      <div className="absolute h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute h-[2px] w-32 bg-[var(--smg-primary)] shadow-[0_0_20px_var(--smg-primary)] blur-[1px]" />
    </div>
  );
}

export default function TrainersPage() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const selectedTrainerId = searchParams.get("trainer");

  const c = CONTENT.trainers;
  const originalTrainers = c.trainers;
  const heroPhoto = "/images/trainers/trainers-hero.webp";

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [shuffledReady, setShuffledReady] = useState(false);

  useEffect(() => {
    const shuffled = [...originalTrainers];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setTrainers(shuffled);
    setShuffledReady(true);
  }, [originalTrainers]);

  useEffect(() => {
    if (!shuffledReady || !selectedTrainerId || trainers.length === 0) return;

    const index = trainers.findIndex((trainer) => trainer.id === selectedTrainerId);
    if (index === -1) return;

    const timeout = setTimeout(() => {
      const section = sectionRefs.current[index];
      if (section) {
        const contentWrapper = section.querySelector('.grid');
        if (contentWrapper) {
          const elementTop = contentWrapper.getBoundingClientRect().top + window.scrollY;
          const yOffset = -100;
          window.scrollTo({ top: elementTop + yOffset, behavior: "smooth" });
        }
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [selectedTrainerId, trainers, shuffledReady]);

  const progressPercent = useMemo(() => {
    if (trainers.length <= 1) return 100;
    return ((activeIndex + 1) / trainers.length) * 100;
  }, [activeIndex, trainers.length]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = sectionRefs.current.filter(Boolean) as HTMLElement[];
      if (!sections.length) return;

      const viewportCenter = window.innerHeight * 0.45;
      let closestIndex = 0;
      let closestDistance = Infinity;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const totalProgress = maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0;

      setScrollProgress(totalProgress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [trainers]);

  return (
    <div className="relative flex min-h-dvh flex-col bg-[#07070a] overflow-hidden">

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#07070a]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <Header />

      <div className="pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 2xl:flex">
        <div className="flex items-center gap-5">
          <div className="flex flex-col items-end gap-1">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white drop-shadow-md">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              / {String(trainers.length).padStart(2, "0")}
            </span>
          </div>

          <div className="relative flex h-[360px] w-1 items-center justify-center">
            <div className="absolute h-full w-[2px] rounded-full bg-white/10" />
            <div
              className="absolute bottom-0 w-[2px] rounded-full bg-[var(--smg-primary)] shadow-[0_0_12px_var(--smg-primary)] transition-all duration-500 ease-out"
              style={{ height: `${progressPercent}%` }}
            />
            <div
              className="absolute h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[var(--smg-primary)] bg-zinc-950 transition-all duration-500 ease-out shadow-[0_0_10px_var(--smg-primary)]"
              style={{ bottom: `calc(${progressPercent}% - 6px)`, left: "50%" }}
            />
          </div>
        </div>
      </div>

      <main className="relative z-10 flex-1 pb-0">

        <section className="relative flex min-h-[70vh] sm:min-h-[80vh] items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
            <img
              src={heroPhoto}
              alt={language === "uk" ? "Команда тренерів" : "Coaches team"}
              className="h-full w-full object-cover object-center opacity-50 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#07070a]/80 via-[#07070a]/60 to-[#07070a]" />
          </div>

          <div className="relative z-10 w-full max-w-[1400px] px-4 text-center sm:px-6 lg:px-12">
            <MotionReveal>
              <div className="mx-auto mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--smg-primary)]/30 bg-[var(--smg-primary)]/10 px-4 py-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--smg-primary)] backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-[var(--smg-primary)] shadow-[0_0_8px_var(--smg-primary)]" />
                {language === "uk" ? "Експерти своєї справи" : "Experts in their field"}
              </div>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <h1 className="text-4xl sm:text-6xl lg:text-[7.5rem] font-black uppercase tracking-tighter text-white lg:leading-[0.9]">
                {language === "uk" ? "Наша" : "Our"} <br />
                <span className="bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent drop-shadow-lg">
                  {language === "uk" ? "Команда" : "Team"}
                </span>
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <p className="mx-auto mt-6 sm:mt-8 max-w-2xl text-sm sm:text-lg lg:text-xl leading-relaxed text-white/60 drop-shadow-md">
                {pickLang(c.subtitle, language)}
              </p>
            </MotionReveal>
          </div>
        </section>

        <div className="relative z-10 pb-20 sm:pb-24">
          {trainers.map((trainer, index) => {
            const isEven = index % 2 === 0;

            return (
              <section
                key={trainer.id}
                ref={(el) => { sectionRefs.current[index] = el; }}
                className="relative mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6 lg:px-12 lg:pt-24"
              >
                {index !== 0 && <SectionDivider />}

                {/* Зменшено відступи між колонками на моб. (gap-8) */}
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-20">

                  <div className={cn("relative w-full", isEven ? "lg:order-2" : "lg:order-1")}>
                    <MotionReveal delay={0.1}>
                      {/* ГОЛОВНИЙ ФІКС: aspect-square на мобільних, щоб фото не було на весь екран */}
                      <div className="group relative aspect-square sm:aspect-[4/5] lg:aspect-[3/4] w-full overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] bg-zinc-900 shadow-2xl ring-1 ring-white/10">
                        <img
                          src={trainer.photo}
                          alt={pickLang(trainer.name, language)}
                          className="h-full w-full object-cover object-top transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-80" />

                        {/* Зменшено плашку на мобільному */}
                        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between rounded-2xl sm:rounded-3xl border border-white/10 bg-black/40 p-4 sm:p-5 backdrop-blur-md">
                          <div className="flex flex-col">
                            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                              {language === "uk" ? "Досвід роботи" : "Experience"}
                            </span>
                            <span className="text-lg sm:text-xl font-black text-white">
                              {trainer.experienceYears} {language === "uk" ? "років" : "years"}
                            </span>
                          </div>
                          <div className="flex size-10 sm:size-12 items-center justify-center rounded-full bg-[var(--smg-primary)] text-white shadow-[0_0_15px_rgba(255,107,26,0.3)]">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          </div>
                        </div>
                      </div>
                    </MotionReveal>
                  </div>

                  <div className={cn("flex flex-col justify-center", isEven ? "lg:order-1" : "lg:order-2")}>
                    <MotionReveal delay={0.15}>
                      <div className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                        {pickLang(trainer.specialization, language)}
                      </div>

                      {/* Зменшено шрифт для моб (text-4xl) */}
                      <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tighter text-white drop-shadow-lg leading-tight">
                        {pickLang(trainer.name, language)}
                      </h2>
                    </MotionReveal>

                    <MotionReveal delay={0.2}>
                      <div className="relative mt-6 sm:mt-10 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-5 sm:p-8 backdrop-blur-sm">
                        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[var(--smg-primary)] to-[var(--smg-primary)]/10" />

                        <svg className="mb-3 sm:mb-4 h-6 w-6 sm:h-8 sm:w-8 text-[var(--smg-primary)] drop-shadow-[0_0_8px_rgba(255,107,26,0.4)]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>

                        <p className="text-base sm:text-lg lg:text-xl italic leading-relaxed text-white/80 font-medium">
                          "{pickLang(trainer.approach, language)}"
                        </p>
                      </div>
                    </MotionReveal>

                    <MotionReveal delay={0.25}>
                      {trainer.pricing && (
                        <div className="mt-6 sm:mt-8 rounded-[1.5rem] sm:rounded-[2rem] border border-white/5 bg-white/[0.02] p-5 sm:p-8 backdrop-blur-sm">
                          <p className="mb-4 sm:mb-6 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                            {language === "uk" ? "Вартість тренувань" : "Training cost"}
                          </p>

                          <div className="grid gap-3 sm:grid-cols-2">
                            <div className="flex flex-col justify-center rounded-2xl border border-white/5 bg-zinc-900/50 p-4 sm:p-5 transition-colors hover:bg-zinc-800/50">
                              <span className="mb-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">
                                {language === "uk" ? "Разове заняття" : "Single session"}
                              </span>
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-xl sm:text-2xl font-black text-white">{trainer.pricing.singleSession}</span>
                                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/40">{language === "uk" ? "грн" : "UAH"}</span>
                              </div>
                            </div>

                            <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl border border-[var(--smg-primary)]/30 bg-[var(--smg-primary)]/10 p-4 sm:p-5 transition-transform hover:-translate-y-1">
                              <div className="absolute -right-6 -top-6 h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-[var(--smg-primary)]/20 blur-xl" />
                              <span className="relative z-10 mb-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--smg-primary)] drop-shadow-md">
                                {language === "uk" ? "Пакет 10 занять" : "10 sessions pack"}
                              </span>
                              <div className="relative z-10 flex items-baseline gap-1.5">
                                <span className="text-xl sm:text-2xl font-black text-white">{trainer.pricing.pack10}</span>
                                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/40">{language === "uk" ? "грн" : "UAH"}</span>
                              </div>
                            </div>
                          </div>

                          {trainer.pricing.note && (
                            <p className="mt-4 sm:mt-5 text-center text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.15em] text-white/30">
                              * {pickLang(trainer.pricing.note, language)}
                            </p>
                          )}
                        </div>
                      )}
                    </MotionReveal>

                    <MotionReveal delay={0.3}>
                      {(trainer.socials?.instagram || trainer.socials?.youtube || trainer.socials?.tiktok) && (
                        <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2 sm:gap-3">
                          <span className="mr-1 sm:mr-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                            {language === "uk" ? "Соцмережі:" : "Socials:"}
                          </span>
                          {Object.entries(trainer.socials).map(([platform, link]) => (
                            link && (
                              <a
                                key={platform}
                                href={link}
                                target="_blank"
                                rel="noreferrer"
                                className="flex h-8 sm:h-10 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 sm:px-6 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:border-[var(--smg-primary)]/50 hover:bg-[var(--smg-primary)]/10 hover:text-[var(--smg-primary)]"
                              >
                                {platform}
                              </a>
                            )
                          ))}
                        </div>
                      )}
                    </MotionReveal>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <section className="relative mt-12 flex min-h-[50vh] sm:min-h-[60vh] flex-col items-center justify-center overflow-hidden border-t border-white/5 bg-[#07070a] py-16 sm:py-32">

          <div className="absolute top-1/2 left-1/2 h-[300px] w-[600px] sm:h-[400px] sm:w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--smg-primary)]/15 blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,107,26,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,107,26,0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-[1400px] px-4 text-center sm:px-6 lg:px-12 flex flex-col items-center">
            <MotionReveal>
              <h2 className="flex flex-col items-center justify-center text-center text-4xl sm:text-6xl lg:text-[8.5rem] font-black uppercase tracking-tighter lg:leading-[0.9]">
                <span className="block text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.4)] sm:[-webkit-text-stroke:2px_rgba(255,255,255,0.4)] transition-all duration-500 hover:[-webkit-text-stroke:1px_var(--smg-primary)] sm:hover:[-webkit-text-stroke:2px_var(--smg-primary)]">
                  {language === "uk" ? "ТВІЙ РЕЗУЛЬТАТ" : "YOUR RESULT"}
                </span>

                <span className="my-2 block h-1.5 sm:h-2 w-20 sm:w-32 rounded-full bg-gradient-to-r from-transparent via-[var(--smg-primary)] to-transparent opacity-50 lg:my-6" />

                <span className="block bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] sm:drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                  {language === "uk" ? "НАША ПЕРЕМОГА" : "OUR VICTORY"}
                </span>
              </h2>
            </MotionReveal>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}