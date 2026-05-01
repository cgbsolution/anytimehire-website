"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";

const TIERS = [
  {
    name: "Starter",
    price: "₹9,999",
    period: "per role / month",
    blurb: "For teams running 1–3 roles a month and validating the platform.",
    features: [
      "Up to 50 candidates / role",
      "AI JD generator + 14-language interviews",
      "3-dimensional scoring & evidence",
      "Email support · 24h response",
      "Greenhouse, Lever, Ashby integrations",
    ],
    cta: "Start Free Trial",
    href: "#contact",
    accent: false,
  },
  {
    name: "Growth",
    price: "₹29,999",
    period: "per role / month",
    blurb: "For talent teams hiring 5–25 roles a quarter, with full proctoring.",
    features: [
      "Up to 500 candidates / role",
      "Everything in Starter, plus —",
      "Full AI proctoring suite (face match, tab-switch, paste, etc.)",
      "Custom rubrics & weighting per role",
      "Priority chat support · 4h response",
      "Slack & Workday integration",
    ],
    cta: "Start Free Trial",
    href: "#contact",
    accent: true,
  },
  {
    name: "Custom",
    price: "Talk to us",
    period: "annual contract",
    blurb: "For 100+ roles, regulated industries, and on-prem deployments.",
    features: [
      "Unlimited candidates",
      "Dedicated success manager",
      "Custom SAML/SSO + SCIM",
      "SOC 2 audit pack & DPA",
      "On-prem / VPC deployment available",
      "Roadmap influence & co-build access",
    ],
    cta: "Talk to Sales",
    href: "#contact",
    accent: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>Pricing</SectionLabel>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-ink-900 dark:text-ink-50 sm:text-5xl">
            Predictable pricing.
            <br />
            No per-seat surprises.
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-600 dark:text-ink-400">
            Start with 5 free credits — no card required. Upgrade when you're
            ready.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className={`relative flex h-full flex-col rounded-3xl border p-7 transition-all hover:-translate-y-0.5 ${
                tier.accent
                  ? "border-brand-500 bg-gradient-to-br from-brand-50 to-white shadow-[0_30px_60px_-30px_rgba(12,124,90,0.4)] dark:border-brand-500/40 dark:from-brand-500/10 dark:to-ink-900"
                  : "border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900"
              }`}
            >
              {tier.accent && (
                <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-white shadow-sm">
                  <Sparkles className="h-3 w-3" />
                  Most popular
                </span>
              )}
              <div className="text-sm font-semibold uppercase tracking-[0.12em] text-ink-700 dark:text-ink-300">
                {tier.name}
              </div>
              <div className="mt-5 flex items-baseline gap-2">
                <div className="font-display text-4xl font-semibold tracking-tight text-ink-900 dark:text-ink-50">
                  {tier.price}
                </div>
              </div>
              <div className="text-[12px] text-ink-500 dark:text-ink-400">
                {tier.period}
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-600 dark:text-ink-400">
                {tier.blurb}
              </p>
              <ul className="mt-6 space-y-3">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-[14px] leading-relaxed text-ink-700 dark:text-ink-300"
                  >
                    <span
                      className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-1 ${
                        tier.accent
                          ? "bg-brand-100 text-brand-700 ring-brand-200 dark:bg-brand-500/20 dark:text-brand-300 dark:ring-brand-500/30"
                          : "bg-emerald-50 text-emerald-600 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30"
                      }`}
                    >
                      <Check className="h-3 w-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-7">
                <Link
                  href={tier.href}
                  className={`inline-flex h-11 w-full items-center justify-center rounded-full px-5 text-[14px] font-semibold transition-all ${
                    tier.accent
                      ? "bg-brand-600 text-white hover:bg-brand-700"
                      : "bg-ink-900 text-white hover:bg-ink-800 dark:bg-ink-50 dark:text-ink-900 dark:hover:bg-white"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
