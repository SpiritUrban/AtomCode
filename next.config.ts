import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/AtomCode";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(isGithubPages && {
    basePath,
    assetPrefix: `${basePath}/`,
  }),
  ...(!isGithubPages && {
    distDir: "node_modules/.cache/atomcode-next",
  }),
};

export default nextConfig;