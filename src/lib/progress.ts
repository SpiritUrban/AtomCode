const STORAGE_KEY = "atomcode-learned";

export function getLearnedLessons(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

export function isLessonLearned(lessonId: string): boolean {
  return getLearnedLessons().has(lessonId);
}

export function toggleLessonLearned(lessonId: string): boolean {
  const learned = getLearnedLessons();
  if (learned.has(lessonId)) {
    learned.delete(lessonId);
  } else {
    learned.add(lessonId);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...learned]));
  return learned.has(lessonId);
}