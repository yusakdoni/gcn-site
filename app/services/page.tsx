import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { PageHeroBackground } from "@/components/ui/PageHeroBackground";
import { PHOTOS } from "@/lib/data/photos";
import { SERVICES } from "@/lib/data/services";
export const metadata={title:"Services",description:"Supply, Trading & Construction services from PT Gega Cahaya Nusantara."};
export default function ServicesPage(){return <main><Navbar/><section className="pt-40 pb-20 bg-deep-blue relative overflow-hidden"><PageHeroBackground photo={PHOTOS.constructionAerial} priority/><Container className="relative"><span className="eyebrow text-electric">Services</span><h1 className="text-white text-3xl md:text-h1 max-w-4xl mt-6">Practical services around construction, supply, and project execution.</h1><p className="text-white/70 text-body mt-6 max-w-2xl">Three core business pillars reflect the operating structure of GCN: Supply, Trading & Construction.</p></Container></section><section className="py-20 bg-white"><Container className="grid md:grid-cols-2 gap-6">{SERVICES.map((s,i)=><Link key={s.slug} href={`/services/${s.slug}`} className="group border border-mist overflow-hidden bg-white"><div className="relative h-64"><Image src={s.image.src} alt={s.image.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105"/><span className="absolute top-5 left-5 bg-white px-3 py-2 text-[11px] uppercase tracking-widest text-deep-blue">{String(i+1).padStart(2,"0")}</span></div><div className="p-8 md:p-10"><h2 className="text-h3 text-xl">{s.title}</h2><p className="text-[15px] text-navy/70 leading-relaxed mt-4">{s.summary}</p><span className="inline-block mt-6 text-[13px] font-semibold text-electric">View scope →</span></div></Link>)}</Container></section><Footer/></main>}
