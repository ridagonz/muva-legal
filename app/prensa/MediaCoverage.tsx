import styles from "./MediaCoverage.module.css";

const videos = [
  { id: "NFhhtsC2VxA", start: 9, title: "Participación de MUVA Legal en medios · 01", outlet: "YouTube" },
  { id: "_bqygmnf_UU", start: 2, title: "Participación de MUVA Legal en medios · 02", outlet: "YouTube" },
  { id: "72ewkCMp22g", start: 0, title: "José Luis Moreno Caballero en Caracol Noticias", outlet: "Caracol Noticias · Archivo 2019" },
  { id: "rb4_6W2bLQc", start: 0, title: "José Luis Moreno Caballero en el debate de Zoom", outlet: "NTN24 · Zoom · Archivo 2020" },
  { id: "bArfsyPF7fg", start: 0, title: "Participación de MUVA Legal en medios · 05", outlet: "YouTube" },
  { id: "Rs7RXFeWP0Y", start: 0, title: "Participación de MUVA Legal en medios · 06", outlet: "YouTube" },
  { id: "JEZZBiecd84", start: 0, title: "Análisis de Derecho Penal en Caracol Noticias", outlet: "Caracol Noticias · Archivo 2019" },
];

const news = [
  {
    outlet: "Canal 1",
    title: "Piedemont Colombia: acciones legales frente a señalamientos y amenazas",
    description: "Canal 1 recoge la respuesta de la transportadora y las acciones anunciadas por su apoderado, José Moreno Caballero.",
    date: "2026-10-20", dateLabel: "20 oct 2026",
    url: "https://canal1.com.co/noticias/nacional/empresa-de-transporte-piedemont-colombia-denuncia-difamacion-y-mensajes-de-extorsion-en-arauca/",
  },
  {
    outlet: "El Tiempo",
    title: "Olmedo López: traslado a La Picota y condiciones de seguridad",
    description: "Cobertura de las declaraciones de la defensa sobre el traslado de su representado y las condiciones para su protección.",
    date: "", dateLabel: "",
    url: "https://www.eltiempo.com/justicia/delitos/caso-ungrd-abogado-de-olmedo-lopez-se-refirio-al-traslado-de-su-cliente-a-la-picota-y-hablo-de-la-seguridad-no-es-una-discusion-sobre-privilegios-3591858",
  },
  {
    outlet: "Semana",
    title: "La demanda laboral relacionada con Samuel Morales",
    description: "Semana informa sobre una demanda presentada por José Luis Moreno Caballero en representación de una exempleada.",
    date: "2025-11-17", dateLabel: "17 nov 2025",
    url: "https://www.semana.com/nacion/articulo/el-problema-judicial-que-enfrenta-el-heredero-el-hijo-de-kaleth-morales/202516/",
  },
  {
    outlet: "Infobae",
    title: "Responsabilidad jurídica tras un reto de consumo de licor en Cali",
    description: "Infobae consulta a José Moreno Caballero y Francisco Bernate sobre las posibles responsabilidades de los administradores del establecimiento.",
    date: "2025-10-31", dateLabel: "31 oct 2025",
    url: "https://www.infobae.com/colombia/2025/10/31/las-posibles-consecuencias-legales-que-podrian-recaer-sobre-la-administracion-del-bar-en-cali-por-joven-que-participo-de-reto-con-licor-que-le-costo-la-vida/",
  },
  {
    outlet: "Blu Radio",
    title: "Caso UNGRD: la defensa se pronuncia sobre el preacuerdo",
    description: "Blu Radio recoge la posición de MUVA Legal frente al rechazo del acuerdo y sus posibles efectos sobre otras investigaciones.",
    date: "2025-05-19", dateLabel: "19 may 2025",
    url: "https://www.bluradio.com/judicial/defensa-de-olmedo-lopez-advierte-que-negar-preacuerdo-pone-en-riesgo-otras-lineas-de-investigacion-rg10",
  },
  {
    outlet: "Noticias RCN",
    title: "La defensa solicita protección y cumplimiento del traslado de Olmedo López",
    description: "Noticias RCN informa sobre la solicitud de MUVA Legal para garantizar la seguridad de su representado.",
    date: "2024-09-03", dateLabel: "3 sep 2024",
    url: "https://www.noticiasrcn.com/colombia/abogado-de-olmedo-lopez-denuncia-que-no-ha-sido-trasladado-a-un-centro-de-guarnicion-742925",
  },
];

const youtubeUrl = (video: (typeof videos)[number]) =>
  `https://www.youtube.com/watch?v=${video.id}${video.start ? `&t=${video.start}s` : ""}`;

export default function MediaCoverage() {
  const items = [
    ...news.map(item => ({ name: item.title, url: item.url })),
    ...videos.map(item => ({ name: item.title, url: youtubeUrl(item) })),
  ];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "MUVA Legal en medios de comunicación",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem", position: index + 1,
      item: { "@type": "CreativeWork", name: item.name, url: item.url },
    })),
  };

  return (
    <section className={styles.section} id="muva-en-medios" aria-labelledby="medios-title">
      <div className="container">
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>Prensa / En medios de comunicación</p>
            <h2 id="medios-title">Una voz jurídica<br /><em>en la conversación pública.</em></h2>
          </div>
          <div className={styles.intro}>
            <p>Entrevistas, noticias y participaciones de MUVA Legal y José Luis Moreno Caballero en televisión, radio y prensa.</p>
            <nav className={styles.jumpLinks} aria-label="Contenido de MUVA en medios">
              <a href="#notas-periodisticas">Notas periodísticas <span aria-hidden="true">↓</span></a>
              <a href="#videos-medios">Videos <span aria-hidden="true">↓</span></a>
            </nav>
          </div>
        </div>

        <div className={styles.sectionLabel} id="notas-periodisticas">
          <span>01 / Prensa</span><h3>Notas periodísticas</h3><span>6 publicaciones</span>
        </div>
        <div className={styles.newsGrid}>
          {news.map(item => (
            <article className={styles.newsCard} key={item.url}>
              <div className={styles.cardMeta}>
                <span>{item.outlet}</span>
                {item.date ? <time dateTime={item.date}>{item.dateLabel}</time> : null}
              </div>
              <h4><a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a></h4>
              <p>{item.description}</p>
              <a className={styles.sourceLink} href={item.url} target="_blank" rel="noopener noreferrer">
                Leer en {item.outlet} <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>

        <div className={styles.sectionLabel} id="videos-medios">
          <span>02 / Audiovisual</span><h3>Entrevistas y videos</h3><span>7 participaciones</span>
        </div>
        <div className={styles.videoGrid}>
          {videos.map((video, index) => (
            <article className={styles.videoCard} key={video.id}>
              <div className={styles.player}>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.id}?start=${video.start}&rel=0`}
                  title={video.title}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className={styles.videoBody}>
                <p className={styles.videoMeta}>{video.outlet}<span>{String(index + 1).padStart(2, "0")}</span></p>
                <h4>{video.title}</h4>
                <a className={styles.sourceLink} href={youtubeUrl(video)} target="_blank" rel="noopener noreferrer">
                  Ver en YouTube <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className={styles.archiveNote}>Cada nota conserva el contexto de su publicación. Los enlaces permiten consultar la cobertura completa en el medio original; las opiniones y posiciones citadas corresponden a sus respectivos autores.</p>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </section>
  );
}
