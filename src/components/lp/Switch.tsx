"use client";

import { motion } from "framer-motion";
import { ArrowRight, X, Check } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const BEFORE = [
  "7+ recruiters · 1 candidate at a time · 20–25 phone screens / week",
  "Resume + 'gut feel' · no rubric · scores live in someone's head",
  "Decisions held back by 1–2 reviewer schedules · Mon–Fri only",
  "70–95% of applicants never get a real conversation",
  "No record of why a candidate was rejected — bias, legal risk",
];

const AFTER = [
  "1 recruiter · 1,000 candidates simultaneously · 24/7 availability",
  "Standardised rubric · evidence-backed scoring · fully audit-ready",
  "Decisions move in hours, not days · async by default · India + global",
  "Every applicant interviewed · real conversation · real signals",
  "Every score has a transcript-quote anchor · explainable, legally defensible",
];

export function Switch() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>The switch</SectionLabel>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-ink-900 dark:text-ink-50 sm:text-5xl">
            What changes when you switch
            <br />
            to AnytimeHire.
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-600 dark:text-ink-400">
            A side-by-side at the funnel your team runs today vs. the funnel a
            tier-1 enterprise hiring team runs on AnytimeHire.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-3 lg:grid-cols-[1fr_auto_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-rose-200 bg-rose-50/40 p-6 dark:border-rose-500/20 dark:bg-rose-500/5"
          >
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-rose-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-rose-700 dark:bg-rose-500/15 dark:text-rose-300">
                Before
              </span>
              <span className="text-sm font-semibold text-ink-700 dark:text-ink-300">
                Manual screening
              </span>
            </div>
            <ul className="mt-5 space-y-3.5">
              {BEFORE.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[14px] leading-relaxed text-ink-700 dark:text-ink-300"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 ring-1 ring-rose-200 dark:bg-rose-500/20 dark:text-rose-300 dark:ring-rose-500/30">
                    <X className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="hidden items-center justify-center lg:flex">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-900 shadow-sm dark:border-ink-800 dark:bg-ink-900 dark:text-ink-50">
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-center justify-center lg:hidden">
            <div className="flex h-9 w-9 rotate-90 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-900 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-50">
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 dark:border-emerald-500/30 dark:bg-emerald-500/5"
          >
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                After
              </span>
              <span className="text-sm font-semibold text-ink-700 dark:text-ink-300">
                AnytimeHire
              </span>
            </div>
            <ul className="mt-5 space-y-3.5">
              {AFTER.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[14px] leading-relaxed text-ink-700 dark:text-ink-300"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-1 ring-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:ring-emerald-500/30">
                    <Check className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-14">
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_1fr_1.4fr]">
            <ScoreBlock label="Trust score" current={86} max={100} delta="+14" />
            <ScoreBlock label="Communication" current={76} max={100} delta="+8" />

            <div className="rounded-2xl border border-ink-200 bg-white p-6 dark:border-ink-800 dark:bg-ink-900">
              <h3 className="font-display text-xl font-semibold tracking-tight text-ink-900 dark:text-ink-50">
                Every score is explainable.
                <br />
                Every decision is defensible.
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-600 dark:text-ink-400">
                We don't trust a 'good feeling' about this one. AnytimeHire
                scores every response across 4 dimensions, ties the score to
                the moment in the transcript, and shows you the evidence — so
                every decision is defensible to the founder, the board, and the
                regulator.
              </p>
            </div>
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-2">
            <ScoreBlock label="Adaptability" current={99} max={100} delta="+19" />
            <ScoreBlock label="Technical depth" current={82} max={100} delta="+11" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ScoreBlock({
  label,
  current,
  max,
  delta,
}: {
  label: string;
  current: number;
  max: number;
  delta: string;
}) {
  const pct = (current / max) * 100;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border border-ink-200 bg-white p-6 dark:border-ink-800 dark:bg-ink-900"
    >
      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500 dark:text-ink-400">
        {label}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-display text-3xl font-semibold tracking-tight text-ink-900 dark:text-ink-50">
          {current}
        </span>
        <span className="text-sm font-medium text-ink-400 dark:text-ink-500">
          / {max}
        </span>
        <span className="ml-auto rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
          {delta}
        </span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400"
        />
      </div>
    </motion.div>
  );
}
