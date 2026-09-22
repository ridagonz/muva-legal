# Propuesta web MUVA Legal

Sitio institucional completo para MUVA Legal, centrado en Derecho Penal y en el perfil de José Luis Moreno Caballero.

## Qué incluye

- Portada institucional con carrusel, controles accesibles y llamado a agendar consulta.
- Perfil del socio director y credenciales académicas.
- Cinco áreas de práctica penal.
- Método de atención, enfoque de confidencialidad y redes sociales.
- Blog con portada y un artículo editorial completo.
- Sección editorial con catálogo demostrativo, carrito persistente y conexión preparada para PayPal.
- Formulario con validación, verificación de seguridad y conexión preparada para Google Forms.
- Diseño adaptable a computador, tableta y celular.
- Efectos de aparición, desplazamiento suave, parallax sutil y microinteracciones.
- Títulos y descripciones preparados para buscadores y redes sociales.

## Formulario de contacto

El formulario funciona desde el prototipo mediante correo. Para guardar las respuestas en Google Forms, copia `.env.example` como `.env.local` y reemplaza los cuatro datos por los del formulario definitivo de MUVA Legal.

## Catálogo editorial

El catálogo conserva contenido demostrativo hasta que se proporcionen los títulos, precios y portadas definitivos. Para activar el pago, configura `NEXT_PUBLIC_PAYPAL_CHECKOUT_URL` con el enlace de cobro de la cuenta PayPal de MUVA Legal.

## Puesta en marcha

1. Instala las dependencias con `npm install`.
2. Abre la vista local con `npm run dev`.
3. Comprueba la versión final con `npm run build`.

La adaptación editorial y técnica a WordPress está explicada en `GUIA-WORDPRESS.md`.
