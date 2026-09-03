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

function parseRgb(value:string){
 const match=value.match(/rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,/\s]+([\d.]+))?\)/i);
 if(!match)return null;
 return {r:Number(match[1]),g:Number(match[2]),b:Number(match[3]),a:match[4]===undefined?1:Number(match[4])};
}

function isLightColor(r:number,g:number,b:number){
 const linear=[r,g,b].map(v=>{const c=v/255;return c<=0.03928?c/12.92:Math.pow((c+0.055)/1.055,2.4)});
 return 0.2126*linear[0]+0.7152*linear[1]+0.0722*linear[2]>0.48;
}

export function Navbar(){
 const[menuOpen,setMenuOpen]=useState(false);
 const[openDropdown,setOpenDropdown]=useState<DesktopMenu>(null);
 const[lightSurface,setLightSurface]=useState(false);
 const navRef=useRef<HTMLElement|null>(null);
 const{lang}=useLanguage();
 const pathname=usePathname();
 const label=(en:string,id:string)=>lang==="id"?id:en;

 useEffect(()=>{
  setOpenDropdown(null);
  setMenuOpen(false);
 },[pathname]);

 useEffect(()=>{
  if(!menuOpen)return;
  document.body.style.overflow="hidden";
  return()=>{document.body.style.overflow=""};
 },[menuOpen]);

 useEffect(()=>{
  const closeMenus=()=>setOpenDropdown(null);
  const onPointerDown=(event:PointerEvent)=>{
   const target=event.target as Node|null;
   if(target&&navRef.current&&!navRef.current.contains(target))closeMenus();
  };
  const onKey=(event:KeyboardEvent)=>{
   if(event.key==="Escape"){
    setOpenDropdown(null);
    setMenuOpen(false);
   }
  };
  window.addEventListener("scroll",closeMenus,{passive:true});
  document.addEventListener("pointerdown",onPointerDown);
  window.addEventListener("keydown",onKey);
  return()=>{
   window.removeEventListener("scroll",closeMenus);
   document.removeEventListener("pointerdown",onPointerDown);
   window.removeEventListener("keydown",onKey);
  };
 },[]);

 useEffect(()=>{
  let raf=0;
  const detectSurface=()=>{
   raf=0;
   const headerHeight=window.innerWidth>=768?80:72;
   const y=headerHeight+4;
   let nextLight=false;
   const sections=Array.from(document.querySelectorAll("main section"));
   const activeSection=sections.find(section=>{
    const rect=section.getBoundingClientRect();
    return rect.top<=y&&rect.bottom>y;
   });
   if(activeSection){
    let node:Element|null=activeSection;
    while(node&&node!==document.documentElement){
     const rgb=parseRgb(window.getComputedStyle(node).backgroundColor);
     if(rgb&&rgb.a>0.12){nextLight=isLightColor(rgb.r,rgb.g,rgb.b);break;}
     node=node.parentElement;
    }
   }else{
    const stack=document.elementsFromPoint(12,Math.min(window.innerHeight-2,y));
    outer:for(const el of stack){
     if(el.closest("header"))continue;
     let node:Element|null=el;
     while(node&&node!==document.documentElement){
      const rgb=parseRgb(window.getComputedStyle(node).backgroundColor);
      if(rgb&&rgb.a>0.12){nextLight=isLightColor(rgb.r,rgb.g,rgb.b);break outer;}
      node=node.parentElement;
     }
    }
   }
   setLightSurface(nextLight);
  };
  const requestDetect=()=>{if(!raf)raf=window.requestAnimationFrame(detectSurface)};
  requestDetect();
  window.addEventListener("scroll",requestDetect,{passive:true});
  window.addEventListener("resize",requestDetect,{passive:true});
  const delayed=window.setTimeout(requestDetect,120);
  return()=>{
   if(raf)window.cancelAnimationFrame(raf);
   window.clearTimeout(delayed);
   window.removeEventListener("scroll",requestDetect);
   window.removeEventListener("resize",requestDetect);
  };
 },[pathname]);

 const headerTheme=lightSurface
  ?"border-navy/10 bg-white/[.97] text-navy shadow-[0_10px_30px_rgba(4,24,39,.09)]"
  :"border-white/10 bg-[#061f33]/[.97] text-white shadow-[0_10px_32px_rgba(0,0,0,.18)]";
 const primaryText=lightSurface?"text-navy":"text-white";
 const brandBorder=lightSurface?"border-navy/20":"border-white/20";
 const mobileButton=lightSurface?"text-navy":"text-white";
 const dropdownClass="absolute left-1/2 top-[62px] z-[80] -translate-x-1/2 rounded-xl border border-white/15 bg-[#071f33] p-2 text-white shadow-[0_22px_60px_rgba(0,0,0,.32)]";
 const dropdownLink="block rounded-lg px-4 py-3 text-white/80 transition hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white focus:outline-none";

 return <header ref={navRef} className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-[background-color,color,border-color,box-shadow] duration-300 ${headerTheme}`}>
  <Container className="flex h-[72px] items-center justify-between gap-3 md:h-20">
   <Link href="/" onFocus={()=>setOpenDropdown(null)} className="flex min-w-0 items-center gap-2.5" aria-label="GCN - PT Gega Cahaya Nusantara">
    <img src={PRIMARY_LOGO_TRANSPARENT_1024} alt="GCN" width={48} height={48} className="h-10 w-10 shrink-0 object-contain md:h-12 md:w-12"/>
    <div className={`hidden min-[360px]:block min-w-0 border-l pl-2.5 leading-[1.08] transition-colors duration-300 md:pl-3 ${brandBorder}`}>
     <div className={`whitespace-nowrap text-[7.5px] font-bold tracking-[.05em] transition-colors duration-300 md:text-[9px] ${primaryText}`}>PT GEGA CAHAYA</div>
     <div className={`whitespace-nowrap text-[7.5px] font-bold tracking-[.05em] transition-colors duration-300 md:text-[9px] ${primaryText}`}>NUSANTARA</div>
     <div className="mt-1 whitespace-nowrap text-[5.5px] font-semibold uppercase tracking-[.13em] text-cyan md:text-[7px]">Your Trusted Business Partner</div>
    </div>
   </Link>

   <nav className={`hidden xl:flex items-center gap-6 text-[13px] font-medium transition-colors duration-300 ${primaryText}`}>
    <Link href="/" onFocus={()=>setOpenDropdown(null)} className="transition hover:text-cyan">{label("Home","Beranda")}</Link>

    <div className="relative" onMouseEnter={()=>setOpenDropdown("company")} onMouseLeave={()=>setOpenDropdown(null)}>
     <button type="button" onClick={()=>setOpenDropdown(v=>v==="company"?null:"company")} onFocus={()=>setOpenDropdown("company")} className="flex items-center gap-1.5 py-7 transition hover:text-cyan" aria-haspopup="menu" aria-expanded={openDropdown==="company"}>{label("Company","Perusahaan")}<ChevronDown size={14} className={`transition-transform ${openDropdown==="company"?"rotate-180":""}`}/></button>
     {openDropdown==="company"&&<div role="menu" className={`${dropdownClass} w-56`}><Link href="/company" className={dropdownLink}>{label("About GEGA","Tentang GEGA")}</Link><Link href="/company#vision" className={dropdownLink}>{label("Vision & Mission","Visi & Misi")}</Link><Link href="/company#sinergi" className={dropdownLink}>SINERGI</Link></div>}
    </div>

    <div className="relative" onMouseEnter={()=>setOpenDropdown("capabilities")} onMouseLeave={()=>setOpenDropdown(null)}>
     <button type="button" onClick={()=>setOpenDropdown(v=>v==="capabilities"?null:"capabilities")} onFocus={()=>setOpenDropdown("capabilities")} className="flex items-center gap-1.5 py-7 transition hover:text-cyan" aria-haspopup="menu" aria-expanded={openDropdown==="capabilities"}>{label("Capabilities","Kapabilitas")}<ChevronDown size={14} className={`transition-transform ${openDropdown==="capabilities"?"rotate-180":""}`}/></button>
     {openDropdown==="capabilities"&&<div role="menu" className={`${dropdownClass} w-72`}><Link href="/capabilities" className="mb-1 block rounded-lg px-4 py-3 font-semibold text-cyan transition hover:bg-white/10">{label("View All Capabilities","Lihat Semua Kapabilitas")}</Link>{CAPABILITIES.map(x=><Link key={x.href} href={x.href} className={dropdownLink}>{label(x.en,x.id)}</Link>)}</div>}
    </div>

    <Link href="/partnership" onFocus={()=>setOpenDropdown(null)} className="transition hover:text-cyan">{label("Partnership","Kemitraan")}</Link>
   </nav>

   <div className="hidden xl:flex items-center gap-3" onFocus={()=>setOpenDropdown(null)}><LanguageToggle light={lightSurface}/><Link href="/rfq" className="rounded-md bg-cyan px-5 py-3 text-[12px] font-bold tracking-[.04em] text-[#061f33] transition hover:bg-white hover:shadow-md">{label("Submit RFQ","Ajukan RFQ")}</Link></div>
   <div className="xl:hidden flex shrink-0 items-center gap-1.5"><LanguageToggle light={lightSurface}/><button onClick={()=>setMenuOpen(v=>!v)} className={`flex h-10 w-10 items-center justify-center transition-colors ${mobileButton}`} aria-label={menuOpen?label("Close menu","Tutup menu"):label("Open menu","Buka menu")} aria-expanded={menuOpen}>{menuOpen?<X size={24}/>:<MenuIcon size={24}/>}</button></div>
  </Container>

  <div className={`xl:hidden fixed inset-x-0 top-[72px] md:top-20 bottom-0 z-[60] overflow-y-auto bg-[#061f33] text-white transition-transform duration-300 ${menuOpen?"translate-x-0":"translate-x-full"}`}><nav className="flex min-h-full flex-col px-6 py-7"><Link href="/" onClick={()=>setMenuOpen(false)} className="border-b border-white/10 py-4 text-lg">{label("Home","Beranda")}</Link><Link href="/company" onClick={()=>setMenuOpen(false)} className="border-b border-white/10 py-4 text-lg">{label("Company","Perusahaan")}</Link><div className="border-b border-white/10 py-4"><div className="mb-3 text-lg">{label("Capabilities","Kapabilitas")}</div><div className="ml-3 flex flex-col gap-1">{CAPABILITIES.map(x=><Link key={x.href} href={x.href} onClick={()=>setMenuOpen(false)} className="py-2.5 text-sm text-white/70">{label(x.en,x.id)}</Link>)}</div></div><Link href="/partnership" onClick={()=>setMenuOpen(false)} className="border-b border-white/10 py-4 text-lg">{label("Partnership","Kemitraan")}</Link><Link href="/rfq" onClick={()=>setMenuOpen(false)} className="mt-8 rounded-md bg-cyan px-5 py-4 text-center font-bold text-[#061f33]">{label("Submit RFQ","Ajukan RFQ")}</Link></nav></div>
 </header>
}
