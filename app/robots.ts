import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://muva-legal-bogota-2026.rigonz.chatgpt.site/sitemap.xml",
  };
}
