"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export type GlobalSearchItem = {
  id: string;
  type: "track" | "lesson";
  title: string;
  subtitle: string;
  trackName: string;
  href: string;
  keywords: string[];
  available: boolean;
};

export default function GlobalSearch({
  locale,
  items,
}: {
  locale: Locale;
  items: GlobalSearchItem[];
}) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase(locale);
  const results = useMemo(() => {
    if (!normalizedQuery) return [];
    return items
      .map((item) => {
        const haystack = [
          item.title,
          item.subtitle,
          item.trackName,
          ...item.keywords,
        ]
          .join(" ")
          .toLocaleLowerCase(locale);
        const exactTitle = item.title.toLocaleLowerCase(locale) === normalizedQuery;
        const startsTitle = item.title
          .toLocaleLowerCase(locale)
          .startsWith(normalizedQuery);
        return {
          item,
          score: exactTitle ? 3 : startsTitle ? 2 : haystack.includes(normalizedQuery) ? 1 : 0,
        };
      })
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score || Number(b.item.available) - Number(a.item.available))
      .slice(0, 10)
      .map((result) => result.item);
  }, [items, locale, normalizedQuery]);

  const labels =
    locale === "uk"
      ? {
          label: "Пошук по всій базі знань",
          placeholder: "Наприклад: array, useState, flexbox…",
          empty: "Нічого не знайдено. Спробуй інший термін.",
          soon: "Скоро",
          lesson: "Урок",
          direction: "Напрямок",
        }
      : {
          label: "Search the entire knowledge base",
          placeholder: "Try: array, useState, flexbox…",
          empty: "No matching knowledge nodes. Try another term.",
          soon: "Soon",
          lesson: "Lesson",
          direction: "Track",
        };

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <label
        htmlFor="global-knowledge-search"
        className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-atom-muted"
      >
        {labels.label}
      </label>
      <div className="relative">
        <span
          aria-hidden
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-atom-accent"
        >
          ⌕
        </span>
        <input
          id="global-knowledge-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={labels.placeholder}
          autoComplete="off"
          className="h-14 w-full rounded-xl border border-atom-border bg-atom-surface/90 pl-11 pr-4 text-sm text-atom-text outline-none transition-all placeholder:text-atom-muted/60 focus:border-atom-accent/60 focus:shadow-[0_0_30px_rgba(110,231,183,0.08)]"
        />
      </div>

      {normalizedQuery && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 max-h-[24rem] overflow-y-auto rounded-xl border border-atom-border bg-atom-surface p-2 shadow-2xl">
          {results.length ? (
            results.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-atom-card"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-atom-border bg-atom-bg font-mono text-[10px] text-atom-accent2">
                  {item.type === "lesson" ? "L" : "T"}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold text-atom-text">
                      {item.title}
                    </span>
                    {!item.available && (
                      <span className="rounded-full bg-atom-muted/10 px-2 py-0.5 text-[9px] uppercase tracking-wider text-atom-muted">
                        {labels.soon}
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-atom-muted">
                    {item.trackName} · {item.type === "lesson" ? labels.lesson : labels.direction}
                    {item.subtitle ? ` · ${item.subtitle}` : ""}
                  </span>
                </span>
                <span className="text-atom-muted group-hover:text-atom-accent">→</span>
              </Link>
            ))
          ) : (
            <p className="px-3 py-5 text-center text-sm text-atom-muted">
              {labels.empty}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
