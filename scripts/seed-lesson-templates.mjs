import { writeFileSync, existsSync } from "fs";
import { join } from "path";

const base = join(process.cwd(), "public", "images", "js-atoms");

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

for (let n = 7; n <= 33; n++) {
  const code = `JS-${String(n).padStart(3, "0")}`;
  const dir = join(base, code);
  const lesson = emptyLesson(n);
  const json = `${JSON.stringify(lesson, null, 2)}\n`;

  for (const locale of ["en", "uk"]) {
    const filePath = join(dir, `lesson.${locale}.json`);
    if (!existsSync(filePath)) {
      writeFileSync(filePath, json, "utf8");
    }
  }
}

console.log("Created lesson.en.json and lesson.uk.json for JS-007..JS-033");