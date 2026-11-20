import { createHash, timingSafeEqual } from "node:crypto";
import { databaseConfigured } from "./db";
import { MediaError } from "./media";
import { crmPayloadSchema, type CrmPayload } from "./listings";

/**
 * Contrat de l’API de publication appelée par le CRM (même forme que les autres sites d’agence du CRM) :
 *   POST   /api/properties/crm               crée le bien            → 201
 *   PUT    /api/properties/crm/:reference    met à jour              → 200, 404 si inconnu (le CRM fait alors un POST)
 *   DELETE /api/properties/crm/:reference    retire                  → 200, 404 si inconnu
 *          ?status=vendu_loue                garde en ligne « Vendu » / « Loué »
 * Authentification : `Authorization: Bearer <CRM_API_KEY>`. Réponses toujours en JSON.
 */

export function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "cache-control": "no-store" } });
}

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

/** Response to return when the request may not proceed, otherwise undefined. */
export function guard(request: Request): Response | undefined {
  const expected = process.env["CRM_API_KEY"]?.trim();
  if (!expected || !databaseConfigured()) {
    return json(
      {
        success: false,
        error: "CRM publishing is not configured on this site (CRM_API_KEY / DATABASE_URL).",
      },
      503,
    );
  }
  const header = request.headers.get("authorization") ?? "";
  const token = header.toLowerCase().startsWith("bearer ") ? header.slice(7).trim() : "";
  if (!token || !timingSafeEqual(digest(token), digest(expected))) {
    return json({ success: false, error: "Unauthorized" }, 401);
  }
  return undefined;
}

export async function readPayload(
  request: Request,
  reference?: string,
): Promise<CrmPayload | Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, error: "Body must be JSON." }, 400);
  }
  if (reference && body && typeof body === "object" && !("reference" in body)) {
    body = { ...body, reference };
  }
  const parsed = crmPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      {
        success: false,
        error: "Invalid property payload.",
        issues: parsed.error.issues.slice(0, 10),
      },
      422,
    );
  }
  if (reference && parsed.data.reference !== reference) {
    return json(
      {
        success: false,
        error: `Reference mismatch: URL ${reference}, body ${parsed.data.reference}.`,
      },
      422,
    );
  }
  return parsed.data;
}

export function failure(action: string, error: unknown) {
  if (error instanceof MediaError) {
    console.error(`CRM ${action}: photo download failed`, error.message);
    return json({ success: false, error: error.message }, 502);
  }
  console.error(`CRM ${action} failed`, error);
  return json({ success: false, error: "Internal error." }, 500);
}

/** Public origin of the site: SITE_URL behind the HTTPS proxy, else the request's own origin. */
export function siteOrigin(request: Request) {
  return (process.env["SITE_URL"] || new URL(request.url).origin).replace(/\/+$/, "");
}

export function publicUrl(request: Request, slug: string) {
  return `${siteOrigin(request)}/biens/${slug}`;
}
