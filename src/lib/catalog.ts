import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { useMemo } from "react";
import placeholder from "@/assets/tour/01-facade.jpg";
import { demoProperties, placesIn, typesIn, type Property } from "./properties";

type CatalogResponse = { source: "demo" } | { source: "crm"; properties: Property[] };

/**
 * Catalogue unique du site (accueil, recherche, fiches) : les biens publiés depuis le CRM quand
 * `DATABASE_URL` est configurée, sinon le catalogue de démonstration.
 */
export const fetchCatalog = createServerFn({ method: "GET" }).handler(
  async (): Promise<CatalogResponse> => {
    if (!process.env["DATABASE_URL"]) return { source: "demo" };
    try {
      const { listListings } = await import("@/server/listings");
      return { source: "crm", properties: await listListings() };
    } catch (error) {
      // A database outage shows an empty catalogue rather than demonstration homes passed off as real.
      console.error("Catalog unavailable", error);
      return { source: "crm", properties: [] };
    }
  },
);

export const catalogQuery = queryOptions({
  queryKey: ["catalog"],
  queryFn: () => fetchCatalog(),
  staleTime: 60_000,
});

export type Catalog = ReturnType<typeof buildCatalog>;

function buildCatalog(all: Property[]) {
  const available = all.filter((property) => property.status !== "closed");
  return {
    /** Biens disponibles (vendus et loués exclus). */
    properties: available,
    sale: available.filter((property) => property.transaction === "vente"),
    rental: available.filter((property) => property.transaction === "location"),
    types: typesIn(available),
    /** Délégations et localités des biens disponibles, avec les noms du CRM. */
    places: placesIn(available),
    rentalPlaces: placesIn(available.filter((property) => property.transaction === "location")),
    salePlaces: placesIn(available.filter((property) => property.transaction === "vente")),
    /** Toute fiche, y compris vendue ou louée, pour que les liens déjà partagés restent valides. */
    find: (id: string) => all.find((property) => property.id === id),
    all,
  };
}

function withPhoto(property: Property): Property {
  return property.gallery.length
    ? property
    : { ...property, image: placeholder, gallery: [placeholder] };
}

export function catalogFrom(response: CatalogResponse): Catalog {
  return buildCatalog(
    response.source === "demo" ? demoProperties : response.properties.map(withPhoto),
  );
}

/** À utiliser sous une route dont le loader a appelé `ensureQueryData(catalogQuery)`. */
export function useCatalog(): Catalog {
  const { data } = useSuspenseQuery(catalogQuery);
  return useMemo(() => catalogFrom(data), [data]);
}
