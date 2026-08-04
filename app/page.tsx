"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";

const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const practices = [
  {
    number: "01",
    title: "Defensa penal",
    short: "Investigación, audiencias y juicio.",
    text: "Acompañamiento desde la primera actuación hasta el juicio, con preparación rigurosa de cada decisión, audiencia y escenario posible.",
  },
  {
    number: "02",
    title: "Representación de víctimas",
    short: "Protección y reparación integral.",
    text: "Participación activa dentro del proceso penal para proteger los derechos de la víctima y orientar una reparación integral.",
  },
  {
    number: "03",
    title: "Recursos extraordinarios",
    short: "Casación, revisión y protección.",
    text: "Estudio estratégico de decisiones judiciales y presentación de los recursos que correspondan cuando el caso exige una nueva revisión.",
  },
  {
    number: "04",
    title: "Extinción de dominio",
    short: "Patrimonio, titulares y terceros.",
    text: "Representación de titulares y terceros afectados, con una lectura integral de los bienes, los hechos y la evolución del proceso.",
  },
  {
    number: "05",
    title: "Prevención empresarial",
    short: "Riesgo penal y cumplimiento.",
    text: "Conceptos, protocolos y programas de cumplimiento para anticipar riesgos penales y fortalecer la respuesta de las organizaciones.",
  },
];

const socialLinks = [
  { icon: FaXTwitter, name: "@JoseMorenoCab", href: "https://x.com/JoseMorenoCab" },
  { icon: FaLinkedinIn, name: "LinkedIn", href: "https://www.linkedin.com/in/joseluismorenocaballero" },
  { icon: FaYoutube, name: "YouTube", href: "https://www.youtube.com/@joseluismorenocaballero1905" },
  { icon: FaInstagram, name: "Instagram", href: "https://www.instagram.com/josemorenopenalista" },
];

const googleForm = {
  action: process.env.NEXT_PUBLIC_GOOGLE_FORM_ACTION ?? "",
  nameField: process.env.NEXT_PUBLIC_GOOGLE_FORM_NAME_FIELD ?? "entry.name",
  emailField: process.env.NEXT_PUBLIC_GOOGLE_FORM_EMAIL_FIELD ?? "entry.email",
  messageField: process.env.NEXT_PUBLIC_GOOGLE_FORM_MESSAGE_FIELD ?? "entry.message",
};

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (String(data.get("captcha") ?? "").trim() !== "12") {
      setStatus("error");
      setFeedback("Revisa la respuesta de seguridad antes de enviar.");
      return;
    }
    if (String(data.get("website") ?? "").length > 0) return;

    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    setStatus("sending");

    if (googleForm.action) {
      const payload = new FormData();
      payload.append(googleForm.nameField, name);
      payload.append(googleForm.emailField, email);
      payload.append(googleForm.messageField, message);
      try {
        await fetch(googleForm.action, { method: "POST", mode: "no-cors", body: payload });
        form.reset();
        setStatus("success");
        setFeedback("Recibimos tu solicitud. Nuestro equipo se pondrá en contacto.");
      } catch {
        setStatus("error");
        setFeedback("No fue posible enviar el mensaje. Escríbenos por correo o WhatsApp.");
      }
      return;
    }

    const subject = encodeURIComponent(`Consulta jurídica de ${name}`);
    const body = encodeURIComponent(`Nombre: ${name}\nCorreo: ${email}\n\nConsulta:\n${message}`);
    window.location.href = `mailto:josemoreno@muvalegal.com?subject=${subject}&body=${body}`;
    form.reset();
    setStatus("success");
    setFeedback("La consulta quedó preparada en tu aplicación de correo.");
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="field-row">
        <label>
          <span>01 / Nombre completo</span>
          <input name="name" type="text" autoComplete="name" placeholder="Tu nombre" required />
        </label>
        <label>
          <span>02 / Correo electrónico</span>
          <input name="email" type="email" autoComplete="email" placeholder="nombre@correo.com" required />
        </label>
      </div>
      <label>
        <span>03 / ¿Qué necesitas resolver?</span>
        <textarea name="message" rows={4} placeholder="Describe brevemente tu situación" required />
      </label>
      <label className="honeypot" aria-hidden="true">
        Sitio web<input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="form-footer">
        <label className="captcha-field">
          <span>Verificación / 7 + 5 =</span>
          <input name="captcha" type="text" inputMode="numeric" pattern="12" aria-label="Siete más cinco" required />
        </label>
        <button className="round-submit" type="submit" disabled={status === "sending"} data-magnetic data-cursor="Enviar">
          <span>{status === "sending" ? "…" : "Enviar"}</span><i aria-hidden="true">→</i>
        </button>
      </div>
      <p className={`form-feedback ${status}`} role="status" aria-live="polite">{feedback}</p>
      <p className="privacy-note">Tus datos se usarán únicamente para responder esta consulta.</p>
    </form>
  );
}

export default function Home() {
  const [activePractice, setActivePractice] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");

    const revealElements = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    revealElements.forEach((element) => observer.observe(element));

    let ticking = false;
    let lastMagnetic: HTMLElement | null = null;

    const updateScroll = () => {
      const y = window.scrollY;
      const available = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll-y", `${y}px`);
      root.style.setProperty("--scroll-progress", `${available > 0 ? (y / available) * 100 : 0}%`);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (finePointer) root.classList.add("has-custom-cursor");

    const onPointerMove = (event: PointerEvent) => {
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
      root.style.setProperty("--hero-x", `${(event.clientX / window.innerWidth - 0.5) * 18}px`);
      root.style.setProperty("--hero-y", `${(event.clientY / window.innerHeight - 0.5) * 14}px`);

      const target = event.target as Element | null;
      const interactive = target?.closest("a, button, [data-cursor]");
      root.classList.toggle("cursor-active", Boolean(interactive));
      root.style.setProperty("--cursor-label", `"${interactive?.getAttribute("data-cursor") ?? ""}"`);

      const magnetic = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (lastMagnetic && lastMagnetic !== magnetic) lastMagnetic.style.transform = "";
      if (magnetic) {
        const rect = magnetic.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.13;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.13;
        magnetic.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      lastMagnetic = magnetic;
    };

    const onPointerLeave = () => {
      root.classList.remove("cursor-active");
      if (lastMagnetic) lastMagnetic.style.transform = "";
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (finePointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.body.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      document.body.removeEventListener("pointerleave", onPointerLeave);
      root.classList.remove("js", "has-custom-cursor", "cursor-active");
    };
  }, []);

  return (
    <>
      <div className="page-intro" aria-hidden="true">
        <div className="intro-mark">
          <Image src={assetPath("/images/muva-logo.png")} alt="" width={450} height={250} priority unoptimized />
        </div>
        <p>Estrategia penal / Bogotá</p>
      </div>
      <div className="cursor-orbit" aria-hidden="true"><span /></div>
      <div className="scroll-progress" aria-hidden="true" />
      <SiteHeader />

      <main>
        <section className="hero" id="inicio">
          <div className="hero-media" aria-hidden="true">
            <Image src={assetPath("/images/jose-luis-moreno.png")} alt="" fill priority unoptimized sizes="(max-width: 800px) 100vw, 48vw" />
            <div className="hero-media-wash" />
          </div>
          <div className="hero-coordinate hero-coordinate-a">04° 39&apos; N</div>
          <div className="hero-coordinate hero-coordinate-b">74° 04&apos; W</div>
          <div className="container hero-content">
            <p className="hero-kicker reveal is-visible"><span>Firma de abogados penalistas</span><i>Bogotá · Colombia</i></p>
            <h1 className="hero-title reveal is-visible">
              <span className="title-line title-line-one">Estrategia</span>
              <span className="title-line title-line-two"><em>penal</em> con</span>
              <span className="title-line title-line-three">criterio.</span>
            </h1>
            <div className="hero-bottom reveal is-visible">
              <p>Defensa, representación de víctimas y prevención jurídica con atención directa y absoluta reserva.</p>
              <a className="circle-link" href="#contacto" data-magnetic data-cursor="Agendar">
                <span>Agendar<br />consulta</span><i aria-hidden="true">→</i>
              </a>
            </div>
          </div>
          <div className="hero-scroll" aria-hidden="true"><span>Descubrir</span><i /></div>
        </section>

        <div className="kinetic-bar" aria-hidden="true">
          <div>
            <span>Rigor jurídico</span><i>◆</i><span>Criterio humano</span><i>◆</i><span>Confidencialidad</span><i>◆</i>
            <span>Rigor jurídico</span><i>◆</i><span>Criterio humano</span><i>◆</i><span>Confidencialidad</span><i>◆</i>
          </div>
        </div>

        <section className="manifesto section" id="firma">
          <div className="container">
            <div className="section-rule reveal"><span>01</span><h2>La firma</h2><i /></div>
            <p className="manifesto-text reveal">
              No trabajamos con fórmulas. <em>Escuchamos, evaluamos y construimos</em> una estrategia precisa para lo que realmente está en juego.
            </p>
            <div className="manifesto-foot reveal">
              <p>MUVA Legal nació para dignificar el ejercicio profesional mediante excelencia académica, compromiso y honestidad.</p>
              <div><span>Confianza</span><span>Respeto</span><span>Excelencia</span><span>Disciplina</span></div>
            </div>
          </div>
        </section>

        <section className="director section" id="director">
          <div className="container">
            <div className="section-rule light-rule reveal"><span>02</span><h2>Socio director</h2><i /></div>
            <div className="director-layout">
              <div className="director-visual reveal" data-cursor="Perfil">
                <Image src={assetPath("/images/jose-luis-moreno.png")} alt="José Luis Moreno Caballero, CEO de MUVA Legal" fill unoptimized sizes="(max-width: 800px) 92vw, 38vw" />
                <span className="visual-index">JLM / 01</span>
              </div>
              <div className="director-copy reveal">
                <p className="director-role">CEO · Socio fundador</p>
                <h2>José Luis<br /><em>Moreno Caballero</em></h2>
                <p className="director-lead">Experiencia que convierte la complejidad en una ruta jurídica clara.</p>
                <div className="credential-list">
                  <div><span>Formación base</span><strong>Abogado · Universidad del Rosario</strong></div>
                  <div><span>Especialidad</span><strong>Derecho Penal · Universidad del Rosario</strong></div>
                  <div><span>Posgrado</span><strong>Magíster en Ciencias Penales y Criminológicas · Externado</strong></div>
                  <div><span>Práctica</span><strong>Litigio estratégico · Sector público y privado</strong></div>
                </div>
                <a className="editorial-link" href="https://www.linkedin.com/in/joseluismorenocaballero" target="_blank" rel="noreferrer" data-cursor="Abrir">
                  Perfil profesional <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="practices section" id="areas">
          <div className="container">
            <div className="section-rule reveal"><span>03</span><h2>Áreas de práctica</h2><i /></div>
            <div className="practices-heading reveal">
              <h2>Una defensa integral,<br /><em>etapa por etapa.</em></h2>
              <p>Explora cada área para conocer el enfoque de acompañamiento.</p>
            </div>
            <div className="practice-accordion reveal">
              {practices.map((practice, index) => (
                <button
                  className={`practice-panel ${activePractice === index ? "active" : ""}`}
                  key={practice.number}
                  type="button"
                  aria-expanded={activePractice === index}
                  onMouseEnter={() => setActivePractice(index)}
                  onFocus={() => setActivePractice(index)}
                  onClick={() => setActivePractice(index)}
                  data-cursor="Explorar"
                >
                  <span className="panel-number">{practice.number}</span>
                  <h3>{practice.title}</h3>
                  <span className="panel-short">{practice.short}</span>
                  <p>{practice.text}</p>
                  <i className="panel-arrow" aria-hidden="true">→</i>
                </button>
              ))}
            </div>
            <a className="editorial-link practice-cta" href="#contacto" data-cursor="Consultar">
              Consultar un caso <span>→</span>
            </a>
          </div>
        </section>

        <section className="method section" id="metodo">
          <div className="container">
            <div className="section-rule light-rule reveal"><span>04</span><h2>Nuestro método</h2><i /></div>
            <div className="method-heading reveal">
              <h2>Claridad antes<br />de cada <em>decisión.</em></h2>
              <p>El cliente entiende el propósito de cada paso, los escenarios posibles y lo que sigue.</p>
            </div>
            <ol className="method-list">
              <li className="reveal" data-cursor="01"><span>01</span><h3>Escuchamos</h3><p>Hechos, momento procesal y aquello que está en riesgo.</p><i>→</i></li>
              <li className="reveal" data-cursor="02"><span>02</span><h3>Evaluamos</h3><p>Información, escenarios y límites sin crear falsas expectativas.</p><i>→</i></li>
              <li className="reveal" data-cursor="03"><span>03</span><h3>Diseñamos</h3><p>Una estrategia jurídica a la medida del caso y sus objetivos.</p><i>→</i></li>
              <li className="reveal" data-cursor="04"><span>04</span><h3>Actuamos</h3><p>Preparación, comunicación constante y absoluta reserva.</p><i>→</i></li>
            </ol>
          </div>
        </section>

        <section className="confidential section" id="experiencia">
          <div className="confidential-type" aria-hidden="true">RESERVA</div>
          <div className="container confidential-grid">
            <div className="confidential-copy reveal">
              <div className="section-rule compact-rule"><span>05</span><h2>Experiencia</h2><i /></div>
              <h2>La reserva también hace parte de una <em>buena defensa.</em></h2>
              <p>En asuntos penales, la confidencialidad protege a las personas y al proceso. No publicamos nombres, expedientes ni resultados sin autorización expresa.</p>
            </div>
            <div className="confidential-index reveal">
              <div><span>01</span><strong>Defensa de personas</strong><p>Investigaciones y procesos penales.</p></div>
              <div><span>02</span><strong>Protección a víctimas</strong><p>Representación activa y cuidadosa.</p></div>
              <div><span>03</span><strong>Asesoría a organizaciones</strong><p>Prevención y respuesta ante riesgos.</p></div>
            </div>
          </div>
        </section>

        <section className="insights section" id="blog">
          <div className="container">
            <div className="section-rule reveal"><span>06</span><h2>Análisis jurídico</h2><i /></div>
            <div className="insights-heading reveal">
              <h2>Comprender antes<br />de <em>decidir.</em></h2>
              <Link className="editorial-link" href="/blog" data-cursor="Ver blog">Todos los artículos <span>→</span></Link>
            </div>
            <div className="article-list">
              <Link className="article-row reveal" href="/blog/bienvenidos-a-construir" data-cursor="Leer">
                <span className="article-count">01</span>
                <span className="article-category">Editorial / Academia</span>
                <h3>¡Bienvenidos a construir!</h3>
                <p>Un espacio para llevar el debate jurídico más allá de las aulas.</p>
                <i>→</i>
              </Link>
              <a className="article-row reveal" href="#contacto" data-cursor="Próximamente">
                <span className="article-count">02</span>
                <span className="article-category">Proceso penal / Guía</span>
                <h3>¿Qué hacer ante una citación de la Fiscalía?</h3>
                <p>Primeras decisiones para proteger tus derechos.</p>
                <i>→</i>
              </a>
              <a className="article-row reveal" href="#contacto" data-cursor="Próximamente">
                <span className="article-count">03</span>
                <span className="article-category">Empresas / Prevención</span>
                <h3>Riesgo penal: prevenir también es defender.</h3>
                <p>Alertas y respuesta para las organizaciones.</p>
                <i>→</i>
              </a>
            </div>
          </div>
        </section>

        <section className="social section" id="redes">
          <div className="container social-layout">
            <div className="social-title reveal">
              <span>Perspectiva en contexto</span>
              <h2>El Derecho<br />también se<br /><em>conversa.</em></h2>
            </div>
            <div className="social-list reveal">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a key={social.name} href={social.href} target="_blank" rel="noreferrer" data-cursor="Seguir">
                    <span className="social-icon-brand" aria-hidden="true"><Icon /></span>
                    <strong>{social.name}</strong>
                    <i aria-hidden="true">→</i>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section className="contact section" id="contacto">
          <div className="container">
            <div className="section-rule reveal"><span>07</span><h2>Contacto</h2><i /></div>
            <div className="contact-heading reveal">
              <h2>Todo caso comienza<br />con una <em>conversación.</em></h2>
              <div><a href="tel:+573187171958">+57 318 717 1958</a><a href="mailto:josemoreno@muvalegal.com">josemoreno@muvalegal.com</a><span>Bogotá D.C. · Colombia</span></div>
            </div>
            <div className="form-shell reveal"><ContactForm /></div>
          </div>
        </section>
      </main>

      <a className="whatsapp-float" href="https://wa.me/573187171958?text=Hola%20MUVA%20Legal%2C%20quisiera%20agendar%20una%20consulta." target="_blank" rel="noreferrer" aria-label="Escribir por WhatsApp" data-magnetic data-cursor="WhatsApp">
        <span>WA</span><i>Consulta privada</i>
      </a>
      <SiteFooter />
    </>
  );
}
