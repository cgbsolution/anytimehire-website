"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, ShieldCheck, CalendarDays } from "lucide-react";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="container-page">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <SectionLabel>Talk to us</SectionLabel>
            <h2 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-ink-900 dark:text-ink-50 sm:text-[42px] sm:leading-[1.1]">
              Tell us about your hiring,
              <br className="hidden sm:block" />
              we'll write back today.
            </h2>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ink-600 dark:text-ink-400">
              Drop your details and a quick note about what you're hiring for.
              An AnytimeHire specialist will reach out within 2 business hours
              with a tailored walkthrough — no auto-replies, no slide decks.
            </p>

            <ul className="mt-8 space-y-4 text-[14px]">
              <li className="flex items-center gap-3 text-ink-700 dark:text-ink-300">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 dark:bg-brand-500/15 dark:text-brand-300 dark:ring-brand-500/30">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <span>
                  Replies in <strong className="text-ink-900 dark:text-ink-50">under 2 hours</strong> on weekdays
                </span>
              </li>
              <li className="flex items-center gap-3 text-ink-700 dark:text-ink-300">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 dark:bg-brand-500/15 dark:text-brand-300 dark:ring-brand-500/30">
                  <Mail className="h-4 w-4" />
                </span>
                <a
                  href="mailto:rishabh.negi@artboxsolutions.com"
                  className="hover:text-ink-900 dark:hover:text-ink-50"
                >
                  rishabh.negi@artboxsolutions.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-ink-700 dark:text-ink-300">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 dark:bg-brand-500/15 dark:text-brand-300 dark:ring-brand-500/30">
                  <Phone className="h-4 w-4" />
                </span>
                <span>+91 98XXX XXXXX · Mon–Fri 09:00–18:00 IST</span>
              </li>
            </ul>

            <div className="mt-8 rounded-2xl border border-ink-200 bg-cream-50 p-4 text-[13px] text-ink-700 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-300">
              <div className="flex items-center gap-2 font-semibold text-ink-900 dark:text-ink-50">
                <CalendarDays className="h-4 w-4 text-brand-600" />
                Need a time on the calendar instead?
              </div>
              <p className="mt-1.5 leading-relaxed">
                Pick any 30-min slot and we'll send a Google Meet link.{" "}
                <Link
                  href="/booking"
                  className="font-semibold text-brand-700 underline-offset-2 hover:underline dark:text-brand-300"
                >
                  Open the booking calendar →
                </Link>
              </p>
            </div>
          </div>

          <ContactForm />
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
        body: JSON.stringify({ ...data, source: "home-contact" }),
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
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-brand-200/40 via-brand-100/30 to-transparent blur-2xl dark:from-brand-500/20 dark:via-brand-500/10"
      />
      <div className="rounded-3xl border border-ink-200 bg-white p-7 shadow-[0_30px_60px_-30px_rgba(16,24,40,0.18)] dark:border-ink-800 dark:bg-ink-900 sm:p-8">
        {done ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center dark:border-emerald-500/30 dark:bg-emerald-500/10">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <p className="mt-4 font-display text-lg font-semibold text-emerald-900 dark:text-emerald-200">
              Message received.
            </p>
            <p className="mt-2 text-sm text-emerald-800/80 dark:text-emerald-300/80">
              We'll be in touch within 2 business hours.
            </p>
            <button
              onClick={() => setDone(false)}
              className="mt-5 text-xs font-medium text-emerald-800 underline-offset-4 hover:underline dark:text-emerald-200"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <h3 className="font-display text-xl font-semibold tracking-tight text-ink-900 dark:text-ink-50">
                Send us a note
              </h3>
              <p className="mt-1 text-sm text-ink-600 dark:text-ink-400">
                We'll reply with next steps and a Google Meet link.
              </p>
            </div>

            <Field label="Full name" name="name" placeholder="Priya Raghavan" required />
            <Field
              label="Work email"
              name="email"
              type="email"
              placeholder="priya@company.com"
              required
            />
            <Field label="Phone" name="phone" type="tel" placeholder="+91 98XXX XXXXX" />

            <div>
              <label
                htmlFor="home-message"
                className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-500 dark:text-ink-400"
              >
                Message
              </label>
              <textarea
                id="home-message"
                name="message"
                rows={4}
                required
                placeholder="Roles you're hiring, volume, current ATS…"
                className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white p-3 text-[14px] text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-ink-800 dark:bg-ink-950 dark:text-ink-50 dark:placeholder:text-ink-500"
              />
            </div>

            {error && (
              <p className="text-xs text-rose-600 dark:text-rose-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(10,41,34,0.08),0_0_0_1px_rgba(12,124,90,0.4)_inset] transition-all hover:bg-brand-700 hover:shadow-[0_10px_28px_-8px_rgba(12,124,90,0.5)] disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Send message"}
              {!submitting && (
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              )}
            </button>
            <p className="text-center text-[11px] text-ink-500 dark:text-ink-400">
              By submitting, you agree to our{" "}
              <Link href="#" className="underline-offset-2 hover:underline">
                privacy policy
              </Link>
              .
            </p>
          </form>
        )}
      </div>
    </motion.div>
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
        htmlFor={`home-${name}`}
        className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-500 dark:text-ink-400"
      >
        {label}
        {required && <span className="ml-1 text-rose-500">*</span>}
      </label>
      <input
        id={`home-${name}`}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-1.5 h-11 w-full rounded-xl border border-ink-200 bg-white px-3 text-[14px] text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-ink-800 dark:bg-ink-950 dark:text-ink-50 dark:placeholder:text-ink-500"
      />
    </div>
  );
}
