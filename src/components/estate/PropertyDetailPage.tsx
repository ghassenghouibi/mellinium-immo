import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Bath, BedDouble, Check, ChevronLeft, ChevronRight, Images, MapPin, Maximize2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "./SiteHeader";
import type { Property } from "@/lib/properties";

export function PropertyDetailPage({ property }: { property: Property }) {
  const [activePhoto, setActivePhoto] = useState(0);
  const photoCount = property.gallery.length;
  const showPrevious = () => setActivePhoto((current) => (current - 1 + photoCount) % photoCount);
  const showNext = () => setActivePhoto((current) => (current + 1) % photoCount);

  return (
    <main className="property-detail min-h-screen bg-background text-foreground">
      <section className="relative min-h-[94svh] overflow-hidden text-on-image">
        <img key={property.gallery[activePhoto]} src={property.gallery[activePhoto]} alt={`${property.name} — photo ${activePhoto + 1} sur ${photoCount}`} className="property-detail-cover depth-hero-image absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-detail-overlay" />
        <SiteHeader overlay />
        <div className="property-detail-intro relative mx-auto flex min-h-[calc(94svh-96px)] max-w-7xl flex-col justify-end px-5 pb-12 md:px-10 md:pb-16">
          <Link to="/biens" search={{ transaction: property.transaction }} className="mb-auto mt-8 inline-flex w-fit items-center gap-2 text-xs uppercase text-on-image-muted hover:text-primary"><ArrowLeft className="h-4 w-4" /> Retour aux biens</Link>
          <p className="eyebrow text-primary">{property.city} · {property.district}</p>
          <h1 className="mt-5 max-w-5xl font-display text-[clamp(3.7rem,9vw,8rem)] leading-[.86]">{property.name}</h1>
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-on-image-muted"><strong className="border border-primary/50 bg-glass px-5 py-3 text-xl text-on-image backdrop-blur-md">{property.priceLabel}</strong><span className="px-2">{property.type}</span><span className="px-2">{property.rooms} pièces</span><span className="px-2">{property.area} m²</span></div>
        </div>
        <div className="property-photo-controls absolute bottom-8 right-5 z-10 flex items-center gap-2 md:bottom-12 md:right-10">
          <span className="mr-2 flex items-center gap-2 border border-on-image/30 bg-glass px-4 py-2 text-xs text-on-image backdrop-blur-md"><Images className="h-4 w-4" /> {activePhoto + 1} / {photoCount}</span>
          <Button variant="glass" size="icon" onClick={showPrevious} aria-label="Photo précédente"><ChevronLeft /></Button>
          <Button variant="glass" size="icon" onClick={showNext} aria-label="Photo suivante"><ChevronRight /></Button>
        </div>
      </section>

      <nav aria-label="Choisir une photo" className="property-thumbnails bg-menu px-5 py-4 md:px-10">
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto pb-1">
          {property.gallery.map((photo, index) => <Button key={`${photo}-${index}`} variant="ghost" onClick={() => setActivePhoto(index)} aria-label={`Afficher la photo ${index + 1}`} aria-pressed={activePhoto === index} className={`h-20 min-w-28 overflow-hidden rounded-none border p-0 ${activePhoto === index ? "border-primary" : "border-menu-muted/30 opacity-60 hover:opacity-100"}`}><img src={photo} alt="" className="h-full w-full object-cover" /></Button>)}
        </div>
      </nav>

      <section className="px-5 py-24 md:px-10 md:py-36"><div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.15fr_.85fr]">
        <div className="property-detail-copy"><p className="eyebrow text-primary">L’adresse</p><h2 className="mt-5 font-display text-5xl leading-[.92] md:text-7xl">Un lieu singulier,<br /><em>une émotion rare.</em></h2><p className="mt-9 max-w-2xl text-lg leading-9 text-muted-foreground">{property.summary}</p><div className="mt-14 grid grid-cols-2 gap-px border-y border-border bg-border sm:grid-cols-4">{[{icon:Maximize2,value:`${property.area} m²`,label:"Surface"},{icon:BedDouble,value:String(property.bedrooms),label:"Chambres"},{icon:Bath,value:String(Math.max(2, property.bedrooms - 1)),label:"Salles d’eau"},{icon:MapPin,value:property.city,label:"Secteur"}].map(({icon:Icon,value,label}) => <div key={label} className="bg-background px-3 py-6"><Icon className="h-5 w-5 text-primary"/><strong className="mt-5 block font-display text-2xl">{value}</strong><span className="mt-1 block text-xs text-muted-foreground">{label}</span></div>)}</div></div>
        <aside className="property-visit-panel border border-primary/35 p-7 lg:sticky lg:top-8 lg:self-start lg:p-9"><p className="eyebrow text-primary">Visite confidentielle</p><h3 className="mt-4 font-display text-4xl">Entrez dans l’exception</h3><p className="mt-5 text-sm leading-7 text-muted-foreground">Échangez avec un conseiller dédié pour découvrir cette propriété dans les meilleures conditions.</p><ul className="mt-7 space-y-3">{property.features.slice(0,3).map((feature) => <li key={feature} className="flex items-center gap-3 text-sm"><Check className="h-4 w-4 text-primary" />{feature}</li>)}</ul><Button asChild className="mt-8 w-full"><a href={`mailto:contact@mellinium-immobiliere.fr?subject=${encodeURIComponent(`Visite — ${property.name}`)}`}>Organiser une visite <ArrowRight /></a></Button><p className="mt-5 text-center text-xs text-muted-foreground">Référence : {property.id.toUpperCase().slice(0, 12)}</p></aside>
      </div></section>

      <section className="property-gallery bg-panel p-2 md:p-4"><div className="mx-auto grid max-w-[100rem] gap-2 md:grid-cols-[1.25fr_.75fr] md:grid-rows-2 md:gap-4"><figure className="property-gallery-main overflow-hidden md:row-span-2"><img src={property.gallery[activePhoto]} alt={`${property.name}, vue sélectionnée`} className="h-full min-h-[65svh] w-full object-cover"/></figure><figure className="overflow-hidden"><img src={property.gallery[(activePhoto + 1) % photoCount]} alt={`${property.name}, vue suivante`} className="h-[42svh] w-full object-cover"/></figure><figure className="overflow-hidden"><img src={property.gallery[(activePhoto + 2) % photoCount]} alt={`${property.name}, autre vue`} className="h-[42svh] w-full object-cover"/></figure></div></section>
      <section className="bg-panel px-5 py-24 text-panel-foreground md:px-10 md:py-32"><div className="mx-auto max-w-7xl"><div className="grid gap-10 md:grid-cols-[.55fr_1.45fr]"><div><p className="eyebrow text-primary">L’essentiel</p><h2 className="mt-4 font-display text-4xl md:text-5xl">Prestations</h2></div><div className="grid border-t border-border sm:grid-cols-2">{property.features.map((feature, index) => <div key={feature} className="flex items-center gap-4 border-b border-border py-6 text-sm sm:px-5"><span className="font-display text-2xl text-primary">0{index + 1}</span>{feature}</div>)}</div></div></div></section>
    </main>
  );
}