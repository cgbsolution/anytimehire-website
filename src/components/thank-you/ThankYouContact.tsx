"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Info,
  ShieldCheck,
} from "lucide-react";

export function ThankYouContact() {
  const params = useSearchParams();
  const rawName = params.get("name")?.trim() || "";
  const email = params.get("email")?.trim() || "";
  const firstName = rawName ? rawName.split(" ")[0] : "there";

  return (
    <div className="mx-auto max-w-xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl border border-ink-200 bg-white p-8 shadow-[0_30px_60px_-30px_rgba(16,24,40,0.18)] dark:border-ink-800 dark:bg-ink-900 sm:p-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-brand-100/60 blur-2xl dark:bg-brand-500/15"
        />

        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 240,
            damping: 14,
            delay: 0.15,
          }}
          className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200 dark:bg-emerald-500/15 dark:ring-emerald-500/30"
        >
          <Check
            className="h-8 w-8 text-emerald-600 dark:text-emerald-300"
            strokeWidth={2.5}
          />
        </motion.div>

        <h1 className="mt-6 text-center font-display text-3xl font-semibold tracking-tight text-ink-900 dark:text-ink-50 sm:text-[34px]">
          You're on our list, {firstName}.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-center text-[15px] leading-relaxed text-ink-600 dark:text-ink-400">
          An AnytimeHire specialist will reach you within{" "}
          <strong className="text-ink-900 dark:text-ink-50">
            2 business hours
          </strong>{" "}
          to activate your free account and walk you through the platform.
        </p>

        <div className="mt-7 flex items-start gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-4 dark:border-brand-500/30 dark:bg-brand-500/10">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-300" />
          <p className="text-[14px] leading-relaxed text-ink-800 dark:text-ink-200">
            Want to skip the wait?{" "}
            <strong className="text-brand-700 dark:text-brand-300">
              Book a 30-min demo slot now
            </strong>{" "}
            and get a live walkthrough + your 5 free interview credits
            instantly.
          </p>
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-ink-200 dark:bg-ink-800" />
          <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-ink-500 dark:text-ink-400">
            Skip the wait — book your slot
          </span>
          <div className="h-px flex-1 bg-ink-200 dark:bg-ink-800" />
        </div>

        <Link
          href="/booking"
          className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 text-[15px] font-semibold text-white shadow-[0_10px_28px_-10px_rgba(70,95,255,0.5)] transition-all hover:bg-brand-700 hover:shadow-[0_14px_32px_-10px_rgba(70,95,255,0.65)]"
        >
          <CalendarDays className="h-4 w-4" />
          Book my free demo slot
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <p className="mt-5 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-center text-[12px] text-ink-500 dark:text-ink-400">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>No card required</span>
          <span aria-hidden>·</span>
          <span>Reschedule anytime</span>
          <span aria-hidden>·</span>
          <span>We never share your details</span>
        </p>

        {email && (
          <p className="mt-3 text-center text-[12px] text-ink-500 dark:text-ink-500">
            Confirmation sent to{" "}
            <span className="font-medium text-ink-700 dark:text-ink-300">
              {email}
            </span>
            .
          </p>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-[12px] font-medium text-ink-500 underline-offset-4 hover:text-ink-800 hover:underline dark:text-ink-400 dark:hover:text-ink-200"
          >
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
