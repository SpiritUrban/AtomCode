import Link from "next/link";
import { locales, type Locale } from "@/lib/i18n";
import { learningTracks } from "@/lib/learningTracks";

type PlatformNavProps = {
  locale: Locale;
  activeTrackSlug?: string;
};

export default function PlatformNav({
  locale,
  activeTrackSlug,
}: PlatformNavProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-atom-border/80 bg-atom-bg/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}/`}
          className="shrink-0 text-lg font-bold text-atom-accent"
        >
          ⚛ AtomCode
        </Link>

        <div className="hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto md:flex">
          {learningTracks.map((track) => (
            <Link
              key={track.slug}
              href={`/${locale}/${track.slug}/`}
              className={[
                "whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors",
                activeTrackSlug === track.slug
                  ? "bg-atom-accent/15 text-atom-accent"
                  : "text-atom-muted hover:bg-atom-card hover:text-atom-text",
              ].join(" ")}
            >
              {track.name}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1 rounded-lg border border-atom-border bg-atom-card p-1">
          {locales.map((language) => (
            <Link
              key={language}
              href={
                activeTrackSlug
                  ? `/${language}/${activeTrackSlug}/`
                  : `/${language}/`
              }
              hrefLang={language}
              className={[
                "rounded-md px-2.5 py-1 text-xs font-semibold transition-colors",
                language === locale
                  ? "bg-atom-accent/20 text-atom-accent"
                  : "text-atom-muted hover:text-atom-text",
              ].join(" ")}
            >
              {language === "uk" ? "UA" : "EN"}
            </Link>
          ))}
        </div>
      </nav>

      <div className="overflow-x-auto border-t border-atom-border/50 px-4 py-2 md:hidden">
        <div className="flex w-max gap-1">
          {learningTracks.map((track) => (
            <Link
              key={track.slug}
              href={`/${locale}/${track.slug}/`}
              className={[
                "rounded-lg px-2.5 py-1.5 text-xs font-semibold",
                activeTrackSlug === track.slug
                  ? "bg-atom-accent/15 text-atom-accent"
                  : "text-atom-muted",
              ].join(" ")}
            >
              {track.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
