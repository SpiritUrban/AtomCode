import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { getBasePath } from "@/lib/routes";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  const basePath = getBasePath();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    // sitemap URL must include the basePath for GitHub Pages subpath deployments.
    sitemap: `${siteUrl}${basePath}/sitemap.xml`,
  };
}
