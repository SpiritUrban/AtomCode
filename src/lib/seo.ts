import type { Metadata } from "next";
import type { Lesson, Section } from "@/types/lesson";
import { Difficulty } from "@/types/lesson";
import { locales, type Locale } from "@/lib/i18n";
import {
  getBasePath,
  getSectionSlug,
  lessonPathWithBase,
} from "@/lib/routes";

const SITE_NAME = "AtomCode";
const SITE_DESCRIPTION =
  "Learn programming one atom at a time. Visual atomic lessons for JavaScript, CSS, HTML and more.";

export function getSiteUrl(): string {
  // NEXT_PUBLIC_SITE_URL must be set WITHOUT a trailing slash and WITHOUT the basePath.
  // For GitHub Pages: https://spiriturban.github.io
  // For custom domain: https://atomcode.dev
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://spiriturban.github.io";
  const siteUrl = new URL(configuredUrl);

  // GitHub preserves the account-name casing in github.repository_owner, while
  // canonical URLs and sitemap entries should use one stable hostname spelling.
  siteUrl.hostname = siteUrl.hostname.toLowerCase();

  return siteUrl.toString().replace(/\/$/, "");
}

export function buildLessonMetadata(
  locale: Locale,
  section: Section,
  lesson: Lesson,
): Metadata {
  const sectionSlug = getSectionSlug(section.id);
  const path = lessonPathWithBase(locale, sectionSlug, lesson.slug);
  const canonical = `${getSiteUrl()}${path}`;

  const title =
    locale === "uk"
      ? `${lesson.title}: ${lesson.subtitle} — ${section.label} | ${SITE_NAME}`
      : `${lesson.title} — ${section.label} | ${SITE_NAME}`;
  const description = lesson.goal;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        [
          ...locales.map((loc) => [
            loc,
            `${getSiteUrl()}${lessonPathWithBase(loc, sectionSlug, lesson.slug)}`,
          ]),
          [
            "x-default",
            `${getSiteUrl()}${lessonPathWithBase("en", sectionSlug, lesson.slug)}`,
          ],
        ],
      ),
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

export function buildSiteMetadata(locale: Locale = "en"): Metadata {
  const title = `${SITE_NAME} — Learn programming one atom at a time`;
  const description = SITE_DESCRIPTION;
  const basePath = getBasePath();
  // Full canonical URL includes basePath for GitHub Pages subpath deployments.
  const canonical = `${getSiteUrl()}${basePath}/${locale}/`;

  return {
    title,
    description,
    metadataBase: new URL(`${getSiteUrl()}${basePath}/`),
    alternates: {
      canonical,
      languages: Object.fromEntries(
        [
          ...locales.map((loc) => [
            loc,
            `${getSiteUrl()}${basePath}/${loc}/`,
          ]),
          ["x-default", `${getSiteUrl()}${basePath}/en/`],
        ],
      ),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function buildLessonJsonLd(
  locale: Locale,
  section: Section,
  lesson: Lesson,
): Record<string, unknown> {
  const sectionSlug = getSectionSlug(section.id);
  const path = lessonPathWithBase(locale, sectionSlug, lesson.slug);
  const url = `${getSiteUrl()}${path}`;

  const diffLabel =
    lesson.difficulty === Difficulty.Beginner
      ? "Beginner"
      : lesson.difficulty === Difficulty.Intermediate
        ? "Intermediate"
        : "Advanced";

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "name": lesson.title,
    "headline": `${lesson.title} — ${section.label}`,
    "description": lesson.goal,
    "inLanguage": locale,
    "url": url,
    "image": `${getSiteUrl()}${getBasePath()}${lesson.image}`,
    "articleSection": section.label,
    "keywords": [lesson.title, section.label, ...lesson.tags].join(", "),
    "about": {
      "@type": "Thing",
      "name": section.label,
    },
    "educationalLevel": diffLabel,
    "timeRequired": `PT${lesson.estimatedReadingTime || 2}M`,
    "author": {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": getSiteUrl(),
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": `${getSiteUrl()}/favicon.ico`,
      },
    },
  };
}
