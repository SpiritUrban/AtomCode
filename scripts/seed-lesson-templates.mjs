import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const base = join(process.cwd(), "public", "content", "js-atoms");
const groups = JSON.parse(
  readFileSync(join(base, "groups.json"), "utf8"),
);

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

let created = 0;

for (const group of groups) {
  mkdirSync(join(base, group.folder), { recursive: true });

  for (let number = group.from; number <= group.to; number += 1) {
    const code = lessonCode(number);
    const dir = join(base, group.folder, code);
    mkdirSync(dir, { recursive: true });

    const lesson = emptyLesson(number);
    const json = `${JSON.stringify(lesson, null, 2)}\n`;

    for (const locale of ["en", "uk"]) {
      const filePath = join(dir, `lesson.${locale}.json`);
      if (!existsSync(filePath)) {
        writeFileSync(filePath, json, "utf8");
        created += 1;
      }
    }
  }
}

console.log(`Ensured lesson templates across ${groups.length} groups (${created} new files)`);