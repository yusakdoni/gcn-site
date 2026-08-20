import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { SALES_TO, SALES_CC } from "@/lib/mail-recipients";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // Honeypot anti-bot — field tersembunyi, kalau terisi berarti bot.
  const honeypot = String(body.hp_website ?? "").trim();
  if (honeypot !== "") {
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
    await resend.emails.send({
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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
