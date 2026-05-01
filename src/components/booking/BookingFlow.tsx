"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  Globe,
  Video,
  Sparkles,
  ShieldCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";

type Step = "datetime" | "details" | "confirmed";

type Slot = {
  startsAt: string; // ISO
  endsAt: string;
  label: string;
  available: boolean;
};

const TIMEZONES: { iana: string; label: string }[] = [
  { iana: "Asia/Kolkata", label: "Asia/Kolkata (IST)" },
  { iana: "Asia/Singapore", label: "Asia/Singapore (SGT)" },
  { iana: "Asia/Dubai", label: "Asia/Dubai (GST)" },
  { iana: "Europe/London", label: "Europe/London (BST)" },
  { iana: "America/New_York", label: "America/New_York (EST)" },
  { iana: "America/Los_Angeles", label: "America/Los_Angeles (PST)" },
];

export function BookingFlow() {
  const [step, setStep] = useState<Step>("datetime");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [timezone, setTimezone] = useState(TIMEZONES[0].iana);
  const [confirmation, setConfirmation] = useState<{
    name: string;
    email: string;
    date: string;
    time: string;
  } | null>(null);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-700 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-300">
          <Sparkles className="h-3 w-3 text-brand-500" />
          Book a 30-min demo
        </span>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink-900 dark:text-ink-50 sm:text-5xl">
          Pick a time that works for you.
        </h1>
        <p className="mt-3 mx-auto max-w-xl text-[16px] leading-relaxed text-ink-600 dark:text-ink-400">
          We'll show you AnytimeHire running on a real role, answer questions,
          and activate your free 5-credit account on the call.
        </p>
      </div>

      <ol className="mx-auto mt-10 flex max-w-md items-center justify-between gap-2 text-[12px] font-medium">
        {(
          [
            { key: "datetime", label: "Pick a slot" },
            { key: "details", label: "Your details" },
            { key: "confirmed", label: "Confirmed" },
          ] as const
        ).map((s, i) => {
          const isActive = step === s.key;
          const stepIdx = step === "datetime" ? 0 : step === "details" ? 1 : 2;
          const isDone = i < stepIdx;
          return (
            <li key={s.key} className="flex flex-1 items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold ${
                  isDone
                    ? "bg-emerald-500 text-white"
                    : isActive
                      ? "bg-brand-600 text-white"
                      : "bg-ink-200 text-ink-500 dark:bg-ink-800 dark:text-ink-400"
                }`}
              >
                {isDone ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span
                className={
                  isActive
                    ? "text-ink-900 dark:text-ink-50"
                    : "text-ink-500 dark:text-ink-400"
                }
              >
                {s.label}
              </span>
              {i < 2 && (
                <span className="ml-1 hidden h-px flex-1 bg-ink-200 sm:block dark:bg-ink-800" />
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-10 grid gap-6 lg:grid-cols-[340px_1fr]">
        <SummaryCard
          selectedDate={selectedDate}
          selectedSlot={selectedSlot}
          timezone={timezone}
          confirmation={confirmation}
        />

        <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-[0_30px_60px_-30px_rgba(16,24,40,0.18)] dark:border-ink-800 dark:bg-ink-900 sm:p-8">
          <AnimatePresence mode="wait">
            {step === "datetime" && (
              <motion.div
                key="datetime"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <DateTimeStep
                  selectedDate={selectedDate}
                  setSelectedDate={(d) => {
                    setSelectedDate(d);
                    setSelectedSlot(null);
                  }}
                  selectedSlot={selectedSlot}
                  setSelectedSlot={setSelectedSlot}
                  timezone={timezone}
                  setTimezone={setTimezone}
                  onContinue={() => setStep("details")}
                />
              </motion.div>
            )}
            {step === "details" && selectedSlot && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <DetailsStep
                  onBack={() => setStep("datetime")}
                  selectedSlot={selectedSlot}
                  timezone={timezone}
                  onConfirmed={(data) => {
                    setConfirmation(data);
                    setStep("confirmed");
                  }}
                />
              </motion.div>
            )}
            {step === "confirmed" && confirmation && (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <ConfirmedStep confirmation={confirmation} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  selectedDate,
  selectedSlot,
  timezone,
  confirmation,
}: {
  selectedDate: Date | null;
  selectedSlot: Slot | null;
  timezone: string;
  confirmation: { name: string; email: string; date: string; time: string } | null;
}) {
  const tzLabel =
    TIMEZONES.find((t) => t.iana === timezone)?.label ?? timezone;

  return (
    <aside className="rounded-3xl border border-ink-200 bg-gradient-to-br from-cream-50 to-white p-6 dark:border-ink-800 dark:from-ink-900 dark:to-ink-950">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-600 dark:text-ink-400">
        <Sparkles className="h-3.5 w-3.5 text-brand-500" />
        AnytimeHire
      </div>
      <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink-900 dark:text-ink-50">
        Free 30-min demo
      </h2>
      <p className="mt-2 text-[14px] leading-relaxed text-ink-600 dark:text-ink-400">
        Live walkthrough on your real role + 5 free interview credits.
      </p>
      <ul className="mt-5 space-y-3 text-[13px]">
        <li className="flex items-center gap-2.5 text-ink-700 dark:text-ink-300">
          <Clock className="h-4 w-4 text-brand-600" />
          30 minutes
        </li>
        <li className="flex items-center gap-2.5 text-ink-700 dark:text-ink-300">
          <Video className="h-4 w-4 text-brand-600" />
          Google Meet (link in confirmation email)
        </li>
        <li className="flex items-center gap-2.5 text-ink-700 dark:text-ink-300">
          <Globe className="h-4 w-4 text-brand-600" />
          {tzLabel}
        </li>
        <li className="flex items-center gap-2.5 text-ink-700 dark:text-ink-300">
          <CalendarDays className="h-4 w-4 text-brand-600" />
          {confirmation
            ? `${confirmation.date} · ${confirmation.time}`
            : selectedDate && selectedSlot
              ? `${formatLong(selectedDate)} · ${selectedSlot.label}`
              : "Pick a slot →"}
        </li>
      </ul>

      <div className="mt-6 rounded-2xl border border-ink-200 bg-white p-4 text-[12px] dark:border-ink-800 dark:bg-ink-950">
        <div className="flex items-center gap-2 font-semibold text-ink-800 dark:text-ink-100">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          You're covered
        </div>
        <p className="mt-1.5 leading-relaxed text-ink-600 dark:text-ink-400">
          Reschedule any time. No card required. We never share your details.
        </p>
      </div>
    </aside>
  );
}

function DateTimeStep({
  selectedDate,
  setSelectedDate,
  selectedSlot,
  setSelectedSlot,
  timezone,
  setTimezone,
  onContinue,
}: {
  selectedDate: Date | null;
  setSelectedDate: (d: Date | null) => void;
  selectedSlot: Slot | null;
  setSelectedSlot: (s: Slot | null) => void;
  timezone: string;
  setTimezone: (t: string) => void;
  onContinue: () => void;
}) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [viewMonth, setViewMonth] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  const grid = useMemo(() => buildMonthGrid(viewMonth), [viewMonth]);
  const canContinue = !!selectedDate && !!selectedSlot;

  // Fetch live availability whenever the chosen date changes
  useEffect(() => {
    let cancelled = false;
    if (!selectedDate) {
      setSlots([]);
      return;
    }
    const dateStr = toIsoDate(selectedDate);
    setLoadingSlots(true);
    setSlotsError(null);
    fetch(`/api/bookings/availability?date=${dateStr}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return (await r.json()) as { slots: Slot[] };
      })
      .then((j) => {
        if (cancelled) return;
        setSlots(j.slots ?? []);
      })
      .catch((e) => {
        if (cancelled) return;
        console.error("[booking] availability error", e);
        setSlotsError("Couldn't load slots. Please try again.");
        setSlots([]);
      })
      .finally(() => !cancelled && setLoadingSlots(false));
    return () => {
      cancelled = true;
    };
  }, [selectedDate]);

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_240px]">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold tracking-tight text-ink-900 dark:text-ink-50">
            {monthYear(viewMonth)}
          </h3>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Previous month"
              onClick={() =>
                setViewMonth(
                  new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1),
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-200 text-ink-700 transition-colors hover:bg-ink-50 dark:border-ink-800 dark:text-ink-300 dark:hover:bg-ink-800"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next month"
              onClick={() =>
                setViewMonth(
                  new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1),
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-200 text-ink-700 transition-colors hover:bg-ink-50 dark:border-ink-800 dark:text-ink-300 dark:hover:bg-ink-800"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-500 dark:text-ink-400">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d} className="py-1.5">
              {d}
            </div>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {grid.map((cell, i) => {
            if (!cell) return <div key={i} aria-hidden />;
            const isPast = cell < today;
            const isWeekend = cell.getDay() === 0 || cell.getDay() === 6;
            const disabled = isPast || isWeekend;
            const isSelected =
              selectedDate && cell.getTime() === selectedDate.getTime();
            const isToday = cell.getTime() === today.getTime();
            return (
              <button
                key={i}
                type="button"
                disabled={disabled}
                onClick={() => setSelectedDate(cell)}
                className={`relative aspect-square rounded-xl text-[13px] font-medium transition-all ${
                  isSelected
                    ? "bg-brand-600 text-white shadow-[0_8px_20px_-8px_rgba(12,124,90,0.6)]"
                    : disabled
                      ? "cursor-not-allowed text-ink-300 dark:text-ink-700"
                      : "text-ink-800 hover:bg-brand-50 hover:text-brand-700 dark:text-ink-200 dark:hover:bg-brand-500/10 dark:hover:text-brand-300"
                }`}
              >
                {cell.getDate()}
                {isToday && !isSelected && (
                  <span className="absolute inset-x-0 bottom-1 mx-auto h-1 w-1 rounded-full bg-brand-500" />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          <label
            htmlFor="booking-tz"
            className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-500 dark:text-ink-400"
          >
            Timezone
          </label>
          <select
            id="booking-tz"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-ink-200 bg-white px-3 text-[14px] text-ink-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-ink-800 dark:bg-ink-950 dark:text-ink-50"
          >
            {TIMEZONES.map((tz) => (
              <option key={tz.iana} value={tz.iana}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="md:border-l md:border-ink-200 md:pl-6 dark:md:border-ink-800">
        <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-500 dark:text-ink-400">
          {selectedDate ? formatShort(selectedDate) : "Pick a date first"}
        </h4>
        <div className="mt-3 max-h-[320px] space-y-1.5 overflow-y-auto pr-1">
          {!selectedDate && (
            <div className="rounded-xl border border-dashed border-ink-200 p-5 text-center text-[13px] text-ink-500 dark:border-ink-800 dark:text-ink-400">
              Select an available date to see open slots.
            </div>
          )}
          {selectedDate && loadingSlots && (
            <div className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-ink-200 p-5 text-[13px] text-ink-500 dark:border-ink-800 dark:text-ink-400">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Loading available slots…
            </div>
          )}
          {selectedDate && !loadingSlots && slotsError && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-center text-[13px] text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
              {slotsError}
            </div>
          )}
          {selectedDate && !loadingSlots && !slotsError && slots.length === 0 && (
            <div className="rounded-xl border border-dashed border-ink-200 p-5 text-center text-[13px] text-ink-500 dark:border-ink-800 dark:text-ink-400">
              No slots available for this day. Try another date.
            </div>
          )}
          {selectedDate && !loadingSlots && !slotsError &&
            slots.map((slot) => {
              const active =
                selectedSlot && selectedSlot.startsAt === slot.startsAt;
              const disabled = !slot.available;
              return (
                <button
                  key={slot.startsAt}
                  type="button"
                  disabled={disabled}
                  onClick={() => setSelectedSlot(slot)}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-2.5 text-left text-[14px] font-medium transition-all ${
                    disabled
                      ? "cursor-not-allowed border-ink-200 bg-ink-50 text-ink-400 line-through dark:border-ink-800 dark:bg-ink-950 dark:text-ink-600"
                      : active
                        ? "border-brand-500 bg-brand-50 text-brand-700 dark:border-brand-500/50 dark:bg-brand-500/15 dark:text-brand-200"
                        : "border-ink-200 text-ink-800 hover:border-brand-400 hover:bg-brand-50/50 dark:border-ink-800 dark:text-ink-200 dark:hover:border-brand-500/40 dark:hover:bg-brand-500/10"
                  }`}
                >
                  <span>{slot.label}</span>
                  {disabled && (
                    <span className="text-[10px] font-semibold uppercase tracking-[0.1em]">
                      Taken
                    </span>
                  )}
                </button>
              );
            })}
        </div>

        <button
          type="button"
          disabled={!canContinue}
          onClick={onContinue}
          className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-5 text-[14px] font-semibold text-white transition-all hover:bg-brand-700 disabled:opacity-50"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function DetailsStep({
  onBack,
  selectedSlot,
  timezone,
  onConfirmed,
}: {
  onBack: () => void;
  selectedSlot: Slot;
  timezone: string;
  onConfirmed: (data: {
    name: string;
    email: string;
    date: string;
    time: string;
  }) => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          message: data.message,
          starts_at: selectedSlot.startsAt,
          timezone,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Could not save your booking");
      }

      const startsAtDate = new Date(selectedSlot.startsAt);
      onConfirmed({
        name: data.name,
        email: data.email,
        date: formatLong(startsAtDate),
        time: selectedSlot.label,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <button
        type="button"
        onClick={onBack}
        className="mb-5 inline-flex items-center gap-2 text-[13px] font-medium text-ink-600 hover:text-ink-900 dark:text-ink-400 dark:hover:text-ink-50"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to slot
      </button>

      <h3 className="font-display text-2xl font-semibold tracking-tight text-ink-900 dark:text-ink-50">
        Tell us about you.
      </h3>
      <p className="mt-2 text-[14px] text-ink-600 dark:text-ink-400">
        We'll send a confirmation and a calendar invite to this email.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Full name" name="name" placeholder="Priya Raghavan" required />
        <Field label="Phone" name="phone" type="tel" placeholder="+91 98XXXXXXXX" />
      </div>
      <div className="mt-3">
        <Field
          label="Work email"
          name="email"
          type="email"
          placeholder="priya@company.com"
          required
        />
      </div>
      <div className="mt-3">
        <Field label="Company" name="company" placeholder="Lumen Labs" />
      </div>
      <div className="mt-3">
        <label
          htmlFor="booking-message"
          className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-500 dark:text-ink-400"
        >
          What would you like to see?
        </label>
        <textarea
          id="booking-message"
          name="message"
          rows={3}
          placeholder="Roles you're hiring, volume, current ATS…"
          className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white p-3 text-[14px] text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-ink-800 dark:bg-ink-950 dark:text-ink-50 dark:placeholder:text-ink-500"
        />
      </div>

      {error && (
        <p className="mt-3 text-xs text-rose-600 dark:text-rose-400">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 text-[15px] font-semibold text-white transition-all hover:bg-brand-700 disabled:opacity-60"
      >
        {submitting ? "Confirming…" : "Confirm Booking"}
        {!submitting && <ArrowRight className="h-4 w-4" />}
      </button>
      <p className="mt-3 text-center text-[11px] text-ink-500 dark:text-ink-400">
        By booking, you agree to our{" "}
        <Link href="#" className="underline-offset-2 hover:underline">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}

function ConfirmedStep({
  confirmation,
}: {
  confirmation: { name: string; email: string; date: string; time: string };
}) {
  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-1 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30"
      >
        <Check className="h-8 w-8" />
      </motion.div>
      <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight text-ink-900 dark:text-ink-50">
        You're booked, {confirmation.name.split(" ")[0]}.
      </h3>
      <p className="mt-3 text-[15px] text-ink-600 dark:text-ink-400">
        We've sent a calendar invite and Google Meet link to{" "}
        <span className="font-semibold text-ink-900 dark:text-ink-100">
          {confirmation.email}
        </span>
        .
      </p>

      <div className="mx-auto mt-8 inline-flex flex-col items-stretch gap-2.5 rounded-2xl border border-ink-200 bg-cream-50 p-5 text-left text-[13px] dark:border-ink-800 dark:bg-ink-950">
        <div className="flex items-center gap-2.5 text-ink-800 dark:text-ink-200">
          <CalendarDays className="h-4 w-4 text-brand-600" />
          <span className="font-semibold">{confirmation.date}</span>
        </div>
        <div className="flex items-center gap-2.5 text-ink-800 dark:text-ink-200">
          <Clock className="h-4 w-4 text-brand-600" />
          <span className="font-semibold">{confirmation.time}</span>
        </div>
        <div className="flex items-center gap-2.5 text-ink-800 dark:text-ink-200">
          <Video className="h-4 w-4 text-brand-600" />
          Google Meet · link in your invite
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-ink-900 px-5 text-[14px] font-semibold text-white transition-all hover:bg-ink-800 dark:bg-ink-50 dark:text-ink-900 dark:hover:bg-white"
        >
          Back to home
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
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
        htmlFor={`booking-${name}`}
        className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-500 dark:text-ink-400"
      >
        {label}
        {required && <span className="ml-1 text-rose-500">*</span>}
      </label>
      <input
        id={`booking-${name}`}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-1.5 h-11 w-full rounded-xl border border-ink-200 bg-white px-3 text-[14px] text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-ink-800 dark:bg-ink-950 dark:text-ink-50 dark:placeholder:text-ink-500"
      />
    </div>
  );
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function toIsoDate(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function buildMonthGrid(monthAnchor: Date): (Date | null)[] {
  const first = new Date(monthAnchor.getFullYear(), monthAnchor.getMonth(), 1);
  const last = new Date(monthAnchor.getFullYear(), monthAnchor.getMonth() + 1, 0);
  const startWeekday = (first.getDay() + 6) % 7;
  const daysInMonth = last.getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(monthAnchor.getFullYear(), monthAnchor.getMonth(), d));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function monthYear(d: Date) {
  return d.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

function formatShort(d: Date) {
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

function formatLong(d: Date) {
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
