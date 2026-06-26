"use client";

import { useState } from "react";

type QuizBlockProps = {
  question: string;
  options: string[];
  answer: number;
};

export default function QuizBlock({ question, options, answer }: QuizBlockProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="rounded-xl border border-atom-accent2/30 bg-atom-accent2/5 p-4">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-atom-accent2">
        Quick Quiz
      </h3>
      <p className="mb-3 text-sm text-atom-text">{question}</p>
      <div className="flex flex-col gap-2">
        {options.map((option, index) => {
          const isSelected = selected === index;
          const isCorrect = selected !== null && index === answer;
          const isWrong = isSelected && index !== answer;

          return (
            <button
              key={option}
              type="button"
              onClick={() => setSelected(index)}
              className={[
                "rounded-lg border px-3 py-2 text-left text-sm transition-all",
                isCorrect
                  ? "border-atom-accent bg-atom-accent/15 text-atom-accent"
                  : isWrong
                    ? "border-red-400/50 bg-red-400/10 text-red-300"
                    : "border-atom-border bg-atom-card text-atom-muted hover:border-atom-accent2/50 hover:text-atom-text",
              ].join(" ")}
            >
              {option}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <p className="mt-3 text-xs text-atom-muted">
          {selected === answer
            ? "Correct! Great job."
            : `Not quite. The answer is: ${options[answer]}`}
        </p>
      )}
    </div>
  );
}