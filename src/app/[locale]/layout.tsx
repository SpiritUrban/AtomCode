import type { ReactNode } from "react";
import { buildSiteMetadata } from "@/lib/seo";
import { isValidLocale, locales, type Locale } from "@/lib/i18n";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : "en";
  return buildSiteMetadata(validLocale);
}

export default async function LocaleLayout({
  children,
}: LocaleLayoutProps) {
  return children;
}
