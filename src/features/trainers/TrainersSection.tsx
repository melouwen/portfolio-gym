"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { Section } from "@/components/ui/Section";
import { useLanguage } from "@/contexts/LanguageContext";
import { CONTENT, pickLang } from "@/content/siteContent";
import { cn } from "@/lib/cn";

export function TrainersSection() {
  const { language } = useLanguage();
  const router = useRouter();

  const originalTrainers = CONTENT.trainers.trainers;

  const [trainersList, setTrainersList] = useState(originalTrainers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [paused, setPaused] = useState(false);

  // Перемішування тренерів при завантаженні
  useEffect(() => {
    const shuffled = [...originalTrainers];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setTrainersList(shuffled);
    setMounted(true);
  }, [originalTrainers]);

  // Автопрокрутка слайдера
  useEffect(() => {
    if (!mounted || paused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trainersList.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [trainersList.length, mounted, paused]);

  const customText = {
    title: { uk: "Команда SMG", en: "SMG Team" },
    description: {
      uk: "Ми маємо команду висококваліфікованих тренерів, які допоможуть вам досягти результатів швидко, безпечно та з максимальною ефективністю.",
      en: "We have a team of highly qualified trainers who help you achieve results quickly, safely, and with maximum efficiency.",
    },
    eyebrow: { uk: "Тренери клубу", en: "Club Coaches" },
    btn: { uk: "Ознайомитись", en: "Meet the team" },
  };

  const getPosition = (index: number) => {
    if (index === currentIndex) return "center";
    if (index === (currentIndex - 1 + trainersList.length) % trainersList.length) return "left";
    if (index === (currentIndex + 1) % trainersList.length) return "right";
    return "hidden";
  };

  // Варіанти анімації з адаптивними відступами
  const variants = {
    center: {
      x: "-50%",
      y: "-50%",
      scale: 1,
      opacity: 1,
      zIndex: 30,
    },
    left: {
      x: "-105%", // Трохи розсунув, щоб краще було видно на мобільному
      y: "-50%",
      scale: 0.85,
      opacity: 0.4,
      zIndex: 10,
    },
    right: {
      x: "5%", // Трохи розсунув
      y: "-50%",
      scale: 0.85,
      opacity: 0.4,
      zIndex: 10,
    },
    hidden: {
      x: "-50%",
      y: "-50%",
      scale: 0.6,
      opacity: 0,
      zIndex: 0,
    },
  };

  return (
    <Section id="trainers" className="py-16 sm:py-24 overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-16 w-full max-w-[1400px] mx-auto">

        {/* ЛІВА ЧАСТИНА (Текст) */}
        <div className="relative z-20 flex w-full lg:w-[45%] flex-col justify-center px-4 sm:px-6 lg:px-0">
          <MotionReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--smg-primary)]/30 bg-[var(--smg-primary)]/10 px-4 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[var(--smg-primary)] backdrop-blur-md w-fit">
              <span className="size-1.5 rounded-full bg-[var(--smg-primary)] shadow-[0_0_8px_var(--smg-primary)]" />
              {pickLang(customText.eyebrow, language)}
            </div>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <h2 className="mt-4 sm:mt-6 text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[1.1]">
              {pickLang(customText.title, language)}
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.14}>
            <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed text-white/60">
              {pickLang(customText.description, language)}
            </p>
          </MotionReveal>

          <MotionReveal delay={0.2}>
            {/* На мобільному пагінація і кнопка стають красиво */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
              <button
                type="button"
                className="group relative flex h-12 sm:h-14 w-full sm:w-auto items-center justify-center overflow-hidden rounded-full bg-[var(--smg-primary)] px-8 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white shadow-[0_0_30px_rgba(255,107,26,0.15)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => router.push("/trainers")}
              >
                <span className="relative z-10">{pickLang(customText.btn, language)}</span>
                <div className="absolute inset-0 z-0 h-full w-full translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
              </button>

              <div className="flex items-center gap-3 w-full justify-between sm:w-auto sm:justify-start px-2 sm:px-0">
                <span className="text-sm sm:text-base font-black tracking-[0.2em] text-white">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>
                <div className="h-px w-12 sm:w-16 bg-white/20" />
                <span className="text-sm sm:text-base font-bold tracking-[0.2em] text-white/40">
                  {String(trainersList.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </MotionReveal>
        </div>

        {/* ПРАВА ЧАСТИНА (Слайдер) */}
        {/* Адаптивна висота контейнера, щоб не вилазило за екран телефону */}
        <MotionReveal delay={0.1} className="relative w-full lg:w-[55%] h-[420px] sm:h-[500px] lg:h-[600px] xl:h-[700px] mt-6 lg:mt-0">
          <div
            className={cn(
              "absolute inset-0 w-full h-full",
              mounted ? "opacity-100" : "opacity-0 transition-opacity duration-1000"
            )}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {trainersList.map((trainer, index) => {
              const position = getPosition(index);
              const isCenter = position === "center";
              const isSide = position === "left" || position === "right";

              return (
                <motion.div
                  key={trainer.id}
                  onClick={() => {
                    if (position === "left") {
                      setCurrentIndex((prev) => (prev - 1 + trainersList.length) % trainersList.length);
                    } else if (position === "right") {
                      setCurrentIndex((prev) => (prev + 1) % trainersList.length);
                    } else if (position === "center") {
                      router.push(`/trainers?trainer=${trainer.id}`);
                    }
                  }}
                  initial={false}
                  animate={variants[position as keyof typeof variants]}
                  whileHover={
                    position === "center"
                      ? { scale: 1.02 }
                      : isSide
                        ? { scale: 0.88, opacity: 0.6 }
                        : {}
                  }
                  transition={{
                    duration: 0.6,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className={cn(
                    // Оптимізовані розміри карток:
                    // Моб: 260x360 (поміщається на екран і видно сусідні)
                    // Планшет: 320x440
                    // Десктоп: 380x520
                    "absolute top-1/2 left-1/2 w-[260px] h-[360px] sm:w-[320px] sm:h-[440px] xl:w-[380px] xl:h-[520px] overflow-hidden rounded-[2rem] bg-[#0a0a0f] shadow-2xl ring-1 ring-white/5",
                    position === "hidden" && "pointer-events-none",
                    position !== "center" && "cursor-pointer"
                  )}
                  style={{ transformOrigin: "center center" }}
                >
                  <motion.img
                    src={trainer.photo}
                    alt={pickLang(trainer.name, language)}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    whileHover={position === "center" ? { scale: 1.05 } : {}}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />

                  {/* Градієнт для читабельності тексту поверх фото */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-[#07070a]/50 to-transparent opacity-90" />

                  <div
                    className={cn(
                      "absolute bottom-0 left-0 right-0 flex flex-col justify-end p-6 sm:p-8 transition-all duration-500",
                      isCenter ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    )}
                  >
                    <p className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white drop-shadow-md">
                      {pickLang(trainer.name, language)}
                    </p>

                    <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[var(--smg-primary)]">
                      {pickLang(trainer.specialization, language)}
                    </p>

                    <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/40"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-white/60">
                        {trainer.experienceYears}{" "}
                        {language === "uk" ? "років" : "years"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </MotionReveal>
      </div>
    </Section>
  );
}