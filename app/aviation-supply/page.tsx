import type {Metadata} from "next";
import {CapabilityPage} from "@/components/capability/CapabilityPage";
import {CAPABILITY_DATA} from "@/lib/data/capabilities-v2";
export const metadata:Metadata={title:"Aviation Supply & Aircraft Parts Sourcing Indonesia",description:"GCN Aviation Supply supports RFQ-based aircraft parts, consumables and aviation procurement sourcing with structured documentation and supply coordination.",alternates:{canonical:"https://gcnusantara.com/aviation-supply"}};
export default function Page(){return <CapabilityPage data={CAPABILITY_DATA.aviation} aviation/>}
