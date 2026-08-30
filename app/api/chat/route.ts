import { NextRequest, NextResponse } from "next/server";
import { SALES_AGENT_SYSTEM_PROMPT } from "@/lib/sales-agent-prompt";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

function freeFallback(message: string, lang: "id" | "en") {
  const q = message.toLowerCase();
  const isAviation = /(aviation|aircraft|pesawat|part number|sparepart|spare part|rotable|consumable)/i.test(q);
  const isConstruction = /(construction|konstruksi|renovasi|boq|rab|civil|sipil|waterproof|asphalt|aspal)/i.test(q);
  const isPrice = /(harga|price|quotation|quote|berapa|biaya|cost)/i.test(q);
  const isPartner = /(partner|partnership|kerja sama|kerjasama|vendor|supplier|rekanan)/i.test(q);

  if (lang === "en") {
    if (isAviation) return "GCN can review aviation and aircraft spare-parts sourcing requirements. Please prepare the part number/description, quantity, required condition or documentation (if applicable), delivery location, and target date. For a formal review and sourcing request, please submit them through /rfq.";
    if (isConstruction) return "GCN can review construction supply or execution requirements based on the project scope. Please share the project location, BOQ/specification, target schedule, and whether you need supply-only or supply-and-install/execution. You can submit the details through /rfq for review.";
    if (isPrice) return "Pricing depends on specification, quantity, sourcing, delivery location, and commercial terms, so I should not guess a number here. Please submit the item/service specification, quantity, location, and target date through /rfq so the team can review it properly.";
    if (isPartner) return "For supplier, vendor, or partnership inquiries, please use /work-with-us and include your company profile, capability/category, contact person, and relevant product or service information. The GCN team will review the fit before any collaboration is confirmed.";
    return "GCN supports B2B supply, trading, procurement, project-based supply, and construction requirements. Tell me what product/service you need, the specification or brand/part number if available, quantity, delivery location, and target date, and I can guide you to the right next step.";
  }

  if (isAviation) return "GCN dapat mereview kebutuhan sourcing aviation dan sparepart pesawat. Siapkan part number/deskripsi, quantity, kondisi atau dokumen yang dibutuhkan bila ada, lokasi pengiriman, dan target waktu. Untuk review dan sourcing formal, kirim melalui /rfq.";
  if (isConstruction) return "GCN dapat mereview kebutuhan supply maupun pelaksanaan konstruksi sesuai scope proyek. Mohon siapkan lokasi proyek, BOQ/spesifikasi, target schedule, serta apakah kebutuhannya supply-only atau supply + instalasi/eksekusi. Detailnya bisa dikirim melalui /rfq untuk direview.";
  if (isPrice) return "Harga bergantung pada spesifikasi, quantity, hasil sourcing, lokasi pengiriman, dan terms komersial, jadi saya tidak akan mengarang angka. Kirim spesifikasi barang/jasa, quantity, lokasi, dan target waktunya melalui /rfq agar tim bisa review dengan benar.";
  if (isPartner) return "Untuk penawaran supplier, vendor, atau kerja sama, silakan gunakan /work-with-us dan sertakan company profile, kategori/kapabilitas, PIC, serta produk atau jasa yang ditawarkan. Tim GCN akan review kecocokannya sebelum kerja sama dikonfirmasi.";
  return "GCN melayani kebutuhan B2B untuk supply, trading, procurement, project-based supply, dan konstruksi. Coba beri tahu barang/jasa yang dibutuhkan, spesifikasi atau brand/part number bila ada, quantity, lokasi pengiriman, dan target waktunya; saya bantu arahkan langkah berikutnya.";
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body || !Array.isArray(body.messages)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const messages: ChatMessage[] = body.messages
    .filter(
      (m: unknown): m is ChatMessage =>
        !!m &&
        typeof m === "object" &&
        (m as ChatMessage).role &&
        typeof (m as ChatMessage).content === "string"
    )
    .slice(-MAX_MESSAGES)
    .map((m: ChatMessage) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content).slice(0, MAX_MESSAGE_LENGTH),
    }));

  while (messages.length > 0 && messages[0].role === "assistant") messages.shift();
  if (messages.length === 0) return NextResponse.json({ error: "No messages" }, { status: 400 });

  const lang: "id" | "en" = body.lang === "en" ? "en" : "id";
  const latestUserMessage = [...messages].reverse().find((m) => m.role === "user")?.content || "";
  const apiKey = process.env.GEMINI_API_KEY;

  // Zero-cost always-on mode: if Gemini is not configured, the sales assistant
  // still works as a safe intent-based sales concierge instead of showing an error.
  if (!apiKey) {
    return NextResponse.json({ reply: freeFallback(latestUserMessage, lang), mode: "fallback" });
  }

  const languageInstruction =
    lang === "en"
      ? "\n\nRespond in English unless the visitor clearly uses another language; then mirror the visitor's language."
      : "\n\nBalas dalam Bahasa Indonesia, kecuali pengunjung menulis dalam bahasa lain; dalam hal itu ikuti bahasa pengunjung.";

  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  try {
    const geminiRes = await fetch(GEMINI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SALES_AGENT_SYSTEM_PROMPT + languageInstruction }] },
        contents,
        generationConfig: { maxOutputTokens: 500, temperature: 0.4 },
      }),
      signal: AbortSignal.timeout(20_000),
    });

    const data = await geminiRes.json().catch(() => null);

    if (!geminiRes.ok) {
      console.error("AI sales agent error (Gemini):", { httpStatus: geminiRes.status, detail: data?.error });
      // Free-tier quota, invalid key, or transient provider errors should not
      // make the public sales widget unusable.
      return NextResponse.json({ reply: freeFallback(latestUserMessage, lang), mode: "fallback" });
    }

    const reply: string =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: { text?: string }) => p.text || "")
        .join("") ?? "";

    if (!reply) return NextResponse.json({ reply: freeFallback(latestUserMessage, lang), mode: "fallback" });

    return NextResponse.json({ reply, mode: "gemini" });
  } catch (err) {
    console.error("AI sales agent error:", { message: err instanceof Error ? err.message : String(err) });
    return NextResponse.json({ reply: freeFallback(latestUserMessage, lang), mode: "fallback" });
  }
}
