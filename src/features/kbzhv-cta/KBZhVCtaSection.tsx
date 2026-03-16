"use client";

import { useRouter } from "next/navigation";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { Section } from "@/components/ui/Section";
import { useLanguage } from "@/contexts/LanguageContext";
import { CONTENT, pickLang } from "@/content/siteContent";

export function KBZhVCtaSection() {
  const { language } = useLanguage();
  const router = useRouter();
  const c = CONTENT.kbzhvCta;

  return (
    <Section id="kbzhv">
      {/* Головний контейнер (зменшено радіус скруглення для компактності) */}
      <div className="group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-[#0a0a0f] to-[#050507] border border-white/5 shadow-2xl">

        {/* Декоративне фонове світіння */}
        <div className="absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-[var(--smg-primary)] opacity-5 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-cyan-500 opacity-5 blur-[100px] pointer-events-none" />

        {/* Зменшено відступи (py-10, gap-8) */}
        <div className="relative grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1fr,1.1fr] lg:items-center lg:gap-12 lg:px-12 lg:py-14">

          {/* === ЛІВА ЧАСТИНА: Текст та Кнопка === */}
          <div className="flex flex-col z-10">
            <MotionReveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 mb-5 text-[9px] font-black uppercase tracking-[0.2em] text-white/70 backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-[var(--smg-primary)] shadow-[0_0_8px_var(--smg-primary)] animate-pulse"></span>
                SMG Smart Tools
              </div>
            </MotionReveal>

            <MotionReveal delay={0.05}>
              {/* Зменшено заголовок */}
              <h2 className="text-3xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 sm:text-4xl lg:text-5xl lg:leading-[1.05]">
                {pickLang(c.title, language)}
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              {/* Зменшено текст опису */}
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/60 font-light">
                {language === "uk"
                  ? "Отримай персональний розрахунок калорій, макросів (БЖВ), індексу маси тіла та норми води у нашому розумному калькуляторі. Точність для твого результату."
                  : "Get a personalized calculation of calories, macros, BMI, and water intake in our smart dashboard. Precision for your results."}
              </p>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              {/* Зменшено кнопку (h-12) */}
              <button
                onClick={() => router.push("/kbzhv")}
                className="group/btn relative mt-8 flex h-12 w-full sm:w-fit items-center justify-center overflow-hidden rounded-full bg-[var(--smg-primary)] px-8 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_-10px_var(--smg-primary)] active:scale-95 outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]"
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-full" />
                <span className="relative z-10">
                  {pickLang(c.cta, language) || (language === "uk" ? "Відкрити калькулятор" : "Open Dashboard")}
                </span>
              </button>
            </MotionReveal>
          </div>


          {/* === ПРАВА ЧАСТИНА: Bento Віджети === */}
          <div className="relative w-full z-10">
            <MotionReveal delay={0.2} className="relative">

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

                {/* 1. Головний віджет: Калорії */}
                <div className="col-span-2 sm:col-span-3 flex flex-col sm:flex-row sm:items-end justify-between gap-4 rounded-[1.5rem] border border-white/5 bg-white/[0.02] p-5 backdrop-blur-xl shadow-xl transition-transform duration-500 hover:-translate-y-1">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <svg className="size-3.5 text-[var(--smg-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                      </svg>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-white/50">
                        {language === "uk" ? "Добова норма" : "Daily Target"}
                      </p>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      {/* Зменшено шрифт калорій */}
                      <span className="text-4xl font-black tracking-tighter text-white sm:text-5xl">2,250</span>
                      <span className="text-xs font-bold text-[var(--smg-primary)] uppercase">kcal</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-start sm:items-end">
                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/40 mb-1">
                      {language === "uk" ? "Прогноз" : "Forecast"}
                    </p>
                    <p className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-lg border border-emerald-400/20">
                      <span className="size-1 rounded-full bg-emerald-400 animate-pulse"></span>
                      {language === "uk" ? "-0.5 кг / тиждень" : "-0.5 kg / week"}
                    </p>
                  </div>
                </div>

                {/* 2. Віджет Білки */}
                {/* Зменшено падінги (p-3.5) */}
                <div className="group/card flex flex-col rounded-2xl border border-white/5 bg-[#0a0a0f] p-3.5 shadow-lg transition-all duration-300 hover:border-[var(--smg-primary)]/50 hover:bg-white/[0.03]">
                  <p className="text-[9px] uppercase tracking-widest text-white/40 group-hover/card:text-[var(--smg-primary)] transition-colors">{language === "uk" ? "Білки" : "Protein"}</p>
                  <p className="mt-1.5 text-xl font-black text-white">160<span className="text-[10px] text-white/30 ml-1">g</span></p>
                  <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-white/5">
                    <div className="h-full w-[35%] bg-[var(--smg-primary)] shadow-[0_0_8px_var(--smg-primary)]" />
                  </div>
                </div>

                {/* 3. Віджет Жири */}
                <div className="group/card flex flex-col rounded-2xl border border-white/5 bg-[#0a0a0f] p-3.5 shadow-lg transition-all duration-300 hover:border-yellow-500/50 hover:bg-white/[0.03]">
                  <p className="text-[9px] uppercase tracking-widest text-white/40 group-hover/card:text-yellow-500 transition-colors">{language === "uk" ? "Жири" : "Fats"}</p>
                  <p className="mt-1.5 text-xl font-black text-white">65<span className="text-[10px] text-white/30 ml-1">g</span></p>
                  <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-white/5">
                    <div className="h-full w-[25%] bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
                  </div>
                </div>

                {/* 4. Віджет Вуглеводи */}
                <div className="col-span-2 sm:col-span-1 group/card flex flex-col justify-center rounded-2xl border border-white/5 bg-[#0a0a0f] p-3.5 shadow-lg transition-all duration-300 hover:border-cyan-500/50 hover:bg-white/[0.03]">
                  <div className="flex sm:flex-col justify-between sm:justify-start items-center sm:items-start gap-2">
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-white/40 group-hover/card:text-cyan-500 transition-colors">{language === "uk" ? "Вугл." : "Carbs"}</p>
                      <p className="mt-1 sm:mt-1.5 text-xl font-black text-white">255<span className="text-[10px] text-white/30 ml-1">g</span></p>
                    </div>
                    <div className="w-1/2 sm:w-full sm:mt-2.5 h-1 overflow-hidden rounded-full bg-white/5">
                      <div className="h-full w-[40%] bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Плаваюча плашка (Вода) - також зменшена */}
              <div className="absolute -bottom-4 right-4 sm:-bottom-5 sm:-right-5 flex items-center gap-2.5 rounded-xl border border-white/10 bg-black/80 px-3.5 py-2.5 backdrop-blur-xl shadow-[0_15px_30px_-10px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:scale-105">
                <div className="flex size-7 items-center justify-center rounded-full bg-blue-500/20">
                  <svg className="size-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/50">{language === "uk" ? "Норма води" : "Water Intake"}</p>
                  <p className="text-xs font-black text-white">2.5 <span className="text-[9px] text-white/50">L/day</span></p>
                </div>
              </div>

            </MotionReveal>
          </div>

        </div>
      </div>
    </Section>
  );
}