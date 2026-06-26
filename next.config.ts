import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  // Relative path avoids OneDrive locking the default .next folder
  distDir: "node_modules/.cache/atomcode-next",
  images: {
    unoptimized: true,
  },
  ...(isGithubPages && {
    basePath: "/AtomCode",
    assetPrefix: "/AtomCode/",
  }),
};

export default nextConfig;