"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

const ITEMS = [
  {
    q: "How does the AI interview actually work?",
    a: "A conversational agent joins the candidate over video, asks scenario and technical questions tailored to the JD, and follows up based on their answers — the way a senior engineer would. Everything is transcribed, scored against the rubric, and available for you to review.",
  },
  {
    q: "Can candidates cheat their way through it?",
    a: "We surface the signals — tab-switching, face-match drift, second-person-in-frame, copy-paste patterns, abnormal answer timing — but we don't auto-reject. You see the flags in the evaluation dashboard and make the call.",
  },
  {
    q: "Is the scoring actually fair?",
    a: "Every candidate for a given role gets the same rubric, same question pool, same scoring dimensions. No hidden criteria, no 'gut feel'. Every score has evidence — a direct quote or behavioural observation — attached.",
  },
  {
    q: "Does it integrate with our ATS?",
    a: "Yes. We push shortlists, scores, and transcripts into Greenhouse, Lever, Ashby, and Workday. Candidate data flows in via standard fields; scores flow out via custom fields and webhooks.",
  },
  {
    q: "What about data privacy?",
    a: "Candidate data is encrypted at rest and in transit, retained only for the duration you configure, and never used to train external models. SOC 2 Type II certified, GDPR and DPDP compliant.",
  },
  {
    q: "How fast can we get started?",
    a: "Start the self-demo on this page in under a minute. For a live pilot, teams typically go from intro call to first role screened in 3–5 business days.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 lg:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-ink-900 dark:text-ink-50 sm:text-5xl">
              The things teams always ask.
            </h2>
          </div>

          <div className="mt-12 divide-y divide-ink-200 rounded-2xl border border-ink-200 bg-white dark:divide-ink-800 dark:border-ink-800 dark:bg-ink-900">
            {ITEMS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="pr-6 text-[15px] font-medium text-ink-900 dark:text-ink-50">
                      {item.q}
                    </span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink-50 text-ink-700 dark:bg-ink-800 dark:text-ink-300">
                      {isOpen ? (
                        <Minus className="h-3.5 w-3.5" />
                      ) : (
                        <Plus className="h-3.5 w-3.5" />
                      )}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink-600 dark:text-ink-400">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
