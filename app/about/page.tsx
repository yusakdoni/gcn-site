import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PHOTOS } from "@/lib/data/photos";
import Image from "next/image";

const VALUES = [
  ["Integrity", "Clear and responsible business practices."],
  ["Reliability", "Dependable sourcing, communication and execution."],
  ["Responsiveness", "We adapt the scope to the client's actual requirement."],
  ["Quality", "Specification, documentation and delivery discipline."],
  ["Partnership", "Long-term relationships with clients and supply partners."],
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
            About GCN
          </span>

          <h1 className="text-white text-3xl md:text-h1 max-w-4xl mt-6">
            A practical partner for Supply, Trading & Construction.
          </h1>

          <p className="text-white/70 text-body mt-6 max-w-2xl">
            PT Gega Cahaya Nusantara supports organizations with product
            supply, wholesale trading and construction execution. For
            specialized requirements, we start from the client's
            specification rather than publishing a premature fixed catalog.
          </p>
        </Container>
      </section>

      {/* OUR STRUCTURE */}
      <section className="py-20 bg-white">
        <Container className="grid md:grid-cols-2 gap-16">
          <div>
            <SectionHeader
              eyebrow="Our Structure"
              title="Supply. Trading. Construction."
            />

            <p className="text-body text-navy/75 mt-6">
              These are the three business pillars used throughout this
              website. Aviation is presented as a supply and trading market,
              covering aircraft and non-aircraft requirements according to
              client needs.
            </p>
          </div>

          <div>
            <SectionHeader
              eyebrow="Our Approach"
              title="Requirement first."
            />

            <p className="text-body text-navy/75 mt-6">
              We clarify specification, quantity, documentation, timing and
              delivery expectations, then coordinate suitable sourcing or
              execution partners.
            </p>
          </div>
        </Container>
      </section>

      {/* COMPANY VALUES */}
      <section className="py-24 bg-offwhite">
        <Container>
          <SectionHeader
            eyebrow="What We Stand For"
            title="Company Values"
            align="center"
          />

          <div className="grid md:grid-cols-5 gap-px bg-mist mt-16">
            {VALUES.map(([t, b]) => (
              <div key={t} className="bg-white p-6">
                <h3 className="text-h3 text-lg">
                  {t}
                </h3>

                <p className="text-[14px] text-navy/70 mt-3 leading-relaxed">
                  {b}
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