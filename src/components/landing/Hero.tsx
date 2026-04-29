"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";
import { HeroProductPreview } from "@/components/product-ui/HeroProductPreview";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div aria-hidden className="absolute inset-0 hero-grid" />
      <div
        aria-hidden
        className="absolute inset-x-0 -top-40 h-[500px] bg-gradient-to-b from-brand-100/50 via-brand-50/20 to-transparent blur-2xl dark:from-brand-500/20 dark:via-brand-500/10"
      />

      <div className="container-page relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white/70 px-3 py-1 text-xs font-medium text-ink-700 backdrop-blur dark:border-ink-800 dark:bg-ink-900/60 dark:text-ink-300"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-500" />
              AI interviews that feel human — only faster
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 text-balance font-display text-[46px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-900 dark:text-ink-50 sm:text-[56px] lg:text-[64px]"
            >
              Hire at the speed <br className="hidden sm:block" />
              of AI.{" "}
              <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent dark:from-brand-300 dark:to-brand-500">
                Without the bias.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-6 max-w-xl text-balance text-[17px] leading-relaxed text-ink-600 dark:text-ink-400"
            >
              AnytimeHire writes your job descriptions, interviews every applicant,
              and hands you a ranked shortlist with evidence — all before your
              recruiter pours a second coffee.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
            >
              <LinkButton href="/demo" size="lg" className="group">
                Start the demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </LinkButton>
              <Link
                href="#product"
                className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-[15px] font-medium text-ink-800 hover:text-ink-900 dark:text-ink-200 dark:hover:text-ink-50"
              >
                See how it works
                <span aria-hidden>→</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.32 }}
              className="mt-10 flex items-center gap-6 text-xs text-ink-500 dark:text-ink-400"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[220, 280, 30, 340].map((h, i) => (
                    <div
                      key={i}
                      className="h-7 w-7 rounded-full border-2 border-white dark:border-ink-900"
                      style={{ background: `hsl(${h} 70% 55%)` }}
                    />
                  ))}
                </div>
                <span>
                  <span className="font-semibold text-ink-800 dark:text-ink-100">140+ teams</span>{" "}
                  screening with AnytimeHire
                </span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroProductPreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
