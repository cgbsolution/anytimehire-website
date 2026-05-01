"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const TESTIMONIALS = [
  {
    quote:
      "Our time-to-hire is down 4 weeks. AnytimeHire interviews every applicant the day they apply — our team only steps in for the top eight per role.",
    name: "Riya Sharma",
    role: "VP Talent",
    company: "Lumen Labs",
    hue: 220,
  },
  {
    quote:
      "We migrated from a top-3 ATS plus an agency. AnytimeHire replaced both line items in our hiring budget — and the shortlist quality went up, not down.",
    name: "Anish Iyer",
    role: "Director of People Ops",
    company: "Strata.io",
    hue: 280,
  },
  {
    quote:
      "Now every applicant has a serious conversation with us. Brand, NPS, and offer-accept rates all moved — we look like a tier-1 employer in every market.",
    name: "Neha Patel",
    role: "Head of HR",
    company: "Helio Health",
    hue: 340,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 lg:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>Customers</SectionLabel>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-ink-900 dark:text-ink-50 sm:text-5xl">
            Trusted by hiring teams across India.
          </h2>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-24px_rgba(16,24,40,0.18)] dark:border-ink-800 dark:bg-ink-900 dark:hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-amber-400 stroke-amber-500" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-700 dark:text-ink-300">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white"
                  style={{ background: `hsl(${t.hue} 70% 55%)` }}
                >
                  {t.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink-900 dark:text-ink-50">
                    {t.name}
                  </div>
                  <div className="text-xs text-ink-500 dark:text-ink-400">
                    {t.role} · {t.company}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
