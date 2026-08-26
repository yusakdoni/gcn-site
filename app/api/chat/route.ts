import { NextRequest, NextResponse } from "next/server";
import { SALES_AGENT_SYSTEM_PROMPT } from "@/lib/sales-agent-prompt";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_MESSAGES = 20; // batas panjang percakapan per sesi widget
const MAX_MESSAGE_LENGTH = 2000;

// Model Gemini yang dipakai bisa diganti via env var tanpa ubah kode —
// berguna karena Google cukup sering memperbarui lineup model gratisnya.
// "gemini-2.5-flash" dipilih sebagai default karena termasuk model yang
// paling stabil dan konsisten tersedia di free tier Gemini API per
// pertengahan 2026. Kalau suatu saat model ini pensiun/diganti Google,
// cukup set GEMINI_MODEL di Vercel tanpa perlu deploy ulang kode.
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

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

  // Sama seperti sebelumnya, percakapan yang dikirim ke Gemini idealnya
  // dimulai dari giliran "user". Buang giliran "assistant" di awal secara
  // defensif kalau-kalau client pernah mengirim history yang cacat.
  while (messages.length > 0 && messages[0].role === "assistant") {
    messages.shift();
  }

  if (messages.length === 0) {
    return NextResponse.json({ error: "No messages" }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error(
      "GEMINI_API_KEY is not set — AI sales agent cannot respond. Set it in Vercel Project Settings > Environment Variables. Ambil API key gratis di https://aistudio.google.com/apikey"
    );
    return NextResponse.json(
      { error: "Chat assistant is not configured yet" },
      { status: 500 }
    );
  }

  const lang = body.lang === "en" ? "en" : "id";
  const languageInstruction =
    lang === "en"
      ? "\n\nRespond in English, regardless of what language earlier context implies, unless the visitor writes in a different language — in that case, mirror the visitor's language instead."
      : "\n\nBalas dalam Bahasa Indonesia, kecuali pengunjung menulis dalam bahasa lain — dalam hal itu, ikuti bahasa yang dipakai pengunjung.";

  // Gemini's REST format: "contents" is the turn-by-turn history, each
  // turn using role "user" or "model" (not "assistant") with text wrapped
  // in a "parts" array. The system prompt is passed separately via
  // "system_instruction".
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
        system_instruction: {
          parts: [{ text: SALES_AGENT_SYSTEM_PROMPT + languageInstruction }],
        },
        contents,
        generationConfig: {
          maxOutputTokens: 500,
        },
      }),
      signal: AbortSignal.timeout(20_000),
    });

    const data = await geminiRes.json().catch(() => null);

    if (!geminiRes.ok) {
      // Log enough detail to diagnose from Vercel Function Logs without
      // leaking anything to the client. Gemini's error body under
      // `error.status`/`error.message` is the fastest way to tell apart
      // an invalid/missing key (401/403 — "PERMISSION_DENIED" /
      // "UNAUTHENTICATED"), a free-tier rate limit (429 —
      // "RESOURCE_EXHAUSTED"), vs a transient outage (5xx).
      console.error("AI sales agent error (Gemini):", {
        httpStatus: geminiRes.status,
        detail: data?.error,
      });
      return NextResponse.json(
        { error: "Failed to get a response" },
        { status: 500 }
      );
    }

    const reply: string =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: { text?: string }) => p.text || "")
        .join("") ?? "";

    if (!reply) {
      // A missing reply with a 200 OK usually means the safety filter
      // blocked the output — check candidates[0].finishReason
      // ("SAFETY", "MAX_TOKENS", etc.) in the logged payload below.
      console.error(
        "AI sales agent: Gemini response had no text part.",
        JSON.stringify(data)
      );
      return NextResponse.json(
        { error: "Empty response from model" },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("AI sales agent error:", {
      message: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      { error: "Failed to get a response" },
      { status: 500 }
    );
  }
}
