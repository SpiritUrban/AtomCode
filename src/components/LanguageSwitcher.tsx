"use client";

import Link from "next/link";
import { localeLabels, locales, type Locale } from "@/lib/i18n";
import { lessonPath } from "@/lib/routes";

type LanguageSwitcherProps = {
  locale: Locale;
  sectionSlug: string;
  lessonSlug: string;
};

export default function LanguageSwitcher({
  locale,
  sectionSlug,
  lessonSlug,
}: LanguageSwitcherProps) {
  return (
    <div className="ml-auto flex shrink-0 items-center gap-1 rounded-lg border border-atom-border bg-atom-card p-1">
      {locales.map((loc) => {
        const isActive = loc === locale;

        return (
          <Link
            key={loc}
            href={lessonPath(loc, sectionSlug, lessonSlug)}
            className={[
              "rounded-md px-2.5 py-1 text-xs font-semibold transition-all",
              isActive
                ? "bg-atom-accent/20 text-atom-accent"
                : "text-atom-muted hover:bg-atom-surface hover:text-atom-text",
            ].join(" ")}
            hrefLang={loc}
          >
            {localeLabels[loc]}
          </Link>
        );
      })}
    </div>
  );
}