import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/ui/PageHero";
import { PHOTOS } from "@/lib/data/photos";
import { T } from "@/components/i18n/T";

export const metadata = {
  title: "Work With Us",
  description: "Get in touch with PT Gega Cahaya Nusantara — as a client with a sourcing or construction requirement, or as a supplier/execution partner.",
};

export default function WorkWithUsPage() {
  return (
    <main>
      <Navbar />

      <PageHero
        eyebrow={<T en="Work With Us" id="Kerja Sama"/>}
        title={<T en="Discuss Your Requirement" id="Diskusikan Kebutuhan Anda"/>}
        description={
          <T
            en="Whether you have a requirement to source, or capacity to offer as a supplier or execution partner, this is where that conversation starts."
            id="Baik Anda memiliki kebutuhan pengadaan, maupun kapasitas untuk ditawarkan sebagai supplier atau mitra pelaksana, percakapan ini dimulai dari sini."
          />
        }
        photo={PHOTOS.containerVans}
      />

      <section className="py-20 bg-white">
        <Container className="grid md:grid-cols-5 gap-16">
          <div className="md:col-span-2 flex flex-col gap-10">
            <div>
              <span className="text-caption text-corporate/60 uppercase tracking-widest"><T en="Head Office" id="Kantor Pusat"/></span>
              <p className="text-body text-navy/80 mt-3">
                Kawasan Pergudangan dan Industri PKT Bitung
                <br />
                Blok A6–A7, Tangerang, Banten
              </p>
            </div>

            <div>
              <span className="text-caption text-corporate/60 uppercase tracking-widest"><T en="Email" id="Email"/></span>
              <p className="text-body text-navy/80 mt-3">
                <a href="mailto:sales@gcnusantara.com" className="hover:text-corporate">
                  sales@gcnusantara.com
                </a>
              </p>
            </div>

            <div>
              <span className="text-caption text-corporate/60 uppercase tracking-widest"><T en="Response Time" id="Waktu Respons"/></span>
              <p className="text-body text-navy/80 mt-3"><T en="We respond to inquiries by email within 1–2 business days." id="Kami merespons pertanyaan melalui email dalam 1–2 hari kerja."/></p>
            </div>

            {/*
              TODO: Google Maps embed. Once the office location is pinned on
              Google Maps, replace this comment with:
              <div className="aspect-video border border-mist">
                <iframe src="<embed URL from Google Maps 'Share > Embed a map'>" className="w-full h-full border-0" loading="lazy" />
              </div>
              Left out entirely (rather than a placeholder box) so the page
              doesn't look unfinished to visitors before it's ready.
            */}
          </div>

          <div className="md:col-span-3">
            <ContactForm />
          </div>
        </Container>
      </section>

      {/* BECOME A SUPPLIER / PARTNER — same offer as the homepage
          PartnerStatement band, given fuller billing here since this is now
          the dedicated "work with us" destination rather than a footnote. */}
      <section id="partner" className="py-20 bg-offwhite border-t border-mist">
        <Container className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="eyebrow"><T en="For Suppliers & Partners" id="Untuk Supplier & Mitra"/></span>
            <h2 className="text-h2 text-2xl md:text-h2 mt-4">
              <T en="Become a supply or execution partner" id="Menjadi mitra supply atau pelaksana"/>
            </h2>
            <p className="text-body text-navy/75 mt-4">
              <T
                en="We work with manufacturers, distributors, specialist suppliers, contractors, logistics providers, and project partners to fulfill client requirements."
                id="Kami bekerja sama dengan produsen, distributor, supplier spesialis, kontraktor, penyedia logistik, dan mitra proyek untuk memenuhi kebutuhan klien."
              />
            </p>
          </div>
          <a href="mailto:sales@gcnusantara.com?subject=Supplier%2FPartner%20Inquiry" className="bg-deep-blue text-white px-7 py-4 text-cta uppercase tracking-widest hover:bg-electric whitespace-nowrap">
            <T en="Introduce your company" id="Perkenalkan perusahaan Anda"/>
          </a>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
