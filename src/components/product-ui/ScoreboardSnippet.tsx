"use client";

import { motion } from "framer-motion";
import { Star, Shield } from "lucide-react";
import { ScoreCircle } from "./ScoreCircle";

const SKILLS = [
  { name: "React 19", rating: 5, score: 95 },
  { name: "TypeScript", rating: 5, score: 92 },
  { name: "Next.js", rating: 4, score: 84 },
  { name: "CSS Architecture", rating: 4, score: 80 },
  { name: "Testing", rating: 3, score: 66 },
  { name: "Accessibility", rating: 4, score: 82 },
];

export function ScoreboardSnippet() {
  return (
    <div className="relative rounded-2xl border border-ink-200 bg-white p-5 shadow-[0_24px_48px_-24px_rgba(16,24,40,0.18)] dark:border-ink-800 dark:bg-ink-900 dark:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)]">
      <div className="flex items-start gap-4">
        <ScoreCircle value={89} size={96} stroke={9} label="overall" />
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500 dark:text-ink-400">
            Evaluation summary
          </div>
          <div className="mt-1 text-sm font-semibold text-ink-900 dark:text-ink-50">
            Aarav Mehta — Senior Frontend Engineer
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-ink-600 dark:text-ink-400">
            Strong technical depth paired with clear communication. First-principles
            thinking on performance and state modelling.
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30">
            <Shield className="h-3 w-3" /> Strong hire
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500 dark:text-ink-400">
          Skills rating
        </div>
        <div className="grid grid-cols-2 gap-2">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-lg border border-ink-200 bg-white p-2.5 dark:border-ink-800 dark:bg-ink-900"
            >
              <div className="flex items-center justify-between">
                <span className="truncate text-[11px] font-semibold text-ink-900 dark:text-ink-50">
                  {s.name}
                </span>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      className={`h-2.5 w-2.5 ${
                        n <= s.rating
                          ? "fill-amber-400 stroke-amber-500"
                          : "fill-none stroke-ink-300 dark:stroke-ink-700"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.06 }}
                  className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
