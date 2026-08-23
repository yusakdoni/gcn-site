import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { SALES_TO, SALES_CC } from "@/lib/mail-recipients";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // Honeypot anti-bot — field tersembunyi, kalau terisi berarti bot.
  const honeypot = String(body.hp_ref_note ?? "").trim();
  if (honeypot !== "") {
    // Logged deliberately (unlike a real spam-bot response, which stays
    // silent) so this is diagnosable from Vercel Function Logs — a
    // legitimate visitor should never trip this. If real submissions keep
    // landing here, the honeypot itself needs rethinking (e.g. dropped in
    // favor of a time-based check), not just another field rename.
    console.warn(
      "Contact form: honeypot field was non-empty, treating as spam and skipping send.",
      { honeypotLength: honeypot.length, honeypotPreview: honeypot.slice(0, 40) }
    );
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const company = String(body.company ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY is not set — cannot send contact email. Set it in Vercel Project Settings > Environment Variables."
    );
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      // Domain pengirim harus sudah diverifikasi di Resend (lihat catatan setup).
      from: "GCN Website <no-reply@gcnusantara.com>",
      to: SALES_TO,
      cc: SALES_CC,
      replyTo: email,
      subject: `[GCN Contact] ${subject}`,
      text: [
        `Nama: ${name}`,
        `Email: ${email}`,
        `Perusahaan: ${company || "-"}`,
        "",
        "Pesan:",
        message,
      ].join("\n"),
    });

    // The Resend SDK does NOT throw on API-level rejections (invalid
    // sender domain, bad recipient, rate limit, etc.) — it returns
    // { data, error } instead. Without this check, a rejected email
    // would still report "sent successfully" to the visitor.
    if (result.error) {
      console.error("Resend rejected contact email:", result.error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
