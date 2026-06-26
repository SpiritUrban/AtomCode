"use client";

import { useMemo } from "react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";

hljs.registerLanguage("javascript", javascript);

type CodeBlockProps = {
  code: string;
  onCopy: () => void;
  copied: boolean;
};

export default function CodeBlock({ code, onCopy, copied }: CodeBlockProps) {
  const highlighted = useMemo(() => {
    try {
      return hljs.highlight(code, { language: "javascript" }).value;
    } catch {
      return hljs.highlightAuto(code).value;
    }
  }, [code]);

  return (
    <div className="relative">
      <div className="absolute right-2 top-2 z-10">
        <button
          type="button"
          onClick={onCopy}
          className="rounded-md bg-atom-bg/80 px-2 py-1 text-xs font-medium text-atom-muted transition-colors hover:text-atom-accent"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="code-block overflow-x-auto rounded-xl border border-atom-border bg-[#0d1117] p-4 text-sm leading-relaxed">
        <code
          className="hljs font-mono"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  );
}