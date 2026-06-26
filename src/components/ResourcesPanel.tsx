"use client";

import type { Resource } from "@/types/lesson";

const typeIcon: Record<Resource["type"], string> = {
  mdn: "📘",
  youtube: "▶",
  article: "📄",
  docs: "📚",
  other: "🔗",
};

type ResourcesPanelProps = {
  resources: Resource[];
};

export default function ResourcesPanel({ resources }: ResourcesPanelProps) {
  if (!resources || resources.length === 0) return null;

  return (
    <section>
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-atom-muted">
        Resources
      </h2>
      <ul className="space-y-2">
        {resources.map((resource) => (
          <li key={resource.url}>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-atom-border bg-atom-card px-3 py-2 text-sm text-atom-text transition-colors hover:border-atom-accent2/50 hover:text-atom-accent2"
            >
              <span>{typeIcon[resource.type]}</span>
              {resource.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}