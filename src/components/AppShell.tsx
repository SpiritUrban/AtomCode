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

  const handleSectionChange = useCallback(
    (sectionId: string) => {
      const section = getSectionById(sections, sectionId);
      if (!section || !section.enabled || section.lessons.length === 0) return;

      navigateToLesson(sectionId, section.lessons[0].code);
    },
    [sections, navigateToLesson],
  );

  const handleLessonSelect = useCallback(
    (code: string) => {
      navigateToLesson(activeSectionId, code);
    },
    [activeSectionId, navigateToLesson],
  );

  const [learnedIds, setLearnedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setLearnedIds(getLearnedLessons());
  }, [activeLessonCode]);

  return (
    <div className="flex h-screen flex-col bg-atom-bg">
      <TopNavbar
        sections={sections}
        locale={locale}
        sectionSlug={getSectionSlug(activeSectionId)}
        lessonSlug={
          activeSection.lessonsRecord[activeLessonCode]?.slug ?? ""
        }
        activeSectionId={activeSectionId}
        onSectionChange={handleSectionChange}
      />

      <div className="flex flex-1 overflow-hidden pt-14">
        <Sidebar
          lessonGroups={activeSection.lessonGroups}
          locale={locale}
          sectionSlug={getSectionSlug(activeSectionId)}
          activeLessonCode={activeLessonCode}
          learnedIds={learnedIds}
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