import { readdir, rename, rm, stat, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const contentRoot = path.resolve("public", "content");
const checkOnly = process.argv.includes("--check");

async function findLessonPngs(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return findLessonPngs(entryPath);
      return entry.name.toLowerCase() === "image.png" ? [entryPath] : [];
    }),
  );

  return files.flat();
}

function displayPath(filePath) {
  return path.relative(process.cwd(), filePath).replaceAll("\\", "/");
}

const pngFiles = await findLessonPngs(contentRoot);

if (checkOnly) {
  for (const pngFile of pngFiles) {
    console.warn(
      `[image-warning] Unoptimized PNG: ${displayPath(pngFile)}`,
    );
  }

  if (pngFiles.length > 0) {
    console.warn(
      `[image-warning] Found ${pngFiles.length} PNG lesson image(s). Run "npm run optimize:images" to convert them to WebP.`,
    );
  } else {
    console.log("[images] All lesson images are optimized.");
  }

  process.exit(0);
}

let originalBytes = 0;
let optimizedBytes = 0;

for (const pngFile of pngFiles) {
  const webpFile = path.join(path.dirname(pngFile), "image.webp");
  const temporaryFile = `${webpFile}.tmp-${process.pid}`;

  try {
    const original = await stat(pngFile);
    await sharp(pngFile)
      .rotate()
      .webp({
        quality: 82,
        alphaQuality: 90,
        effort: 6,
        smartSubsample: true,
      })
      .toFile(temporaryFile);

    const optimized = await stat(temporaryFile);
    if (optimized.size === 0) {
      throw new Error("Sharp produced an empty WebP file");
    }

    await rm(webpFile, { force: true });
    await rename(temporaryFile, webpFile);
    await unlink(pngFile);

    originalBytes += original.size;
    optimizedBytes += optimized.size;
    console.log(
      `[images] ${displayPath(pngFile)} -> ${displayPath(webpFile)} (${Math.round((1 - optimized.size / original.size) * 100)}% smaller)`,
    );
  } catch (error) {
    await rm(temporaryFile, { force: true }).catch(() => {});
    console.error(`[images] Failed to optimize ${displayPath(pngFile)}:`, error);
    process.exitCode = 1;
  }
}

if (process.exitCode) {
  console.error("[images] Optimization failed; affected PNG originals were kept.");
} else if (pngFiles.length === 0) {
  console.log("[images] No PNG lesson images found.");
} else {
  const savedPercent = Math.round(
    (1 - optimizedBytes / originalBytes) * 100,
  );
  console.log(
    `[images] Optimized ${pngFiles.length} image(s): ${savedPercent}% total size reduction. PNG originals were removed.`,
  );
}
