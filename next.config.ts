import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // Relative path avoids OneDrive locking the default .next folder
  distDir: "node_modules/.cache/atomcode-next",
  images: {
    unoptimized: true,
  },
  ...(isGithubPages && {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "/AtomCode",
    assetPrefix: `${process.env.NEXT_PUBLIC_BASE_PATH ?? "/AtomCode"}/`,
  }),
};

export default nextConfig;