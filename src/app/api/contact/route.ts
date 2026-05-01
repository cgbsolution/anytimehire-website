import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { sendMail } from "@/lib/email";

const TO_EMAIL = process.env.LEAD_TO_EMAIL || "rishabh.negi@artboxsolutions.com";

type Lead = {
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  message?: string;
  company?: string;
  company_size?: string;
  monthly_volume?: string;
  source?: string;
};

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: Lead;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name =
    body.name?.trim() ||
    [body.first_name, body.last_name].filter(Boolean).join(" ").trim() ||
    "";

  if (!name || !body.email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for");
  const ua = req.headers.get("user-agent");

  const record = {
    receivedAt: new Date().toISOString(),
    source: body.source ?? "form",
    first_name: body.first_name ?? null,
    last_name: body.last_name ?? null,
    name,
    email: body.email,
    phone: body.phone ?? null,
    company: body.company ?? null,
    company_size: body.company_size ?? null,
    monthly_volume: body.monthly_volume ?? null,
    message: body.message ?? null,
    ip,
    user_agent: ua,
    payload: body,
  };

  // Persist as JSONL
  await persistLocally(record);

  // Notify via nodemailer (best-effort)
  const subject = `New AnytimeHire lead — ${name} (${record.source})`;
  const { html, text } = renderEmail(record);
  await sendMail({ to: TO_EMAIL, subject, html, text });

  return NextResponse.json({ ok: true });
}

async function persistLocally(record: Record<string, unknown>) {
  try {
    const dir = path.join(process.cwd(), "data");
    const file = path.join(dir, "submissions.jsonl");
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(file, JSON.stringify(record) + "\n", "utf8");
  } catch (e) {
    console.error("[contact] local persist failed", e);
  }
}

function renderEmail(rec: Record<string, unknown>) {
  const lines = Object.entries(rec)
    .filter(([k, v]) => v !== undefined && v !== null && v !== "" && k !== "payload")
    .map(([k, v]) => `${k}: ${typeof v === "object" ? JSON.stringify(v) : String(v)}`)
    .join("\n");

  const html = `
<!doctype html>
<html><body style="font-family:Inter,system-ui,sans-serif;background:#faf7f2;padding:24px;color:#0a2922">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e8e4d8;border-radius:16px;padding:24px">
    <div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#0c7c5a;font-weight:700">New lead · AnytimeHire</div>
    <h1 style="margin:8px 0 16px 0;font-size:22px;line-height:1.2">${esc(String(rec.name ?? ""))}</h1>
    <pre style="white-space:pre-wrap;font-family:ui-monospace,monospace;font-size:13px;background:#f5f1e8;border-radius:10px;padding:14px;color:#1d2939">${esc(lines)}</pre>
  </div>
</body></html>`.trim();

  return { html, text: lines };
}

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
