import nodemailer, { type Transporter } from "nodemailer";

let cachedTransport: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (cachedTransport) return cachedTransport;
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  cachedTransport = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: String(process.env.SMTP_SECURE ?? "true") === "true",
    auth: { user, pass },
  });
  return cachedTransport;
}

type SendArgs = {
  to: string;
  subject: string;
  html: string;
  text: string;
  attachments?: Array<{ filename: string; content: string; contentType?: string }>;
  cc?: string | string[];
};

/**
 * Send an email via SMTP. Returns true if delivered, false if SMTP isn't
 * configured or sending failed (errors are logged, never thrown — leads are
 * already persisted in Supabase).
 */
export async function sendMail(args: SendArgs): Promise<boolean> {
  const t = getTransporter();
  if (!t) {
    console.warn("[email] SMTP not configured — skipping send");
    return false;
  }
  try {
    await t.sendMail({
      from: process.env.SMTP_FROM || `"AnytimeHire" <${process.env.SMTP_USER}>`,
      to: args.to,
      cc: args.cc,
      subject: args.subject,
      html: args.html,
      text: args.text,
      attachments: args.attachments,
    });
    return true;
  } catch (e) {
    console.error("[email] sendMail failed", e);
    return false;
  }
}

/**
 * Build a minimal RFC-5545 .ics calendar invite. Recipient can drop it into
 * Google Calendar, Outlook, Apple Calendar, etc. with one click.
 */
export function buildIcs(args: {
  uid: string;
  startsAt: Date;
  endsAt: Date;
  summary: string;
  description: string;
  organizerEmail: string;
  attendeeEmail: string;
  location?: string;
}): string {
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const escape = (s: string) =>
    s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AnytimeHire//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${args.uid}`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(args.startsAt)}`,
    `DTEND:${fmt(args.endsAt)}`,
    `SUMMARY:${escape(args.summary)}`,
    `DESCRIPTION:${escape(args.description)}`,
    args.location ? `LOCATION:${escape(args.location)}` : "",
    `ORGANIZER;CN=AnytimeHire:mailto:${args.organizerEmail}`,
    `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;RSVP=TRUE:mailto:${args.attendeeEmail}`,
    "STATUS:CONFIRMED",
    "TRANSP:OPAQUE",
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ]
    .filter(Boolean)
    .join("\r\n");
}
