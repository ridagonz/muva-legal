"use client";

import Image from "next/image";
import { useState } from "react";
import { teamProfiles } from "./team-profiles";

const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export function TeamCarousel() {
  const [active, setActive] = useState(0);
  const total = teamProfiles.length;
  const changeProfile = (step: number) => setActive(current => (current + step + total) % total);

  return (
    <div className="team-carousel" role="region" aria-roledescription="carrusel" aria-label="Equipo de MUVA Legal"
      onKeyDown={event => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          changeProfile(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}>
      <div className="team-toolbar">
        <p className="team-counter" aria-live="polite" aria-atomic="true">
          <span>{String(active + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
          <span className="sr-only"> · {teamProfiles[active].name}</span>
        </p>
        <div className="team-arrows">
          <button type="button" aria-label="Perfil anterior" aria-controls="team-profiles" onClick={() => changeProfile(-1)}><span aria-hidden="true">←</span></button>
          <button type="button" aria-label="Perfil siguiente" aria-controls="team-profiles" onClick={() => changeProfile(1)}><span aria-hidden="true">→</span></button>
        </div>
      </div>
      <div className="team-picker" role="group" aria-label="Seleccionar integrante del equipo">
        {teamProfiles.map((member, index) => (
          <button key={member.initials} type="button" aria-pressed={active === index} aria-controls={`team-profile-${index}`} onClick={() => setActive(index)}>
            <span className="team-picker-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <span>{member.firstName}<br /><strong>{member.lastName}</strong></span>
          </button>
        ))}
      </div>
      <div id="team-profiles">
        {teamProfiles.map((member, index) => (
          <article id={`team-profile-${index}`} className="team-slide" key={member.initials} hidden={active !== index}
            role="group" aria-roledescription="diapositiva" aria-label={`${index + 1} de ${total}: ${member.name}`}>
            <div className={`team-portrait${member.image ? "" : " team-portrait-placeholder"}`} style={{ aspectRatio: member.imageAspectRatio }}>
              {member.image ? (
                <Image src={assetPath(member.image)} alt={`${member.name}, ${member.role} de MUVA Legal`} fill sizes="(max-width: 760px) 90vw, 35vw" />
              ) : (
                <div className="team-portrait-monogram" aria-label={`Espacio para la fotografía de ${member.name}`}>
                  <span aria-hidden="true">{member.initials}</span>
                  <small>MUVA LEGAL</small>
                </div>
              )}
              <span className="visual-index">{member.initials} / {String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="team-profile-copy">
              <p className="team-profile-role">{member.role}</p>
              <h3>{member.firstName}<br /><em>{member.lastName}</em></h3>
              <p className="team-profile-focus">{member.focus}</p>
              <div className="team-profile-bio">{member.bio.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
              <a className="team-contact" href="#contacto">Solicitar una reunión con el equipo <span aria-hidden="true">↗</span></a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
