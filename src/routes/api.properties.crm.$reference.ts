import { createFileRoute } from "@tanstack/react-router";

// Mise à jour et retrait d'un bien publié depuis le CRM (contrat : src/server/crm-api.ts).
export const Route = createFileRoute("/api/properties/crm/$reference")({
  server: {
    handlers: {
      PUT: async ({ request, params }) => {
        const { failure, guard, json, publicUrl, readPayload } = await import("@/server/crm-api");
        const denied = guard(request);
        if (denied) return denied;
        const payload = await readPayload(request, params.reference);
        if (payload instanceof Response) return payload;
        try {
          const { upsertListing } = await import("@/server/listings");
          const result = await upsertListing(payload, "update");
          if (!result)
            return json({ success: false, error: `Property ${params.reference} not found.` }, 404);
          return json({
            success: true,
            reference: payload.reference,
            slug: result.slug,
            url: publicUrl(request, result.slug),
          });
        } catch (error) {
          return failure("update", error);
        }
      },
      DELETE: async ({ request, params }) => {
        const { failure, guard, json } = await import("@/server/crm-api");
        const denied = guard(request);
        if (denied) return denied;
        const closed = new URL(request.url).searchParams.get("status") === "vendu_loue";
        try {
          const { unpublishListing } = await import("@/server/listings");
          const found = await unpublishListing(params.reference, closed);
          if (!found)
            return json({ success: false, error: `Property ${params.reference} not found.` }, 404);
          return json({
            success: true,
            reference: params.reference,
            status: closed ? "closed" : "removed",
          });
        } catch (error) {
          return failure("unpublish", error);
        }
      },
    },
  },
});
