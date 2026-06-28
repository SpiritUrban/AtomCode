import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { LearningTrack } from "@/lib/learningTracks";
import { lessonPath } from "@/lib/routes";
import type { Section } from "@/types/lesson";
import PlatformNav from "@/components/PlatformNav";

const copy = {
  en: {
    available: "Available",
    soon: "Coming soon",
    lessons: "lessons",
    topics: "topics",
    start: "Start this track",
    map: "Knowledge map",
    mapDescription:
      "Lessons are arranged as connected nodes. Follow them in order or jump directly to a concept.",
    planned: "Planned knowledge nodes",
    plannedDescription:
      "This hub is already part of the AtomCode architecture. Lessons will appear here as the track grows.",
    ecosystem: "Other learning tracks",
    back: "All AtomCode tracks",
    progress:
      "Progress tracking and last-lesson recovery will attach to this track without changing its URLs.",
  },
  uk: {
    available: "Доступно",
    soon: "Скоро",
    lessons: "уроків",
    topics: "тем",
    start: "Почати напрямок",
    map: "Карта знань",
    mapDescription:
      "Уроки розташовані як пов’язані вузли. Проходь їх послідовно або переходь одразу до потрібного поняття.",
    planned: "Заплановані вузли знань",
    plannedDescription:
      "Цей хаб уже є частиною архітектури AtomCode. Уроки з’являтимуться тут у міру розвитку напрямку.",
    ecosystem: "Інші напрямки навчання",
    back: "Усі напрямки AtomCode",
    progress:
      "Прогрес і повернення до останнього уроку підключатимуться до цього напрямку без зміни його URL.",
  },
} as const;

export default function TrackHub({
  locale,
  track,
  section,
}: {
  locale: Locale;
  track: LearningTrack;
  section: Section;
}) {
  const text = copy[locale];
  const groups = section.lessonGroups.filter((group) => group.lessons.length);
  const available = section.lessons.length > 0;
  const sectionSlug = track.slug;

  return (
    <main className="h-dvh overflow-y-auto overflow-x-hidden bg-atom-bg text-atom-text">
      <PlatformNav locale={locale} activeTrackSlug={track.slug} />

      <section className="relative isolate border-b border-atom-border/70">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="knowledge-grid absolute inset-0 opacity-30" />
          <div className="absolute left-1/3 top-[-12rem] h-[30rem] w-[30rem] rounded-full bg-atom-accent/10 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Link
            href={`/${locale}/`}
            className="font-mono text-xs uppercase tracking-[0.18em] text-atom-muted hover:text-atom-accent"
          >
            ← {text.back}
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-atom-accent">
                  Track {String(track.order).padStart(2, "0")} / 08
                </span>
                <span
                  className={[
                    "rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider",
                    available
                      ? "bg-atom-accent/10 text-atom-accent"
                      : "bg-atom-muted/10 text-atom-muted",
                  ].join(" ")}
                >
                  {available ? text.available : text.soon}
                </span>
              </div>
              <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">
                {track.name}
              </h1>
              <p className="mt-2 font-mono text-sm text-atom-accent2">
                {track.technology}
              </p>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-atom-muted sm:text-lg">
                {track.description[locale]}
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-atom-text">
                {track.outcome[locale]}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Stat value={section.lessons.length} label={text.lessons} />
              <Stat value={groups.length} label={text.topics} />
            </div>
          </div>
          {available && (
            <Link
              href={lessonPath(
                locale,
                sectionSlug,
                section.lessons[0].slug,
              )}
              className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-xl border border-atom-accent/60 bg-atom-accent/10 px-5 py-3 text-sm font-semibold text-atom-accent transition-all hover:bg-atom-accent/20"
            >
              {text.start} →
            </Link>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-atom-accent">
          01 / {available ? "roadmap" : "planned"}
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight">
          {available ? text.map : text.planned}
        </h2>
        <p className="mt-3 max-w-3xl text-atom-muted">
          {available ? text.mapDescription : text.plannedDescription}
        </p>

        {available ? (
          <div className="mt-10 space-y-5">
            {groups.map((group, groupIndex) => (
              <article
                key={group.id}
                className="rounded-2xl border border-atom-border bg-atom-surface/70 p-5 sm:p-7"
              >
                <div className="flex items-center gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-atom-accent/40 bg-atom-bg font-mono text-xs text-atom-accent">
                    {String(groupIndex + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold">{group.label.replace(/^\d+\.\s*/, "")}</h3>
                    <p className="mt-0.5 text-xs text-atom-muted">
                      {group.lessons.length} {text.lessons}
                    </p>
                  </div>
                </div>
                <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {group.lessons.map((lesson) => (
                    <Link
                      key={lesson.code}
                      href={lessonPath(locale, sectionSlug, lesson.slug)}
                      className="group flex items-center gap-3 rounded-xl border border-atom-border bg-atom-card/60 p-3 transition-all hover:border-atom-accent/40"
                    >
                      <span className="font-mono text-[9px] text-atom-accent2">
                        {lesson.code}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm text-atom-muted group-hover:text-atom-text">
                        {lesson.title}
                      </span>
                      <span className="text-atom-muted group-hover:text-atom-accent">→</span>
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {track.searchTerms.map((term, index) => (
              <div
                key={term}
                className="rounded-xl border border-dashed border-atom-border bg-atom-surface/40 p-5"
              >
                <span className="font-mono text-[9px] text-atom-accent2/70">
                  NODE {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-semibold capitalize text-atom-muted">
                  {term}
                </h3>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="border-y border-atom-border/70 bg-atom-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-atom-accent">
            02 / progress architecture
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-atom-muted">
            {text.progress}
          </p>
        </div>
      </section>
    </main>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="min-w-28 rounded-xl border border-atom-border bg-atom-surface/80 p-4 text-center">
      <div className="font-mono text-2xl font-bold">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-wider text-atom-muted">
        {label}
      </div>
    </div>
  );
}
