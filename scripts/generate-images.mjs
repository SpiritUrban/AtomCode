import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "images", "js-atoms");
mkdirSync(outDir, { recursive: true });

const lessons = [
  {
    file: "js-001-variables.png",
    code: "JS-001",
    title: "Variables",
    emoji: "📦",
    color: "#6ee7b7",
    accent: "#818cf8",
    visual: `
      <rect x="60" y="120" width="120" height="90" rx="8" fill="#22263a" stroke="#6ee7b7" stroke-width="3"/>
      <text x="120" y="155" text-anchor="middle" fill="#6ee7b7" font-size="14" font-family="monospace">username</text>
      <text x="120" y="185" text-anchor="middle" fill="#e2e8f0" font-size="18" font-family="monospace">"Alex"</text>
      <rect x="220" y="120" width="120" height="90" rx="8" fill="#22263a" stroke="#818cf8" stroke-width="3"/>
      <text x="280" y="155" text-anchor="middle" fill="#818cf8" font-size="14" font-family="monospace">score</text>
      <text x="280" y="185" text-anchor="middle" fill="#e2e8f0" font-size="18" font-family="monospace">42</text>
      <text x="200" y="280" text-anchor="middle" fill="#94a3b8" font-size="13" font-family="sans-serif">let name = value</text>
    `,
  },
  {
    file: "js-002-let-vs-const.png",
    code: "JS-002",
    title: "let vs const",
    emoji: "📝",
    color: "#fbbf24",
    accent: "#6ee7b7",
    visual: `
      <rect x="40" y="110" width="150" height="110" rx="8" fill="#22263a" stroke="#fbbf24" stroke-width="3"/>
      <text x="115" y="145" text-anchor="middle" fill="#fbbf24" font-size="16" font-weight="bold" font-family="monospace">let</text>
      <text x="115" y="175" text-anchor="middle" fill="#e2e8f0" font-size="13" font-family="sans-serif">can change</text>
      <text x="115" y="200" text-anchor="middle" fill="#94a3b8" font-size="22" font-family="sans-serif">📝</text>
      <rect x="210" y="110" width="150" height="110" rx="8" fill="#22263a" stroke="#6ee7b7" stroke-width="3"/>
      <text x="285" y="145" text-anchor="middle" fill="#6ee7b7" font-size="16" font-weight="bold" font-family="monospace">const</text>
      <text x="285" y="175" text-anchor="middle" fill="#e2e8f0" font-size="13" font-family="sans-serif">stays fixed</text>
      <text x="285" y="200" text-anchor="middle" fill="#94a3b8" font-size="22" font-family="sans-serif">🔒</text>
    `,
  },
  {
    file: "js-003-primitive-types.png",
    code: "JS-003",
    title: "Primitive Types",
    emoji: "⚛",
    color: "#818cf8",
    accent: "#fbbf24",
    visual: `
      <circle cx="100" cy="170" r="35" fill="#22263a" stroke="#6ee7b7" stroke-width="2"/>
      <text x="100" y="168" text-anchor="middle" fill="#6ee7b7" font-size="11" font-family="monospace">string</text>
      <text x="100" y="183" text-anchor="middle" fill="#e2e8f0" font-size="10" font-family="sans-serif">"hi"</text>
      <circle cx="200" cy="170" r="35" fill="#22263a" stroke="#818cf8" stroke-width="2"/>
      <text x="200" y="168" text-anchor="middle" fill="#818cf8" font-size="11" font-family="monospace">number</text>
      <text x="200" y="183" text-anchor="middle" fill="#e2e8f0" font-size="10" font-family="sans-serif">42</text>
      <circle cx="300" cy="170" r="35" fill="#22263a" stroke="#fbbf24" stroke-width="2"/>
      <text x="300" y="168" text-anchor="middle" fill="#fbbf24" font-size="11" font-family="monospace">boolean</text>
      <text x="300" y="183" text-anchor="middle" fill="#e2e8f0" font-size="10" font-family="sans-serif">true</text>
      <text x="200" y="260" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">7 primitive building blocks</text>
    `,
  },
];

function svgToPngFilename(name) {
  return name.replace(".png", ".svg");
}

for (const lesson of lessons) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f1117"/>
      <stop offset="100%" style="stop-color:#1a1d27"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>
  <rect x="20" y="20" width="360" height="360" rx="16" fill="#22263a" stroke="${lesson.color}" stroke-width="2" stroke-dasharray="8 4"/>
  <text x="200" y="70" text-anchor="middle" fill="${lesson.color}" font-size="28" font-family="sans-serif">${lesson.emoji}</text>
  <text x="200" y="100" text-anchor="middle" fill="${lesson.color}" font-size="13" font-weight="bold" font-family="monospace">${lesson.code}</text>
  <text x="200" y="55" text-anchor="middle" fill="#e2e8f0" font-size="22" font-weight="bold" font-family="sans-serif">${lesson.title}</text>
  ${lesson.visual}
  <text x="200" y="370" text-anchor="middle" fill="#6ee7b7" font-size="11" font-family="sans-serif">AtomCode</text>
</svg>`;

  writeFileSync(join(outDir, svgToPngFilename(lesson.file)), svg);
}

console.log("Generated SVG lesson images in public/images/js-atoms/");