import type { MetadataRoute } from "next";
import { buildSections } from "@/lib/loadContent";
import { locales } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/seo";
import { getSectionSlug, lessonPathWithBase } from "@/lib/routes";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add canonical lesson pages only. Locale roots are static-export
  // redirect pages, so they should not be submitted for indexing.
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
