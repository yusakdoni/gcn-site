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

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const company = clean(body.company, LIMITS.company);
  const subject = clean(body.subject, LIMITS.subject);
  const message = clean(body.message, LIMITS.message);
  const sourcePage = clean(body.sourcePage, LIMITS.sourcePage) || "unknown";
  const consent = String(body.consent ?? "");
  const formStartedAt = Number(body.formStartedAt ?? 0);

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

  // Lightweight anti-automation check that cannot be populated by browser autofill.
  // Do not silently return success for rejected human-looking submissions.
  if (formStartedAt > 0) {
    const elapsed = Date.now() - formStartedAt;
    if (elapsed >= 0 && elapsed < 900) {
      return NextResponse.json({ error: "Submission too fast" }, { status: 429 });
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — cannot send contact email.");
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const isPartnership = sourcePage.startsWith("/partnership");
  const emailSubject = isPartnership
    ? `[NEW PARTNERSHIP ENQUIRY] ${company || name} — ${subject}`
    : `[GCN Contact] ${subject}`;

  try {
    const result = await resend.emails.send({
      from: "GCN Website <no-reply@gcnusantara.com>",
      to: SALES_TO,
      cc: SALES_CC,
      replyTo: email,
      subject: emailSubject,
      text: [
        isPartnership ? "NEW WEBSITE PARTNERSHIP / VENDOR ENQUIRY" : "NEW WEBSITE CONTACT",
        "",
        `Nama: ${name}`,
        `Email: ${email}`,
        `Perusahaan: ${company || "-"}`,
        `Subjek: ${subject}`,
        `Source: ${sourcePage}`,
        `Submitted: ${new Date().toISOString()}`,
        "Consent: accepted",
        "",
        "Pesan:",
        message,
        "",
        isPartnership
          ? "Recommended next action: review company/capability → classify supplier/vendor/partner → follow up if relevant."
          : "Recommended next action: qualify request and follow up.",
      ].join("\n"),
    });

    if (result.error) {
      console.error("Resend rejected contact email:", result.error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
    }

    console.info("Contact email sent", {
      sourcePage,
      type: isPartnership ? "partnership" : "contact",
      resendId: result.data?.id ?? null,
    });

    return NextResponse.json({ ok: true, type: isPartnership ? "partnership" : "contact" });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
