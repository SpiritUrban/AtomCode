import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TrackHub from "@/components/TrackHub";
import { isValidLocale, locales } from "@/lib/i18n";
import { learningTracks, getLearningTrackBySlug } from "@/lib/learningTracks";
import { buildSections } from "@/lib/loadContent";
import { buildTrackMetadata, getSiteUrl } from "@/lib/seo";
import { getBasePath } from "@/lib/routes";

type PageProps = {
  params: Promise<{ locale: string; section: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    learningTracks.map((track) => ({ locale, section: track.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, section } = await params;
  const track = getLearningTrackBySlug(section);
  if (!isValidLocale(locale) || !track) return {};
  return buildTrackMetadata(locale, track);
}

export default async function TrackHubPage({ params }: PageProps) {
  const { locale, section: sectionSlug } = await params;
  const track = getLearningTrackBySlug(sectionSlug);
  if (!isValidLocale(locale) || !track) notFound();

  const section = buildSections(locale).find(
    (candidate) => candidate.id === track.sectionId,
  );
  if (!section) notFound();

  const canonical = `${getSiteUrl()}${getBasePath()}/${locale}/${track.slug}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": section.lessons.length ? "Course" : "CollectionPage",
    "name": track.name,
    "description": track.description[locale],
    "url": canonical,
    "inLanguage": locale,
    "provider": {
      "@type": "Organization",
      "name": "AtomCode",
    },
    "numberOfItems": section.lessons.length,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TrackHub locale={locale} track={track} section={section} />
    </>
  );
}
