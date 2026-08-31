import Image from "next/image";
import Link from "next/link";
import {Container} from "@/components/ui/Container";
import {PHOTOS} from "@/lib/data/photos";
import {T} from "@/components/i18n/T";

const tiles=[PHOTOS.materials,PHOTOS.construction,PHOTOS.medical,PHOTOS.aviation];

export function Hero(){return <section className="relative overflow-hidden bg-deep-blue pt-[72px] md:pt-20">
 <div className="absolute inset-0 top-[72px] md:top-20"><Image src={PHOTOS.hero.src} alt={PHOTOS.hero.alt} fill priority sizes="100vw" className="object-cover opacity-[0.16]"/><div className="absolute inset-0 bg-gradient-to-r from-deep-blue via-deep-blue/95 to-deep-blue/80"/></div>
 <Container className="relative grid items-center gap-8 py-9 sm:py-12 md:py-16 lg:min-h-[680px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-20">
  <div className="z-10 max-w-3xl">
   <span className="inline-flex max-w-full items-center rounded-full border border-white/20 bg-white/[0.06] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#D6A13B] sm:px-4 sm:text-[10px] md:text-[11px]"><T en="Procurement | Supply | Construction" id="Pengadaan | Supply | Konstruksi"/></span>
   <h1 className="mt-5 max-w-4xl text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.035em] text-white min-[380px]:text-[2.65rem] sm:text-[3.2rem] md:mt-6 md:text-[4.4rem] md:leading-[0.98]"><T en="Trusted procurement, supply & construction solutions." id="Solusi Pengadaan, Supply & Konstruksi Terpercaya."/></h1>
   <p className="mt-5 max-w-2xl text-[14px] leading-7 text-white/80 sm:text-[15px] md:mt-6 md:text-[17px]"><T en="Supporting private and public-sector business requirements through disciplined sourcing, commercial review, project coordination and delivery." id="Mendukung kebutuhan bisnis sektor swasta maupun pemerintahan melalui sourcing, review komersial, koordinasi proyek dan delivery yang terstruktur."/></p>
   <div className="mt-7 flex flex-wrap gap-3 md:mt-8"><Link href="/services" className="rounded-md bg-[#C58A27] px-5 py-3.5 text-[12px] font-semibold tracking-wide text-white transition hover:bg-[#B77C1E] sm:px-6 sm:py-4 sm:text-[13px]"><T en="Explore Our Services →" id="Jelajahi Layanan Kami →"/></Link><Link href="/rfq" className="rounded-md border border-white/40 bg-white/[0.05] px-5 py-3.5 text-[12px] font-semibold tracking-wide text-white transition hover:bg-white hover:text-deep-blue sm:px-6 sm:py-4 sm:text-[13px]"><T en="Submit RFQ" id="Kirim RFQ"/></Link></div>
  </div>
  <div className="relative h-[250px] w-full max-w-[560px] justify-self-center min-[380px]:h-[290px] sm:h-[350px] lg:h-[500px] lg:justify-self-end">
   <div className="absolute inset-0 rounded-[22px] border border-white/10 bg-white/[0.035] backdrop-blur-sm"/>
   <div className="absolute inset-2.5 grid grid-cols-2 grid-rows-2 gap-2.5 sm:inset-4 sm:gap-3">
    {tiles.map((p,i)=><div key={p.src} className="relative overflow-hidden rounded-xl border border-white/15 shadow-2xl sm:rounded-2xl"><Image src={p.src} alt={p.alt} fill sizes="(max-width:1024px) 45vw, 280px" className="object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-deep-blue/35 via-transparent to-transparent"/></div>)}
   </div>
  </div>
 </Container>
 </section>}
