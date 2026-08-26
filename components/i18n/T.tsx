"use client";
import {useLanguage} from "@/lib/i18n/LanguageContext";

/**
 * Renders `en` or `id` depending on the active language.
 * Safe to use as a child of a Server Component — this is the only
 * client-side piece, so pages keep their server-rendered SEO content
 * (generateMetadata, static params, initial HTML) untouched. The initial
 * server-rendered paint always shows `id` (Bahasa Indonesia is the site's
 * default language); after hydration it swaps to the visitor's saved
 * preference if they had previously chosen English.
 */
export function T({en,id}:{en:React.ReactNode;id:React.ReactNode}){
 const{lang}=useLanguage();
 return <>{lang==="id"?id:en}</>;
}

/** Hook version for cases needing the raw string (e.g. aria-label, alt, placeholder). */
export function useT(){
 const{lang}=useLanguage();
 return (en:string,id:string)=>lang==="id"?id:en;
}
