import type { Metadata } from "next";
import { FaWhatsapp } from "react-icons/fa";
import "./globals.css";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/muva-legal" : "";
const socialImage = isGithubPages
  ? "https://ridagonz.github.io/muva-legal/social/muva-legal-whatsapp-v2.jpg"
  : "https://muva-legal-bogota-2026.rigonz.chatgpt.site/social/muva-legal-whatsapp-v2.jpg";

export const metadata: Metadata = {
    title: {
      default: "MUVA Legal | Abogados penalistas",
      template: "%s | MUVA Legal",
    },
    description:
      "Defensa penal estratégica, representación de víctimas y prevención jurídica con atención directa y absoluta reserva.",
    keywords: [
      "abogado penalista Bogotá",
      "defensa penal Colombia",
      "José Luis Moreno Caballero",
      "MUVA Legal",
    ],
    icons: {
      icon: `${basePath}/images/muva-logo.png`,
      shortcut: `${basePath}/images/muva-logo.png`,
    },
    openGraph: {
      title: "MUVA Legal | Estrategia penal con criterio",
      description:
        "Defensa, representación de víctimas y prevención jurídica con atención directa y absoluta reserva.",
      type: "website",
      locale: "es_CO",
      siteName: "MUVA Legal",
      images: [{ url: socialImage, secureUrl: socialImage, type: "image/jpeg", width: 1200, height: 630, alt: "MUVA Legal — Estrategia penal con criterio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "MUVA Legal | Estrategia penal con criterio",
      description: "Defensa penal estratégica con rigor jurídico y criterio humano.",
      images: [socialImage],
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        {children}
        <a className="whatsapp-float" href="https://wa.me/573187171958?text=Hola%20MUVA%20Legal%2C%20quisiera%20agendar%20una%20consulta." target="_blank" rel="noopener noreferrer" aria-label="Escribir a MUVA Legal por WhatsApp" data-cursor="WhatsApp">
          <FaWhatsapp aria-hidden="true" /><i>WhatsApp</i>
        </a>
      </body>
    </html>
  );
}
