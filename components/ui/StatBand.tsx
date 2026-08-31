import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { T } from "@/components/i18n/T";
import { Handshake, Building2, Landmark, ClipboardCheck } from "lucide-react";

export interface StatItem { value: string; labelEn: ReactNode; labelId: ReactNode; }
const ICONS=[Handshake,Building2,Landmark,ClipboardCheck];

export function StatBand({ stats, dark = true, linkHref, linkEn, linkId, cards = false }: { stats: StatItem[]; dark?: boolean; linkHref?: string; linkEn?: string; linkId?: string; cards?: boolean }) {
 return <section className={dark ? "bg-deep-blue py-9 sm:py-12 md:py-20" : "bg-white py-16 md:py-20 border-y border-mist"}>
  <Container>
   <div className={cards ? "grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4 lg:gap-5" : "grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 md:gap-y-14"}>
    {stats.map((s,i)=>{const Icon=ICONS[i%ICONS.length];return <div key={i} className={cards ? "relative flex min-h-[164px] flex-col rounded-xl border border-white/20 bg-white/[0.035] p-3.5 sm:min-h-[190px] sm:rounded-2xl sm:p-5 md:min-h-[215px] md:p-6" : i>0 ? "sm:border-l sm:pl-8" : ""} style={!cards&&i>0?{borderColor:dark?"rgba(255,255,255,0.15)":"#E6E6E6"}:undefined}>
     {cards&&<div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#C58A27]/70 text-[#D6A13B] sm:mb-4 sm:h-10 sm:w-10"><Icon size={16} className="sm:hidden"/><Icon size={20} className="hidden sm:block"/></div>}
     <div className={`${cards?"text-[1.35rem] min-[380px]:text-[1.5rem] sm:text-[1.8rem] md:text-[2.1rem]":"text-[2.25rem] md:text-[3.5rem]"} font-semibold leading-none tracking-tight ${dark?"text-white":"text-navy"}`}>{s.value}</div>
     <div className={`${cards?"mt-2.5 text-[10.5px] leading-[1.45] min-[380px]:text-[11px] sm:mt-3 sm:text-[13px] sm:leading-relaxed":"text-[13px] mt-4 leading-snug"} max-w-[17rem] ${dark?"text-white/70":"text-navy/60"}`}><T en={s.labelEn} id={s.labelId}/></div>
     {cards&&<span className="mt-auto self-end pt-2 text-base text-[#D6A13B] sm:pt-4 sm:text-xl">→</span>}
    </div>})}
   </div>
   {linkHref&&<div className={cards?"mt-6 md:mt-9":"mt-12"}><Link href={linkHref} className={`text-[12px] underline underline-offset-4 sm:text-[13px] md:text-[14px] ${dark?"text-white/70 hover:text-white":"text-navy/60 hover:text-navy"}`}><T en={linkEn!} id={linkId!}/></Link></div>}
  </Container>
 </section>
}
