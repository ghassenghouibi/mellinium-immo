import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PropertySearchPage } from "@/components/estate/PropertySearchPage";

const searchSchema = z.object({
  transaction: z.enum(["vente", "location"]).optional(),
  district: z.string().optional(),
  type: z.string().optional(),
  rooms: z.coerce.number().optional(),
  budget: z.coerce.number().optional(),
});

export const Route = createFileRoute("/biens/")({
  ssr: false,
  validateSearch: searchSchema,
  head: () => ({ meta: [
    { title: "Biens à vendre et à louer à La Marsa — Mellinium Immobilière" },
    { name: "description", content: "Villas, maisons et appartements à vendre ou à louer à La Marsa, Gammarth et Sidi Abdelaziz, sélectionnés par Mellinium Immobilière Housing." },
    { property: "og:title", content: "Nos biens à La Marsa — Mellinium Immobilière" },
    { property: "og:description", content: "Une collection d’adresses d’exception à La Marsa." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: BiensPage,
});

function BiensPage() {
  const search = Route.useSearch();
  return <PropertySearchPage key={`${search.transaction}-${search.district}-${search.type}`} initial={search} />;
}
