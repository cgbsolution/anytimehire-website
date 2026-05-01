/**
 * Optional Google Calendar integration. Activates only when both
 * GOOGLE_SERVICE_ACCOUNT_JSON and GOOGLE_CALENDAR_ID are set.
 *
 * To enable:
 *   1. In Google Cloud Console, create a project, enable Calendar API.
 *   2. Create a service account, download its JSON key, base64-encode it,
 *      and set GOOGLE_SERVICE_ACCOUNT_JSON to the base64 string (or paste
 *      the raw JSON).
 *   3. Share the target calendar with the service account email
 *      (with "Make changes to events" permission).
 *   4. Set GOOGLE_CALENDAR_ID to the calendar's ID (often your email).
 *
 * This module uses Google's REST API directly (no extra SDK) and signs a
 * JWT to obtain an OAuth access token.
 */

import * as crypto from "node:crypto";

type ServiceAccount = {
  client_email: string;
  private_key: string;
  token_uri?: string;
};

function readServiceAccount(): ServiceAccount | null {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  try {
    const json = raw.trim().startsWith("{")
      ? raw
      : Buffer.from(raw, "base64").toString("utf8");
    const sa = JSON.parse(json) as ServiceAccount;
    if (!sa.client_email || !sa.private_key) return null;
    return sa;
  } catch (e) {
    console.error("[gcal] invalid GOOGLE_SERVICE_ACCOUNT_JSON", e);
    return null;
  }
}

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(sa: ServiceAccount): Promise<string | null> {
  if (cachedToken && cachedToken.expiresAt - Date.now() > 60_000) {
    return cachedToken.token;
  }
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/calendar",
    aud: sa.token_uri || "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };
  const enc = (o: object) =>
    Buffer.from(JSON.stringify(o)).toString("base64url");
  const unsigned = `${enc(header)}.${enc(claim)}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsigned);
  const signature = signer.sign(sa.private_key).toString("base64url");
  const jwt = `${unsigned}.${signature}`;

  const res = await fetch(sa.token_uri || "https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!res.ok) {
    console.error("[gcal] token exchange failed", res.status, await res.text());
    return null;
  }
  const j = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    token: j.access_token,
    expiresAt: Date.now() + j.expires_in * 1000,
  };
  return j.access_token;
}

/**
 * Insert a calendar event. Returns the new event id, or null if the
 * integration isn't configured / the call failed.
 */
export async function insertCalendarEvent(args: {
  startsAt: Date;
  endsAt: Date;
  summary: string;
  description: string;
  attendeeEmail: string;
  timezone: string;
}): Promise<string | null> {
  const sa = readServiceAccount();
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!sa || !calendarId) return null;

  const token = await getAccessToken(sa);
  if (!token) return null;

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    calendarId,
  )}/events?sendUpdates=all`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      summary: args.summary,
      description: args.description,
      start: { dateTime: args.startsAt.toISOString(), timeZone: args.timezone },
      end: { dateTime: args.endsAt.toISOString(), timeZone: args.timezone },
      attendees: [{ email: args.attendeeEmail }],
      conferenceData: {
        createRequest: {
          requestId: crypto.randomUUID(),
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    }),
  });
  if (!res.ok) {
    console.error("[gcal] event insert failed", res.status, await res.text());
    return null;
  }
  const j = (await res.json()) as { id: string };
  return j.id;
}
