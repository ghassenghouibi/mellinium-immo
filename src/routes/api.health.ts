import { createFileRoute } from "@tanstack/react-router";

// Sonde de santé du conteneur : 200 si le site répond et, quand elle est configurée, si la base répond.
export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async () => {
        if (!process.env["DATABASE_URL"])
          return Response.json({ status: "ok", database: "not-configured" });
        try {
          const { db } = await import("@/server/db");
          const sql = await db();
          await sql`SELECT 1`;
          return Response.json({ status: "ok", database: "up" });
        } catch (error) {
          console.error("Health check: database unreachable", error);
          return Response.json({ status: "error", database: "down" }, { status: 503 });
        }
      },
    },
  },
});
