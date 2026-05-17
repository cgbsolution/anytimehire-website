import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { sendMail } from "@/lib/email";

// Read at call-time, not at module-load, so a late-loaded .env still works.
const getAdminEmail = () =>
  process.env.LEAD_TO_EMAIL || "info@anytimehire.ai";

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

  const adminEmail = getAdminEmail();
  console.log(
    `[contact] new lead | name="${name}" | email=${body.email} | source=${record.source} | admin=${adminEmail}`,
  );

  // Notify both sides via nodemailer (best-effort, errors are logged).
  const adminSubject = `New AnytimeHire lead — ${name} (${record.source})`;
  const admin = renderAdminEmail(record);
  const guest = renderGuestEmail(name, body.email);

  const results = await Promise.allSettled([
    sendMail({
      to: adminEmail,
      subject: adminSubject,
      html: admin.html,
      text: admin.text,
    }),
    sendMail({
      to: body.email,
      subject: "We got your message — AnytimeHire",
      html: guest.html,
      text: guest.text,
    }),
  ]);
  const adminOk = results[0].status === "fulfilled" && results[0].value;
  const guestOk = results[1].status === "fulfilled" && results[1].value;
  console.log(
    `[contact] email results | admin(${adminEmail})=${adminOk ? "OK" : "FAIL"} | guest(${body.email})=${guestOk ? "OK" : "FAIL"}`,
  );

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

function renderAdminEmail(rec: Record<string, unknown>) {
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

function renderGuestEmail(name: string, email: string) {
  const firstName = (name.split(" ")[0] || name).trim();
  const bookingUrl = "https://www.anytimehire.ai/booking";

  const html = `
<!doctype html>
<html><body style="font-family:Inter,system-ui,sans-serif;background:#f8faff;padding:24px;color:#0F172A;margin:0">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:32px 28px">
    <div style="display:inline-block;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#3641f5;font-weight:700">AnytimeHire</div>
    <h1 style="margin:14px 0 10px;font-size:22px;line-height:1.25;font-weight:700">Thanks, ${esc(firstName)} — we've got your message.</h1>
    <p style="margin:0 0 18px;font-size:15px;color:#475467;line-height:1.55">
      An AnytimeHire specialist will reach you within <strong style="color:#0F172A">2 business hours</strong>
      to activate your free account and walk you through the platform.
    </p>
    <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:16px 18px;margin:0 0 22px">
      <div style="font-size:13px;color:#0F172A;line-height:1.5">
        <strong style="color:#3641f5">Want to skip the wait?</strong>
        Book a 30-min demo slot now and get a live walkthrough + your 5 free interview credits instantly.
      </div>
    </div>
    <a href="${bookingUrl}"
       style="display:inline-block;background:#3641f5;color:#ffffff;text-decoration:none;font-weight:700;
              padding:12px 22px;border-radius:999px;font-size:14px">
      Book my free demo slot →
    </a>
    <p style="margin:24px 0 0;font-size:12px;color:#98a2b3;line-height:1.5">
      You're receiving this because you submitted a form at anytimehire.ai using ${esc(email)}.
      Reply to this email if you didn't.
    </p>
  </div>
</body></html>`.trim();

  const text = `Thanks, ${firstName} — we've got your message.

An AnytimeHire specialist will reach you within 2 business hours to activate
your free account and walk you through the platform.

Want to skip the wait? Book a 30-min demo slot now and get a live walkthrough
plus your 5 free interview credits instantly:
${bookingUrl}

You're receiving this because you submitted a form at anytimehire.ai using ${email}.
Reply if you didn't.`;

  return { html, text };
}

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
