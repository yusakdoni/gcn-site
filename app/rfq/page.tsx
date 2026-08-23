import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { RFQForm } from "@/components/forms/RFQForm";
import { PageHeroBackground } from "@/components/ui/PageHeroBackground";
import { PHOTOS } from "@/lib/data/photos";
import { T } from "@/components/i18n/T";

export const metadata = {
  title: "Request a Quotation",
  description: "Submit your procurement or supply requirement to PT Gega Cahaya Nusantara.",
};

export default function RFQPage() {
  return (
    <main>
      <Navbar />

      <section className="pt-40 pb-16 bg-deep-blue relative overflow-hidden">
        <PageHeroBackground photo={PHOTOS.industrialBridge} priority />
        <Container className="relative">
          <span className="eyebrow text-electric mb-6"><T en="Request a Quotation" id="Ajukan Penawaran"/></span>
          <h1 className="text-white text-3xl md:text-h1 max-w-2xl"><T en="Tell Us What You Need" id="Sampaikan Kebutuhan Anda"/></h1>
          <p className="text-white/70 text-body mt-6 max-w-xl">
            <T en="Share your requirement below and our team will review it and respond promptly." id="Sampaikan kebutuhan Anda di bawah ini dan tim kami akan meninjau serta merespons dengan cepat."/>
          </p>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container className="max-w-2xl">
          <RFQForm />
        </Container>
      </section>

      <Footer />
    </main>
  );
}
