import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
const PILLARS=[
  {n:"01",title:"Execution",body:"Practical support from requirement definition through sourcing, coordination, and delivery."},
  {n:"02",title:"Specification",body:"Attention to technical scope, quantities, materials, equipment, and project requirements."},
  {n:"03",title:"Coordination",body:"One working layer across clients, suppliers, contractors, logistics, and site requirements."},
  {n:"04",title:"Reliability",body:"Clear communication, responsive follow-up, and documentation across each requirement."},
];
export function ValueProposition(){return <section className="py-24 md:py-32 bg-white"><Container><SectionHeader eyebrow="Why GCN" title="Built for requirements that need more than a supplier list"/><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-mist mt-16">{PILLARS.map(p=><div key={p.n} className="bg-white p-8 flex flex-col gap-4"><span className="text-caption text-electric tracking-widest">{p.n}</span><h3 className="text-h3 text-xl">{p.title}</h3><p className="text-body text-[15px] text-navy/70">{p.body}</p></div>)}</div></Container></section>}
