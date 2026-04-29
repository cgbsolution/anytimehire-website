"use client";

import { motion } from "framer-motion";
import {
  FileText,
  UserPlus,
  Bot,
  ListChecks,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const STEPS = [
  {
    icon: FileText,
    title: "Describe the role",
    body: "Paste a sentence, upload an old JD, or start from scratch. AI drafts responsibilities, skills, and the interview plan — you tweak what matters.",
    accent: "from-brand-400/20 to-brand-500/10",
  },
  {
    icon: UserPlus,
    title: "Invite candidates",
    body: "Share a link or upload a list. Candidates interview on their time — code editor, webcam, face match, cheating signals, all handled.",
    accent: "from-emerald-400/20 to-emerald-500/10",
  },
  {
    icon: Bot,
    title: "AI runs the interview",
    body: "A conversational agent asks scenario and technical questions, adapts to answers, and scores in real time — with evidence and transcripts.",
    accent: "from-amber-400/20 to-amber-500/10",
  },
  {
    icon: ListChecks,
    title: "Review a ranked shortlist",
    body: "Fit scores, dimensional breakdowns, cheating flags, full transcripts. You spend minutes deciding, not days shortlisting.",
    accent: "from-rose-400/20 to-rose-500/10",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-ink-900 dark:text-ink-50 sm:text-5xl">
            Four steps, one honest shortlist.
          </h2>
          <p className="mt-4 text-lg text-ink-600 dark:text-ink-400">
            No more Monday-morning resume stacks. Describe the role, share a link,
            and get ranked candidates with evidence.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
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
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-ink-900 text-white dark:bg-ink-50 dark:text-ink-900">
                    <step.icon className="h-4 w-4" />
                  </span>
                  <span className="tabular text-xs font-semibold text-ink-400 dark:text-ink-500">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink-900 dark:text-ink-50">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
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
