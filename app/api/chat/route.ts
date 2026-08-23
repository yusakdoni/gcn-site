import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { SALES_AGENT_SYSTEM_PROMPT } from "@/lib/sales-agent-prompt";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_MESSAGES = 20; // batas panjang percakapan per sesi widget
const MAX_MESSAGE_LENGTH = 2000;

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

  // Anthropic API requires the conversation to start with a "user" message.
  // Drop any leading assistant message(s) defensively, in case the client
  // ever sends a malformed history.
  while (messages.length > 0 && messages[0].role === "assistant") {
    messages.shift();
  }

  if (messages.length === 0) {
    return NextResponse.json({ error: "No messages" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error(
      "ANTHROPIC_API_KEY is not set — AI sales agent cannot respond. Set it in Vercel Project Settings > Environment Variables."
    );
    return NextResponse.json(
      { error: "Chat assistant is not configured yet" },
      { status: 500 }
    );
  }

  const anthropic = new Anthropic({ apiKey, timeout: 20_000 });

  const lang = body.lang === "en" ? "en" : "id";
  const languageInstruction =
    lang === "en"
      ? "\n\nRespond in English, regardless of what language earlier context implies, unless the visitor writes in a different language — in that case, mirror the visitor's language instead."
      : "\n\nBalas dalam Bahasa Indonesia, kecuali pengunjung menulis dalam bahasa lain — dalam hal itu, ikuti bahasa yang dipakai pengunjung.";

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 500,
      system: SALES_AGENT_SYSTEM_PROMPT + languageInstruction,
      messages,
    });

    const textBlock = response.content.find((b) => b.type === "text");
    const reply = textBlock && "text" in textBlock ? textBlock.text : "";

    if (!reply) {
      console.error(
        "AI sales agent: Anthropic response had no text block.",
        JSON.stringify(response)
      );
      return NextResponse.json(
        { error: "Empty response from model" },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (err) {
    // Log enough detail to diagnose from Vercel Function Logs without
    // leaking anything to the client. Anthropic SDK errors expose
    // `status` (HTTP code) and `error` (API error body) — these are the
    // fastest way to tell apart an invalid/missing key (401), an
    // out-of-credit account (400/402), a rate limit (429), vs a transient
    // outage (5xx).
    const status = (err as { status?: number })?.status;
    const detail = (err as { error?: unknown })?.error;
    console.error("AI sales agent error:", {
      status,
      detail,
      message: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      { error: "Failed to get a response" },
      { status: 500 }
    );
  }
}
