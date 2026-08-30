import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/layout/Hero";
import { ValueProposition } from "@/components/layout/ValueProposition";
import { Services } from "@/components/layout/Services";
import { HowWeWork } from "@/components/layout/HowWeWork";
import { CapabilityBand } from "@/components/layout/CapabilityBand";
import { PartnerStatement } from "@/components/layout/PartnerStatement";
import { FinalCTA } from "@/components/layout/FinalCTA";
import { Footer } from "@/components/layout/Footer";
import { StatBand } from "@/components/ui/StatBand";

// Use verified business characteristics rather than fabricated performance numbers.
// These describe how GCN works and the markets it is prepared to support.
const HOME_STATS = [
  { value: "B2B", labelEn: "procurement and project-based supply for business requirements", labelId: "pengadaan dan supply berbasis proyek untuk kebutuhan bisnis" },
  { value: "Private", labelEn: "commercial opportunities and direct corporate requirements", labelId: "peluang komersial dan kebutuhan langsung perusahaan swasta" },
  { value: "Public", labelEn: "government and public-sector procurement opportunities where requirements and eligibility can be met", labelId: "peluang pengadaan pemerintah dan sektor publik sesuai persyaratan dan kelayakan" },
  { value: "Project", labelEn: "sourcing, costing, procurement, delivery and execution coordinated around each project", labelId: "sourcing, costing, procurement, delivery dan eksekusi yang dikoordinasikan per proyek" },
];

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ValueProposition />
      <Services />
      <StatBand
        stats={HOME_STATS}
        dark
        linkHref="/client-impact"
        linkEn="See how GCN manages client outcomes →"
        linkId="Lihat bagaimana GCN mengelola hasil untuk klien →"
      />
      <HowWeWork />
      <CapabilityBand />
      <PartnerStatement />
      <FinalCTA />
      <Footer />
    </main>
  );
}
