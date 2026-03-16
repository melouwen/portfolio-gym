import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CONTENT } from "@/content/siteContent";

// --- НОВИЙ БЛОК ДЛЯ СТАТИЧНОГО ЕКСПОРТУ ---
// Ця функція каже Next.js, які сторінки створити наперед
export async function generateStaticParams() {
  return CONTENT.services.items.map((service) => ({
    slug: service.slug,
  }));
}
// ------------------------------------------

type Props = {
  params: Promise<{ slug: string }>;
};

function SectionDivider() {
  return (
    <div className="pointer-events-none absolute inset-x-0 -top-10 z-20 h-20 sm:-top-14 sm:h-28 flex justify-center overflow-hidden">
      <div className="absolute inset-x-[10%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 h-[2px] w-32 -translate-y-1/2 bg-[var(--smg-primary)] shadow-[0_0_20px_var(--smg-primary)] blur-[1px]" />
    </div>
  );
}

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-white/5 bg-[#0a0a0f]/80 p-5 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all hover:border-white/10 ${className}`}>
      {children}
    </div>
  );
}

export default async function ServiceDetailsPage({ params }: Props) {
  const { slug } = await params;
  const service = CONTENT.services.items.find((item) => item.slug === slug);

  if (!service) return notFound();

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-[#07070a]">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10">
        <Header />
        <main className="relative flex-1 pt-0">
          <section className="relative -mt-px flex min-h-[65vh] sm:min-h-[75vh] lg:min-h-[85vh] items-end overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src={service.heroImage}
                alt={service.title.uk}
                className="h-full w-full object-cover object-top sm:object-center opacity-80"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,7,10,0.6)_100%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-[#07070a]/60 to-transparent" />
            </div>

            <div className="relative z-10 w-full">
              <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-32 sm:px-6 lg:px-12 sm:pb-20">
                <div className="max-w-4xl">
                  <Link
                    href="/#services"
                    className="mb-6 sm:mb-8 inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/50 transition-colors hover:text-[var(--smg-primary)]"
                  >
                    Усі послуги
                  </Link>
                  <h1 className="text-4xl sm:text-6xl lg:text-[6.5rem] font-black uppercase tracking-tighter text-white lg:leading-[0.9] text-balance drop-shadow-lg">
                    {service.title.uk}
                  </h1>
                  <p className="mt-4 sm:mt-8 max-w-2xl text-sm sm:text-lg lg:text-xl leading-relaxed text-white/70 font-medium">
                    {service.description.uk}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="relative pb-20 pt-6 sm:pb-32 sm:pt-10 lg:pt-16">
            <SectionDivider />
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12 relative z-10">
              <div className="grid gap-6 lg:grid-cols-12 lg:gap-10 items-start">
                <div className="flex flex-col gap-6 lg:col-span-8">
                  <GlassCard>
                    <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                      <div className="h-[2px] w-8 sm:w-12 bg-[var(--smg-primary)] shadow-[0_0_10px_var(--smg-primary)]" />
                      <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-white">
                        Про тренування
                      </h2>
                    </div>
                    <p className="text-sm leading-relaxed text-white/70 sm:text-base lg:text-lg lg:leading-loose font-medium">
                      {service.fullDescription.uk}
                    </p>
                  </GlassCard>

                  <GlassCard>
                    <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                      <div className="h-[2px] w-8 sm:w-12 bg-[var(--smg-primary)] shadow-[0_0_10px_var(--smg-primary)]" />
                      <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-white">
                        Що ви отримаєте
                      </h2>
                    </div>
                    <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                      {service.benefits.uk.map((benefit, i) => (
                        <div key={i} className="group flex items-start gap-4 rounded-[1rem] sm:rounded-[1.25rem] border border-white/5 bg-[#0a0a0f] p-4 sm:p-5 transition-all duration-300 hover:border-[var(--smg-primary)]/30 hover:bg-[var(--smg-primary)]/5 hover:shadow-[0_10px_30px_-10px_rgba(255,107,26,0.15)]">
                          <div className="mt-0.5 flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-[var(--smg-primary)]/10 text-[var(--smg-primary)] group-hover:bg-[var(--smg-primary)] group-hover:text-white transition-colors duration-300">
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-xs sm:text-sm font-medium leading-relaxed text-white/80 group-hover:text-white transition-colors">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>

                <div className="flex flex-col gap-6 lg:col-span-4 lg:sticky lg:top-32">
                  <GlassCard className="!p-5 sm:!p-6">
                    <div className="grid grid-cols-2 gap-4 divide-x divide-white/10">
                      <div className="pr-2 sm:pr-4">
                        <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Тривалість</p>
                        <p className="mt-1.5 flex items-baseline gap-1">
                          <span className="text-3xl sm:text-4xl font-black text-white">{service.durationMin}</span>
                          <span className="text-[10px] sm:text-xs font-bold text-white/50 uppercase tracking-widest">хв</span>
                        </p>
                      </div>
                      <div className="pl-4 sm:pl-6">
                        <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Рівень</p>
                        <p className="mt-2 text-base sm:text-lg font-black text-white uppercase tracking-wider">{service.difficulty.uk}</p>
                      </div>
                    </div>
                    <div className="mt-5 pt-5 sm:mt-6 sm:pt-6 border-t border-white/10">
                      <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2 sm:mb-3">Фокус заняття</p>
                      <div className="inline-flex items-center gap-2 rounded-lg border border-[var(--smg-primary)]/20 bg-[var(--smg-primary)]/10 px-3 py-2 text-xs sm:text-sm font-bold text-[var(--smg-primary)]">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--smg-primary)] opacity-75"></span>
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--smg-primary)]"></span>
                        </span>
                        {service.benefits.uk[0]}
                      </div>
                    </div>
                  </GlassCard>

                  <div className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-[var(--smg-primary)]/30 bg-[#0a0a0f] p-6 sm:p-8 shadow-[0_20px_50px_rgba(255,107,26,0.15)] transition-all hover:shadow-[0_20px_60px_rgba(255,107,26,0.25)]">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--smg-primary)]/20 blur-[80px] pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-2 sm:mb-3">
                          Готові почати?
                        </h3>
                        <p className="text-xs sm:text-sm text-white/60 mb-6 sm:mb-8 leading-relaxed font-medium">
                          Забронюйте місце на тренування прямо зараз або замовте консультацію, якщо маєте питання.
                        </p>
                      </div>
                      <div className="mt-auto flex flex-col gap-3 sm:gap-4">
                        <Link href="/#contact" className="flex w-full items-center justify-center rounded-full bg-[var(--smg-primary)] px-6 py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white shadow-[0_0_20px_rgba(255,107,26,0.3)] transition-transform hover:scale-[1.02] active:scale-[0.98]">
                          Записатися
                        </Link>
                        <Link href="/#contact" className="flex w-full items-center justify-center rounded-full border border-white/10 bg-transparent px-6 py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/5 hover:text-white">
                          Консультація
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}