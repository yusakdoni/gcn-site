import { ReactNode } from "react";
import { PageHeroBackground } from "@/components/ui/PageHeroBackground";
import { Container } from "@/components/ui/Container";
import type { EditorialPhoto } from "@/lib/data/photos";

// Shared hero band for every interior page (Services, Our Work, Client
// Impact, Our Company, Work With Us). Bigger, more confident type scale
// than the homepage sections below it — this is the one place on each
// page that carries the "editorial statement" register (large headline,
// thin numbered/eyebrow label, generous top padding) the way a
// consulting-firm site opens each section of the site with a thesis
// statement rather than a small heading.
export function PageHero({
  eyebrow,
  title,
  description,
  photo,
  index,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  photo: EditorialPhoto;
  /** Optional two-digit index shown as a large ghost numeral, e.g. "01" — only
   * use when the page is genuinely part of an ordered set (nav position). */
  index?: string;
}) {
  return (
    <section className="pt-40 pb-24 md:pt-48 md:pb-32 bg-deep-blue relative overflow-hidden">
      <PageHeroBackground photo={photo} priority />
      <Container className="relative">
        {index && (
          <span className="hidden md:block absolute right-6 md:right-10 top-36 text-white/10 text-[9rem] font-semibold leading-none select-none tabular-nums">
            {index}
          </span>
        )}
        <span className="eyebrow text-electric">{eyebrow}</span>
        <h1 className="text-white max-w-4xl mt-7 text-[2.5rem] leading-[1.02] tracking-[-0.02em] font-semibold md:text-[4.25rem] md:leading-[1.0]">
          {title}
        </h1>
        {description && (
          <p className="text-white/70 text-body mt-7 max-w-2xl">{description}</p>
        )}
        <div className="editorial-rule !bg-white/15 mt-12 w-full max-w-4xl" />
      </Container>
    </section>
  );
}
