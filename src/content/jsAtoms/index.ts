import type { Lesson } from "@/types/lesson";
import { lesson as JS001 } from "@/content/jsAtoms/JS-001/lesson";
import { lesson as JS002 } from "@/content/jsAtoms/JS-002/lesson";
import { lesson as JS003 } from "@/content/jsAtoms/JS-003/lesson";
import { lessonsToArray } from "@/lib/lessons";

export const jsAtomsLessonsRecord: Record<string, Lesson> = {
  [JS001.code]: JS001,
  [JS002.code]: JS002,
  [JS003.code]: JS003,
};

export const jsAtomsLessons: Lesson[] = lessonsToArray(jsAtomsLessonsRecord);