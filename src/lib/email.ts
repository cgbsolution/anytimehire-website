import nodemailer, { type Transporter } from "nodemailer";

let cachedTransport: Transporter | null = null;
let verifiedOnce = false;

function getTransporter(): Transporter | null {
  if (cachedTransport) return cachedTransport;
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const secure = String(process.env.SMTP_SECURE ?? "true") === "true";

  console.log("[email] SMTP config check", {
    host: host || "(missing)",
    port,
    secure,
    user: user || "(missing)",
    pass: pass ? `set (len=${pass.length})` : "(missing)",
    from:
      process.env.EMAIL_FROM ||
      process.env.SMTP_FROM ||
      `(fallback) "AnytimeHire" <${user ?? "?"}>`,
  });

  if (!host || !user || !pass) {
    console.warn(
      "[email] SMTP not fully configured — at least one of SMTP_HOST / SMTP_USER / SMTP_PASS is missing in .env. Emails will NOT be sent.",
    );
    return null;
  }

  cachedTransport = nodemailer.createTransport({
    host,
    port,
    secure,
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
 * already persisted on disk).
 */
export async function sendMail(args: SendArgs): Promise<boolean> {
  const t = getTransporter();
  if (!t) {
    console.warn(
      `[email] skipping send to ${args.to} — SMTP not configured. Subject: "${args.subject}"`,
    );
    return false;
  }

  // One-time auth/connection probe so the failure mode is obvious.
  if (!verifiedOnce) {
    verifiedOnce = true;
    try {
      await t.verify();
      console.log("[email] SMTP verify() OK — server accepted credentials");
    } catch (e) {
      const msg = e instanceof Error ? `${e.name}: ${e.message}` : String(e);
      console.error(
        `[email] SMTP verify() FAILED — connection or auth is broken: ${msg}`,
      );
      console.error(
        "[email] Common fixes: (1) Gmail port 587 needs SMTP_SECURE=false (STARTTLS), port 465 needs SMTP_SECURE=true (SSL). (2) Use an App Password, not the account password. (3) Check the SMTP host is reachable from this machine.",
      );
    }
  }

  const from =
    process.env.EMAIL_FROM ||
    process.env.SMTP_FROM ||
    `"AnytimeHire" <${process.env.SMTP_USER}>`;

  console.log(
    `[email] → sending to ${args.to} | subject: "${args.subject}" | from: ${from}`,
  );

  try {
    const info = await t.sendMail({
      from,
      to: args.to,
      cc: args.cc,
      subject: args.subject,
      html: args.html,
      text: args.text,
      attachments: args.attachments,
    });
    console.log(
      `[email] ✓ delivered to ${args.to} | messageId=${info.messageId} | response=${info.response}`,
    );
    return true;
  } catch (e) {
    const msg = e instanceof Error ? `${e.name}: ${e.message}` : String(e);
    console.error(`[email] ✗ FAILED to send to ${args.to} — ${msg}`);
    if (e instanceof Error && e.stack) console.error(e.stack);
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
