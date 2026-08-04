import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: isGithubPages ? "export" : undefined,
  basePath: isGithubPages ? "/muva-legal" : undefined,
  assetPrefix: isGithubPages ? "/muva-legal/" : undefined,
  trailingSlash: isGithubPages,
  typescript: {
    ignoreBuildErrors: isGithubPages,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
