import { notFound, redirect } from "next/navigation";
import { buildSections } from "@/lib/loadContent";
import { isValidLocale, locales } from "@/lib/i18n";
import { getDefaultLessonPath } from "@/lib/routes";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleHomePage({ params }: PageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  const sections = buildSections(locale);
  redirect(getDefaultLessonPath(sections, locale));
}