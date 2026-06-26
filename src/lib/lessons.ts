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

export function getPrerequisiteChain(
  record: Record<string, Lesson>,
  code: string,
): Lesson[] {
  const visited = new Set<string>();
  const chain: Lesson[] = [];

  function walk(lessonCode: string) {
    const lesson = record[lessonCode];
    if (!lesson) return;

    for (const prereq of lesson.prerequisites) {
      if (!visited.has(prereq)) {
        visited.add(prereq);
        walk(prereq);
        const prereqLesson = record[prereq];
        if (prereqLesson) chain.push(prereqLesson);
      }
    }
  }

  walk(code);
  return chain;
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