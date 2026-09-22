"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

type Product = {
  id: string;
  type: string;
  title: string;
  description: string;
  format: string;
  price: number;
};

type CartItem = Product & { quantity: number };

const products: Product[] = [
  {
    id: "libro-editorial-01",
    type: "Libro jurídico",
    title: "Título de la publicación",
    description:
      "Espacio para presentar el enfoque de la obra, sus temas principales y el lector al que está dirigida.",
    format: "Libro impreso",
    price: 82000,
  },
  {
    id: "documento-editorial-02",
    type: "Documento académico",
    title: "Título del documento",
    description:
      "Descripción breve del documento, su aporte académico y los asuntos jurídicos que desarrolla.",
    format: "Edición digital",
    price: 42000,
  },
  {
    id: "guia-editorial-03",
    type: "Guía práctica",
    title: "Título de la guía",
    description:
      "Resumen del contenido práctico, las preguntas que resuelve y el valor que ofrece al lector.",
    format: "Edición digital",
    price: 36000,
  },
];

const currency = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export default function EditorialPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [message, setMessage] = useState("");
  const cartLoaded = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const savedCart = window.localStorage.getItem("muva-editorial-cart");
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch {
          window.localStorage.removeItem("muva-editorial-cart");
        }
      }
      cartLoaded.current = true;
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (cartLoaded.current) {
      window.localStorage.setItem("muva-editorial-cart", JSON.stringify(cart));
    }
  }, [cart]);

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
    setMessage(`${product.title} se agregó al carrito.`);
  }

  function updateQuantity(id: string, quantity: number) {
    setCart((current) =>
      quantity <= 0
        ? current.filter((item) => item.id !== id)
        : current.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }

  function checkout() {
    const checkoutUrl = process.env.NEXT_PUBLIC_PAYPAL_CHECKOUT_URL ?? "";
    if (!checkoutUrl) {
      setMessage(
        "El botón está listo. Falta ingresar el enlace de cobro de la cuenta PayPal de MUVA Legal para activarlo.",
      );
      return;
    }
    window.open(checkoutUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <SiteHeader />
      <main className="editorial-page">
        <header className="editorial-hero">
          <div className="container editorial-hero-grid">
            <div>
              <p className="eyebrow light">MUVA Editorial</p>
              <h1>
                Ideas jurídicas<br />para <em>leer y conservar.</em>
              </h1>
            </div>
            <p>
              Libros, documentos académicos y guías de José Luis Moreno Caballero,
              disponibles para compra directa.
            </p>
          </div>
        </header>

        <section className="editorial-store section" aria-labelledby="catalogo-title">
          <div className="container">
            <div className="section-rule">
              <span>01</span><h2 id="catalogo-title">Catálogo editorial</h2><i />
            </div>
            <div className="catalogue-notice" role="note">
              <strong>Contenido demostrativo</strong>
              <span>
                Los títulos, precios, portadas y enlaces se reemplazarán con la información
                definitiva de cada publicación.
              </span>
            </div>

            <div className="store-layout">
              <div className="product-grid">
                {products.map((product, index) => (
                  <article className="product-card" key={product.id}>
                    <div className={`product-cover cover-${index + 1}`}>
                      <Image
                        src={assetPath("/images/muva-logo.png")}
                        alt=""
                        width={150}
                        height={84}
                        unoptimized
                      />
                      <span>Portada por definir</span>
                      <i>{String(index + 1).padStart(2, "0")}</i>
                    </div>
                    <div className="product-body">
                      <p className="product-type">{product.type} · {product.format}</p>
                      <h2>{product.title}</h2>
                      <p>{product.description}</p>
                      <div className="product-buy">
                        <strong>{currency.format(product.price)}</strong>
                        <button type="button" onClick={() => addToCart(product)}>
                          Agregar al carrito <span aria-hidden="true">＋</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="cart-panel" aria-labelledby="cart-title">
                <div className="cart-heading">
                  <div><span>Compra</span><h2 id="cart-title">Carrito</h2></div>
                  <strong>{String(itemCount).padStart(2, "0")}</strong>
                </div>
                {cart.length === 0 ? (
                  <div className="cart-empty">
                    <p>Tu carrito está vacío.</p>
                    <span>Agrega una publicación para iniciar la compra.</span>
                  </div>
                ) : (
                  <div className="cart-items">
                    {cart.map((item) => (
                      <div className="cart-item" key={item.id}>
                        <div><strong>{item.title}</strong><span>{currency.format(item.price)}</span></div>
                        <div className="quantity-control" aria-label={`Cantidad de ${item.title}`}>
                          <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Restar uno">−</button>
                          <span>{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Sumar uno">＋</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="cart-total"><span>Total</span><strong>{currency.format(total)}</strong></div>
                <button className="paypal-button" type="button" disabled={!cart.length} onClick={checkout}>
                  <span>Pagar con</span><strong>PayPal</strong>
                </button>
                <p className="checkout-note">El pago se realizará en el entorno seguro de PayPal.</p>
                <p className="cart-message" role="status" aria-live="polite">{message}</p>
              </aside>
            </div>
          </div>
        </section>

        <section className="editorial-contact">
          <div className="container editorial-contact-inner">
            <p>¿Buscas una publicación o necesitas una compra institucional?</p>
            <a href="mailto:josemoreno@muvalegal.com?subject=Consulta%20editorial">
              Consulta editorial <span>→</span>
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
