"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Briefcase,
  Check,
  Sparkles,
  Star,
  TrendingUp,
  ShieldCheck,
  Eye,
} from "lucide-react";
import { FitChip } from "./FitChip";
import { ScoreCircle } from "./ScoreCircle";

type Scene = "jd" | "scoring";

const JD_LINES = [
  "Build and ship polished product surfaces",
  "Collaborate with design on cohesive experiences",
  "Own frontend quality — perf, a11y, testing",
  "Mentor engineers on React and TypeScript",
];

const CANDIDATES = [
  { name: "Aarav Mehta", fit: 91, level: "high" as const, hue: 220 },
  { name: "Priya Raghavan", fit: 82, level: "high" as const, hue: 280 },
  { name: "Saanvi Desai", fit: 71, level: "medium" as const, hue: 340 },
  { name: "Rohan Kapoor", fit: 64, level: "medium" as const, hue: 30 },
];

export function HeroProductPreview() {
  const [scene, setScene] = useState<Scene>("jd");

  useEffect(() => {
    const iv = setInterval(() => {
      setScene((s) => (s === "jd" ? "scoring" : "jd"));
    }, 7000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="relative">
      {/* soft glow behind */}
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-[40px] bg-gradient-to-br from-brand-200/40 via-brand-100/30 to-transparent blur-2xl dark:from-brand-500/20 dark:via-brand-500/10"
      />

      <div className="relative rounded-[28px] border border-ink-200 bg-white p-3 shadow-[0_30px_60px_-30px_rgba(16,24,40,0.2),0_0_0_1px_rgba(255,255,255,0.6)_inset] dark:border-ink-800 dark:bg-ink-900 dark:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)_inset]">
        {/* window chrome */}
        <div className="flex items-center justify-between px-3 pb-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-ink-200 bg-ink-50 px-3 py-1 text-[11px] text-ink-500 dark:border-ink-800 dark:bg-ink-800/60 dark:text-ink-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            app.anytimehire.com
          </div>
          <span className="text-[11px] font-medium text-ink-400 dark:text-ink-500">
            {scene === "jd" ? "Create opening" : "Candidates"}
          </span>
        </div>

        <div className="relative h-[440px] overflow-hidden rounded-2xl bg-gradient-to-b from-ink-50/80 to-white dark:from-ink-800/40 dark:to-ink-900">
          <AnimatePresence mode="wait">
            {scene === "jd" ? (
              <JDScene key="jd" />
            ) : (
              <ScoringScene key="scoring" />
            )}
          </AnimatePresence>
        </div>

        {/* scene dots */}
        <div className="flex items-center justify-center gap-1.5 pt-3">
          {(["jd", "scoring"] as Scene[]).map((s) => (
            <button
              key={s}
              onClick={() => setScene(s)}
              aria-label={`Show ${s} preview`}
              className={`h-1.5 rounded-full transition-all ${
                scene === s
                  ? "w-6 bg-brand-500"
                  : "w-1.5 bg-ink-300 hover:bg-ink-400 dark:bg-ink-700 dark:hover:bg-ink-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function JDScene() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full flex-col p-5"
    >
      {/* Stepper */}
      <div className="mb-5 flex items-center gap-2">
        {["Basic info", "Responsibilities", "Interview setup"].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${
                i === 1
                  ? "bg-brand-500 text-white"
                  : i === 0
                    ? "bg-emerald-500 text-white"
                    : "bg-ink-200 text-ink-500 dark:bg-ink-800 dark:text-ink-400"
              }`}
            >
              {i === 0 ? <Check className="h-3 w-3" /> : i + 1}
            </div>
            <span
              className={`text-[11px] font-medium ${
                i === 1 ? "text-ink-900 dark:text-ink-50" : "text-ink-500 dark:text-ink-400"
              }`}
            >
              {label}
            </span>
            {i < 2 && <span className="mx-1 h-px w-6 bg-ink-200 dark:bg-ink-800" />}
          </div>
        ))}
      </div>

      {/* Title row */}
      <div className="mb-4 flex items-start justify-between rounded-xl border border-ink-200 bg-white p-3 dark:border-ink-800 dark:bg-ink-900">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-300">
            <Briefcase className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-semibold text-ink-900 dark:text-ink-50">
              Senior Frontend Engineer
            </div>
            <div className="text-[11px] text-ink-500 dark:text-ink-400">
              Engineering · Bengaluru (Hybrid) · 4–7 yrs
            </div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
          <Sparkles className="h-3 w-3" /> AI drafted
        </span>
      </div>

      {/* Responsibilities (typing effect) */}
      <div className="flex-1 rounded-xl border border-ink-200 bg-white p-3 dark:border-ink-800 dark:bg-ink-900">
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500 dark:text-ink-400">
          Responsibilities
        </div>
        <ul className="space-y-2">
          {JD_LINES.map((line, i) => (
            <motion.li
              key={line}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.35, duration: 0.4 }}
              className="flex items-start gap-2.5 rounded-lg bg-ink-50/70 p-2.5 dark:bg-ink-800/50"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-[10px] font-semibold text-white">
                {i + 1}
              </span>
              <span className="text-[12px] text-ink-800 dark:text-ink-200">
                {line}
                {i === JD_LINES.length - 1 && (
                  <span className="animate-caret ml-0.5 text-brand-500">▍</span>
                )}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function ScoringScene() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full flex-col p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500 dark:text-ink-400">
            Senior Frontend Engineer · 5 candidates
          </div>
          <div className="mt-1 text-sm font-semibold text-ink-900 dark:text-ink-50">Ranked by fit</div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30">
          <ShieldCheck className="h-3 w-3" /> 0 cheating flags
        </div>
      </div>

      {/* Top candidate card with score circle */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="mb-3 flex items-center gap-4 rounded-xl border border-ink-200 bg-white p-3.5 dark:border-ink-800 dark:bg-ink-900"
      >
        <ScoreCircle value={91} size={76} stroke={7} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className="truncate text-sm font-semibold text-ink-900 dark:text-ink-50">
              Aarav Mehta
            </div>
            <FitChip level="high" percent={91} />
          </div>
          <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-ink-600 dark:text-ink-400">
            Strong technical depth; first-principles thinking on performance and
            state modelling.
          </p>
          <div className="mt-2 flex items-center gap-3 text-[10px] text-ink-500 dark:text-ink-400">
            <span className="inline-flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-brand-500" /> Trust 9.4
            </span>
            <span className="inline-flex items-center gap-1">
              <Eye className="h-3 w-3 text-brand-500" /> AI round 88
            </span>
            <span className="inline-flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-400 stroke-amber-500" /> 4.6 avg skill
            </span>
          </div>
        </div>
      </motion.div>

      {/* Other candidates list */}
      <div className="space-y-1.5">
        {CANDIDATES.slice(1).map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.35 }}
            className="flex items-center gap-3 rounded-lg border border-ink-200 bg-white px-3 py-2 dark:border-ink-800 dark:bg-ink-900"
          >
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white"
              style={{ background: `hsl(${c.hue} 70% 55%)` }}
            >
              {c.name
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </div>
            <div className="flex-1 truncate text-xs font-medium text-ink-800 dark:text-ink-200">
              {c.name}
            </div>
            <div className="flex h-1.5 w-20 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${c.fit}%` }}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.8, ease: "easeOut" }}
                className={`h-full ${
                  c.level === "high"
                    ? "bg-emerald-500"
                    : c.level === "medium"
                      ? "bg-amber-500"
                      : "bg-rose-500"
                }`}
              />
            </div>
            <span className="tabular w-8 text-right text-[11px] font-semibold text-ink-900 dark:text-ink-50">
              {c.fit}%
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
