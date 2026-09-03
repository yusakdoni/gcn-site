import {MetadataRoute} from "next";
const SITE_URL="https://www.gcnusantara.com";
export default function sitemap():MetadataRoute.Sitemap{const routes=[
 {path:"",priority:1},
 {path:"/aviation-supply",priority:.95},
 {path:"/procurement-sourcing",priority:.9},
 {path:"/general-supply-trading",priority:.8},
 {path:"/industrial-supply",priority:.8},
 {path:"/project-based-supply",priority:.8},
 {path:"/construction",priority:.65},
 {path:"/capabilities",priority:.85},
 {path:"/company",priority:.75},
 {path:"/partnership",priority:.7},
 {path:"/rfq",priority:.9},
 {path:"/privacy-policy",priority:.3},
];return routes.map(r=>({url:`${SITE_URL}${r.path}`,lastModified:new Date(),changeFrequency:"monthly" as const,priority:r.priority}))}
