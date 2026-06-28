import type { MetadataRoute } from "next";
import { buildSections } from "@/lib/loadContent";
import { locales } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/seo";
import { getBasePath, getSectionSlug, lessonPathWithBase } from "@/lib/routes";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const basePath = getBasePath();
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. Add locale root pages (include basePath for GitHub Pages)
  const localeRoots = locales.map((locale) => {
    const url = `${siteUrl}${basePath}/${locale}/`;

    return {
      url,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(
          locales.map((loc) => [loc, `${siteUrl}${basePath}/${loc}/`])
        ),
      },
    };
  });

  sitemapEntries.push(...localeRoots);

  // 2. Add all dynamic lesson pages.
  // lessonPathWithBase already includes basePath prefix.
  const sectionsEn = buildSections("en");

  for (const section of sectionsEn) {
    if (!section.enabled) continue;
    const sectionSlug = getSectionSlug(section.id);

    for (const lesson of section.lessons) {
      for (const locale of locales) {
        const path = lessonPathWithBase(locale, sectionSlug, lesson.slug);
        const url = `${siteUrl}${path}`;

        sitemapEntries.push({
          url,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.8,
          alternates: {
            languages: Object.fromEntries(
              locales.map((loc) => [
                loc,
                `${siteUrl}${lessonPathWithBase(loc, sectionSlug, lesson.slug)}`,
              ])
            ),
          },
        });
      }
    }
  }

  return sitemapEntries;
}
