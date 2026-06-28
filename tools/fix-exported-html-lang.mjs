import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDir = path.resolve("out");
const localeDirectories = {
  en: path.join(outputDir, "en"),
  uk: path.join(outputDir, "uk"),
};

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory()
        ? htmlFiles(entryPath)
        : entry.name.endsWith(".html")
          ? [entryPath]
          : [];
    }),
  );

  return nestedFiles.flat();
}

for (const [locale, directory] of Object.entries(localeDirectories)) {
  for (const file of await htmlFiles(directory)) {
    const html = await readFile(file, "utf8");
    if (!/<html(?:\s+lang="[^"]*")?/.test(html)) {
      throw new Error(`Could not find the document element in ${file}`);
    }

    const localizedHtml = html.replace(
      /<html(?:\s+lang="[^"]*")?/,
      `<html lang="${locale}"`,
    );

    if (localizedHtml !== html) {
      await writeFile(file, localizedHtml);
    }
  }
}

console.log("Set language attributes on exported locale pages.");
