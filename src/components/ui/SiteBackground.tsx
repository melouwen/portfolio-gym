export function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 bg-[#07070a] overflow-hidden">

      {/* 1. Глобальна сітка (Grid Pattern) - ЗБІЛЬШЕНА ВИДИМІСТЬ ТА ДОДАНА ГЛИБИНА */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_30%,transparent_100%)]" />

      {/* 2. Легкі декоративні світіння (трохи яскравіші для контрасту з сіткою) */}
      <div className="absolute -top-[10%] right-[10%] h-[800px] w-[800px] rounded-full bg-[var(--smg-primary)]/10 blur-[150px]" />
      <div className="absolute -bottom-[10%] left-[5%] h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[150px]" />

      {/* 3. Декоративна діагональна лінія (більш помітна) */}
      <div className="absolute top-0 right-[25%] h-[150%] w-px rotate-12 bg-gradient-to-b from-transparent via-[var(--smg-primary)]/20 to-transparent blur-[1px]" />

      {/* 4. Віньєтка (м'яке затемнення по краях екрана для створення фокусу) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.85)_100%)]" />

    </div>
  );
}