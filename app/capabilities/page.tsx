import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {Navbar} from "@/components/layout/Navbar";
import {Footer} from "@/components/layout/Footer";
import {Container} from "@/components/ui/Container";
import {CAPABILITY_DATA,CapabilityKey} from "@/lib/data/capabilities-v2";

export const metadata:Metadata={title:"Kapabilitas | Aviation, Procurement, Supply & Construction",description:"Kapabilitas GEGA untuk Aviation Supply, Procurement & Sourcing, General Supply & Trading, Industrial Supply, Project-Based Supply dan Construction.",alternates:{canonical:"https://www.gcnusantara.com/capabilities"}};
const ORDER:CapabilityKey[]=["aviation","procurement","general-supply","industrial","project-supply","construction"];

export default function Page(){return <main><Navbar/>
<section className="bg-[#041827] pt-[72px] text-white md:pt-20"><Container className="py-16 md:py-28"><div className="max-w-4xl"><div className="text-[11px] font-semibold uppercase tracking-[.17em] text-cyan">Capabilities</div><h1 className="mt-5 text-[clamp(2.35rem,10vw,4.5rem)] font-semibold leading-[1.02] tracking-[-.045em] text-white">Kapabilitas yang mengikuti kebutuhan bisnis.</h1><p className="mt-6 max-w-2xl text-[16px] leading-7 text-white/75 md:text-[17px] md:leading-8">GEGA menggabungkan sourcing, procurement, supply, koordinasi komersial, project execution, dan dokumentasi sesuai kebutuhan setiap engagement.</p></div></Container></section>
<section className="bg-[#f4f8fa] py-16 md:py-28"><Container><div className="grid gap-6 lg:grid-cols-2">{ORDER.map((k,i)=>{const c=CAPABILITY_DATA[k];return <Link key={c.slug} href={`/${c.slug}`} className={`group overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-[0_8px_30px_rgba(4,24,39,.06)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(4,24,39,.10)] ${i===0?"lg:col-span-2":""}`}>
<div className={`relative w-full overflow-hidden ${i===0?"h-56 sm:h-64 lg:h-[330px]":"h-52 sm:h-60 lg:h-[260px]"}`}><Image src={c.image} alt={`Representational visual for ${c.title}`} fill sizes={i===0?"100vw":"(max-width:1024px) 100vw, 50vw"} className="object-cover transition duration-700 group-hover:scale-[1.03]"/><div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(4,31,48,.10),rgba(4,31,48,.32)_58%,rgba(4,31,48,.68))]"/><div className="absolute left-5 top-5 rounded-full border border-white/25 bg-[#041827]/75 px-3 py-1.5 text-[10px] font-bold tracking-[.15em] text-cyan backdrop-blur-sm">0{i+1}</div></div>
<div className="p-5 sm:p-6 md:p-8"><h2 className="text-[clamp(1.7rem,7vw,2.35rem)] font-semibold leading-[1.08] tracking-[-.035em] text-navy">{c.title}</h2><div className="mt-3 text-[15px] font-semibold leading-6 text-corporate">{c.descriptor}</div><p className="mt-4 max-w-2xl text-[14px] leading-7 text-navy/70">{c.intro}</p><span className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-corporate">Explore capability <ArrowRight size={16}/></span></div>
</Link>})}</div></Container></section><Footer/></main>}
