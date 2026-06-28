import type { Lesson, Section } from "@/types/lesson";
import { isValidLocale, locales, type Locale } from "@/lib/i18n";
import { learningTracks } from "@/lib/learningTracks";

export const SECTION_SLUGS: Record<string, string> = Object.fromEntries(
  learningTracks.map((track) => [track.sectionId, track.slug]),
);

const SLUG_TO_SECTION_ID = Object.fromEntries(
  Object.entries(SECTION_SLUGS).map(([id, slug]) => [slug, id]),
);

export function getSectionSlug(sectionId: string): string {
  return SECTION_SLUGS[sectionId] ?? sectionId;
}

export function getSectionIdFromSlug(slug: string): string | undefined {
  return SLUG_TO_SECTION_ID[slug];
}

export function getBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH ?? "";
}

/** Internal app route — do not prepend basePath (Next.js adds it automatically). */
export function lessonPath(
  locale: Locale,
  sectionSlug: string,
  lessonSlug: string,
): string {
  return `/${locale}/${sectionSlug}/${lessonSlug}/`;
}

/** Full path for canonical URLs, sitemaps, and other absolute links. */
export function lessonPathWithBase(
  locale: Locale,
  sectionSlug: string,
  lessonSlug: string,
): string {
  return `${getBasePath()}${lessonPath(locale, sectionSlug, lessonSlug)}`;
}

export function resolveLessonRoute(
  sections: Section[],
  locale: string,
  sectionSlug: string,
  lessonSlug: string,
): { section: Section; lesson: Lesson } | null {
  if (!isValidLocale(locale)) return null;

  const sectionId = getSectionIdFromSlug(sectionSlug);
  if (!sectionId) return null;

  const section = sections.find((s) => s.id === sectionId && s.enabled);
  if (!section) return null;

  const lesson = section.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return null;

  return { section, lesson };
}

export function getDefaultLessonPath(sections: Section[], locale: Locale): string {
  const section = sections.find((s) => s.enabled && s.lessons.length > 0);
  if (!section) return `/${locale}/`;

  return lessonPath(
    locale,
    getSectionSlug(section.id),
    section.lessons[0].slug,
  );
}

export type LessonRouteParams = {
  locale: string;
  section: string;
  lesson: string;
};

export function getAllLessonRoutes(sections: Section[]): LessonRouteParams[] {
  const routes: LessonRouteParams[] = [];

  for (const locale of locales) {
    for (const section of sections) {
      if (!section.enabled) continue;
      const sectionSlug = getSectionSlug(section.id);
      for (const lesson of section.lessons) {
        routes.push({
          locale,
          section: sectionSlug,
          lesson: lesson.slug,
        });
      }
    }
  }

  return routes;
}
