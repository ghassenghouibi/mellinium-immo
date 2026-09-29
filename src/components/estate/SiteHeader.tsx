import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ChevronDown, Clock, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/brand/mellinium-logo-cropped.png.asset.json";
import piscine from "@/assets/tour/07-piscine.jpg";
import { Button } from "@/components/ui/button";
import { agency, mainNavigation } from "@/lib/agency";
import { districts, formatPrice, propertyTypes, rentalProperties, saleProperties, type PropertyTransaction } from "@/lib/properties";
import { SocialLinks } from "./SocialLinks";

const typeLabels: Record<string, string> = { Villa: "Villas", Maison: "Maisons", Appartement: "Appartements" };

function MegaPanel({ transaction }: { transaction: PropertyTransaction }) {
  const list = transaction === "vente" ? saleProperties : rentalProperties;
  const featured = list[0];
  return (
    <div className="mega-panel">
      <div className="mega-panel-inner">
        <div>
          <p className="eyebrow text-primary">Type de bien</p>
          <div className="mt-3">
            {propertyTypes.map((type) => <Link key={type} to="/biens" search={{ transaction, type }} className="mega-link">{typeLabels[type] ?? type}</Link>)}
            <Link to="/biens" search={{ transaction }} className="mega-link font-semibold text-foreground">Tous les biens ({list.length})</Link>
          </div>
        </div>
        <div>
          <p className="eyebrow text-primary">Quartiers</p>
          <div className="mt-3">{districts.map((district) => <Link key={district} to="/biens" search={{ transaction, district }} className="mega-link">{district}</Link>)}</div>
        </div>
        {featured && (
          <Link to="/biens/$propertyId" params={{ propertyId: featured.id }} className="group block">
            <div className="overflow-hidden"><img src={featured.image} alt={featured.name} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
            <p className="eyebrow mt-3 text-primary">{featured.badge ?? "Sélection"}</p>
            <p className="mt-1 font-display text-2xl">{featured.name}</p>
            <p className="text-sm text-muted-foreground">{featured.district} · {formatPrice(featured)}</p>
          </Link>
        )}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onKey); };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <div className="site-topbar hidden px-5 py-2 md:block md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> Agence immobilière à La Marsa · Gammarth · Sidi Bou Saïd</span>
          <div className="flex items-center gap-6">
            <a href={agency.phoneHref} className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" />{agency.phone}</a>
            <a href={`mailto:${agency.email}`} className="hidden items-center gap-2 lg:flex"><Mail className="h-3.5 w-3.5" />{agency.email}</a>
          </div>
        </div>
      </div>

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="relative mx-auto flex max-w-7xl items-stretch justify-between gap-6 px-5 md:px-10">
          <Link to="/" aria-label="Accueil Mellinium Immobilière" className="shrink-0 self-center py-3">
            <img src={logoAsset.url} alt="Mellinium Immobilière Housing" className="site-header-logo object-contain" />
          </Link>

          <nav className="hidden items-stretch gap-7 xl:gap-9 lg:flex" aria-label="Navigation principale">
            <div className="nav-item">
              <Link to="/biens" search={{ transaction: "vente" }} className="nav-link" activeOptions={{ includeSearch: true }}>Acheter <ChevronDown /></Link>
              <MegaPanel transaction="vente" />
            </div>
            <div className="nav-item">
              <Link to="/biens" search={{ transaction: "location" }} className="nav-link" activeOptions={{ includeSearch: true }}>Louer <ChevronDown /></Link>
              <MegaPanel transaction="location" />
            </div>
            {mainNavigation.slice(2).map((item) => (
              <div key={item.label} className="nav-item">
                <Link to="/" {...("hash" in item ? { hash: item.hash } : {})} className="nav-link" activeOptions={{ exact: true, includeHash: true }}>{item.label}</Link>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3 py-3">
            <Button asChild className="header-cta hidden h-11 px-6 md:inline-flex">
              <Link to="/" hash="confier">Estimer mon bien</Link>
            </Button>
            <Button variant="outline" className="h-11 gap-2 rounded-full px-4" aria-label="Ouvrir le menu" aria-expanded={open} onClick={() => setOpen(true)}>
              <Menu /><span className="hidden text-xs font-semibold uppercase tracking-[.14em] sm:inline">Menu</span>
            </Button>
          </div>
        </div>
      </header>

      {open && (
        <div className="mobile-menu lg:grid-cols-[1.25fr_.75fr]" role="dialog" aria-modal="true" aria-label="Menu principal">
          <div className="flex flex-col px-5 py-5 md:px-12 md:py-8">
            <div className="flex items-center justify-between">
              <Link to="/" onClick={close}><img src={logoAsset.url} alt="Mellinium Immobilière Housing" className="h-14 w-auto" /></Link>
              <Button variant="outline" className="h-11 gap-2 rounded-full px-4" aria-label="Fermer le menu" onClick={close}><X /><span className="hidden text-xs font-semibold uppercase tracking-[.14em] sm:inline">Fermer</span></Button>
            </div>
            <nav className="mt-10 md:mt-14" aria-label="Menu">
              {mainNavigation.map((item, index) => (
                <Link
                  key={item.label}
                  to={item.to}
                  {...("search" in item ? { search: item.search } : {})}
                  {...("hash" in item ? { hash: item.hash } : {})}
                  onClick={close}
                  className="mobile-menu-link"
                  style={{ animationDelay: `${80 + index * 60}ms` }}
                >
                  <span>0{index + 1}</span>
                  <span><strong>{item.label}</strong><small className="mt-1 hidden sm:block">{item.description}</small></span>
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              ))}
            </nav>
            <div className="mt-10 space-y-3 text-sm text-muted-foreground lg:hidden">
              <a href={agency.phoneHref} className="flex items-center gap-3 hover:text-primary"><Phone className="h-4 w-4 text-primary" />{agency.phone}</a>
              <a href={`mailto:${agency.email}`} className="flex items-center gap-3 break-all hover:text-primary"><Mail className="h-4 w-4 text-primary" />{agency.email}</a>
              <p className="flex items-center gap-3"><MapPin className="h-4 w-4 shrink-0 text-primary" />{agency.address}</p>
            </div>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-5 pt-10">
              <SocialLinks compact />
              <Button asChild className="rounded-full"><Link to="/" hash="confier" onClick={close}>Estimer mon bien <ArrowRight /></Link></Button>
            </div>
          </div>
          <aside className="mobile-menu-photo hidden lg:block">
            <img src={piscine} alt="Piscine face à la mer à Gammarth" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-contact-overlay" />
            <div className="absolute inset-x-0 bottom-0 space-y-4 p-10 text-on-image">
              <p className="eyebrow">Nous rendre visite</p>
              <p className="font-display text-4xl leading-tight">Votre agence au cœur<br />de La Marsa.</p>
              <p className="flex items-center gap-3 text-sm"><MapPin className="h-4 w-4" />{agency.address}</p>
              <a href={agency.phoneHref} className="flex items-center gap-3 text-sm hover:underline"><Phone className="h-4 w-4" />{agency.phone}</a>
              <a href={`mailto:${agency.email}`} className="flex items-center gap-3 text-sm hover:underline"><Mail className="h-4 w-4" />{agency.email}</a>
              <p className="flex items-center gap-3 text-sm"><Clock className="h-4 w-4" />{agency.hours}</p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
