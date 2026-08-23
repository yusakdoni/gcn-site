import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { INDUSTRIES } from "@/lib/data/industries";
import { PHOTOS } from "@/lib/data/photos";
import { SERVICES } from "@/lib/data/services";
import { T } from "@/components/i18n/T";
import { INDUSTRIES_ID, SERVICES_ID } from "@/lib/i18n/data-id";
export function generateStaticParams(){return INDUSTRIES.map(i=>({slug:i.slug}));}
export async function generateMetadata({params}:{params:{slug:string}}){const i=INDUSTRIES.find(x=>x.slug===params.slug);if(!i)return{};return{title:i.title,description:i.description};}
export default async function IndustryPage({params}:{params:{slug:string}}){const i=INDUSTRIES.find(x=>x.slug===params.slug);if(!i)notFound();const p=PHOTOS[i.image as keyof typeof PHOTOS];const related=i.relevantServiceSlugs.map(s=>SERVICES.find(x=>x.slug===s)).filter(Boolean);const tr=INDUSTRIES_ID[i.slug];return <main><Navbar/><section className="pt-36 pb-16 bg-deep-blue"><Container><span className="eyebrow text-electric"><T en="Industries" id="Industri"/></span><h1 className="text-white text-4xl md:text-h1 max-w-4xl mt-6"><T en={i.title} id={tr?.title||i.title}/></h1><p className="text-white/70 text-body max-w-2xl mt-6"><T en={i.description} id={tr?.description||i.description}/></p></Container></section><section className="py-20"><Container className="grid lg:grid-cols-5 gap-12"><div className="lg:col-span-3 relative h-[460px]"><Image src={p.src} alt={i.imageAlt} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover"/></div><div className="lg:col-span-2"><span className="eyebrow"><T en="Typical Requirements" id="Kebutuhan Umum"/></span><ul className="mt-7 divide-y divide-mist">{i.typicalRequirements.map((x,xi)=><li key={x} className="py-4 text-[16px]"><T en={x} id={tr?.typicalRequirements?.[xi]||x}/></li>)}</ul><h2 className="text-xl font-semibold text-navy mt-10"><T en="Relevant capabilities" id="Kapabilitas terkait"/></h2><div className="mt-4 flex flex-col gap-3">{related.map(s=>{if(!s)return null;const strr=SERVICES_ID[s.slug];return <Link key={s.slug} href={`/services/${s.slug}`} className="text-electric hover:underline"><T en={s.title} id={strr?.title||s.title}/> →</Link>})}</div></div></Container></section><Footer/></main>}
