"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { LessonGroup } from "@/types/lesson";
import type { Locale } from "@/lib/i18n";
import { findGroupIdForLesson } from "@/lib/lessonGroups";
import { lessonPath } from "@/lib/routes";

type SidebarProps = {
  lessonGroups: LessonGroup[];
  locale: Locale;
  sectionSlug: string;
  activeLessonCode: string;
  learnedIds: Set<string>;
  isMobileOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({
  lessonGroups,
  locale,
  sectionSlug,
  activeLessonCode,
  learnedIds,
  isMobileOpen,
  onClose,
}: SidebarProps) {
  const activeGroupId = useMemo(
    () => findGroupIdForLesson(lessonGroups, activeLessonCode),
    [lessonGroups, activeLessonCode],
  );

  const [openGroupId, setOpenGroupId] = useState<string | null>(activeGroupId);
  const activeLessonRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (activeGroupId) {
      setOpenGroupId(activeGroupId);
    }
  }, [activeGroupId]);

  useEffect(() => {
    activeLessonRef.current?.scrollIntoView({ block: "nearest" });
  }, [activeLessonCode, openGroupId]);

  const toggleGroup = (groupId: string) => {
    setOpenGroupId((current) => (current === groupId ? null : groupId));
  };

  return (
    <aside
      className={[
        "fixed bottom-0 left-0 top-14 z-40 flex w-[min(20rem,86vw)] shrink-0 flex-col border-r border-atom-border bg-atom-surface shadow-2xl transition-transform duration-200 lg:static lg:h-full lg:w-60 lg:translate-x-0 lg:shadow-none",
        isMobileOpen ? "translate-x-0" : "-translate-x-full",
      ].join(" ")}
      aria-label="Lessons"
    >
      <div className="flex items-center border-b border-atom-border px-4 py-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-atom-muted">
          Lessons
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close lessons menu"
          className="ml-auto grid h-8 w-8 place-items-center rounded-lg text-xl text-atom-muted hover:bg-atom-card hover:text-atom-text lg:hidden"
        >
          ×
        </button>
      </div>

      <nav id="sidebar-nav" className="flex-1 overflow-y-auto py-2">
        {lessonGroups.map((group) => {
          const isOpen = openGroupId === group.id;
          const panelId = `lesson-group-${group.id}`;

          return (
            <div key={group.id} className="border-b border-atom-border/60 last:border-b-0">
              <button
                type="button"
                onClick={() => toggleGroup(group.id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className={[
                  "flex w-full items-start gap-2 px-3 py-2.5 text-left transition-colors",
                  isOpen
                    ? "bg-atom-card/60 text-atom-text"
                    : "text-atom-muted hover:bg-atom-card/40 hover:text-atom-text",
                ].join(" ")}
              >
                <span
                  className={[
                    "mt-0.5 shrink-0 text-[10px] transition-transform duration-200",
                    isOpen ? "rotate-90 text-atom-accent" : "text-atom-muted",
                  ].join(" ")}
                  aria-hidden
                >
                  ▶
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold leading-snug">
                    {group.label}
                  </span>
                  <span className="mt-0.5 block text-[10px] text-atom-muted">
                    {group.lessons.length} lessons
                  </span>
                </span>
              </button>

              {isOpen && (
                <div id={panelId} className="pb-1">
                  {group.lessons.length === 0 ? (
                    <p className="px-4 py-2 text-xs text-atom-muted/70">
                      Coming soon
                    </p>
                  ) : (
                    group.lessons.map((lesson) => {
                      const isActive = lesson.code === activeLessonCode;
                      const isLearned = learnedIds.has(lesson.code);
                      const href = lessonPath(locale, sectionSlug, lesson.slug);

                      return (
                        <Link
                          key={lesson.code}
                          ref={isActive ? activeLessonRef : undefined}
                          href={href}
                          onClick={onClose}
                          className={[
                            "flex min-h-11 w-full items-start gap-2 py-2.5 pl-7 pr-4 text-left transition-all",
                            isActive
                              ? "border-l-2 border-atom-accent bg-atom-accent/10 text-atom-accent"
                              : "border-l-2 border-transparent text-atom-muted hover:bg-atom-card hover:text-atom-text",
                          ].join(" ")}
                        >
                          <span className="mt-0.5 text-[10px] font-mono opacity-60">
                            {lesson.code.replace("JS-", "")}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-medium">
                              {lesson.title}
                            </div>
                            {isLearned && (
                              <span className="text-xs text-atom-accent">
                                ✓ learned
                              </span>
                            )}
                          </div>
                        </Link>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
