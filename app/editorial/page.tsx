"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

type Product = {
  id: string;
  type: string;
  title: string;
  description: string;
  format: string;
  price: number;
  priceLabel: string;
};

type CartItem = Product & { quantity: number };

const products: Product[] = [
  {
    id: "institutos-especiales-jep",
    type: "Libro jurídico",
    title: "Institutos especiales de la justicia especial para la paz",
    description:
      "Obra académica coescrita por José Luis Moreno Caballero y publicada por la Universidad Externado de Colombia.",
    format: "Libro",
    price: 0,
    priceLabel: "Compra por consulta",
  },
  {
    id: "neoconstitucionalismo-derecho-trabajo",
    type: "Libro jurídico",
    title: "El neoconstitucionalismo y la constitucionalización del Derecho del Trabajo",
    description:
      "Publicación de Cecilia Margarita Durán Ujueta sobre el diálogo entre constitucionalismo y Derecho del Trabajo.",
    format: "Libro",
    price: 0,
    priceLabel: "Compra por consulta",
  },
  {
    id: "carrera-docente-colombia",
    type: "Publicación académica",
    title: "La carrera docente en Colombia",
    description:
      "Obra de Eliana Eugenio Torrado vinculada a su trabajo académico y de investigación jurídica.",
    format: "Libro",
    price: 0,
    priceLabel: "Compra por consulta",
  },
];

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
      const selectedTitles = cart.map((item) => `${item.quantity} × ${item.title}`).join("\n");
      window.location.href = `mailto:josemoreno@muvalegal.com?subject=${encodeURIComponent("Solicitud de compra editorial MUVA")}&body=${encodeURIComponent(`Quisiera adquirir las siguientes publicaciones:\n\n${selectedTitles}`)}`;
      return;
    }
    window.open(checkoutUrl, "_blank", "noopener,noreferrer");
  }

  function requestDownload(product: Product) {
    setMessage(`La descarga de “${product.title}” se habilitará cuando esté disponible el archivo autorizado por su editorial.`);
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
              Libros y publicaciones de las y los profesionales de MUVA Legal,
              disponibles para compra o consulta editorial.
            </p>
          </div>
        </header>

        <section className="editorial-store section" aria-labelledby="catalogo-title">
          <div className="container">
            <div className="section-rule">
              <span>01</span><h2 id="catalogo-title">Catálogo editorial</h2><i />
            </div>
            <div className="catalogue-notice" role="note">
              <strong>Publicaciones verificadas</strong>
              <span>
                La compra se gestiona con el equipo editorial. Las descargas se activarán únicamente
                con el archivo autorizado y la ficha bibliográfica completa.
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
                      />
                      <span>MUVA Editorial</span>
                      <i>{String(index + 1).padStart(2, "0")}</i>
                    </div>
                    <div className="product-body">
                      <p className="product-type">{product.type} · {product.format}</p>
                      <h2>{product.title}</h2>
                      <p>{product.description}</p>
                      <div className="product-buy">
                        <strong>{product.priceLabel}</strong>
                        <div className="product-actions">
                          <button type="button" onClick={() => addToCart(product)}>Comprar <span aria-hidden="true">＋</span></button>
                          <button type="button" onClick={() => requestDownload(product)}>Descargar <span aria-hidden="true">↓</span></button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="cart-panel" aria-labelledby="cart-title">
                <div className="cart-heading">
                  <div><span>Compra</span><h2 id="cart-title">Solicitud</h2></div>
                  <strong>{String(itemCount).padStart(2, "0")}</strong>
                </div>
                {cart.length === 0 ? (
                  <div className="cart-empty">
                    <p>Tu carrito está vacío.</p>
                    <span>Agrega una publicación para preparar tu solicitud de compra.</span>
                  </div>
                ) : (
                  <div className="cart-items">
                    {cart.map((item) => (
                      <div className="cart-item" key={item.id}>
                        <div><strong>{item.title}</strong><span>Compra por consulta</span></div>
                        <div className="quantity-control" aria-label={`Cantidad de ${item.title}`}>
                          <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Restar uno">−</button>
                          <span>{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Sumar uno">＋</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="cart-total"><span>Solicitud</span><strong>{itemCount} título{itemCount === 1 ? "" : "s"}</strong></div>
                <button className="paypal-button" type="button" disabled={!cart.length} onClick={checkout}>
                  <span>Continuar con</span><strong>la compra</strong>
                </button>
                <p className="checkout-note">La solicitud se enviará al equipo editorial. Si se configura PayPal, el pago se abrirá en su entorno seguro.</p>
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
