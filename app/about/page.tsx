import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PHOTOS } from "@/lib/data/photos";
import Image from "next/image";
import { T } from "@/components/i18n/T";

const VALUES = [
  {en:["Integrity","Clear and responsible business practices."],id:["Integritas","Praktik bisnis yang jelas dan bertanggung jawab."]},
  {en:["Reliability","Dependable sourcing, communication and execution."],id:["Keandalan","Pengadaan, komunikasi dan eksekusi yang dapat diandalkan."]},
  {en:["Responsiveness","We adapt the scope to the client's actual requirement."],id:["Responsif","Kami menyesuaikan ruang lingkup dengan kebutuhan aktual klien."]},
  {en:["Quality","Specification, documentation and delivery discipline."],id:["Kualitas","Disiplin spesifikasi, dokumentasi dan pengiriman."]},
  {en:["Partnership","Long-term relationships with clients and supply partners."],id:["Kemitraan","Hubungan jangka panjang dengan klien dan mitra supply."]},
];

export const metadata = {
  title: "About",
  description: "PT Gega Cahaya Nusantara — Supply, Trading & Construction.",
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      {/* HERO — SINGLE IMAGE */}
      <section className="pt-40 pb-20 bg-deep-blue relative overflow-hidden">
        <Image
          src={PHOTOS.hero.src}
          alt={PHOTOS.hero.alt}
          fill
          priority
          className="object-cover opacity-35"
        />

        <Container className="relative">
          <span className="eyebrow text-electric">
            <T en="About GCN" id="Tentang GCN"/>
          </span>

          <h1 className="text-white text-3xl md:text-h1 max-w-4xl mt-6">
            <T en="A practical partner for Supply, Trading & Construction." id="Mitra praktis untuk Supply, Trading & Konstruksi."/>
          </h1>

          <p className="text-white/70 text-body mt-6 max-w-2xl">
            <T
              en="PT Gega Cahaya Nusantara supports organizations with product supply, wholesale trading and construction execution. For specialized requirements, we start from the client's specification rather than publishing a premature fixed catalog."
              id="PT Gega Cahaya Nusantara mendukung berbagai organisasi melalui supply produk, perdagangan grosir dan pelaksanaan konstruksi. Untuk kebutuhan khusus, kami memulai dari spesifikasi klien, bukan menerbitkan katalog tetap yang prematur."
            />
          </p>
        </Container>
      </section>

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

      <Footer />
    </main>
  );
}
