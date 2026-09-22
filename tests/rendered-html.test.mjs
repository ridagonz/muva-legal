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
  assert.match(html, /hero-oficina-muva\.png/);
  assert.match(html, /hero-revision-caso\.png/);
  assert.match(html, /href="\/editorial"/);
});

test("server-renders the editorial catalogue", async () => {
  const response = await render("/editorial");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>Editorial y publicaciones \| MUVA Legal<\/title>/i);
  assert.match(html, /Catálogo editorial/);
  assert.match(html, /Contenido demostrativo/);
  assert.match(html, /Pagar con/);
});

test("server-renders the blog and its published article", async () => {
  const [blogResponse, articleResponse] = await Promise.all([
    render("/blog"),
    render("/blog/bienvenidos-a-construir"),
  ]);

  assert.equal(blogResponse.status, 200);
  assert.equal(articleResponse.status, 200);
  assert.match(await blogResponse.text(), /Comprender también es una forma de protegerse/);
  assert.match(await articleResponse.text(), /¡Bienvenidos a construir!/);
});
