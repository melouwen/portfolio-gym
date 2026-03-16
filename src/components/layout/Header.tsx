"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { SettingsPanel } from "@/components/layout/SettingsPanel";
import { NAV_SECTIONS } from "@/lib/nav";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/cn";
import { useLanguage } from "@/contexts/LanguageContext";
import { CONTENT, pickLang } from "@/content/siteContent";

export function Header() {
  const { language } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const ids = useMemo(() => NAV_SECTIONS.map((s) => s.id), []);

  // Звичайний scrollSpy
  const activeId = useScrollSpy({ sectionIds: ids });

  const isHomePage = pathname === "/";
  const isTrainersPage = pathname === "/trainers";

  // Відслідковуємо стандартний скрол вікна
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    setMobileOpen(false);

    if (!isHomePage) {
      router.push(`/#${id}`);
      return;
    }

    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      (document.activeElement as HTMLElement)?.blur();
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      if (id === "services") {
        // Послуги центруємо по екрану
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        // Відступ вгору (висота хедера + повітря).
        const yOffset = -25;
        const y = el.getBoundingClientRect().top + window.scrollY + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }

    (document.activeElement as HTMLElement)?.blur();
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-[120]">
      <div
        className={cn(
          "absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "bg-[#07070a]/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        )}
      />

      <div
        className={cn(
          "relative mx-auto grid max-w-[1720px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-6 lg:px-10",
          scrolled ? "py-3" : "py-5"
        )}
      >
        {/* ТЕКСТОВИЙ ЛОГОТИП (БЕЗ ФОТО) */}
        <Link
          href="/#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNav("hero");
          }}
          className="group flex items-center outline-none"
        >
          <div className="relative transition-all duration-500">
            <p className={cn("font-black uppercase tracking-[0.12em] text-white group-hover:text-[var(--smg-primary)]", scrolled ? "text-[11px]" : "text-[13px]")}>
              Strong Muscle
            </p>
            <p className={cn("mt-0.5 font-bold uppercase tracking-[0.22em] text-white/40", scrolled ? "text-[9px]" : "text-[10px]")}>
              Gym
            </p>
          </div>
        </Link>

        {/* НАВІГАЦІЯ */}
        <div className="flex justify-center">
          <nav className="hidden md:flex">
            <div className={cn("relative flex items-center rounded-full border border-white/5 bg-[#0a0a0f]/60 backdrop-blur-md shadow-[0_14px_40px_rgba(0,0,0,0.3)] transition-all duration-500", scrolled ? "gap-1 px-2 py-1.5" : "gap-1.5 px-3 py-2")}>
              {NAV_SECTIONS.map((s) => {
                const label = pickLang(CONTENT.nav[s.labelKey], language);
                const isActive = (isHomePage && activeId === s.id) || (s.id === "trainers" && isTrainersPage);

                return (
                  <button
                    key={s.id}
                    onClick={() => handleNav(s.id)}
                    className={cn(
                      "relative rounded-full font-bold uppercase tracking-wider transition-all duration-300 outline-none",
                      scrolled ? "px-4 py-2 text-[10px]" : "px-5 py-2.5 text-[11px]",
                      isActive ? "text-white" : "text-white/50 hover:text-white"
                    )}
                  >
                    <span className={cn("absolute inset-0 rounded-full transition-all duration-300", isActive ? "scale-100 opacity-100 bg-[var(--smg-primary)]/10 border border-[var(--smg-primary)]/20" : "scale-95 opacity-0 bg-white/[0.04]")} />
                    <span className="relative">{label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* КНОПКИ ПРАВОРУЧ */}
        <div className="flex items-center justify-end gap-3">
          <div className="hidden sm:block">
            <Button onClick={() => handleNav("contact")} className={cn("rounded-full bg-[var(--smg-primary)] font-bold text-white uppercase tracking-wider hover:scale-[1.05]", scrolled ? "px-6 py-2.5 text-[11px]" : "px-7 py-3 text-[12px]")}>
              {pickLang(CONTENT.header.cta, language)}
            </Button>
          </div>
          <div className={cn("rounded-full border border-white/5 bg-[#0a0a0f]/60 backdrop-blur-md", scrolled ? "p-1.5" : "p-2")}><SettingsPanel /></div>
          <div className="md:hidden">
            <div className={cn("rounded-full border border-white/5 bg-[#0a0a0f]/60 backdrop-blur-md", scrolled ? "p-1.5" : "p-2")}>
              <IconButton aria-expanded={mobileOpen} onClick={() => setMobileOpen((p) => !p)} className="outline-none">{mobileOpen ? "✕" : "☰"}</IconButton>
            </div>
          </div>
        </div>
      </div>

      {/* МОБІЛЬНЕ МЕНЮ */}
      <div className={cn("relative border-t border-white/5 bg-[#07070a]/95 backdrop-blur-2xl md:hidden transition-all duration-300", mobileOpen ? "opacity-100 block" : "opacity-0 hidden")}>
        <nav className="mx-auto max-w-[1720px] px-4 py-6 sm:px-6">
          <div className="grid gap-2">
            {NAV_SECTIONS.map((s) => {
              const label = pickLang(CONTENT.nav[s.labelKey], language);
              const isActive = (isHomePage && activeId === s.id) || (s.id === "trainers" && isTrainersPage);

              return (
                <button key={s.id} onClick={() => handleNav(s.id)} className={cn("relative flex items-center justify-between overflow-hidden rounded-2xl px-5 py-4 text-left text-sm font-bold uppercase tracking-widest", isActive ? "text-[var(--smg-primary)] bg-[var(--smg-primary)]/10 border border-[var(--smg-primary)]/20" : "text-white/60")}>
                  <span className="relative">{label}</span>
                  {isActive && <span className="relative h-2 w-2 rounded-full bg-[var(--smg-primary)] shadow-[0_0_10px_var(--smg-primary)]" />}
                </button>
              );
            })}
            <Button className="mt-4 w-full rounded-2xl bg-[var(--smg-primary)] py-4 text-sm font-bold uppercase tracking-widest text-white" onClick={() => handleNav("contact")}>
              {pickLang(CONTENT.header.cta, language)}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}