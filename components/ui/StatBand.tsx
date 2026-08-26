import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { T } from "@/components/i18n/T";

export interface StatItem {
  value: string;
  labelEn: ReactNode;
  labelId: ReactNode;
}

// Large-number "impact" band. Values are meant to be filled in with real,
// verified figures once GCN has closed engagements to report — until then,
// pass bracketed placeholders (e.g. "[XX]%") rather than inventing numbers,
// consistent with how lib/data/projects.ts marks itself as illustrative
// capability examples rather than claimed client work.

export function StatBand({ stats, dark = true, linkHref, linkEn, linkId }: { stats: StatItem[]; dark?: boolean; linkHref?: string; linkEn?: string; linkId?: string }) {
  return (
    <section className={dark ? "bg-deep-blue py-20 md:py-24" : "bg-white py-20 md:py-24 border-y border-mist"}>
      <Container>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
          {stats.map((s, i) => (
            <div key={i} className={i > 0 ? "sm:border-l sm:pl-8" : ""} style={i > 0 ? { borderColor: dark ? "rgba(255,255,255,0.15)" : "#E6E6E6" } : undefined}>
              <div className={`text-[3rem] md:text-[3.5rem] font-semibold leading-none tabular-nums tracking-tight ${dark ? "text-white" : "text-navy"}`}>
                {s.value}
              </div>
              <div className={`text-[13px] mt-4 leading-snug max-w-[16rem] ${dark ? "text-white/60" : "text-navy/60"}`}>
                <T en={s.labelEn} id={s.labelId} />
              </div>
            </div>
          ))}
        </div>
        {linkHref && (
          <div className="mt-12">
            <Link href={linkHref} className={`text-[13px] underline underline-offset-4 ${dark ? "text-white/60 hover:text-white" : "text-navy/60 hover:text-navy"}`}>
              <T en={linkEn!} id={linkId!} />
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
