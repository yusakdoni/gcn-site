import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { SALES_TO, SALES_CC } from "@/lib/mail-recipients";

const REQUIRED_FIELDS = [
  "companyName",
  "contactPerson",
  "email",
  "phone",
  "industry",
  "productOrService",
  "specification",
  "quantity",
  "requiredDeliveryDate",
  "deliveryLocation",
] as const;

const MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024; // 8MB

export async function POST(req: NextRequest) {
  const formData = await req.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const field = (key: string) => String(formData.get(key) ?? "").trim();

  // Honeypot anti-bot.
  const honeypotValue = field("hp_ref_note");
  if (honeypotValue !== "") {
    console.warn(
      "RFQ form: honeypot field was non-empty, treating as spam and skipping send.",
      { honeypotLength: honeypotValue.length, honeypotPreview: honeypotValue.slice(0, 40) }
    );
    return NextResponse.json({ ok: true });
  }

  const data: Record<string, string> = {};
  const missing: string[] = [];
  for (const key of REQUIRED_FIELDS) {
    const value = field(key);
    if (!value) missing.push(key);
    data[key] = value;
  }

  if (missing.length > 0) {
    return NextResponse.json(
      { error: "Missing required fields", fields: missing },
      { status: 400 }
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(data.email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const budgetRange = field("budgetRange");
  const additionalInformation = field("additionalInformation");

  const bodyLines = [
    `Company Name: ${data.companyName}`,
    `Contact Person: ${data.contactPerson}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Industry: ${data.industry}`,
    `Product/Service: ${data.productOrService}`,
    `Specification: ${data.specification}`,
    `Quantity: ${data.quantity}`,
    `Required Delivery Date: ${data.requiredDeliveryDate}`,
    `Delivery Location: ${data.deliveryLocation}`,
    `Budget Range: ${budgetRange || "-"}`,
    `Additional Information: ${additionalInformation || "-"}`,
  ];

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY is not set — cannot send RFQ email. Set it in Vercel Project Settings > Environment Variables."
    );
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  // Lampiran opsional.
  const attachments: { filename: string; content: Buffer }[] = [];
  const file = formData.get("attachment");
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_ATTACHMENT_BYTES) {
      return NextResponse.json(
        { error: "Attachment too large (max 8MB)" },
        { status: 400 }
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    attachments.push({ filename: file.name, content: buffer });
  }

  try {
    const result = await resend.emails.send({
      from: "GCN Website <no-reply@gcnusantara.com>",
      to: SALES_TO,
      cc: SALES_CC,
      replyTo: data.email,
      subject: `[GCN RFQ] ${data.companyName} - ${data.productOrService}`,
      text: bodyLines.join("\n"),
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    // The Resend SDK does NOT throw on API-level rejections (invalid
    // sender domain, bad recipient, rate limit, etc.) — it returns
    // { data, error } instead. Without this check, a rejected email
    // would still report "sent successfully" to the visitor.
    if (result.error) {
      console.error("Resend rejected RFQ email:", result.error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send RFQ email:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
