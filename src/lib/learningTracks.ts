import type { Locale } from "@/lib/i18n";

export type TrackStatus = "available" | "coming-soon";

export type LearningTrack = {
  sectionId: string;
  slug: string;
  name: string;
  technology: string;
  status: TrackStatus;
  order: number;
  accent: "emerald" | "sky" | "orange" | "violet" | "blue" | "cyan" | "lime" | "amber";
  description: Record<Locale, string>;
  outcome: Record<Locale, string>;
  searchTerms: string[];
};

export const learningTracks: LearningTrack[] = [
  {
    sectionId: "htmlAtoms",
    slug: "html-atoms",
    name: "HTMLAtoms",
    technology: "HTML",
    status: "coming-soon",
    order: 1,
    accent: "orange",
    description: {
      en: "Document structure, semantic markup, forms and accessible web foundations.",
      uk: "Структура документів, семантична розмітка, форми та доступна основа вебу.",
    },
    outcome: {
      en: "Build meaningful web page structures.",
      uk: "Створюй змістовну структуру вебсторінок.",
    },
    searchTerms: ["html", "semantic html", "forms", "accessibility"],
  },
  {
    sectionId: "cssAtoms",
    slug: "css-atoms",
    name: "CSSAtoms",
    technology: "CSS",
    status: "coming-soon",
    order: 2,
    accent: "sky",
    description: {
      en: "Layout, responsive interfaces, the cascade, animation and visual systems.",
      uk: "Компонування, адаптивні інтерфейси, каскад, анімації та візуальні системи.",
    },
    outcome: {
      en: "Turn structured documents into responsive interfaces.",
      uk: "Перетворюй структуровані документи на адаптивні інтерфейси.",
    },
    searchTerms: ["css", "flexbox", "grid", "responsive design", "animation"],
  },
  {
    sectionId: "jsAtoms",
    slug: "js-atoms",
    name: "JSAtoms",
    technology: "JavaScript",
    status: "available",
    order: 3,
    accent: "amber",
    description: {
      en: "Language fundamentals, control flow, arrays, functions and browser logic.",
      uk: "Основи мови, керування потоком, масиви, функції та логіка браузера.",
    },
    outcome: {
      en: "Understand JavaScript from values to working systems.",
      uk: "Зрозумій JavaScript від значень до робочих систем.",
    },
    searchTerms: ["javascript", "js", "arrays", "functions", "programming"],
  },
  {
    sectionId: "gitAtoms",
    slug: "git-atoms",
    name: "GitAtoms",
    technology: "Git",
    status: "coming-soon",
    order: 4,
    accent: "emerald",
    description: {
      en: "Version control, commits, branches, collaboration and safe delivery workflows.",
      uk: "Контроль версій, коміти, гілки, співпраця та безпечні процеси доставки.",
    },
    outcome: {
      en: "Track changes and collaborate without losing work.",
      uk: "Контролюй зміни та працюй у команді без втрати роботи.",
    },
    searchTerms: ["git", "github", "commits", "branches", "version control"],
  },
  {
    sectionId: "tsAtoms",
    slug: "ts-atoms",
    name: "TSAtoms",
    technology: "TypeScript",
    status: "coming-soon",
    order: 5,
    accent: "blue",
    description: {
      en: "Types, inference, generics and safer architecture for JavaScript applications.",
      uk: "Типи, виведення типів, generics і надійна архітектура JavaScript-застосунків.",
    },
    outcome: {
      en: "Build JavaScript systems with explicit, verifiable contracts.",
      uk: "Створюй JavaScript-системи з явними та перевірними контрактами.",
    },
    searchTerms: ["typescript", "types", "generics", "type safety"],
  },
  {
    sectionId: "reactAtoms",
    slug: "react-atoms",
    name: "ReactAtoms",
    technology: "React",
    status: "coming-soon",
    order: 6,
    accent: "cyan",
    description: {
      en: "Components, state, hooks and scalable user interface architecture.",
      uk: "Компоненти, стан, хуки та масштабована архітектура інтерфейсів.",
    },
    outcome: {
      en: "Compose interactive interfaces from predictable components.",
      uk: "Збирай інтерактивні інтерфейси з передбачуваних компонентів.",
    },
    searchTerms: ["react", "components", "hooks", "useState", "frontend"],
  },
  {
    sectionId: "nodeAtoms",
    slug: "node-atoms",
    name: "NodeAtoms",
    technology: "Node.js",
    status: "coming-soon",
    order: 7,
    accent: "lime",
    description: {
      en: "Server-side JavaScript, APIs, files, processes and backend foundations.",
      uk: "Серверний JavaScript, API, файли, процеси та основи бекенду.",
    },
    outcome: {
      en: "Move JavaScript beyond the browser and build services.",
      uk: "Виводь JavaScript за межі браузера та створюй сервіси.",
    },
    searchTerms: ["node.js", "node", "backend", "api", "server"],
  },
  {
    sectionId: "linuxAtoms",
    slug: "linux-atoms",
    name: "LinuxAtoms",
    technology: "Linux",
    status: "coming-soon",
    order: 8,
    accent: "violet",
    description: {
      en: "Terminal, files, permissions, processes and the environment developers work in.",
      uk: "Термінал, файли, дозволи, процеси та середовище роботи розробника.",
    },
    outcome: {
      en: "Navigate and control a modern development environment.",
      uk: "Орієнтуйся та керуй сучасним середовищем розробки.",
    },
    searchTerms: ["linux", "terminal", "shell", "permissions", "processes"],
  },
];

export function getLearningTrackBySlug(slug: string): LearningTrack | undefined {
  return learningTracks.find((track) => track.slug === slug);
}

export function getLearningTrackBySectionId(
  sectionId: string,
): LearningTrack | undefined {
  return learningTracks.find((track) => track.sectionId === sectionId);
}
