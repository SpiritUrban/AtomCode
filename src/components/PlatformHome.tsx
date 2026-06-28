import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
import { learningTracks, type LearningTrack } from "@/lib/learningTracks";
import {
  getBasePath,
  getSectionSlug,
  lessonPath,
} from "@/lib/routes";
import { getSiteUrl } from "@/lib/seo";
import type { Section } from "@/types/lesson";
import GlobalSearch, {
  type GlobalSearchItem,
} from "@/components/GlobalSearch";
import PlatformNav from "@/components/PlatformNav";

const text = {
  en: {
    eyebrow: "Atomic knowledge ecosystem",
    title: "The developer stack, mapped into atoms",
    subtitle:
      "AtomCode is a connected knowledge base for modern development. Learn one small concept at a time, then see how it joins the wider system.",
    explore: "Explore knowledge tracks",
    tracks: "learning tracks",
    available: "available now",
    lessons: "published lessons",
    languages: "languages",
    atlas: "Technology atlas",
    atlasDescription:
      "Each track is an independent knowledge map. Together they form a path through the modern developer stack.",
    availableStatus: "Available",
    soonStatus: "Coming soon",
    open: "Open track",
    connections: "How the knowledge connects",
    connectionsDescription:
      "The path is not a strict ladder. It is a dependency map: each layer gives the next one more meaning.",
    foundation: "Foundation",
    language: "Language",
    workflow: "Workflow",
    architecture: "Architecture",
    runtime: "Runtime",
    system: "System",
    latest: "Newly published atoms",
    latestDescription: "Recently available lessons across the AtomCode ecosystem.",
    footer:
      "A growing knowledge system for the full modern developer stack.",
    developer: "Developer & mentor",
  },
  uk: {
    eyebrow: "Екосистема атомарних знань",
    title: "Стек розробника, розкладений на атоми",
    subtitle:
      "AtomCode — пов’язана база знань про сучасну розробку. Вивчай по одному невеликому поняттю й бач, як воно стає частиною більшої системи.",
    explore: "Переглянути напрямки",
    tracks: "напрямків навчання",
    available: "доступно зараз",
    lessons: "опублікованих уроків",
    languages: "мови",
    atlas: "Атлас технологій",
    atlasDescription:
      "Кожен напрямок — окрема карта знань. Разом вони утворюють шлях через увесь сучасний стек розробника.",
    availableStatus: "Доступно",
    soonStatus: "Скоро",
    open: "Відкрити напрямок",
    connections: "Як знання пов’язані між собою",
    connectionsDescription:
      "Це не сувора драбина, а карта залежностей: кожен шар додає сенсу наступному.",
    foundation: "Основа",
    language: "Мова",
    workflow: "Процес",
    architecture: "Архітектура",
    runtime: "Середовище",
    system: "Система",
    latest: "Нові опубліковані атоми",
    latestDescription: "Нещодавно доступні уроки в екосистемі AtomCode.",
    footer:
      "База знань, що поступово охоплює весь стек сучасного розробника.",
    developer: "Розробник і ментор",
  },
} as const;

const accentClasses: Record<
  LearningTrack["accent"],
  { border: string; text: string; glow: string; dot: string }
> = {
  emerald: {
    border: "hover:border-emerald-400/50",
    text: "text-emerald-300",
    glow: "group-hover:shadow-[0_0_35px_rgba(52,211,153,0.08)]",
    dot: "bg-emerald-300",
  },
  sky: {
    border: "hover:border-sky-400/50",
    text: "text-sky-300",
    glow: "group-hover:shadow-[0_0_35px_rgba(56,189,248,0.08)]",
    dot: "bg-sky-300",
  },
  orange: {
    border: "hover:border-orange-400/50",
    text: "text-orange-300",
    glow: "group-hover:shadow-[0_0_35px_rgba(251,146,60,0.08)]",
    dot: "bg-orange-300",
  },
  violet: {
    border: "hover:border-violet-400/50",
    text: "text-violet-300",
    glow: "group-hover:shadow-[0_0_35px_rgba(167,139,250,0.08)]",
    dot: "bg-violet-300",
  },
  blue: {
    border: "hover:border-blue-400/50",
    text: "text-blue-300",
    glow: "group-hover:shadow-[0_0_35px_rgba(96,165,250,0.08)]",
    dot: "bg-blue-300",
  },
  cyan: {
    border: "hover:border-cyan-400/50",
    text: "text-cyan-300",
    glow: "group-hover:shadow-[0_0_35px_rgba(34,211,238,0.08)]",
    dot: "bg-cyan-300",
  },
  lime: {
    border: "hover:border-lime-400/50",
    text: "text-lime-300",
    glow: "group-hover:shadow-[0_0_35px_rgba(163,230,53,0.08)]",
    dot: "bg-lime-300",
  },
  amber: {
    border: "hover:border-amber-400/50",
    text: "text-amber-300",
    glow: "group-hover:shadow-[0_0_35px_rgba(251,191,36,0.08)]",
    dot: "bg-amber-300",
  },
};

export default function PlatformHome({
  locale,
  sections,
}: {
  locale: Locale;
  sections: Section[];
}) {
  const copy = text[locale];
  const sectionById = new Map(sections.map((section) => [section.id, section]));
  const totalLessons = sections.reduce(
    (total, section) => total + section.lessons.length,
    0,
  );
  const availableTracks = learningTracks.filter((track) => {
    const section = sectionById.get(track.sectionId);
    return track.status === "available" && Boolean(section?.lessons.length);
  }).length;
  const allLessons = sections.flatMap((section) =>
    section.lessons.map((lesson) => ({ section, lesson })),
  );
  const latestLessons = allLessons.slice(-6).reverse();
  const searchItems: GlobalSearchItem[] = [
    ...learningTracks.map((track) => ({
      id: `track:${track.slug}`,
      type: "track" as const,
      title: track.name,
      subtitle: track.description[locale],
      trackName: track.technology,
      href: `/${locale}/${track.slug}/`,
      keywords: track.searchTerms,
      available: track.status === "available",
    })),
    ...allLessons.map(({ section, lesson }) => {
      const track = learningTracks.find(
        (candidate) => candidate.sectionId === section.id,
      );
      return {
        id: `lesson:${section.id}:${lesson.code}`,
        type: "lesson" as const,
        title: lesson.title,
        subtitle: lesson.subtitle,
        trackName: track?.name ?? section.name,
        href: lessonPath(locale, getSectionSlug(section.id), lesson.slug),
        keywords: [...lesson.tags, lesson.goal],
        available: true,
      };
    }),
  ];
  const graph = [
    { name: "HTML", role: copy.foundation, slug: "html-atoms" },
    { name: "CSS", role: copy.foundation, slug: "css-atoms" },
    { name: "JavaScript", role: copy.language, slug: "js-atoms" },
    { name: "Git", role: copy.workflow, slug: "git-atoms" },
    { name: "TypeScript", role: copy.architecture, slug: "ts-atoms" },
    { name: "React", role: copy.architecture, slug: "react-atoms" },
    { name: "Node.js", role: copy.runtime, slug: "node-atoms" },
    { name: "Linux", role: copy.system, slug: "linux-atoms" },
  ];
  const canonicalDescription =
    locale === "uk"
      ? "AtomCode — база знань з атомарних уроків про JavaScript, HTML, CSS, React, TypeScript, Node.js, Git і Linux."
      : "AtomCode is an atomic knowledge base for JavaScript, HTML, CSS, React, TypeScript, Node.js, Git and Linux.";
  const platformUrl = `${getSiteUrl()}${getBasePath()}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "AtomCode",
    "description": canonicalDescription,
    "url": `${platformUrl}/${locale}/`,
    "inLanguage": locale,
    "mainEntity": {
      "@type": "ItemList",
      "name":
        locale === "uk"
          ? "Напрямки навчання AtomCode"
          : "AtomCode learning tracks",
      "numberOfItems": learningTracks.length,
      "itemListElement": learningTracks.map((track, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": track.name,
        "url": `${platformUrl}/${locale}/${track.slug}/`,
      })),
    },
  };

  return (
    <main className="h-dvh overflow-y-auto overflow-x-hidden bg-atom-bg text-atom-text">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PlatformNav locale={locale} />

      <section className="relative isolate border-b border-atom-border/70">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/3 top-[-12rem] h-[34rem] w-[34rem] rounded-full bg-atom-accent/10 blur-[120px]" />
          <div className="absolute right-[-8rem] top-28 h-80 w-80 rounded-full bg-atom-accent2/10 blur-[110px]" />
          <div className="knowledge-grid absolute inset-0 opacity-35" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-atom-accent">
            {copy.eyebrow}
          </p>
          <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-atom-muted sm:text-lg">
            {copy.subtitle}
          </p>
          <a
            href="#technology-atlas"
            className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-xl border border-atom-accent/60 bg-atom-accent/10 px-5 py-3 text-sm font-semibold text-atom-accent shadow-[0_0_30px_rgba(110,231,183,0.12)] transition-all hover:-translate-y-0.5 hover:bg-atom-accent/20"
          >
            {copy.explore} <span aria-hidden>↓</span>
          </a>

          <div className="mt-12">
            <GlobalSearch locale={locale} items={searchItems} />
          </div>
        </div>
      </section>

      <section className="border-b border-atom-border/70 bg-atom-surface/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-atom-border/70 px-4 sm:px-6 md:grid-cols-4 md:divide-y-0 lg:px-8">
          {[
            [learningTracks.length, copy.tracks],
            [availableTracks, copy.available],
            [totalLessons, copy.lessons],
            [locales.length, copy.languages],
          ].map(([value, label]) => (
            <div key={label} className="px-4 py-6 text-center sm:py-8">
              <div className="font-mono text-2xl font-bold sm:text-3xl">
                {value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-atom-muted">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="technology-atlas"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-atom-accent">
          01 / ecosystem
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {copy.atlas}
        </h2>
        <p className="mt-3 max-w-3xl text-atom-muted">
          {copy.atlasDescription}
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {learningTracks.map((track) => {
            const section = sectionById.get(track.sectionId);
            const lessonCount = section?.lessons.length ?? 0;
            const available = track.status === "available" && lessonCount > 0;
            const colors = accentClasses[track.accent];
            return (
              <Link
                key={track.slug}
                href={`/${locale}/${track.slug}/`}
                className={`group relative flex min-h-72 flex-col overflow-hidden rounded-2xl border border-atom-border bg-atom-surface/70 p-6 transition-all ${colors.border} ${colors.glow}`}
              >
                <div className="absolute right-[-2rem] top-[-2rem] h-28 w-28 rounded-full bg-white/[0.025] blur-xl transition-transform group-hover:scale-125" />
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs ${colors.text}`}>
                    {String(track.order).padStart(2, "0")} / 08
                  </span>
                  <span
                    className={[
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider",
                      available
                        ? "bg-atom-accent/10 text-atom-accent"
                        : "bg-atom-muted/10 text-atom-muted",
                    ].join(" ")}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${available ? colors.dot : "bg-atom-muted/50"}`} />
                    {available ? copy.availableStatus : copy.soonStatus}
                  </span>
                </div>
                <h3 className="mt-7 text-2xl font-bold">{track.name}</h3>
                <p className={`mt-1 font-mono text-xs ${colors.text}`}>
                  {track.technology}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-atom-muted">
                  {track.description[locale]}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-atom-border/70 pt-4 text-xs">
                  <span className="text-atom-muted">
                    <strong className="font-mono text-atom-text">
                      {lessonCount}
                    </strong>{" "}
                    {copy.lessons}
                  </span>
                  <span className="font-semibold text-atom-accent opacity-70 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                    {copy.open} →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-atom-border/70 bg-atom-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-atom-accent">
            02 / dependency graph
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {copy.connections}
          </h2>
          <p className="mt-3 max-w-3xl text-atom-muted">
            {copy.connectionsDescription}
          </p>

          <div className="mt-12 overflow-x-auto pb-4">
            <div className="flex min-w-max items-center gap-2">
              {graph.map((node, index) => (
                <div key={node.slug} className="flex items-center gap-2">
                  <Link
                    href={`/${locale}/${node.slug}/`}
                    className="group relative w-36 rounded-xl border border-atom-border bg-atom-bg p-4 text-center transition-all hover:border-atom-accent/50"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-wider text-atom-muted">
                      {node.role}
                    </span>
                    <strong className="mt-2 block text-sm group-hover:text-atom-accent">
                      {node.name}
                    </strong>
                  </Link>
                  {index < graph.length - 1 && (
                    <span className="font-mono text-atom-accent/50" aria-hidden>
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {latestLessons.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-atom-accent">
            03 / recent nodes
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            {copy.latest}
          </h2>
          <p className="mt-3 text-atom-muted">{copy.latestDescription}</p>
          <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {latestLessons.map(({ section, lesson }) => {
              const track = learningTracks.find(
                (candidate) => candidate.sectionId === section.id,
              );
              return (
                <Link
                  key={`${section.id}:${lesson.code}`}
                  href={lessonPath(
                    locale,
                    getSectionSlug(section.id),
                    lesson.slug,
                  )}
                  className="group flex items-center gap-4 rounded-xl border border-atom-border bg-atom-surface/60 p-4 transition-all hover:border-atom-accent/40"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-atom-border bg-atom-bg font-mono text-[10px] text-atom-accent2">
                    {lesson.code.replace(/[A-Z]+-/, "")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">
                      {lesson.title}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-atom-muted">
                      {track?.name} · {lesson.subtitle}
                    </span>
                  </span>
                  <span className="text-atom-muted group-hover:text-atom-accent">
                    →
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <footer className="border-t border-atom-border/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-10 text-sm text-atom-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>{copy.footer}</p>
          <div className="flex flex-col gap-1 sm:items-end">
            <span className="font-mono text-xs text-atom-accent">
              8 tracks · 1 knowledge system
            </span>
            <span className="text-xs">
              {copy.developer}:{" "}
              <a
                href="https://spiriturban.github.io"
                rel="author"
                className="font-semibold text-atom-text transition-colors hover:text-atom-accent"
              >
                Spirit_Urban
              </a>
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
