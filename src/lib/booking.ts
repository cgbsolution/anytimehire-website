import { promises as fs } from "node:fs";
import path from "node:path";

export const SLOT_MINUTES = 30;
export const BUSINESS_HOURS = {
  // 24h, in the BOOKING_TIMEZONE
  startHour: 9, // 09:00
  endHour: 17, // last slot starts at 16:30, ends 17:00
  // skip lunch 12:00–13:00
  lunchStartHour: 12,
  lunchEndHour: 13,
};

export const TIMEZONE = process.env.BOOKING_TIMEZONE || "Asia/Kolkata";

/**
 * Generate the slot grid for a given local YYYY-MM-DD date, in the configured
 * timezone. Excludes weekends, lunch break, and any timestamp <= now.
 */
export function generateSlotsForDate(dateStr: string): {
  startsAt: string;
  endsAt: string;
  label: string;
}[] {
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m || !d) return [];

  const out: { startsAt: string; endsAt: string; label: string }[] = [];
  const now = new Date();

  for (let hour = BUSINESS_HOURS.startHour; hour < BUSINESS_HOURS.endHour; hour++) {
    if (hour >= BUSINESS_HOURS.lunchStartHour && hour < BUSINESS_HOURS.lunchEndHour) {
      continue;
    }
    for (const minute of [0, 30]) {
      const starts = zonedTimeToUtc(y, m, d, hour, minute, TIMEZONE);
      const ends = new Date(starts.getTime() + SLOT_MINUTES * 60_000);

      const localDay = new Date(starts.toLocaleString("en-US", { timeZone: TIMEZONE }));
      const dow = localDay.getDay();
      if (dow === 0 || dow === 6) continue;

      if (starts.getTime() <= now.getTime()) continue;

      out.push({
        startsAt: starts.toISOString(),
        endsAt: ends.toISOString(),
        label: formatTimeLabel(starts),
      });
    }
  }
  return out;
}

function zonedTimeToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  tz: string,
): Date {
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute, 0, 0);
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = dtf.formatToParts(new Date(utcGuess));
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const tzAsUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour") % 24,
    get("minute"),
    get("second"),
  );
  const offsetMs = tzAsUtc - utcGuess;
  return new Date(utcGuess - offsetMs);
}

function formatTimeLabel(starts: Date): string {
  return starts.toLocaleTimeString("en-US", {
    timeZone: TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Returns the slot grid for a date with `available: false` flagged for any
 * slot already booked in data/bookings.jsonl.
 */
export async function getAvailability(dateStr: string) {
  const slots = generateSlotsForDate(dateStr);
  if (slots.length === 0) return [];

  const taken = new Set<string>();
  try {
    const file = path.join(process.cwd(), "data", "bookings.jsonl");
    const txt = await fs.readFile(file, "utf8");
    for (const line of txt.split("\n")) {
      if (!line.trim()) continue;
      try {
        const rec = JSON.parse(line) as { starts_at?: string; status?: string };
        if (rec.status === "confirmed" && rec.starts_at) {
          taken.add(new Date(rec.starts_at).toISOString());
        }
      } catch {
        // skip malformed line
      }
    }
  } catch {
    // file doesn't exist yet — all slots free
  }

  return slots.map((s) => ({ ...s, available: !taken.has(s.startsAt) }));
}
