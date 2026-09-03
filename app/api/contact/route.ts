import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { SALES_TO, SALES_CC } from "@/lib/mail-recipients";

const LIMITS = {
  name: 120,
  email: 254,
  company: 180,
  subject: 180,
  message: 5000,
  sourcePage: 500,
};

function clean(value: unknown, max: number) {
  return String(value ?? "").replace(/\u0000/g, "").trim().slice(0, max);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const honeypot = clean(body.hp_ref_note, 200);
  if (honeypot !== "") {
    console.warn("Contact form honeypot triggered", { honeypotLength: honeypot.length });
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const company = clean(body.company, LIMITS.company);
  const subject = clean(body.subject, LIMITS.subject);
  const message = clean(body.message, LIMITS.message);
  const sourcePage = clean(body.sourcePage, LIMITS.sourcePage) || "unknown";
  const consent = String(body.consent ?? "");

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (consent !== "on") {
    return NextResponse.json({ error: "Consent is required" }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — cannot send contact email.");
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from: "GCN Website <no-reply@gcnusantara.com>",
      to: SALES_TO,
      cc: SALES_CC,
      replyTo: email,
      subject: `[GCN Contact] ${subject}`,
      text: [
        `Nama: ${name}`,
        `Email: ${email}`,
        `Perusahaan: ${company || "-"}`,
        `Source: ${sourcePage}`,
        `Submitted: ${new Date().toISOString()}`,
        "Consent: accepted",
        "",
        "Pesan:",
        message,
      ].join("\n"),
    });

    if (result.error) {
      console.error("Resend rejected contact email:", result.error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
