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
  hasCode: boolean;
  hasPlayground: boolean;
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
  hasCode,
  hasPlayground,
}: LessonControlsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 pt-4 sm:flex sm:flex-wrap sm:items-center">
      <button
        type="button"
        onClick={onPrevious}
        disabled={!hasPrevious}
        className="min-h-11 rounded-lg border border-atom-border bg-atom-card px-3 py-2 text-sm font-medium text-atom-text transition-all hover:border-atom-accent/50 disabled:cursor-not-allowed disabled:opacity-30 sm:px-4"
      >
        ← Previous
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!hasNext}
        className="min-h-11 rounded-lg border border-atom-border bg-atom-card px-3 py-2 text-sm font-medium text-atom-text transition-all hover:border-atom-accent/50 disabled:cursor-not-allowed disabled:opacity-30 sm:px-4"
      >
        Next →
      </button>
      <button
        type="button"
        onClick={onMarkLearned}
        className={[
          "col-span-2 min-h-11 rounded-lg px-3 py-2 text-sm font-medium transition-all sm:col-span-1 sm:px-4",
          isLearned
            ? "border border-atom-accent bg-atom-accent/20 text-atom-accent"
            : "border border-atom-border bg-atom-card text-atom-text hover:border-atom-accent/50",
        ].join(" ")}
      >
        {isLearned ? "✓ Learned" : "Mark as learned"}
      </button>
      {hasCode && (
        <button
          type="button"
          onClick={onCopyCode}
          className="min-h-11 rounded-lg border border-atom-border bg-atom-card px-3 py-2 text-sm font-medium text-atom-text transition-all hover:border-atom-accent2/50 sm:px-4"
        >
          {copied ? "Copied!" : "Copy code"}
        </button>
      )}
      {hasPlayground && (
        <button
          type="button"
          disabled
          title="Coming soon"
          className="min-h-11 rounded-lg border border-atom-accent2/30 bg-atom-accent2/10 px-3 py-2 text-sm font-medium text-atom-accent2 transition-all disabled:cursor-not-allowed disabled:opacity-60 sm:px-4"
        >
          Open Playground
        </button>
      )}
    </div>
  );
}
