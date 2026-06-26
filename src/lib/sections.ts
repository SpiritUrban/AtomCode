import type { Section } from "@/types/lesson";

export function getDefaultSection(sections: Section[]): Section {
  return sections.find((s) => s.enabled) ?? sections[0];
}

export function getSectionById(
  sections: Section[],
  id: string,
): Section | undefined {
  return sections.find((s) => s.id === id);
}