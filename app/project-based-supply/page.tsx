import type {Metadata} from "next";
import {CapabilityPage} from "@/components/capability/CapabilityPage";
import {CAPABILITY_DATA} from "@/lib/data/capabilities-v2";
export const metadata:Metadata={title:"Project-Based Supply & Procurement",description:"Project-based sourcing, costing, procurement, delivery and documentation coordinated around defined customer requirements.",alternates:{canonical:"https://gcnusantara.com/project-based-supply"}};
export default function Page(){return <CapabilityPage data={CAPABILITY_DATA["project-supply"]}/>}
