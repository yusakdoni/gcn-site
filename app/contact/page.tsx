import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHeroBackground } from "@/components/ui/PageHeroBackground";
import { PHOTOS } from "@/lib/data/photos";
import { T } from "@/components/i18n/T";

export const metadata = {
  title: "Contact",
  description: "Get in touch with PT Gega Cahaya Nusantara for procurement and supply requirements.",
};

export default function ContactPage() {
  return (
    <main>
      <Navbar />

      <section className="pt-40 pb-16 bg-deep-blue relative overflow-hidden">
        <PageHeroBackground photo={PHOTOS.containerVans} priority />
        <Container className="relative">
          <span className="eyebrow text-electric mb-6"><T en="Contact" id="Kontak"/></span>
          <h1 className="text-white text-3xl md:text-h1 max-w-2xl"><T en="Discuss Your Requirement" id="Diskusikan Kebutuhan Anda"/></h1>
        </Container>
      </section>

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

      <Footer />
    </main>
  );
}
