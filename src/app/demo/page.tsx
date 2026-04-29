import Link from "next/link";
import { ArrowRight, FileText, LineChart, PlayCircle } from "lucide-react";
import { DemoBanner } from "@/components/demo/DemoBanner";

const DEMOS = [
  {
    href: "/demo/create-jd",
    icon: FileText,
    title: "Create a Job Description",
    body: "Step through the AI-assisted JD wizard: basic info, responsibilities, and interview setup — with real fields and fake data.",
    eyebrow: "Demo · 3 mins",
    accent: "from-brand-400 to-brand-600",
  },
  {
    href: "/demo/evaluate",
    icon: LineChart,
    title: "Score candidates in depth",
    body: "Open the evaluation dashboard for a real role with 5 fake candidates — fit scores, skill rubrics, Q&A evidence, cheating flags.",
    eyebrow: "Demo · 4 mins",
    accent: "from-emerald-400 to-emerald-600",
  },
];

export default function DemoIndex() {
  return (
    <>
      <DemoBanner />
      <main className="py-20 lg:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-medium text-ink-700 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-300">
              <PlayCircle className="h-3.5 w-3.5 text-brand-500" />
              Pick a flow to walk through
            </div>
            <h1 className="mt-5 text-balance font-display text-4xl font-semibold tracking-tight text-ink-900 dark:text-ink-50 sm:text-5xl">
              See AnytimeHire work — without signing up.
            </h1>
            <p className="mt-5 text-lg text-ink-600 dark:text-ink-400">
              Two scripted flows pulled straight from the product. Click through
              the real UI with curated fake data.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
            {DEMOS.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                className="group relative overflow-hidden rounded-2xl border border-ink-200 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-[0_28px_56px_-28px_rgba(16,24,40,0.22)] dark:border-ink-800 dark:bg-ink-900 dark:hover:shadow-[0_28px_56px_-28px_rgba(0,0,0,0.7)]"
              >
                <div
                  aria-hidden
                  className={`absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${d.accent} opacity-20 blur-2xl transition-opacity group-hover:opacity-40`}
                />
                <div className="relative">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ink-900 text-white dark:bg-ink-50 dark:text-ink-900">
                    <d.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500 dark:text-ink-400">
                    {d.eyebrow}
                  </div>
                  <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink-900 dark:text-ink-50">
                    {d.title}
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-600 dark:text-ink-400">
                    {d.body}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400">
                    Open demo
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
