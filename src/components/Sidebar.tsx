"use client";

import type { Lesson } from "@/types/lesson";

type SidebarProps = {
  lessons: Lesson[];
  activeLessonCode: string;
  learnedIds: Set<string>;
  onLessonSelect: (code: string) => void;
};

export default function Sidebar({
  lessons,
  activeLessonCode,
  learnedIds,
  onLessonSelect,
}: SidebarProps) {
  return (
    <aside className="flex h-full w-56 shrink-0 flex-col border-r border-atom-border bg-atom-surface">
      <div className="border-b border-atom-border px-4 py-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-atom-muted">
          Lessons
        </h2>
      </div>

      <nav id="sidebar-nav" className="flex-1 overflow-y-auto py-2">
        {lessons.map((lesson) => {
          const isActive = lesson.code === activeLessonCode;
          const isLearned = learnedIds.has(lesson.code);

          return (
            <button
              key={lesson.code}
              type="button"
              onClick={() => onLessonSelect(lesson.code)}
              className={[
                "flex w-full items-start gap-2 px-4 py-2.5 text-left transition-all",
                isActive
                  ? "border-l-2 border-atom-accent bg-atom-accent/10 text-atom-accent"
                  : "border-l-2 border-transparent text-atom-muted hover:bg-atom-card hover:text-atom-text",
              ].join(" ")}
            >
              <span className="mt-0.5 text-xs font-mono opacity-60">
                {lesson.code}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{lesson.title}</div>
                {isLearned && (
                  <span className="text-xs text-atom-accent">✓ learned</span>
                )}
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}