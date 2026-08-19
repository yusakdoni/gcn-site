import { MetadataRoute } from "next";
import { SERVICES } from "@/lib/data/services";
import { INDUSTRIES } from "@/lib/data/industries";
import { PROJECTS } from "@/lib/data/projects";
const SITE_URL="https://gcnusantara.com";
export default function sitemap():MetadataRoute.Sitemap{
 const staticRoutes=["","/about","/services","/industries","/projects","/capabilities","/insights","/contact","/rfq"].map(route=>({url:`${SITE_URL}${route}`,lastModified:new Date(),changeFrequency:"monthly" as const,priority:route===""?1:0.7}));
 const serviceRoutes=SERVICES.map(s=>({url:`${SITE_URL}/services/${s.slug}`,lastModified:new Date(),changeFrequency:"monthly" as const,priority:0.6}));
 const industryRoutes=INDUSTRIES.map(i=>({url:`${SITE_URL}/industries/${i.slug}`,lastModified:new Date(),changeFrequency:"monthly" as const,priority:0.55}));
 const projectRoutes=PROJECTS.map(p=>({url:`${SITE_URL}/projects/${p.slug}`,lastModified:new Date(),changeFrequency:"monthly" as const,priority:0.55}));
 return [...staticRoutes,...serviceRoutes,...industryRoutes,...projectRoutes];
}
