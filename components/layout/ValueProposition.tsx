import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { T } from "@/components/i18n/T";
const PILLARS=[
  {n:"01",titleEn:"Execution",titleId:"Eksekusi",bodyEn:"Practical support from requirement definition through sourcing, coordination, and delivery.",bodyId:"Dukungan praktis mulai dari penentuan kebutuhan hingga pencarian sumber, koordinasi, dan pengiriman."},
  {n:"02",titleEn:"Specification",titleId:"Spesifikasi",bodyEn:"Attention to technical scope, quantities, materials, equipment, and project requirements.",bodyId:"Perhatian terhadap ruang lingkup teknis, kuantitas, material, peralatan, dan kebutuhan proyek."},
  {n:"03",titleEn:"Coordination",titleId:"Koordinasi",bodyEn:"One working layer across clients, suppliers, contractors, logistics, and site requirements.",bodyId:"Satu lapis kerja yang menghubungkan klien, supplier, kontraktor, logistik, dan kebutuhan lokasi."},
  {n:"04",titleEn:"Reliability",titleId:"Keandalan",bodyEn:"Clear communication, responsive follow-up, and documentation across each requirement.",bodyId:"Komunikasi yang jelas, tindak lanjut yang responsif, dan dokumentasi di setiap kebutuhan."},
];
export function ValueProposition(){return <section className="py-24 md:py-32 bg-white"><Container><SectionHeader eyebrow={<T en="Why GCN" id="Mengapa GCN"/>} title={<T en="Built for requirements that need more than a supplier list" id="Dibangun untuk kebutuhan yang lebih dari sekadar daftar supplier"/>}/><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-mist mt-16">{PILLARS.map(p=><div key={p.n} className="bg-white p-8 flex flex-col gap-4"><span className="text-caption text-electric tracking-widest">{p.n}</span><h3 className="text-h3 text-xl"><T en={p.titleEn} id={p.titleId}/></h3><p className="text-body text-[15px] text-navy/70"><T en={p.bodyEn} id={p.bodyId}/></p></div>)}</div></Container></section>}
