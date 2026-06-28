import { notFound } from "next/navigation";
import AppShell from "@/components/AppShell";
import LocaleSync from "@/components/LocaleSync";
import { buildSections } from "@/lib/loadContent";
import { isValidLocale } from "@/lib/i18n";
import { getAllLessonRoutes, resolveLessonRoute } from "@/lib/routes";
import { buildLessonMetadata, buildLessonJsonLd } from "@/lib/seo";

type PageProps = {
  params: Promise<{
    locale: string;
    section: string;
    lesson: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const sections = buildSections("en");
  return getAllLessonRoutes(sections);
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, section, lesson } = await params;

  if (!isValidLocale(locale)) return {};

  const sections = buildSections(locale);
  const resolved = resolveLessonRoute(sections, locale, section, lesson);
  if (!resolved) return {};

  return buildLessonMetadata(locale, resolved.section, resolved.lesson);
}

export default async function LessonPage({ params }: PageProps) {
  const { locale, section, lesson } = await params;

  if (!isValidLocale(locale)) notFound();

  const sections = buildSections(locale);
  const resolved = resolveLessonRoute(sections, locale, section, lesson);
  if (!resolved) notFound();

  const jsonLd = buildLessonJsonLd(locale, resolved.section, resolved.lesson);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocaleSync locale={locale} />
      <AppShell
        sections={sections}
        locale={locale}
        activeSectionId={resolved.section.id}
        activeLessonCode={resolved.lesson.code}
      />
    </>
  );
}