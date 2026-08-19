import type { Metadata } from "next";
import "./globals.css";
const SITE_URL="https://gcnusantara.com";
// Set NEXT_PUBLIC_SITE_INDEXABLE=false in env vars for any staging/preview
// deployment (e.g. a temporary Vercel URL) so search engines don't index it
// as a duplicate of the real domain. Defaults to indexable (true) for
// normal production hosting. See .env.example.
const INDEXABLE=process.env.NEXT_PUBLIC_SITE_INDEXABLE!=="false";
const SITE_NAME="GCN | Gega Cahaya Nusantara";
const SITE_TITLE="GCN | Construction, Procurement & Supply Solutions";
const SITE_DESCRIPTION="PT Gega Cahaya Nusantara — Supply, Trading & Construction for project, industrial, healthcare, aviation and infrastructure requirements.";
export const metadata:Metadata={metadataBase:new URL(SITE_URL),title:{default:SITE_TITLE,template:`%s | ${SITE_NAME}`},description:SITE_DESCRIPTION,keywords:["Supply Indonesia","Trading Indonesia","Construction Indonesia","building materials","asphalt","machinery","chemical industrial","medical equipment","aviation supply"],openGraph:{type:"website",locale:"en_ID",url:SITE_URL,siteName:SITE_NAME,title:SITE_TITLE,description:SITE_DESCRIPTION,images:[{url:`${SITE_URL}/og-image.png`,width:1200,height:630,alt:SITE_TITLE}]},twitter:{card:"summary_large_image",title:SITE_TITLE,description:SITE_DESCRIPTION,images:[`${SITE_URL}/og-image.png`]},robots:{index:INDEXABLE,follow:INDEXABLE},icons:{icon:"/icon.png",shortcut:"/favicon.ico",apple:"/icon.png"}};
const organizationJsonLd={"@context":"https://schema.org","@type":"Organization",name:"PT Gega Cahaya Nusantara",alternateName:"GCN",url:SITE_URL,email:"sales@gcnusantara.com",address:{"@type":"PostalAddress",streetAddress:"Kawasan Pergudangan dan Industri PKT Bitung, Blok A6–A7",addressLocality:"Tangerang",addressRegion:"Banten",addressCountry:"ID"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><head><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organizationJsonLd)}}/></head><body>{children}</body></html>}
