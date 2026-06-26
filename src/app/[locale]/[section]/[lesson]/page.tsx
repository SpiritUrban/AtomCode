import { notFound } from "next/navigation";
import AppShell from "@/components/AppShell";
import LocaleSync from "@/components/LocaleSync";
import { buildSections } from "@/lib/loadContent";
import { isValidLocale } from "@/lib/i18n";
import { getAllLessonRoutes, resolveLessonRoute } from "@/lib/routes";
import { buildLessonMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{
    locale: string;
    section: string;
    lesson: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const sections = buildSections();
  return getAllLessonRoutes(sections);
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, section, lesson } = await params;

  if (!isValidLocale(locale)) return {};

  const sections = buildSections();
  const resolved = resolveLessonRoute(sections, locale, section, lesson);
  if (!resolved) return {};

  return buildLessonMetadata(locale, resolved.section, resolved.lesson);
}

export default async function LessonPage({ params }: PageProps) {
  const { locale, section, lesson } = await params;

  if (!isValidLocale(locale)) notFound();

  const sections = buildSections();
  const resolved = resolveLessonRoute(sections, locale, section, lesson);
  if (!resolved) notFound();

  return (
    <>
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