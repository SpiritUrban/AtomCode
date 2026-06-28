import fs from "fs";
import path from "path";
import { lessonsToArray } from "@/lib/lessons";
import {
  buildLessonGroups,
  isPublishedLesson,
  type LessonGroupConfig,
} from "@/lib/lessonGroups";
import {
  findGroupConfigForLesson,
  trackAssetUrl,
  trackPublicDir,
} from "@/lib/contentPaths";
import { learningTracks } from "@/lib/learningTracks";
import type { Locale } from "@/lib/i18n";
import { Difficulty, type Lesson, type Section } from "@/types/lesson";

export type LessonJson = Omit<
  Lesson,
  "id" | "code" | "section" | "image" | "difficulty"
> & {
  difficulty: "Beginner" | "Intermediate" | "Advanced";
};

const difficultyMap: Record<LessonJson["difficulty"], Difficulty> = {
  Beginner: Difficulty.Beginner,
  Intermediate: Difficulty.Intermediate,
  Advanced: Difficulty.Advanced,
};

const warnedUnoptimizedImages = new Set<string>();

function resolveLessonImageFileName(lessonDir: string): string {
  const webpPath = path.join(lessonDir, "image.webp");
  if (fs.existsSync(webpPath)) return "image.webp";

  const pngPath = path.join(lessonDir, "image.png");
  if (
    fs.existsSync(pngPath) &&
    !warnedUnoptimizedImages.has(pngPath)
  ) {
    warnedUnoptimizedImages.add(pngPath);
    console.warn(
      `[image-warning] Using unoptimized PNG: ${path.relative(process.cwd(), pngPath)}. Run "npm run optimize:images".`,
    );
  }

  return "image.png";
}

function readJsonFile<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf-8").replace(/^\uFEFF/, "");
  return JSON.parse(raw) as T;
}

function resolveLessonJsonPath(
  lessonDir: string,
  locale: Locale,
): string | null {
  const jsonPath = path.join(lessonDir, `lesson.${locale}.json`);
  return fs.existsSync(jsonPath) ? jsonPath : null;
}

function loadSectionLessons(
  sectionId: string,
  trackSlug: string,
  basePath: string,
  manifestPath: string,
  groupsPath: string,
  locale: Locale,
): { lessons: Lesson[]; lessonsRecord: Record<string, Lesson> } {
  const manifest = readJsonFile<string[]>(manifestPath);
  const groupConfig = fs.existsSync(groupsPath)
    ? readJsonFile<LessonGroupConfig[]>(groupsPath)
    : [];
  const lessonsRecord: Record<string, Lesson> = {};

  for (const code of manifest) {
    const group = findGroupConfigForLesson(code, groupConfig);
    const lessonDir = group
      ? path.join(basePath, group.folder, code)
      : path.join(basePath, code);
    const jsonPath = resolveLessonJsonPath(lessonDir, locale);
    if (!jsonPath) continue;

    const raw = readJsonFile<LessonJson>(jsonPath);

    lessonsRecord[code] = {
      ...raw,
      id: code,
      code,
      section: sectionId,
      image: trackAssetUrl(
        trackSlug,
        code,
        group?.folder ?? "",
        resolveLessonImageFileName(lessonDir),
      ),
      difficulty: difficultyMap[raw.difficulty],
    };
  }

  return {
    lessons: lessonsToArray(lessonsRecord),
    lessonsRecord,
  };
}

function loadLessonGroups(
  lessons: Lesson[],
  locale: Locale,
  groupsPath: string,
): Section["lessonGroups"] {
  const published = lessons.filter(isPublishedLesson);

  if (!fs.existsSync(groupsPath)) {
    return published.length
      ? [{ id: "all", label: "Lessons", lessons: published }]
      : [];
  }

  const config = readJsonFile<LessonGroupConfig[]>(groupsPath);
  return buildLessonGroups(lessons, locale, config);
}

const emptyLessonGroups: Section["lessonGroups"] = [];

export function buildSections(locale: Locale): Section[] {
  const publicDir = path.join(process.cwd(), "public");

  return learningTracks.map((track) => {
    const trackBase = path.join(publicDir, ...trackPublicDir(track.slug));
    const manifestPath = path.join(trackBase, "manifest.json");
    const groupsPath = path.join(trackBase, "groups.json");

    if (!fs.existsSync(manifestPath)) {
      return {
        id: track.sectionId,
        name: track.name,
        label: track.technology,
        enabled: false,
        lessons: [],
        lessonsRecord: {},
        lessonGroups: emptyLessonGroups,
      };
    }

    const content = loadSectionLessons(
      track.sectionId,
      track.slug,
      trackBase,
      manifestPath,
      groupsPath,
      locale,
    );

    return {
      id: track.sectionId,
      name: track.name,
      label: track.technology,
      enabled: track.status === "available" && content.lessons.length > 0,
      lessons: content.lessons,
      lessonsRecord: content.lessonsRecord,
      lessonGroups: loadLessonGroups(content.lessons, locale, groupsPath),
    };
  });
}
