"use client";

import { motion } from "framer-motion";
import { TrendingUp, IndianRupee, Users, Sparkles } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const BIG_STATS = [
  { value: "500+", label: "Enterprise Companies" },
  { value: "2M+", label: "AI Interviews Conducted" },
  { value: "94%", label: "Hiring Decision Defensible" },
  { value: "12", label: "Countries & Counting" },
];

const ROI = [
  {
    icon: Users,
    value: "37×",
    title: "HR Screening Hours Saved",
    body:
      "1 recruiter on AnytimeHire replaces 37 recruiter-hours per week of manual screening — paid time, every week.",
  },
  {
    icon: IndianRupee,
    value: "₹1,87,500",
    title: "Recruiter Cost Savings",
    body:
      "On average, our customers reclaim ₹1.87L per role per month in screen-stage time — billed against agency rates.",
  },
  {
    icon: Sparkles,
    value: "₹17,50,000",
    title: "Agency Fee Elimination",
    body:
      "Replace agency contingency fees on hires you would have outsourced — direct savings to your hiring budget.",
  },
  {
    icon: TrendingUp,
    value: "+36,90,000",
    title: "Bad-Hire Reduction (Est. 2 hires)",
    body:
      "Reduce wrong-hire rate by 2 every quarter — based on a ₹18.5L average cost per bad hire across 250 customers.",
  },
  {
    icon: Sparkles,
    value: "+39,997",
    title: "AnytimeHire Annual Plan Cost",
    body:
      "What you'd pay AnytimeHire annually — already netted against the savings above. Pricing is predictable, per-role.",
  },
  {
    icon: TrendingUp,
    value: "₹1,80,000",
    title: "Productivity Gain (10 days faster)",
    body:
      "Bringing roles to closure ~10 days faster compounds across the org — output value you can attribute to AnytimeHire.",
  },
];

export function StatsAndROI() {
  return (
    <>
      <section className="relative bg-ink-950 py-16 lg:py-20">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
            {BIG_STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className="border-r border-ink-800 px-4 text-center last:border-r-0 lg:px-8"
              >
                <div className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                  {s.value}
                </div>
                <div className="mt-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-400">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <SectionLabel>The math</SectionLabel>
            <h2 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-ink-900 dark:text-ink-50 sm:text-5xl">
              The math on switching to AnytimeHire.
            </h2>
            <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-600 dark:text-ink-400">
              Based on a mid-sized enterprise hiring 15 roles/quarter with 50
              candidates per role. Your actual ROI is likely higher.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ROI.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
                className="rounded-2xl border border-ink-200 bg-white p-6 dark:border-ink-800 dark:bg-ink-900"
              >
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
                    <item.icon className="h-4 w-4" />
                  </span>
                </div>
                <div className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-900 dark:text-ink-50">
                  {item.value}
                </div>
                <div className="mt-1 text-sm font-semibold text-ink-800 dark:text-ink-100">
                  {item.title}
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-600 dark:text-ink-400">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-ink-950 to-ink-900 p-8 text-white sm:p-12"
          >
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400">
                  Net ROI per quarter
                </div>
                <div className="mt-2 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
                  ₹75,47,503
                </div>
                <p className="mt-2 max-w-md text-sm text-ink-300">
                  In the median customer, AnytimeHire pays back its annual cost
                  inside the first week of the first quarter.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">
                <Sparkles className="h-4 w-4" />
                Payback in Week 1
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
