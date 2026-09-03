/** @type {import('next').NextConfig} */
const nextConfig={
 images:{formats:["image/avif","image/webp"],remotePatterns:[{protocol:"https",hostname:"images.unsplash.com"}]},
 async redirects(){return[
  {source:"/about",destination:"/company",permanent:true},
  {source:"/projects",destination:"/capabilities",permanent:true},
  {source:"/projects/:slug",destination:"/capabilities",permanent:true},
  {source:"/our-work",destination:"/capabilities",permanent:true},
  {source:"/our-work/:slug",destination:"/capabilities",permanent:true},
  {source:"/client-impact",destination:"/company",permanent:true},
  {source:"/contact",destination:"/rfq",permanent:true},
  {source:"/work-with-us",destination:"/partnership",permanent:true},
  {source:"/services/supply",destination:"/general-supply-trading",permanent:true},
  {source:"/services/trading",destination:"/general-supply-trading",permanent:true},
  {source:"/services/construction",destination:"/construction",permanent:true},
  {source:"/services",destination:"/capabilities",permanent:true},
  {source:"/industries",destination:"/capabilities",permanent:true},
  {source:"/industries/:slug",destination:"/capabilities",permanent:true},
  {source:"/sertifikasi",destination:"/company",permanent:true},
  {source:"/insights",destination:"/",permanent:true},
  {source:"/insights/:slug",destination:"/",permanent:true},
 ]},
 async headers(){return[{source:"/:path*",headers:[
  {key:"X-Content-Type-Options",value:"nosniff"},
  {key:"Referrer-Policy",value:"strict-origin-when-cross-origin"},
  {key:"Permissions-Policy",value:"camera=(), microphone=(), geolocation=()"},
  {key:"X-Frame-Options",value:"SAMEORIGIN"},
  {key:"Cross-Origin-Opener-Policy",value:"same-origin-allow-popups"},
 ]}]}
};
module.exports=nextConfig;
