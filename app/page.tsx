import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/layout/Hero";
import { ValueProposition } from "@/components/layout/ValueProposition";
import { Services } from "@/components/layout/Services";
import { HowWeWork } from "@/components/layout/HowWeWork";
import { CapabilityBand } from "@/components/layout/CapabilityBand";
import { PartnerStatement } from "@/components/layout/PartnerStatement";
import { FinalCTA } from "@/components/layout/FinalCTA";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return <main><Navbar/><Hero/><ValueProposition/><Services/><HowWeWork/><CapabilityBand/><PartnerStatement/><FinalCTA/><Footer/></main>;
}
