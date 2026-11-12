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
    { title: "Homes for rent and sale in Greater Tunis — Mellinium Immobilière" },
    { name: "description", content: "Furnished and unfurnished rentals and homes for sale in La Marsa, Gammarth, Sidi Bou Saïd, Carthage and Les Berges du Lac, selected by Mellinium Immobilière." },
    { property: "og:title", content: "Our properties — Mellinium Immobilière" },
    { property: "og:description", content: "Carefully selected homes in the Northern suburbs of Greater Tunis." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: BiensPage,
});

function BiensPage() {
  const search = Route.useSearch();
  return <PropertySearchPage key={`${search.transaction}-${search.district}-${search.type}`} initial={search} />;
}
