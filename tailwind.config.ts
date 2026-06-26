import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        atom: {
          bg: "#0f1117",
          surface: "#1a1d27",
          card: "#22263a",
          border: "#2e3348",
          accent: "#6ee7b7",
          accent2: "#818cf8",
          warning: "#fbbf24",
          text: "#e2e8f0",
          muted: "#94a3b8",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;