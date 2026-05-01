"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  ListChecks,
  Database,
  Lock,
  Search,
  Plus,
  Sparkles,
  Sun,
  TrendingUp,
  TrendingDown,
  Send,
  CheckCircle2,
  CalendarClock,
  Trophy,
  Hourglass,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Video,
  Upload,
  AlertTriangle,
  Clock,
  Menu,
  ChevronDown,
  Pencil,
  Trash2,
} from "lucide-react";

type View = "dashboard" | "jobs" | "candidates" | "resumes" | "qbank";

const KPIS = [
  {
    label: "Active Jobs",
    value: "43",
    delta: "-16.7%",
    deltaPositive: false,
    color: "indigo",
    icon: Briefcase,
  },
  {
    label: "Finished Jobs",
    value: "1",
    delta: "0%",
    deltaPositive: null,
    color: "emerald",
    icon: CheckCircle2,
  },
  {
    label: "Interview Sch…",
    value: "26",
    delta: "+50%",
    deltaPositive: true,
    color: "amber",
    icon: CalendarClock,
  },
  {
    label: "Hire Rates",
    value: "23",
    delta: "0%",
    deltaPositive: null,
    color: "violet",
    icon: Trophy,
  },
  {
    label: "Waiting Resp…",
    value: "135",
    delta: "+50%",
    deltaPositive: true,
    color: "rose",
    icon: Hourglass,
  },
];

const NAV: { key: View | "access"; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "jobs", label: "Job Openings", icon: Briefcase },
  { key: "candidates", label: "Candidates", icon: Users },
  { key: "qbank", label: "Question Bank", icon: ListChecks },
  { key: "resumes", label: "Resume Database", icon: Database },
  { key: "access", label: "Access Control", icon: Lock },
];

export function DashboardPreview() {
  const [view, setView] = useState<View>("dashboard");

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-[40px] bg-gradient-to-br from-brand-200/40 via-violet-100/30 to-transparent blur-3xl dark:from-brand-500/15 dark:via-violet-500/10"
      />

      <div className="overflow-hidden rounded-[24px] border border-ink-200 bg-white shadow-[0_50px_120px_-30px_rgba(16,24,40,0.30)] dark:border-ink-800 dark:bg-ink-950">
        {/* Browser chrome */}
        <div className="flex items-center justify-between border-b border-ink-200 bg-cream-50 px-4 py-2.5 dark:border-ink-800 dark:bg-ink-900">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3 py-1 text-[11px] text-ink-500 dark:border-ink-800 dark:bg-ink-950">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            app.anytimehire.com / {view === "dashboard" ? "dashboard" : view === "jobs" ? "job-openings" : view === "candidates" ? "candidates" : view === "qbank" ? "question-bank" : "resume-database"}
          </div>
          <span className="text-[11px] font-medium text-ink-400">Live demo</span>
        </div>

        {/* Body — sidebar + main */}
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]">
          <div className="hidden md:block">
            <Sidebar view={view} setView={setView} />
          </div>
          <div className="min-h-[520px] bg-[color:var(--color-surface)]">
            <Topbar />
            <MobileTabBar view={view} setView={setView} />
            <div className="p-3 sm:p-4 lg:p-6">
              <AnimatePresence mode="wait">
                {view === "dashboard" && (
                  <motion.div
                    key="dashboard"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <DashboardView />
                  </motion.div>
                )}
                {view === "jobs" && (
                  <motion.div
                    key="jobs"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <JobsView />
                  </motion.div>
                )}
                {view === "candidates" && (
                  <motion.div
                    key="candidates"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <CandidatesView />
                  </motion.div>
                )}
                {view === "qbank" && (
                  <motion.div
                    key="qbank"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <QuestionBankView />
                  </motion.div>
                )}
                {view === "resumes" && (
                  <motion.div
                    key="resumes"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ResumesView />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ------------------ Sidebar ------------------

function Sidebar({
  view,
  setView,
}: {
  view: View;
  setView: (v: View) => void;
}) {
  return (
    <aside className="border-r border-ink-200 bg-white p-3 dark:border-ink-800 dark:bg-ink-900">
      <div className="px-2 pb-3 pt-1">
        <Image
          src="/logo.svg"
          alt="AnytimeHire"
          width={650}
          height={168}
          priority
          className="h-6 w-auto dark:brightness-0 dark:invert"
        />
      </div>

      <div className="mt-1 px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-400 dark:text-ink-500">
        Menu
      </div>

      <ul className="mt-2 space-y-1">
        {NAV.map((item) => {
          const isClickable =
            item.key === "dashboard" ||
            item.key === "jobs" ||
            item.key === "candidates" ||
            item.key === "qbank" ||
            item.key === "resumes";
          const isActive = isClickable && view === (item.key as View);
          return (
            <li key={item.key}>
              <button
                type="button"
                onClick={() => isClickable && setView(item.key as View)}
                disabled={!isClickable}
                className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-[13px] font-medium transition-colors ${
                  isActive
                    ? "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"
                    : isClickable
                      ? "text-ink-700 hover:bg-ink-50 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-ink-50"
                      : "text-ink-500 dark:text-ink-500"
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                    isActive
                      ? "bg-violet-500 text-white"
                      : "bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-400"
                  }`}
                >
                  <item.icon className="h-3.5 w-3.5" />
                </span>
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 px-1">
        <button
          type="button"
          className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-[12px] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(124,58,237,0.5)]"
        >
          <Plus className="h-3.5 w-3.5" />
          Create Opening
        </button>
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-xl border border-ink-200 bg-cream-50 p-2 dark:border-ink-800 dark:bg-ink-950">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500 text-[10px] font-semibold text-white">
          DR
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[12px] font-semibold text-ink-900 dark:text-ink-50">
            Deepak Rawat
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-violet-600 dark:text-violet-400">
            Admin
          </div>
        </div>
      </div>
    </aside>
  );
}

// ------------------ Topbar ------------------

function Topbar() {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-ink-200 bg-white/60 px-4 py-3 backdrop-blur dark:border-ink-800 dark:bg-ink-950/60 sm:px-6">
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-ink-200 text-ink-600 dark:border-ink-800 dark:text-ink-400"
        aria-label="Toggle menu"
      >
        <Menu className="h-4 w-4" />
      </button>
      <div className="hidden flex-1 items-center gap-2 rounded-xl border border-ink-200 bg-white px-3 py-2 text-[12px] text-ink-500 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-400 sm:flex">
        <Search className="h-3.5 w-3.5" />
        Search or type command…
        <span className="ml-auto rounded border border-ink-200 px-1.5 py-0.5 text-[10px] dark:border-ink-700">
          ⌘K
        </span>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-[11px] font-semibold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
          D
        </span>
        <span className="hidden text-[12px] font-semibold text-ink-800 sm:inline dark:text-ink-200">
          Deepak
        </span>
        <ChevronDown className="h-3.5 w-3.5 text-ink-400" />
      </div>
    </div>
  );
}

// ------------------ Mobile tab bar ------------------

function MobileTabBar({
  view,
  setView,
}: {
  view: View;
  setView: (v: View) => void;
}) {
  const tabs: { key: View; label: string; icon: typeof LayoutDashboard }[] = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "jobs", label: "Jobs", icon: Briefcase },
    { key: "candidates", label: "Candidates", icon: Users },
    { key: "qbank", label: "Q. Bank", icon: ListChecks },
    { key: "resumes", label: "Resumes", icon: Database },
  ];

  return (
    <div className="border-b border-ink-200 bg-white px-3 py-2 dark:border-ink-800 dark:bg-ink-900 md:hidden">
      <div className="-mx-1 flex items-center gap-1.5 overflow-x-auto px-1 pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((t) => {
          const isActive = view === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setView(t.key)}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
                isActive
                  ? "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"
                  : "border border-ink-200 bg-white text-ink-700 dark:border-ink-800 dark:bg-ink-950 dark:text-ink-300"
              }`}
            >
              <t.icon className="h-3.5 w-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ------------------ Dashboard view ------------------

function DashboardView() {
  return (
    <div className="space-y-4">
      {/* Greeting card */}
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-violet-50 via-indigo-50 to-violet-100/60 p-4 sm:p-5 dark:from-violet-500/10 dark:via-indigo-500/10 dark:to-violet-500/5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-semibold text-white sm:h-14 sm:w-14 sm:text-base">
              DR
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-ink-700 dark:text-ink-300">
                Friday, May 1
                <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-violet-700 dark:text-violet-300">
                  <Sparkles className="h-2.5 w-2.5" />
                  AI Insights
                </span>
              </div>
              <div className="mt-0.5 font-display text-lg font-semibold tracking-tight text-ink-900 dark:text-ink-50 sm:text-2xl">
                Good morning,{" "}
                <span className="text-violet-700 dark:text-violet-300">Deepak</span>{" "}
                <Sun className="ml-1 inline h-5 w-5 text-amber-500" />
              </div>
              <p className="mt-1 text-[12px] text-ink-600 dark:text-ink-400">
                Here's your hiring performance today
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              className="flex flex-col items-start rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-600 px-3 py-2 text-left text-white shadow-[0_8px_20px_-8px_rgba(168,85,247,0.5)]"
            >
              <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.14em]">
                <Sparkles className="h-2.5 w-2.5" /> Copilot
              </span>
              <span className="text-[12px] font-semibold">AI Assistant</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 px-3 py-2 text-[12px] font-semibold text-white"
            >
              <Plus className="h-3.5 w-3.5" />
              Create Opening
            </button>
          </div>
        </div>
      </div>

      <KpiRow />

      {/* Charts */}
      <div className="grid gap-3 lg:grid-cols-2">
        {[
          { title: "Hiring Funnel", subtitle: "Candidate progression by month (current year)", color: "violet" },
          { title: "Active Jobs", subtitle: "Jobs created per month (current year)", color: "amber" },
        ].map((c, i) => (
          <div
            key={c.title}
            className="rounded-2xl border border-ink-200 bg-white p-4 dark:border-ink-800 dark:bg-ink-900"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-display text-[15px] font-semibold text-ink-900 dark:text-ink-50">
                  {c.title}
                </div>
                <div className="mt-0.5 text-[11px] text-ink-500 dark:text-ink-400">
                  {c.subtitle}
                </div>
              </div>
              <div className="flex items-center gap-1 rounded-full border border-ink-200 bg-ink-50 p-0.5 text-[10px] dark:border-ink-800 dark:bg-ink-950">
                {(i === 0 ? ["Monthly", "Weekly"] : ["Daily", "Weekly", "Monthly"]).map(
                  (t, idx) => (
                    <span
                      key={t}
                      className={`rounded-full px-2 py-0.5 ${
                        idx === (i === 0 ? 0 : 2)
                          ? "bg-white text-ink-900 shadow-sm dark:bg-ink-800 dark:text-ink-50"
                          : "text-ink-500"
                      }`}
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
            <div className="mt-4 h-32">
              {i === 0 ? <FunnelChart /> : <BarChart />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KpiRow() {
  const palette: Record<string, string> = {
    indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300",
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300",
    violet: "bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300",
    rose: "bg-rose-50 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300",
  };

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {KPIS.map((kpi) => (
        <div
          key={kpi.label}
          className="rounded-2xl border border-ink-200 bg-white p-3 dark:border-ink-800 dark:bg-ink-900"
        >
          <div className="flex items-center gap-2">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-xl ${palette[kpi.color]}`}
            >
              <kpi.icon className="h-3.5 w-3.5" />
            </span>
            <span className="truncate text-[11px] font-medium text-ink-600 dark:text-ink-400">
              {kpi.label}
            </span>
          </div>
          <div className="mt-2.5 font-display text-2xl font-semibold tracking-tight text-ink-900 dark:text-ink-50">
            {kpi.value}
          </div>
          <div className="mt-1.5 flex items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                kpi.deltaPositive === true
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                  : kpi.deltaPositive === false
                    ? "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300"
                    : "bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-400"
              }`}
            >
              {kpi.deltaPositive === true && <TrendingUp className="h-2.5 w-2.5" />}
              {kpi.deltaPositive === false && <TrendingDown className="h-2.5 w-2.5" />}
              {kpi.deltaPositive === null && <span className="h-px w-2 bg-current" />}
              {kpi.delta}
            </span>
            <Spark color={kpi.color} positive={kpi.deltaPositive} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Spark({ color, positive }: { color: string; positive: boolean | null }) {
  const stroke =
    color === "indigo"
      ? "#6366f1"
      : color === "emerald"
        ? "#10b981"
        : color === "amber"
          ? "#f59e0b"
          : color === "violet"
            ? "#8b5cf6"
            : "#f43f5e";
  const path =
    positive === true
      ? "M0,18 L10,14 L20,16 L30,8 L40,10 L50,4"
      : positive === false
        ? "M0,4 L10,8 L20,6 L30,12 L40,14 L50,18"
        : "M0,12 L10,12 L20,12 L30,12 L40,12 L50,12";
  return (
    <svg viewBox="0 0 50 22" className="h-4 flex-1">
      <path d={path} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FunnelChart() {
  return (
    <svg viewBox="0 0 320 120" className="h-full w-full">
      <path
        d="M0,90 C40,70 80,30 120,40 C160,50 200,80 240,60 C280,40 300,50 320,30"
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M0,90 C40,70 80,30 120,40 C160,50 200,80 240,60 C280,40 300,50 320,30 L320,120 L0,120 Z"
        fill="url(#violetGradient)"
        opacity="0.4"
      />
      <defs>
        <linearGradient id="violetGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <text x="0" y="115" fontSize="8" fill="currentColor" opacity="0.5">
        200
      </text>
    </svg>
  );
}

function BarChart() {
  const bars = [38, 56, 42, 68, 58, 72, 50, 66, 60, 78, 64, 82];
  return (
    <div className="flex h-full items-end gap-1.5">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ duration: 0.5, delay: i * 0.04 }}
          className="flex-1 rounded-t bg-gradient-to-t from-amber-400/40 to-amber-500"
        />
      ))}
    </div>
  );
}

// ------------------ Jobs view ------------------

function JobsView() {
  const jobs = [
    {
      title: "Application Support Manager",
      city: "Delhi",
      posted: "2 days ago",
      openings: 5,
      sent: 0,
      completed: 0,
      identified: 0,
    },
    {
      title: "JD for AI Security Architect",
      city: "Bangalore",
      posted: "3 days ago",
      openings: 2,
      sent: 2,
      completed: 0,
      identified: 0,
    },
    {
      title: "Frontend Developer (Angular)",
      city: "Banaglore",
      posted: "4 days ago",
      openings: 4,
      sent: 1,
      completed: 0,
      identified: 0,
    },
  ];

  return (
    <div className="space-y-4">
      <KpiRow />

      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h3 className="font-display text-[18px] font-semibold tracking-tight text-ink-900 dark:text-ink-50">
            Active Job Openings
          </h3>
          <p className="text-[12px] text-ink-500 dark:text-ink-400">
            Here's what you need to focus on today
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1.5 rounded-xl border border-ink-200 bg-white px-3 py-2 text-[12px] text-ink-500 dark:border-ink-800 dark:bg-ink-900 sm:flex">
            <Search className="h-3.5 w-3.5" />
            Search jobs…
          </div>
          <div className="flex items-center gap-1 rounded-xl border border-ink-200 bg-white px-3 py-2 text-[12px] text-ink-700 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-300">
            All Status
            <ChevronDown className="h-3 w-3" />
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div
            key={job.title}
            className="rounded-2xl border border-ink-200 bg-white p-4 dark:border-ink-800 dark:bg-ink-900"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-display text-[14px] font-semibold tracking-tight text-ink-900 dark:text-ink-50">
                  {job.title}
                </div>
                <div className="mt-1 flex items-center gap-1 text-[11px] text-ink-500 dark:text-ink-400">
                  <MapPin className="h-3 w-3" />
                  {job.city} · Posted {job.posted}
                </div>
              </div>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                Open
              </span>
            </div>

            <ul className="mt-4 space-y-2 border-t border-ink-100 pt-3 text-[12px] dark:border-ink-800">
              {[
                { label: "Openings", val: job.openings, icon: Briefcase },
                { label: "Full Time", val: "Full-time", icon: Clock },
                { label: "Application Sent", val: job.sent, icon: Send },
                { label: "Interview Completed", val: job.completed, icon: CheckCircle2 },
                { label: "Top Candidate Identified", val: job.identified, icon: Trophy },
              ].map((row) => (
                <li
                  key={row.label}
                  className="flex items-center justify-between text-ink-700 dark:text-ink-300"
                >
                  <span className="flex items-center gap-1.5">
                    <row.icon className="h-3 w-3 text-ink-400" />
                    {row.label}
                  </span>
                  <span className="font-medium text-ink-900 dark:text-ink-50">
                    {row.val}
                  </span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-[12px] font-semibold text-white"
            >
              View Candidates
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------ Candidates view ------------------

function CandidatesView() {
  const stats = [
    { label: "Total", value: "136", color: "indigo" },
    { label: "In Interview", value: "3", color: "sky" },
    { label: "Offered", value: "0", color: "amber" },
    { label: "Hired", value: "0", color: "emerald" },
    { label: "Rejected", value: "0", color: "rose" },
  ];

  const tabs = [
    { label: "All Candidates", count: 136, active: true },
    { label: "Applied", count: 133 },
    { label: "Interview", count: 3 },
    { label: "Offered", count: 0 },
    { label: "Selected", count: 0 },
    { label: "Hired", count: 0 },
    { label: "Rejected", count: 0 },
  ];

  const candidates = [
    {
      name: "Shahin Bano",
      role: "Graphic Designer & Vi…",
      tag: "Creative Graphic Designer with Video E…",
      email: "shahinbanoshahin@gmail.com",
      phone: "9315914163",
      location: "Delhi",
      applied: "Apr 30, 2026",
      hue: 12,
      initials: null,
    },
    {
      name: "Seema Ahirwar",
      role: "Graphic Designer",
      tag: "Creative Graphic Designer with Video E…",
      email: "ahirwarseema89@gmail.com",
      phone: "+91 9654988218",
      location: "Rohini, Delhi",
      applied: "Apr 30, 2026",
      hue: 160,
      initials: "SA",
    },
    {
      name: "Rushikesh Rajendr…",
      role: "Backup & Replication …",
      tag: "Backup & Replication Administrator – L2",
      email: "rushikeshjagtap1516@gmail.com",
      phone: "9136283618",
      location: "Applied: Apr 29, 2026",
      applied: "Apr 29, 2026",
      hue: 25,
      initials: "RR",
    },
  ];

  const palette: Record<string, { bar: string; chip: string }> = {
    indigo: {
      bar: "bg-indigo-500",
      chip: "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
    },
    sky: {
      bar: "bg-sky-500",
      chip: "bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
    },
    amber: {
      bar: "bg-amber-500",
      chip: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
    },
    emerald: {
      bar: "bg-emerald-500",
      chip: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    },
    rose: {
      bar: "bg-rose-500",
      chip: "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
    },
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="overflow-hidden rounded-2xl border border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900"
          >
            <div className={`h-1 w-full ${palette[s.color].bar}`} />
            <div className="p-3">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-ink-600 dark:text-ink-400">
                <span
                  className={`h-3 w-3 rounded-full ${palette[s.color].chip}`}
                />
                {s.label}
              </div>
              <div className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink-900 dark:text-ink-50">
                {s.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {tabs.map((t) => (
          <button
            key={t.label}
            type="button"
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
              t.active
                ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-[0_8px_20px_-8px_rgba(124,58,237,0.4)]"
                : "border border-ink-200 bg-white text-ink-700 hover:bg-ink-50 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-300"
            }`}
          >
            {t.label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                t.active ? "bg-white/20 text-white" : "bg-ink-100 text-ink-700 dark:bg-ink-800 dark:text-ink-300"
              }`}
            >
              {t.count}
            </span>
          </button>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {candidates.map((c) => (
          <div
            key={c.name}
            className="overflow-hidden rounded-2xl border border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900"
          >
            <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-rose-400 to-fuchsia-400" />
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-white"
                    style={{ background: `hsl(${c.hue} 70% 50%)` }}
                  >
                    {c.initials ?? c.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-[13px] font-semibold text-ink-900 dark:text-ink-50">
                      {c.name}
                    </div>
                    <div className="truncate text-[11px] text-ink-500 dark:text-ink-400">
                      {c.role}
                    </div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  Applied
                </span>
              </div>

              <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-violet-50 px-2 py-1 text-[10px] font-medium text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-300">
                <Briefcase className="h-3 w-3" />
                <span className="truncate">{c.tag}</span>
              </div>

              <ul className="mt-3 space-y-1.5 text-[11px] text-ink-600 dark:text-ink-400">
                <li className="flex items-center gap-2">
                  <Mail className="h-3 w-3 text-ink-400" />
                  <span className="truncate">{c.email}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-3 w-3 text-ink-400" />
                  {c.phone}
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-ink-400" />
                  {c.location}
                </li>
                <li className="flex items-center gap-2">
                  <CalendarDays className="h-3 w-3 text-ink-400" />
                  Applied: {c.applied}
                </li>
              </ul>

              <button
                type="button"
                className="mt-4 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-[12px] font-semibold text-white"
              >
                <Video className="h-3.5 w-3.5" />
                Move to Interview
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------ Question Bank view ------------------

function QuestionBankView() {
  const questions = [
    {
      q: "What is the virtual DOM?",
      category: "react",
      difficulty: "basic",
      diffColor: "emerald",
    },
    {
      q: "What is memoization in React (React.memo, useMemo, useCallback)?",
      category: "react",
      difficulty: "advanced",
      diffColor: "rose",
    },
    {
      q: "What are React hooks? Name some commonly used hooks.",
      category: "react",
      difficulty: "intermediate",
      diffColor: "amber",
    },
    {
      q: "Explain the event loop in JavaScript.",
      category: "javascript",
      difficulty: "intermediate",
      diffColor: "amber",
    },
    {
      q: "What is the difference between SSR, SSG, and ISR in Next.js?",
      category: "next.js",
      difficulty: "advanced",
      diffColor: "rose",
    },
  ];

  const diffPalette: Record<string, string> = {
    emerald:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    amber:
      "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
    rose: "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-display text-[18px] font-semibold tracking-tight text-ink-900 dark:text-ink-50">
            Questions Bank
          </h3>
          <p className="text-[12px] text-ink-500 dark:text-ink-400">
            Reusable question library scored against role rubrics
          </p>
        </div>
        <button
          type="button"
          className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 px-4 text-[12px] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(124,58,237,0.4)]"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Question
        </button>
      </div>

      <div className="space-y-2.5">
        {questions.map((row) => (
          <div
            key={row.q}
            className="flex items-center gap-3 rounded-2xl border border-ink-200 bg-white p-4 transition-colors hover:border-violet-300 hover:bg-violet-50/30 dark:border-ink-800 dark:bg-ink-900 dark:hover:border-violet-500/40 dark:hover:bg-violet-500/5"
          >
            <div className="min-w-0 flex-1">
              <div className="text-[14px] font-semibold text-ink-900 dark:text-ink-50">
                {row.q}
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-ink-500 dark:text-ink-400">
                <span>
                  Category:{" "}
                  <span className="rounded-md bg-violet-50 px-1.5 py-0.5 font-semibold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                    {row.category}
                  </span>
                </span>
                <span className="text-ink-300 dark:text-ink-700">|</span>
                <span>
                  Difficulty:{" "}
                  <span
                    className={`rounded-md px-1.5 py-0.5 font-semibold ${diffPalette[row.diffColor]}`}
                  >
                    {row.difficulty}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Edit question"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-ink-50"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                aria-label="Delete question"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-rose-500 transition-colors hover:bg-rose-50 dark:hover:bg-rose-500/10"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------ Resumes view ------------------

function ResumesView() {
  const stats = [
    { label: "Total Resumes", value: "184", icon: Database, color: "indigo" },
    { label: "Parsed", value: "184", icon: CheckCircle2, color: "emerald" },
    { label: "Processing", value: "0", icon: Clock, color: "sky" },
    { label: "Failed", value: "0", icon: AlertTriangle, color: "rose" },
  ];

  const palette: Record<string, { bar: string; chip: string; text: string }> = {
    indigo: {
      bar: "bg-indigo-500",
      chip: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300",
      text: "text-indigo-700 dark:text-indigo-300",
    },
    emerald: {
      bar: "bg-emerald-500",
      chip: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300",
      text: "text-emerald-700 dark:text-emerald-300",
    },
    sky: {
      bar: "bg-sky-500",
      chip: "bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300",
      text: "text-sky-700 dark:text-sky-300",
    },
    rose: {
      bar: "bg-rose-500",
      chip: "bg-rose-50 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300",
      text: "text-rose-700 dark:text-rose-300",
    },
  };

  const rows = [
    { name: "Aarav Mehta", email: "aarav.mehta@gmail.com", role: "Senior Frontend Engineer", years: "6 yrs", hue: 220 },
    { name: "Priya Raghavan", email: "priya.r@protonmail.com", role: "Product Designer", years: "4 yrs", hue: 280 },
    { name: "Saanvi Desai", email: "saanvi.desai@outlook.com", role: "Data Analyst", years: "3 yrs", hue: 340 },
    { name: "Rohan Kapoor", email: "rohan@kapoor.dev", role: "DevOps Engineer", years: "7 yrs", hue: 30 },
    { name: "Meera Iyer", email: "meera.iyer@hey.com", role: "Backend Engineer", years: "5 yrs", hue: 160 },
  ];

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-violet-50 via-indigo-50 to-violet-100/60 p-5 dark:from-violet-500/10 dark:via-indigo-500/10 dark:to-violet-500/5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-violet-600 shadow-sm dark:bg-ink-900 dark:text-violet-300">
              <Database className="h-5 w-5" />
            </span>
            <div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">
                <Sparkles className="h-2.5 w-2.5" />
                Talent Pool
              </span>
              <div className="mt-1 font-display text-xl font-semibold tracking-tight text-ink-900 dark:text-ink-50">
                Resume Database
              </div>
              <p className="mt-1 max-w-md text-[12px] text-ink-600 dark:text-ink-400">
                Central repository of all candidate resumes. Upload in bulk and
                search by skills, experience, and location.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="hidden h-10 items-center gap-1.5 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 px-4 text-[12px] font-semibold text-white sm:inline-flex"
          >
            <Upload className="h-3.5 w-3.5" />
            Upload Resumes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="overflow-hidden rounded-2xl border border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900"
          >
            <div className={`h-1 w-full ${palette[s.color].bar}`} />
            <div className="p-3">
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-lg ${palette[s.color].chip}`}
                >
                  <s.icon className="h-3 w-3" />
                </span>
                <span className="text-[11px] font-medium text-ink-600 dark:text-ink-400">
                  {s.label}
                </span>
              </div>
              <div
                className={`mt-2 font-display text-2xl font-semibold tracking-tight ${palette[s.color].text}`}
              >
                {s.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-ink-200 bg-white p-2.5 dark:border-ink-800 dark:bg-ink-900">
        <div className="flex min-w-0 flex-1 items-center gap-2 px-2 text-[12px] text-ink-500 dark:text-ink-400">
          <Search className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">Search by name, email, skills, location…</span>
          <span className="ml-auto hidden shrink-0 rounded border border-ink-200 px-1.5 py-0.5 text-[10px] sm:inline dark:border-ink-700">
            /
          </span>
        </div>
        <button
          type="button"
          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 px-4 text-[12px] font-semibold text-white"
        >
          <Search className="h-3.5 w-3.5" />
          Search
        </button>
        <span className="hidden text-[11px] text-ink-500 lg:inline dark:text-ink-400">
          <span className="font-semibold text-ink-900 dark:text-ink-50">184</span>{" "}
          resumes in database
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
        <div className="overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[1.5fr_1.6fr_1.4fr_0.7fr] gap-2 border-b border-ink-200 bg-cream-50 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-500 dark:border-ink-800 dark:bg-ink-950 dark:text-ink-400">
              <span>Name</span>
              <span>Email</span>
              <span>Designation</span>
              <span>Experienc</span>
            </div>
            {rows.map((r, i) => (
              <div
                key={r.name}
                className={`grid grid-cols-[1.5fr_1.6fr_1.4fr_0.7fr] items-center gap-2 px-4 py-3 text-[12px] ${
                  i !== rows.length - 1
                    ? "border-b border-ink-100 dark:border-ink-800"
                    : ""
                }`}
              >
                <span className="flex items-center gap-2 truncate font-medium text-ink-900 dark:text-ink-50">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white"
                    style={{ background: `hsl(${r.hue} 70% 50%)` }}
                  >
                    {r.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  {r.name}
                </span>
                <span className="truncate text-ink-600 dark:text-ink-400">{r.email}</span>
                <span className="truncate text-ink-700 dark:text-ink-300">{r.role}</span>
                <span className="text-ink-500 dark:text-ink-400">{r.years}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
