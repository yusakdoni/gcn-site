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

// Same placeholder-stat rationale as app/client-impact/page.tsx — brackets,
// not invented numbers, until GCN has verified figures to publish.
const HOME_STATS = [
  { value: "[XX]", labelEn: "engagements completed to date", labelId: "pekerjaan yang telah diselesaikan" },
  { value: "[XX]%", labelEn: "on-time delivery rate", labelId: "tingkat pengiriman tepat waktu" },
  { value: "[XX]", labelEn: "industries actively served", labelId: "industri yang aktif kami layani" },
  { value: "[XX]", labelEn: "supply & execution partners", labelId: "mitra supply & pelaksana" },
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
        linkEn="See how we define Client Impact →"
        linkId="Lihat bagaimana kami mendefinisikan Dampak untuk Klien →"
      />
      <HowWeWork />
      <CapabilityBand />
      <PartnerStatement />
      <FinalCTA />
      <Footer />
    </main>
  );
}
