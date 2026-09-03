"use client";
import {useEffect,useRef,useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
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
type DesktopMenu="company"|"capabilities"|null;

export function Navbar(){
 const[menuOpen,setMenuOpen]=useState(false);
 const[openDropdown,setOpenDropdown]=useState<DesktopMenu>(null);
 const navRef=useRef<HTMLElement|null>(null);
 const{lang}=useLanguage();
 const pathname=usePathname();
 const label=(en:string,id:string)=>lang==="id"?id:en;
 useEffect(()=>{setOpenDropdown(null);setMenuOpen(false)},[pathname]);
 useEffect(()=>{if(!menuOpen)return;document.body.style.overflow="hidden";return()=>{document.body.style.overflow=""}},[menuOpen]);
 useEffect(()=>{const onPointerDown=(event:PointerEvent)=>{const target=event.target as Node|null;if(target&&navRef.current&&!navRef.current.contains(target))setOpenDropdown(null)};const onKey=(event:KeyboardEvent)=>{if(event.key==="Escape"){setOpenDropdown(null);setMenuOpen(false)}};document.addEventListener("pointerdown",onPointerDown);window.addEventListener("keydown",onKey);return()=>{document.removeEventListener("pointerdown",onPointerDown);window.removeEventListener("keydown",onKey)}},[]);
 const dropdownClass="absolute left-1/2 top-[62px] z-[80] -translate-x-1/2 rounded-xl border border-white/15 bg-[#071f33] p-2 text-white shadow-[0_22px_60px_rgba(0,0,0,.32)]";
 const dropdownLink="block rounded-lg px-4 py-3 text-white/80 transition hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white focus:outline-none";
 return <header ref={navRef} className="fixed inset-x-0 top-0 z-50 border-b border-navy/10 bg-white/[.98] text-navy shadow-[0_8px_26px_rgba(4,24,39,.08)] backdrop-blur-xl">
  <Container className="flex h-[72px] items-center justify-between gap-2 md:h-20">
   <Link href="/" onFocus={()=>setOpenDropdown(null)} className="flex min-w-0 items-center gap-2.5" aria-label="GCN - PT Gega Cahaya Nusantara">
    <img src={PRIMARY_LOGO_TRANSPARENT_1024} alt="GCN" width={48} height={48} className="h-10 w-10 shrink-0 object-contain md:h-12 md:w-12"/>
    <div className="hidden min-[360px]:block min-w-0 border-l border-navy/20 pl-2.5 leading-[1.08] md:pl-3">
     <div className="whitespace-nowrap text-[7.5px] font-bold tracking-[.05em] text-navy md:text-[9px]">PT GEGA CAHAYA</div>
     <div className="whitespace-nowrap text-[7.5px] font-bold tracking-[.05em] text-navy md:text-[9px]">NUSANTARA</div>
     <div className="mt-1 whitespace-nowrap text-[5.5px] font-semibold uppercase tracking-[.13em] text-corporate md:text-[7px]">Your Trusted Business Partner</div>
    </div>
   </Link>
   <nav className="hidden xl:flex items-center gap-6 text-[13px] font-medium text-navy">
    <Link href="/" onFocus={()=>setOpenDropdown(null)} className="transition hover:text-corporate">{label("Home","Beranda")}</Link>
    <div className="relative" onMouseEnter={()=>setOpenDropdown("company")} onMouseLeave={()=>setOpenDropdown(null)}><button type="button" onClick={()=>setOpenDropdown(v=>v==="company"?null:"company")} onFocus={()=>setOpenDropdown("company")} className="flex items-center gap-1.5 py-7 transition hover:text-corporate" aria-haspopup="menu" aria-expanded={openDropdown==="company"}>{label("Company","Perusahaan")}<ChevronDown size={14} className={`transition-transform ${openDropdown==="company"?"rotate-180":""}`}/></button>{openDropdown==="company"&&<div role="menu" className={`${dropdownClass} w-56`}><Link href="/company" className={dropdownLink}>{label("About GEGA","Tentang GEGA")}</Link><Link href="/company#vision" className={dropdownLink}>{label("Vision & Mission","Visi & Misi")}</Link><Link href="/company#sinergi" className={dropdownLink}>SINERGI</Link></div>}</div>
    <div className="relative" onMouseEnter={()=>setOpenDropdown("capabilities")} onMouseLeave={()=>setOpenDropdown(null)}><button type="button" onClick={()=>setOpenDropdown(v=>v==="capabilities"?null:"capabilities")} onFocus={()=>setOpenDropdown("capabilities")} className="flex items-center gap-1.5 py-7 transition hover:text-corporate" aria-haspopup="menu" aria-expanded={openDropdown==="capabilities"}>{label("Capabilities","Kapabilitas")}<ChevronDown size={14} className={`transition-transform ${openDropdown==="capabilities"?"rotate-180":""}`}/></button>{openDropdown==="capabilities"&&<div role="menu" className={`${dropdownClass} w-72`}><Link href="/capabilities" className="mb-1 block rounded-lg px-4 py-3 font-semibold text-cyan transition hover:bg-white/10">{label("View All Capabilities","Lihat Semua Kapabilitas")}</Link>{CAPABILITIES.map(x=><Link key={x.href} href={x.href} className={dropdownLink}>{label(x.en,x.id)}</Link>)}</div>}</div>
    <Link href="/partnership" onFocus={()=>setOpenDropdown(null)} className="transition hover:text-corporate">{label("Partnership","Kemitraan")}</Link>
   </nav>
   <div className="hidden xl:flex items-center gap-3" onFocus={()=>setOpenDropdown(null)}><LanguageToggle light/><Link href="/rfq" className="rounded-md bg-cyan px-5 py-3 text-[12px] font-bold tracking-[.04em] text-[#061f33] transition hover:bg-corporate hover:text-white">{label("Submit RFQ","Ajukan RFQ")}</Link></div>
   <div className="xl:hidden flex shrink-0 items-center gap-1"><LanguageToggle light/><button onClick={()=>setMenuOpen(v=>!v)} className="flex h-10 w-10 shrink-0 items-center justify-center text-navy" aria-label={menuOpen?label("Close menu","Tutup menu"):label("Open menu","Buka menu")} aria-expanded={menuOpen}>{menuOpen?<X size={24}/>:<MenuIcon size={24}/>}</button></div>
  </Container>
  <div className={`xl:hidden absolute inset-x-0 top-full z-[60] h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain bg-[#061f33] text-white shadow-[0_24px_60px_rgba(4,24,39,.28)] transition-transform duration-300 md:h-[calc(100dvh-80px)] ${menuOpen?"translate-x-0":"translate-x-full"}`} aria-hidden={!menuOpen}><nav className="flex min-h-full flex-col px-6 py-7"><Link href="/" onClick={()=>setMenuOpen(false)} className="border-b border-white/10 py-4 text-lg">{label("Home","Beranda")}</Link><Link href="/company" onClick={()=>setMenuOpen(false)} className="border-b border-white/10 py-4 text-lg">{label("Company","Perusahaan")}</Link><div className="border-b border-white/10 py-4"><div className="mb-3 text-lg">{label("Capabilities","Kapabilitas")}</div><div className="ml-3 flex flex-col gap-1">{CAPABILITIES.map(x=><Link key={x.href} href={x.href} onClick={()=>setMenuOpen(false)} className="py-2.5 text-sm text-white/70">{label(x.en,x.id)}</Link>)}</div></div><Link href="/partnership" onClick={()=>setMenuOpen(false)} className="border-b border-white/10 py-4 text-lg">{label("Partnership","Kemitraan")}</Link><Link href="/rfq" onClick={()=>setMenuOpen(false)} className="mt-8 rounded-md bg-cyan px-5 py-4 text-center font-bold text-[#061f33]">{label("Submit RFQ","Ajukan RFQ")}</Link></nav></div>
 </header>
}
