import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { INSIGHTS } from "@/lib/data/insights";
export function generateStaticParams(){return INSIGHTS.map(a=>({slug:a.slug}));}
export async function generateMetadata({params}:{params:{slug:string}}){const a=INSIGHTS.find(x=>x.slug===params.slug);if(!a)return{};return{title:a.title,description:a.summary};}
export default async function InsightDetail({params}:{params:{slug:string}}){const a=INSIGHTS.find(x=>x.slug===params.slug);if(!a)notFound();return <main><Navbar/><section className="pt-40 pb-20 bg-deep-blue"><Container><span className="eyebrow text-electric">{a.cat}</span><h1 className="text-white text-4xl md:text-h1 max-w-4xl mt-6">{a.title}</h1><p className="text-white/70 text-body max-w-2xl mt-6">{a.intro}</p></Container></section><section className="py-20"><Container className="max-w-3xl"><div className="space-y-7">{a.body.map(x=><p key={x} className="text-[18px] leading-[1.8] text-navy/75">{x}</p>)}</div><div className="mt-14 pt-8 border-t border-mist"><Link href="/contact" className="text-electric font-semibold">Discuss your requirement →</Link></div></Container></section><Footer/></main>}
