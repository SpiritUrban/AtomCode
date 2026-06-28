"use client";

import type { Section } from "@/types/lesson";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import { getSectionSlug, lessonPath } from "@/lib/routes";
import { getLearningTrackBySectionId } from "@/lib/learningTracks";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type TopNavbarProps = {
  sections: Section[];
  locale: Locale;
  sectionSlug: string;
  lessonSlug: string;
  activeSectionId: string;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
};

export default function TopNavbar({
  sections,
  locale,
  sectionSlug,
  lessonSlug,
  activeSectionId,
  isMenuOpen,
  onMenuToggle,
}: TopNavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-atom-border bg-atom-surface/95 backdrop-blur-md">
      <nav className="flex h-full items-center gap-2 px-3 sm:px-4">
        <button
          type="button"
          onClick={onMenuToggle}
          aria-label={isMenuOpen ? "Close lessons menu" : "Open lessons menu"}
          aria-expanded={isMenuOpen}
          aria-controls="sidebar-nav"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-atom-border bg-atom-card text-xl text-atom-text transition-colors hover:border-atom-accent/50 lg:hidden"
        >
          <span aria-hidden>{isMenuOpen ? "×" : "☰"}</span>
        </button>

        <div className="mr-auto flex shrink-0 items-center gap-2 lg:mr-4">
          <Link
            href={`/${locale}/`}
            className="text-lg font-bold tracking-tight text-atom-accent"
          >
            ⚛ AtomCode
          </Link>
        </div>

        <div className="hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto lg:flex">
          {sections.map((section) => {
            const isActive = section.id === activeSectionId;
            const isDisabled = !section.enabled;

            if (isDisabled) {
              const track = getLearningTrackBySectionId(section.id);
              return (
                <Link
                  key={section.id}
                  href={`/${locale}/${track?.slug ?? getSectionSlug(section.id)}/`}
                  className="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium text-atom-muted/50 transition-all hover:bg-atom-card hover:text-atom-text"
                >
                  {section.name}
                </Link>
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

        <details className="group relative ml-auto lg:hidden">
          <summary className="flex h-9 cursor-pointer list-none items-center gap-1.5 rounded-lg border border-atom-border bg-atom-card px-2.5 text-xs font-semibold text-atom-muted">
            {sections
              .find((section) => section.id === activeSectionId)
              ?.name.replace("Atoms", "") ?? "Tracks"}
            <span className="transition-transform group-open:rotate-180" aria-hidden>
              ▾
            </span>
          </summary>
          <div className="absolute right-0 top-11 z-50 w-44 rounded-xl border border-atom-border bg-atom-surface p-2 shadow-2xl">
            {sections.map((section) => {
              const track = getLearningTrackBySectionId(section.id);
              const href =
                section.enabled && section.lessons.length
                  ? lessonPath(
                      locale,
                      getSectionSlug(section.id),
                      section.lessons[0].slug,
                    )
                  : `/${locale}/${track?.slug ?? getSectionSlug(section.id)}/`;
              return (
                <Link
                  key={section.id}
                  href={href}
                  className={[
                    "flex items-center justify-between rounded-lg px-3 py-2 text-xs transition-colors hover:bg-atom-card",
                    section.id === activeSectionId
                      ? "text-atom-accent"
                      : "text-atom-muted hover:text-atom-text",
                  ].join(" ")}
                >
                  {section.name}
                  {!section.enabled && (
                    <span className="text-[8px] uppercase tracking-wider opacity-60">
                      soon
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </details>

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
