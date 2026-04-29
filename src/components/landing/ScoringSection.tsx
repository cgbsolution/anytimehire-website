"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScoreboardSnippet } from "@/components/product-ui/ScoreboardSnippet";

const HIGHLIGHTS = [
  "Fit score with breakdown: technical, communication, problem-solving, confidence",
  "5-star skills rubric with direct evidence from answers",
  "Full Q&A transcript, with positives and concerns per question",
  "Cheating signals surfaced — tab-switch, face match, copy-paste",
  "Recommendation banner: strong hire, hire, maybe, or no",
];

export function ScoringSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-page">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1"
          >
            <ScoreboardSnippet />
          </motion.div>

          <div className="order-1 lg:order-2">
            <SectionLabel>Score candidates</SectionLabel>
            <h2 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-ink-900 dark:text-ink-50 sm:text-[42px] sm:leading-[1.1]">
              The shortlist arrives with <br className="hidden sm:block" />
              receipts.
            </h2>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-ink-600 dark:text-ink-400">
              Every candidate is scored on the same rubric, with evidence from the
              interview itself. You open the dashboard knowing who to talk to — and
              why.
            </p>

            <ul className="mt-7 space-y-3">
              {HIGHLIGHTS.map((h, i) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 text-[15px] text-ink-700 dark:text-ink-300"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200 dark:bg-emerald-500/15 dark:ring-emerald-500/30">
                    <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                  </span>
                  {h}
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/demo/evaluate"
                className="group inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-ink-800 dark:bg-ink-50 dark:text-ink-900 dark:hover:bg-white"
              >
                Open the scoring demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
