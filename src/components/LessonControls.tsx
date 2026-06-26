"use client";

type LessonControlsProps = {
  onPrevious: () => void;
  onNext: () => void;
  onMarkLearned: () => void;
  onCopyCode: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  isLearned: boolean;
  copied: boolean;
};

export default function LessonControls({
  onPrevious,
  onNext,
  onMarkLearned,
  onCopyCode,
  hasPrevious,
  hasNext,
  isLearned,
  copied,
}: LessonControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 pt-4">
      <button
        type="button"
        onClick={onPrevious}
        disabled={!hasPrevious}
        className="rounded-lg border border-atom-border bg-atom-card px-4 py-2 text-sm font-medium text-atom-text transition-all hover:border-atom-accent/50 disabled:cursor-not-allowed disabled:opacity-30"
      >
        ← Previous
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!hasNext}
        className="rounded-lg border border-atom-border bg-atom-card px-4 py-2 text-sm font-medium text-atom-text transition-all hover:border-atom-accent/50 disabled:cursor-not-allowed disabled:opacity-30"
      >
        Next →
      </button>
      <button
        type="button"
        onClick={onMarkLearned}
        className={[
          "rounded-lg px-4 py-2 text-sm font-medium transition-all",
          isLearned
            ? "border border-atom-accent bg-atom-accent/20 text-atom-accent"
            : "border border-atom-border bg-atom-card text-atom-text hover:border-atom-accent/50",
        ].join(" ")}
      >
        {isLearned ? "✓ Learned" : "Mark as learned"}
      </button>
      <button
        type="button"
        onClick={onCopyCode}
        className="rounded-lg border border-atom-border bg-atom-card px-4 py-2 text-sm font-medium text-atom-text transition-all hover:border-atom-accent2/50"
      >
        {copied ? "Copied!" : "Copy code"}
      </button>
    </div>
  );
}