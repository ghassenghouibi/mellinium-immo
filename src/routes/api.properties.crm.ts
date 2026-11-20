import { createFileRoute } from "@tanstack/react-router";

// Publication d'un nouveau bien depuis le CRM (contrat : src/server/crm-api.ts).
export const Route = createFileRoute("/api/properties/crm")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { failure, guard, json, publicUrl, readPayload } = await import("@/server/crm-api");
        const denied = guard(request);
        if (denied) return denied;
        const payload = await readPayload(request);
        if (payload instanceof Response) return payload;
        try {
          const { upsertListing } = await import("@/server/listings");
          const result = await upsertListing(payload, "create");
          if (!result) return failure("publish", new Error("upsert returned nothing"));
          return json(
            {
              success: true,
              reference: payload.reference,
              slug: result.slug,
              url: publicUrl(request, result.slug),
            },
            result.created ? 201 : 200,
          );
        } catch (error) {
          return failure("publish", error);
        }
      },
    },
  },
});
