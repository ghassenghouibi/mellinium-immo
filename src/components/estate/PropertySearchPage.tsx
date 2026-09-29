import { Link } from "@tanstack/react-router";
import { ArrowLeft, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "./PropertyCard";
import { SiteHeader } from "./SiteHeader";
import { SocialLinks } from "./SocialLinks";
import { cities, properties, propertyTypes, type PropertyTransaction } from "@/lib/properties";

type InitialSearch = { transaction?: PropertyTransaction; city?: string; rooms?: number };

export function PropertySearchPage({ initial }: { initial: InitialSearch }) {
  const [transaction, setTransaction] = useState<PropertyTransaction>(initial.transaction ?? "vente");
  const [city, setCity] = useState(initial.city ?? "");
  const [type, setType] = useState("");
  const [rooms, setRooms] = useState(initial.rooms ?? 0);
  const [budget, setBudget] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => properties.filter((property) =>
    property.transaction === transaction &&
    (!city || property.city === city) &&
    (!type || property.type === type) &&
    (!rooms || property.rooms >= rooms) &&
    (!budget || property.price <= budget)
  ), [transaction, city, type, rooms, budget]);

  const reset = () => { setCity(""); setType(""); setRooms(0); setBudget(0); };

  return (
    <main className="min-h-screen bg-panel text-panel-foreground">
      <div className="bg-menu"><SiteHeader /></div>
      <section className="border-b border-border px-5 pb-12 pt-14 md:px-10 md:pb-16 md:pt-20">
        <div className="mx-auto max-w-7xl">
          <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase text-muted-foreground transition-colors hover:text-primary"><ArrowLeft className="h-4 w-4" /> Retour à l’agence</Link>
          <p className="eyebrow mt-12 text-primary">Collection Mellinium</p>
          <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h1 className="font-display text-6xl leading-[.9] md:text-8xl">Trouver<br /><em>votre adresse.</em></h1>
            <p className="max-w-md text-sm leading-7 text-muted-foreground">Des biens choisis pour leur singularité, leur situation et la qualité de leur architecture.</p>
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-30 border-b border-border bg-panel/95 px-5 py-4 backdrop-blur-xl md:px-10">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="flex border border-border">
            {(["vente", "location"] as const).map((value) => <Button key={value} variant={transaction === value ? "default" : "ghost"} className="rounded-none capitalize" onClick={() => setTransaction(value)}>{value}</Button>)}
          </div>
          <div className="hidden flex-1 items-center gap-3 lg:flex">
            <select aria-label="Localisation" value={city} onChange={(event) => setCity(event.target.value)} className="filter-select"><option value="">Toutes les villes</option>{cities.map((item) => <option key={item}>{item}</option>)}</select>
            <select aria-label="Type de bien" value={type} onChange={(event) => setType(event.target.value)} className="filter-select"><option value="">Tous les biens</option>{propertyTypes.map((item) => <option key={item}>{item}</option>)}</select>
            <select aria-label="Nombre de pièces" value={rooms} onChange={(event) => setRooms(Number(event.target.value))} className="filter-select"><option value="0">Toutes pièces</option>{[2,3,4,5,6].map((item) => <option key={item} value={item}>{item}+ pièces</option>)}</select>
            <select aria-label="Budget maximum" value={budget} onChange={(event) => setBudget(Number(event.target.value))} className="filter-select"><option value="0">Budget maximum</option>{(transaction === "vente" ? [1000000,2000000,3500000,5000000] : [3000,5000,10000,15000]).map((item) => <option key={item} value={item}>{new Intl.NumberFormat("fr-FR").format(item)} €</option>)}</select>
          </div>
          <Button variant="outline" className="ml-auto lg:hidden" onClick={() => setFiltersOpen(true)}><SlidersHorizontal /> Filtres</Button>
          <Button variant="ghost" size="icon" onClick={reset} aria-label="Effacer les filtres" title="Effacer les filtres"><X /></Button>
        </div>
      </section>

      <section className="px-5 py-12 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex items-center justify-between"><p className="text-sm text-muted-foreground"><strong className="text-foreground">{results.length}</strong> {results.length > 1 ? "adresses" : "adresse"}</p><span className="eyebrow text-primary">Sélection éditoriale</span></div>
          {results.length ? <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{results.map((property) => <PropertyCard key={property.id} property={property} />)}</div> : <div className="border border-border px-6 py-20 text-center"><Search className="mx-auto h-7 w-7 text-primary" /><h2 className="mt-5 font-display text-4xl">Aucun bien ne correspond encore.</h2><p className="mt-3 text-sm text-muted-foreground">Élargissez votre recherche ou confiez-nous votre projet confidentiel.</p><Button className="mt-7" onClick={reset}>Élargir la recherche</Button></div>}
        </div>
      </section>
      <footer className="border-t border-border px-5 py-9 md:px-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center"><p className="text-xs text-muted-foreground">© 2026 Mellinium Immobilière Housing</p><SocialLinks compact /></div></footer>

      {filtersOpen && <div className="fixed inset-0 z-50 bg-menu p-6 text-menu-foreground"><div className="flex items-center justify-between"><h2 className="font-display text-4xl">Vos critères</h2><Button variant="glass" size="icon" onClick={() => setFiltersOpen(false)} aria-label="Fermer"><X /></Button></div><div className="mt-12 grid gap-5"><label className="filter-label">Localisation<select value={city} onChange={(event) => setCity(event.target.value)} className="filter-select mt-2 w-full"><option value="">Toutes les villes</option>{cities.map((item) => <option key={item}>{item}</option>)}</select></label><label className="filter-label">Type<select value={type} onChange={(event) => setType(event.target.value)} className="filter-select mt-2 w-full"><option value="">Tous les biens</option>{propertyTypes.map((item) => <option key={item}>{item}</option>)}</select></label><label className="filter-label">Pièces<select value={rooms} onChange={(event) => setRooms(Number(event.target.value))} className="filter-select mt-2 w-full"><option value="0">Toutes pièces</option>{[2,3,4,5,6].map((item) => <option key={item} value={item}>{item}+ pièces</option>)}</select></label><Button className="mt-5" onClick={() => setFiltersOpen(false)}>Afficher {results.length} résultat{results.length > 1 ? "s" : ""}</Button></div></div>}
    </main>
  );
}