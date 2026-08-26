// Single source of truth for the RFQ payload shape. Keeping the form,
// API route, and (future) CRM sink aligned to this type means migrating
// from "email notification" to "write to GMS database" later only
// requires changing the API route's destination, not the form itself.
export interface RFQPayload {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  industry: string;
  productOrService: string;
  specification: string;
  quantity: string;
  requiredDeliveryDate: string;
  deliveryLocation: string;
  budgetRange?: string;
  additionalInformation?: string;
  // attachment is handled as multipart/form-data separately — see app/api/rfq
}

export const INDUSTRY_OPTIONS = ["Construction","Construction Supply","Machinery & Industrial","Chemical & Industrial","Medical & Healthcare","Aviation"];

// Tampilan label Bahasa Indonesia untuk dropdown Industry di form RFQ.
// Value yang dikirim ke backend/email tetap dalam Bahasa Inggris (INDUSTRY_OPTIONS)
// supaya konsisten dengan data internal — ini murni untuk tampilan.
export const INDUSTRY_OPTIONS_ID: Record<string, string> = {
  "Construction": "Konstruksi",
  "Construction Supply": "Supply Material Konstruksi",
  "Machinery & Industrial": "Mesin & Industri",
  "Chemical & Industrial": "Kimia & Industri",
  "Medical & Healthcare": "Medis & Kesehatan",
  "Aviation": "Penerbangan",
};
