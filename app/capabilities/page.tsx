import Image from "next/image";import {Navbar} from "@/components/layout/Navbar";import {Footer} from "@/components/layout/Footer";import {Container} from "@/components/ui/Container";import {PHOTOS} from "@/lib/data/photos";import {T} from "@/components/i18n/T";
const GROUPS=[
 {titleEn:"Supply",titleId:"Supply",image:PHOTOS.materials,items:[
   {en:"Building and construction materials",id:"Material bangunan dan konstruksi"},
   {en:"Machinery and agricultural equipment",id:"Mesin dan alat pertanian"},
   {en:"Chemical and industrial goods",id:"Barang kimia dan industri"},
   {en:"Medical and laboratory equipment for humans",id:"Peralatan medis dan laboratorium untuk manusia"},
   {en:"Aircraft, aircraft parts and aviation equipment",id:"Pesawat, suku cadang pesawat dan peralatan penerbangan"},
   {en:"Non-aircraft aviation and airport operational requirements",id:"Kebutuhan operasional penerbangan dan bandara non-pesawat"},
 ]},
 {titleEn:"Trading",titleId:"Trading",image:PHOTOS.machinery,items:[
   {en:"Wholesale building materials",id:"Perdagangan grosir material bangunan"},
   {en:"Wholesale machinery and equipment",id:"Perdagangan grosir mesin dan peralatan"},
   {en:"Wholesale chemical and industrial goods",id:"Perdagangan grosir barang kimia dan industri"},
   {en:"Wholesale medical and laboratory equipment",id:"Perdagangan grosir peralatan medis dan laboratorium"},
   {en:"Wholesale air transportation equipment, parts and accessories",id:"Perdagangan grosir peralatan, suku cadang dan aksesori transportasi udara"},
   {en:"Client-specific commercial sourcing",id:"Pengadaan komersial sesuai kebutuhan klien"},
 ]},
 {titleEn:"Construction",titleId:"Construction",image:PHOTOS.construction,items:[
   {en:"Konstruksi Bangunan Sipil Jalan",id:"Konstruksi Bangunan Sipil Jalan"},
   {en:"Konstruksi Khusus Lainnya YTDL",id:"Konstruksi Khusus Lainnya YTDL"},
   {en:"Konstruksi Gedung Lainnya",id:"Konstruksi Gedung Lainnya"},
   {en:"Instalasi Konstruksi Lainnya",id:"Instalasi Konstruksi Lainnya"},
   {en:"Road / asphalt works",id:"Pekerjaan jalan / aspal"},
   {en:"Building renovation, waterproofing and finishing within applicable scope",id:"Renovasi bangunan, waterproofing dan finishing sesuai ruang lingkup yang berlaku"},
 ]},
];
export const metadata={title:"Capabilities",description:"GCN Supply, Trading & Construction capabilities."};
export default function CapabilitiesPage(){return <main><Navbar/><section className="pt-40 pb-24 bg-deep-blue"><Container><span className="eyebrow text-electric"><T en="Capabilities" id="Kapabilitas"/></span><h1 className="text-white text-4xl md:text-h1 max-w-4xl mt-6"><T en="Three core business pillars." id="Tiga pilar utama bisnis."/></h1><p className="text-white/70 text-body mt-6 max-w-2xl"><T en="Our website is organized around the company's operating structure: Supply, Trading & Construction." id="Website kami disusun berdasarkan struktur operasional perusahaan: Supply, Trading & Konstruksi."/></p></Container></section><section className="py-20 bg-white"><Container className="space-y-16">{GROUPS.map((g,i)=><article key={g.titleEn} className="grid lg:grid-cols-12 gap-10 items-start border-b border-mist pb-16 last:border-0"><div className="lg:col-span-4 relative h-64"><Image src={g.image.src} alt={g.image.alt} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover"/><span className="absolute top-4 left-4 bg-white px-3 py-2 text-[11px] uppercase tracking-widest text-deep-blue">{String(i+1).padStart(2,"0")}</span></div><div className="lg:col-span-8"><h2 className="text-h2 text-3xl"><T en={g.titleEn} id={g.titleId}/></h2><ul className="grid md:grid-cols-2 gap-x-10 gap-y-3 mt-8">{g.items.map(x=><li key={x.en} className="border-l-2 border-pale-blue pl-4 text-[15px] text-navy/75 leading-relaxed"><T en={x.en} id={x.id}/></li>)}</ul></div></article>)}</Container></section><Footer/></main>}
