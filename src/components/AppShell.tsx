"use client";

import { useCallback, useState } from "react";
import type { Section } from "@/types/lesson";
import { getDefaultSection, getSectionById } from "@/lib/sections";
import { getLearnedLessons } from "@/lib/progress";
import TopNavbar from "@/components/TopNavbar";
import Sidebar from "@/components/Sidebar";
import LessonViewer from "@/components/LessonViewer";

type AppShellProps = {
  sections: Section[];
};

export default function AppShell({ sections }: AppShellProps) {
  const defaultSection = getDefaultSection(sections);
  const [activeSectionId, setActiveSectionId] = useState(defaultSection.id);
  const [activeLessonCode, setActiveLessonCode] = useState(
    defaultSection.lessons[0]?.code ?? "",
  );
  const [learnedIds, setLearnedIds] = useState<Set<string>>(new Set());

  const activeSection =
    getSectionById(sections, activeSectionId) ?? defaultSection;

  const handleSectionChange = useCallback(
    (sectionId: string) => {
      const section = getSectionById(sections, sectionId);
      if (!section || !section.enabled) return;
      setActiveSectionId(sectionId);
      if (section.lessons.length > 0) {
        setActiveLessonCode(section.lessons[0].code);
      }
      setLearnedIds(getLearnedLessons());
    },
    [sections],
  );

  const handleLessonSelect = useCallback((code: string) => {
    setActiveLessonCode(code);
    setLearnedIds(getLearnedLessons());
  }, []);

  return (
    <div className="flex h-screen flex-col bg-atom-bg">
      <TopNavbar
        sections={sections}
        activeSectionId={activeSectionId}
        onSectionChange={handleSectionChange}
      />

      <div className="flex flex-1 overflow-hidden pt-14">
        <Sidebar
          lessons={activeSection.lessons}
          activeLessonCode={activeLessonCode}
          learnedIds={learnedIds}
          onLessonSelect={handleLessonSelect}
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