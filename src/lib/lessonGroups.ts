import type { Locale } from "@/lib/i18n";
import type { Lesson, LessonGroup } from "@/types/lesson";

export type LessonGroupConfig = {
  id: string;
  label: Record<Locale, string> | string;
  from: number;
  to: number;
};

export function isPublishedLesson(lesson: Lesson): boolean {
  return Boolean(lesson.slug && lesson.title);
}

export function buildLessonGroups(
  lessons: Lesson[],
  locale: Locale,
  config: LessonGroupConfig[],
): LessonGroup[] {
  const published = lessons.filter(isPublishedLesson);

  return config.map((group) => ({
    id: group.id,
    label:
      typeof group.label === "string"
        ? group.label
        : (group.label[locale] ?? group.label.en),
    lessons: published.filter(
      (lesson) => lesson.number >= group.from && lesson.number <= group.to,
    ),
  }));
}

export function findGroupIdForLesson(
  groups: LessonGroup[],
  lessonCode: string,
): string | null {
  return (
    groups.find((group) =>
      group.lessons.some((lesson) => lesson.code === lessonCode),
    )?.id ?? null
  );
}