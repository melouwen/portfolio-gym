"use client";

import { MotionReveal } from "@/components/motion/MotionReveal";
import { Section } from "@/components/ui/Section";
import { useLanguage } from "@/contexts/LanguageContext";
import { CONTENT, pickLang } from "@/content/siteContent";

export function ContactSection() {
  const { language } = useLanguage();
  const c = CONTENT.footer;

  return (
    <Section id="contact">
      {/* Контейнер для візуальних переходів */}
      <div className="relative w-full">

        {/* === ЕФЕКТИ ПЕРЕХОДУ ТА ФОНУ === */}
        <div className="absolute inset-x-0 -top-10 sm:-top-12 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-x-0 -top-10 sm:-top-12 h-32 w-full bg-gradient-to-b from-[var(--smg-primary)]/[0.03] to-transparent pointer-events-none" />
        <div className="absolute -top-32 -left-32 h-[25rem] w-[25rem] rounded-full bg-[var(--smg-primary)] opacity-10 blur-[100px] pointer-events-none" />
        {/* ================================== */}

        {/* Зменшено gap: gap-6 lg:gap-10 замість 8 і 12 */}
        <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr,1.1fr] lg:gap-10 lg:items-center">

          {/* ЛІВА ЧАСТИНА: Текст та Контакти */}
          <div className="flex flex-col z-10">
            <MotionReveal>
              {/* Зменшено бейдж */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--smg-primary)]/40 bg-[var(--smg-primary)]/10 px-3 py-1.5 mb-4 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--smg-primary)] w-fit backdrop-blur-md">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--smg-primary)] opacity-75"></span>
                  <span className="relative inline-flex size-1.5 rounded-full bg-[var(--smg-primary)] shadow-[0_0_8px_var(--smg-primary)]"></span>
                </span>
                {language === "uk" ? "Зв'язок з нами" : "Get in touch"}
              </div>
            </MotionReveal>

            <MotionReveal delay={0.05}>
              {/* Зменшено заголовок */}
              <h2 className="text-3xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70 sm:text-4xl lg:text-[2.5rem] lg:leading-[1.1]">
                {language === "uk" ? "Контакти та запис" : "Contact & booking"}
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              {/* Зменшено текст опису */}
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60 font-light">
                {language === "uk"
                  ? "Хочеш швидко стартувати? Подзвони нам - підберемо формат, тренера й ідеальний розклад."
                  : "Want to start fast? Call us - we’ll match you with the right format, coach, and schedule."}
              </p>
            </MotionReveal>

            {/* Список контактів - зменшено відступи (mt-6, gap-5, pl-4) */}
            <MotionReveal delay={0.15}>
              <div className="mt-6 flex flex-col gap-5 border-l-2 border-white/10 pl-4">

                <div className="flex flex-col">
                  {/* Зменшено label */}
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">
                    {pickLang(CONTENT.footer.contactsTitle, language)}
                  </span>
                  {/* Зменшено адресу */}
                  <p className="text-xs font-medium text-white/90">{pickLang(c.address, language)}</p>
                </div>

                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">
                    {language === "uk" ? "Телефон" : "Phone"}
                  </span>
                  {/* Зменшено розмір телефону (text-lg замість text-xl) */}
                  <a href={`tel:${c.phone}`} className="text-lg font-black tracking-wider text-white transition-all duration-300 hover:text-[var(--smg-primary)] hover:drop-shadow-[0_0_15px_rgba(var(--smg-primary-rgb),0.5)] w-fit outline-none [-webkit-tap-highlight-color:transparent]">
                    {c.phone}
                  </a>
                </div>

              </div>
            </MotionReveal>
          </div>

          {/* ПРАВА ЧАСТИНА: Карта та Віджет */}
          <MotionReveal delay={0.2} className="w-full">
            {/* Зменшено висоту карти: h-[300px] lg:h-[380px] замість 350/440. Зменшено скруглення (rounded-[1.5rem]) */}
            <div className="group relative h-[300px] w-full lg:h-[380px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0a0a0f] shadow-xl">

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2574.7991946085353!2d30.09699451223372!3d49.80864273324821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d36bec0a0c507b%3A0xd152d52e705f812d!2z0KHQv9C-0YDRgtC40LLQvdC40Lkg0LrQu9GD0LEgU01fR3lt!5e0!3m2!1sru!2sua!4v1773567475870!5m2!1sru!2sua"
                className="absolute inset-0 h-full w-full border-0 transition-all duration-700 ease-in-out filter grayscale-[100%] contrast-[1.1] opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:contrast-100"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#050507] via-[#050507]/60 to-transparent opacity-90 pointer-events-none" />

            </div>
          </MotionReveal>

        </div>
      </div>
    </Section>
  );
}