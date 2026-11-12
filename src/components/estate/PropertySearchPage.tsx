import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import piscine from "@/assets/tour/07-piscine.jpg";
import salon from "@/assets/tour/03-salon.jpg";
import { Button } from "@/components/ui/button";
import { agency } from "@/lib/agency";
import { useI18n } from "@/lib/i18n";
import { districts, featureFilters, formatAmount, properties, propertyTypeLabels, propertyTypes, rentBudgets, saleBudgets, type PropertyTransaction, type PropertyType } from "@/lib/properties";
import { SegmentedControl, SelectField } from "./fields";
import { PropertyCard } from "./PropertyCard";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

type InitialSearch = { transaction?: PropertyTransaction | undefined; district?: string | undefined; type?: string | undefined; rooms?: number | undefined; budget?: number | undefined };
type SortOrder = "recent" | "price-asc" | "price-desc" | "area-desc";

const intro = {
  vente: {
    eyebrow: { fr: "Acheter dans le Grand Tunis", en: "Buy in Greater Tunis" },
    title: { fr: "Biens", en: "Homes" },
    accent: { fr: "à vendre.", en: "for sale." },
    text: { fr: "Une sélection choisie de biens résidentiels pour investir ou s’établir durablement en Tunisie, visités et vérifiés par notre équipe.", en: "A curated selection of residential properties to invest or establish a long-term presence in Tunisia, visited and checked by our team." },
    image: piscine,
  },
  location: {
    eyebrow: { fr: "Louer dans le Grand Tunis", en: "Rent in Greater Tunis" },
    title: { fr: "Biens", en: "Homes" },
    accent: { fr: "à louer.", en: "for rent." },
    text: { fr: "Locations meublées et non meublées, de longue durée, sélectionnées selon vos exigences, votre budget et votre mode de vie.", en: "Furnished and unfurnished long-term rentals, selected according to your requirements, budget and lifestyle." },
    image: salon,
  },
} as const;

export function PropertySearchPage({ initial }: { initial: InitialSearch }) {
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const transaction = initial.transaction ?? "location";
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
    const featureFilter = featureFilters.find((item) => item.value === feature);
    const filtered = properties.filter((property) =>
      property.transaction === transaction &&
      (!district || property.district === district) &&
      (!type || property.type === type) &&
      (!rooms || property.rooms >= rooms) &&
      (!budget || property.price <= budget) &&
      (!bedrooms || property.bedrooms >= bedrooms) &&
      (!minArea || property.area >= minArea) &&
      (!featureFilter || featureFilter.matches(property))
    );
    if (sort === "price-asc") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...filtered].sort((a, b) => b.price - a.price);
    if (sort === "area-desc") return [...filtered].sort((a, b) => b.area - a.area);
    return filtered;
  }, [transaction, district, type, rooms, budget, bedrooms, minArea, feature, sort]);

  const advancedCount = Number(bedrooms > 0) + Number(minArea > 0) + Number(Boolean(feature));
  const reset = () => { setDistrict(""); setType(""); setRooms(0); setBudget(0); setBedrooms(0); setMinArea(0); setFeature(""); };
  const switchTransaction = (value: PropertyTransaction) => void navigate({ to: "/biens", search: { transaction: value, district: district || undefined, type: type || undefined } });

  const areaOptions = [{ value: "", label: t({ fr: "Tous les quartiers", en: "All areas" }) }, ...districts.map((item) => ({ value: item, label: item }))];
  const typeOptions = [{ value: "", label: t({ fr: "Tous les biens", en: "All properties" }) }, ...propertyTypes.map((item) => ({ value: item, label: t(propertyTypeLabels[item as PropertyType].singular) }))];
  const roomOptions = [{ value: "0", label: t({ fr: "Toutes pièces", en: "Any rooms" }) }, ...[2, 3, 4, 5, 6].map((item) => ({ value: String(item), label: `${item}+ ${t({ fr: "pièces", en: "rooms" })}` }))];
  const budgetOptions = [{ value: "0", label: t({ fr: "Sans limite de budget", en: "No budget limit" }) }, ...budgets.map((item) => ({ value: String(item), label: formatAmount(item, lang) }))];

  /** Sur grand écran les libellés restent masqués dans la barre ; dans le panneau ils sont visibles. */
  const basicFilters = (inPanel: boolean) => (
    <>
      <SelectField className={inPanel ? "" : "flex-1"} hideLabel={!inPanel} label={t({ fr: "Quartier", en: "Area" })} value={district} onValueChange={setDistrict} options={areaOptions} />
      <SelectField className={inPanel ? "" : "flex-1"} hideLabel={!inPanel} label={t({ fr: "Type de bien", en: "Property type" })} value={type} onValueChange={setType} options={typeOptions} />
      <SelectField className={inPanel ? "" : "flex-1"} hideLabel={!inPanel} label={t({ fr: "Pièces", en: "Rooms" })} value={String(rooms)} onValueChange={(value) => setRooms(Number(value))} options={roomOptions} />
      <SelectField className={inPanel ? "" : "flex-1"} hideLabel={!inPanel} label={t({ fr: "Budget maximum", en: "Maximum budget" })} value={String(budget)} onValueChange={(value) => setBudget(Number(value))} options={budgetOptions} />
    </>
  );

  const countLabel = lang === "fr"
    ? `${results.length > 1 ? "biens" : "bien"} ${transaction === "vente" ? "à vendre" : "à louer"}${district ? ` à ${district}` : " dans le Grand Tunis"}`
    : `${results.length === 1 ? "property" : "properties"} ${transaction === "vente" ? "for sale" : "for rent"}${district ? ` in ${district}` : " in Greater Tunis"}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden px-5 py-20 text-on-image md:px-10 md:py-28">
          <img key={copy.image} src={copy.image} alt="" className="property-detail-cover absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-contact-overlay" />
          <div className="rise-in relative mx-auto max-w-7xl">
            <p className="eyebrow eyebrow-rule">{t(copy.eyebrow)}</p>
            <h1 className="mt-5 font-display text-6xl font-medium leading-[.9] md:text-8xl">{t(copy.title)} <em>{t(copy.accent)}</em></h1>
            <p className="mt-6 max-w-xl leading-8 text-on-image-muted">{t(copy.text)}</p>
            <SegmentedControl
              tone="glass"
              className="mt-8 w-72"
              label="Transaction"
              value={transaction}
              onChange={switchTransaction}
              options={[{ value: "location", label: t({ fr: "Louer", en: "Rent" }) }, { value: "vente", label: t({ fr: "Acheter", en: "Buy" }) }]}
            />
          </div>
        </section>

        <section className="sticky top-[4.6rem] z-30 border-b border-border bg-background/95 px-5 py-4 backdrop-blur-xl md:px-10">
          <div className="mx-auto flex max-w-7xl items-center gap-3">
            <div className="hidden flex-1 items-center gap-3 lg:flex">{basicFilters(false)}</div>
            <Button variant="outline" className="h-11 rounded-full lg:ml-auto" onClick={() => setFiltersOpen(true)}><SlidersHorizontal /><span className="lg:hidden">{t({ fr: "Filtres", en: "Filters" })}</span><span className="hidden lg:inline">{t({ fr: "Plus de critères", en: "More filters" })}</span>{advancedCount > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground">{advancedCount}</span>}</Button>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={reset} aria-label={t({ fr: "Effacer les filtres", en: "Clear filters" })} title={t({ fr: "Effacer les filtres", en: "Clear filters" })}><X /></Button>
          </div>
        </section>

        <section className="px-5 py-12 md:px-10 md:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
              <p className="text-sm text-muted-foreground"><strong className="font-display text-3xl text-foreground">{results.length}</strong> {countLabel}</p>
              <SelectField
                className="w-60"
                label={t({ fr: "Trier par", en: "Sort by" })}
                value={sort}
                onValueChange={(value) => setSort(value as SortOrder)}
                options={[
                  { value: "recent", label: t({ fr: "Sélection de l’agence", en: "Agency selection" }) },
                  { value: "price-asc", label: t({ fr: "Prix croissant", en: "Price: low to high" }) },
                  { value: "price-desc", label: t({ fr: "Prix décroissant", en: "Price: high to low" }) },
                  { value: "area-desc", label: t({ fr: "Plus grande surface", en: "Largest surface" }) },
                ]}
              />
            </div>
            {results.length ? (
              <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{results.map((property) => <PropertyCard key={property.id} property={property} />)}</div>
            ) : (
              <div className="border border-border bg-card px-6 py-20 text-center"><Search className="mx-auto h-7 w-7 text-primary" /><h2 className="mt-5 font-display text-4xl">{t({ fr: "Aucun bien ne correspond encore.", en: "No property matches yet." })}</h2><p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">{t({ fr: "Élargissez votre recherche ou confiez-nous votre projet : nous identifions pour vous les biens adaptés, y compris ceux proposés en toute discrétion.", en: "Broaden your search or entrust us with your project: we identify suitable properties for you, including those offered discreetly." })}</p><Button className="mt-7 rounded-full" onClick={reset}>{t({ fr: "Élargir la recherche", en: "Broaden the search" })}</Button></div>
            )}
          </div>
        </section>

        <section className="bg-panel px-5 py-16 md:px-10">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div><p className="eyebrow text-primary">{t({ fr: "Recherche & sélection", en: "Property search & selection" })}</p><p className="mt-3 font-display text-3xl md:text-4xl">{t({ fr: "Vous ne trouvez pas le bien idéal ? Nous le cherchons pour vous.", en: "Can’t find the right home? We’ll search for you." })}</p></div>
            <Button asChild className="h-12 shrink-0 rounded-full px-6"><a href={`mailto:${agency.email}?subject=${encodeURIComponent(transaction === "vente" ? t({ fr: "Recherche d’achat", en: "Purchase search" }) : t({ fr: "Recherche de location", en: "Rental search" }))}`}>{t({ fr: "Confier ma recherche", en: "Entrust my search" })} <ArrowRight /></a></Button>
          </div>
        </section>
      </main>
      <SiteFooter />

      {filtersOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-ink/40 backdrop-blur-sm" onClick={() => setFiltersOpen(false)}>
          <div className="h-full w-full overflow-y-auto bg-background p-6 shadow-2xl md:w-[31rem] md:p-10" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={t({ fr: "Critères de recherche", en: "Search criteria" })}>
            <div className="flex items-center justify-between"><div><p className="eyebrow text-primary">{t({ fr: "Affinez votre recherche", en: "Refine your search" })}</p><h2 className="mt-2 font-display text-4xl">{t({ fr: "Vos critères", en: "Your criteria" })}</h2></div><Button variant="outline" size="icon" className="rounded-full" onClick={() => setFiltersOpen(false)} aria-label={t({ fr: "Fermer", en: "Close" })}><X /></Button></div>
            <div className="mt-10 grid gap-5">
              <div className="grid gap-5 lg:hidden">{basicFilters(true)}<div className="my-2 border-t border-border" /></div>
              <SelectField label={t({ fr: "Chambres minimum", en: "Minimum bedrooms" })} value={String(bedrooms)} onValueChange={(value) => setBedrooms(Number(value))} options={[{ value: "0", label: t({ fr: "Indifférent", en: "Any" }) }, ...[1, 2, 3, 4, 5].map((item) => ({ value: String(item), label: `${item}+ ${t({ fr: "chambres", en: "bedrooms" })}` }))]} />
              <SelectField label={t({ fr: "Surface minimum", en: "Minimum surface" })} value={String(minArea)} onValueChange={(value) => setMinArea(Number(value))} options={[{ value: "0", label: t({ fr: "Indifférente", en: "Any" }) }, ...[80, 120, 160, 250, 350].map((item) => ({ value: String(item), label: `${item} m² minimum` }))]} />
              <SelectField label={t({ fr: "Prestation recherchée", en: "Desired feature" })} value={feature} onValueChange={setFeature} options={[{ value: "", label: t({ fr: "Toutes prestations", en: "All features" }) }, ...featureFilters.map((item) => ({ value: item.value, label: t(item.label) }))]} />
              <Button className="mt-5 min-h-12 rounded-full" onClick={() => setFiltersOpen(false)}>{lang === "fr" ? `Afficher ${results.length} résultat${results.length > 1 ? "s" : ""}` : `Show ${results.length} result${results.length === 1 ? "" : "s"}`}</Button>
              <Button variant="ghost" onClick={reset}>{t({ fr: "Effacer tous les critères", en: "Clear all criteria" })}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
