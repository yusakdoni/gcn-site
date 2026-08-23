import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { SERVICES } from "@/lib/data/services";
import { T } from "@/components/i18n/T";
import { SERVICES_ID } from "@/lib/i18n/data-id";
export function generateStaticParams(){return SERVICES.map(s=>({slug:s.slug}));}
export async function generateMetadata({params}:{params:{slug:string}}){const s=SERVICES.find(x=>x.slug===params.slug);if(!s)return{};return{title:s.title,description:s.summary};}
export default async function ServicePage({params}:{params:{slug:string}}){
 const s=SERVICES.find(x=>x.slug===params.slug);if(!s)notFound();
 const tr=SERVICES_ID[s.slug];
 return <main><Navbar/><section className="pt-36 pb-16 bg-deep-blue"><Container><span className="eyebrow text-electric"><T en="Services" id="Layanan"/></span><h1 className="text-white text-4xl md:text-h1 max-w-4xl mt-6"><T en={s.title} id={tr?.title||s.title}/></h1><p className="text-white/70 text-body max-w-2xl mt-6"><T en={s.summary} id={tr?.summary||s.summary}/></p></Container></section><section className="py-20 bg-white"><Container className="grid lg:grid-cols-2 gap-14 items-start"><div className="relative h-[420px]"><Image src={s.image.src} alt={s.image.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover"/></div><div><span className="eyebrow"><T en="Scope" id="Ruang Lingkup"/></span><h2 className="text-h2 mt-5"><T en="What we can support" id="Yang dapat kami dukung"/></h2><ul className="mt-8 divide-y divide-mist">{s.capabilities.map((x,i)=><li key={x} className="py-4 text-[16px] text-navy/75"><T en={x} id={tr?.capabilities?.[i]||x}/></li>)}</ul>{s.disclaimer&&<p className="text-xs text-navy/50 border-l-2 border-electric pl-4 mt-8"><T en={s.disclaimer} id={tr?.disclaimer||s.disclaimer}/></p>}<Link href="/rfq" className="inline-flex bg-deep-blue text-white px-6 py-4 text-cta uppercase tracking-widest mt-10 hover:bg-electric"><T en="Request a quotation" id="Ajukan penawaran"/></Link></div></Container></section><Footer/></main>;
}
