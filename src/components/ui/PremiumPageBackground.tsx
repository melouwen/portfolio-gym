export function PremiumPageBackground() {
  const squares = [
    { left: "8%", top: "12%", size: "18px", delay: "0s", cls: "smg-square-1" },
    { left: "18%", top: "38%", size: "12px", delay: "2s", cls: "smg-square-2" },
    { left: "30%", top: "18%", size: "10px", delay: "1.5s", cls: "smg-square-3" },
    { left: "44%", top: "14%", size: "20px", delay: "3s", cls: "smg-square-1" },
    { left: "58%", top: "62%", size: "14px", delay: "0.5s", cls: "smg-square-2" },
    { left: "72%", top: "22%", size: "16px", delay: "4s", cls: "smg-square-3" },
    { left: "86%", top: "48%", size: "12px", delay: "1s", cls: "smg-square-1" },
    { left: "12%", top: "80%", size: "10px", delay: "2.5s", cls: "smg-square-2" },
    { left: "78%", top: "82%", size: "12px", delay: "3.4s", cls: "smg-square-3" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="smg-tech-bg absolute inset-0" />

      <div className="absolute left-[-6%] top-[2%] h-[340px] w-[340px] rounded-full bg-[var(--smg-primary)]/12 blur-[120px]" />
      <div className="absolute right-[-4%] top-[8%] h-[320px] w-[320px] rounded-full bg-cyan-400/10 blur-[120px]" />
      <div className="absolute left-[36%] bottom-[6%] h-[260px] w-[260px] rounded-full bg-violet-500/10 blur-[110px]" />

      <div
        className="absolute left-[-10%] top-[14%] h-[220px] w-[42%] rotate-[-10deg] rounded-[4rem] opacity-40 blur-[70px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,107,26,0.18) 0%, rgba(255,255,255,0.03) 42%, rgba(56,189,248,0.08) 100%)",
        }}
      />
      <div
        className="absolute right-[-8%] top-[42%] h-[220px] w-[42%] rotate-[8deg] rounded-[4rem] opacity-30 blur-[70px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(56,189,248,0.16) 0%, rgba(168,85,247,0.08) 52%, rgba(255,255,255,0.03) 100%)",
        }}
      />
      <div
        className="absolute left-[10%] bottom-[8%] h-[180px] w-[36%] rotate-[5deg] rounded-[4rem] opacity-22 blur-[60px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,107,26,0.10) 0%, rgba(255,255,255,0.03) 50%, rgba(56,189,248,0.06) 100%)",
        }}
      />

      <div className="smg-bg-grid absolute inset-0" />
      <div className="smg-bg-dots absolute inset-0" />

      {squares.map((sq, i) => (
        <div
          key={i}
          className={`absolute ${sq.cls} border border-white/12 bg-white/[0.02] backdrop-blur-sm`}
          style={{
            left: sq.left,
            top: sq.top,
            width: sq.size,
            height: sq.size,
            animationDelay: sq.delay,
            boxShadow: "0 0 18px rgba(255,255,255,0.04)",
          }}
        />
      ))}

      <div className="absolute left-[8%] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute right-[10%] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/8 to-transparent" />
      <div className="absolute left-[28%] top-[8%] h-[34%] w-px rotate-[22deg] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute right-[22%] top-[52%] h-[24%] w-px -rotate-[18deg] bg-gradient-to-b from-transparent via-cyan-300/14 to-transparent" />

      <div className="absolute inset-x-0 top-[20%] h-24 smg-scanline opacity-30 blur-xl" />
      <div className="smg-bg-vignette absolute inset-0" />
    </div>
  );
}