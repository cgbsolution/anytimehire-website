"use client";

import { motion } from "framer-motion";
import { Sparkles, LinkIcon, Bot, ListChecks } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const STEPS = [
  {
    icon: Sparkles,
    label: "AI Generates Your JD",
    title: "Generates Your JD",
    body:
      "Paste a 1-line role brief. AnytimeHire drafts responsibilities, required skills, the rubric, and the interview plan — all in under 30 seconds.",
    accent: "from-brand-400/25 to-brand-500/10",
  },
  {
    icon: LinkIcon,
    label: "Candidates Get a Link",
    title: "Candidates Get a Link",
    body:
      "Share a single link. Candidates self-schedule and interview on their own time — face match, code editor, and integrity signals all built in.",
    accent: "from-emerald-400/25 to-emerald-500/10",
  },
  {
    icon: Bot,
    label: "AI Interviews Them 24×7",
    title: "AI Interviews Them",
    body:
      "A conversational AI runs structured interviews — scenario, technical, behavioural — and adapts follow-ups based on each answer in real time.",
    accent: "from-amber-400/25 to-amber-500/10",
  },
  {
    icon: ListChecks,
    label: "You Get a Ranked List",
    title: "You Get a Ranked List",
    body:
      "Open the dashboard to a fit-scored shortlist with evidence, transcripts, and integrity flags. You decide in minutes, not days.",
    accent: "from-rose-400/25 to-rose-500/10",
  },
];

export function Process() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-ink-900 dark:text-ink-50 sm:text-5xl">
            From job post to ranked shortlist
            <br />
            in four automated steps.
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-600 dark:text-ink-400">
            No setup calls. No training your team. Just post a JD and AnytimeHire
            handles the rest — from JD to interviews to a shortlist.
          </p>
        </div>

        <div className="relative mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-ink-200 to-transparent lg:block dark:via-ink-800"
          />
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl border border-ink-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-24px_rgba(16,24,40,0.18)] dark:border-ink-800 dark:bg-ink-900 dark:hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)]"
            >
              <div
                aria-hidden
                className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${step.accent} blur-2xl`}
              />
              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ink-900 text-white shadow-[0_0_0_4px_var(--color-surface)] dark:bg-ink-50 dark:text-ink-900">
                    <step.icon className="h-4 w-4" />
                  </span>
                  <span className="tabular text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400 dark:text-ink-500">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <span className="mt-5 inline-flex rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                  {step.label}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold tracking-tight text-ink-900 dark:text-ink-50">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-600 dark:text-ink-400">
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
