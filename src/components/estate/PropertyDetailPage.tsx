import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Bath, BedDouble, Check, ChevronLeft, ChevronRight, Expand, Images, LandPlot, MapPin, Maximize2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { agency, whatsappHref } from "@/lib/agency";
import { useI18n } from "@/lib/i18n";
import { formatAmount, formatPrice, getArea, getSimilarProperties, propertyTypeLabels, type Property } from "@/lib/properties";
import { PhotoLightbox } from "./PhotoLightbox";
import { PhoneContact, SocialIcon } from "./SocialLinks";
import { PropertyCard } from "./PropertyCard";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function PropertyDetailPage({ property }: { property: Property }) {
  const { t, lang } = useI18n();
  const [activePhoto, setActivePhoto] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const photoCount = property.gallery.length;
  const showPrevious = () => setActivePhoto((current) => (current - 1 + photoCount) % photoCount);
  const showNext = () => setActivePhoto((current) => (current + 1) % photoCount);
  const district = getArea(property.district);
  const similar = getSimilarProperties(property);
  const isRental = property.transaction === "location";

  const specs = [
    { icon: Maximize2, value: `${property.area} m²`, label: t({ fr: "Surface habitable", en: "Living area" }) },
    { icon: BedDouble, value: String(property.bedrooms), label: t({ fr: "Chambres", en: "Bedrooms" }) },
    { icon: Bath, value: String(property.bathrooms), label: t({ fr: "Salles de bain", en: "Bathrooms" }) },
    property.land ? { icon: LandPlot, value: `${property.land} m²`, label: t({ fr: "Terrain", en: "Land" }) } : { icon: MapPin, value: String(property.rooms), label: t({ fr: "Pièces", en: "Rooms" }) },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <section className="px-5 pt-8 md:px-10">
          <div className="mx-auto max-w-7xl">
            <Link to="/biens" search={{ transaction: property.transaction }} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4" /> {isRental ? t({ fr: "Biens à louer", en: "Homes for rent" }) : t({ fr: "Biens à vendre", en: "Homes for sale" })}</Link>
            <div className="property-detail-intro mt-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4 text-primary" />{property.district}, {property.city} · {t(propertyTypeLabels[property.type].singular)}</p>
                <h1 className="mt-3 font-display text-[clamp(3rem,7vw,6rem)] font-medium leading-[.92]">{property.name}</h1>
                <p className="mt-3 text-lg italic text-primary">{t(property.highlight)}</p>
              </div>
              <div className="lg:text-right">
                <p className="eyebrow text-muted-foreground">{isRental ? t({ fr: "Loyer mensuel", en: "Monthly rent" }) : t({ fr: "Prix de vente", en: "Sale price" })}</p>
                <p className="mt-2 font-display text-4xl md:text-5xl">{formatPrice(property, lang)}</p>
                {!isRental && <p className="mt-1 text-sm text-muted-foreground">{t({ fr: "soit", en: "i.e." })} {formatAmount(Math.round(property.price / property.area), lang)} / m²</p>}
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pt-10 md:px-10">
          <div className="relative mx-auto max-w-7xl overflow-hidden">
            <div className="relative aspect-[4/3] md:aspect-[16/8]">
              <button type="button" onClick={() => setViewerOpen(true)} className="property-cover-button absolute inset-0" aria-label={t({ fr: "Agrandir la photo en plein écran", en: "View photo full screen" })}>
                <img key={property.gallery[activePhoto]} src={property.gallery[activePhoto]} alt={`${property.name} — photo ${activePhoto + 1} / ${photoCount}`} className="property-detail-cover absolute inset-0 h-full w-full object-cover" />
                <span className="property-cover-hint"><Expand />{t({ fr: "Plein écran", en: "Full screen" })}</span>
              </button>
              <div className="absolute left-4 top-4 flex gap-2">
                <span className="property-badge">{isRental ? t({ fr: "À louer", en: "For rent" }) : t({ fr: "À vendre", en: "For sale" })}</span>
                {property.badge && <span className="property-badge !bg-primary !text-primary-foreground">{t(property.badge)}</span>}
              </div>
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <button type="button" onClick={() => setViewerOpen(true)} className="mr-1 flex items-center gap-2 rounded-full bg-ink/45 px-4 py-2 text-xs text-on-image backdrop-blur-md transition-colors hover:bg-ink/65"><Images className="h-4 w-4" /> {activePhoto + 1} / {photoCount} · {t({ fr: "Voir toutes les photos", en: "View all photos" })}</button>
                <Button variant="glass" size="icon" className="rounded-full" onClick={showPrevious} aria-label={t({ fr: "Photo précédente", en: "Previous photo" })}><ChevronLeft /></Button>
                <Button variant="glass" size="icon" className="rounded-full" onClick={showNext} aria-label={t({ fr: "Photo suivante", en: "Next photo" })}><ChevronRight /></Button>
              </div>
            </div>
          </div>
          <nav aria-label={t({ fr: "Choisir une photo", en: "Choose a photo" })} className="property-thumbnails mx-auto mt-3 flex max-w-7xl gap-3 overflow-x-auto pb-1">
            {property.gallery.map((photo, index) => <button key={`${photo}-${index}`} type="button" onClick={() => setActivePhoto(index)} aria-label={`${t({ fr: "Afficher la photo", en: "Show photo" })} ${index + 1}`} aria-pressed={activePhoto === index} className={`h-20 min-w-28 overflow-hidden border-2 transition-opacity ${activePhoto === index ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`}><img src={photo} alt="" className="h-full w-full object-cover" /></button>)}
          </nav>
        </section>

        <section className="px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
                {specs.map(({ icon: Icon, value, label }) => <div key={label} className="bg-card px-5 py-6"><Icon className="h-5 w-5 text-primary" /><strong className="mt-4 block font-display text-3xl font-medium">{value}</strong><span className="mt-1 block text-xs text-muted-foreground">{label}</span></div>)}
              </div>
              <p className="eyebrow eyebrow-rule mt-14 text-primary">{t({ fr: "Le bien", en: "The property" })}</p>
              <h2 className="section-title mt-5">{t({ fr: "Un lieu choisi,", en: "A carefully chosen home," })}<br /><em>{t({ fr: "pour votre mode de vie.", en: "for your lifestyle." })}</em></h2>
              <p className="mt-8 max-w-2xl text-lg leading-9 text-muted-foreground">{t(property.summary)}</p>

              <p className="eyebrow eyebrow-rule mt-16 text-primary">{t({ fr: "Prestations", en: "Features" })}</p>
              <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">{property.features.map((feature) => <li key={feature.en} className="flex items-center gap-3 border-b border-border py-4 text-sm"><Check className="h-4 w-4 text-primary" />{t(feature)}</li>)}</ul>

              {district && (
                <div className="mt-16 bg-panel p-8 md:p-10">
                  <p className="eyebrow text-primary">{t({ fr: "Le quartier", en: "The area" })} · {t(district.tagline)}</p>
                  <h3 className="mt-3 font-display text-4xl">{district.name}</h3>
                  <p className="mt-4 max-w-xl leading-8 text-muted-foreground">{t(district.description)}</p>
                  <Link to="/biens" search={{ transaction: property.transaction, district: district.name }} className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-primary hover:underline">{t({ fr: "Autres biens à", en: "More homes in" })} {district.name} <ArrowRight className="h-4 w-4" /></Link>
                </div>
              )}
            </div>

            <aside className="property-visit-panel border border-border p-7 lg:sticky lg:top-28 lg:self-start lg:p-9">
              <p className="eyebrow text-primary">{isRental ? t({ fr: "Visite & disponibilité", en: "Visit & availability" }) : t({ fr: "Visite privée", en: "Private visit" })}</p>
              <h3 className="mt-4 font-display text-4xl">{t({ fr: "Découvrir ce bien", en: "Discover this home" })}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{t({ fr: "Nous organisons une visite privée, vous transmettons le dossier complet et assurons la communication avec le propriétaire, en toute discrétion.", en: "We organize a private visit, send you the full details and handle communication with the owner, discreetly." })}</p>
              <ul className="mt-6 space-y-3">{property.features.slice(0, 3).map((feature) => <li key={feature.en} className="flex items-center gap-3 text-sm"><Check className="h-4 w-4 text-primary" />{t(feature)}</li>)}</ul>
              <Button asChild className="mt-8 h-12 w-full rounded-full"><a href={`mailto:${agency.email}?subject=${encodeURIComponent(`${t({ fr: "Visite", en: "Visit" })} — ${property.name} (${property.district})`)}`}>{t({ fr: "Organiser une visite", en: "Arrange a visit" })} <ArrowRight /></a></Button>
              <Button asChild variant="outline" className="mt-3 h-12 w-full rounded-full"><a href={`${whatsappHref}?text=${encodeURIComponent(`${t({ fr: "Bonjour, je suis intéressé(e) par", en: "Hello, I am interested in" })} ${property.name} (${property.district}).`)}`} target="_blank" rel="noreferrer"><SocialIcon id="whatsapp" /> WhatsApp</a></Button>
              <div className="mt-5 grid gap-3 border-t border-border pt-5 text-sm">{agency.phones.map((phone) => <PhoneContact key={phone.href} phone={phone} className="justify-between" />)}</div>
              <p className="mt-5 text-center text-xs text-muted-foreground">{t({ fr: "Référence :", en: "Reference:" })} {property.id.toUpperCase().slice(0, 12)}</p>
            </aside>
          </div>
        </section>


        {similar.length > 0 && (
          <section className="bg-panel px-5 py-20 md:px-10 md:py-28">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow eyebrow-rule text-primary">{t({ fr: "Vous aimerez aussi", en: "You may also like" })}</p><h2 className="section-title mt-5">{t({ fr: "Biens", en: "Similar" })} <em>{t({ fr: "similaires.", en: "homes." })}</em></h2></div><Button asChild variant="outline" className="h-12 rounded-full px-6"><Link to="/biens" search={{ transaction: property.transaction }}>{t({ fr: "Voir tous les biens", en: "See all properties" })} <ArrowRight /></Link></Button></div>
              <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">{similar.map((item) => <PropertyCard key={item.id} property={item} />)}</div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
      <PhotoLightbox
        open={viewerOpen}
        onOpenChange={setViewerOpen}
        photos={property.gallery}
        index={activePhoto}
        onIndexChange={setActivePhoto}
        title={property.name}
        subtitle={`${property.district} · ${formatPrice(property, lang)}`}
      />
    </div>
  );
}
