import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
const STEPS=[
  {n:"01",title:"Understand",body:"Clarify scope, specification, quantity, site conditions, and delivery requirements."},
  {n:"02",title:"Plan",body:"Break the requirement into work packages, materials, suppliers, and execution needs."},
  {n:"03",title:"Source",body:"Identify suitable products, suppliers, contractors, and commercial options."},
  {n:"04",title:"Coordinate",body:"Align procurement, site activities, logistics, documentation, and stakeholders."},
  {n:"05",title:"Close",body:"Support delivery, inspection, handover, and completion documentation."},
];
export function HowWeWork(){return <section className="py-24 md:py-32 bg-white"><Container><SectionHeader eyebrow="Our Process" title="A disciplined path from requirement to delivery" align="center"/><div className="hidden md:grid grid-cols-5 gap-6 mt-16 relative"><div className="absolute top-[13px] left-0 right-0 h-px bg-mist"/>{STEPS.map(s=><div key={s.n} className="relative flex flex-col gap-4"><div className="w-7 h-7 rounded-full bg-deep-blue text-white text-[12px] flex items-center justify-center relative z-10">{s.n.slice(1)}</div><h3 className="text-h3 text-lg">{s.title}</h3><p className="text-[15px] text-navy/70 leading-relaxed">{s.body}</p></div>)}</div><div className="md:hidden flex flex-col mt-12 relative pl-8"><div className="absolute top-2 bottom-2 left-[13px] w-px bg-mist"/>{STEPS.map(s=><div key={s.n} className="relative pb-10 last:pb-0"><div className="absolute -left-8 top-0 w-7 h-7 rounded-full bg-deep-blue text-white text-[12px] flex items-center justify-center">{s.n.slice(1)}</div><h3 className="text-h3 text-lg">{s.title}</h3><p className="text-[15px] text-navy/70 leading-relaxed mt-2">{s.body}</p></div>)}</div></Container></section>}
