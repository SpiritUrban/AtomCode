"use client";

import type { Lesson } from "@/types/lesson";

type PrerequisitesPanelProps = {
  prerequisites: Lesson[];
  onLessonSelect: (code: string) => void;
};

export default function PrerequisitesPanel({
  prerequisites,
  onLessonSelect,
}: PrerequisitesPanelProps) {
  if (prerequisites.length === 0) return null;

  return (
    <section className="rounded-xl border border-atom-accent2/30 bg-atom-accent2/5 p-4">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-atom-accent2">
        Спочатку бажано пройти
      </h2>
      <div className="flex flex-col items-start gap-1">
        {prerequisites.map((prereq, index) => (
          <div key={prereq.code} className="flex flex-col items-start">
            <button
              type="button"
              onClick={() => onLessonSelect(prereq.code)}
              className="rounded-lg px-2 py-1 text-sm font-medium text-atom-text transition-colors hover:bg-atom-card hover:text-atom-accent"
            >
              <span className="font-mono text-xs text-atom-muted">{prereq.code}</span>
              {" — "}
              {prereq.title}
            </button>
            {index < prerequisites.length - 1 && (
              <span className="ml-4 text-atom-muted">↓</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}