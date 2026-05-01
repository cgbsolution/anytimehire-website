import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { sendMail, buildIcs } from "@/lib/email";
import { insertCalendarEvent } from "@/lib/google-calendar";
import { SLOT_MINUTES, TIMEZONE } from "@/lib/booking";

const TO_EMAIL = process.env.LEAD_TO_EMAIL || "rishabh.negi@artboxsolutions.com";
const LOCAL_FILE = "data/bookings.jsonl";

type BookingBody = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  starts_at?: string;
  timezone?: string;
};

type LocalRecord = {
  id: string;
  starts_at: string;
  ends_at: string;
  timezone: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string | null;
  payload: unknown;
  status: "confirmed";
  created_at: string;
  google_event_id?: string | null;
};

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: BookingBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.name || !body.email || !body.starts_at) {
    return NextResponse.json(
      { error: "name, email, and starts_at are required" },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const startsAt = new Date(body.starts_at);
  if (Number.isNaN(startsAt.getTime())) {
    return NextResponse.json(
      { error: "Invalid starts_at — expected ISO 8601" },
      { status: 400 },
    );
  }
  if (startsAt.getTime() <= Date.now()) {
    return NextResponse.json({ error: "Slot is in the past" }, { status: 400 });
  }
  const endsAt = new Date(startsAt.getTime() + SLOT_MINUTES * 60_000);
  const timezone = body.timezone || TIMEZONE;

  // Persist (with conflict check)
  const persistResult = await persistLocally({
    starts_at: startsAt.toISOString(),
    ends_at: endsAt.toISOString(),
    timezone,
    name: body.name,
    email: body.email,
    phone: body.phone ?? null,
    company: body.company ?? null,
    message: body.message ?? null,
    payload: body,
  });

  if (!persistResult.ok) {
    return NextResponse.json(
      { error: "Could not save your booking" },
      { status: 500 },
    );
  }
  if (persistResult.conflict) {
    return NextResponse.json(
      { error: "That slot was just taken — please pick another time." },
      { status: 409 },
    );
  }

  const bookingId = persistResult.id!;

  // Best-effort Google Calendar event creation
  let googleEventId: string | null = null;
  try {
    googleEventId = await insertCalendarEvent({
      startsAt,
      endsAt,
      summary: `AnytimeHire demo · ${body.name}`,
      description: `${body.name} (${body.email})\n${body.company ?? ""}\n\n${body.message ?? ""}`,
      attendeeEmail: body.email,
      timezone,
    });
    if (googleEventId) {
      await updateLocalRecord(bookingId, { google_event_id: googleEventId });
    }
  } catch (e) {
    console.error("[bookings] gcal insert failed", e);
  }

  // Email both sides with .ics attachment
  const ics = buildIcs({
    uid: `booking-${bookingId}@anytimehire`,
    startsAt,
    endsAt,
    summary: "AnytimeHire 30-min demo",
    description: `Booking from ${body.name} (${body.email})`,
    organizerEmail: TO_EMAIL,
    attendeeEmail: body.email,
    location: "Google Meet — link will be in the calendar invite",
  });
  const attachment = {
    filename: "anytimehire-demo.ics",
    content: ics,
    contentType: "text/calendar; charset=utf-8; method=REQUEST",
  };

  const dateLabel = startsAt.toLocaleString("en-US", {
    timeZone: timezone,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const adminHtml = `
    <div style="font-family:Inter,system-ui,sans-serif;color:#0a2922">
      <h2 style="margin:0 0 12px 0">New AnytimeHire booking</h2>
      <p><strong>${esc(body.name)}</strong> (${esc(body.email)})</p>
      <p><strong>When:</strong> ${esc(dateLabel)} (${esc(timezone)})</p>
      ${body.phone ? `<p><strong>Phone:</strong> ${esc(body.phone)}</p>` : ""}
      ${body.company ? `<p><strong>Company:</strong> ${esc(body.company)}</p>` : ""}
      ${body.message ? `<p><strong>Notes:</strong> ${esc(body.message)}</p>` : ""}
    </div>`;
  const adminText = `New AnytimeHire booking
${body.name} (${body.email})
${dateLabel} (${timezone})
${body.phone ? `Phone: ${body.phone}\n` : ""}${body.company ? `Company: ${body.company}\n` : ""}${body.message ? `Notes: ${body.message}` : ""}`;

  const guestHtml = `
    <div style="font-family:Inter,system-ui,sans-serif;color:#0a2922">
      <h2 style="margin:0 0 12px 0">You're booked, ${esc(body.name.split(" ")[0])}.</h2>
      <p>Looking forward to your AnytimeHire demo.</p>
      <p><strong>When:</strong> ${esc(dateLabel)} (${esc(timezone)})<br/>
         <strong>Where:</strong> Google Meet — link will be in the attached calendar invite.</p>
      <p>Reply to this email if you need to reschedule.</p>
    </div>`;
  const guestText = `You're booked, ${body.name.split(" ")[0]}.

When: ${dateLabel} (${timezone})
Where: Google Meet — link in the attached invite.

Reply if you need to reschedule.`;

  await Promise.allSettled([
    sendMail({
      to: TO_EMAIL,
      subject: `New booking — ${body.name} · ${dateLabel}`,
      html: adminHtml,
      text: adminText,
      attachments: [attachment],
    }),
    sendMail({
      to: body.email,
      subject: `AnytimeHire demo confirmed · ${dateLabel}`,
      html: guestHtml,
      text: guestText,
      attachments: [attachment],
    }),
  ]);

  return NextResponse.json({ ok: true, id: bookingId, googleEventId });
}

// ---------------- local persistence ----------------

async function readAll(): Promise<LocalRecord[]> {
  try {
    const file = path.join(process.cwd(), LOCAL_FILE);
    const txt = await fs.readFile(file, "utf8");
    return txt
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line) as LocalRecord;
        } catch {
          return null;
        }
      })
      .filter((x): x is LocalRecord => !!x);
  } catch {
    return [];
  }
}

async function persistLocally(
  payload: Omit<LocalRecord, "id" | "status" | "created_at" | "google_event_id">,
): Promise<{ ok: boolean; conflict?: boolean; id?: string }> {
  try {
    const dir = path.join(process.cwd(), "data");
    const file = path.join(process.cwd(), LOCAL_FILE);
    await fs.mkdir(dir, { recursive: true });

    const existing = await readAll();
    const conflict = existing.some(
      (b) => b.status === "confirmed" && b.starts_at === payload.starts_at,
    );
    if (conflict) return { ok: true, conflict: true };

    const record: LocalRecord = {
      ...payload,
      id: randomUUID(),
      status: "confirmed",
      created_at: new Date().toISOString(),
    };
    await fs.appendFile(file, JSON.stringify(record) + "\n", "utf8");
    return { ok: true, id: record.id };
  } catch (e) {
    console.error("[bookings] local persist failed", e);
    return { ok: false };
  }
}

async function updateLocalRecord(id: string, patch: Partial<LocalRecord>) {
  try {
    const file = path.join(process.cwd(), LOCAL_FILE);
    const existing = await readAll();
    const next = existing.map((r) => (r.id === id ? { ...r, ...patch } : r));
    await fs.writeFile(
      file,
      next.map((r) => JSON.stringify(r)).join("\n") + "\n",
      "utf8",
    );
  } catch (e) {
    console.error("[bookings] update failed", e);
  }
}

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
