import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const form = await request.formData();
  // Honeypot: real visitors never see or fill this field (hidden via CSS in
  // components/forms/Fields.tsx). If it's filled, silently accept without
  // processing so the bot doesn't learn the check exists.
  if (String(form.get("hp_website") ?? "").trim()) {
    return NextResponse.json({ ok: true });
  }
  const required = ["companyName", "contactPerson", "email", "phone", "industry", "productOrService", "specification", "quantity", "requiredDeliveryDate", "deliveryLocation"];
  const missing = required.filter((key) => !String(form.get(key) ?? "").trim());
  if (missing.length) return NextResponse.json({ error: "Missing required fields", fields: missing }, { status: 400 });
  const attachment = form.get("attachment");
  console.log("GCN RFQ", {
    companyName: form.get("companyName"), contactPerson: form.get("contactPerson"), email: form.get("email"),
    phone: form.get("phone"), industry: form.get("industry"), productOrService: form.get("productOrService"),
    specification: form.get("specification"), quantity: form.get("quantity"), requiredDeliveryDate: form.get("requiredDeliveryDate"),
    deliveryLocation: form.get("deliveryLocation"), budgetRange: form.get("budgetRange"), additionalInformation: form.get("additionalInformation"),
    attachmentName: attachment instanceof File ? attachment.name : null, receivedAt: new Date().toISOString()
  });
  // V4 demo endpoint: connect to CRM/email/storage before production.
  return NextResponse.json({ ok: true });
}
