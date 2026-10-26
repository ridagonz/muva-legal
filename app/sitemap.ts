import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = process.env.GITHUB_PAGES === "true"
  ? "https://ridagonz.github.io/muva-legal"
  : "https://muva-legal-bogota-2026.rigonz.chatgpt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/prensa", "/editorial", "/privacidad"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
