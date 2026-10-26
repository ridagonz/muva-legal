import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: isGithubPages ? "export" : undefined,
  basePath: isGithubPages ? "/muva-legal" : undefined,
  assetPrefix: isGithubPages ? "/muva-legal/" : undefined,
  trailingSlash: isGithubPages,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? "/muva-legal" : "",
  },
  images: {
    unoptimized: isGithubPages,
  },
};

export default nextConfig;
