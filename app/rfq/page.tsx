import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { RFQForm } from "@/components/forms/RFQForm";
import { PageHeroBackground } from "@/components/ui/PageHeroBackground";
import { PHOTOS } from "@/lib/data/photos";

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
          <span className="eyebrow text-electric mb-6">Request a Quotation</span>
          <h1 className="text-white text-3xl md:text-h1 max-w-2xl">Tell Us What You Need</h1>
          <p className="text-white/70 text-body mt-6 max-w-xl">
            Share your requirement below and our team will review it and respond promptly.
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
