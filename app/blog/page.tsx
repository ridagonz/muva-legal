import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog de MUVA Legal: artículos de análisis jurídico, Derecho Penal y actualidad.",
};

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="blog-hero">
          <div className="container">
            <p className="eyebrow light">Blog MUVA Legal</p>
            <h1>Comprender también es una forma de protegerse.</h1>
            <p>Análisis claro sobre Derecho Penal, justicia y prevención para tomar decisiones con mayor contexto.</p>
          </div>
        </section>
        <section className="section blog-listing" aria-label="Artículos del Blog">
          <div className="container">
            <div className="article-grid" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
