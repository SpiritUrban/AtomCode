import { notFound, redirect } from "next/navigation";
import { buildSections } from "@/lib/loadContent";
import { isValidLocale } from "@/lib/i18n";
import { getDefaultLessonPath } from "@/lib/routes";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return [{ locale: "en" }];
}

export default async function LocaleHomePage({ params }: PageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  const sections = buildSections();
  redirect(getDefaultLessonPath(sections, locale));
}