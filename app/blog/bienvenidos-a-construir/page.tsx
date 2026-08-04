import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";

export const metadata: Metadata = {
  title: "¡Bienvenidos a construir!",
  description:
    "El espacio académico de MUVA Legal para conversar sobre Derecho, justicia y sociedad.",
};

export default function ArticlePage() {
  return (
    <>
      <SiteHeader />
      <main className="article-page">
        <header className="article-header">
          <div className="container article-header-inner">
            <p className="eyebrow light">Editorial · Academia y opinión</p>
            <h1>¡Bienvenidos a construir!</h1>
            <p className="article-deck">
              Un espacio para extender el conocimiento jurídico más allá de las aulas y contribuir
              a una sociedad más informada, crítica y libre.
            </p>
            <div className="article-byline">
              <span>José Luis Moreno Caballero</span>
              <span>Socio director · MUVA Legal</span>
              <span>6 minutos de lectura</span>
            </div>
          </div>
        </header>
        <div className="container article-content">
          <aside className="article-aside">
            <span>En este artículo</span>
            <p>Academia, conversación pública y construcción colectiva del conocimiento.</p>
            <Link className="text-link" href="/blog">Volver al blog</Link>
          </aside>
          <article className="article-prose">
            <p>
              Para MUVA Legal, la academia y las ideas de quienes participan en la vida jurídica
              son esenciales. Abrimos este espacio para conversar sobre teorías filosóficas y
              jurídicas, y también para analizar asuntos de interés nacional e internacional.
            </p>
            <p>
              El propósito es acercar el conocimiento a la vida cotidiana. Profesores,
              estudiantes, magistrados, profesionales y ciudadanos pueden encontrar aquí un lugar
              para compartir perspectivas y comprender mejor las decisiones que influyen en la
              sociedad.
            </p>
            <blockquote>
              El conocimiento jurídico adquiere sentido cuando ayuda a las personas a comprender
              y participar mejor en su entorno.
            </blockquote>
            <h2>Una conversación abierta</h2>
            <p>
              Queremos que este blog permita resolver inquietudes reales y, al mismo tiempo,
              profundizar en debates doctrinales y desarrollos jurídicos relevantes. La formación
              no termina en el aula: se fortalece cuando las preguntas se comparten y los argumentos
              se ponen a prueba.
            </p>
            <p>
              Por eso, la invitación es a leer, comentar y proponer temas. Construir una sociedad
              más justa requiere personas dispuestas a aprender, escuchar y sostener sus ideas con
              respeto.
            </p>
            <h2>Construir confianza</h2>
            <p>
              La educación amplía las posibilidades de actuar con autonomía. En el Derecho, esa
              claridad permite reconocer riesgos, ejercer derechos y tomar decisiones con mayor
              tranquilidad. Este espacio nace con esa intención: hacer del conocimiento una
              herramienta útil y cercana.
            </p>
            <div className="article-cta">
              <h2>¿Tienes una inquietud jurídica?</h2>
              <p>
                Conversemos de forma confidencial para entender tu situación y definir el siguiente
                paso.
              </p>
              <Link className="button button-primary" href="/#contacto">
                Agendar consulta <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
