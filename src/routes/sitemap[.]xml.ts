import { createFileRoute } from "@tanstack/react-router";

// Plan du site pour les moteurs de recherche : pages fixes et fiches des biens disponibles.
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { siteOrigin } = await import("@/server/crm-api");
        const origin = siteOrigin(request);
        const paths = ["/", "/biens?transaction=location", "/biens?transaction=vente"];
        if (process.env["DATABASE_URL"]) {
          try {
            const { listListings } = await import("@/server/listings");
            for (const property of await listListings()) {
              if (property.status !== "closed") paths.push(`/biens/${property.id}`);
            }
          } catch (error) {
            console.error("Sitemap: listings unavailable", error);
          }
        }
        const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;");
        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
          .map((path) => `  <url><loc>${escape(origin + path)}</loc></url>`)
          .join("\n")}\n</urlset>\n`;
        return new Response(body, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
