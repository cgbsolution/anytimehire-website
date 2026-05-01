import { NextResponse } from "next/server";
import { getAvailability } from "@/lib/booking";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const date = url.searchParams.get("date"); // YYYY-MM-DD
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: "Provide ?date=YYYY-MM-DD" },
      { status: 400 },
    );
  }

  const slots = await getAvailability(date);
  return NextResponse.json({ slots });
}
