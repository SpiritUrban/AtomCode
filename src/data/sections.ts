import {
  jsAtomsLessons,
  jsAtomsLessonsRecord,
} from "@/content/jsAtoms";
import type { Section } from "@/types/lesson";

export const sections: Section[] = [
  {
    id: "jsAtoms",
    name: "JSAtoms",
    label: "JavaScript",
    enabled: true,
    lessons: jsAtomsLessons,
    lessonsRecord: jsAtomsLessonsRecord,
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

export function getSectionById(id: string): Section | undefined {
  return sections.find((s) => s.id === id);
}

export function getDefaultSection(): Section {
  return sections.find((s) => s.enabled) ?? sections[0];
}