const STORAGE_KEY = "atomcode-progress-v1";
const LEGACY_STORAGE_KEY = "atomcode-learned";
const DEFAULT_TRACK_ID = "jsAtoms";

export type TrackProgress = {
  completedLessonIds: string[];
  lastLessonId?: string;
  updatedAt: string;
};

export type AtomCodeProgress = {
  version: 1;
  tracks: Record<string, TrackProgress>;
};

function emptyProgress(): AtomCodeProgress {
  return { version: 1, tracks: {} };
}

function readProgress(): AtomCodeProgress {
  if (typeof window === "undefined") return emptyProgress();

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as AtomCodeProgress;

    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!legacy) return emptyProgress();
    const completedLessonIds = JSON.parse(legacy) as string[];
    return {
      version: 1,
      tracks: {
        [DEFAULT_TRACK_ID]: {
          completedLessonIds,
          updatedAt: new Date().toISOString(),
        },
      },
    };
  } catch {
    return emptyProgress();
  }
}

function writeProgress(progress: AtomCodeProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getTrackProgress(trackId: string): TrackProgress {
  return (
    readProgress().tracks[trackId] ?? {
      completedLessonIds: [],
      updatedAt: new Date(0).toISOString(),
    }
  );
}

export function getLearnedLessons(
  trackId = DEFAULT_TRACK_ID,
): Set<string> {
  return new Set(getTrackProgress(trackId).completedLessonIds);
}

export function isLessonLearned(
  lessonCode: string,
  trackId = DEFAULT_TRACK_ID,
): boolean {
  return getLearnedLessons(trackId).has(lessonCode);
}

export function toggleLessonLearned(
  lessonCode: string,
  trackId = DEFAULT_TRACK_ID,
): boolean {
  const progress = readProgress();
  const learned = new Set(
    progress.tracks[trackId]?.completedLessonIds ?? [],
  );

  if (learned.has(lessonCode)) learned.delete(lessonCode);
  else learned.add(lessonCode);

  progress.tracks[trackId] = {
    ...progress.tracks[trackId],
    completedLessonIds: [...learned],
    updatedAt: new Date().toISOString(),
  };
  writeProgress(progress);
  return learned.has(lessonCode);
}

export function setLastVisitedLesson(
  trackId: string,
  lessonCode: string,
): void {
  if (typeof window === "undefined") return;
  const progress = readProgress();
  progress.tracks[trackId] = {
    completedLessonIds:
      progress.tracks[trackId]?.completedLessonIds ?? [],
    lastLessonId: lessonCode,
    updatedAt: new Date().toISOString(),
  };
  writeProgress(progress);
}
