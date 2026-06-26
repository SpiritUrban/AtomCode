import {
  existsSync,
  mkdirSync,
  readdirSync,
  renameSync,
  rmSync,
  writeFileSync,
  statSync,
} from "fs";
import { join } from "path";

const base = join(process.cwd(), "public", "content", "js-atoms");

const GROUPS = [
  {
    id: "data-core",
    folder: "01-data-core",
    label: { en: "01. Data Core", uk: "01. Data Core" },
    from: 1,
    to: 15,
  },
  {
    id: "expressions-operators",
    folder: "02-expressions-operators",
    label: {
      en: "02. Expressions & Operators",
      uk: "02. Expressions & Operators",
    },
    from: 16,
    to: 30,
  },
  {
    id: "comparisons-logic",
    folder: "03-comparisons-logic",
    label: { en: "03. Comparisons & Logic", uk: "03. Comparisons & Logic" },
    from: 31,
    to: 42,
  },
  {
    id: "control-flow",
    folder: "04-control-flow",
    label: { en: "04. Control Flow", uk: "04. Control Flow" },
    from: 43,
    to: 50,
  },
  {
    id: "collections",
    folder: "05-collections",
    label: { en: "05. Collections", uk: "05. Collections" },
    from: 51,
    to: 66,
  },
  {
    id: "functions",
    folder: "06-functions",
    label: { en: "06. Functions", uk: "06. Functions" },
    from: 67,
    to: 77,
  },
  {
    id: "scope-memory",
    folder: "07-scope-memory",
    label: { en: "07. Scope & Memory", uk: "07. Scope & Memory" },
    from: 78,
    to: 88,
  },
  {
    id: "objects-deep-dive",
    folder: "08-objects-deep-dive",
    label: { en: "08. Objects Deep Dive", uk: "08. Objects Deep Dive" },
    from: 89,
    to: 101,
  },
  {
    id: "dom-basics",
    folder: "09-dom-basics",
    label: { en: "09. DOM Basics", uk: "09. DOM Basics" },
    from: 102,
    to: 112,
  },
  {
    id: "events",
    folder: "10-events",
    label: { en: "10. Events", uk: "10. Events" },
    from: 113,
    to: 121,
  },
  {
    id: "async-javascript",
    folder: "11-async-javascript",
    label: { en: "11. Async JavaScript", uk: "11. Async JavaScript" },
    from: 122,
    to: 135,
  },
  {
    id: "modules",
    folder: "12-modules",
    label: { en: "12. Modules", uk: "12. Modules" },
    from: 136,
    to: 140,
  },
  {
    id: "browser-apis",
    folder: "13-browser-apis",
    label: { en: "13. Browser APIs", uk: "13. Browser APIs" },
    from: 141,
    to: 147,
  },
  {
    id: "error-handling",
    folder: "14-error-handling",
    label: { en: "14. Error Handling", uk: "14. Error Handling" },
    from: 148,
    to: 155,
  },
  {
    id: "practice-atoms",
    folder: "15-practice-atoms",
    label: { en: "15. Practice Atoms", uk: "15. Practice Atoms" },
    from: 156,
    to: 166,
  },
];

function lessonCode(number) {
  return `JS-${String(number).padStart(3, "0")}`;
}

function emptyLesson(number) {
  return {
    number,
    slug: "",
    title: "",
    subtitle: "",
    difficulty: "Beginner",
    duration: "2 min",
    tags: [],
    prerequisites: [],
    goal: "",
    explanation: [],
    remember: [],
    playground: false,
  };
}

function isLessonDirName(name) {
  return /^JS-\d{3}$/.test(name);
}

function findExistingLessonDir(code) {
  const flat = join(base, code);
  if (existsSync(flat) && statSync(flat).isDirectory()) {
    return flat;
  }

  for (const group of GROUPS) {
    const nested = join(base, group.folder, code);
    if (existsSync(nested) && statSync(nested).isDirectory()) {
      return nested;
    }
  }

  return null;
}

function moveDirContents(fromDir, toDir) {
  mkdirSync(toDir, { recursive: true });

  for (const entry of readdirSync(fromDir)) {
    const fromPath = join(fromDir, entry);
    const toPath = join(toDir, entry);
    if (existsSync(toPath)) continue;
    renameSync(fromPath, toPath);
  }
}

let moved = 0;
let created = 0;

for (const group of GROUPS) {
  mkdirSync(join(base, group.folder), { recursive: true });

  for (let number = group.from; number <= group.to; number += 1) {
    const code = lessonCode(number);
    const targetDir = join(base, group.folder, code);
    const existingDir = findExistingLessonDir(code);

    if (existingDir && existingDir !== targetDir) {
      moveDirContents(existingDir, targetDir);
      try {
        if (readdirSync(existingDir).length === 0) {
          rmSync(existingDir, { recursive: true, force: true });
        }
      } catch {
        /* directory removed during move */
      }
      moved += 1;
    } else {
      mkdirSync(targetDir, { recursive: true });
    }

    const lesson = emptyLesson(number);
    const json = `${JSON.stringify(lesson, null, 2)}\n`;

    for (const locale of ["en", "uk"]) {
      const filePath = join(targetDir, `lesson.${locale}.json`);
      if (!existsSync(filePath)) {
        writeFileSync(filePath, json, "utf8");
        created += 1;
      }
    }
  }
}

for (const entry of readdirSync(base)) {
  if (!isLessonDirName(entry)) continue;
  const dir = join(base, entry);
  if (!statSync(dir).isDirectory()) continue;
  if (readdirSync(dir).length === 0) {
    rmSync(dir, { recursive: true, force: true });
  }
}

writeFileSync(
  join(base, "groups.json"),
  `${JSON.stringify(GROUPS, null, 2)}\n`,
  "utf8",
);

console.log(`Reorganized lesson folders under ${base}`);
console.log(`Moved lesson dirs: ${moved}`);
console.log(`Created empty locale files: ${created}`);
console.log(`Groups: ${GROUPS.length}, lessons: 166`);