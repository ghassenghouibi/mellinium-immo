import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Bath, BedDouble, Images, MapPin, Maximize2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { formatPrice, type Property } from "@/lib/properties";

export function PropertyCard({ property, featured = false }: { property: Property; featured?: boolean }) {
  const { t, lang } = useI18n();
  const isRental = property.transaction === "location";
  return (
    <Link
      to="/biens/$propertyId"
      params={{ propertyId: property.id }}
      preload="intent"
      className={`property-card group ${featured ? "md:col-span-2 lg:col-span-full lg:grid lg:grid-cols-[1.35fr_1fr]" : ""}`}
    >
      <div className={`relative overflow-hidden ${featured ? "aspect-[4/3] lg:aspect-auto lg:min-h-[30rem]" : "aspect-[4/3]"}`}>
        <img src={property.image} alt={property.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-property-overlay" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="property-badge">{isRental ? t({ fr: "À louer", en: "For rent" }) : t({ fr: "À vendre", en: "For sale" })}</span>
          {property.badge && <span className="property-badge !bg-primary !text-primary-foreground">{t(property.badge)}</span>}
        </div>
        <span className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-ink/45 px-3 py-1.5 text-[11px] text-on-image backdrop-blur-md"><Images className="h-3.5 w-3.5" />{property.gallery.length}</span>
      </div>
      <div className={`flex flex-1 flex-col p-6 ${featured ? "lg:justify-center lg:p-12" : ""}`}>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5 text-primary" />{property.district}, {property.city}</p>
        <div className="mt-2 flex items-start justify-between gap-4">
          <h3 className={`font-display font-medium leading-tight ${featured ? "text-4xl md:text-5xl" : "text-3xl"}`}>{property.name}</h3>
          <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"><ArrowUpRight className="h-4 w-4" /></span>
        </div>
        <p className="mt-2 text-sm italic text-primary">{t(property.highlight)}</p>
        {featured && <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">{t(property.summary)}</p>}
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><Maximize2 className="h-4 w-4" />{property.area} m²</span>
          <span className="flex items-center gap-1.5"><BedDouble className="h-4 w-4" />{property.bedrooms} {t({ fr: "ch.", en: "bd" })}</span>
          <span className="flex items-center gap-1.5"><Bath className="h-4 w-4" />{property.bathrooms} {t({ fr: "sdb", en: "ba" })}</span>
        </div>
        <p className="mt-auto pt-5 text-lg font-semibold text-foreground">{formatPrice(property, lang)}</p>
      </div>
    </Link>
  );
}
