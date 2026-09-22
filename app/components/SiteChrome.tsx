"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const nav = [
  { label: "La firma", href: "/#firma" },
  { label: "José Luis Moreno", href: "/#director" },
  { label: "Áreas", href: "/#areas" },
  { label: "Experiencia", href: "/#experiencia" },
  { label: "Blog", href: "/blog" },
  { label: "Editorial", href: "/editorial" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="MUVA Legal, inicio">
          <Image src={assetPath("/images/muva-logo.png")} alt="MUVA Legal" width={180} height={100} priority unoptimized />
        </Link>
        <nav className={`main-nav ${open ? "open" : ""}`} aria-label="Navegación principal">
          {nav.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link className="button button-header" href="/#contacto" onClick={() => setOpen(false)}>
            Agendar consulta
          </Link>
        </nav>
        <button
          className={`menu-toggle ${open ? "open" : ""}`}
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Image src={assetPath("/images/muva-logo.png")} alt="MUVA Legal" width={190} height={105} unoptimized />
          <p>Tranquilidad y confianza mediante una práctica jurídica rigurosa y cercana.</p>
        </div>
        <div className="footer-column">
          <h2>Visítanos</h2>
          <p>Calle 92 No. 15-62<br />Oficina 303 · Bogotá D.C.</p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Calle+92+15-62+Bogotá"
            target="_blank"
            rel="noreferrer"
          >
            Ver en el mapa →
          </a>
        </div>
        <div className="footer-column">
          <h2>Contacto</h2>
          <a href="tel:+573187171958">+57 318 717 1958</a>
          <a href="mailto:josemoreno@muvalegal.com">josemoreno@muvalegal.com</a>
          <span>Atención con cita previa</span>
        </div>
        <div className="footer-column">
          <h2>Explorar</h2>
          <Link href="/#areas">Áreas de práctica</Link>
          <Link href="/blog">Análisis jurídico</Link>
          <Link href="/editorial">Editorial y publicaciones</Link>
          <Link href="/#contacto">Agendar consulta</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} MUVA Legal. Todos los derechos reservados.</p>
        <p>La información de este sitio no reemplaza una consulta jurídica.</p>
      </div>
    </footer>
  );
}
