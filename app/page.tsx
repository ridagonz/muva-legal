"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import { PayPalPayment } from "./components/PayPalPayment";

const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const practices = [
  {
    number: "01",
    title: "Litigio penal estratégico",
    short: "Investigaciones, defensa y casación.",
    text: "Representamos asuntos penales que exigen una estrategia coordinada desde el primer momento, con lectura probatoria, procesal y reputacional.",
    areas: ["Defensa penal", "Representación de víctimas", "Penal económico y empresarial", "Casación penal"],
  },
  {
    number: "02",
    title: "Derecho público",
    short: "Constitucional y organismos de control.",
    text: "Acompañamos controversias que pueden avanzar de forma paralela ante autoridades, con una coordinación jurídica integral.",
    areas: ["Constitucional", "Administrativo y contratación estatal", "Defensa disciplinaria", "Responsabilidad fiscal"],
  },
  {
    number: "03",
    title: "Derecho empresarial",
    short: "Decisiones, contratos y contingencias.",
    text: "Acompañamos a organizaciones en decisiones corporativas, relaciones jurídicas y controversias que requieren anticipar riesgos.",
    areas: ["Comercial y societario", "Contratos y operaciones", "Prevención de contingencias"],
  },
  {
    number: "04",
    title: "Laboral y seguridad social",
    short: "Litigio, prevención y casación laboral.",
    text: "Asesoramos a empleadores, trabajadores, directivos y pensionados en controversias laborales y de seguridad social.",
    areas: ["Relaciones laborales", "Procesos individuales y colectivos", "Pensiones y seguridad social", "Casación laboral"],
  },
  {
    number: "05",
    title: "Asuntos privados y patrimoniales",
    short: "Personas, familias y empresas.",
    text: "Protegemos intereses civiles, familiares y patrimoniales con sensibilidad, negociación y estrategia procesal.",
    areas: ["Obligaciones y responsabilidad civil", "Propiedad y sucesiones", "Familia y patrimonio", "Negociación y conciliación"],
  },
];

const team = [
  {
    initials: "CMD", name: "César Fernando Mercado Durán", role: "Socio", focus: "Derecho público, constitucional, laboral y seguridad social", bio: "Abogado, Doctor y Magíster en Derecho, con experiencia jurisdiccional, académica, pública y privada. Su práctica se concentra en derecho administrativo, constitucional, laboral, seguridad social y métodos alternativos de solución de conflictos.",
  },
  {
    initials: "CDU", name: "Cecilia Margarita Durán Ujueta", role: "Socia", focus: "Laboral, seguridad social y casación laboral", bio: "Abogada y exmagistrada de la Corte Suprema de Justicia, Sala de Casación Laboral. Cuenta con más de 30 años de experiencia en litigio, docencia y administración de justicia.",
  },
  {
    initials: "EET", name: "Eliana Eugenio Torrado", role: "Socia", focus: "Derecho procesal civil y derecho probatorio", bio: "Abogada, especialista en Derecho Procesal Civil y Razonamiento Probatorio, con trabajo docente e investigativo en formación jurídica, prueba y proceso civil.",
  },
  {
    initials: "JPP", name: "Johan David Palomino Penagos", role: "Abogado Senior", focus: "Derecho penal, disciplinario y extinción de dominio", bio: "Abogado y especialista en Derecho Penal, con experiencia en representación judicial, asesoría y asuntos que involucran altas responsabilidades públicas y privadas.",
  },
];

const socialLinks = [
  { icon: FaXTwitter, name: "@JoseMorenoCab", href: "https://x.com/JoseMorenoCab" },
  { icon: FaLinkedinIn, name: "LinkedIn", href: "https://www.linkedin.com/in/joseluismorenocaballero" },
  { icon: FaYoutube, name: "YouTube", href: "https://www.youtube.com/@joseluismorenocaballero1905" },
  { icon: FaInstagram, name: "Instagram", href: "https://www.instagram.com/josemorenopenalista" },
];

type HeroSlide = {
  id: string;
  src: string;
  alt: string;
  position: string;
};

const defaultHeroSlides: HeroSlide[] = [
  {
    id: "jose-luis-moreno",
    src: "/images/jose-luis-moreno.webp",
    alt: "José Luis Moreno Caballero, abogado penalista y socio director de MUVA Legal",
    position: "50% 12%",
  },
  {
    id: "oficina-muva",
    src: "/images/hero-oficina-muva.webp",
    alt: "Oficina de consulta jurídica de MUVA Legal en Bogotá",
    position: "58% center",
  },
  {
    id: "revision-caso",
    src: "/images/hero-revision-caso.webp",
    alt: "Revisión rigurosa y confidencial de un expediente jurídico",
    position: "58% center",
  },
];

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const website = String(data.get("website") ?? "");
    const captcha = String(data.get("captcha") ?? "");
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, message, website, captcha }),
      });
      const result = await response.json() as { error?: string; delivery?: "form" | "mailto" };
      if (!response.ok) throw new Error(result.error ?? "No fue posible enviar la consulta.");

      if (result.delivery === "mailto") {
        const subject = encodeURIComponent(`Consulta jurídica de ${name}`);
        const body = encodeURIComponent(`Nombre: ${name}\nCorreo: ${email}\n\nConsulta:\n${message}`);
        window.location.href = `mailto:josemoreno@muvalegal.com?subject=${subject}&body=${body}`;
      }

      form.reset();
      setStatus("success");
      setFeedback(result.delivery === "mailto" ? "La consulta quedó preparada en tu aplicación de correo." : "Recibimos tu solicitud. Nuestro equipo se pondrá en contacto.");
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "No fue posible enviar el mensaje. Escríbenos por correo o WhatsApp.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="field-row">
        <label>
          <span>01 / Nombre completo</span>
          <input name="name" type="text" autoComplete="name" placeholder="Tu nombre" minLength={2} maxLength={80} required />
        </label>
        <label>
          <span>02 / Correo electrónico</span>
          <input name="email" type="email" autoComplete="email" placeholder="nombre@correo.com" maxLength={254} required />
        </label>
      </div>
      <label>
        <span>03 / ¿Qué necesitas resolver?</span>
        <textarea name="message" rows={4} placeholder="Describe brevemente tu situación" minLength={20} maxLength={2000} required />
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
      <p className="privacy-note">Tus datos se usarán únicamente para responder esta consulta. <a href="/privacidad">Consulta nuestra política de privacidad.</a></p>
    </form>
  );
}

export default function Home() {
  const [activePractice, setActivePractice] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const heroSlides = defaultHeroSlides;

  const activeSlide = heroSlides[currentSlide] ?? defaultHeroSlides[0];

  useEffect(() => {
    if (
      carouselPaused ||
      heroSlides.length < 2 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentSlide((slide) => (slide + 1) % heroSlides.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [carouselPaused, heroSlides.length]);

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
    let pointerFrame = 0;
    let latestPointer: { x: number; y: number; target: EventTarget | null } | null = null;

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

    const updatePointer = () => {
      if (!latestPointer) return;
      const { x, y, target: eventTarget } = latestPointer;
      root.style.setProperty("--cursor-x", `${x}px`);
      root.style.setProperty("--cursor-y", `${y}px`);
      root.style.setProperty("--hero-x", `${(x / window.innerWidth - 0.5) * 18}px`);
      root.style.setProperty("--hero-y", `${(y / window.innerHeight - 0.5) * 14}px`);

      const target = eventTarget as Element | null;
      const interactive = target?.closest("a, button, [data-cursor]");
      root.classList.toggle("cursor-active", Boolean(interactive));
      root.style.setProperty("--cursor-label", `"${interactive?.getAttribute("data-cursor") ?? ""}"`);

      const magnetic = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (lastMagnetic && lastMagnetic !== magnetic) lastMagnetic.style.transform = "";
      if (magnetic) {
        const rect = magnetic.getBoundingClientRect();
        const offsetX = (x - rect.left - rect.width / 2) * 0.13;
        const offsetY = (y - rect.top - rect.height / 2) * 0.13;
        magnetic.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
      }
      lastMagnetic = magnetic;
      pointerFrame = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      latestPointer = { x: event.clientX, y: event.clientY, target: event.target };
      if (!pointerFrame) pointerFrame = window.requestAnimationFrame(updatePointer);
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
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      document.body.removeEventListener("pointerleave", onPointerLeave);
      root.classList.remove("js", "has-custom-cursor", "cursor-active");
    };
  }, []);

  return (
    <>
      <div className="cursor-orbit" aria-hidden="true"><span /></div>
      <div className="scroll-progress" aria-hidden="true" />
      <SiteHeader />

      <main>
        <section className="hero" id="inicio">
          <div className="hero-media" aria-live="off">
            <Image
              className="hero-slide active"
              src={assetPath(activeSlide.src)}
              alt={activeSlide.alt}
              fill
              priority
              sizes="(max-width: 800px) 100vw, 49vw"
              style={{ objectPosition: activeSlide.position }}
              key={activeSlide.src}
            />
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
          {heroSlides.length > 1 && (
            <div className="hero-carousel-controls" aria-label="Control del carrusel principal">
              <button
                type="button"
                onClick={() => setCurrentSlide((slide) => (slide - 1 + heroSlides.length) % heroSlides.length)}
                aria-label="Ver imagen anterior"
              >
                ←
              </button>
              <div className="hero-dots" role="group" aria-label="Elegir imagen">
                {heroSlides.map((slide, index) => (
                  <button
                    className={currentSlide === index ? "active" : ""}
                    type="button"
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Ver imagen ${index + 1} de ${heroSlides.length}`}
                    aria-current={currentSlide === index ? "true" : undefined}
                    key={slide.src}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setCurrentSlide((slide) => (slide + 1) % heroSlides.length)}
                aria-label="Ver imagen siguiente"
              >
                →
              </button>
              <button
                className="hero-pause"
                type="button"
                onClick={() => setCarouselPaused((paused) => !paused)}
                aria-pressed={carouselPaused}
                aria-label={carouselPaused ? "Reanudar carrusel" : "Pausar carrusel"}
              >
                {carouselPaused ? "Reanudar" : "Pausar"}
              </button>
            </div>
          )}
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

        <section className="director section" id="equipo">
          <div className="container">
            <div className="section-rule light-rule reveal"><span>02</span><h2>Equipo</h2><i /></div>
            <div className="director-layout">
              <div className="director-visual reveal" data-cursor="Perfil">
                <Image src={assetPath("/images/jose-luis-moreno.webp")} alt="José Luis Moreno Caballero, Socio Director y Fundador de MUVA Legal" fill sizes="(max-width: 800px) 92vw, 38vw" />
                <span className="visual-index">JLM / 01</span>
              </div>
              <div className="director-copy reveal">
                <p className="director-role">Socio Director y Fundador · Abogado penalista</p>
                <h2>José Luis<br /><em>Moreno Caballero</em></h2>
                <p className="director-lead">Dirige la estrategia de la firma en litigio penal estratégico, casación, investigaciones y asuntos jurídicos complejos.</p>
                <div className="credential-list">
                  <div><span>Formación base</span><strong>Abogado · Universidad del Rosario</strong></div>
                  <div><span>Especialidad</span><strong>Derecho Penal · Universidad del Rosario</strong></div>
                  <div><span>Posgrado</span><strong>Magíster en Ciencias Penales y Criminológicas · Externado</strong></div>
                  <div><span>Práctica</span><strong>Litigio estratégico · Sector público y privado</strong></div>
                </div>
                <p className="profile-note">Más de 14 años de experiencia como defensor, representante de víctimas, consultor jurídico, académico y conferencista.</p>
              </div>
            </div>
            <div className="team-intro reveal">
              <p>Una estrategia sólida depende del equipo adecuado. MUVA Legal integra experiencia en litigio penal, casación, derecho público, derecho laboral, seguridad social, empresa, academia y análisis jurídico.</p>
            </div>
            <div className="team-grid">
              {team.map((member, index) => (
                <article className="team-card reveal" key={member.name}>
                  <div className="team-monogram" aria-hidden="true">{member.initials}<span>{String(index + 2).padStart(2, "0")}</span></div>
                  <p>{member.role}</p>
                  <h3>{member.name}</h3>
                  <strong>{member.focus}</strong>
                  <p className="team-bio">{member.bio}</p>
                </article>
              ))}
            </div>
            <div className="allies-note reveal">
              <strong>Capacidades aliadas</strong>
              <p>Cuando el asunto lo requiere, articulamos profesionales y organizaciones especializadas bajo una dirección jurídica coordinada, con alcance y responsabilidad definidos para cada caso.</p>
            </div>
          </div>
        </section>

        <section className="practices section" id="areas">
          <div className="container">
            <div className="section-rule reveal"><span>03</span><h2>Áreas de práctica</h2><i /></div>
            <div className="practices-heading reveal">
              <h2>Una defensa integral,<br /><em>etapa por etapa.</em></h2>
              <p>Capacidades organizadas para leer el asunto completo y coordinar la respuesta adecuada.</p>
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
                  <ul className="practice-subareas">{practice.areas.map((area) => <li key={area}>{area}</li>)}</ul>
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
            <div className="section-rule reveal"><span>06</span><h2>Contacto</h2><i /></div>
            <div className="contact-heading reveal">
              <h2>Todo caso comienza<br />con una <em>conversación.</em></h2>
              <div><a href="tel:+573187171958">+57 318 717 1958</a><a href="mailto:josemoreno@muvalegal.com">josemoreno@muvalegal.com</a><span>Bogotá D.C. · Colombia</span><PayPalPayment /></div>
            </div>
            <div className="form-shell reveal"><ContactForm /></div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
