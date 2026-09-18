import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base=process.env.NEXT_PUBLIC_SITE_URL || "https://404cat.vercel.app";
  return ["","/generator","/graveyard","/about"].map((p)=>({url:base+p,lastModified:new Date(),changeFrequency:p?"monthly":"weekly",priority:p?0.8:1}));
}
