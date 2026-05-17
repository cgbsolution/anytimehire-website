"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  Globe,
  Home,
  Mail,
  ShieldCheck,
  Video,
  Zap,
} from "lucide-react";

export function ThankYouBooking() {
  const params = useSearchParams();
  const rawName = params.get("name")?.trim() || "";
  const email = params.get("email")?.trim() || "";
  const date = params.get("date")?.trim() || "";
  const time = params.get("time")?.trim() || "";
  const firstName = rawName ? rawName.split(" ")[0] : "there";
  const whenLabel = [date, time].filter(Boolean).join(" · ");

  return (
    <div className="mx-auto max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl border border-ink-200 bg-white p-8 shadow-[0_30px_60px_-30px_rgba(16,24,40,0.18)] dark:border-ink-800 dark:bg-ink-900 sm:p-10"
      >
        <Confetti />

        <div className="relative">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Demo confirmed
            </span>
          </div>

          <h1 className="mt-5 text-center font-display text-3xl font-semibold tracking-tight text-ink-900 dark:text-ink-50 sm:text-[36px]">
            You're all set,{" "}
            <span className="text-brand-600 dark:text-brand-400">
              {firstName}
            </span>
            .
          </h1>
          <p className="mx-auto mt-3 max-w-md text-center text-[15px] leading-relaxed text-ink-600 dark:text-ink-400">
            Your free 30-min demo is booked. We'll do a live walkthrough on
            your real hiring role and activate your free interview credits.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <DetailTile
              icon={<CalendarDays className="h-4 w-4 text-brand-600" />}
              label="When"
              value={whenLabel || "Check your inbox"}
            />
            <DetailTile
              icon={<Clock className="h-4 w-4 text-brand-600" />}
              label="Duration"
              value="30 minutes"
            />
            <DetailTile
              icon={<Video className="h-4 w-4 text-brand-600" />}
              label="Meeting via"
              value="Google Meet"
            />
            <DetailTile
              icon={<Globe className="h-4 w-4 text-brand-600" />}
              label="Reschedule"
              value="Anytime, free"
            />
          </div>

          <div className="relative mt-5 overflow-hidden rounded-2xl bg-gradient-to-br from-ink-900 to-ink-800 p-5 text-white dark:from-ink-950 dark:to-ink-900">
            <div
              aria-hidden
              className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-amber-400/30 blur-2xl"
            />
            <div className="relative flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300 ring-1 ring-amber-300/30">
                <Zap className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-display text-[15px] font-semibold">
                  5 free interview credits
                </div>
                <p className="mt-0.5 text-[13px] leading-snug text-white/70">
                  Activated after your demo — start screening candidates right
                  away.
                </p>
              </div>
              <span className="ml-auto hidden rounded-lg bg-amber-400 px-3 py-1.5 font-display text-lg font-extrabold text-ink-900 sm:inline">
                5×
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-[13.5px] text-ink-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-ink-200">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-300" />
            <div className="leading-relaxed">
              Check your inbox — the Google Meet link and calendar invite
              are on the way
              {email ? (
                <>
                  {" "}
                  to{" "}
                  <span className="font-semibold text-ink-900 dark:text-ink-50">
                    {email}
                  </span>
                </>
              ) : null}
              .
            </div>
          </div>

          <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-brand-600 px-6 text-[14px] font-semibold text-white shadow-[0_10px_28px_-10px_rgba(70,95,255,0.6)] transition-all hover:bg-brand-700 hover:shadow-[0_14px_32px_-10px_rgba(70,95,255,0.7)]"
            >
              <Home className="h-4 w-4" />
              Go to AnytimeHire
            </Link>
          </div>

          <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[12px] text-ink-500 dark:text-ink-400">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            No card required · We never share your details
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function DetailTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-ink-200 bg-cream-50 p-4 dark:border-ink-800 dark:bg-ink-950">
      <div className="flex items-center gap-2">
        {icon}
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-500 dark:text-ink-400">
          {label}
        </div>
      </div>
      <div className="mt-1.5 text-[14px] font-semibold text-ink-900 dark:text-ink-50">
        {value}
      </div>
    </div>
  );
}

function Confetti() {
  const pieces = useMemo(() => {
    const colors = ["#3641f5", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"];
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 4 + Math.random() * 7,
      color: colors[i % colors.length],
      delay: Math.random() * 0.6,
      duration: 2 + Math.random() * 2,
      drift: (Math.random() - 0.5) * 100,
      rotate: 360 + Math.random() * 720,
      round: Math.random() > 0.5,
    }));
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: -20, x: 0, rotate: 0, opacity: 1 }}
          animate={{
            y: 700,
            x: p.drift,
            rotate: p.rotate,
            opacity: 0,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeIn",
          }}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.round ? "50%" : 2,
          }}
          className="absolute top-0"
        />
      ))}
    </div>
  );
}
