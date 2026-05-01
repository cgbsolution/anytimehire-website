"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Star,
  Building2,
  Zap,
  Lock,
  Sparkles,
  Play,
  ShieldCheck,
} from "lucide-react";

const STATS = [
  { value: "94%", label: "Time-to-hire reduction" },
  { value: "2M+", label: "AI Interviews conducted" },
  { value: "247", label: "Simultaneous interviews" },
  { value: "₹75L+", label: "Avg quarterly ROI saved" },
];

const TRUST_ROW_1 = [
  { icon: Star, text: "Trusted by 500+ Enterprises" },
  { icon: Building2, text: "DPDP Act Compliant" },
  { icon: Zap, text: "Setup in 30 Minutes" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-20">
      <div aria-hidden className="absolute inset-0 hero-grid" />
      <div
        aria-hidden
        className="absolute inset-x-0 -top-40 h-[600px] bg-gradient-to-b from-brand-100/50 via-brand-50/20 to-transparent blur-2xl dark:from-brand-500/20 dark:via-brand-500/10"
      />

      <div className="container-page relative">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* Left column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-700 backdrop-blur dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              AI-Powered Enterprise Hiring Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-6 text-balance font-display text-[44px] font-semibold leading-[1.02] tracking-[-0.03em] text-ink-900 dark:text-ink-50 sm:text-[58px] lg:text-[68px]"
            >
              Screen{" "}
              <span className="text-brand-600 dark:text-brand-400">500</span>{" "}
              <span className="text-brand-600 dark:text-brand-400">
                Candidates
              </span>
              <br />
              While Your Team{" "}
              <span className="text-brand-600 dark:text-brand-400">
                Sleeps Tonight.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-600 dark:text-ink-400"
            >
              AnytimeHire's AI avatar conducts structured interviews for
              hundreds of candidates simultaneously — scoring them on Fit,
              Trust, Integrity & Communication — and delivers a ranked
              shortlist before your team opens their laptops.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-ink-700 dark:text-ink-300"
            >
              {TRUST_ROW_1.map((t, i) => (
                <div key={t.text} className="flex items-center gap-2">
                  <t.icon
                    className={`h-4 w-4 ${
                      i === 0
                        ? "fill-amber-400 text-amber-500"
                        : i === 2
                          ? "text-brand-500"
                          : "text-ink-500 dark:text-ink-400"
                    }`}
                  />
                  <span>{t.text}</span>
                  {i < TRUST_ROW_1.length - 1 && (
                    <span className="hidden h-3 w-px bg-ink-200 sm:inline-block dark:bg-ink-700" />
                  )}
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-2.5 flex items-center gap-2 text-[13px] text-ink-700 dark:text-ink-300"
            >
              <Lock className="h-4 w-4 text-amber-600" />
              SOC 2 Certified
            </motion.div>

            {/* Stat cards row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4"
            >
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-ink-200 bg-white p-4 text-center transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-[0_16px_32px_-16px_rgba(16,24,40,0.18)] dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-500/40"
                >
                  <div className="font-display text-2xl font-semibold tracking-tight text-brand-700 dark:text-brand-300 sm:text-[26px]">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[11px] leading-tight text-ink-600 dark:text-ink-400">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="#book-demo"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-brand-600 px-6 text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(10,41,34,0.08),0_0_0_1px_rgba(12,124,90,0.4)_inset] transition-all hover:bg-brand-700 hover:shadow-[0_10px_28px_-8px_rgba(12,124,90,0.5)]"
              >
                <Sparkles className="h-4 w-4" />
                Claim 5 Free Credits
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#how-it-works"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-ink-200 bg-white px-6 text-[15px] font-semibold text-ink-900 transition-all hover:border-ink-300 hover:bg-ink-50 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-50 dark:hover:border-ink-700 dark:hover:bg-ink-800"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                See How It Works
              </a>
            </motion.div>
          </div>

          {/* Right column — booking form */}
          <motion.div
            id="book-demo"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <BookDemoCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BookDemoCard() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    const name = `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, name, source: "landing-hero" }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Something went wrong");
      }
      setDone(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-brand-200/40 via-brand-100/30 to-transparent blur-2xl dark:from-brand-500/20 dark:via-brand-500/10"
      />
      <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-[0_30px_60px_-30px_rgba(16,24,40,0.18)] dark:border-ink-800 dark:bg-ink-900 sm:p-7">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
          🎁 Free Trial — No Credit Card
        </div>

        <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink-900 dark:text-ink-50">
          Book Demo & Get
          <br />5 Free Credits
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
          An AnytimeHire specialist will reach you within 2 business hours to
          activate your free account.
        </p>

        {/* Social-proof banner */}
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-ink-200 bg-cream-50 px-3 py-2 dark:border-ink-800 dark:bg-ink-950">
          <div className="flex -space-x-1.5">
            {[
              { i: "RS", h: 220 },
              { i: "AK", h: 280 },
              { i: "NP", h: 340 },
              { i: "VT", h: 160 },
            ].map((p, idx) => (
              <span
                key={idx}
                className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-[9px] font-semibold text-white dark:border-ink-950"
                style={{ background: `hsl(${p.h} 60% 35%)` }}
              >
                {p.i}
              </span>
            ))}
          </div>
          <div className="text-[12px] text-ink-700 dark:text-ink-300">
            <span className="font-semibold text-ink-900 dark:text-ink-50">
              38 companies
            </span>{" "}
            started free trials this week
          </div>
        </div>

        {done ? (
          <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center dark:border-emerald-500/30 dark:bg-emerald-500/10">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <p className="mt-3 font-display text-base font-semibold text-emerald-900 dark:text-emerald-200">
              You're in. We'll reach out within 2 business hours.
            </p>
            <button
              onClick={() => setDone(false)}
              className="mt-3 text-xs font-medium text-emerald-800 underline-offset-4 hover:underline dark:text-emerald-200"
            >
              Submit another request
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-5 space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <Field label="First name" name="first_name" placeholder="Priya" required />
              <Field label="Last name" name="last_name" placeholder="Sharma" required />
            </div>
            <Field
              label="Work email"
              name="email"
              type="email"
              placeholder="priya@company.com"
              required
            />
            <Field label="Phone" name="phone" type="tel" placeholder="+91 98765 43210" required />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Company" name="company" placeholder="Your company" required />
              <SelectField
                label="Company size"
                name="company_size"
                options={["1–50", "51–200", "201–1,000", "1,000+"]}
              />
            </div>
            <SelectField
              label="Monthly hiring volume"
              name="monthly_volume"
              options={[
                "1–10 candidates",
                "11–50 candidates",
                "51–200 candidates",
                "200+ candidates",
              ]}
            />

            {error && (
              <p className="text-xs text-rose-600 dark:text-rose-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-700 px-6 text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(10,41,34,0.08),0_0_0_1px_rgba(12,124,90,0.4)_inset] transition-all hover:bg-brand-800 hover:shadow-[0_10px_28px_-8px_rgba(12,124,90,0.5)] disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Book My Free Demo"}
              {!submitting && (
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              )}
            </button>

            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-[11px] text-ink-500 dark:text-ink-400">
              <span className="inline-flex items-center gap-1">
                <Lock className="h-3 w-3" />
                No credit card
              </span>
              <span className="text-ink-300 dark:text-ink-700">·</span>
              <span>DPDP compliant</span>
              <span className="text-ink-300 dark:text-ink-700">·</span>
              <span>Data stays in India</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={`hero-${name}`}
        className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-600 dark:text-ink-400"
      >
        {label}
        {required && <span className="ml-1 text-rose-500">*</span>}
      </label>
      <input
        id={`hero-${name}`}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-1.5 h-11 w-full rounded-xl border border-ink-200 bg-white px-3 text-[14px] text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-ink-800 dark:bg-ink-950 dark:text-ink-50 dark:placeholder:text-ink-500"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label
        htmlFor={`hero-${name}`}
        className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-600 dark:text-ink-400"
      >
        {label}
      </label>
      <select
        id={`hero-${name}`}
        name={name}
        defaultValue=""
        className="mt-1.5 h-11 w-full rounded-xl border border-ink-200 bg-white px-3 text-[14px] text-ink-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-ink-800 dark:bg-ink-950 dark:text-ink-50"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
