"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Lesson } from "@/types/lesson";
import { getLearnedLessons, toggleLessonLearned } from "@/lib/progress";
import LessonImage from "@/components/LessonImage";
import LessonContent from "@/components/LessonContent";

type LessonViewerProps = {
  lessons: Lesson[];
  activeLessonId: string;
  onLessonChange: (lessonId: string) => void;
  onLearnedChange?: (learnedIds: Set<string>) => void;
};

const SCROLL_COOLDOWN_MS = 800;

export default function LessonViewer({
  lessons,
  activeLessonId,
  onLessonChange,
  onLearnedChange,
}: LessonViewerProps) {
  const [learnedIds, setLearnedIds] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);
  const scrollLocked = useRef(false);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentIndex = lessons.findIndex((l) => l.id === activeLessonId);
  const lesson = lessons[currentIndex];

  useEffect(() => {
    setLearnedIds(getLearnedLessons());
  }, []);

  const goToIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index < lessons.length) {
        onLessonChange(lessons[index].id);
      }
    },
    [lessons, onLessonChange],
  );

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      if (scrollLocked.current) return;

      scrollLocked.current = true;
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => {
        scrollLocked.current = false;
      }, SCROLL_COOLDOWN_MS);

      if (e.deltaY > 0) {
        goToIndex(currentIndex + 1);
      } else if (e.deltaY < 0) {
        goToIndex(currentIndex - 1);
      }
    },
    [currentIndex, goToIndex],
  );

  useEffect(() => {
    const el = document.getElementById("lesson-viewer");
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  useEffect(() => {
    setCopied(false);
  }, [activeLessonId]);

  if (!lesson) return null;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(lesson.codeExample);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handleMarkLearned = () => {
    const nowLearned = toggleLessonLearned(lesson.id);
    setLearnedIds((prev) => {
      const next = new Set(prev);
      if (nowLearned) next.add(lesson.id);
      else next.delete(lesson.id);
      onLearnedChange?.(next);
      return next;
    });
  };

  return (
    <div
      id="lesson-viewer"
      className="flex h-full flex-1 overflow-hidden"
    >
      <div className="flex h-full w-2/5 shrink-0 border-r border-atom-border bg-atom-bg">
        <LessonImage src={lesson.image} alt={lesson.title} code={lesson.code} />
      </div>
      <div className="flex h-full flex-1 bg-atom-surface">
        <LessonContent
          lesson={lesson}
          onPrevious={() => goToIndex(currentIndex - 1)}
          onNext={() => goToIndex(currentIndex + 1)}
          onMarkLearned={handleMarkLearned}
          onCopyCode={handleCopyCode}
          hasPrevious={currentIndex > 0}
          hasNext={currentIndex < lessons.length - 1}
          isLearned={learnedIds.has(lesson.id)}
          copied={copied}
        />
      </div>
    </div>
  );
}