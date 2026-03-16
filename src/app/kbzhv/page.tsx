"use client";

import { useMemo, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/cn";

type Gender = "male" | "female";
type Goal = "lose" | "maintain" | "gain";
type Activity = 1.2 | 1.375 | 1.55 | 1.725 | 1.9;

export default function KBZhVPage() {
  const { language } = useLanguage();

  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(75);
  const [height, setHeight] = useState(178);
  const [activity, setActivity] = useState<Activity>(1.55);
  const [goal, setGoal] = useState<Goal>("lose");

  const result = useMemo(() => {
    // 1. Basal Metabolic Rate (Mifflin-St Jeor)
    const bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    // 2. Total Daily Energy Expenditure (TDEE)
    const tdee = bmr * activity;

    // 3. Target Calories based on Goal
    let calories = tdee;
    let expectedProgress = "";

    if (goal === "lose") {
      calories -= 500; // 500 kcal deficit ~0.5kg per week
      expectedProgress = language === "uk" ? "-0.5 кг / тиждень" : "-0.5 kg / week";
    } else if (goal === "gain") {
      calories += 300; // surplus for muscle
      expectedProgress = language === "uk" ? "+0.3 кг / тиждень" : "+0.3 kg / week";
    } else {
      expectedProgress = language === "uk" ? "Підтримка ваги" : "Weight maintenance";
    }

    calories = Math.max(1200, Math.round(calories));

    // 4. Macros
    let protein = 0, fat = 0, carbs = 0;

    if (goal === "lose") {
      protein = weight * 2.2;
      fat = weight * 0.8;
    } else if (goal === "gain") {
      protein = weight * 2.0;
      fat = weight * 1.0;
    } else {
      protein = weight * 1.8;
      fat = weight * 0.9;
    }

    const proteinKcal = protein * 4;
    const fatKcal = fat * 9;
    const carbsKcal = calories - proteinKcal - fatKcal;
    carbs = carbsKcal / 4;

    const p = Math.round(protein);
    const f = Math.round(fat);
    const c = Math.max(0, Math.round(carbs));

    // Percentages for visual bar
    const totalMacros = p + f + c;
    const pPct = Math.round((p / totalMacros) * 100);
    const fPct = Math.round((f / totalMacros) * 100);
    const cPct = Math.round((c / totalMacros) * 100);

    // 5. BMI (Індекс маси тіла)
    const bmiValue = weight / Math.pow(height / 100, 2);
    let bmiCategory = "";
    let bmiColor = "";
    if (bmiValue < 18.5) { bmiCategory = language === "uk" ? "Недостатня вага" : "Underweight"; bmiColor = "text-blue-400"; }
    else if (bmiValue < 25) { bmiCategory = language === "uk" ? "Норма" : "Normal"; bmiColor = "text-emerald-400"; }
    else if (bmiValue < 30) { bmiCategory = language === "uk" ? "Надмірна вага" : "Overweight"; bmiColor = "text-yellow-400"; }
    else { bmiCategory = language === "uk" ? "Ожиріння" : "Obese"; bmiColor = "text-rose-500"; }

    // 6. Water Intake (Норма води)
    const water = Math.round(weight * 35 / 100) / 10; // in Liters

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      calories,
      protein: p, fat: f, carbs: c,
      pPct, fPct, cPct,
      expectedProgress,
      bmi: bmiValue.toFixed(1),
      bmiCategory,
      bmiColor,
      water
    };
  }, [gender, age, weight, height, activity, goal, language]);

  const t = {
    uk: {
      title: "Nutrition Dashboard",
      subtitle: "Професійний розрахунок калорій, макросів, індексу маси тіла та норми води під твою ціль.",
      inputs: "Твої дані",
      results: "Аналітика та план",
      gender: "Стать", male: "Чоловік", female: "Жінка",
      age: "Вік (років)", weight: "Вага (кг)", height: "Зріст (см)",
      activity: "Рівень активності", goal: "Твоя мета",
      lose: "Схуднення", maintain: "Підтримка", gain: "Набір маси",
      low: "Сидячий (офіс)", medium: "Середній (1-3 трен.)", high: "Високий (4-5 трен.)", athlete: "Атлет (кожен день)",
      calories: "Добова норма калорій", expected: "Прогноз",
      protein: "Білки", fat: "Жири", carbs: "Вуглеводи",
      waterTitle: "Норма води", waterDesc: "Літрів на день",
      bmiTitle: "Індекс маси (ІМТ)", bmiDesc: "Категорія тіла",
      bmrTitle: "Базовий метаболізм (BMR)", bmrDesc: "Калорій у стані спокою",
      tdeeTitle: "Добова витрата (TDEE)", tdeeDesc: "Калорій з урахуванням активності",
      note: "*Розрахунок базується на формулі Міффліна-Сан Жеора. Для ідеальної точності проконсультуйтесь із тренером SMG."
    },
    en: {
      title: "Nutrition Dashboard",
      subtitle: "Professional calculation of calories, macros, BMI, and water intake for your specific goal.",
      inputs: "Your Data",
      results: "Analytics & Plan",
      gender: "Gender", male: "Male", female: "Female",
      age: "Age (years)", weight: "Weight (kg)", height: "Height (cm)",
      activity: "Activity Level", goal: "Your Goal",
      lose: "Fat Loss", maintain: "Maintain", gain: "Muscle Gain",
      low: "Sedentary (office)", medium: "Light (1-3 workouts)", high: "Active (4-5 workouts)", athlete: "Athlete (daily)",
      calories: "Daily Calorie Target", expected: "Forecast",
      protein: "Protein", fat: "Fats", carbs: "Carbs",
      waterTitle: "Water Intake", waterDesc: "Liters per day",
      bmiTitle: "Body Mass Index (BMI)", bmiDesc: "Body Category",
      bmrTitle: "Basal Metabolic Rate (BMR)", bmrDesc: "Resting calories",
      tdeeTitle: "Total Energy (TDEE)", tdeeDesc: "Calories burned with activity",
      note: "*Calculation based on Mifflin-St Jeor equation. For a perfect plan, consult an SMG coach."
    },
  }[language];

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden">
      {/* Локальний фон видалено. Працює глобальний з layout.tsx */}
      <Header />

      <main className="relative z-10 flex-1 px-4 pb-20 pt-28 sm:px-6 lg:px-12 lg:pt-36">
        <div className="mx-auto max-w-[1600px]">

          <div className="mb-12 text-center md:text-left">
            <MotionReveal>
              <span className="inline-flex rounded-full bg-white/[0.05] border border-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--smg-primary)]">
                SMG Smart Tools
              </span>
            </MotionReveal>
            <MotionReveal delay={0.05}>
              <h1 className="mt-6 text-4xl font-black uppercase tracking-tighter text-white sm:text-6xl lg:text-[5rem]">
                {t.title}
              </h1>
            </MotionReveal>
            <MotionReveal delay={0.1}>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60 sm:text-xl font-light">
                {t.subtitle}
              </p>
            </MotionReveal>
          </div>

          <div className="grid gap-8 lg:grid-cols-[400px_1fr] xl:grid-cols-[450px_1fr] lg:gap-12">

            {/* LEFT: INPUTS (Control Panel) */}
            <MotionReveal delay={0.15}>
              <div className="rounded-[2rem] border border-white/10 bg-[#0a0a0f]/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                <h2 className="mb-8 flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white/50">
                  <div className="h-1 w-4 bg-[var(--smg-primary)] rounded-full" />
                  {t.inputs}
                </h2>

                <div className="grid gap-6">
                  {/* Gender */}
                  <div>
                    <label className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{t.gender}</label>
                    <div className="grid grid-cols-2 gap-3">
                      {(["male", "female"] as Gender[]).map((g) => (
                        <button
                          key={g}
                          onClick={() => setGender(g)}
                          className={cn(
                            "rounded-xl py-4 text-sm font-bold uppercase tracking-wider transition-all",
                            gender === g ? "bg-[var(--smg-primary)] text-white shadow-[0_0_20px_rgba(255,107,26,0.3)]" : "bg-white/[0.03] text-white/50 hover:bg-white/[0.08]"
                          )}
                        >
                          {t[g]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: t.age, val: age, setter: setAge },
                      { label: t.weight, val: weight, setter: setWeight },
                      { label: t.height, val: height, setter: setHeight },
                    ].map((item, idx) => (
                      <div key={idx}>
                        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 truncate">{item.label}</label>
                        <input
                          type="number"
                          value={item.val}
                          onChange={(e) => item.setter(Number(e.target.value))}
                          className="h-14 w-full rounded-xl border border-white/10 bg-black/50 px-2 text-center text-lg font-bold text-white outline-none transition focus:border-[var(--smg-primary)] focus:bg-white/[0.02]"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Goal */}
                  <div>
                    <label className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{t.goal}</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["lose", "maintain", "gain"] as Goal[]).map((g) => (
                        <button
                          key={g}
                          onClick={() => setGoal(g)}
                          className={cn(
                            "rounded-xl py-3 text-xs font-bold uppercase tracking-wider transition-all",
                            goal === g ? "bg-white text-black shadow-lg" : "bg-white/[0.03] text-white/50 hover:bg-white/[0.08]"
                          )}
                        >
                          {t[g]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Activity */}
                  <div>
                    <label className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{t.activity}</label>
                    <div className="grid gap-2">
                      {[
                        { value: 1.2, label: t.low },
                        { value: 1.375, label: t.medium },
                        { value: 1.55, label: t.high },
                        { value: 1.725, label: t.athlete },
                      ].map((item) => (
                        <button
                          key={item.value}
                          onClick={() => setActivity(item.value as Activity)}
                          className={cn(
                            "w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all flex justify-between items-center",
                            activity === item.value ? "border border-[var(--smg-primary)] bg-[var(--smg-primary)]/10 text-[var(--smg-primary)]" : "border border-transparent bg-white/[0.03] text-white/50 hover:bg-white/[0.06]"
                          )}
                        >
                          <span>{item.label}</span>
                          {activity === item.value && <div className="h-2 w-2 rounded-full bg-[var(--smg-primary)] shadow-[0_0_10px_var(--smg-primary)]" />}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </MotionReveal>

            {/* RIGHT: DASHBOARD (Results) */}
            <div className="flex flex-col gap-6">

              {/* TOP ROW: Calories & Macros */}
              <MotionReveal delay={0.2}>
                <div className="rounded-[2rem] border border-white/10 bg-[#0a0a0f]/80 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-white/10 pb-8">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-widest text-[var(--smg-primary)] mb-2">{t.calories}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-6xl sm:text-[5.5rem] font-black tracking-tighter text-white leading-none">{result.calories}</span>
                        <span className="text-xl font-bold text-white/30 uppercase">kcal</span>
                      </div>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-1">{t.expected}</p>
                      <p className="text-lg font-bold text-emerald-400 bg-emerald-400/10 px-4 py-2 rounded-lg inline-block border border-emerald-400/20">
                        {result.expectedProgress}
                      </p>
                    </div>
                  </div>

                  {/* Macros Visual Bar */}
                  <div className="mb-6 h-4 w-full flex rounded-full overflow-hidden bg-white/5 gap-1">
                    <div style={{ width: `${result.pPct}%` }} className="bg-[var(--smg-primary)] transition-all duration-1000" title="Protein" />
                    <div style={{ width: `${result.fPct}%` }} className="bg-yellow-500 transition-all duration-1000" title="Fat" />
                    <div style={{ width: `${result.cPct}%` }} className="bg-cyan-500 transition-all duration-1000" title="Carbs" />
                  </div>

                  {/* Macros Detailed Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-2xl bg-white/[0.02] p-4 border border-white/5 border-t-[var(--smg-primary)] border-t-2">
                      <p className="text-xs uppercase tracking-widest text-white/50">{t.protein}</p>
                      <p className="mt-2 text-3xl font-black text-white">{result.protein}<span className="text-lg text-white/30">g</span></p>
                      <p className="mt-1 text-xs font-bold text-[var(--smg-primary)]">{result.pPct}%</p>
                    </div>
                    <div className="rounded-2xl bg-white/[0.02] p-4 border border-white/5 border-t-yellow-500 border-t-2">
                      <p className="text-xs uppercase tracking-widest text-white/50">{t.fat}</p>
                      <p className="mt-2 text-3xl font-black text-white">{result.fat}<span className="text-lg text-white/30">g</span></p>
                      <p className="mt-1 text-xs font-bold text-yellow-500">{result.fPct}%</p>
                    </div>
                    <div className="rounded-2xl bg-white/[0.02] p-4 border border-white/5 border-t-cyan-500 border-t-2">
                      <p className="text-xs uppercase tracking-widest text-white/50">{t.carbs}</p>
                      <p className="mt-2 text-3xl font-black text-white">{result.carbs}<span className="text-lg text-white/30">g</span></p>
                      <p className="mt-1 text-xs font-bold text-cyan-500">{result.cPct}%</p>
                    </div>
                  </div>
                </div>
              </MotionReveal>

              {/* BOTTOM ROW: Secondary Stats (BMI, Water, BMR) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <MotionReveal delay={0.25}>
                  <div className="h-full rounded-[2rem] border border-white/10 bg-[#0a0a0f]/80 p-6 shadow-xl backdrop-blur-xl">
                    <div className="mb-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{t.bmiTitle}</p>
                      <div className="mt-2 flex items-baseline gap-3">
                        <span className="text-4xl font-black text-white">{result.bmi}</span>
                        <span className={cn("text-sm font-bold uppercase tracking-wider px-2 py-1 rounded bg-black/50", result.bmiColor)}>
                          {result.bmiCategory}
                        </span>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-white/10">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{t.waterTitle}</p>
                      <p className="mt-2 text-3xl font-black text-blue-400">{result.water} <span className="text-sm text-white/40 uppercase">{t.waterDesc}</span></p>
                    </div>
                  </div>
                </MotionReveal>

                <MotionReveal delay={0.3}>
                  <div className="h-full rounded-[2rem] border border-white/10 bg-[#0a0a0f]/80 p-6 shadow-xl backdrop-blur-xl">
                     <div className="mb-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{t.bmrTitle}</p>
                      <p className="mt-2 text-3xl font-black text-white">{result.bmr} <span className="text-sm text-white/30 uppercase">kcal</span></p>
                      <p className="mt-1 text-xs text-white/40">{t.bmrDesc}</p>
                    </div>
                    <div className="pt-6 border-t border-white/10">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{t.tdeeTitle}</p>
                      <p className="mt-2 text-3xl font-black text-white">{result.tdee} <span className="text-sm text-white/30 uppercase">kcal</span></p>
                      <p className="mt-1 text-xs text-white/40">{t.tdeeDesc}</p>
                    </div>
                  </div>
                </MotionReveal>

              </div>

              <MotionReveal delay={0.35}>
                <p className="text-center text-xs font-medium text-white/30 px-4">
                  {t.note}
                </p>
              </MotionReveal>

            </div>
          </div>
        </div>
      </main>

      <div className="relative z-10 mt-auto">
        <Footer />
      </div>
    </div>
  );
}