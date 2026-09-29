import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Bath, BedDouble, MapPin, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "./SiteHeader";
import type { Property } from "@/lib/properties";

export function PropertyDetailPage({ property }: { property: Property }) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative min-h-[86svh] overflow-hidden text-on-image">
        <img src={property.image} alt={property.name} className="depth-hero-image absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-detail-overlay" />
        <SiteHeader overlay />
        <div className="relative mx-auto flex min-h-[calc(86svh-96px)] max-w-7xl flex-col justify-end px-5 pb-12 md:px-10 md:pb-16">
          <Link to="/biens" search={{ transaction: property.transaction }} className="mb-auto mt-8 inline-flex w-fit items-center gap-2 text-xs uppercase text-on-image-muted hover:text-primary"><ArrowLeft className="h-4 w-4" /> Retour aux biens</Link>
          <p className="eyebrow text-primary">{property.city} · {property.district}</p>
          <h1 className="mt-5 max-w-5xl font-display text-[clamp(3.7rem,9vw,8rem)] leading-[.86]">{property.name}</h1>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-on-image-muted"><strong className="text-xl text-on-image">{property.priceLabel}</strong><span>{property.type}</span><span>{property.rooms} pièces</span><span>{property.area} m²</span></div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.2fr_.8fr]">
        <div><p className="eyebrow text-primary">Le bien</p><h2 className="mt-5 font-display text-5xl md:text-7xl">Une adresse<br />à part.</h2><p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">{property.summary}</p><div className="mt-12 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">{[{icon:Maximize2,value:`${property.area} m²`,label:"Surface"},{icon:BedDouble,value:String(property.bedrooms),label:"Chambres"},{icon:Bath,value:String(Math.max(2, property.bedrooms - 1)),label:"Salles d’eau"},{icon:MapPin,value:property.city,label:"Adresse"}].map(({icon:Icon,value,label}) => <div key={label} className="bg-background p-5"><Icon className="h-5 w-5 text-primary"/><strong className="mt-5 block font-display text-2xl">{value}</strong><span className="mt-1 block text-xs text-muted-foreground">{label}</span></div>)}</div></div>
        <aside className="border border-border p-7 lg:sticky lg:top-8 lg:self-start"><p className="eyebrow text-primary">Visite privée</p><h3 className="mt-4 font-display text-4xl">Découvrir ce bien</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">Notre équipe vous répond personnellement pour organiser une visite ou préciser votre recherche.</p><Button asChild className="mt-7 w-full"><a href={`mailto:contact@mellinium-immobiliere.fr?subject=${encodeURIComponent(`Visite — ${property.name}`)}`}>Demander une visite <ArrowRight /></a></Button><p className="mt-5 text-center text-xs text-muted-foreground">Référence : {property.id.toUpperCase().slice(0, 12)}</p></aside>
      </div></section>

      <section className="grid gap-1 bg-border md:grid-cols-2"><img src={property.gallery[1]} alt={`Intérieur de ${property.name}`} className="h-[52svh] w-full object-cover"/><img src={property.gallery[2]} alt={`Détail de ${property.name}`} className="h-[52svh] w-full object-cover"/><img src={property.gallery[3]} alt={`Suite de ${property.name}`} className="h-[52svh] w-full object-cover md:col-span-2"/></section>
      <section className="bg-panel px-5 py-20 text-panel-foreground md:px-10 md:py-28"><div className="mx-auto max-w-7xl"><p className="eyebrow text-primary">Prestations</p><div className="mt-8 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">{property.features.map((feature) => <div key={feature} className="border-b border-border py-6 text-sm sm:px-5">{feature}</div>)}</div></div></section>
    </main>
  );
}