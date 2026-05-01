"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DashboardPreview } from "@/components/product-ui/DashboardPreview";

export function DashboardSection() {
  return (
    <section id="product" className="relative py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 h-[600px] bg-gradient-to-b from-brand-50/40 to-transparent dark:hidden"
      />
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>Product</SectionLabel>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-ink-900 dark:text-ink-50 sm:text-5xl">
            Everything you need to hire smarter,
            <br />
            in one powerful dashboard.
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-600 dark:text-ink-400">
            Real-time candidate scores, interview recordings, vetted shortlists,
            and ATS integrations — all in one intuitive interface.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14"
        >
          <DashboardPreview />
        </motion.div>
      </div>
    </section>
  );
}
