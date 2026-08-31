"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {X,Menu as MenuIcon} from "lucide-react";
import {Button} from "@/components/ui/Button";
import {Container} from "@/components/ui/Container";
import {useLanguage} from "@/lib/i18n/LanguageContext";
import {LanguageToggle} from "@/components/layout/LanguageToggle";

const NAV_LINKS=[
 {href:"/",en:"Home",id:"Beranda"},
 {href:"/services",en:"Our Services",id:"Layanan Kami"},
 {href:"/our-work",en:"Our Work",id:"Karya Kami"},
 {href:"/client-impact",en:"Client Impact",id:"Dampak untuk Klien"},
 {href:"/company",en:"Our Company",id:"Perusahaan Kami"},
 {href:"/work-with-us",en:"Work With Us",id:"Kerja Sama"},
];

export function Navbar(){
 const[menuOpen,setMenuOpen]=useState(false);const{lang}=useLanguage();
 useEffect(()=>{if(!menuOpen)return;document.body.style.overflow="hidden";const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape")setMenuOpen(false)};window.addEventListener("keydown",onKey);return()=>{document.body.style.overflow="";window.removeEventListener("keydown",onKey)}},[menuOpen]);
 const cta=lang==="id"?"Ajukan Penawaran":"Request a Quotation";
 return <header className="fixed inset-x-0 top-0 z-50 border-b border-mist bg-white/95 shadow-sm backdrop-blur-md">
  <Container className="flex h-[72px] items-center justify-between gap-2 md:h-20">
   <Link href="/" className="flex min-w-0 items-center gap-2.5 md:gap-3" aria-label="GCN - PT Gega Cahaya Nusantara">
    <div className="shrink-0 text-[1.8rem] font-extrabold leading-none tracking-[-0.055em] text-navy md:text-[2.2rem]">GCN</div>
    <div className="hidden min-[350px]:block min-w-0 border-l border-navy/15 pl-2.5 md:pl-3 leading-[1.05]">
     <div className="whitespace-nowrap text-[7.5px] font-bold tracking-[0.035em] text-navy md:text-[9px]">PT GEGA CAHAYA</div>
     <div className="whitespace-nowrap text-[7.5px] font-bold tracking-[0.035em] text-navy md:text-[9px]">NUSANTARA</div>
     <div className="mt-1 whitespace-nowrap text-[5.5px] font-semibold tracking-[0.12em] text-[#B47A1F] md:text-[7px]">YOUR TRUSTED PARTNERS</div>
    </div>
   </Link>
   <nav className="hidden xl:flex items-center gap-4">{NAV_LINKS.map(l=><Link key={l.href} href={l.href} className="text-nav relative group whitespace-nowrap text-navy">{lang==="id"?l.id:l.en}<span className="absolute -bottom-1 left-0 h-px w-0 bg-electric transition-all duration-300 group-hover:w-full"/></Link>)}</nav>
   <div className="hidden xl:flex items-center gap-3"><LanguageToggle light/><Button href="/rfq" variant="primary">{cta}</Button></div>
   <div className="xl:hidden flex shrink-0 items-center gap-1.5"><LanguageToggle light/><button onClick={()=>setMenuOpen(v=>!v)} className="flex h-10 w-10 items-center justify-center text-navy" aria-label={menuOpen?(lang==="id"?"Tutup menu":"Close menu"):(lang==="id"?"Buka menu":"Open menu")} aria-expanded={menuOpen}>{menuOpen?<X size={24}/>:<MenuIcon size={24}/>}</button></div>
  </Container>
  <div className={`xl:hidden fixed inset-x-0 top-[72px] md:top-20 bottom-0 z-[60] overflow-y-auto bg-white shadow-xl transition-transform duration-300 ease-out ${menuOpen?"translate-x-0":"translate-x-full"}`}><nav className="min-h-full bg-white flex flex-col px-6 pt-8 pb-10 gap-1">{NAV_LINKS.map(l=><Link key={l.href} href={l.href} onClick={()=>setMenuOpen(false)} className="text-navy text-xl font-medium py-4 border-b border-mist">{lang==="id"?l.id:l.en}</Link>)}<Button href="/rfq" onClick={()=>setMenuOpen(false)} className="mt-8 w-full">{cta}</Button></nav></div>
 </header>
}
