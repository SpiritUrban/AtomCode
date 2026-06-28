"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Lesson } from "@/types/lesson";
import type { Locale } from "@/lib/i18n";
import { buildLessonImageAlt } from "@/lib/imageAlt";
import { getLearnedLessons, toggleLessonLearned } from "@/lib/progress";
import LessonImage from "@/components/LessonImage";
import LessonContent from "@/components/LessonContent";

type LessonViewerProps = {
  lessons: Lesson[];
  lessonsRecord: Record<string, Lesson>;
  trackId: string;
  locale: Locale;
  sectionLabel: string;
  activeLessonCode: string;
  onLessonChange: (code: string) => void;
  onLearnedChange?: (learnedIds: Set<string>) => void;
};

const SCROLL_COOLDOWN_MS = 800;

export default function LessonViewer({
  lessons,
  lessonsRecord,
  trackId,
  locale,
  sectionLabel,
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
    setLearnedIds(getLearnedLessons(trackId));
  }, [trackId]);

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

  const switchLesson = useCallback(
    (direction: "up" | "down") => {
      if (scrollLocked.current || !lesson) return;

      scrollLocked.current = true;
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => {
        scrollLocked.current = false;
      }, SCROLL_COOLDOWN_MS);

      if (direction === "down") {
        if (lesson.next && lessonsRecord[lesson.next]) {
          goToCode(lesson.next);
        } else {
          goToIndex(currentIndex + 1);
        }
      } else {
        if (lesson.previous && lessonsRecord[lesson.previous]) {
          goToCode(lesson.previous);
        } else {
          goToIndex(currentIndex - 1);
        }
      }
    },
    [lesson, lessonsRecord, currentIndex, goToCode, goToIndex],
  );

  const handleCenterScroll = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.deltaY > 0) switchLesson("down");
      else if (e.deltaY < 0) switchLesson("up");
    },
    [switchLesson],
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

  useEffect(() => {
    setCopied(false);
  }, [activeLessonCode]);

  if (!lesson) return null;

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
    const nowLearned = toggleLessonLearned(lesson.code, trackId);
    const next = new Set(learnedIds);
    if (nowLearned) {
      next.add(lesson.code);
    } else {
      next.delete(lesson.code);
    }
    setLearnedIds(next);
    onLearnedChange?.(next);
  };

  return (
    <main className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
      <div
        className="h-[min(72vw,20rem)] w-full shrink-0 border-b border-atom-border bg-atom-bg lg:h-full lg:w-auto lg:aspect-square lg:max-w-[calc(100%-18rem)] lg:border-b-0 lg:border-r"
        onWheel={handleCenterScroll}
      >
        <LessonImage
          src={lesson.image}
          alt={buildLessonImageAlt(locale, sectionLabel, lesson)}
          code={lesson.code}
        />
      </div>

      <div className="min-w-0 w-full flex-1 bg-atom-surface lg:h-full lg:min-w-[18rem] lg:basis-0 lg:overflow-hidden">
        <LessonContent
          lesson={lesson}
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
    </main>
  );
}
