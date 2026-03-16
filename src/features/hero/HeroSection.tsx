"use client";

import { MotionReveal } from "@/components/motion/MotionReveal";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function HeroSection() {
  const { language } = useLanguage();

  const heroImage = "/images/hero/hero-logo-image.webp";

  // === ЛОГІКА ПРУЖИНИ (SPRING PHYSICS) ===
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const smoothX = useSpring(dragX, { stiffness: 600, damping: 35 });
  const smoothY = useSpring(dragY, { stiffness: 600, damping: 35 });
  // =======================================

  const texts = {
    eyebrow: { uk: "Premium Fitness Club", en: "Premium Fitness Club" },
    servicesBtn: { uk: "Наші Послуги", en: "Our Services" },
    trainersBtn: { uk: "Тренери", en: "Trainers" },
  };

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    if (id === "services") {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      const yOffset = 35;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    (document.activeElement as HTMLElement)?.blur();
  };

  return (
    <section id="hero" className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden">

      {/* BACKGROUND VIDEO & OVERLAYS */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover object-center"
        >
          <source src="/images/hero/backgrounds/background.webm" type="video/webm" />
        </video>

        {/* Легкі градієнти (Зменшено затемнення) */}
        {/* Загальне затемнення стало 20% замість 50% */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Плавний перехід у колір сайту знизу, зверху повністю прозорий */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--smg-bg)] via-[var(--smg-bg)]/20 to-transparent" />

        {/* Легка віньєтка по краях для кінематографічності (30% замість 60%) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center px-4 -mt-6 sm:-mt-10 sm:px-6">

        {/* Eyebrow Badge */}
        <MotionReveal>
          <div className="mb-6 flex justify-center sm:mb-8">
            <div className="flex items-center gap-2 rounded-full border border-[var(--smg-primary)]/30 bg-[var(--smg-primary)]/10 px-4 py-1.5 backdrop-blur-md">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--smg-primary)] opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-full bg-[var(--smg-primary)] shadow-[0_0_8px_var(--smg-primary)]"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white sm:text-xs">
                {language === "uk" ? texts.eyebrow.uk : texts.eyebrow.en}
              </span>
            </div>
          </div>
        </MotionReveal>

        {/* LOGO З ЕФЕКТОМ ПРУЖИНИ */}
        <MotionReveal delay={0.1}>
          <div className="relative flex justify-center w-full">
            {/* Світіння позаду логотипу */}
            <div className="absolute top-1/2 left-1/2 h-[50%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--smg-primary)] opacity-20 blur-[80px] sm:blur-[120px]" />

            {/* Контейнер для перетягування */}
            <div className="relative w-full max-w-[320px] sm:max-w-[480px] lg:max-w-[600px] flex items-center justify-center z-10">
              <motion.div
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.06}
                style={{ x: dragX, y: dragY }}
                whileTap={{ cursor: "grabbing" }}
                className="absolute inset-0 z-50 w-full h-full cursor-grab active:cursor-grabbing"
              />

              <motion.img
                src={heroImage}
                alt="Strong Muscle Gym Logo"
                draggable="false"
                style={{ x: smoothX, y: smoothY }}
                className="relative z-10 h-auto w-full object-contain drop-shadow-2xl pointer-events-none"
              />
            </div>
          </div>
        </MotionReveal>

        {/* Buttons */}
        <MotionReveal delay={0.2}>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row sm:gap-6">

            <Button
              className="relative h-14 min-w-[240px] overflow-hidden rounded-full bg-[var(--smg-primary)] px-8 text-sm font-bold uppercase tracking-widest text-white shadow-[0_0_20px_rgba(255,107,26,0.4)] transition-all hover:scale-105 hover:bg-[var(--smg-primary-soft)] hover:shadow-[0_0_30px_rgba(255,107,26,0.6)] sm:text-base"
              onClick={() => handleScroll("services")}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {language === "uk" ? texts.servicesBtn.uk : texts.servicesBtn.en}
              </span>
            </Button>

            <Button
              variant="secondary"
              className="relative h-14 min-w-[240px] rounded-full border border-white/20 bg-white/5 px-8 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/40 sm:text-base"
              onClick={() => handleScroll("trainers")}
            >
              <span className="flex items-center justify-center gap-2">
                {language === "uk" ? texts.trainersBtn.uk : texts.trainersBtn.en}
              </span>
            </Button>

          </div>
        </MotionReveal>
      </div>

    </section>
  );
}