import type { Metadata } from "next";
import type { Lesson, Section } from "@/types/lesson";
import type { Locale } from "@/lib/i18n";
import { getBasePath, getSectionSlug, lessonPath } from "@/lib/routes";

const SITE_NAME = "AtomCode";
const SITE_DESCRIPTION =
  "Learn programming one atom at a time. Visual atomic lessons for JavaScript, CSS, HTML and more.";

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://atomcode.dev";
}

export function buildLessonMetadata(
  locale: Locale,
  section: Section,
  lesson: Lesson,
): Metadata {
  const sectionSlug = getSectionSlug(section.id);
  const path = lessonPath(locale, sectionSlug, lesson.slug);
  const canonical = `${getSiteUrl()}${path}`;

  const title = `${lesson.title} — ${section.label} | ${SITE_NAME}`;
  const description = lesson.goal;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "article",
      locale,
      images: [
        {
          url: `${getSiteUrl()}${getBasePath()}${lesson.image}`,
          alt: `${lesson.title} — ${lesson.code}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    keywords: [
      lesson.title,
      section.label,
      ...lesson.tags,
      "JavaScript",
      "programming tutorial",
    ],
  };
}

export function buildSiteMetadata(): Metadata {
  return {
    title: `${SITE_NAME} — Learn programming one atom at a time`,
    description: SITE_DESCRIPTION,
  };
}