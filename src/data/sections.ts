import { jsAtomsLessons } from "@/data/jsAtoms";
import type { Section } from "@/types/lesson";

export const sections: Section[] = [
  {
    id: "jsAtoms",
    name: "JSAtoms",
    label: "JavaScript",
    enabled: true,
    lessons: jsAtomsLessons,
  },
  {
    id: "cssAtoms",
    name: "CSSAtoms",
    label: "CSS",
    enabled: false,
    lessons: [],
  },
  {
    id: "htmlAtoms",
    name: "HTMLAtoms",
    label: "HTML",
    enabled: false,
    lessons: [],
  },
  {
    id: "gitAtoms",
    name: "GitAtoms",
    label: "Git",
    enabled: false,
    lessons: [],
  },
  {
    id: "reactAtoms",
    name: "ReactAtoms",
    label: "React",
    enabled: false,
    lessons: [],
  },
  {
    id: "tsAtoms",
    name: "TSAtoms",
    label: "TypeScript",
    enabled: false,
    lessons: [],
  },
  {
    id: "nodeAtoms",
    name: "NodeAtoms",
    label: "Node.js",
    enabled: false,
    lessons: [],
  },
  {
    id: "linuxAtoms",
    name: "LinuxAtoms",
    label: "Linux",
    enabled: false,
    lessons: [],
  },
];

export function getSectionById(id: string): Section | undefined {
  return sections.find((s) => s.id === id);
}

export function getDefaultSection(): Section {
  return sections.find((s) => s.enabled) ?? sections[0];
}