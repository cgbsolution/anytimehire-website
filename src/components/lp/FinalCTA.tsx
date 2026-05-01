"use client";

import { useState } from "react";
import { ArrowRight, ShieldCheck, Sparkles, CalendarDays } from "lucide-react";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section id="contact" className="py-16 lg:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 px-6 py-16 text-center sm:px-10 lg:px-16 lg:py-24">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, #5fd8b0 0%, transparent 55%), radial-gradient(circle at 80% 70%, #2cba8e 0%, transparent 55%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 70%)",
            }}
          />

          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
              <Sparkles className="h-3 w-3" />
              Ready when you are
            </span>
            <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your best hire is
              <br />
              one interview away.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              Let AnytimeHire run your first 50 AI interviews — completely free.
              No credit card. No commitment. See the ranked shortlist before you
              activate your free account.
            </p>
          </div>

          <div className="relative mx-auto mt-12 max-w-xl">
            <ContactForm />
            <div className="mt-6 flex flex-col items-center gap-3 text-center text-xs text-white/70 sm:flex-row sm:justify-center">
              <Link
                href="/booking"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-700 transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-8px_rgba(255,255,255,0.25)]"
              >
                <CalendarDays className="h-4 w-4" />
                Pick a 30-min slot instead
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <span className="hidden text-white/40 sm:inline">·</span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                SOC 2 Type II · DPDP & GDPR compliant
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "landing-final-cta" }),
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

  if (done) {
    return (
      <div className="rounded-3xl border border-white/20 bg-white/10 p-8 text-center text-white backdrop-blur">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-700">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <p className="mt-4 font-display text-xl font-semibold">
          Got it. We'll reach out within 24 hours.
        </p>
        <p className="mt-2 text-sm text-white/80">
          A confirmation has been sent to your inbox. Want to skip the wait?
        </p>
        <Link
          href="/booking"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
        >
          <CalendarDays className="h-4 w-4" />
          Book a slot now
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-white/20 bg-white/10 p-6 text-left backdrop-blur sm:p-7"
    >
      <h3 className="font-display text-lg font-semibold text-white">
        Book a Free Demo + Trial
      </h3>
      <p className="mt-1 text-sm text-white/75">
        Fill in your details and an AnytimeHire specialist will contact you
        within 2 business hours to activate your free 5-credit account.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Full name" name="name" placeholder="Priya Raghavan" required />
        <Field label="Phone" name="phone" type="tel" placeholder="+91 98XXXXXXXX" />
      </div>
      <div className="mt-3">
        <Field
          label="Work email"
          name="email"
          type="email"
          placeholder="priya@company.com"
          required
        />
      </div>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field
          label="Company"
          name="company"
          placeholder="Your company name"
          required
        />
        <SelectField
          label="Company size"
          name="company_size"
          options={["1–50", "51–200", "201–1,000", "1,000+"]}
        />
      </div>
      <div className="mt-3">
        <label
          htmlFor="lp-message"
          className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/80"
        >
          Tell us about your hiring
        </label>
        <textarea
          id="lp-message"
          name="message"
          rows={3}
          placeholder="Roles you're hiring, volume, current ATS…"
          className="mt-1.5 w-full rounded-xl border border-white/20 bg-white/10 p-3 text-[14px] text-white placeholder:text-white/50 outline-none transition-colors focus:border-white focus:bg-white/15 focus:ring-2 focus:ring-white/30"
        />
      </div>

      {error && <p className="mt-3 text-xs text-rose-200">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="group mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-[15px] font-semibold text-brand-700 transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-8px_rgba(255,255,255,0.25)] disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Book Demo & Get 5 Free Credits"}
        {!submitting && (
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        )}
      </button>
    </form>
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
        htmlFor={`lp-${name}`}
        className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/80"
      >
        {label}
        {required && <span className="ml-1 text-rose-200">*</span>}
      </label>
      <input
        id={`lp-${name}`}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-1.5 h-11 w-full rounded-xl border border-white/20 bg-white/10 px-3 text-[14px] text-white placeholder:text-white/50 outline-none transition-colors focus:border-white focus:bg-white/15 focus:ring-2 focus:ring-white/30"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={`lp-${name}`}
        className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/80"
      >
        {label}
        {required && <span className="ml-1 text-rose-200">*</span>}
      </label>
      <select
        id={`lp-${name}`}
        name={name}
        defaultValue=""
        required={required}
        className="mt-1.5 h-11 w-full appearance-none rounded-xl border border-white/20 bg-white/10 px-3 text-[14px] text-white outline-none transition-colors focus:border-white focus:bg-white/15 focus:ring-2 focus:ring-white/30 [&>option]:text-ink-900"
      >
        <option value="" disabled className="text-ink-400">
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
