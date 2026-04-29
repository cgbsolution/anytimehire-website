"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { JDBuilderSnippet } from "@/components/product-ui/JDBuilderSnippet";

const HIGHLIGHTS = [
  "Paste a sentence — AI drafts the full JD in seconds",
  "Upload an old JD to reuse tone and structure",
  "Guided wizard: basic info → responsibilities → interview setup",
  "Auto-configure skill groups with mandatory/optional criteria",
  "Pick interview capabilities: code editor, webcam, face match",
];

export function JDSection() {
  return (
    <section id="product" className="relative py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 h-[600px] bg-gradient-to-b from-brand-50/60 to-transparent dark:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden dark:block"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 40%, rgba(70,95,255,0.10) 0%, transparent 70%)",
        }}
      />
      <div className="container-page">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <SectionLabel>Create a JD</SectionLabel>
            <h2 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-ink-900 dark:text-ink-50 sm:text-[42px] sm:leading-[1.1]">
              Go from a sentence to a <br className="hidden sm:block" />
              battle-ready JD.
            </h2>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-ink-600 dark:text-ink-400">
              A 3-step wizard that writes itself. Describe the role in a line, or
              upload an old JD — AnytimeHire drafts responsibilities, interview
              questions, and the skill rubric your team can trust.
            </p>

            <ul className="mt-7 space-y-3">
              {HIGHLIGHTS.map((h, i) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, x: -8 }}
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
                href="/demo/create-jd"
                className="group inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-ink-800 dark:bg-ink-50 dark:text-ink-900 dark:hover:bg-white"
              >
                <Sparkles className="h-4 w-4" />
                Try the JD builder
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <JDBuilderSnippet />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
