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
  description: "How PT Gega Cahaya Nusantara approaches specification, delivery, commercial control and documentation across client engagements.",
};

const IMPACT_PRINCIPLES = [
  { value: "Spec", labelEn: "requirements are reviewed against specification, scope and intended use", labelId: "kebutuhan direview terhadap spesifikasi, scope dan tujuan penggunaan" },
  { value: "Time", labelEn: "lead time and delivery commitments are reviewed before commercial confirmation", labelId: "lead time dan komitmen pengiriman direview sebelum konfirmasi komersial" },
  { value: "Cost", labelEn: "sourcing and costing are evaluated before a quotation is committed", labelId: "sourcing dan costing dievaluasi sebelum quotation dikomitmenkan" },
  { value: "Docs", labelEn: "project, procurement and delivery documents are kept traceable to the transaction", labelId: "dokumen proyek, procurement dan delivery dijaga keterlacakan terhadap transaksi" },
];

const FEATURED_SLUGS = ["road-construction-asphalt", "building-material-supply", "medical-equipment-supply"];

export default function ClientImpactPage() {
  const featured = FEATURED_SLUGS.map((slug) => PROJECTS.find((p) => p.slug === slug)).filter(Boolean) as typeof PROJECTS;

  return (
    <main>
      <Navbar />

      <PageHero
        eyebrow={<T en="Client Impact" id="Dampak untuk Klien"/>}
        title={<T en="Impact is built through disciplined execution." id="Dampak dibangun melalui eksekusi yang disiplin."/>}
        description={
          <T
            en="For GCN, client impact starts with a clear requirement and continues through sourcing, costing, procurement, delivery and documented closeout. We publish verified outcomes when they are available rather than filling the website with unsupported claims."
            id="Bagi GCN, dampak untuk klien dimulai dari requirement yang jelas dan berlanjut melalui sourcing, costing, procurement, delivery hingga closeout yang terdokumentasi. Kami memilih mempublikasikan hasil yang telah terverifikasi daripada memenuhi website dengan klaim yang belum dapat dipertanggungjawabkan."
          />
        }
        photo={PHOTOS.industrialFactory}
      />

      <StatBand stats={IMPACT_PRINCIPLES} dark />

      <section className="py-20 md:py-28 bg-white">
        <Container>
          <SectionHeader
            eyebrow={<T en="How We Create Value" id="Bagaimana Kami Menciptakan Nilai"/>}
            title={<T en="Control the requirement before controlling the outcome" id="Kendalikan requirement sebelum mengendalikan hasil"/>}
            description={
              <T
                en="The operating discipline is simple: understand the need, source responsibly, calculate the commercial position, confirm what can be delivered, execute, and keep the transaction traceable."
                id="Disiplin operasionalnya sederhana: pahami kebutuhan, lakukan sourcing secara bertanggung jawab, hitung posisi komersial, konfirmasikan apa yang dapat dipenuhi, eksekusi, dan jaga transaksi tetap terlacak."
              />
            }
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {[
              ["01", "Requirement clarity", "Kejelasan requirement", "Specification, quantity, location, schedule and acceptance criteria are clarified before sourcing.", "Spesifikasi, quantity, lokasi, schedule dan kriteria penerimaan diperjelas sebelum sourcing."],
              ["02", "Sourcing discipline", "Disiplin sourcing", "Supplier options are compared against capability, commercial terms, lead time and project fit.", "Opsi supplier dibandingkan berdasarkan kapabilitas, terms komersial, lead time dan kecocokan proyek."],
              ["03", "Commercial control", "Kontrol komersial", "Pricing is prepared with cost, logistics, execution requirements and project risk in view.", "Pricing disiapkan dengan mempertimbangkan cost, logistics, kebutuhan eksekusi dan risiko proyek."],
              ["04", "Documented closeout", "Closeout terdokumentasi", "Delivery, acceptance, invoicing and supporting documents remain connected to the project record.", "Delivery, acceptance, invoicing dan dokumen pendukung tetap terhubung dengan record proyek."],
            ].map(([n, enTitle, idTitle, enBody, idBody]) => (
              <div key={n} className="border-t border-navy pt-6">
                <span className="text-electric text-sm font-semibold">{n}</span>
                <h3 className="text-h3 text-xl mt-5"><T en={enTitle} id={idTitle} /></h3>
                <p className="text-[14px] leading-relaxed text-navy/65 mt-4"><T en={enBody} id={idBody} /></p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28 bg-offwhite border-y border-mist">
        <Container>
          <SectionHeader
            eyebrow={<T en="Capability Profiles" id="Profil Kapabilitas"/>}
            title={<T en="Examples of requirements GCN is prepared to review" id="Contoh kebutuhan yang siap direview GCN"/>}
            description={
              <T
                en="These are capability-based examples, not claims of a specific client relationship. Actual project references should only be published after they are verified and approved."
                id="Ini adalah contoh berbasis kapabilitas, bukan klaim hubungan dengan klien tertentu. Referensi proyek aktual hanya dipublikasikan setelah diverifikasi dan disetujui."
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

      <PageCTA
        eyebrow={<T en="Start With the Requirement" id="Mulai dari Requirement"/>}
        title={<T en="Send the specification, quantity, location and target date. We will review what can realistically be delivered." id="Kirim spesifikasi, quantity, lokasi dan target waktu. Kami akan mereview apa yang secara realistis dapat dipenuhi."/>}
        primaryHref="/rfq"
        primaryEn="Request a quotation"
        primaryId="Ajukan penawaran"
        secondaryHref="/work-with-us"
        secondaryEn="Talk to GCN"
        secondaryId="Hubungi GCN"
      />

      <Footer />
    </main>
  );
}
