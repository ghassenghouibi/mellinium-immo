import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PropertySearchPage } from "@/components/estate/PropertySearchPage";
import { catalogQuery } from "@/lib/catalog";

const searchSchema = z.object({
  transaction: z.enum(["vente", "location"]).optional(),
  district: z.string().optional(),
  type: z.string().optional(),
  rooms: z.coerce.number().optional(),
  budget: z.coerce.number().optional(),
  bedrooms: z.coerce.number().optional(),
  area: z.coerce.number().optional(),
  feature: z.string().optional(),
  sort: z.enum(["recent", "price-asc", "price-desc", "area-desc"]).optional(),
});

export type PropertySearch = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/biens/")({
  ssr: false,
  validateSearch: searchSchema,
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogQuery),
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
  // Every criterion lives in the URL: a shared or reloaded link shows the same results.
  return <PropertySearchPage search={Route.useSearch()} />;
}
