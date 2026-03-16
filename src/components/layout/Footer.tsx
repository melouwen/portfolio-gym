"use client";

import Link from "next/link";
import { NAV_SECTIONS } from "@/lib/nav";
import { CONTENT, pickLang } from "@/content/siteContent";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { language } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-[#050508]">
      {/* Декоративне світіння на фоні футера */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-[60%] bg-gradient-to-r from-transparent via-[var(--smg-primary)]/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[200px] w-[500px] bg-[var(--smg-primary)]/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="grid gap-12 md:grid-cols-3">

          {/* ЛІВА КОЛОНКА (Логотип та слоган) */}
          <div>
            <Link
              href="#hero"
              className="inline-flex items-center gap-4 group"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <div className="grid h-12 w-12 place-items-center rounded-[1rem] border border-white/10 bg-[#0a0a0f] shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all group-hover:border-[var(--smg-primary)]/30">
                <span className="text-[12px] font-black uppercase tracking-[0.2em] text-white">SMG</span>
              </div>
              <div>
                <p className="text-base font-black uppercase tracking-wider text-white">
                  Strong Muscle Gym
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--smg-primary)]">
                  BILA TSERKVA
                </p>
              </div>
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-white/50 max-w-xs">
              {pickLang(CONTENT.footer.tagline, language)}
            </p>
          </div>

          {/* ЦЕНТРАЛЬНА КОЛОНКА (Навігація) */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/30">
              {pickLang(CONTENT.nav.services, language)}
            </p>
            <ul className="mt-6 grid gap-4 text-sm font-semibold tracking-wide">
              {NAV_SECTIONS.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`#${s.id}`}
                    className="text-white/60 transition-colors hover:text-[var(--smg-primary)]"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {pickLang(CONTENT.nav[s.labelKey], language)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ПРАВА КОЛОНКА (Контакти та Соцмережі) */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/30">
              {pickLang(CONTENT.footer.contactsTitle, language)}
            </p>
            <div className="mt-6 grid gap-3 text-sm font-medium text-white/70">
              <p className="text-white/50">{pickLang(CONTENT.footer.address, language)}</p>
              <a className="hover:text-[var(--smg-primary)] transition-colors" href={`tel:${CONTENT.footer.phone}`}>
                {CONTENT.footer.phone}
              </a>
              <a className="hover:text-[var(--smg-primary)] transition-colors" href={`mailto:${CONTENT.footer.email}`}>
                {CONTENT.footer.email}
              </a>
            </div>

            <p className="mt-10 text-[11px] font-bold uppercase tracking-[0.25em] text-white/30">
              {pickLang(CONTENT.footer.socialsTitle, language)}
            </p>
            <ul className="mt-5 flex flex-wrap gap-3">
              {CONTENT.footer.socials.map((s) => (
                <li key={s.id}>
                  <a
                    className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white/70 transition-all hover:bg-[var(--smg-primary)] hover:border-[var(--smg-primary)] hover:text-white"
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* НИЖНІЙ БЛОК (Копірайт) */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs font-semibold text-white/30 sm:flex-row sm:items-center sm:justify-between tracking-wide">
          <p>
            © {year} SMG. {pickLang(CONTENT.footer.copyright, language)}
          </p>
          <p>
            BILA TSERKVA
          </p>
        </div>
      </div>
    </footer>
  );
}