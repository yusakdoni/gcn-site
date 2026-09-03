import type {Metadata} from "next";
import {CapabilityPage} from "@/components/capability/CapabilityPage";
import {CAPABILITY_DATA} from "@/lib/data/capabilities-v2";
export const metadata:Metadata={title:"Procurement & Sourcing Indonesia",description:"Structured B2B procurement and sourcing support from requirement review and supplier comparison through procurement, delivery and documentation.",alternates:{canonical:"https://www.gcnusantara.com/procurement-sourcing"}};
export default function Page(){return <CapabilityPage data={CAPABILITY_DATA.procurement}/>}
