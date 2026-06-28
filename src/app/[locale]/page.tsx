import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildSections } from "@/lib/loadContent";
import { isValidLocale, locales, type Locale } from "@/lib/i18n";
import { buildHomeMetadata, getSiteUrl } from "@/lib/seo";
import {
  getBasePath,
  getDefaultLessonPath,
  getSectionSlug,
  lessonPath,
} from "@/lib/routes";
import type { Lesson, LessonGroup } from "@/types/lesson";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildHomeMetadata(isValidLocale(locale) ? locale : "en");
}

const copy = {
  en: {
    eyebrow: "JavaScript knowledge map",
    title: "JavaScript from atoms to systems",
    subtitle:
      "Short lessons that gradually assemble into a complete picture of JavaScript.",
    start: "Start learning",
    map: "Course map",
    mapDescription:
      "Follow the nodes in order or open the topic you need right now.",
    lessons: "lessons",
    topics: "topics",
    languages: "languages",
    levels: "difficulty levels",
    level: "difficulty level",
    popular: "Popular lessons",
    popularDescription: "Useful entry points into the JavaScript knowledge map.",
    latest: "Latest lessons",
    latestDescription: "The newest available nodes in the course sequence.",
    openTopic: "Open topic",
    lesson: "Lesson",
    footer:
      "AtomCode is a structured JavaScript knowledge base built from short, connected lessons.",
  },
  uk: {
    eyebrow: "Карта знань JavaScript",
    title: "JavaScript від атомів до систем",
    subtitle:
      "Короткі уроки, які поступово збираються у повну картину JavaScript.",
    start: "Почати навчання",
    map: "Карта курсу",
    mapDescription:
      "Рухайся вузлами послідовно або відкрий тему, яка потрібна зараз.",
    lessons: "уроків",
    topics: "тем",
    languages: "мови",
    levels: "рівні складності",
    level: "рівень складності",
    popular: "Популярні уроки",
    popularDescription: "Зручні точки входу до карти знань JavaScript.",
    latest: "Останні уроки",
    latestDescription: "Найновіші доступні вузли у послідовності курсу.",
    openTopic: "Відкрити тему",
    lesson: "Урок",
    footer:
      "AtomCode — структурована база знань JavaScript із коротких взаємопов’язаних уроків.",
  },
} as const;

const groupNames: Record<string, Record<Locale, string>> = {
  "data-core": { en: "Data foundations", uk: "Основи даних" },
  "expressions-operators": {
    en: "Expressions & operators",
    uk: "Вирази та оператори",
  },
  "comparisons-logic": {
    en: "Comparisons & logic",
    uk: "Порівняння та логіка",
  },
  "control-flow": { en: "Control flow", uk: "Керування потоком" },
  collections: { en: "Arrays & collections", uk: "Масиви та колекції" },
  functions: { en: "Functions", uk: "Функції" },
  "scope-memory": { en: "Scope & memory", uk: "Область видимості та пам’ять" },
  "objects-deep-dive": { en: "Objects", uk: "Об’єкти" },
  "dom-basics": { en: "DOM basics", uk: "Основи DOM" },
  events: { en: "Events", uk: "Події" },
  "async-javascript": { en: "Async JavaScript", uk: "Асинхронний JavaScript" },
  modules: { en: "Modules", uk: "Модулі" },
  "browser-apis": { en: "Browser APIs", uk: "Браузерні API" },
  "error-handling": { en: "Error handling", uk: "Обробка помилок" },
  "practice-atoms": { en: "Practice", uk: "Практика" },
};

function groupName(group: LessonGroup, locale: Locale): string {
  return groupNames[group.id]?.[locale] ?? group.label.replace(/^\d+\.\s*/, "");
}

export default async function LocaleHomePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();

  const locale = localeParam;
  const text = copy[locale];
  const sections = buildSections(locale);
  const activeSection = sections.find((section) => section.enabled);
  if (!activeSection) notFound();

  const sectionSlug = getSectionSlug(activeSection.id);
  const lessons = activeSection.lessons;
  const groups = activeSection.lessonGroups.filter((group) => group.lessons.length);
  const difficultyCount = new Set(lessons.map((lesson) => lesson.difficulty)).size;
  const popularSlugs = ["variables", "primitive-types", "array", "array-map"];
  const popularLessons = popularSlugs
    .map((slug) => lessons.find((lesson) => lesson.slug === slug))
    .filter((lesson): lesson is Lesson => Boolean(lesson));
  const latestLessons = lessons.slice(-6).reverse();
  const startPath = getDefaultLessonPath(sections, locale);
  const canonical = `${getSiteUrl()}${getBasePath()}/${locale}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": text.title,
    "description": text.subtitle,
    "url": canonical,
    "inLanguage": locale,
    "isPartOf": {
      "@type": "WebSite",
      "name": "AtomCode",
      "url": `${getSiteUrl()}${getBasePath()}/`,
    },
    "mainEntity": {
      "@type": "Course",
      "name": locale === "uk" ? "Безкоштовний курс JavaScript" : "Free JavaScript course",
      "description": text.subtitle,
      "provider": { "@type": "Organization", "name": "AtomCode" },
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "online",
        "inLanguage": locale,
      },
    },
  };

  return (
    <main className="h-dvh overflow-y-auto overflow-x-hidden bg-atom-bg text-atom-text">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="sticky top-0 z-50 border-b border-atom-border/80 bg-atom-bg/90 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <Link href={`/${locale}/`} className="text-lg font-bold text-atom-accent">
            ⚛ AtomCode
          </Link>
          <span className="ml-3 hidden border-l border-atom-border pl-3 text-xs uppercase tracking-[0.18em] text-atom-muted sm:block">
            JavaScript knowledge base
          </span>
          <div className="ml-auto flex items-center gap-1 rounded-lg border border-atom-border bg-atom-card p-1">
            {locales.map((language) => (
              <Link
                key={language}
                href={`/${language}/`}
                hrefLang={language}
                className={[
                  "rounded-md px-2.5 py-1 text-xs font-semibold transition-colors",
                  language === locale
                    ? "bg-atom-accent/20 text-atom-accent"
                    : "text-atom-muted hover:text-atom-text",
                ].join(" ")}
              >
                {language === "uk" ? "UA" : "EN"}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <section className="relative isolate border-b border-atom-border/70">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-[-10rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-atom-accent/10 blur-[100px]" />
          <div className="absolute right-[-8rem] top-24 h-72 w-72 rounded-full bg-atom-accent2/10 blur-[100px]" />
          <div className="knowledge-grid absolute inset-0 opacity-30" />
        </div>
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.25fr_0.75fr] lg:px-8 lg:py-28">
          <div>
            <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.24em] text-atom-accent">
              {text.eyebrow}
            </p>
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              {text.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-atom-muted sm:text-lg">
              {text.subtitle}
            </p>
            <Link
              href={startPath}
              className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-xl border border-atom-accent/60 bg-atom-accent/10 px-5 py-3 text-sm font-semibold text-atom-accent shadow-[0_0_30px_rgba(110,231,183,0.12)] transition-all hover:-translate-y-0.5 hover:bg-atom-accent/20"
            >
              {text.start} <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[22rem]">
            <div className="absolute inset-[12%] rounded-full border border-atom-accent/20 shadow-[0_0_60px_rgba(110,231,183,0.1)]" />
            <div className="absolute inset-[28%] grid place-items-center rounded-full border border-atom-accent/50 bg-atom-surface text-center shadow-[0_0_40px_rgba(110,231,183,0.16)]">
              <div>
                <div className="font-mono text-3xl font-bold text-atom-accent">JS</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-atom-muted">Core</div>
              </div>
            </div>
            {groups.slice(0, 5).map((group, index) => {
              const positions = [
                "left-1/2 top-0 -translate-x-1/2",
                "right-0 top-[30%]",
                "bottom-[5%] right-[12%]",
                "bottom-[5%] left-[12%]",
                "left-0 top-[30%]",
              ];
              return (
                <div
                  key={group.id}
                  className={`absolute ${positions[index]} grid h-12 w-12 place-items-center rounded-xl border border-atom-border bg-atom-card font-mono text-xs font-bold text-atom-accent2 shadow-lg`}
                  title={groupName(group, locale)}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-atom-border/70 bg-atom-surface/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-atom-border/70 px-4 sm:px-6 md:grid-cols-4 md:divide-y-0 lg:px-8">
          {[
            [lessons.length, text.lessons],
            [groups.length, text.topics],
            [locales.length, text.languages],
            [difficultyCount, difficultyCount === 1 ? text.level : text.levels],
          ].map(([value, label]) => (
            <div key={label} className="px-4 py-6 text-center sm:py-8">
              <div className="font-mono text-2xl font-bold sm:text-3xl">{value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-atom-muted">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-atom-accent">01 / roadmap</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{text.map}</h2>
        <p className="mt-3 max-w-2xl text-atom-muted">{text.mapDescription}</p>

        <div className="relative mt-12 space-y-5 before:absolute before:bottom-8 before:left-6 before:top-8 before:w-px before:bg-gradient-to-b before:from-atom-accent/60 before:via-atom-accent2/40 before:to-transparent sm:before:left-8">
          {groups.map((group, groupIndex) => (
            <article
              key={group.id}
              className="group relative ml-12 rounded-2xl border border-atom-border bg-atom-surface/70 p-5 transition-all hover:border-atom-accent/40 hover:shadow-[0_0_35px_rgba(110,231,183,0.06)] sm:ml-16 sm:p-7"
            >
              <div className="absolute -left-[3.35rem] top-7 grid h-9 w-9 place-items-center rounded-full border border-atom-accent/50 bg-atom-bg font-mono text-[10px] font-bold text-atom-accent sm:-left-[4.45rem]">
                {String(groupIndex + 1).padStart(2, "0")}
              </div>
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-atom-muted">
                    {group.lessons.length} {text.lessons}
                  </p>
                  <h3 className="mt-1 text-xl font-bold">{groupName(group, locale)}</h3>
                </div>
                <Link
                  href={lessonPath(locale, sectionSlug, group.lessons[0].slug)}
                  className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-atom-accent hover:underline"
                >
                  {text.openTopic} →
                </Link>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.lessons.map((lesson) => (
                  <Link
                    key={lesson.code}
                    href={lessonPath(locale, sectionSlug, lesson.slug)}
                    className="rounded-lg border border-atom-border bg-atom-card/80 px-3 py-2 text-xs text-atom-muted transition-colors hover:border-atom-accent2/50 hover:text-atom-text"
                  >
                    <span className="mr-1.5 font-mono text-[9px] text-atom-accent2/70">
                      {lesson.code.replace("JS-", "")}
                    </span>
                    {lesson.title}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-atom-border/70 bg-atom-surface/40">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8">
          <LessonList
            eyebrow="02 / entry points"
            title={text.popular}
            description={text.popularDescription}
            lessons={popularLessons}
            locale={locale}
            sectionSlug={sectionSlug}
            lessonLabel={text.lesson}
          />
          <LessonList
            eyebrow="03 / newest nodes"
            title={text.latest}
            description={text.latestDescription}
            lessons={latestLessons}
            locale={locale}
            sectionSlug={sectionSlug}
            lessonLabel={text.lesson}
          />
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 text-sm text-atom-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="max-w-2xl">{text.footer}</p>
        <Link href={startPath} className="font-semibold text-atom-accent hover:underline">
          {text.start} →
        </Link>
      </footer>
    </main>
  );
}

function LessonList({
  eyebrow,
  title,
  description,
  lessons,
  locale,
  sectionSlug,
  lessonLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  lessons: Lesson[];
  locale: Locale;
  sectionSlug: string;
  lessonLabel: string;
}) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-atom-accent">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-bold">{title}</h2>
      <p className="mt-2 text-sm text-atom-muted">{description}</p>
      <ol className="mt-7 space-y-3">
        {lessons.map((lesson) => (
          <li key={lesson.code}>
            <Link
              href={lessonPath(locale, sectionSlug, lesson.slug)}
              className="group flex items-center gap-4 rounded-xl border border-atom-border bg-atom-card/60 p-4 transition-all hover:border-atom-accent/40 hover:bg-atom-card"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-atom-border bg-atom-bg font-mono text-[10px] text-atom-accent2">
                {lesson.code.replace("JS-", "")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold">{lesson.title}</span>
                <span className="mt-0.5 block truncate text-xs text-atom-muted">
                  {lessonLabel} · {lesson.subtitle}
                </span>
              </span>
              <span aria-hidden className="text-atom-muted transition-transform group-hover:translate-x-1 group-hover:text-atom-accent">→</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
