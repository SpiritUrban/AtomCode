"use client";

import type { Lesson } from "@/types/lesson";
import { difficultyLabel } from "@/types/lesson";
import CodeBlock from "@/components/CodeBlock";
import QuizBlock from "@/components/QuizBlock";
import LessonControls from "@/components/LessonControls";
import ResourcesPanel from "@/components/ResourcesPanel";

type LessonContentProps = {
  lesson: Lesson;
  onPrevious: () => void;
  onNext: () => void;
  onMarkLearned: () => void;
  onCopyCode: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  isLearned: boolean;
  copied: boolean;
};

export default function LessonContent({
  lesson,
  onPrevious,
  onNext,
  onMarkLearned,
  onCopyCode,
  hasPrevious,
  hasNext,
  isLearned,
  copied,
}: LessonContentProps) {
  return (
    <div
      id="lesson-content-scroll"
      className="flex h-auto w-full flex-col overflow-visible p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-5 lg:h-full lg:overflow-y-auto lg:overscroll-contain lg:p-6"
    >
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-atom-accent/15 px-2 py-0.5 text-xs font-medium text-atom-accent">
          {difficultyLabel[lesson.difficulty]}
        </span>
        <span className="text-xs text-atom-muted">{lesson.duration}</span>
        {lesson.estimatedReadingTime && (
          <span className="text-xs text-atom-muted">
            ~{lesson.estimatedReadingTime} min read
          </span>
        )}
        {lesson.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-atom-card px-2 py-0.5 text-xs text-atom-muted"
          >
            #{tag}
          </span>
        ))}
      </div>

      <h1 className="break-words font-display text-2xl font-bold tracking-tight text-atom-text sm:text-3xl">
        {lesson.title}
      </h1>
      <p className="mt-1 text-sm text-atom-muted">{lesson.subtitle}</p>

      <div className="mt-5 space-y-4">
        <section>
          <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-atom-accent">
            Goal
          </h2>
          <p className="text-sm leading-relaxed text-atom-text">{lesson.goal}</p>
        </section>

        <section>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-atom-accent">
            Explanation
          </h2>
          <ul className="space-y-2">
            {lesson.explanation.map((line) => (
              <li key={line} className="flex gap-2 text-sm leading-relaxed text-atom-text">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-atom-accent" />
                {line}
              </li>
            ))}
          </ul>
        </section>

        {lesson.analogy && (
          <section className="rounded-xl border border-atom-warning/30 bg-atom-warning/5 p-4">
            <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-atom-warning">
              {lesson.analogy.title}
            </h2>
            <p className="text-sm leading-relaxed text-atom-text">{lesson.analogy.text}</p>
          </section>
        )}

        {lesson.codeExample && (
          <section>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-atom-accent2">
              Code
            </h2>
            <CodeBlock code={lesson.codeExample} onCopy={onCopyCode} copied={copied} />
            {lesson.result && (
              <p className="mt-2 text-xs text-atom-muted">
                <span className="font-semibold text-atom-accent2">Result: </span>
                <span className="whitespace-pre-line">{lesson.result}</span>
              </p>
            )}
          </section>
        )}

        {lesson.mistake && (
          <section className="rounded-xl border border-red-400/20 bg-red-400/5 p-4">
            <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-red-400">
              {lesson.mistake.title}
            </h2>
            <p className="text-sm leading-relaxed text-atom-text">{lesson.mistake.text}</p>
          </section>
        )}

        <section>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-atom-accent">
            Remember
          </h2>
          <ul className="space-y-1">
            {lesson.remember.map((item) => (
              <li key={item} className="text-sm text-atom-muted">
                ✦ {item}
              </li>
            ))}
          </ul>
        </section>

        {lesson.quiz && (
          <QuizBlock
            question={lesson.quiz.question}
            options={lesson.quiz.options}
            answer={lesson.quiz.answer}
          />
        )}

        <ResourcesPanel resources={lesson.resources ?? []} />
      </div>

      <LessonControls
        onPrevious={onPrevious}
        onNext={onNext}
        onMarkLearned={onMarkLearned}
        onCopyCode={onCopyCode}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
        isLearned={isLearned}
        copied={copied}
        hasCode={!!lesson.codeExample}
        hasPlayground={!!lesson.playground}
      />
    </div>
  );
}
