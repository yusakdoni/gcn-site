import type {Metadata} from "next";
import {CapabilityPage} from "@/components/capability/CapabilityPage";
import {CAPABILITY_DATA} from "@/lib/data/capabilities-v2";
export const metadata:Metadata={title:"General Supply & Trading Indonesia",description:"B2B general supply and trading based on customer specification, quantity, commercial terms and delivery requirements.",alternates:{canonical:"https://gcnusantara.com/general-supply-trading"}};
export default function Page(){return <CapabilityPage data={CAPABILITY_DATA["general-supply"]}/>}
