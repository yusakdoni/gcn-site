import Link from "next/link";
import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { T } from "@/components/i18n/T";

export function PageCTA({
  eyebrow,
  title,
  primaryHref,
  primaryEn,
  primaryId,
  secondaryHref,
  secondaryEn,
  secondaryId,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  primaryHref: string;
  primaryEn: string;
  primaryId: string;
  secondaryHref?: string;
  secondaryEn?: string;
  secondaryId?: string;
}) {
  return (
    <section className="py-24 md:py-28 bg-deep-blue">
      <Container className="flex flex-col items-start gap-8">
        <div>
          <span className="eyebrow text-electric">{eyebrow}</span>
          <h2 className="text-white text-[2rem] md:text-[2.75rem] leading-[1.05] tracking-[-0.015em] font-semibold max-w-2xl mt-5">
            {title}
          </h2>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href={primaryHref} className="bg-electric text-white px-7 py-4 text-cta uppercase tracking-widest hover:bg-white hover:text-deep-blue transition-colors">
            <T en={primaryEn} id={primaryId} />
          </Link>
          {secondaryHref && (
            <Link href={secondaryHref} className="border border-white/40 text-white px-7 py-4 text-cta uppercase tracking-widest hover:bg-white hover:text-deep-blue transition-colors">
              <T en={secondaryEn!} id={secondaryId!} />
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
}
