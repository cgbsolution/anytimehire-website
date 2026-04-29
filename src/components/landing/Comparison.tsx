import { Check, X, Minus } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

type Cell = "yes" | "no" | "partial";

const ROWS: { label: string; at: Cell; manual: Cell; ats: Cell; agency: Cell }[] = [
  { label: "Every applicant gets interviewed", at: "yes", manual: "no", ats: "no", agency: "partial" },
  { label: "Structured, identical rubric", at: "yes", manual: "partial", ats: "no", agency: "partial" },
  { label: "Evidence-backed scoring", at: "yes", manual: "no", ats: "no", agency: "partial" },
  { label: "Cheating & integrity signals", at: "yes", manual: "partial", ats: "no", agency: "no" },
  { label: "24/7 candidate availability", at: "yes", manual: "no", ats: "partial", agency: "no" },
  { label: "Cost per candidate", at: "yes", manual: "no", ats: "partial", agency: "no" },
];

function Mark({ v }: { v: Cell }) {
  if (v === "yes")
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30">
        <Check className="h-3.5 w-3.5" />
      </span>
    );
  if (v === "no")
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink-100 text-ink-400 ring-1 ring-ink-200 dark:bg-ink-800 dark:text-ink-500 dark:ring-ink-700">
        <X className="h-3.5 w-3.5" />
      </span>
    );
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-50 text-amber-600 ring-1 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/30">
      <Minus className="h-3.5 w-3.5" />
    </span>
  );
}

export function Comparison() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel>Compare</SectionLabel>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-ink-900 dark:text-ink-50 sm:text-5xl">
            Why teams move off manual screening.
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-2xl border border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
          <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr] bg-ink-50/60 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500 dark:bg-ink-800/40 dark:text-ink-400">
            <div className="px-5 py-4">Capability</div>
            <div className="px-4 py-4 text-center text-brand-700 dark:text-brand-300">AnytimeHire</div>
            <div className="px-4 py-4 text-center">Manual</div>
            <div className="px-4 py-4 text-center">ATS + filters</div>
            <div className="px-4 py-4 text-center">Agencies</div>
          </div>
          {ROWS.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr] items-center text-sm ${
                i !== ROWS.length - 1 ? "border-b border-ink-100 dark:border-ink-800" : ""
              }`}
            >
              <div className="px-5 py-4 font-medium text-ink-800 dark:text-ink-200">{row.label}</div>
              <div className="px-4 py-4 text-center">
                <Mark v={row.at} />
              </div>
              <div className="px-4 py-4 text-center">
                <Mark v={row.manual} />
              </div>
              <div className="px-4 py-4 text-center">
                <Mark v={row.ats} />
              </div>
              <div className="px-4 py-4 text-center">
                <Mark v={row.agency} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
