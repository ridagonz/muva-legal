import type { MetadataRoute } from "next";

const siteUrl = "https://muva-legal-bogota-2026.rigonz.chatgpt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/prensa", "/editorial", "/privacidad"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
