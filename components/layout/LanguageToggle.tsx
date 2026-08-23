"use client";
import {useLanguage} from "@/lib/i18n/LanguageContext";

export function LanguageToggle({light}:{light?:boolean}){
 const{lang,setLang}=useLanguage();
 const base=light?"text-navy":"text-white";
 const track=light?"border-navy/20 bg-navy/5":"border-white/30 bg-white/10";
 return (
  <div className={`flex items-center rounded-full border ${track} p-0.5 text-[11px] font-semibold tracking-wide`} role="group" aria-label="Language switcher">
   <button type="button" onClick={()=>setLang("en")} aria-pressed={lang==="en"} className={`px-2.5 py-1 rounded-full transition-colors ${lang==="en"?"bg-electric text-white":`${base} opacity-70 hover:opacity-100`}`}>EN</button>
   <button type="button" onClick={()=>setLang("id")} aria-pressed={lang==="id"} className={`px-2.5 py-1 rounded-full transition-colors ${lang==="id"?"bg-electric text-white":`${base} opacity-70 hover:opacity-100`}`}>ID</button>
  </div>
 );
}
