import type {Metadata} from "next";
import {CapabilityPage} from "@/components/capability/CapabilityPage";
import {CAPABILITY_DATA} from "@/lib/data/capabilities-v2";
export const metadata:Metadata={title:"Industrial Supply Indonesia",description:"Specification-led industrial material, equipment and operational sourcing with commercial and delivery coordination.",alternates:{canonical:"https://www.gcnusantara.com/industrial-supply"}};
export default function Page(){return <CapabilityPage data={CAPABILITY_DATA.industrial}/>}
