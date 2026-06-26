import fs from "fs";
import path from "path";
import { lessonsToArray } from "@/lib/lessons";
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
  const candidates = [
    path.join(lessonDir, `lesson.${locale}.json`),
    path.join(lessonDir, "lesson.json"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }

  return null;
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

export function buildSections(locale: Locale): Section[] {
  const publicDir = path.join(process.cwd(), "public");
  const jsAtoms = loadSectionLessons(
    "jsAtoms",
    path.join(publicDir, "images", "js-atoms"),
    path.join(publicDir, "images", "js-atoms", "manifest.json"),
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
    },
    {
      id: "cssAtoms",
      name: "CSSAtoms",
      label: "CSS",
      enabled: false,
      lessons: [],
      lessonsRecord: {},
    },
    {
      id: "htmlAtoms",
      name: "HTMLAtoms",
      label: "HTML",
      enabled: false,
      lessons: [],
      lessonsRecord: {},
    },
    {
      id: "gitAtoms",
      name: "GitAtoms",
      label: "Git",
      enabled: false,
      lessons: [],
      lessonsRecord: {},
    },
    {
      id: "reactAtoms",
      name: "ReactAtoms",
      label: "React",
      enabled: false,
      lessons: [],
      lessonsRecord: {},
    },
    {
      id: "tsAtoms",
      name: "TSAtoms",
      label: "TypeScript",
      enabled: false,
      lessons: [],
      lessonsRecord: {},
    },
    {
      id: "nodeAtoms",
      name: "NodeAtoms",
      label: "Node.js",
      enabled: false,
      lessons: [],
      lessonsRecord: {},
    },
    {
      id: "linuxAtoms",
      name: "LinuxAtoms",
      label: "Linux",
      enabled: false,
      lessons: [],
      lessonsRecord: {},
    },
  ];
}