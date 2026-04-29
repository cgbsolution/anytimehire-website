"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Scale,
  ShieldCheck,
  Target,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const FEATURES = [
  {
    icon: Zap,
    title: "Faster shortlisting",
    body: "Screen 500 applicants in the time it used to take to screen 5. Rankings arrive with evidence — not hunches.",
    stat: "9×",
    statLabel: "faster than manual",
  },
  {
    icon: Scale,
    title: "Zero-bias scoring",
    body: "Structured rubrics, identical questions per role, no 'gut feel' stage. Fair, explainable, auditable.",
    stat: "100%",
    statLabel: "consistent rubric",
  },
  {
    icon: ShieldCheck,
    title: "Cheating detection",
    body: "Webcam, face match, tab-switching, second-person detection, copy-paste signals — flagged, not blocked.",
    stat: "7",
    statLabel: "integrity signals",
  },
  {
    icon: Target,
    title: "Skill-depth analysis",
    body: "Follow-up questions probe reasoning, not recall. You see how a candidate thinks, with direct quotes.",
    stat: "5★",
    statLabel: "rubric per skill",
  },
];

export function FeatureGrid() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel>Outcomes</SectionLabel>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-ink-900 dark:text-ink-50 sm:text-5xl">
            Built to compress the hiring funnel.
          </h2>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="group relative rounded-2xl border border-ink-200 bg-white p-8 transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-24px_rgba(16,24,40,0.18)] dark:border-ink-800 dark:bg-ink-900 dark:hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500 ring-1 ring-brand-100 dark:bg-brand-500/15 dark:text-brand-300 dark:ring-brand-500/30">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-ink-900 dark:text-ink-50">
                    {f.title}
                  </h3>
                  <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink-600 dark:text-ink-400">
                    {f.body}
                  </p>
                </div>
                <div className="hidden shrink-0 text-right sm:block">
                  <div className="font-display text-4xl font-semibold tracking-tight text-ink-900 dark:text-ink-50">
                    {f.stat}
                  </div>
                  <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500 dark:text-ink-400">
                    {f.statLabel}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
