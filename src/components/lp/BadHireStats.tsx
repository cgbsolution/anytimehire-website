"use client";

import { motion } from "framer-motion";
import { TrendingDown, Clock, AlertTriangle, Database } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const STATS = [
  {
    icon: TrendingDown,
    value: "₹8.2L",
    title: "Avg. Cost Per Wrong Hire",
    body:
      "Salary, training, ramp-up, then exit — replacing a wrong hire eats up to 18 months of total comp.",
  },
  {
    icon: Clock,
    value: "42",
    title: "Days Avg. Time-to-Hire in India",
    body:
      "Every extra day, your best candidates lapse, accept other offers, or simply ghost the funnel.",
  },
  {
    icon: AlertTriangle,
    value: "68%",
    title: "Of HR Time Wasted on Logistics",
    body:
      "Resume scoring, scheduling, screening, no-shows — your team spends more time chasing than choosing.",
  },
  {
    icon: Database,
    value: "₹6L",
    title: "Data Behind Most Decisions",
    body:
      "Most decisions rely on a 30-second resume scan and a 'gut feel' — not standardised, not auditable.",
  },
];

export function BadHireStats() {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>The cost of getting it wrong</SectionLabel>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-ink-900 dark:text-ink-50 sm:text-5xl">
            A bad hire costs you{" "}
            <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent dark:from-brand-300 dark:to-brand-500">
              ₹18–25 Lakhs.
            </span>
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-600 dark:text-ink-400">
            And most enterprises make 3–4 of them every quarter. Here's what's
            actually happening inside your hiring funnel.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="rounded-2xl border border-ink-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-24px_rgba(16,24,40,0.18)] dark:border-ink-800 dark:bg-ink-900"
            >
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
                  <stat.icon className="h-4 w-4" />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500 dark:text-ink-400">
                  Stat {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink-900 dark:text-ink-50">
                {stat.value}
              </div>
              <div className="mt-1 text-sm font-semibold text-ink-800 dark:text-ink-100">
                {stat.title}
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-600 dark:text-ink-400">
                {stat.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
