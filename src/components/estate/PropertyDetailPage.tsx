import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Bath, BedDouble, Check, ChevronLeft, ChevronRight, Images, LandPlot, MapPin, Maximize2, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { agency } from "@/lib/agency";
import { formatAmount, formatPrice, getDistrict, getSimilarProperties, type Property } from "@/lib/properties";
import { PropertyCard } from "./PropertyCard";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function PropertyDetailPage({ property }: { property: Property }) {
  const [activePhoto, setActivePhoto] = useState(0);
  const photoCount = property.gallery.length;
  const showPrevious = () => setActivePhoto((current) => (current - 1 + photoCount) % photoCount);
  const showNext = () => setActivePhoto((current) => (current + 1) % photoCount);
  const district = getDistrict(property.district);
  const similar = getSimilarProperties(property);
  const isRental = property.transaction === "location";

  const specs = [
    { icon: Maximize2, value: `${property.area} m²`, label: "Surface habitable" },
    { icon: BedDouble, value: String(property.bedrooms), label: "Chambres" },
    { icon: Bath, value: String(property.bathrooms), label: "Salles de bain" },
    property.land ? { icon: LandPlot, value: `${property.land} m²`, label: "Terrain" } : { icon: MapPin, value: String(property.rooms), label: "Pièces" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <section className="px-5 pt-8 md:px-10">
          <div className="mx-auto max-w-7xl">
            <Link to="/biens" search={{ transaction: property.transaction }} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4" /> {isRental ? "Biens à louer" : "Biens à vendre"}</Link>
            <div className="property-detail-intro mt-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4 text-primary" />{property.district}, {property.city}</p>
                <h1 className="mt-3 font-display text-[clamp(3rem,7vw,6rem)] font-medium leading-[.92]">{property.name}</h1>
                <p className="mt-3 text-lg italic text-primary">{property.highlight}</p>
              </div>
              <div className="lg:text-right">
                <p className="eyebrow text-muted-foreground">{isRental ? "Loyer mensuel" : "Prix de vente"}</p>
                <p className="mt-2 font-display text-4xl md:text-5xl">{formatPrice(property)}</p>
                {!isRental && <p className="mt-1 text-sm text-muted-foreground">soit {formatAmount(Math.round(property.price / property.area))} / m²</p>}
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pt-10 md:px-10">
          <div className="relative mx-auto max-w-7xl overflow-hidden">
            <div className="relative aspect-[4/3] md:aspect-[16/8]">
              <img key={property.gallery[activePhoto]} src={property.gallery[activePhoto]} alt={`${property.name} — photo ${activePhoto + 1} sur ${photoCount}`} className="property-detail-cover absolute inset-0 h-full w-full object-cover" />
              <div className="absolute left-4 top-4 flex gap-2">
                <span className="property-badge">{isRental ? "À louer" : "À vendre"}</span>
                {property.badge && <span className="property-badge !bg-primary !text-primary-foreground">{property.badge}</span>}
              </div>
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <span className="mr-1 flex items-center gap-2 rounded-full bg-ink/45 px-4 py-2 text-xs text-on-image backdrop-blur-md"><Images className="h-4 w-4" /> {activePhoto + 1} / {photoCount}</span>
                <Button variant="glass" size="icon" className="rounded-full" onClick={showPrevious} aria-label="Photo précédente"><ChevronLeft /></Button>
                <Button variant="glass" size="icon" className="rounded-full" onClick={showNext} aria-label="Photo suivante"><ChevronRight /></Button>
              </div>
            </div>
          </div>
          <nav aria-label="Choisir une photo" className="property-thumbnails mx-auto mt-3 flex max-w-7xl gap-3 overflow-x-auto pb-1">
            {property.gallery.map((photo, index) => <button key={`${photo}-${index}`} type="button" onClick={() => setActivePhoto(index)} aria-label={`Afficher la photo ${index + 1}`} aria-pressed={activePhoto === index} className={`h-20 min-w-28 overflow-hidden border-2 transition-opacity ${activePhoto === index ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`}><img src={photo} alt="" className="h-full w-full object-cover" /></button>)}
          </nav>
        </section>

        <section className="px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
                {specs.map(({ icon: Icon, value, label }) => <div key={label} className="bg-card px-5 py-6"><Icon className="h-5 w-5 text-primary" /><strong className="mt-4 block font-display text-3xl font-medium">{value}</strong><span className="mt-1 block text-xs text-muted-foreground">{label}</span></div>)}
              </div>
              <p className="eyebrow eyebrow-rule mt-14 text-primary">Le bien</p>
              <h2 className="section-title mt-5">Un lieu singulier,<br /><em>une émotion rare.</em></h2>
              <p className="mt-8 max-w-2xl text-lg leading-9 text-muted-foreground">{property.summary}</p>

              <p className="eyebrow eyebrow-rule mt-16 text-primary">Prestations</p>
              <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">{property.features.map((feature) => <li key={feature} className="flex items-center gap-3 border-b border-border py-4 text-sm"><Check className="h-4 w-4 text-primary" />{feature}</li>)}</ul>

              {district && (
                <div className="mt-16 bg-panel p-8 md:p-10">
                  <p className="eyebrow text-primary">Le quartier · {district.tagline}</p>
                  <h3 className="mt-3 font-display text-4xl">{district.name}</h3>
                  <p className="mt-4 max-w-xl leading-8 text-muted-foreground">{district.description}</p>
                  <Link to="/biens" search={{ transaction: property.transaction, district: district.name }} className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-primary hover:underline">Autres biens à {district.name} <ArrowRight className="h-4 w-4" /></Link>
                </div>
              )}
            </div>

            <aside className="property-visit-panel border border-border p-7 lg:sticky lg:top-28 lg:self-start lg:p-9">
              <p className="eyebrow text-primary">{isRental ? "Visite & disponibilité" : "Visite privée"}</p>
              <h3 className="mt-4 font-display text-4xl">Découvrir ce bien</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">Un conseiller dédié vous accompagne pour organiser une visite, vous transmettre le dossier complet et répondre à vos questions.</p>
              <ul className="mt-6 space-y-3">{property.features.slice(0, 3).map((feature) => <li key={feature} className="flex items-center gap-3 text-sm"><Check className="h-4 w-4 text-primary" />{feature}</li>)}</ul>
              <Button asChild className="mt-8 h-12 w-full rounded-full"><a href={`mailto:${agency.email}?subject=${encodeURIComponent(`Visite — ${property.name} (${property.district})`)}`}>Organiser une visite <ArrowRight /></a></Button>
              <Button asChild variant="outline" className="mt-3 h-12 w-full rounded-full"><a href={agency.phoneHref}><Phone /> {agency.phone}</a></Button>
              <p className="mt-5 text-center text-xs text-muted-foreground">Référence : {property.id.toUpperCase().slice(0, 12)}</p>
            </aside>
          </div>
        </section>

        <section className="property-gallery px-5 pb-20 md:px-10">
          <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-[1.25fr_.75fr] md:grid-rows-2">
            <figure className="overflow-hidden md:row-span-2"><img src={property.gallery[(activePhoto + 1) % photoCount]} alt={`${property.name}, autre vue`} className="h-full min-h-[50svh] w-full object-cover" /></figure>
            <figure className="overflow-hidden"><img src={property.gallery[(activePhoto + 2) % photoCount]} alt={`${property.name}, autre vue`} className="h-[30svh] w-full object-cover md:h-full" /></figure>
            <figure className="overflow-hidden"><img src={property.gallery[(activePhoto + 3) % photoCount]} alt={`${property.name}, autre vue`} className="h-[30svh] w-full object-cover md:h-full" /></figure>
          </div>
        </section>

        {similar.length > 0 && (
          <section className="bg-panel px-5 py-20 md:px-10 md:py-28">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow eyebrow-rule text-primary">Vous aimerez aussi</p><h2 className="section-title mt-5">Biens <em>similaires.</em></h2></div><Button asChild variant="outline" className="h-12 rounded-full px-6"><Link to="/biens" search={{ transaction: property.transaction }}>Voir tous les biens <ArrowRight /></Link></Button></div>
              <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">{similar.map((item) => <PropertyCard key={item.id} property={item} />)}</div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
