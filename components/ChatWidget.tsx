"use client";

import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content:
    "Halo! Saya asisten GCN. Ada yang bisa saya bantu soal supply, trading, atau construction services kami?",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading]);

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
        body: JSON.stringify({ messages: apiMessages }),
      });
      const data = await res.json();

      if (!res.ok || !data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Maaf, saya lagi ada kendala teknis. Silakan hubungi kami langsung lewat form Contact atau RFQ ya.",
          },
        ]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Maaf, koneksi lagi bermasalah. Silakan hubungi kami langsung lewat form Contact atau RFQ ya.",
        },
      ]);
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
              <p className="text-sm font-semibold text-white">GCN Sales Assistant</p>
              <p className="text-xs text-pale-blue">Biasanya balas dalam hitungan detik</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Tutup chat"
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
                  Mengetik...
                </div>
              </div>
            )}
          </div>

          <div className="flex items-end gap-2 border-t border-mist bg-white p-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tulis pertanyaan Anda..."
              rows={1}
              className="max-h-24 flex-1 resize-none rounded-md border border-mist px-3 py-2 text-sm text-ink outline-none focus:border-electric"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="rounded-md bg-electric px-3 py-2 text-sm font-medium text-white transition disabled:opacity-40"
            >
              Kirim
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Tutup chat" : "Buka chat dengan sales assistant"}
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
