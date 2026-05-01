import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

const TO_EMAIL = "rishabh.negi@artboxsolutions.com";
const FROM_EMAIL =
  process.env.LEAD_FROM_EMAIL || "AnytimeHire <noreply@anytimehire.com>";

type Lead = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  company?: string;
  company_size?: string;
  source?: string;
  date?: string;
  time?: string;
  timezone?: string;
};

export async function POST(req: Request) {
  let body: Lead;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.name || !body.email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 },
    );
  }

  const record = {
    ...body,
    receivedAt: new Date().toISOString(),
    ip: req.headers.get("x-forwarded-for") ?? null,
    ua: req.headers.get("user-agent") ?? null,
  };

  await persistLead(record);

  const subject = subjectFor(record);
  const { html, text } = renderEmail(record);

  await Promise.allSettled([
    sendViaResend({ to: TO_EMAIL, from: FROM_EMAIL, subject, html, text }),
    sendViaWebhook({ to: TO_EMAIL, subject, ...record }),
  ]);

  return NextResponse.json({ ok: true });
}

async function persistLead(record: Record<string, unknown>) {
  try {
    const dir = path.join(process.cwd(), "data");
    const file = path.join(dir, "submissions.jsonl");
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(file, JSON.stringify(record) + "\n", "utf8");
  } catch (e) {
    console.error("[contact] failed to persist lead", e);
  }
}

function subjectFor(rec: Lead) {
  if (rec.source === "booking") {
    return `New AnytimeHire booking — ${rec.name} · ${rec.date} ${rec.time}`;
  }
  return `New AnytimeHire lead — ${rec.name} (${rec.source ?? "form"})`;
}

function renderEmail(rec: Record<string, unknown>) {
  const lines = Object.entries(rec)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${k}: ${String(v)}`)
    .join("\n");

  const html = `
<!doctype html>
<html><body style="font-family:Inter,system-ui,sans-serif;background:#faf7f2;padding:24px;color:#0a2922">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e8e4d8;border-radius:16px;padding:24px">
    <div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#0c7c5a;font-weight:700">New lead · AnytimeHire</div>
    <h1 style="margin:8px 0 16px 0;font-size:22px;line-height:1.2">${escape(String(rec.name ?? ""))}</h1>
    <pre style="white-space:pre-wrap;font-family:ui-monospace,monospace;font-size:13px;background:#f5f1e8;border-radius:10px;padding:14px;color:#1d2939">${escape(lines)}</pre>
  </div>
</body></html>`.trim();

  return { html, text: lines };
}

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendViaResend(args: {
  to: string;
  from: string;
  subject: string;
  html: string;
  text: string;
}) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        from: args.from,
        to: [args.to],
        subject: args.subject,
        html: args.html,
        text: args.text,
      }),
    });
    if (!res.ok) {
      console.error("[contact] resend failed", res.status, await res.text());
    }
  } catch (e) {
    console.error("[contact] resend error", e);
  }
}

async function sendViaWebhook(payload: Record<string, unknown>) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.error("[contact] webhook error", e);
  }
}
