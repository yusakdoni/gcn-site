import type { Metadata } from "next";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";
import {LanguageProvider} from "@/lib/i18n/LanguageContext";
const SITE_URL="https://gcnusantara.com";
// Set NEXT_PUBLIC_SITE_INDEXABLE=false in env vars for any staging/preview
// deployment (e.g. a temporary Vercel URL) so search engines don't index it
// as a duplicate of the real domain. Defaults to indexable (true) for
// normal production hosting. See .env.example.
const INDEXABLE=process.env.NEXT_PUBLIC_SITE_INDEXABLE!=="false";
const SITE_NAME="GCN | Gega Cahaya Nusantara";
const SITE_TITLE="GCN | Construction, Procurement & Supply Solutions";
const SITE_DESCRIPTION="PT Gega Cahaya Nusantara — Supply, Trading & Construction for project, industrial, healthcare, aviation and infrastructure requirements.";
export const metadata:Metadata={metadataBase:new URL(SITE_URL),title:{default:SITE_TITLE,template:`%s | ${SITE_NAME}`},description:SITE_DESCRIPTION,keywords:["Supply Indonesia","Trading Indonesia","Construction Indonesia","building materials","asphalt","machinery","chemical industrial","medical equipment","aviation supply","PT Gega Cahaya Nusantara","Gega Cahaya Nusantara"],alternates:{canonical:SITE_URL},openGraph:{type:"website",locale:"en_ID",url:SITE_URL,siteName:SITE_NAME,title:SITE_TITLE,description:SITE_DESCRIPTION,images:[{url:`${SITE_URL}/og-image.png`,width:1200,height:630,alt:SITE_TITLE}]},twitter:{card:"summary_large_image",title:SITE_TITLE,description:SITE_DESCRIPTION,images:[`${SITE_URL}/og-image.png`]},robots:{index:INDEXABLE,follow:INDEXABLE,googleBot:{index:INDEXABLE,follow:INDEXABLE}},icons:{icon:"/icon.png",shortcut:"/favicon.ico",apple:"/icon.png"},
  // Ganti nilai ini dengan meta tag verifikasi asli dari Google Search
  // Console (Settings > Ownership verification > HTML tag) supaya domain
  // bisa diverifikasi dan di-index secara resmi. Lihat catatan SEO di
  // changelog v8.1.4 untuk langkah lengkapnya.
  // verification:{google:"GANTI_DENGAN_KODE_VERIFIKASI_GSC"},
};
const organizationJsonLd={"@context":"https://schema.org","@type":"Organization","@id":`${SITE_URL}/#organization`,name:"PT Gega Cahaya Nusantara",legalName:"PT Gega Cahaya Nusantara",alternateName:["GCN","Gega Cahaya Nusantara","GCN Indonesia"],url:SITE_URL,logo:`${SITE_URL}/icon.png`,image:`${SITE_URL}/og-image.png`,description:SITE_DESCRIPTION,email:"sales@gcnusantara.com",address:{"@type":"PostalAddress",streetAddress:"Kawasan Pergudangan dan Industri PKT Bitung, Blok A6–A7",addressLocality:"Tangerang",addressRegion:"Banten",addressCountry:"ID"}};
const websiteJsonLd={"@context":"https://schema.org","@type":"WebSite","@id":`${SITE_URL}/#website`,url:SITE_URL,name:SITE_NAME,publisher:{"@id":`${SITE_URL}/#organization`}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><head><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organizationJsonLd)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(websiteJsonLd)}}/></head><body><LanguageProvider>{children}<ChatWidget /></LanguageProvider></body></html>}
