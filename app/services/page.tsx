import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { PageCTA } from "@/components/ui/PageCTA";
import { PHOTOS } from "@/lib/data/photos";
import { SERVICES } from "@/lib/data/services";
import { T } from "@/components/i18n/T";
import { SERVICES_ID } from "@/lib/i18n/data-id";

export const metadata = { title: "Our Services", description: "Supply, Trading & Construction services from PT Gega Cahaya Nusantara — sourcing, wholesale trading and construction execution built around each client's specification." };

export default function ServicesPage() {
  return (
    <main>
      <Navbar />

      <PageHero
        eyebrow={<T en="Our Services" id="Layanan Kami"/>}
        title={<T en="Practical services around construction, supply, and project execution." id="Layanan praktis seputar konstruksi, supply, dan pelaksanaan proyek."/>}
        description={
          <T
            en="Three core business pillars reflect the operating structure of GCN: Supply, Trading & Construction."
            id="Tiga pilar utama bisnis mencerminkan struktur operasional GCN: Supply, Trading & Konstruksi."
          />
        }
        photo={PHOTOS.constructionAerial}
      />

      <section className="py-20 md:py-28 bg-white">
        <Container className="grid md:grid-cols-2 gap-6">
          {SERVICES.map((s, i) => {
            const tr = SERVICES_ID[s.slug];
            return (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group border border-mist overflow-hidden bg-white">
                <div className="relative h-64">
                  <Image src={s.image.src} alt={s.image.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-5 left-5 bg-white px-3 py-2 text-[11px] uppercase tracking-widest text-deep-blue">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-8 md:p-10">
                  <h2 className="text-h3 text-xl">
                    <T en={s.title} id={tr?.title || s.title} />
                  </h2>
                  <p className="text-[15px] text-navy/70 leading-relaxed mt-4">
                    <T en={s.summary} id={tr?.summary || s.summary} />
                  </p>
                  <span className="inline-block mt-6 text-[13px] font-semibold text-electric">
                    <T en="View scope →" id="Lihat cakupan →" />
                  </span>
                </div>
              </Link>
            );
          })}
        </Container>
      </section>

      <PageCTA
        eyebrow={<T en="Our Work" id="Karya Kami"/>}
        title={<T en="See how these service lines come together on real project profiles." id="Lihat bagaimana lini layanan ini bekerja bersama dalam profil proyek nyata."/>}
        primaryHref="/our-work"
        primaryEn="View Our Work"
        primaryId="Lihat Karya Kami"
        secondaryHref="/rfq"
        secondaryEn="Request a quotation"
        secondaryId="Ajukan penawaran"
      />

      <Footer />
    </main>
  );
}
