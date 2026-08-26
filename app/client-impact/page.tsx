import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { PageCTA } from "@/components/ui/PageCTA";
import { StatBand } from "@/components/ui/StatBand";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PHOTOS } from "@/lib/data/photos";
import { PROJECTS } from "@/lib/data/projects";
import { T } from "@/components/i18n/T";
import { PROJECTS_ID } from "@/lib/i18n/data-id";

export const metadata = {
  title: "Client Impact",
  description: "How PT Gega Cahaya Nusantara measures and reports impact for clients across Supply, Trading & Construction engagements.",
};

// Placeholder impact metrics. GCN has not yet closed enough verified
// engagements to publish real performance figures — these are shown as
// explicit brackets rather than invented numbers, and should be replaced
// with real, verified figures once available (see disclaimer below).
const STATS = [
  { value: "[XX]", labelEn: "engagements completed to date", labelId: "pekerjaan yang telah diselesaikan" },
  { value: "[XX]%", labelEn: "on-time delivery rate", labelId: "tingkat pengiriman tepat waktu" },
  { value: "[XX]", labelEn: "industries actively served", labelId: "industri yang aktif kami layani" },
  { value: "[XX]", labelEn: "supply & execution partners", labelId: "mitra supply & pelaksana" },
];

// Featured work drawn from the same illustrative capability profiles as
// Our Work — shown here through a client-outcome lens rather than a
// process lens. Same "not a claim of a specific client engagement"
// disclaimer applies.
const FEATURED_SLUGS = ["road-construction-asphalt", "building-material-supply", "medical-equipment-supply"];

export default function ClientImpactPage() {
  const featured = FEATURED_SLUGS.map((slug) => PROJECTS.find((p) => p.slug === slug)).filter(Boolean) as typeof PROJECTS;

  return (
    <main>
      <Navbar />

      <PageHero
        eyebrow={<T en="Client Impact" id="Dampak untuk Klien"/>}
        title={<T en="Impact is measured in delivery, not promises." id="Dampak diukur dari eksekusi, bukan janji."/>}
        description={
          <T
            en="Every engagement is judged on the same terms: did the specification get met, did it arrive on time, and would the client come back. Here is how we intend to report that."
            id="Setiap pekerjaan dinilai dengan tolok ukur yang sama: apakah spesifikasi terpenuhi, apakah tiba tepat waktu, dan apakah klien akan kembali. Berikut cara kami melaporkannya."
          />
        }
        photo={PHOTOS.industrialFactory}
      />

      {/* Honest framing for the stat band below — see also lib/data/projects.ts,
          which marks its entries as capability-based illustrative examples for
          the same reason: GCN's public site does not publish invented figures. */}
      <section className="pt-16 pb-4 bg-deep-blue">
        <Container>
          <p className="text-white/50 text-[13px] max-w-2xl border-l-2 border-electric pl-4">
            <T
              en="The figures below are placeholders. As GCN completes and verifies client engagements, this page will be updated with real, reportable numbers rather than estimates."
              id="Angka di bawah ini adalah placeholder. Seiring GCN menyelesaikan dan memverifikasi pekerjaan untuk klien, halaman ini akan diperbarui dengan angka nyata yang dapat dipertanggungjawabkan, bukan perkiraan."
            />
          </p>
        </Container>
      </section>

      <StatBand stats={STATS} dark />

      {/* FEATURED WORK */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <SectionHeader
            eyebrow={<T en="Illustrative Examples" id="Contoh Ilustratif"/>}
            title={<T en="The kind of outcome we aim to deliver" id="Jenis hasil yang ingin kami capai"/>}
            description={
              <T
                en="Capability-based profiles, not claims of a specific client relationship unless separately verified — see Our Work for the full set."
                id="Profil berbasis kapabilitas, bukan klaim hubungan dengan klien tertentu kecuali diverifikasi terpisah — lihat Karya Kami untuk daftar lengkap."
              />
            }
          />

          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {featured.map((p) => {
              const tr = PROJECTS_ID[p.slug];
              return (
                <Link key={p.slug} href={`/our-work/${p.slug}`} className="group bg-white border border-mist overflow-hidden hover:border-navy transition-colors">
                  <div className="relative h-48">
                    <Image src={p.image.src} alt={p.image.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <span className="text-[11px] uppercase tracking-widest text-electric"><T en={p.sector} id={tr?.sector || p.sector} /></span>
                    <h3 className="text-h3 text-lg mt-3"><T en={p.title} id={tr?.title || p.title} /></h3>
                    <p className="text-[14px] text-navy/70 mt-3 leading-relaxed"><T en={p.outcome} id={tr?.outcome || p.outcome} /></p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CLIENT VOICE — placeholder, to be replaced with a real quote once
          a client agrees to be quoted. Left visually present (not hidden)
          so the layout/design is ready to receive real content later. */}
      <section className="py-24 md:py-28 bg-offwhite border-y border-mist">
        <Container className="max-w-3xl">
          <span className="text-[4rem] leading-none text-electric/30 font-semibold select-none">&ldquo;</span>
          <p className="text-[1.5rem] md:text-[2rem] leading-[1.3] tracking-[-0.01em] text-navy -mt-4">
            <T
              en="[Reserved for a direct client quote once one is available and approved for publication.]"
              id="[Disediakan untuk kutipan langsung dari klien, setelah tersedia dan disetujui untuk dipublikasikan.]"
            />
          </p>
          <div className="mt-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-mist" />
            <div>
              <p className="text-[14px] font-semibold text-navy"><T en="[Client name]" id="[Nama Klien]" /></p>
              <p className="text-[13px] text-navy/50"><T en="[Role, Company]" id="[Jabatan, Perusahaan]" /></p>
            </div>
          </div>
        </Container>
      </section>

      <PageCTA
        eyebrow={<T en="Work With Us" id="Kerja Sama"/>}
        title={<T en="Bring us a specification and a deadline — we'll tell you honestly if we can meet it." id="Beri kami spesifikasi dan tenggat waktu — kami akan jujur apakah bisa memenuhinya."/>}
        primaryHref="/work-with-us"
        primaryEn="Get in touch"
        primaryId="Hubungi kami"
        secondaryHref="/rfq"
        secondaryEn="Request a quotation"
        secondaryId="Ajukan penawaran"
      />

      <Footer />
    </main>
  );
}
