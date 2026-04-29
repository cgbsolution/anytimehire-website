import { Quote } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Testimonial() {
  return (
    <section className="py-24 lg:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-4xl rounded-3xl border border-ink-200 bg-white p-10 dark:border-ink-800 dark:bg-ink-900 md:p-14">
          <div className="flex items-center gap-3">
            <SectionLabel>Customer</SectionLabel>
          </div>
          <Quote className="mt-6 h-8 w-8 text-brand-500 dark:text-brand-400" />
          <blockquote className="mt-5 text-balance font-display text-2xl font-medium leading-[1.35] tracking-tight text-ink-900 dark:text-ink-50 sm:text-3xl">
            “We were drowning in 800 applications a month. AnytimeHire
            interviewed all of them, and our hiring manager spent Monday
            mornings talking to the four people who actually fit — instead of
            screening.”
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            <div
              className="h-11 w-11 rounded-full"
              style={{ background: "hsl(220 70% 55%)" }}
            />
            <div>
              <div className="text-sm font-semibold text-ink-900 dark:text-ink-50">
                Meera Iyer
              </div>
              <div className="text-xs text-ink-500 dark:text-ink-400">
                Head of Talent · Arcwave
              </div>
            </div>
            <div className="ml-auto hidden font-display text-3xl font-semibold tracking-tight text-ink-900 dark:text-ink-50 sm:block">
              82<span className="text-ink-400 dark:text-ink-500">%</span>{" "}
              <span className="text-sm font-medium text-ink-500 dark:text-ink-400">
                shortlist time saved
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
