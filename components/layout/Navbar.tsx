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
 const[solid,setSolid]=useState(false);const[menuOpen,setMenuOpen]=useState(false);
 const{lang}=useLanguage();
 useEffect(()=>{const onScroll=()=>setSolid(window.scrollY>40);window.addEventListener("scroll",onScroll,{passive:true});return()=>window.removeEventListener("scroll",onScroll)},[]);
 useEffect(()=>{if(!menuOpen)return;document.body.style.overflow="hidden";const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape")setMenuOpen(false)};window.addEventListener("keydown",onKey);return()=>{document.body.style.overflow="";window.removeEventListener("keydown",onKey)}},[menuOpen]);
 const light=solid||menuOpen;
 const cta=lang==="id"?"Ajukan Penawaran":"Request a Quotation";
 return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${light?"bg-white border-b border-mist shadow-sm":"bg-transparent"}`}>
  <Container className="flex items-center justify-between h-20">
   <Link href="/" className={`text-h3 text-lg md:text-xl tracking-tight ${light?"text-navy":"text-white"}`}>GCN <span className="text-electric"></span></Link>
   <nav className="hidden xl:flex items-center gap-4">{NAV_LINKS.map(l=><Link key={l.href} href={l.href} className={`text-nav relative group whitespace-nowrap ${light?"text-navy":"text-white"}`}>{lang==="id"?l.id:l.en}<span className="absolute -bottom-1 left-0 h-px w-0 bg-electric transition-all duration-300 group-hover:w-full"/></Link>)}</nav>
   <div className="hidden xl:flex items-center gap-3">
    <LanguageToggle light={light}/>
    <Button href="/rfq" variant={light?"primary":"secondary"} className={light?"":"border-white text-white hover:bg-white hover:text-navy"}>{cta}</Button>
   </div>
   <div className="xl:hidden flex items-center gap-2">
    <LanguageToggle light={light}/>
    <button onClick={()=>setMenuOpen(v=>!v)} className={`flex items-center justify-center w-11 h-11 -mr-2 ${light?"text-navy":"text-white"}`} aria-label={menuOpen?(lang==="id"?"Tutup menu":"Close menu"):(lang==="id"?"Buka menu":"Open menu")} aria-expanded={menuOpen}>{menuOpen?<X size={24}/>:<MenuIcon size={24}/>}</button>
   </div>
  </Container>
  <div className={`xl:hidden fixed inset-x-0 top-20 bottom-0 z-[60] overflow-y-auto bg-white shadow-xl transition-transform duration-300 ease-out ${menuOpen?"translate-x-0":"translate-x-full"}`}>
   <nav className="min-h-full bg-white flex flex-col px-6 pt-8 pb-10 gap-1">{NAV_LINKS.map(l=><Link key={l.href} href={l.href} onClick={()=>setMenuOpen(false)} className="text-navy text-xl font-medium py-4 border-b border-mist">{lang==="id"?l.id:l.en}</Link>)}<Button href="/rfq" onClick={()=>setMenuOpen(false)} className="mt-8 w-full">{cta}</Button></nav>
  </div>
 </header>
}
