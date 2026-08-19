import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  // Honeypot: see comment in app/api/rfq/route.ts.
  if (String(body?.hp_website ?? "").trim()) {
    return NextResponse.json({ ok: true });
  }
  if (!body?.name || !body?.email || !body?.subject || !body?.message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  // V4 demo endpoint: connect this to your mail/CRM provider before production.
  console.log("GCN CONTACT", { ...body, receivedAt: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
