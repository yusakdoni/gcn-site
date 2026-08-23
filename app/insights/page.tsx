import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { PageHeroBackground } from "@/components/ui/PageHeroBackground";
import { PHOTOS } from "@/lib/data/photos";
import { INSIGHTS } from "@/lib/data/insights";
import { T } from "@/components/i18n/T";
import { INSIGHTS_ID } from "@/lib/i18n/data-id";
export const metadata={title:"Insights",description:"Practical perspectives on construction, procurement, facility maintenance, technical supply, and project execution."};
export default function InsightsPage(){return <main><Navbar/><section className="pt-40 pb-20 bg-deep-blue relative overflow-hidden"><PageHeroBackground photo={PHOTOS.industrialBridge} priority/><Container className="relative"><span className="eyebrow text-electric"><T en="Insights" id="Wawasan"/></span><h1 className="text-white text-4xl md:text-h1 max-w-4xl mt-6"><T en="Practical perspectives for better projects and operations." id="Perspektif praktis untuk proyek dan operasi yang lebih baik."/></h1><p className="text-white/70 text-body mt-6 max-w-2xl"><T en="A working view of construction, procurement, maintenance, technical supply, and delivery discipline." id="Pandangan praktis seputar konstruksi, pengadaan, pemeliharaan, supply teknis, dan disiplin pengiriman."/></p></Container></section><section className="py-20 bg-white"><Container className="grid md:grid-cols-2 gap-px bg-mist">{INSIGHTS.map(a=>{const tr=INSIGHTS_ID[a.slug];return <article key={a.slug} className="bg-white"><div className="relative h-64"><Image src={a.image.src} alt={a.image.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover"/></div><div className="p-8"><span className="text-caption text-electric"><T en={a.cat} id={tr?.cat||a.cat}/></span><h2 className="text-2xl text-navy mt-4"><T en={a.title} id={tr?.title||a.title}/></h2><p className="text-[15px] text-navy/65 leading-relaxed mt-4"><T en={a.summary} id={tr?.summary||a.summary}/></p><Link href={`/insights/${a.slug}`} className="inline-block mt-6 text-[13px] font-semibold text-electric"><T en="Read perspective →" id="Baca selengkapnya →"/></Link></div></article>})}</Container></section><Footer/></main>}
