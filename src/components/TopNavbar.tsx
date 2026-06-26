"use client";

import type { Section } from "@/types/lesson";
type TopNavbarProps = {
  sections: Section[];
  activeSectionId: string;
  onSectionChange: (sectionId: string) => void;
};

export default function TopNavbar({
  sections,
  activeSectionId,
  onSectionChange,
}: TopNavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-atom-border bg-atom-surface/95 backdrop-blur-md">
      <nav className="flex h-full items-center gap-1 px-4">
        <div className="mr-4 flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight text-atom-accent">
            ⚛ AtomCode
          </span>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto">
          {sections.map((section) => {
            const isActive = section.id === activeSectionId;
            const isDisabled = !section.enabled;

            return (
              <button
                key={section.id}
                type="button"
                disabled={isDisabled}
                onClick={() => !isDisabled && onSectionChange(section.id)}
                className={[
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-all whitespace-nowrap",
                  isActive
                    ? "bg-atom-accent/15 text-atom-accent"
                    : isDisabled
                      ? "cursor-not-allowed text-atom-muted/40"
                      : "text-atom-muted hover:bg-atom-card hover:text-atom-text",
                ].join(" ")}
              >
                {section.name}
              </button>
            );
          })}

          <button
            type="button"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-atom-muted transition-all hover:bg-atom-card hover:text-atom-text whitespace-nowrap"
          >
            About
          </button>
        </div>
      </nav>
    </header>
  );
}