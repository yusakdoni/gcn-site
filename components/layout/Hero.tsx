import Image from "next/image";
import Link from "next/link";
import {Container} from "@/components/ui/Container";
import {PHOTOS} from "@/lib/data/photos";
import {T} from "@/components/i18n/T";

const tiles=[PHOTOS.materials,PHOTOS.construction,PHOTOS.medical,PHOTOS.aviation];

export function Hero(){return <section className="relative overflow-hidden bg-deep-blue pt-[92px] md:pt-24">
 <div className="absolute inset-0 top-[92px] md:top-24"><Image src={PHOTOS.hero.src} alt={PHOTOS.hero.alt} fill priority sizes="100vw" className="object-cover opacity-20"/><div className="absolute inset-0 bg-gradient-to-r from-deep-blue via-deep-blue/95 to-deep-blue/75"/></div>
 <Container className="relative grid min-h-[680px] md:min-h-[700px] lg:grid-cols-[1.15fr_0.85fr] items-center gap-10 py-14 md:py-20">
  <div className="max-w-3xl z-10">
   <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D6A13B]"><T en="Procurement | Supply | Construction" id="Pengadaan | Supply | Konstruksi"/></span>
   <h1 className="mt-6 text-white text-[2.55rem] leading-[1.04] tracking-[-0.035em] font-semibold md:text-[4.7rem] md:leading-[0.98] max-w-4xl"><T en="Trusted procurement, supply & construction solutions." id="Solusi Pengadaan, Supply & Konstruksi Terpercaya."/></h1>
   <p className="text-white/78 text-[16px] md:text-[18px] leading-relaxed mt-6 max-w-2xl"><T en="Supporting private and public-sector business requirements through disciplined sourcing, commercial review, project coordination and delivery." id="Mendukung kebutuhan bisnis sektor swasta maupun pemerintahan melalui sourcing, review komersial, koordinasi proyek dan delivery yang terstruktur."/></p>
   <div className="flex flex-wrap gap-3 mt-8"><Link href="/services" className="bg-[#C58A27] text-white px-6 py-4 text-[13px] font-semibold tracking-wide rounded-md hover:bg-[#B77C1E] transition"><T en="Explore Our Services →" id="Jelajahi Layanan Kami →"/></Link><Link href="/rfq" className="border border-white/35 bg-white/5 text-white px-6 py-4 text-[13px] font-semibold tracking-wide rounded-md hover:bg-white hover:text-deep-blue transition"><T en="Submit RFQ" id="Kirim RFQ"/></Link></div>
  </div>
  <div className="relative h-[360px] sm:h-[430px] lg:h-[540px] w-full max-w-[520px] justify-self-end">
   <div className="absolute inset-0 rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-sm"/>
   <div className="absolute inset-3 sm:inset-5 grid grid-cols-2 grid-rows-2 gap-3 rotate-[2deg]">
    {tiles.map((p,i)=><div key={p.src} className={`relative overflow-hidden rounded-2xl border border-white/15 shadow-2xl ${i===1||i===2?"translate-y-4":""}`}><Image src={p.src} alt={p.alt} fill sizes="(max-width:1024px) 45vw, 280px" className="object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-deep-blue/45 via-transparent to-transparent"/></div>)}
   </div>
  </div>
 </Container>
 </section>}
