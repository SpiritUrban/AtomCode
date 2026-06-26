import type { Lesson } from "@/types/lesson";

export function lessonsToArray(record: Record<string, Lesson>): Lesson[] {
  return Object.values(record).sort((a, b) => a.number - b.number);
}

export function getLessonByCode(
  record: Record<string, Lesson>,
  code: string,
): Lesson | undefined {
  return record[code];
}

export function searchLessonsByTag(
  lessons: Lesson[],
  query: string,
): Lesson[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return lessons.filter((lesson) =>
    lesson.tags.some((tag) => tag.toLowerCase().includes(normalized)),
  );
}