"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type Message = { role: "user" | "assistant"; content: string };

const GREETING = {
  id: "Halo! Saya GCN Sales Assistant. Saya bisa bantu cek kebutuhan supply, procurement, construction, medical/industrial supply, atau aviation spare parts. Ceritakan barang/jasa yang Anda butuhkan — saya bantu arahkan sampai RFQ.",
  en: "Hi! I'm the GCN Sales Assistant. I can help with supply, procurement, construction, medical/industrial supply, and aviation spare parts. Tell me what you need and I'll guide you toward an RFQ.",
};

const UI = {
  id: { title:"GCN Sales Assistant", subtitle:"Bantu kebutuhan → RFQ", closeAria:"Tutup chat", openAria:"Buka GCN Sales Assistant", typing:"Menganalisis kebutuhan...", placeholder:"Contoh: butuh spare part / material / pekerjaan...", send:"Kirim", rfq:"Kirim RFQ", contact:"Hubungi Sales", hint:"Untuk quotation lebih cepat, siapkan spesifikasi, qty, lokasi dan target delivery.", genericError:"Ada kendala teknis. Anda tetap bisa lanjut langsung ke RFQ.", connError:"Koneksi sedang bermasalah. Silakan lanjut langsung ke RFQ." },
  en: { title:"GCN Sales Assistant", subtitle:"Requirement → RFQ", closeAria:"Close chat", openAria:"Open GCN Sales Assistant", typing:"Reviewing requirement...", placeholder:"Example: need spare parts / materials / works...", send:"Send", rfq:"Submit RFQ", contact:"Contact Sales", hint:"For faster quotation, prepare specification, quantity, delivery location and required date.", genericError:"There is a technical issue. You can still continue directly to RFQ.", connError:"Connection issue. Please continue directly to RFQ." },
};

export default function ChatWidget() {
  const { lang } = useLanguage(); const t = UI[lang];
  const [open,setOpen]=useState(false); const [messages,setMessages]=useState<Message[]>([{role:"assistant",content:GREETING[lang]}]);
  const [input,setInput]=useState(""); const [loading,setLoading]=useState(false); const scrollRef=useRef<HTMLDivElement>(null); const greetedLangRef=useRef(lang);
  useEffect(()=>{scrollRef.current?.scrollTo({top:scrollRef.current.scrollHeight});},[messages,loading]);
  useEffect(()=>{if(messages.length===1&&messages[0].role==="assistant"&&greetedLangRef.current!==lang){setMessages([{role:"assistant",content:GREETING[lang]}]);greetedLangRef.current=lang;}},[lang,messages]);
  async function sendMessage(){const text=input.trim();if(!text||loading)return;const next=[...messages,{role:"user" as const,content:text}];setMessages(next);setInput("");setLoading(true);try{const res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:next.slice(1),lang})});const data=await res.json();setMessages(p=>[...p,{role:"assistant",content:res.ok&&data.reply?data.reply:t.genericError}]);}catch{setMessages(p=>[...p,{role:"assistant",content:t.connError}]);}finally{setLoading(false);}}
  function handleKeyDown(e:React.KeyboardEvent<HTMLTextAreaElement>){if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMessage();}}
  return <div className="fixed bottom-5 right-5 z-50 font-sans">{open&&<div className="mb-3 flex h-[32rem] w-[23rem] max-w-[92vw] flex-col overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl">
    <div className="bg-navy px-4 py-4"><div className="flex items-start justify-between"><div><p className="text-sm font-semibold text-white">{t.title}</p><p className="text-xs text-pale-blue">{t.subtitle}</p></div><button onClick={()=>setOpen(false)} aria-label={t.closeAria} className="text-pale-blue hover:text-white">✕</button></div></div>
    <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-offwhite px-3 py-3">{messages.map((m,i)=><div key={i} className={`flex ${m.role==="user"?"justify-end":"justify-start"}`}><div className={`max-w-[88%] rounded-xl px-3 py-2 text-sm leading-relaxed ${m.role==="user"?"bg-electric text-white":"bg-white text-ink shadow-sm"}`}>{m.content}</div></div>)}{loading&&<div className="text-sm text-navy/60">{t.typing}</div>}</div>
    <div className="border-t border-mist bg-white p-3"><p className="mb-2 text-[11px] leading-relaxed text-navy/55">{t.hint}</p><div className="mb-3 grid grid-cols-2 gap-2"><Link href="/rfq" className="rounded-md bg-navy px-3 py-2 text-center text-xs font-semibold text-white">{t.rfq}</Link><Link href="/work-with-us" className="rounded-md border border-navy/20 px-3 py-2 text-center text-xs font-semibold text-navy">{t.contact}</Link></div><div className="flex items-end gap-2"><textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder={t.placeholder} rows={1} className="max-h-24 flex-1 resize-none rounded-md border border-mist px-3 py-2 text-sm text-ink outline-none focus:border-electric"/><button onClick={sendMessage} disabled={loading||!input.trim()} className="rounded-md bg-electric px-3 py-2 text-sm font-medium text-white disabled:opacity-40">{t.send}</button></div></div>
  </div>}<button onClick={()=>setOpen(v=>!v)} aria-label={open?t.closeAria:t.openAria} className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white shadow-xl transition hover:bg-corporate">{open?<span className="text-xl">✕</span>:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h4m8-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}</button></div>;
}
