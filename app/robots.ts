import type { MetadataRoute } from "next";
import { site } from "@/content/homepage";

export const dynamic = "force-static";

/** Disallow-all while `site.indexable` is false (staging); open with a sitemap at launch. */
export default function robots(): MetadataRoute.Robots {
  if (!site.indexable) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/hero-options/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
