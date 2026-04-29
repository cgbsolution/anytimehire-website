"use client";

import { motion } from "framer-motion";
import { Sparkles, Check, FileText, Upload } from "lucide-react";

export function JDBuilderSnippet() {
  return (
    <div className="relative rounded-2xl border border-ink-200 bg-white p-5 shadow-[0_24px_48px_-24px_rgba(16,24,40,0.18)] dark:border-ink-800 dark:bg-ink-900 dark:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)]">
      {/* AI generation callout */}
      <div className="mb-4 flex items-start gap-3 rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-brand-50/40 p-3 dark:border-brand-500/30 dark:from-brand-500/15 dark:via-ink-900 dark:to-brand-500/10">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-white">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <div className="text-[13px] font-semibold text-ink-900 dark:text-ink-50">
            Describe the role — we&apos;ll draft the rest
          </div>
          <div className="mt-1 text-[11px] text-ink-600 dark:text-ink-400">
            Paste notes, upload an old JD, or type a one-liner. AI builds
            responsibilities, skills, and interview plan.
          </div>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2">
        {[
          { icon: Upload, label: "Upload JD" },
          { icon: FileText, label: "AI generate" },
        ].map((a, i) => (
          <motion.button
            key={a.label}
            whileHover={{ y: -2 }}
            className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-medium transition-colors ${
              i === 1
                ? "border-brand-500 bg-brand-500 text-white"
                : "border-ink-200 bg-white text-ink-700 hover:border-ink-300 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-300 dark:hover:border-ink-700"
            }`}
          >
            <a.icon className="h-3.5 w-3.5" />
            {a.label}
          </motion.button>
        ))}
      </div>

      <div className="space-y-3">
        <Field label="Job title" value="Senior Frontend Engineer" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Department" value="Engineering" />
          <Field label="Location" value="Bengaluru (Hybrid)" />
        </div>
        <div>
          <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-500 dark:text-ink-400">
            Experience
          </div>
          <div className="relative h-2 rounded-full bg-ink-100 dark:bg-ink-800">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "45%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute left-[15%] h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
            />
            <div className="absolute left-[15%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-500 bg-white shadow dark:bg-ink-900" />
            <div className="absolute left-[60%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-500 bg-white shadow dark:bg-ink-900" />
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-ink-500 tabular dark:text-ink-400">
            <span>4 yrs</span>
            <span className="font-semibold text-ink-800 dark:text-ink-200">4 – 7 years</span>
            <span>7 yrs</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-3 text-[11px] text-ink-500 dark:border-ink-800 dark:text-ink-400">
        <span className="inline-flex items-center gap-1">
          <Check className="h-3 w-3 text-emerald-500" /> Draft auto-saved
        </span>
        <span className="font-semibold text-brand-500 dark:text-brand-400">Step 1 of 3 →</span>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-500 dark:text-ink-400">
        {label}
      </div>
      <div className="rounded-lg border border-ink-200 bg-white px-3 py-2 text-[13px] text-ink-900 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-50">
        {value}
      </div>
    </div>
  );
}
