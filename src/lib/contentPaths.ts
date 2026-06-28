import type { LessonGroupConfig } from "@/lib/lessonGroups";

export const JS_ATOMS_SECTION_ID = "js-atoms";

export function lessonCodeToNumber(code: string): number {
  return Number.parseInt(code.replace("JS-", ""), 10);
}

export function findGroupConfigForLesson(
  code: string,
  groups: LessonGroupConfig[],
): LessonGroupConfig | undefined {
  const number = lessonCodeToNumber(code);
  return groups.find((group) => number >= group.from && number <= group.to);
}

/** Public URL for a lesson asset (image, etc.). */
export function jsAtomsAssetUrl(
  lessonCode: string,
  groupFolder: string,
  fileName = "image.png",
): string {
  return `/content/${JS_ATOMS_SECTION_ID}/${groupFolder}/${lessonCode}/${fileName}`;
}

export function trackAssetUrl(
  trackSlug: string,
  lessonCode: string,
  groupFolder: string,
  fileName = "image.png",
): string {
  return `/content/${trackSlug}/${groupFolder}/${lessonCode}/${fileName}`;
}

/** Filesystem path segment under /public for JS atom content. */
export function jsAtomsPublicDir(...segments: string[]): string[] {
  return ["content", JS_ATOMS_SECTION_ID, ...segments];
}

export function trackPublicDir(
  trackSlug: string,
  ...segments: string[]
): string[] {
  return ["content", trackSlug, ...segments];
}
