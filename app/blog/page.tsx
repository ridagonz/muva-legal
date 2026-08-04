import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "Análisis jurídico",
  description:
    "Artículos de MUVA Legal sobre Derecho Penal, justicia, prevención jurídica y actualidad.",
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
            <p>
              Análisis claro sobre Derecho Penal, justicia y prevención para tomar decisiones con
              mayor contexto.
            </p>
          </div>
        </section>
        <section className="section blog-listing">
          <div className="container">
            <div className="article-grid">
              <Link className="article-card article-featured" href="/blog/bienvenidos-a-construir">
                <div className="article-visual visual-one" aria-hidden="true">
                  <span>Opinión<br />&amp; academia</span>
                </div>
                <div className="article-body">
                  <span className="article-meta">Editorial · 6 min</span>
                  <h2>¡Bienvenidos a construir!</h2>
                  <p>
                    Un espacio para llevar el debate jurídico más allá de las aulas y acercarlo a
                    la vida en sociedad.
                  </p>
                  <span className="article-link">Leer artículo →</span>
                </div>
              </Link>
              <article className="article-card">
                <div className="article-visual visual-two" aria-hidden="true">
                  <span>Guías<br />claras</span>
                </div>
                <div className="article-body">
                  <span className="article-meta">Proceso penal · Próximamente</span>
                  <h2>¿Qué hacer ante una citación de la Fiscalía?</h2>
                  <p>
                    Primeros pasos para proteger sus derechos y evitar decisiones apresuradas.
                  </p>
                  <Link className="article-link" href="/#contacto">Recibir orientación →</Link>
                </div>
              </article>
              <article className="article-card">
                <div className="article-visual visual-three" aria-hidden="true">
                  <span>Prevención<br />empresarial</span>
                </div>
                <div className="article-body">
                  <span className="article-meta">Empresas · Próximamente</span>
                  <h2>Riesgo penal: prevenir también es defender.</h2>
                  <p>
                    Claves para identificar alertas y fortalecer la respuesta de la organización.
                  </p>
                  <Link className="article-link" href="/#contacto">Hablar con la firma →</Link>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
