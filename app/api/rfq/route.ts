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

const MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024;
const ERP_API_URL = (process.env.GCN_ERP_API_URL || "https://api-mis.gcnusantara.com").replace(/\/$/, "");

async function pushLeadToErp(payload: Record<string, string>) {
  const token = process.env.GCN_WEBSITE_LEAD_TOKEN;
  if (!token) {
    console.warn("GCN_WEBSITE_LEAD_TOKEN is not set; ERP lead sync skipped while email fallback remains active.");
    return { ok: false, skipped: true };
  }

  try {
    const res = await fetch(`${ERP_API_URL}/api/public/website-lead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-gcn-website-token": token,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(12_000),
      cache: "no-store",
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) {
      console.error("ERP lead sync rejected:", { status: res.status, data });
      return { ok: false, skipped: false };
    }
    return { ok: true, skipped: false, leadId: data?.lead_id, duplicate: !!data?.duplicate };
  } catch (error) {
    console.error("ERP lead sync failed:", error);
    return { ok: false, skipped: false };
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.formData().catch(() => null);
  if (!formData) return NextResponse.json({ error: "Invalid form data" }, { status: 400 });

  const field = (key: string) => String(formData.get(key) ?? "").trim();
  if (field("hp_ref_note") !== "") return NextResponse.json({ ok: true });

  const data: Record<string, string> = {};
  const missing: string[] = [];
  for (const key of REQUIRED_FIELDS) {
    const value = field(key);
    if (!value) missing.push(key);
    data[key] = value;
  }

  if (missing.length) return NextResponse.json({ error: "Missing required fields", fields: missing }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return NextResponse.json({ error: "Invalid email" }, { status: 400 });

  const budgetRange = field("budgetRange");
  const paymentTerms = field("paymentTerms");
  const additionalInformation = field("additionalInformation");

  const leadPayload = {
    ...data,
    budgetRange,
    paymentTerms,
    additionalInformation,
    source: "Website RFQ",
    website: "gcnusantara.com",
  };

  // ERP-first capture: once the integration secret is configured, every RFQ
  // creates a traceable Lead in GCN Management System before email notification.
  const erpSync = await pushLeadToErp(leadPayload);

  const bodyLines = [
    "NEW WEBSITE RFQ — SALES FOLLOW-UP REQUIRED",
    "",
    "LEAD",
    `Company: ${data.companyName}`,
    `PIC: ${data.contactPerson}`,
    `Email: ${data.email}`,
    `Phone/WhatsApp: ${data.phone}`,
    `Industry: ${data.industry}`,
    "",
    "REQUIREMENT",
    `Product/Service: ${data.productOrService}`,
    `Specification/Scope: ${data.specification}`,
    `Quantity: ${data.quantity}`,
    `Required Date: ${data.requiredDeliveryDate}`,
    `Delivery/Project Location: ${data.deliveryLocation}`,
    `Budget Range: ${budgetRange || "Not provided"}`,
    `Preferred Payment Terms: ${paymentTerms || "Not provided"}`,
    `Additional Information: ${additionalInformation || "-"}`,
    "",
    `ERP Lead Sync: ${erpSync.ok ? `SYNCED${erpSync.leadId ? ` (${erpSync.leadId})` : ""}` : erpSync.skipped ? "PENDING ENV CONFIG" : "FAILED - CHECK LOGS"}`,
    "Recommended next action: qualify requirement → sourcing/costing → quotation.",
    "Source: gcnusantara.com RFQ",
  ];

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // If ERP capture already succeeded, do not lose the lead just because email is unavailable.
    if (erpSync.ok) return NextResponse.json({ ok: true, source: "website-rfq", erpSync: true, emailSent: false });
    return NextResponse.json({ error: "Lead delivery services not configured" }, { status: 500 });
  }

  const attachments: { filename: string; content: Buffer }[] = [];
  const file = formData.get("attachment");
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_ATTACHMENT_BYTES) return NextResponse.json({ error: "Attachment too large (max 8MB)" }, { status: 400 });
    attachments.push({ filename: file.name, content: Buffer.from(await file.arrayBuffer()) });
  }

  try {
    const result = await new Resend(apiKey).emails.send({
      from: "GCN Website <no-reply@gcnusantara.com>",
      to: SALES_TO,
      cc: SALES_CC,
      replyTo: data.email,
      subject: `[NEW RFQ][Website] ${data.companyName} — ${data.productOrService}`,
      text: bodyLines.join("\n"),
      attachments: attachments.length ? attachments : undefined,
    });

    if (result.error) {
      console.error("Resend rejected RFQ:", result.error);
      if (erpSync.ok) return NextResponse.json({ ok: true, source: "website-rfq", erpSync: true, emailSent: false });
      return NextResponse.json({ error: "Failed to deliver RFQ" }, { status: 502 });
    }

    return NextResponse.json({
      ok: true,
      source: "website-rfq",
      erpSync: erpSync.ok,
      erpLeadId: erpSync.leadId || null,
      duplicate: erpSync.duplicate || false,
      emailSent: true,
    });
  } catch (error) {
    console.error("Failed to send RFQ email:", error);
    if (erpSync.ok) return NextResponse.json({ ok: true, source: "website-rfq", erpSync: true, emailSent: false });
    return NextResponse.json({ error: "Failed to deliver RFQ" }, { status: 500 });
  }
}
