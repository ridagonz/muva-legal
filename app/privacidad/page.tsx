import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "Privacidad",
  description: "Información sobre el tratamiento de datos de los formularios de MUVA Legal.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="blog-hero">
          <div className="container">
            <p className="eyebrow light">MUVA Legal</p>
            <h1>Privacidad y tratamiento de datos.</h1>
            <p>Información sobre el uso de los datos suministrados mediante nuestros canales de contacto.</p>
          </div>
        </section>
        <section className="section privacy-page">
          <div className="container privacy-copy">
            <h2>Finalidad</h2>
            <p>Usamos tu nombre, correo electrónico y mensaje exclusivamente para atender tu solicitud de contacto, responder consultas y realizar el seguimiento profesional que corresponda.</p>
            <h2>Canales</h2>
            <p>La solicitud puede procesarse a través de nuestros canales de correo o de un formulario configurado por MUVA Legal. No solicitamos información sensible ni detalles confidenciales innecesarios en este primer contacto.</p>
            <h2>Conservación y derechos</h2>
            <p>Conservamos la información solo durante el tiempo necesario para gestionar la consulta y las obligaciones aplicables. Puedes solicitar actualización, corrección o eliminación de tus datos escribiendo a josemoreno@muvalegal.com.</p>
            <h2>Recomendación</h2>
            <p>No incluyas en el formulario información reservada, expedientes, contraseñas, números de identificación completos ni documentos confidenciales. Coordinaremos un canal seguro si el asunto requiere compartirlos.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
