"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Briefcase,
  Sparkles,
  Upload,
  FileText,
  Plus,
  GripVertical,
  ArrowLeft,
  ArrowRight,
  Code2,
  Smartphone,
  User,
  ScanFace,
  FileCheck2,
  Hand,
  Video,
  Camera,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { JD_TEMPLATE } from "@/lib/demo-data";

const STEPS = ["Basic info", "Responsibilities", "Interview setup"];

type InterviewKey = keyof typeof JD_TEMPLATE.interviewSettings;

const INTERVIEW_TOGGLES: {
  key: InterviewKey;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  desc: string;
}[] = [
  { key: "codeEditor", icon: Code2, label: "Code editor", desc: "Monaco-based editor with run + test" },
  { key: "webcam", icon: Video, label: "Webcam", desc: "Required — records candidate video" },
  { key: "avatar", icon: User, label: "AI avatar", desc: "On-screen interviewer avatar" },
  { key: "faceMatch", icon: ScanFace, label: "Face match", desc: "Verifies ID photo vs webcam feed" },
  { key: "resumeBased", icon: FileCheck2, label: "Resume-based Qs", desc: "Tailor questions to the resume" },
  { key: "mobile", icon: Smartphone, label: "Allow mobile", desc: "Candidate can use phone" },
  { key: "manualMode", icon: Hand, label: "Manual mode", desc: "Human interviewer can take over" },
  { key: "secondaryCam", icon: Camera, label: "Secondary camera", desc: "Room-view camera for integrity" },
];

export function CreateJDWizard() {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState(JD_TEMPLATE.title);
  const [department, setDepartment] = useState(JD_TEMPLATE.department);
  const [location, setLocation] = useState(JD_TEMPLATE.location);
  const [jobType, setJobType] = useState(JD_TEMPLATE.jobType);
  const [openings, setOpenings] = useState(JD_TEMPLATE.openings);
  const [expMin, setExpMin] = useState(JD_TEMPLATE.experienceMin);
  const [expMax, setExpMax] = useState(JD_TEMPLATE.experienceMax);
  const [responsibilities, setResponsibilities] = useState<string[]>(
    JD_TEMPLATE.responsibilities,
  );
  const [interviewSettings, setInterviewSettings] = useState(
    JD_TEMPLATE.interviewSettings,
  );
  const [questionType, setQuestionType] = useState<"traditional" | "scenario">(
    JD_TEMPLATE.questionType,
  );
  const [maxQuestions, setMaxQuestions] = useState(JD_TEMPLATE.maxQuestions);
  const [isGenerating, setIsGenerating] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleAIGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setResponsibilities(JD_TEMPLATE.responsibilities);
      setIsGenerating(false);
    }, 1400);
  };

  const toggleInterview = (key: InterviewKey) => {
    setInterviewSettings((s) => ({ ...s, [key]: !s[key] }));
  };

  if (finished) {
    return <SuccessState title={title} onReset={() => { setFinished(false); setStep(0); }} />;
  }

  return (
    <div className="mx-auto max-w-5xl">
      <Stepper step={step} />

      <div className="mt-10 rounded-2xl border border-ink-200 bg-white p-6 md:p-10">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <SectionHeader
                icon={Briefcase}
                title="Basic info"
                subtitle="Tell us what role you're hiring for."
              />

              <div className="mt-6 rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-brand-50/40 p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-ink-900">
                      Start with AI — we'll draft the rest
                    </div>
                    <p className="mt-1 text-[13px] text-ink-600">
                      Upload an existing JD, or describe the role in a sentence.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button className="inline-flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-3 py-2 text-xs font-medium text-ink-700 hover:border-ink-300">
                        <Upload className="h-3.5 w-3.5" /> Upload JD
                      </button>
                      <button
                        onClick={handleAIGenerate}
                        className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-600"
                      >
                        <FileText className="h-3.5 w-3.5" /> AI generate
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <Field
                  label="Job title"
                  value={title}
                  onChange={setTitle}
                  placeholder="e.g. Senior Frontend Engineer"
                />
                <Field
                  label="Department"
                  value={department}
                  onChange={setDepartment}
                />
                <Field label="Location" value={location} onChange={setLocation} />
                <Select
                  label="Job type"
                  value={jobType}
                  onChange={setJobType}
                  options={["Full-time", "Part-time", "Contract", "Internship"]}
                />
                <div>
                  <Label>Experience range</Label>
                  <div className="rounded-lg border border-ink-200 bg-white p-4">
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="font-semibold text-ink-900 tabular">
                        {expMin} – {expMax} years
                      </span>
                      <span className="text-[11px] text-ink-500">0–20 yrs</span>
                    </div>
                    <div className="mt-3 flex gap-3">
                      <input
                        type="range"
                        min={0}
                        max={20}
                        value={expMin}
                        onChange={(e) =>
                          setExpMin(Math.min(+e.target.value, expMax - 1))
                        }
                        className="h-2 flex-1 cursor-pointer accent-brand-500"
                      />
                      <input
                        type="range"
                        min={0}
                        max={20}
                        value={expMax}
                        onChange={(e) =>
                          setExpMax(Math.max(+e.target.value, expMin + 1))
                        }
                        className="h-2 flex-1 cursor-pointer accent-brand-500"
                      />
                    </div>
                  </div>
                </div>
                <Field
                  label="# of openings"
                  value={String(openings)}
                  onChange={(v) => setOpenings(Math.max(1, +v || 1))}
                  type="number"
                />
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start justify-between">
                <SectionHeader
                  icon={FileText}
                  title="Responsibilities"
                  subtitle="What will this person actually own?"
                  accent="purple"
                />
                <button
                  onClick={handleAIGenerate}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-100 disabled:opacity-50"
                >
                  <Sparkles
                    className={cn(
                      "h-3.5 w-3.5",
                      isGenerating && "animate-spin",
                    )}
                  />
                  {isGenerating ? "Drafting…" : "Rewrite with AI"}
                </button>
              </div>

              <div className="mt-6 space-y-2.5">
                {responsibilities.map((r, i) => (
                  <div
                    key={i}
                    className="group flex items-start gap-3 rounded-xl border border-ink-200 bg-white p-3 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100"
                  >
                    <GripVertical className="mt-2.5 h-4 w-4 shrink-0 cursor-grab text-ink-300" />
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-[11px] font-semibold text-white">
                      {i + 1}
                    </span>
                    <textarea
                      value={r}
                      onChange={(e) => {
                        const next = [...responsibilities];
                        next[i] = e.target.value;
                        setResponsibilities(next);
                      }}
                      rows={Math.max(1, Math.ceil(r.length / 70))}
                      className="flex-1 resize-none bg-transparent text-sm leading-relaxed text-ink-800 outline-none"
                    />
                    <button
                      onClick={() =>
                        setResponsibilities(
                          responsibilities.filter((_, j) => j !== i),
                        )
                      }
                      className="mt-1.5 opacity-0 transition-opacity hover:text-rose-500 group-hover:opacity-100"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-ink-400" />
                    </button>
                  </div>
                ))}

                <button
                  onClick={() =>
                    setResponsibilities([...responsibilities, ""])
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-ink-300 bg-ink-50/50 py-3 text-sm font-medium text-ink-600 hover:border-brand-400 hover:bg-brand-50/50 hover:text-brand-700"
                >
                  <Plus className="h-4 w-4" /> Add responsibility
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <SectionHeader
                icon={Video}
                title="Interview setup"
                subtitle="Configure how the AI runs the interview."
                accent="emerald"
              />

              <div className="mt-6">
                <Label>Interview capabilities</Label>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {INTERVIEW_TOGGLES.map((t) => {
                    const on = interviewSettings[t.key];
                    return (
                      <button
                        key={t.key}
                        onClick={() => toggleInterview(t.key)}
                        className={cn(
                          "flex items-start gap-3 rounded-xl border p-3 text-left transition-all",
                          on
                            ? "border-brand-400 bg-brand-50/50 ring-1 ring-brand-200"
                            : "border-ink-200 bg-white hover:border-ink-300",
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                            on
                              ? "bg-brand-500 text-white"
                              : "bg-ink-100 text-ink-500",
                          )}
                        >
                          <t.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-ink-900">
                              {t.label}
                            </span>
                            <span
                              className={cn(
                                "flex h-4 w-7 items-center rounded-full transition-all",
                                on ? "justify-end bg-brand-500" : "justify-start bg-ink-300",
                              )}
                            >
                              <span className="h-3 w-3 rounded-full bg-white shadow" />
                            </span>
                          </div>
                          <p className="mt-0.5 text-[11px] text-ink-500">
                            {t.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <div>
                  <Label>Question style</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "scenario" as const, label: "Scenario-based", desc: "Reasoning & tradeoffs" },
                      { id: "traditional" as const, label: "Traditional", desc: "Direct Q&A" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setQuestionType(opt.id)}
                        className={cn(
                          "rounded-xl border p-3 text-left transition-all",
                          questionType === opt.id
                            ? "border-brand-400 bg-brand-50/50 ring-1 ring-brand-200"
                            : "border-ink-200 bg-white hover:border-ink-300",
                        )}
                      >
                        <div className="text-sm font-semibold text-ink-900">
                          {opt.label}
                        </div>
                        <div className="mt-0.5 text-[11px] text-ink-500">
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Max questions</Label>
                  <div className="rounded-lg border border-ink-200 bg-white p-4">
                    <div className="flex items-baseline justify-between">
                      <span className="tabular text-lg font-semibold text-ink-900">
                        {maxQuestions}
                      </span>
                      <span className="text-[11px] text-ink-500">5–20</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={20}
                      value={maxQuestions}
                      onChange={(e) => setMaxQuestions(+e.target.value)}
                      className="mt-2 h-2 w-full cursor-pointer accent-brand-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-between border-t border-ink-100 pt-6">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-ink-700 hover:bg-ink-100 disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => setFinished(true)}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600"
            >
              <CheckCircle2 className="h-4 w-4" />
              Publish job
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="relative flex items-center justify-between">
        {STEPS.map((label, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <div key={label} className="relative z-10 flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all",
                    done
                      ? "bg-emerald-500 text-white"
                      : active
                        ? "bg-brand-500 text-white ring-4 ring-brand-100"
                        : "bg-ink-100 text-ink-500",
                  )}
                >
                  {done ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium",
                    active || done ? "text-ink-900" : "text-ink-500",
                  )}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="mx-3 mt-[-20px] flex-1 rounded-full bg-ink-100">
                  <motion.div
                    initial={false}
                    animate={{ width: done ? "100%" : "0%" }}
                    transition={{ duration: 0.4 }}
                    className="h-1 rounded-full bg-emerald-500"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  accent = "brand",
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  accent?: "brand" | "emerald" | "purple";
}) {
  const tones = {
    brand: "bg-brand-50 text-brand-600 ring-brand-100",
    emerald: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    purple: "bg-[#f4edff] text-[#7a5af8] ring-[#e9dcff]",
  } as const;
  return (
    <div className="flex items-start gap-4">
      <div
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-xl ring-1",
          tones[accent],
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900">
          {title}
        </h2>
        <p className="mt-1 text-sm text-ink-600">{subtitle}</p>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500">
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-all focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <Label>{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full cursor-pointer rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-all focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function SuccessState({
  title,
  onReset,
}: {
  title: string;
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-xl rounded-2xl border border-emerald-200 bg-white p-10 text-center shadow-[0_24px_48px_-24px_rgba(16,24,40,0.18)]"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
        <CheckCircle2 className="h-7 w-7" />
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink-900">
        {title} is live.
      </h3>
      <p className="mt-2 text-sm text-ink-600">
        Candidates can now apply — and AnytimeHire starts interviewing them the
        moment they do. In the real product, this would also notify your hiring
        manager via email and Slack.
      </p>
      <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Link
          href="/demo/evaluate"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink-800"
        >
          See how candidates get scored
          <ArrowRight className="h-4 w-4" />
        </Link>
        <button
          onClick={onReset}
          className="inline-flex items-center justify-center rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-medium text-ink-700 hover:border-ink-300"
        >
          Restart demo
        </button>
      </div>
    </motion.div>
  );
}
