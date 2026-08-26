import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PageHero } from "@/components/ui/PageHero";
import { PageCTA } from "@/components/ui/PageCTA";
import { PHOTOS } from "@/lib/data/photos";
import Image from "next/image";
import { T } from "@/components/i18n/T";
import { INDUSTRIES } from "@/lib/data/industries";
import { INDUSTRIES_ID } from "@/lib/i18n/data-id";

const VALUES = [
  {en:["Integrity","Clear and responsible business practices."],id:["Integritas","Praktik bisnis yang jelas dan bertanggung jawab."]},
  {en:["Reliability","Dependable sourcing, communication and execution."],id:["Keandalan","Pengadaan, komunikasi dan eksekusi yang dapat diandalkan."]},
  {en:["Responsiveness","We adapt the scope to the client's actual requirement."],id:["Responsif","Kami menyesuaikan ruang lingkup dengan kebutuhan aktual klien."]},
  {en:["Quality","Specification, documentation and delivery discipline."],id:["Kualitas","Disiplin spesifikasi, dokumentasi dan pengiriman."]},
  {en:["Partnership","Long-term relationships with clients and supply partners."],id:["Kemitraan","Hubungan jangka panjang dengan klien dan mitra supply."]},
];

export const metadata = {
  title: "Our Company",
  description: "PT Gega Cahaya Nusantara (GCN) — supplier and general trading partner for Supply, Trading & Construction requirements across Indonesia, including aviation, medical, chemical, machinery and construction supply.",
};

export default function CompanyPage() {
  return (
    <main>
      <Navbar />

      <PageHero
        eyebrow={<T en="Our Company" id="Perusahaan Kami"/>}
        title={<T en="A practical partner for Supply, Trading & Construction." id="Mitra praktis untuk Supply, Trading & Konstruksi."/>}
        description={
          <T
            en="PT Gega Cahaya Nusantara supports organizations with product supply, wholesale trading and construction execution. For specialized requirements, we start from the client's specification rather than publishing a premature fixed catalog."
            id="PT Gega Cahaya Nusantara mendukung berbagai organisasi melalui supply produk, perdagangan grosir dan pelaksanaan konstruksi. Untuk kebutuhan khusus, kami memulai dari spesifikasi klien, bukan menerbitkan katalog tetap yang prematur."
          />
        }
        photo={PHOTOS.hero}
      />

      {/* OUR STRUCTURE */}
      <section className="py-20 bg-white">
        <Container className="grid md:grid-cols-2 gap-16">
          <div>
            <SectionHeader
              eyebrow={<T en="Our Structure" id="Struktur Kami"/>}
              title={<T en="Supply. Trading. Construction." id="Supply. Trading. Konstruksi."/>}
            />

            <p className="text-body text-navy/75 mt-6">
              <T
                en="These are the three business pillars used throughout this website. Aviation is presented as a supply and trading market, covering aircraft and non-aircraft requirements according to client needs."
                id="Ini adalah tiga pilar bisnis yang digunakan di seluruh website ini. Aviation ditampilkan sebagai pasar supply dan trading, mencakup kebutuhan pesawat maupun non-pesawat sesuai kebutuhan klien."
              />
            </p>
          </div>

          <div>
            <SectionHeader
              eyebrow={<T en="Our Approach" id="Pendekatan Kami"/>}
              title={<T en="Requirement first." id="Kebutuhan lebih dulu."/>}
            />

            <p className="text-body text-navy/75 mt-6">
              <T
                en="We clarify specification, quantity, documentation, timing and delivery expectations, then coordinate suitable sourcing or execution partners."
                id="Kami memperjelas spesifikasi, kuantitas, dokumentasi, waktu dan ekspektasi pengiriman, lalu mengoordinasikan mitra pengadaan atau pelaksanaan yang sesuai."
              />
            </p>
          </div>
        </Container>
      </section>

      {/* COMPANY VALUES */}
      <section className="py-24 bg-offwhite">
        <Container>
          <SectionHeader
            eyebrow={<T en="What We Stand For" id="Yang Kami Junjung"/>}
            title={<T en="Company Values" id="Nilai Perusahaan"/>}
            align="center"
          />

          <div className="grid md:grid-cols-5 gap-px bg-mist mt-16">
            {VALUES.map((v) => (
              <div key={v.en[0]} className="bg-white p-6">
                <h3 className="text-h3 text-lg">
                  <T en={v.en[0]} id={v.id[0]}/>
                </h3>

                <p className="text-[14px] text-navy/70 mt-3 leading-relaxed">
                  <T en={v.en[1]} id={v.id[1]}/>
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* INDUSTRIES WE SERVE */}
      <section className="py-24 bg-white">
        <Container>
          <SectionHeader
            eyebrow={<T en="Industries" id="Industri"/>}
            title={<T en="Industries we serve" id="Industri yang kami layani"/>}
          />

          <p className="text-body text-navy/75 mt-6 max-w-2xl">
            <T
              en="Our Supply, Trading and Construction capabilities are most relevant across the following industries. Scope for each engagement is shaped around the client's specific, approved requirement."
              id="Kapabilitas Supply, Trading dan Konstruksi kami paling relevan di industri-industri berikut. Ruang lingkup setiap pekerjaan disesuaikan dengan kebutuhan spesifik klien yang telah disetujui."
            />
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {INDUSTRIES.map((ind) => {
              const p = PHOTOS[ind.image as keyof typeof PHOTOS];
              const tr = INDUSTRIES_ID[ind.slug];
              return (
                <div key={ind.slug} className="bg-white border border-mist overflow-hidden">
                  <div className="relative h-44">
                    <Image
                      src={p.src}
                      alt={ind.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-h3 text-lg">
                      <T en={ind.title} id={tr?.title || ind.title}/>
                    </h3>
                    <p className="text-[14px] text-navy/70 mt-3 leading-relaxed">
                      <T en={ind.description} id={tr?.description || ind.description}/>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <PageCTA
        eyebrow={<T en="Work With Us" id="Kerja Sama"/>}
        title={<T en="Have a requirement in mind? Let's talk about scope, specification and timeline." id="Punya kebutuhan tertentu? Mari bicarakan ruang lingkup, spesifikasi dan waktunya."/>}
        primaryHref="/work-with-us"
        primaryEn="Get in touch"
        primaryId="Hubungi kami"
        secondaryHref="/services"
        secondaryEn="See our services"
        secondaryId="Lihat layanan kami"
      />

      <Footer />
    </main>
  );
}
