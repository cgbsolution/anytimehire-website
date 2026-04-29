import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section id="pricing" className="py-16 lg:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[32px] bg-ink-900 px-8 py-16 text-center dark:bg-gradient-to-br dark:from-ink-900 dark:via-ink-800 dark:to-ink-900 dark:ring-1 dark:ring-ink-800 lg:px-16 lg:py-24">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, #465fff 0%, transparent 50%), radial-gradient(circle at 80% 70%, #7592ff 0%, transparent 50%)",
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
            <h2 className="text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Ready to see your next shortlist build itself?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              Try the scripted self-demo now — no signup, no credit card. Or
              book a pilot and we'll screen a real role for you this week.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/demo"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink-900 transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-8px_rgba(255,255,255,0.2)]"
              >
                Start the demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-white/80 ring-1 ring-white/15 transition-colors hover:bg-white/5 hover:text-white"
              >
                Talk to sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
