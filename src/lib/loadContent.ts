import fs from "fs";
import path from "path";
import { lessonsToArray } from "@/lib/lessons";
import {
  buildLessonGroups,
  isPublishedLesson,
  type LessonGroupConfig,
} from "@/lib/lessonGroups";
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
  basePath: string,
  manifestPath: string,
  locale: Locale,
): { lessons: Lesson[]; lessonsRecord: Record<string, Lesson> } {
  const manifest = readJsonFile<string[]>(manifestPath);
  const lessonsRecord: Record<string, Lesson> = {};

  for (const code of manifest) {
    const lessonDir = path.join(basePath, code);
    const jsonPath = resolveLessonJsonPath(lessonDir, locale);
    if (!jsonPath) continue;

    const raw = readJsonFile<LessonJson>(jsonPath);

    lessonsRecord[code] = {
      ...raw,
      id: code,
      code,
      section: sectionId,
      image: `/images/js-atoms/${code}/image.png`,
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
  const jsAtomsBase = path.join(publicDir, "images", "js-atoms");
  const jsAtoms = loadSectionLessons(
    "jsAtoms",
    jsAtomsBase,
    path.join(jsAtomsBase, "manifest.json"),
    locale,
  );

  return [
    {
      id: "jsAtoms",
      name: "JSAtoms",
      label: "JavaScript",
      enabled: true,
      lessons: jsAtoms.lessons,
      lessonsRecord: jsAtoms.lessonsRecord,
      lessonGroups: loadLessonGroups(
        jsAtoms.lessons,
        locale,
        path.join(jsAtomsBase, "groups.json"),
      ),
    },
    {
      id: "cssAtoms",
      name: "CSSAtoms",
      label: "CSS",
      enabled: false,
      lessons: [],
      lessonsRecord: {},
      lessonGroups: emptyLessonGroups,
    },
    {
      id: "htmlAtoms",
      name: "HTMLAtoms",
      label: "HTML",
      enabled: false,
      lessons: [],
      lessonsRecord: {},
      lessonGroups: emptyLessonGroups,
    },
    {
      id: "gitAtoms",
      name: "GitAtoms",
      label: "Git",
      enabled: false,
      lessons: [],
      lessonsRecord: {},
      lessonGroups: emptyLessonGroups,
    },
    {
      id: "reactAtoms",
      name: "ReactAtoms",
      label: "React",
      enabled: false,
      lessons: [],
      lessonsRecord: {},
      lessonGroups: emptyLessonGroups,
    },
    {
      id: "tsAtoms",
      name: "TSAtoms",
      label: "TypeScript",
      enabled: false,
      lessons: [],
      lessonsRecord: {},
      lessonGroups: emptyLessonGroups,
    },
    {
      id: "nodeAtoms",
      name: "NodeAtoms",
      label: "Node.js",
      enabled: false,
      lessons: [],
      lessonsRecord: {},
      lessonGroups: emptyLessonGroups,
    },
    {
      id: "linuxAtoms",
      name: "LinuxAtoms",
      label: "Linux",
      enabled: false,
      lessons: [],
      lessonsRecord: {},
      lessonGroups: emptyLessonGroups,
    },
  ];
}