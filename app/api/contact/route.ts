const MAX_REQUESTS_PER_WINDOW = 5;
const WINDOW_MS = 10 * 60 * 1000;

type RateLimitEntry = { count: number; expiresAt: number };
const requestLimits = new Map<string, RateLimitEntry>();

function clientKey(request: Request) {
  return request.headers.get("cf-connecting-ip")
    ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? "unknown";
}

function allowRequest(request: Request) {
  const key = clientKey(request);
  const now = Date.now();
  const current = requestLimits.get(key);

  if (!current || current.expiresAt <= now) {
    requestLimits.set(key, { count: 1, expiresAt: now + WINDOW_MS });
    return true;
  }

  if (current.count >= MAX_REQUESTS_PER_WINDOW) return false;
  current.count += 1;
  return true;
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const requestOrigin = new URL(request.url).origin;
  if (origin && origin !== requestOrigin) {
    return Response.json({ error: "Origen no permitido." }, { status: 403 });
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: "Formato de solicitud inválido." }, { status: 415 });
  }

  if (!allowRequest(request)) {
    return Response.json({ error: "Demasiados intentos. Inténtalo de nuevo más tarde." }, { status: 429 });
  }

  try {
    const body = await request.json() as Record<string, unknown>;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const website = typeof body.website === "string" ? body.website.trim() : "";
    const captcha = typeof body.captcha === "string" ? body.captcha.trim() : "";

    if (website) return Response.json({ ok: true });
    if (captcha !== "12") {
      return Response.json({ error: "Revisa la respuesta de seguridad." }, { status: 400 });
    }
    if (name.length < 2 || name.length > 80 || !validEmail(email) || message.length < 20 || message.length > 2000) {
      return Response.json({ error: "Revisa los datos de contacto e inténtalo nuevamente." }, { status: 400 });
    }

    const action = process.env.GOOGLE_FORM_ACTION ?? process.env.NEXT_PUBLIC_GOOGLE_FORM_ACTION ?? "";
    if (!action) return Response.json({ ok: true, delivery: "mailto" });

    const actionUrl = new URL(action);
    if (actionUrl.protocol !== "https:" || actionUrl.hostname !== "docs.google.com") {
      return Response.json({ error: "La configuración de contacto no es válida." }, { status: 500 });
    }

    const payload = new FormData();
    payload.append(process.env.GOOGLE_FORM_NAME_FIELD ?? process.env.NEXT_PUBLIC_GOOGLE_FORM_NAME_FIELD ?? "entry.name", name);
    payload.append(process.env.GOOGLE_FORM_EMAIL_FIELD ?? process.env.NEXT_PUBLIC_GOOGLE_FORM_EMAIL_FIELD ?? "entry.email", email);
    payload.append(process.env.GOOGLE_FORM_MESSAGE_FIELD ?? process.env.NEXT_PUBLIC_GOOGLE_FORM_MESSAGE_FIELD ?? "entry.message", message);

    await fetch(actionUrl, { method: "POST", body: payload, redirect: "manual" });
    return Response.json({ ok: true, delivery: "form" });
  } catch {
    return Response.json({ error: "No fue posible enviar la consulta. Inténtalo de nuevo o contáctanos por correo." }, { status: 502 });
  }
}
