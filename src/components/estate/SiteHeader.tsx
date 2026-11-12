import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ChevronDown, Clock, Mail, MapPin, Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/brand/mellinium-logo-housing.png";
import piscine from "@/assets/tour/07-piscine.jpg";
import { Button } from "@/components/ui/button";
import { agency, mainNavigation, whatsappHref } from "@/lib/agency";
import { languages, useI18n } from "@/lib/i18n";
import { districts, formatPrice, propertyTypeLabels, propertyTypes, rentalProperties, saleProperties, type PropertyTransaction } from "@/lib/properties";
import { SegmentedControl } from "./fields";
import { PhoneContact, SocialIcon, SocialLinks } from "./SocialLinks";

export function LanguageSwitch() {
  const { lang, setLang, t } = useI18n();
  return (
    <SegmentedControl
      className="lang-switch ds-segmented-sm"
      label={t({ fr: "Choisir la langue", en: "Choose language" })}
      value={lang}
      onChange={setLang}
      options={languages.map(({ code, label, name }) => ({ value: code, label: <span lang={code} title={name}>{label}</span> }))}
    />
  );
}

function MegaPanel({ transaction }: { transaction: PropertyTransaction }) {
  const { t, lang } = useI18n();
  const list = transaction === "vente" ? saleProperties : rentalProperties;
  const featured = list[0];
  return (
    <div className="mega-panel">
      <div className="mega-panel-inner">
        <div>
          <p className="eyebrow text-primary">{t({ fr: "Type de bien", en: "Property type" })}</p>
          <div className="mt-3">
            {propertyTypes.map((type) => <Link key={type} to="/biens" search={{ transaction, type }} className="mega-link">{t(propertyTypeLabels[type].plural)}</Link>)}
            <Link to="/biens" search={{ transaction }} className="mega-link font-semibold text-foreground">{t({ fr: "Tous les biens", en: "All properties" })} ({list.length})</Link>
          </div>
        </div>
        <div>
          <p className="eyebrow text-primary">{t({ fr: "Quartiers", en: "Areas" })}</p>
          <div className="mt-3">{districts.map((district) => <Link key={district} to="/biens" search={{ transaction, district }} className="mega-link">{district}</Link>)}</div>
        </div>
        {featured && (
          <Link to="/biens/$propertyId" params={{ propertyId: featured.id }} className="group block">
            <div className="overflow-hidden"><img src={featured.image} alt={featured.name} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
            <p className="eyebrow mt-3 text-primary">{featured.badge ? t(featured.badge) : t({ fr: "Sélection", en: "Selection" })}</p>
            <p className="mt-1 font-display text-2xl">{featured.name}</p>
            <p className="text-sm text-muted-foreground">{featured.district} · {formatPrice(featured, lang)}</p>
          </Link>
        )}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const { t } = useI18n();
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
          <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {t(agency.tagline)} · {t(agency.location)}</span>
          <div className="flex items-center gap-6">
            {agency.phones.map((phone) => <PhoneContact key={phone.href} phone={phone} iconClassName="h-3.5 w-3.5" className="phone-contact-topbar hidden first:inline-flex lg:inline-flex" />)}
            <a href={`mailto:${agency.email}`} className="hidden items-center gap-2 xl:flex"><Mail className="h-3.5 w-3.5" />{agency.email}</a>
          </div>
        </div>
      </div>

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="relative mx-auto flex max-w-7xl items-stretch justify-between gap-6 px-5 md:px-10">
          <Link to="/" aria-label={t({ fr: "Accueil Mellinium Immobilière", en: "Mellinium Immobilière home" })} className="shrink-0 self-center py-3">
            <img src={logo} alt="Mellinium Immobilière" className="site-header-logo object-contain" />
          </Link>

          <nav className="hidden items-stretch gap-5 xl:gap-8 lg:flex" aria-label={t({ fr: "Navigation principale", en: "Main navigation" })}>
            <div className="nav-item">
              <Link to="/biens" search={{ transaction: "location" }} className="nav-link" activeOptions={{ includeSearch: true }}>{t(mainNavigation[0].label)} <ChevronDown /></Link>
              <MegaPanel transaction="location" />
            </div>
            <div className="nav-item">
              <Link to="/biens" search={{ transaction: "vente" }} className="nav-link" activeOptions={{ includeSearch: true }}>{t(mainNavigation[1].label)} <ChevronDown /></Link>
              <MegaPanel transaction="vente" />
            </div>
            {mainNavigation.slice(2, -1).map((item) => (
              <div key={item.label.en} className="nav-item">
                <Link to="/" {...("hash" in item ? { hash: item.hash } : {})} className="nav-link" activeOptions={{ exact: true, includeHash: true }}>{t(item.label)}</Link>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3 py-3">
            <LanguageSwitch />
            <Button asChild className="header-cta h-11 gap-2 px-4 sm:px-6">
              <Link to="/" hash="contact" aria-label={t({ fr: "Nous contacter", en: "Contact us" })}>
                <MessageCircle />
                <span className="hidden sm:inline lg:hidden xl:inline">{t({ fr: "Nous contacter", en: "Contact us" })}</span>
                <span className="hidden lg:inline xl:hidden">Contact</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-11 gap-2 rounded-full px-4 lg:hidden" aria-label={t({ fr: "Ouvrir le menu", en: "Open menu" })} aria-expanded={open} onClick={() => setOpen(true)}>
              <Menu /><span className="hidden text-xs font-semibold uppercase tracking-[.14em] sm:inline">Menu</span>
            </Button>
          </div>
        </div>
      </header>

      {open && (
        <div className="mobile-menu lg:grid-cols-[1.25fr_.75fr]" role="dialog" aria-modal="true" aria-label={t({ fr: "Menu principal", en: "Main menu" })}>
          <div className="flex flex-col px-5 py-5 md:px-12 md:py-8">
            <div className="flex items-center justify-between gap-4">
              <Link to="/" onClick={close}><img src={logo} alt="Mellinium Immobilière" className="h-14 w-auto" /></Link>
              <div className="flex items-center gap-3">
                <LanguageSwitch />
                <Button variant="outline" className="h-11 gap-2 rounded-full px-4" aria-label={t({ fr: "Fermer le menu", en: "Close menu" })} onClick={close}><X /><span className="hidden text-xs font-semibold uppercase tracking-[.14em] sm:inline">{t({ fr: "Fermer", en: "Close" })}</span></Button>
              </div>
            </div>
            <nav className="mt-10 md:mt-14" aria-label="Menu">
              {mainNavigation.map((item, index) => (
                <Link
                  key={item.label.en}
                  to={item.to}
                  {...("search" in item ? { search: item.search } : {})}
                  {...("hash" in item ? { hash: item.hash } : {})}
                  onClick={close}
                  className="mobile-menu-link"
                  style={{ animationDelay: `${80 + index * 60}ms` }}
                >
                  <span>0{index + 1}</span>
                  <span><strong>{t(item.label)}</strong><small className="mt-1 hidden sm:block">{t(item.description)}</small></span>
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              ))}
            </nav>
            <div className="mt-10 space-y-3 text-sm text-muted-foreground lg:hidden">
              {agency.phones.map((phone) => <PhoneContact key={phone.href} phone={phone} />)}
              <a href={`mailto:${agency.email}`} className="flex items-center gap-3 break-all hover:text-primary"><Mail className="h-4 w-4 text-primary" />{agency.email}</a>
              <p className="flex items-center gap-3"><MapPin className="h-4 w-4 shrink-0 text-primary" />{agency.address}</p>
            </div>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-5 pt-10">
              <SocialLinks compact />
              <Button asChild className="rounded-full"><a href={whatsappHref} target="_blank" rel="noreferrer" onClick={close}><SocialIcon id="whatsapp" /> WhatsApp <ArrowRight /></a></Button>
            </div>
          </div>
          <aside className="mobile-menu-photo hidden lg:block">
            <img src={piscine} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-contact-overlay" />
            <div className="absolute inset-x-0 bottom-0 space-y-4 p-10 text-on-image">
              <p className="eyebrow">{t({ fr: "Nous rendre visite", en: "Visit us" })}</p>
              <p className="font-display text-4xl leading-tight">{t({ fr: "Votre partenaire local", en: "Your local partner" })}<br />{t({ fr: "à La Marsa.", en: "in La Marsa." })}</p>
              <p className="flex items-center gap-3 text-sm"><MapPin className="h-4 w-4" />{agency.address}</p>
              {agency.phones.map((phone) => <PhoneContact key={phone.href} phone={phone} className="phone-contact-light text-sm" />)}
              <a href={`mailto:${agency.email}`} className="flex items-center gap-3 text-sm hover:underline"><Mail className="h-4 w-4" />{agency.email}</a>
              <p className="flex items-center gap-3 text-sm"><Clock className="h-4 w-4" />{t(agency.hours)}</p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
