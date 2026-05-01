"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Bot,
  Compass,
  ShieldCheck,
  Layers,
  Languages,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const FEATURES = [
  {
    icon: FileText,
    title: "AI JD Generator",
    body:
      "Generate role-specific job descriptions in seconds — fully customisable, with the right interview rubric attached automatically.",
  },
  {
    icon: Bot,
    title: "AI Avatar Interviewer",
    body:
      "A conversational avatar interviewer that adapts in real time to each candidate's answers, follow-ups, and depth signals.",
  },
  {
    icon: Compass,
    title: "3-Dimensional Scoring",
    body:
      "Every candidate is scored on Trust, Integrity, and Communication — with evidence quotes pulled directly from the interview.",
  },
  {
    icon: ShieldCheck,
    title: "AI Proctoring Suite",
    body:
      "Webcam, face match, tab-switch detection, copy-paste signals, and second-person detection — flagged, not auto-rejected.",
  },
  {
    icon: Layers,
    title: "ATS Integrations",
    body:
      "Push shortlists and scores into Greenhouse, Lever, Ashby, and Workday. Bidirectional sync. Webhook events for everything.",
  },
  {
    icon: Languages,
    title: "14-Language Support",
    body:
      "Hindi, Tamil, Telugu, Kannada, Bengali, Marathi — and 8 more. Multilingual flows for India-wide and global hiring.",
  },
];

export function Features() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>Built for scale</SectionLabel>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-ink-900 dark:text-ink-50 sm:text-5xl">
            Built for enterprise hiring at scale.
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-600 dark:text-ink-400">
            Everything your talent team needs to move faster, hire smarter, and
            defend every decision with data.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl border border-ink-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-[0_24px_48px_-24px_rgba(16,24,40,0.18)] dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-500/40 dark:hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-500/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100 dark:bg-brand-400/15"
              />
              <div className="relative">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-transform group-hover:-rotate-3 dark:bg-brand-500/15 dark:text-brand-300 dark:ring-brand-500/30">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink-900 dark:text-ink-50">
                  {f.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-600 dark:text-ink-400">
                  {f.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
