import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import MediaCoverage from "./MediaCoverage";

export const metadata: Metadata = {
  title: "Prensa",
  description: "Noticias, entrevistas y videos de MUVA Legal y José Luis Moreno Caballero en los medios de comunicación.",
};

export default function PressPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="blog-hero">
          <div className="container">
            <p className="eyebrow light">Prensa / MUVA Legal</p>
            <h1>MUVA Legal en los medios de comunicación.</h1>
            <p>Noticias, entrevistas y participaciones en televisión, radio y prensa.</p>
          </div>
        </section>
        <MediaCoverage />
      </main>
      <SiteFooter />
    </>
  );
}
