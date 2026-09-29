import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import piscine from "@/assets/tour/07-piscine.jpg";
import salon from "@/assets/tour/03-salon.jpg";
import { Button } from "@/components/ui/button";
import { agency } from "@/lib/agency";
import { districts, formatAmount, properties, propertyTypes, rentBudgets, saleBudgets, type PropertyTransaction } from "@/lib/properties";
import { PropertyCard } from "./PropertyCard";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

type InitialSearch = { transaction?: PropertyTransaction | undefined; district?: string | undefined; type?: string | undefined; rooms?: number | undefined; budget?: number | undefined };
type SortOrder = "recent" | "price-asc" | "price-desc" | "area-desc";

const intro = {
  vente: { eyebrow: "Acheter à La Marsa", title: "Biens", accent: "à vendre.", text: "Villas d’architecte, demeures de caractère et appartements face à la mer : une sélection exigeante, visitée et vérifiée par notre équipe.", image: piscine },
  location: { eyebrow: "Louer à La Marsa", title: "Biens", accent: "à louer.", text: "Locations meublées ou à l’année, prêtes à vivre, pour familles, expatriés et séjours longue durée.", image: salon },
} as const;

export function PropertySearchPage({ initial }: { initial: InitialSearch }) {
  const navigate = useNavigate();
  const transaction = initial.transaction ?? "vente";
  const [district, setDistrict] = useState(initial.district ?? "");
  const [type, setType] = useState(initial.type ?? "");
  const [rooms, setRooms] = useState(initial.rooms ?? 0);
  const [budget, setBudget] = useState(initial.budget ?? 0);
  const [bedrooms, setBedrooms] = useState(0);
  const [minArea, setMinArea] = useState(0);
  const [feature, setFeature] = useState("");
  const [sort, setSort] = useState<SortOrder>("recent");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const budgets = transaction === "vente" ? saleBudgets : rentBudgets;
  const copy = intro[transaction];

  const results = useMemo(() => {
    const filtered = properties.filter((property) =>
      property.transaction === transaction &&
      (!district || property.district === district) &&
      (!type || property.type === type) &&
      (!rooms || property.rooms >= rooms) &&
      (!budget || property.price <= budget) &&
      (!bedrooms || property.bedrooms >= bedrooms) &&
      (!minArea || property.area >= minArea) &&
      (!feature || property.features.some((item) => item.toLocaleLowerCase("fr").includes(feature.toLocaleLowerCase("fr"))))
    );
    if (sort === "price-asc") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...filtered].sort((a, b) => b.price - a.price);
    if (sort === "area-desc") return [...filtered].sort((a, b) => b.area - a.area);
    return filtered;
  }, [transaction, district, type, rooms, budget, bedrooms, minArea, feature, sort]);

  const advancedCount = Number(bedrooms > 0) + Number(minArea > 0) + Number(Boolean(feature));
  const reset = () => { setDistrict(""); setType(""); setRooms(0); setBudget(0); setBedrooms(0); setMinArea(0); setFeature(""); };
  const switchTransaction = (value: PropertyTransaction) => void navigate({ to: "/biens", search: { transaction: value, district: district || undefined, type: type || undefined } });

  const basicFilters = (mobile: boolean) => (
    <>
      <label className={mobile ? "filter-label" : "contents"}>{mobile && "Quartier"}<select aria-label="Quartier" value={district} onChange={(event) => setDistrict(event.target.value)} className={`filter-select ${mobile ? "mt-2 w-full" : ""}`}><option value="">Toute La Marsa</option>{districts.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label className={mobile ? "filter-label" : "contents"}>{mobile && "Type"}<select aria-label="Type de bien" value={type} onChange={(event) => setType(event.target.value)} className={`filter-select ${mobile ? "mt-2 w-full" : ""}`}><option value="">Tous les biens</option>{propertyTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label className={mobile ? "filter-label" : "contents"}>{mobile && "Pièces"}<select aria-label="Nombre de pièces" value={rooms} onChange={(event) => setRooms(Number(event.target.value))} className={`filter-select ${mobile ? "mt-2 w-full" : ""}`}><option value="0">Toutes pièces</option>{[2, 3, 4, 5, 6].map((item) => <option key={item} value={item}>{item}+ pièces</option>)}</select></label>
      <label className={mobile ? "filter-label" : "contents"}>{mobile && "Budget maximum"}<select aria-label="Budget maximum" value={budget} onChange={(event) => setBudget(Number(event.target.value))} className={`filter-select ${mobile ? "mt-2 w-full" : ""}`}><option value="0">Budget maximum</option>{budgets.map((item) => <option key={item} value={item}>{formatAmount(item)}</option>)}</select></label>
    </>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden px-5 py-20 text-on-image md:px-10 md:py-28">
          <img key={copy.image} src={copy.image} alt="" className="property-detail-cover absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-contact-overlay" />
          <div className="rise-in relative mx-auto max-w-7xl">
            <p className="eyebrow eyebrow-rule">{copy.eyebrow}</p>
            <h1 className="mt-5 font-display text-6xl font-medium leading-[.9] md:text-8xl">{copy.title} <em>{copy.accent}</em></h1>
            <p className="mt-6 max-w-xl leading-8 text-on-image-muted">{copy.text}</p>
            <div className="mt-8 inline-flex rounded-full border border-on-image/40 bg-glass p-1 backdrop-blur-md">
              {(["vente", "location"] as const).map((value) => <button key={value} type="button" onClick={() => switchTransaction(value)} className={`rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[.14em] transition-colors ${transaction === value ? "bg-card text-foreground" : "text-on-image hover:bg-glass-hover"}`}>{value === "vente" ? "Acheter" : "Louer"}</button>)}
            </div>
          </div>
        </section>

        <section className="sticky top-[4.6rem] z-30 border-b border-border bg-background/95 px-5 py-4 backdrop-blur-xl md:px-10">
          <div className="mx-auto flex max-w-7xl items-center gap-3">
            <div className="hidden flex-1 items-center gap-3 lg:flex">{basicFilters(false)}</div>
            <Button variant="outline" className="h-11 rounded-full lg:ml-auto" onClick={() => setFiltersOpen(true)}><SlidersHorizontal /><span className="lg:hidden">Filtres</span><span className="hidden lg:inline">Plus de critères</span>{advancedCount > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground">{advancedCount}</span>}</Button>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={reset} aria-label="Effacer les filtres" title="Effacer les filtres"><X /></Button>
          </div>
        </section>

        <section className="px-5 py-12 md:px-10 md:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-9 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground"><strong className="font-display text-3xl text-foreground">{results.length}</strong> {results.length > 1 ? "biens" : "bien"} {transaction === "vente" ? "à vendre" : "à louer"}{district ? ` à ${district}` : " à La Marsa"}</p>
              <label className="flex items-center gap-3 text-xs text-muted-foreground">Trier par
                <select value={sort} onChange={(event) => setSort(event.target.value as SortOrder)} className="filter-select !flex-none"><option value="recent">Sélection de l’agence</option><option value="price-asc">Prix croissant</option><option value="price-desc">Prix décroissant</option><option value="area-desc">Plus grande surface</option></select>
              </label>
            </div>
            {results.length ? (
              <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{results.map((property) => <PropertyCard key={property.id} property={property} />)}</div>
            ) : (
              <div className="border border-border bg-card px-6 py-20 text-center"><Search className="mx-auto h-7 w-7 text-primary" /><h2 className="mt-5 font-display text-4xl">Aucun bien ne correspond encore.</h2><p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">Élargissez votre recherche ou confiez-nous votre projet : de nombreux biens de La Marsa sont proposés en toute confidentialité.</p><Button className="mt-7 rounded-full" onClick={reset}>Élargir la recherche</Button></div>
            )}
          </div>
        </section>

        <section className="bg-panel px-5 py-16 md:px-10">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div><p className="eyebrow text-primary">Recherche confidentielle</p><p className="mt-3 font-display text-3xl md:text-4xl">Vous ne trouvez pas le bien idéal&nbsp;? Nous le cherchons pour vous.</p></div>
            <Button asChild className="h-12 shrink-0 rounded-full px-6"><a href={`mailto:${agency.email}?subject=${encodeURIComponent(`Recherche ${transaction === "vente" ? "achat" : "location"} à La Marsa`)}`}>Confier ma recherche <ArrowRight /></a></Button>
          </div>
        </section>
      </main>
      <SiteFooter />

      {filtersOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-ink/40 backdrop-blur-sm" onClick={() => setFiltersOpen(false)}>
          <div className="h-full w-full overflow-y-auto bg-background p-6 shadow-2xl md:w-[31rem] md:p-10" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Critères de recherche">
            <div className="flex items-center justify-between"><div><p className="eyebrow text-primary">Affinez votre recherche</p><h2 className="mt-2 font-display text-4xl">Vos critères</h2></div><Button variant="outline" size="icon" className="rounded-full" onClick={() => setFiltersOpen(false)} aria-label="Fermer"><X /></Button></div>
            <div className="mt-10 grid gap-5">
              <div className="grid gap-5 lg:hidden">{basicFilters(true)}<div className="my-2 border-t border-border" /></div>
              <label className="filter-label">Chambres minimum<select aria-label="Chambres minimum" value={bedrooms} onChange={(event) => setBedrooms(Number(event.target.value))} className="filter-select mt-2 w-full"><option value="0">Indifférent</option>{[1, 2, 3, 4, 5].map((item) => <option key={item} value={item}>{item}+ chambres</option>)}</select></label>
              <label className="filter-label">Surface minimum<select aria-label="Surface minimum" value={minArea} onChange={(event) => setMinArea(Number(event.target.value))} className="filter-select mt-2 w-full"><option value="0">Indifférente</option>{[80, 120, 160, 250, 350].map((item) => <option key={item} value={item}>{item} m² minimum</option>)}</select></label>
              <label className="filter-label">Prestation recherchée<select aria-label="Prestation recherchée" value={feature} onChange={(event) => setFeature(event.target.value)} className="filter-select mt-2 w-full"><option value="">Toutes prestations</option><option value="piscine">Piscine</option><option value="vue mer">Vue mer</option><option value="jardin">Jardin</option><option value="parking">Parking</option><option value="meubl">Meublé</option><option value="terrasse">Terrasse</option></select></label>
              <Button className="mt-5 min-h-12 rounded-full" onClick={() => setFiltersOpen(false)}>Afficher {results.length} résultat{results.length > 1 ? "s" : ""}</Button>
              <Button variant="ghost" onClick={reset}>Effacer tous les critères</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
