import { createFileRoute, notFound } from "@tanstack/react-router";
import { PropertyDetailPage } from "@/components/estate/PropertyDetailPage";
import { getProperty } from "@/lib/properties";

export const Route = createFileRoute("/biens/$propertyId")({
  ssr: false,
  loader: ({ params }) => {
    const property = getProperty(params.propertyId);
    if (!property) throw notFound();
    return property;
  },
  head: ({ loaderData }) => ({ meta: [
    { title: loaderData ? `${loaderData.name} — ${loaderData.district}, La Marsa | Mellinium` : "Bien indisponible — Mellinium" },
    { name: "description", content: loaderData?.summary ?? "Ce bien n’est plus disponible." },
    { property: "og:title", content: loaderData ? `${loaderData.name} — Mellinium Immobilière` : "Bien indisponible" },
    { property: "og:description", content: loaderData?.summary ?? "Ce bien n’est plus disponible." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: PropertyPage,
  notFoundComponent: () => <main className="grid min-h-screen place-items-center bg-background p-6 text-center text-foreground"><div><p className="eyebrow text-primary">Mellinium</p><h1 className="mt-4 font-display text-5xl">Cette adresse n’est plus disponible.</h1></div></main>,
});

function PropertyPage() {
  const property = Route.useLoaderData();
  return <PropertyDetailPage key={property.id} property={property} />;
}