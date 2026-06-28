import type { Locale } from "@/lib/i18n";
import type { Lesson } from "@/types/lesson";

const MAX_ALT_LENGTH = 180;

function cleanText(value: string): string {
  return value.replace(/\s+/g, " ").trim().replace(/[.!?]+$/, "");
}

function truncateAtWord(value: string): string {
  if (value.length <= MAX_ALT_LENGTH) return value;

  const shortened = value.slice(0, MAX_ALT_LENGTH - 1);
  const lastSpace = shortened.lastIndexOf(" ");
  const boundary = lastSpace > 120 ? lastSpace : shortened.length;
  return `${shortened.slice(0, boundary).trim()}…`;
}

export function buildLessonImageAlt(
  locale: Locale,
  sectionLabel: string,
  lesson: Lesson,
): string {
  const title = cleanText(lesson.title);
  const subtitle = cleanText(lesson.subtitle);
  const goal = cleanText(lesson.goal);
  const variant = lesson.number % 4;

  const templates =
    locale === "uk"
      ? [
          `Візуальне пояснення теми «${title}» у ${sectionLabel}: ${goal}`,
          `Навчальна ілюстрація про ${title} у ${sectionLabel} — ${subtitle}`,
          `${title} у ${sectionLabel}: наочний приклад для теми «${subtitle}»`,
          `Схема уроку з ${sectionLabel} про ${title}: ${goal}`,
        ]
      : [
          `Visual ${sectionLabel} guide to ${title}: ${goal}`,
          `${title} explained in a ${sectionLabel} learning illustration — ${subtitle}`,
          `${sectionLabel} diagram about ${title}: a visual example of ${subtitle}`,
          `Educational ${sectionLabel} lesson graphic for ${title}: ${goal}`,
        ];

  return truncateAtWord(templates[variant]);
}
