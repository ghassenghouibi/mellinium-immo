import { createFileRoute } from "@tanstack/react-router";

// Photos des biens publiés depuis le CRM, stockées dans MEDIA_DIR (src/server/media.ts).
export const Route = createFileRoute("/media/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { readPhoto } = await import("@/server/media");
        const photo = await readPhoto(params._splat ?? "");
        if (!photo) return new Response("Not found", { status: 404 });
        return new Response(new Uint8Array(photo.body), {
          headers: { "content-type": photo.contentType, "cache-control": "public, max-age=604800" },
        });
      },
    },
  },
});
