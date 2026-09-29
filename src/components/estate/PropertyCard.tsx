import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BedDouble, Images, Maximize2 } from "lucide-react";
import type { Property } from "@/lib/properties";

export function PropertyCard({ property, featured = false }: { property: Property; featured?: boolean }) {
  return (
    <Link
      to="/biens/$propertyId"
      params={{ propertyId: property.id }}
      preload="intent"
      className={`property-card-3d group block ${featured ? "lg:col-span-2" : ""}`}
    >
      <div className={`relative overflow-hidden ${featured ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
        <img src={property.image} alt={property.name} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
        <div className="absolute inset-0 bg-property-overlay" />
        <span className="absolute left-4 top-4 border border-on-image/30 bg-glass px-3 py-2 text-[10px] font-semibold uppercase text-on-image backdrop-blur-md">
          {property.transaction}
        </span>
        <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center border border-on-image/30 bg-glass text-on-image backdrop-blur-md transition-colors group-hover:border-primary group-hover:text-primary">
          <ArrowUpRight className="h-4 w-4" />
        </span>
        <span className="absolute right-4 top-16 flex items-center gap-1.5 border border-on-image/30 bg-glass px-2.5 py-1.5 text-[10px] text-on-image backdrop-blur-md"><Images className="h-3.5 w-3.5" />{property.gallery.length} photos</span>
        <div className="absolute inset-x-0 bottom-0 p-5 text-on-image md:p-7">
          <p className="eyebrow text-primary">{property.city} · {property.district}</p>
          <h3 className="mt-2 font-display text-3xl md:text-4xl">{property.name}</h3>
          <div className="mt-4 flex flex-wrap items-center gap-5 text-xs text-on-image-muted">
            <span className="flex items-center gap-2"><Maximize2 className="h-4 w-4" />{property.area} m²</span>
            <span className="flex items-center gap-2"><BedDouble className="h-4 w-4" />{property.rooms} pièces</span>
            <strong className="ml-auto text-sm text-on-image">{property.priceLabel}</strong>
          </div>
        </div>
      </div>
    </Link>
  );
}