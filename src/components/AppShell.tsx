"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Section } from "@/types/lesson";
import type { Locale } from "@/lib/i18n";
import { getSectionById } from "@/lib/sections";
import { getLearnedLessons } from "@/lib/progress";
import { getSectionSlug, lessonPath } from "@/lib/routes";
import TopNavbar from "@/components/TopNavbar";
import Sidebar from "@/components/Sidebar";
import LessonViewer from "@/components/LessonViewer";

type AppShellProps = {
  sections: Section[];
  locale: Locale;
  activeSectionId: string;
  activeLessonCode: string;
};

export default function AppShell({
  sections,
  locale,
  activeSectionId,
  activeLessonCode,
}: AppShellProps) {
  const router = useRouter();
  const activeSection =
    getSectionById(sections, activeSectionId) ?? sections[0];

  const navigateToLesson = useCallback(
    (sectionId: string, lessonCode: string) => {
      const section = getSectionById(sections, sectionId);
      if (!section) return;

      const lesson = section.lessonsRecord[lessonCode];
      if (!lesson) return;

      router.push(
        lessonPath(locale, getSectionSlug(sectionId), lesson.slug),
      );
    },
    [sections, locale, router],
  );

  const handleLessonSelect = useCallback(
    (code: string) => {
      navigateToLesson(activeSectionId, code);
    },
    [activeSectionId, navigateToLesson],
  );

  const [learnedIds, setLearnedIds] = useState<Set<string>>(new Set());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setLearnedIds(getLearnedLessons());
  }, [activeLessonCode]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeLessonCode]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMobileMenuOpen]);

  return (
    <div className="flex h-dvh min-h-0 flex-col overflow-hidden bg-atom-bg">
      <TopNavbar
        sections={sections}
        locale={locale}
        sectionSlug={getSectionSlug(activeSectionId)}
        lessonSlug={
          activeSection.lessonsRecord[activeLessonCode]?.slug ?? ""
        }
        activeSectionId={activeSectionId}
        isMenuOpen={isMobileMenuOpen}
        onMenuToggle={() => setIsMobileMenuOpen((open) => !open)}
      />

      <div className="flex min-h-0 flex-1 overflow-hidden pt-14">
        {isMobileMenuOpen && (
          <button
            type="button"
            aria-label="Close lessons menu"
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 top-14 z-30 bg-black/60 backdrop-blur-[1px] lg:hidden"
          />
        )}

        <Sidebar
          lessonGroups={activeSection.lessonGroups}
          locale={locale}
          sectionSlug={getSectionSlug(activeSectionId)}
          activeLessonCode={activeLessonCode}
          learnedIds={learnedIds}
          isMobileOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {activeSection.lessons.length > 0 ? (
          <LessonViewer
            lessons={activeSection.lessons}
            lessonsRecord={activeSection.lessonsRecord}
            activeLessonCode={activeLessonCode}
            onLessonChange={handleLessonSelect}
            onLearnedChange={setLearnedIds}
          />
        ) : (
          <div className="flex flex-1 items-center justify-center text-atom-muted">
            Coming soon...
          </div>
        )}
      </div>
    </div>
  );
}
