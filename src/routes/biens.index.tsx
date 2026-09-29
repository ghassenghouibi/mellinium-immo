import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PropertySearchPage } from "@/components/estate/PropertySearchPage";

const searchSchema = z.object({
  transaction: z.enum(["vente", "location"]).optional(),
  city: z.string().optional(),
  rooms: z.coerce.number().optional(),
});

export const Route = createFileRoute("/biens/")({
  ssr: false,
  validateSearch: searchSchema,
  head: () => ({ meta: [
    { title: "Biens à vendre et à louer — Mellinium Immobilière" },
    { name: "description", content: "Découvrez la sélection de villas, maisons et appartements à vendre ou à louer par Mellinium Immobilière Housing." },
    { property: "og:title", content: "Nos biens — Mellinium Immobilière" },
    { property: "og:description", content: "Une collection d’adresses choisies sur la Côte d’Azur." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: BiensPage,
});

function BiensPage() {
  return <PropertySearchPage initial={Route.useSearch()} />;
}