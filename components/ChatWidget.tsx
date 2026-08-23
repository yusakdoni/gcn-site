"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Record<"en" | "id", string> = {
  id: "Halo! Saya asisten GCN. Ada yang bisa saya bantu soal supply, trading, atau construction services kami?",
  en: "Hi! I'm the GCN assistant. Anything I can help with regarding our supply, trading, or construction services?",
};

const UI = {
  id: {
    title: "GCN Sales Assistant",
    subtitle: "Biasanya balas dalam hitungan detik",
    closeAria: "Tutup chat",
    openAria: "Buka chat dengan sales assistant",
    typing: "Mengetik...",
    placeholder: "Tulis pertanyaan Anda...",
    send: "Kirim",
    genericError: "Maaf, saya lagi ada kendala teknis. Silakan hubungi kami langsung lewat form Contact atau RFQ ya.",
    connError: "Maaf, koneksi lagi bermasalah. Silakan hubungi kami langsung lewat form Contact atau RFQ ya.",
  },
  en: {
    title: "GCN Sales Assistant",
    subtitle: "Usually replies within seconds",
    closeAria: "Close chat",
    openAria: "Open chat with sales assistant",
    typing: "Typing...",
    placeholder: "Type your question...",
    send: "Send",
    genericError: "Sorry, I'm having a technical issue right now. Please reach us directly via the Contact or RFQ form.",
    connError: "Sorry, there's a connection issue right now. Please reach us directly via the Contact or RFQ form.",
  },
};

export default function ChatWidget() {
  const { lang } = useLanguage();
  const t = UI[lang];
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: GREETING[lang] }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const greetedLangRef = useRef(lang);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading]);

  // If the user switches language before sending any real message, swap the
  // greeting text too so the widget doesn't show a stale-language opener.
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === "assistant" && greetedLangRef.current !== lang) {
      setMessages([{ role: "assistant", content: GREETING[lang] }]);
      greetedLangRef.current = lang;
    }
  }, [lang, messages]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    // GREETING (index 0) is a local-only UI message and was never part of a
    // real exchange with the model. The Anthropic API requires the first
    // message in the array to have role "user", so it must be excluded from
    // what we send — otherwise every very first message would fail.
    const apiMessages = nextMessages.slice(1);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages, lang }),
      });
      const data = await res.json();

      if (!res.ok || !data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: t.genericError }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: t.connError }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {open && (
        <div className="mb-3 flex h-[28rem] w-[22rem] max-w-[90vw] flex-col overflow-hidden rounded-xl border border-mist bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-navy px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-white">{t.title}</p>
              <p className="text-xs text-pale-blue">{t.subtitle}</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label={t.closeAria}
              className="text-pale-blue transition hover:text-white"
            >
              ✕
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-offwhite px-3 py-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-electric text-white"
                      : "bg-white text-ink shadow-sm"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-lg bg-white px-3 py-2 text-sm text-ink shadow-sm">
                  {t.typing}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-end gap-2 border-t border-mist bg-white p-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.placeholder}
              rows={1}
              className="max-h-24 flex-1 resize-none rounded-md border border-mist px-3 py-2 text-sm text-ink outline-none focus:border-electric"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="rounded-md bg-electric px-3 py-2 text-sm font-medium text-white transition disabled:opacity-40"
            >
              {t.send}
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t.closeAria : t.openAria}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white shadow-xl transition hover:bg-corporate"
      >
        {open ? (
          <span className="text-xl">✕</span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h8M8 14h4m8-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
