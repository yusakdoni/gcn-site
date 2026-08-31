import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { T } from "@/components/i18n/T";
import { Handshake, Building2, Landmark, ClipboardCheck } from "lucide-react";

export interface StatItem {
  value: string;
  labelEn: ReactNode;
  labelId: ReactNode;
}

const ICONS=[Handshake,Building2,Landmark,ClipboardCheck];

export function StatBand({ stats, dark = true, linkHref, linkEn, linkId, cards = false }: { stats: StatItem[]; dark?: boolean; linkHref?: string; linkEn?: string; linkId?: string; cards?: boolean }) {
  return (
    <section className={dark ? "bg-deep-blue py-12 md:py-20" : "bg-white py-16 md:py-20 border-y border-mist"}>
      <Container>
        <div className={cards ? "grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5" : "grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 md:gap-y-14"}>
          {stats.map((s, i) => {
            const Icon=ICONS[i%ICONS.length];
            return (
              <div key={i} className={cards ? "relative rounded-2xl border border-white/25 bg-white/[0.035] p-4 sm:p-5 md:p-6 min-h-[176px] md:min-h-[220px] flex flex-col" : i > 0 ? "sm:border-l sm:pl-8" : ""} style={!cards&&i>0 ? { borderColor: dark ? "rgba(255,255,255,0.15)" : "#E6E6E6" } : undefined}>
                {cards && <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#C58A27]/70 text-[#D6A13B]"><Icon size={20}/></div>}
                <div className={`${cards ? "text-[1.55rem] sm:text-[1.8rem] md:text-[2.2rem]" : "text-[2.25rem] md:text-[3.5rem]"} font-semibold leading-none tracking-tight ${dark ? "text-white" : "text-navy"}`}>
                  {s.value}
                </div>
                <div className={`${cards ? "text-[12px] sm:text-[13px] mt-3 leading-relaxed" : "text-[13px] mt-4 leading-snug"} max-w-[17rem] ${dark ? "text-white/65" : "text-navy/60"}`}>
                  <T en={s.labelEn} id={s.labelId} />
                </div>
                {cards && <span className="mt-auto pt-4 self-end text-[#D6A13B] text-xl">→</span>}
              </div>
            );
          })}
        </div>
        {linkHref && (
          <div className={cards ? "mt-7 md:mt-10" : "mt-12"}>
            <Link href={linkHref} className={`text-[13px] md:text-[14px] underline underline-offset-4 ${dark ? "text-white/65 hover:text-white" : "text-navy/60 hover:text-navy"}`}>
              <T en={linkEn!} id={linkId!} />
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
