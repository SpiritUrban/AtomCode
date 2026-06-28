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

  for (const locale of locales) {
    sitemapEntries.push({
      url: `${siteUrl}${basePath}/${locale}/`,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: `${siteUrl}${basePath}/en/`,
          uk: `${siteUrl}${basePath}/uk/`,
          "x-default": `${siteUrl}${basePath}/en/`,
        },
      },
    });
  }

  // Add canonical lesson pages.
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
          changeFrequency: "weekly" as const,
          priority: 0.8,
          alternates: {
            languages: Object.fromEntries(
              [
                ...locales.map((loc) => [
                  loc,
                  `${siteUrl}${lessonPathWithBase(loc, sectionSlug, lesson.slug)}`,
                ]),
                [
                  "x-default",
                  `${siteUrl}${lessonPathWithBase("en", sectionSlug, lesson.slug)}`,
                ],
              ],
            ),
          },
        });
      }
    }
  }

  return sitemapEntries;
}
