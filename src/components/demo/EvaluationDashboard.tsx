"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  Briefcase,
  TrendingUp,
  Eye,
  ShieldAlert,
  ShieldCheck,
  Star,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  MessageSquareText,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CANDIDATES, type DemoCandidate } from "@/lib/demo-data";
import { ScoreCircle } from "@/components/product-ui/ScoreCircle";
import { FitChip } from "@/components/product-ui/FitChip";

const TABS = ["Overview", "Q&A evidence", "Skills breakdown", "Integrity"] as const;
type Tab = (typeof TABS)[number];

const RECOMMENDATION_STYLES = {
  strong_hire: {
    bg: "bg-emerald-50 ring-emerald-200 text-emerald-800",
    dot: "bg-emerald-500",
    label: "Strong hire",
    icon: CheckCircle2,
  },
  hire: {
    bg: "bg-emerald-50 ring-emerald-200 text-emerald-800",
    dot: "bg-emerald-500",
    label: "Hire",
    icon: CheckCircle2,
  },
  maybe: {
    bg: "bg-amber-50 ring-amber-200 text-amber-800",
    dot: "bg-amber-500",
    label: "Maybe — second round",
    icon: AlertTriangle,
  },
  no_hire: {
    bg: "bg-rose-50 ring-rose-200 text-rose-800",
    dot: "bg-rose-500",
    label: "Not recommended",
    icon: XCircle,
  },
} as const;

export function EvaluationDashboard() {
  const [activeId, setActiveId] = useState(CANDIDATES[0].id);
  const [tab, setTab] = useState<Tab>("Overview");
  const active = CANDIDATES.find((c) => c.id === activeId)!;

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <CandidateList active={activeId} onSelect={setActiveId} />
      <div>
        <CandidateHeader candidate={active} />
        <StatCards candidate={active} />
        <RecommendationBanner candidate={active} />

        <div className="mt-6 border-b border-ink-200">
          <div className="flex items-center gap-1 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "relative whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors",
                  tab === t
                    ? "text-ink-900"
                    : "text-ink-500 hover:text-ink-800",
                )}
              >
                {t}
                {tab === t && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-brand-500"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <AnimatePresence mode="wait">
            {tab === "Overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <OverviewTab candidate={active} />
              </motion.div>
            )}
            {tab === "Q&A evidence" && (
              <motion.div
                key="qa"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <QATab candidate={active} />
              </motion.div>
            )}
            {tab === "Skills breakdown" && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <SkillsTab candidate={active} />
              </motion.div>
            )}
            {tab === "Integrity" && (
              <motion.div
                key="integrity"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <IntegrityTab candidate={active} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function CandidateList({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (id: string) => void;
}) {
  const ordered = [...CANDIDATES].sort((a, b) => b.fitPercent - a.fitPercent);
  return (
    <aside className="sticky top-20 h-fit rounded-2xl border border-ink-200 bg-white p-3">
      <div className="px-3 py-2">
        <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500">
          Senior Frontend Engineer
        </div>
        <div className="mt-0.5 text-sm font-semibold text-ink-900">
          5 candidates · ranked by fit
        </div>
      </div>
      <ul className="mt-2 space-y-1">
        {ordered.map((c, i) => (
          <li key={c.id}>
            <button
              onClick={() => onSelect(c.id)}
              className={cn(
                "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                active === c.id
                  ? "bg-brand-50 ring-1 ring-brand-200"
                  : "hover:bg-ink-50",
              )}
            >
              <div className="flex items-center gap-2">
                <span className="tabular w-4 shrink-0 text-[11px] font-semibold text-ink-400">
                  {i + 1}
                </span>
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                  style={{ background: `hsl(${c.avatarHue} 70% 55%)` }}
                >
                  {c.initials}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div
                  className={cn(
                    "truncate text-sm font-medium",
                    active === c.id ? "text-ink-900" : "text-ink-800",
                  )}
                >
                  {c.name}
                </div>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="tabular text-[11px] font-semibold text-ink-900">
                    {c.fitPercent}%
                  </span>
                  <div className="flex h-1 w-12 overflow-hidden rounded-full bg-ink-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${c.fitPercent}%` }}
                      transition={{ duration: 0.7 }}
                      className={cn(
                        "h-full",
                        c.fitLevel === "high"
                          ? "bg-emerald-500"
                          : c.fitLevel === "medium"
                            ? "bg-amber-500"
                            : "bg-rose-500",
                      )}
                    />
                  </div>
                  {c.cheatingFlags > 0 && (
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-rose-50 px-1.5 text-[10px] font-semibold text-rose-700">
                      <ShieldAlert className="h-2.5 w-2.5" />
                      {c.cheatingFlags}
                    </span>
                  )}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function CandidateHeader({ candidate }: { candidate: DemoCandidate }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-ink-200 bg-gradient-to-br from-brand-50/60 via-white to-brand-50/30 p-5">
      <div className="flex items-start gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-base font-semibold text-white shadow-sm"
          style={{ background: `hsl(${candidate.avatarHue} 70% 55%)` }}
        >
          {candidate.initials}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-xl font-semibold tracking-tight text-ink-900">
              {candidate.name}
            </h1>
            <FitChip level={candidate.fitLevel} percent={candidate.fitPercent} />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-ink-600">
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5" />
              {candidate.role}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              {candidate.email}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              {candidate.phone}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCards({ candidate }: { candidate: DemoCandidate }) {
  const cards = [
    {
      label: "Fit score",
      value: candidate.fitPercent,
      suffix: "%",
      tone:
        candidate.fitLevel === "high"
          ? "emerald"
          : candidate.fitLevel === "medium"
            ? "amber"
            : "rose",
      icon: TrendingUp,
      sub: candidate.fitLevel === "high" ? "Above bar" : candidate.fitLevel === "medium" ? "Borderline" : "Below bar",
    },
    {
      label: "Trust score",
      value: candidate.trustScore,
      suffix: "/10",
      tone: candidate.trustScore >= 8 ? "brand" : candidate.trustScore >= 6 ? "amber" : "rose",
      icon: ShieldCheck,
      sub: candidate.trustScore >= 8 ? "High confidence" : "Flagged signals",
    },
    {
      label: "AI round",
      value: candidate.aiRoundScore,
      suffix: "%",
      tone: "sky",
      icon: Eye,
      sub: `${candidate.questions.length} Qs answered`,
    },
    {
      label: "Integrity flags",
      value: candidate.cheatingFlags,
      suffix: "",
      tone:
        candidate.cheatingFlags === 0
          ? "emerald"
          : candidate.cheatingFlags <= 2
            ? "amber"
            : "rose",
      icon: ShieldAlert,
      sub: candidate.cheatingFlags === 0 ? "No events" : "Review signals",
    },
  ] as const;

  const toneStyles = {
    emerald: "from-emerald-50 to-white ring-emerald-200 text-emerald-700",
    amber: "from-amber-50 to-white ring-amber-200 text-amber-700",
    rose: "from-rose-50 to-white ring-rose-200 text-rose-700",
    brand: "from-brand-50 to-white ring-brand-200 text-brand-700",
    sky: "from-[#f0f9ff] to-white ring-[#b9e6fe] text-[#026aa2]",
  } as const;

  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className={cn(
            "relative overflow-hidden rounded-2xl bg-gradient-to-br p-4 ring-1",
            toneStyles[c.tone],
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500">
              {c.label}
            </span>
            <c.icon className="h-4 w-4" />
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="tabular font-display text-3xl font-semibold text-ink-900">
              {c.value}
            </span>
            <span className="text-sm font-medium text-ink-500">{c.suffix}</span>
          </div>
          <div className="mt-1 text-[11px] text-ink-600">{c.sub}</div>
        </div>
      ))}
    </div>
  );
}

function RecommendationBanner({ candidate }: { candidate: DemoCandidate }) {
  const style = RECOMMENDATION_STYLES[candidate.recommendation];
  return (
    <div
      className={cn(
        "mt-4 flex items-start gap-3 rounded-2xl px-5 py-4 ring-1",
        style.bg,
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white",
          style.dot,
        )}
      >
        <style.icon className="h-4 w-4" />
      </span>
      <div className="flex-1">
        <div className="text-[11px] font-semibold uppercase tracking-[0.12em]">
          Recommendation
        </div>
        <div className="mt-0.5 text-base font-semibold">{style.label}</div>
        <p className="mt-1 text-sm leading-relaxed opacity-90">
          {candidate.recommendationText}
        </p>
        {candidate.keyConcerns.length > 0 && (
          <ul className="mt-3 space-y-1 text-[13px] opacity-90">
            {candidate.keyConcerns.map((c) => (
              <li key={c} className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function OverviewTab({ candidate }: { candidate: DemoCandidate }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div className="rounded-2xl border border-ink-200 bg-white p-5">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500">
            <Sparkles className="h-3.5 w-3.5 text-brand-500" />
            AI summary
          </div>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-800">
            {candidate.summary}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Strengths
            </div>
            <ul className="mt-3 space-y-2.5">
              {candidate.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-800">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-500" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-rose-700">
              <AlertTriangle className="h-3.5 w-3.5" />
              Concerns
            </div>
            {candidate.weaknesses.length > 0 ? (
              <ul className="mt-3 space-y-2.5">
                {candidate.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink-800">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-rose-500" />
                    {w}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-ink-500">None noted.</p>
            )}
          </div>
        </div>

        <DimensionalScores candidate={candidate} />
      </div>

      <aside className="space-y-5">
        <div className="rounded-2xl border border-ink-200 bg-white p-5 text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500">
            Overall
          </div>
          <div className="mt-3 flex justify-center">
            <ScoreCircle value={candidate.overallScore} size={140} stroke={11} />
          </div>
          <div className="mt-4 text-xs text-ink-600">
            {candidate.overallScore >= 80
              ? "Consistent, evidence-backed strong performance across dimensions."
              : candidate.overallScore >= 60
                ? "Mixed signals — strong in some dimensions, developing in others."
                : "Performance below bar across most dimensions."}
          </div>
        </div>
      </aside>
    </div>
  );
}

function DimensionalScores({ candidate }: { candidate: DemoCandidate }) {
  const dims = [
    { key: "technical", label: "Technical depth", value: candidate.dimensionalScores.technical },
    { key: "communication", label: "Communication", value: candidate.dimensionalScores.communication },
    { key: "problemSolving", label: "Problem solving", value: candidate.dimensionalScores.problemSolving },
    { key: "confidence", label: "Confidence", value: candidate.dimensionalScores.confidence },
  ];
  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5">
      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500">
        Dimensional scores
      </div>
      <div className="mt-4 space-y-3.5">
        {dims.map((d, i) => (
          <div key={d.key}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-700">{d.label}</span>
              <span className="tabular font-semibold text-ink-900">
                {d.value}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink-100">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${d.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.08 }}
                className={cn(
                  "h-full rounded-full",
                  d.value >= 80
                    ? "bg-emerald-500"
                    : d.value >= 60
                      ? "bg-amber-500"
                      : "bg-rose-500",
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QATab({ candidate }: { candidate: DemoCandidate }) {
  const [expanded, setExpanded] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {candidate.questions.map((q, i) => {
        const open = expanded === i;
        const tone =
          q.score >= 80 ? "emerald" : q.score >= 60 ? "amber" : "rose";
        const toneChip = {
          emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
          amber: "bg-amber-50 text-amber-700 ring-amber-200",
          rose: "bg-rose-50 text-rose-700 ring-rose-200",
        }[tone];

        return (
          <div
            key={q.id}
            className="overflow-hidden rounded-2xl border border-ink-200 bg-white"
          >
            <button
              onClick={() => setExpanded(open ? null : i)}
              className="flex w-full items-start gap-4 p-5 text-left"
            >
              <span className="tabular mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink-100 text-xs font-semibold text-ink-600">
                Q{i + 1}
              </span>
              <div className="flex-1">
                <div className="text-[15px] font-medium leading-snug text-ink-900">
                  {q.question}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ring-1",
                      toneChip,
                    )}
                  >
                    {q.score}/100
                  </span>
                  <span className="text-xs text-ink-500">
                    {q.positives.length} positive · {q.concerns.length} concerns
                  </span>
                </div>
              </div>
              <ChevronDown
                className={cn(
                  "mt-1 h-5 w-5 shrink-0 text-ink-400 transition-transform",
                  open && "rotate-180",
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-ink-100 bg-ink-50/40 p-5">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500">
                      <MessageSquareText className="h-3.5 w-3.5" />
                      Candidate answer
                    </div>
                    <p className="mt-2 rounded-xl bg-white p-4 text-sm leading-relaxed text-ink-800 ring-1 ring-ink-200">
                      {q.answer}
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
                          <CheckCircle2 className="h-3 w-3" />
                          Positives
                        </div>
                        {q.positives.length > 0 ? (
                          <ul className="mt-2 space-y-1.5">
                            {q.positives.map((p, j) => (
                              <li
                                key={j}
                                className="flex items-start gap-2 text-[13px] text-ink-800"
                              >
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-500" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-2 text-[13px] italic text-ink-500">
                            Nothing notable.
                          </p>
                        )}
                      </div>

                      <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-3">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-rose-700">
                          <AlertTriangle className="h-3 w-3" />
                          Concerns
                        </div>
                        {q.concerns.length > 0 ? (
                          <ul className="mt-2 space-y-1.5">
                            {q.concerns.map((c, j) => (
                              <li
                                key={j}
                                className="flex items-start gap-2 text-[13px] text-ink-800"
                              >
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-rose-500" />
                                {c}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-2 text-[13px] italic text-ink-500">
                            None.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function SkillsTab({ candidate }: { candidate: DemoCandidate }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {candidate.skills.map((s, i) => (
        <motion.div
          key={s.name}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="rounded-2xl border border-ink-200 bg-white p-5"
        >
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-ink-900">{s.name}</div>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  className={cn(
                    "h-3.5 w-3.5",
                    n <= s.rating
                      ? "fill-amber-400 stroke-amber-500"
                      : "fill-none stroke-ink-300",
                  )}
                />
              ))}
            </div>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink-100">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(s.rating / 5) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.05 }}
              className={cn(
                "h-full rounded-full",
                s.rating >= 4
                  ? "bg-gradient-to-r from-emerald-400 to-emerald-600"
                  : s.rating >= 3
                    ? "bg-gradient-to-r from-amber-400 to-amber-600"
                    : "bg-gradient-to-r from-rose-400 to-rose-600",
              )}
            />
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-ink-600">
            {s.evaluation}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

function IntegrityTab({ candidate }: { candidate: DemoCandidate }) {
  const signals =
    candidate.cheatingFlags > 0
      ? candidate.keyConcerns.length > 0
        ? candidate.keyConcerns
        : [`${candidate.cheatingFlags} anomaly event(s) detected during session.`]
      : [];

  if (signals.length === 0) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold text-ink-900">
          Clean session
        </h3>
        <p className="mt-2 text-sm text-ink-600">
          No integrity anomalies detected across 7 monitored signals.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-rose-700">
          <ShieldAlert className="h-3.5 w-3.5" />
          {candidate.cheatingFlags} flag{candidate.cheatingFlags === 1 ? "" : "s"} — review required
        </div>
        <ul className="mt-4 space-y-3">
          {signals.map((s, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl bg-white p-3 ring-1 ring-rose-200"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white">
                <AlertTriangle className="h-3 w-3" />
              </span>
              <span className="text-sm text-ink-800">{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
