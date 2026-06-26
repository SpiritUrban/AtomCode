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

export function isLessonLearned(lessonCode: string): boolean {
  return getLearnedLessons().has(lessonCode);
}

export function toggleLessonLearned(lessonCode: string): boolean {
  const learned = getLearnedLessons();
  if (learned.has(lessonCode)) {
    learned.delete(lessonCode);
  } else {
    learned.add(lessonCode);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...learned]));
  return learned.has(lessonCode);
}