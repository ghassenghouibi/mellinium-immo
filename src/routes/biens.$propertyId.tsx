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
    { title: loaderData ? `${loaderData.name} — ${loaderData.district} | Mellinium Immobilière` : "Property unavailable — Mellinium" },
    { name: "description", content: loaderData?.summary.en ?? "This property is no longer available." },
    { property: "og:title", content: loaderData ? `${loaderData.name} — Mellinium Immobilière` : "Property unavailable" },
    { property: "og:description", content: loaderData?.summary.en ?? "This property is no longer available." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: PropertyPage,
  notFoundComponent: () => <main className="grid min-h-screen place-items-center bg-background p-6 text-center text-foreground"><div><p className="eyebrow text-primary">Mellinium</p><h1 className="mt-4 font-display text-5xl">Cette adresse n’est plus disponible.<br /><em className="text-primary">This property is no longer available.</em></h1></div></main>,
});

function PropertyPage() {
  const property = Route.useLoaderData();
  return <PropertyDetailPage key={property.id} property={property} />;
}