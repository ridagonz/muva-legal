import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the MUVA Legal home page and carousel", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>MUVA Legal \| Abogados penalistas<\/title>/i);
  assert.match(html, /Estrategia/);
  assert.match(html, /Control del carrusel principal/);
  assert.match(html, /jose-luis-moreno\.webp/);
  assert.match(html, /Ver imagen 3 de 3/);
  assert.match(html, /href="\/editorial"/);
  assert.match(html, /Equipo/);
  assert.doesNotMatch(html, /href="\/blog"/);
});

test("server-renders the editorial catalogue", async () => {
  const response = await render("/editorial");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>Editorial y publicaciones \| MUVA Legal<\/title>/i);
  assert.match(html, /Catálogo editorial/);
  assert.match(html, /Publicaciones verificadas/);
  assert.match(html, /Institutos especiales de la justicia especial para la paz/);
  assert.match(html, /Continuar con/);
});

test("server-renders press coverage and the privacy page without Blog", async () => {
  const [pressResponse, privacyResponse, blogResponse] = await Promise.all([
    render("/prensa"),
    render("/privacidad"),
    render("/blog"),
  ]);

  assert.equal(pressResponse.status, 200);
  assert.equal(privacyResponse.status, 200);
  assert.equal(blogResponse.status, 404);
  assert.match(await pressResponse.text(), /Entrevistas y videos/);
  assert.match(await privacyResponse.text(), /Privacidad y tratamiento de datos/);
});
