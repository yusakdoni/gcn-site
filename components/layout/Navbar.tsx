"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {ChevronDown,Menu as MenuIcon,X} from "lucide-react";
import {Container} from "@/components/ui/Container";
import {LanguageToggle} from "@/components/layout/LanguageToggle";
import {useLanguage} from "@/lib/i18n/LanguageContext";
import {PRIMARY_LOGO_TRANSPARENT_1024} from "@/lib/primary_logo_transparent_1024";

const CAPABILITIES=[
 {href:"/aviation-supply",en:"Aviation Supply",id:"Aviation Supply"},
 {href:"/procurement-sourcing",en:"Procurement & Sourcing",id:"Procurement & Sourcing"},
 {href:"/general-supply-trading",en:"General Supply & Trading",id:"General Supply & Trading"},
 {href:"/industrial-supply",en:"Industrial Supply",id:"Industrial Supply"},
 {href:"/project-based-supply",en:"Project-Based Supply",id:"Project-Based Supply"},
 {href:"/construction",en:"Construction",id:"Konstruksi"},
];

export function Navbar(){
 const[menuOpen,setMenuOpen]=useState(false);const{lang}=useLanguage();
 useEffect(()=>{if(!menuOpen)return;document.body.style.overflow="hidden";const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape")setMenuOpen(false)};window.addEventListener("keydown",onKey);return()=>{document.body.style.overflow="";window.removeEventListener("keydown",onKey)}},[menuOpen]);
 const label=(en:string,id:string)=>lang==="id"?id:en;
 return <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#061f33]/92 text-white shadow-[0_8px_32px_rgba(0,0,0,.12)] backdrop-blur-xl">
  <Container className="flex h-[72px] items-center justify-between gap-3 md:h-20">
   <Link href="/" className="flex min-w-0 items-center gap-2.5" aria-label="GCN - PT Gega Cahaya Nusantara">
    <img src={PRIMARY_LOGO_TRANSPARENT_1024} alt="GCN" width={48} height={48} className="h-10 w-10 shrink-0 object-contain md:h-12 md:w-12"/>
    <div className="hidden min-[360px]:block min-w-0 border-l border-white/20 pl-2.5 leading-[1.08] md:pl-3">
     <div className="whitespace-nowrap text-[7.5px] font-bold tracking-[.05em] text-white md:text-[9px]">PT GEGA CAHAYA</div>
     <div className="whitespace-nowrap text-[7.5px] font-bold tracking-[.05em] text-white md:text-[9px]">NUSANTARA</div>
     <div className="mt-1 whitespace-nowrap text-[5.5px] font-semibold uppercase tracking-[.13em] text-cyan md:text-[7px]">Your Trusted Business Partner</div>
    </div>
   </Link>
   <nav className="hidden xl:flex items-center gap-6 text-[13px] font-medium">
    <Link href="/" className="transition hover:text-cyan">{label("Home","Beranda")}</Link>
    <div className="group relative"><button className="flex items-center gap-1.5 py-7 transition hover:text-cyan" aria-haspopup="true">{label("Company","Perusahaan")}<ChevronDown size={14}/></button><div className="invisible absolute left-1/2 top-[68px] w-56 -translate-x-1/2 translate-y-2 border border-white/10 bg-[#08263d]/98 p-2 opacity-0 shadow-2xl backdrop-blur-xl transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"><Link href="/company" className="block rounded-md px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white">{label("About GEGA","Tentang GEGA")}</Link><Link href="/company#vision" className="block rounded-md px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white">{label("Vision & Mission","Visi & Misi")}</Link><Link href="/company#sinergi" className="block rounded-md px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white">SINERGI</Link></div></div>
    <div className="group relative"><button className="flex items-center gap-1.5 py-7 transition hover:text-cyan" aria-haspopup="true">{label("Capabilities","Kapabilitas")}<ChevronDown size={14}/></button><div className="invisible absolute left-1/2 top-[68px] w-72 -translate-x-1/2 translate-y-2 border border-white/10 bg-[#08263d]/98 p-2 opacity-0 shadow-2xl backdrop-blur-xl transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"><Link href="/capabilities" className="mb-1 block rounded-md px-4 py-3 font-semibold text-cyan hover:bg-white/10">{label("View All Capabilities","Lihat Semua Kapabilitas")}</Link>{CAPABILITIES.map(x=><Link key={x.href} href={x.href} className="block rounded-md px-4 py-2.5 text-white/80 hover:bg-white/10 hover:text-white">{label(x.en,x.id)}</Link>)}</div></div>
    <Link href="/partnership" className="transition hover:text-cyan">{label("Partnership","Kemitraan")}</Link>
   </nav>
   <div className="hidden xl:flex items-center gap-3"><LanguageToggle/><Link href="/rfq" className="rounded-md bg-cyan px-5 py-3 text-[12px] font-bold tracking-[.04em] text-[#061f33] transition hover:bg-white">{label("Submit RFQ","Ajukan RFQ")}</Link></div>
   <div className="xl:hidden flex shrink-0 items-center gap-1.5"><LanguageToggle/><button onClick={()=>setMenuOpen(v=>!v)} className="flex h-10 w-10 items-center justify-center text-white" aria-label={menuOpen?label("Close menu","Tutup menu"):label("Open menu","Buka menu")} aria-expanded={menuOpen}>{menuOpen?<X size={24}/>:<MenuIcon size={24}/>}</button></div>
  </Container>
  <div className={`xl:hidden fixed inset-x-0 top-[72px] md:top-20 bottom-0 z-[60] overflow-y-auto bg-[#061f33] transition-transform duration-300 ${menuOpen?"translate-x-0":"translate-x-full"}`}><nav className="flex min-h-full flex-col px-6 py-7"><Link href="/" onClick={()=>setMenuOpen(false)} className="border-b border-white/10 py-4 text-lg">{label("Home","Beranda")}</Link><Link href="/company" onClick={()=>setMenuOpen(false)} className="border-b border-white/10 py-4 text-lg">{label("Company","Perusahaan")}</Link><div className="border-b border-white/10 py-4"><div className="mb-3 text-lg">{label("Capabilities","Kapabilitas")}</div><div className="ml-3 flex flex-col gap-1">{CAPABILITIES.map(x=><Link key={x.href} href={x.href} onClick={()=>setMenuOpen(false)} className="py-2.5 text-sm text-white/70">{label(x.en,x.id)}</Link>)}</div></div><Link href="/partnership" onClick={()=>setMenuOpen(false)} className="border-b border-white/10 py-4 text-lg">{label("Partnership","Kemitraan")}</Link><Link href="/rfq" onClick={()=>setMenuOpen(false)} className="mt-8 rounded-md bg-cyan px-5 py-4 text-center font-bold text-[#061f33]">{label("Submit RFQ","Ajukan RFQ")}</Link></nav></div>
 </header>
}
