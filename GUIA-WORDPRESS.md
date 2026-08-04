# Guía de implementación en WordPress - MUVA Legal

Esta propuesta está lista para tomarse como referencia visual y de contenido al construir el sitio definitivo en WordPress.

## Estructura recomendada

### Inicio

Una página larga y dinámica con estas secciones:

1. Presentación principal y botón **Agendar una consulta**.
2. Presentación de MUVA Legal.
3. Perfil y credenciales de José Luis Moreno Caballero.
4. Áreas de práctica en Derecho Penal.
5. Método de atención.
6. Experiencia y política de confidencialidad.
7. Últimos artículos.
8. Redes sociales.
9. Formulario y datos de contacto.

### Páginas y plantillas

- **Inicio:** portada institucional.
- **La firma:** historia, propósito y valores.
- **José Luis Moreno Caballero:** perfil profesional y formación.
- **Áreas de práctica:** página general y una página por cada servicio prioritario.
- **Blog:** archivo de artículos con categorías.
- **Artículo:** plantilla individual con autor, fecha, tiempo de lectura y llamado a consulta.
- **Contacto:** formulario, teléfono, correo y ubicación.
- **Política de privacidad:** tratamiento de la información enviada por el formulario.

En WordPress conviene crear estas secciones con bloques reutilizables. Así el equipo puede actualizar textos y artículos sin alterar el diseño.

## Línea visual

- Azul profundo: `#242A3D`
- Azul de énfasis: `#4162EE`
- Azul claro: `#5CA3F4`
- Fondo marfil: `#F6F4EF`
- Texto principal: `#18253A`

El estilo combina títulos editoriales, espacios amplios y geometrías triangulares tomadas del portafolio original. Los movimientos deben ser discretos: aparición al hacer scroll, desplazamiento suave y parallax solo en elementos decorativos.

## Blog y posicionamiento en buscadores

Recomendación principal: instalar **Rank Math SEO**. Su asistente es claro, permite controlar títulos y descripciones, genera el mapa del sitio y facilita los datos estructurados para artículos y servicios.

**Yoast SEO** es una alternativa igualmente válida. Debe instalarse solo uno de los dos para evitar duplicaciones.

Estructura inicial de contenidos:

- Derecho Penal.
- Guías para personas investigadas.
- Derechos de las víctimas.
- Prevención penal para empresas.
- Análisis de actualidad jurídica.
- Opinión y academia.

Cada artículo debe responder una pregunta concreta, incluir autor y fecha de revisión, explicar el tema en lenguaje claro y terminar con una invitación prudente a solicitar orientación profesional.

## Formulario y Google Forms

Campos definitivos:

- Nombre completo.
- Correo electrónico.
- Observación o descripción breve.
- Verificación de seguridad.

Para llevar las respuestas a Google Forms:

1. Crear el formulario definitivo en la cuenta de MUVA Legal.
2. Añadir los tres campos anteriores.
3. Activar la notificación de nuevas respuestas.
4. Copiar la dirección del formulario y los identificadores de cada campo.
5. Reemplazar los valores mostrados en `.env.example`.

En WordPress, la misma integración puede insertarse mediante un bloque HTML personalizado o mediante el enlace de inserción que entrega Google Forms. Si se desea conservar exactamente el diseño de esta propuesta, conviene enviar los campos visuales al formulario de Google en segundo plano.

## Complementos recomendados

Instalar únicamente los necesarios:

- **Rank Math SEO:** posicionamiento y vista previa en buscadores.
- **WPForms Lite** o **Fluent Forms:** solo si se prefiere administrar el formulario dentro de WordPress.
- **Simple Google reCAPTCHA:** protección adicional contra mensajes no deseados.
- **ShortPixel** o **Imagify:** reducción del peso de las imágenes.
- **WP Rocket** o **LiteSpeed Cache:** usar el que corresponda al alojamiento, no ambos.
- **Wordfence:** seguridad y alertas de acceso.
- **Redirection:** control de enlaces antiguos al migrar el sitio.

## Antes de publicar

- Confirmar teléfono, correo y dirección actuales.
- Entregar el enlace definitivo de Google Forms.
- Sustituir o aprobar la fotografía del socio director.
- Aprobar por escrito cualquier caso, cliente, logo o testimonio que vaya a mostrarse.
- Añadir aviso de privacidad y política de tratamiento de datos.
- Conectar Search Console y Analytics después del lanzamiento.

No se incluyeron testimonios ni resultados identificables porque los archivos de referencia no contenían autorizaciones para publicarlos.
