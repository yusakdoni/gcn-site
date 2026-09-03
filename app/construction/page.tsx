import type {Metadata} from "next";
import {CapabilityPage} from "@/components/capability/CapabilityPage";
import {CAPABILITY_DATA} from "@/lib/data/capabilities-v2";
export const metadata:Metadata={title:"Construction & Project Execution",description:"Construction and project execution coordination within verified company scope and applicable project requirements.",alternates:{canonical:"https://www.gcnusantara.com/construction"}};
export default function Page(){return <CapabilityPage data={CAPABILITY_DATA.construction}/>}
