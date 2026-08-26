import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { PageCTA } from "@/components/ui/PageCTA";
import { PHOTOS } from "@/lib/data/photos";
import { PROJECTS } from "@/lib/data/projects";
import { T } from "@/components/i18n/T";
import { PROJECTS_ID } from "@/lib/i18n/data-id";

export const metadata = { title: "Our Work", description: "How PT Gega Cahaya Nusantara's Supply, Trading & Construction capabilities translate into project work." };

export default function OurWorkPage() {
  return (
    <main>
      <Navbar />

      <PageHero
        eyebrow={<T en="Our Work" id="Karya Kami"/>}
        title={<T en="How our capabilities translate into project work." id="Bagaimana kapabilitas kami diterjemahkan ke dalam pekerjaan proyek."/>}
        description={
          <T
            en="These profiles describe the types of work GCN is positioned to support. They are capability-based examples, not claims of a specific client engagement unless separately verified."
            id="Profil ini menggambarkan jenis pekerjaan yang siap kami dukung. Ini adalah contoh berbasis kapabilitas, bukan klaim keterlibatan klien tertentu kecuali diverifikasi terpisah."
          />
        }
        photo={PHOTOS.constructionAerial}
      />

      <section className="py-20 md:py-28 bg-offwhite">
        <Container className="grid lg:grid-cols-2 gap-px bg-mist">
          {PROJECTS.map((p, i) => {
            const tr = PROJECTS_ID[p.slug];
            return (
              <Link key={p.slug} href={`/our-work/${p.slug}`} className="bg-white group">
                <div className="relative h-72 overflow-hidden">
                  <Image src={p.image.src} alt={p.image.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-5 left-5 bg-white px-3 py-2 text-[11px] uppercase tracking-widest text-deep-blue">
                    {String(i + 1).padStart(2, "0")} · <T en={p.sector} id={tr?.sector || p.sector} />
                  </span>
                </div>
                <div className="p-8 md:p-10">
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t, ti) => (
                      <span key={t} className="text-[11px] uppercase tracking-widest text-electric border border-pale-blue px-2 py-1">
                        <T en={t} id={tr?.tags?.[ti] || t} />
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl text-navy mt-5">
                    <T en={p.title} id={tr?.title || p.title} />
                  </h2>
                  <p className="text-[15px] text-navy/60 mt-3">
                    <T en={p.challenge} id={tr?.challenge || p.challenge} />
                  </p>
                  <span className="inline-block mt-7 text-[13px] font-semibold text-electric">
                    <T en="View profile →" id="Lihat profil →" />
                  </span>
                </div>
              </Link>
            );
          })}
        </Container>
      </section>

      <PageCTA
        eyebrow={<T en="Client Impact" id="Dampak untuk Klien"/>}
        title={<T en="See how this kind of work is meant to translate into results for the client." id="Lihat bagaimana pekerjaan seperti ini dirancang untuk memberi hasil bagi klien."/>}
        primaryHref="/client-impact"
        primaryEn="View Client Impact"
        primaryId="Lihat Dampak untuk Klien"
        secondaryHref="/rfq"
        secondaryEn="Request a quotation"
        secondaryId="Ajukan penawaran"
      />

      <Footer />
    </main>
  );
}
