import { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/data/projects";
import { SERVICES } from "@/lib/data/services";
const SITE_URL="https://gcnusantara.com";
export default function sitemap():MetadataRoute.Sitemap{
 const staticRoutes=["","/services","/our-work","/client-impact","/company","/work-with-us","/rfq","/privacy-policy"].map(route=>({url:`${SITE_URL}${route}`,lastModified:new Date(),changeFrequency:"monthly" as const,priority:route===""?1:0.7}));
 const serviceRoutes=SERVICES.map(s=>({url:`${SITE_URL}/services/${s.slug}`,lastModified:new Date(),changeFrequency:"monthly" as const,priority:0.6}));
 const projectRoutes=PROJECTS.map(p=>({url:`${SITE_URL}/our-work/${p.slug}`,lastModified:new Date(),changeFrequency:"monthly" as const,priority:0.6}));
 return [...staticRoutes,...serviceRoutes,...projectRoutes];
}
