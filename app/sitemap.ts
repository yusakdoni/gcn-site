import { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/data/projects";
const SITE_URL="https://gcnusantara.com";
export default function sitemap():MetadataRoute.Sitemap{
 const staticRoutes=["","/about","/projects","/contact","/rfq","/privacy-policy"].map(route=>({url:`${SITE_URL}${route}`,lastModified:new Date(),changeFrequency:"monthly" as const,priority:route===""?1:0.7}));
 const projectRoutes=PROJECTS.map(p=>({url:`${SITE_URL}/projects/${p.slug}`,lastModified:new Date(),changeFrequency:"monthly" as const,priority:0.6}));
 return [...staticRoutes,...projectRoutes];
}
