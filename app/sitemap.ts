import type { MetadataRoute } from "next";
import { site } from "@/content/homepage";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/graham/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/privacy/`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/terms/`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
