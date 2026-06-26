"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Lesson } from "@/types/lesson";
import { getPrerequisiteChain } from "@/lib/lessons";
import { getLearnedLessons, toggleLessonLearned } from "@/lib/progress";
import LessonImage from "@/components/LessonImage";
import LessonContent from "@/components/LessonContent";

type LessonViewerProps = {
  lessons: Lesson[];
  lessonsRecord: Record<string, Lesson>;
  activeLessonCode: string;
  onLessonChange: (code: string) => void;
  onLearnedChange?: (learnedIds: Set<string>) => void;
};

const SCROLL_COOLDOWN_MS = 800;

export default function LessonViewer({
  lessons,
  lessonsRecord,
  activeLessonCode,
  onLessonChange,
  onLearnedChange,
}: LessonViewerProps) {
  const [learnedIds, setLearnedIds] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);
  const scrollLocked = useRef(false);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lesson = lessonsRecord[activeLessonCode];
  const currentIndex = lessons.findIndex((l) => l.code === activeLessonCode);

  useEffect(() => {
    setLearnedIds(getLearnedLessons());
  }, []);

  const goToCode = useCallback(
    (code: string | undefined) => {
      if (code && lessonsRecord[code]) {
        onLessonChange(code);
      }
    },
    [lessonsRecord, onLessonChange],
  );

  const goToIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index < lessons.length) {
        onLessonChange(lessons[index].code);
      }
    },
    [lessons, onLessonChange],
  );

  const handlePrevious = () => {
    if (lesson?.previous) {
      goToCode(lesson.previous);
    } else {
      goToIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (lesson?.next) {
      goToCode(lesson.next);
    } else {
      goToIndex(currentIndex + 1);
    }
  };

  const hasPrevious = lesson?.previous
    ? !!lessonsRecord[lesson.previous]
    : currentIndex > 0;

  const hasNext = lesson?.next
    ? !!lessonsRecord[lesson.next]
    : currentIndex < lessons.length - 1;

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      if (scrollLocked.current || !lesson) return;

      scrollLocked.current = true;
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => {
        scrollLocked.current = false;
      }, SCROLL_COOLDOWN_MS);

      if (e.deltaY > 0) {
        if (lesson.next && lessonsRecord[lesson.next]) {
          goToCode(lesson.next);
        } else {
          goToIndex(currentIndex + 1);
        }
      } else if (e.deltaY < 0) {
        if (lesson.previous && lessonsRecord[lesson.previous]) {
          goToCode(lesson.previous);
        } else {
          goToIndex(currentIndex - 1);
        }
      }
    },
    [lesson, lessonsRecord, currentIndex, goToCode, goToIndex],
  );

  useEffect(() => {
    const el = document.getElementById("lesson-viewer");
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  useEffect(() => {
    setCopied(false);
  }, [activeLessonCode]);

  if (!lesson) return null;

  const prerequisites = getPrerequisiteChain(lessonsRecord, lesson.code);

  const handleCopyCode = async () => {
    if (!lesson.codeExample) return;
    try {
      await navigator.clipboard.writeText(lesson.codeExample);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handleMarkLearned = () => {
    const nowLearned = toggleLessonLearned(lesson.code);
    setLearnedIds((prev) => {
      const next = new Set(prev);
      if (nowLearned) next.add(lesson.code);
      else next.delete(lesson.code);
      onLearnedChange?.(next);
      return next;
    });
  };

  return (
    <div id="lesson-viewer" className="flex h-full flex-1 overflow-hidden">
      <div className="flex h-full w-2/5 shrink-0 border-r border-atom-border bg-atom-bg">
        <LessonImage src={lesson.image} alt={lesson.title} code={lesson.code} />
      </div>
      <div className="flex h-full flex-1 bg-atom-surface">
        <LessonContent
          lesson={lesson}
          prerequisites={prerequisites}
          onPrerequisiteSelect={goToCode}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onMarkLearned={handleMarkLearned}
          onCopyCode={handleCopyCode}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
          isLearned={learnedIds.has(lesson.code)}
          copied={copied}
        />
      </div>
    </div>
  );
}