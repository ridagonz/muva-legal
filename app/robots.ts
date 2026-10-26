import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.GITHUB_PAGES === "true"
    ? "https://ridagonz.github.io/muva-legal"
    : "https://muva-legal-bogota-2026.rigonz.chatgpt.site";
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
