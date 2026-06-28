"use client";

import type { Section } from "@/types/lesson";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import { getSectionSlug, lessonPath } from "@/lib/routes";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type TopNavbarProps = {
  sections: Section[];
  locale: Locale;
  sectionSlug: string;
  lessonSlug: string;
  activeSectionId: string;
};

export default function TopNavbar({
  sections,
  locale,
  sectionSlug,
  lessonSlug,
  activeSectionId,
}: TopNavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-atom-border bg-atom-surface/95 backdrop-blur-md">
      <nav className="flex h-full items-center gap-1 px-4">
        <div className="mr-4 flex shrink-0 items-center gap-2">
          <span className="text-lg font-bold tracking-tight text-atom-accent">
            ⚛ AtomCode
          </span>
        </div>

        <div className="flex min-w-0 items-center gap-1 overflow-x-auto">
          {sections.map((section) => {
            const isActive = section.id === activeSectionId;
            const isDisabled = !section.enabled;

            if (isDisabled) {
              return (
                <span
                  key={section.id}
                  className="cursor-not-allowed text-atom-muted/40 rounded-lg px-3 py-1.5 text-sm font-medium transition-all whitespace-nowrap"
                >
                  {section.name}
                </span>
              );
            }

            const targetHref = section.lessons.length > 0
              ? lessonPath(locale, getSectionSlug(section.id), section.lessons[0].slug)
              : "#";

            return (
              <Link
                key={section.id}
                href={targetHref}
                className={[
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-all whitespace-nowrap",
                  isActive
                    ? "bg-atom-accent/15 text-atom-accent"
                    : "text-atom-muted hover:bg-atom-card hover:text-atom-text",
                ].join(" ")}
              >
                {section.name}
              </Link>
            );
          })}

          <button
            type="button"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-atom-muted transition-all hover:bg-atom-card hover:text-atom-text whitespace-nowrap"
          >
            About
          </button>
        </div>

        {lessonSlug && (
          <LanguageSwitcher
            locale={locale}
            sectionSlug={sectionSlug}
            lessonSlug={lessonSlug}
          />
        )}
      </nav>
    </header>
  );
}