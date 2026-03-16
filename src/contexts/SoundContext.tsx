"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { safeLocalStorageGet, safeLocalStorageSet } from "@/lib/localStorage";

export type SoundEvent =
  | "button"
  | "toggle"
  | "modalOpen"
  | "modalClose"
  | "carousel"
  | "soft";

type SoundContextValue = {
  volume: number; // 0..1
  setVolume: (value: number) => void;
  play: (event: SoundEvent) => void;
};

const SoundContext = createContext<SoundContextValue | undefined>(undefined);

const STORAGE_KEY = "smg.soundVolume";

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

type Synth = {
  ctx: AudioContext;
  master: GainNode;
};

function getOrCreateSynth(): Synth | null {
  if (typeof window === "undefined") return null;
  const anyWin = window as unknown as { __smgSynth?: Synth };
  if (anyWin.__smgSynth) return anyWin.__smgSynth;

  type WebkitWindow = Window & {
    AudioContext?: typeof AudioContext;
    webkitAudioContext?: typeof AudioContext;
  };
  const w = window as WebkitWindow;
  const AudioCtx = w.AudioContext || w.webkitAudioContext;
  if (!AudioCtx) return null;

  const ctx = new AudioCtx();
  const master = ctx.createGain();
  master.gain.value = 0.6;
  master.connect(ctx.destination);

  anyWin.__smgSynth = { ctx, master };
  return anyWin.__smgSynth;
}

function ping(synth: Synth, opts: { freq: number; durMs: number; gain: number; type?: OscillatorType }) {
  const { ctx, master } = synth;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();

  osc.type = opts.type ?? "sine";
  osc.frequency.value = opts.freq;

  const now = ctx.currentTime;
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(opts.gain, now + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, now + opts.durMs / 1000);

  osc.connect(g);
  g.connect(master);
  osc.start(now);
  osc.stop(now + opts.durMs / 1000 + 0.02);
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [volume, setVolumeState] = useState(() => {
    if (typeof window === "undefined") return 0.6;
    const stored = safeLocalStorageGet<number | null>(STORAGE_KEY, null);
    return typeof stored === "number" ? clamp01(stored) : 0.6;
  });

  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    // Unlock audio on first user gesture (required by many browsers)
    function unlock() {
      const synth = getOrCreateSynth();
      if (!synth) return;
      if (synth.ctx.state === "suspended") synth.ctx.resume().catch(() => {});
      setUnlocked(true);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    }
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  const value = useMemo<SoundContextValue>(() => {
    const setVolume = (next: number) => {
      const v = clamp01(next);
      setVolumeState(v);
      safeLocalStorageSet(STORAGE_KEY, v);
    };

    const play = (event: SoundEvent) => {
      if (volume <= 0) return;
      const synth = getOrCreateSynth();
      if (!synth) return;
      if (synth.ctx.state === "suspended") return; // not unlocked yet
      if (!unlocked) return;

      // keep it minimal & non-annoying
      switch (event) {
        case "button":
          ping(synth, { freq: 520, durMs: 48, gain: 0.08 * volume, type: "triangle" });
          break;
        case "toggle":
          ping(synth, { freq: 680, durMs: 38, gain: 0.06 * volume, type: "square" });
          ping(synth, { freq: 520, durMs: 55, gain: 0.04 * volume, type: "triangle" });
          break;
        case "modalOpen":
          ping(synth, { freq: 420, durMs: 80, gain: 0.08 * volume, type: "sine" });
          ping(synth, { freq: 780, durMs: 60, gain: 0.05 * volume, type: "triangle" });
          break;
        case "modalClose":
          ping(synth, { freq: 640, durMs: 50, gain: 0.05 * volume, type: "triangle" });
          ping(synth, { freq: 360, durMs: 70, gain: 0.06 * volume, type: "sine" });
          break;
        case "carousel":
          ping(synth, { freq: 560, durMs: 35, gain: 0.05 * volume, type: "triangle" });
          break;
        case "soft":
        default:
          ping(synth, { freq: 460, durMs: 40, gain: 0.035 * volume, type: "sine" });
          break;
      }
    };

    return { volume, setVolume, play };
  }, [unlocked, volume]);

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within SoundProvider");
  return ctx;
}

