import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowLeft, ArrowRight, Building2, Camera, Clock, FileSignature, Home, KeyRound, Mail, MapPin, Phone, Quote, Search, ShieldCheck, Star, Waves } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import facade from "@/assets/tour/01-facade.jpg";
import entree from "@/assets/tour/02-entree.jpg";
import salon from "@/assets/tour/03-salon.jpg";
import cuisine from "@/assets/tour/04-cuisine.jpg";
import piscine from "@/assets/tour/07-piscine.jpg";
import { Button } from "@/components/ui/button";
import { agency } from "@/lib/agency";
import { marsaDistricts, rentalProperties, saleProperties } from "@/lib/properties";
import { GuidedSearch } from "./GuidedSearch";
import { PropertyCard } from "./PropertyCard";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

const services = [
  { icon: Home, title: "Acheter", text: "Une sélection de villas et d’appartements à La Marsa, dont des biens confidentiels hors marché.", to: "/biens", search: { transaction: "vente" as const }, cta: "Voir les biens à vendre" },
  { icon: KeyRound, title: "Louer", text: "Locations meublées ou à l’année pour familles, expatriés et diplomates, avec état des lieux et suivi.", to: "/biens", search: { transaction: "location" as const }, cta: "Voir les locations" },
  { icon: FileSignature, title: "Vendre", text: "Estimation argumentée, photographies professionnelles et diffusion ciblée auprès d’acquéreurs qualifiés.", to: "/", hash: "confier", cta: "Confier mon bien" },
  { icon: ShieldCheck, title: "Gérer", text: "Gestion locative sereine : recherche de locataires, encaissement, entretien et interlocuteur unique.", to: "/", hash: "contact", cta: "Nous consulter" },
];

const stats = [
  { value: "15 ans", label: "d’expérience à La Marsa" },
  { value: "6", label: "quartiers d’expertise" },
  { value: "48 h", label: "pour votre estimation" },
  { value: "1", label: "conseiller dédié par projet" },
];

const sellingSteps = [
  { title: "Estimation", text: "Visite du bien et analyse des ventes récentes du quartier." },
  { title: "Mise en valeur", text: "Photographies, visite virtuelle et annonce soignée." },
  { title: "Diffusion ciblée", text: "Notre fichier d’acquéreurs et une diffusion qualitative." },
  { title: "Signature", text: "Négociation, sécurisation du dossier et accompagnement notarial." },
];

const testimonials = [
  { quote: "Une connaissance fine de La Marsa et une estimation juste : notre villa de Gammarth a été vendue en moins de trois mois.", author: "Famille B.", context: "Vente à Gammarth" },
  { quote: "Installés depuis l’étranger, nous avons trouvé notre appartement à Marsa Cube sans nous déplacer. Un suivi exemplaire.", author: "Sarah & Karim", context: "Location à Marsa Cube" },
  { quote: "Discrétion, réactivité et photos magnifiques. Nous avons reçu des visiteurs sérieux dès la première semaine.", author: "M. Ben A.", context: "Vente à Sidi Abdelaziz" },
];

const nearby = [
  { label: "Sidi Bou Saïd", value: "5 min" },
  { label: "Aéroport Tunis-Carthage", value: "15 min" },
  { label: "Les Berges du Lac", value: "15 min" },
  { label: "Centre de Tunis", value: "25 min" },
];

export function EstateExperience() {
  const heroImage = useRef<HTMLImageElement>(null);
  const rentalTrack = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (reduceMotion) { reveals.forEach((element) => element.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    reveals.forEach((element) => observer.observe(element));
    const onScroll = () => {
      if (heroImage.current) heroImage.current.style.transform = `translate3d(0, ${window.scrollY * 0.12}px, 0) scale(1.08)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  const scrollRentals = (direction: 1 | -1) => {
    const track = rentalTrack.current;
    if (track) track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  };

  const [featuredSale, ...otherSales] = saleProperties;

  return (
    <div className="bg-background text-foreground">
      <SiteHeader />
      <main className="overflow-hidden">
        {/* ——— Accueil ——— */}
        <section className="relative px-5 pb-16 pt-10 md:px-10 md:pb-24 md:pt-16">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
            <div className="rise-in">
              <p className="eyebrow eyebrow-rule text-primary">Agence immobilière · La Marsa</p>
              <h1 className="mt-6 font-display text-[clamp(3.2rem,7.2vw,6.5rem)] font-medium leading-[.98]">Vivre La Marsa,<br /><em className="text-primary">côté mer.</em></h1>
              <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">Villas d’architecte à Gammarth, demeures de caractère à Sidi Abdelaziz, appartements face à la corniche : nous vous ouvrons les plus belles adresses de La Marsa.</p>
              <div className="mt-10"><GuidedSearch hero /></div>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><Star className="h-4 w-4 fill-primary text-primary" />Biens vérifiés et visités</span>
                <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" />Accompagnement jusqu’à la signature</span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="hero-arch-outline hidden md:block" />
              <div className="hero-arch aspect-[4/5]">
                <img ref={heroImage} src={facade} alt="Villa en pierre entourée d’oliviers à Gammarth" className="h-full w-full object-cover" />
              </div>
              {featuredSale && <Link to="/biens/$propertyId" params={{ propertyId: featuredSale.id }} className="hero-floating-card shadow-soft absolute -bottom-6 left-0 flex items-center gap-4 border border-border bg-card p-3 pr-6 transition-transform hover:-translate-y-1 md:-left-10">
                <img src={piscine} alt="" className="h-16 w-16 object-cover" />
                <div>
                  <p className="eyebrow text-primary">{featuredSale.badge}</p>
                  <p className="font-display text-xl">{featuredSale.name}</p>
                  <p className="text-xs text-muted-foreground">{featuredSale.district} · {featuredSale.area} m²</p>
                </div>
              </Link>}
            </div>
          </div>
          <a href="#agence" aria-label="Découvrir l’agence" className="scroll-cue mx-auto mt-16 hidden h-11 w-11 place-items-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary md:grid"><ArrowDown className="h-4 w-4" /></a>
        </section>

        {/* ——— Chiffres ——— */}
        <section className="border-y border-border bg-panel px-5 py-12 md:px-10">
          <div data-reveal className="reveal-section mx-auto grid max-w-7xl grid-cols-2 gap-y-10 lg:grid-cols-4">
            {stats.map(({ value, label }) => <div key={label} className="border-l border-border pl-5 md:pl-8"><p className="stat-value">{value}</p><p className="mt-2 text-sm text-muted-foreground">{label}</p></div>)}
          </div>
        </section>

        {/* ——— L’agence ——— */}
        <section id="agence" className="scroll-mt-24 px-5 py-24 md:px-10 md:py-32">
          <div data-reveal className="reveal-section mx-auto grid max-w-7xl gap-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div className="relative mx-auto w-full max-w-lg lg:mx-0">
              <div className="depth-photo"><img src={entree} alt="Entrée voûtée d’une demeure à Sidi Abdelaziz" className="aspect-[4/5] w-full object-cover" /></div>
              <div className="shadow-soft absolute -bottom-8 -right-4 bg-card p-6 md:-right-10 md:p-8">
                <p className="font-display text-4xl text-primary">La Marsa</p>
                <p className="mt-1 text-xs uppercase tracking-[.16em] text-muted-foreground">Notre quartier, notre expertise</p>
              </div>
            </div>
            <div className="lg:pl-10">
              <p className="eyebrow eyebrow-rule text-primary">Notre agence</p>
              <h2 className="section-title mt-5">Une agence de quartier,<br /><em>une exigence de prestige.</em></h2>
              <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">Installés au cœur de La Marsa, nous connaissons chaque rue, chaque résidence et chaque vue sur mer. Écoute, discrétion et conseil sur mesure guident chacun de nos accompagnements, de la première visite à la remise des clés.</p>
              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {[{ icon: MapPin, title: "Ancrage local", text: "Une connaissance fine de chaque quartier." }, { icon: Camera, title: "Mise en valeur", text: "Photos et visites soignées pour chaque bien." }, { icon: ShieldCheck, title: "Discrétion", text: "Des ventes confidentielles, hors marché." }].map(({ icon: Icon, title, text }) => (
                  <div key={title}><span className="service-icon"><Icon /></span><p className="mt-4 font-display text-2xl">{title}</p><p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ——— Services ——— */}
        <section className="bg-panel px-5 py-24 md:px-10 md:py-32">
          <div data-reveal className="reveal-section mx-auto max-w-7xl">
            <div className="max-w-3xl"><p className="eyebrow eyebrow-rule text-primary">Nos services</p><h2 className="section-title mt-5">Un accompagnement<br /><em>à chaque projet.</em></h2></div>
            <div className="stagger-grid mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {services.map(({ icon: Icon, title, text, cta, ...link }) => (
                <Link key={title} to={link.to} {...("search" in link ? { search: link.search } : {})} {...("hash" in link ? { hash: link.hash } : {})} className="service-card group">
                  <span className="service-icon"><Icon /></span>
                  <h3 className="mt-7 font-display text-3xl">{title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{text}</p>
                  <span className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-primary">{cta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ——— Ventes ——— */}
        <section id="vente" className="scroll-mt-24 px-5 py-24 md:px-10 md:py-32">
          <div data-reveal className="reveal-section mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div><p className="eyebrow eyebrow-rule text-primary">Biens à la une · À vendre</p><h2 className="section-title mt-5">Les plus belles adresses<br /><em>de La Marsa.</em></h2></div>
              <Button asChild variant="outline" className="h-12 rounded-full px-6"><Link to="/biens" search={{ transaction: "vente" }}>Tous les biens à vendre ({saleProperties.length}) <ArrowRight /></Link></Button>
            </div>
            <div className="stagger-grid mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {featuredSale && <PropertyCard property={featuredSale} featured />}
              {otherSales.slice(0, 3).map((property) => <PropertyCard key={property.id} property={property} />)}
            </div>
          </div>
        </section>

        {/* ——— La Marsa ——— */}
        <section id="la-marsa" className="scroll-mt-24 bg-panel">
          <div data-reveal className="reveal-section grid lg:grid-cols-2">
            <div className="depth-photo relative min-h-[60svh]">
              <img src={salon} alt="Salon ouvert sur la mer à La Marsa" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-hero-veil" />
              <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 gap-px bg-on-image/20 text-on-image backdrop-blur-md sm:grid-cols-4">
                {nearby.map(({ label, value }) => <div key={label} className="bg-ink/35 px-4 py-4"><p className="font-display text-2xl">{value}</p><p className="text-[11px] leading-4 text-on-image-muted">{label}</p></div>)}
              </div>
            </div>
            <div className="px-5 py-20 md:px-12 lg:px-16 lg:py-24">
              <p className="eyebrow eyebrow-rule text-primary"><Waves className="h-4 w-4" />Art de vivre</p>
              <h2 className="section-title mt-5">La Marsa,<br /><em>l’élégance méditerranéenne.</em></h2>
              <p className="mt-7 max-w-xl leading-8 text-muted-foreground">Plages de sable fin, corniche animée, jardins de jasmin et écoles internationales : La Marsa réunit le calme d’une ville balnéaire et l’effervescence de la capitale, à deux pas de Sidi Bou Saïd et de Carthage.</p>
              <div className="mt-10">
                {marsaDistricts.map((district) => (
                  <Link key={district.name} to="/biens" search={{ transaction: "vente", district: district.name }} className="district-row group" title={district.description}>
                    <span><strong>{district.name}</strong><span className="mt-1 block text-sm text-muted-foreground">{district.tagline}</span></span>
                    <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ——— Locations ——— */}
        <section id="location" className="scroll-mt-24 px-5 py-24 md:px-10 md:py-32">
          <div data-reveal className="reveal-section mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div><p className="eyebrow eyebrow-rule text-primary">À louer · Meublé ou à l’année</p><h2 className="section-title mt-5">Posez vos valises<br /><em>à La Marsa.</em></h2><p className="mt-5 max-w-xl leading-7 text-muted-foreground">Des locations prêtes à vivre pour familles, expatriés et séjours longue durée, sélectionnées et visitées par notre équipe.</p></div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="rounded-full" aria-label="Locations précédentes" onClick={() => scrollRentals(-1)}><ArrowLeft /></Button>
                <Button variant="outline" size="icon" className="rounded-full" aria-label="Locations suivantes" onClick={() => scrollRentals(1)}><ArrowRight /></Button>
                <Button asChild className="h-12 rounded-full px-6"><Link to="/biens" search={{ transaction: "location" }}>Toutes les locations <ArrowRight /></Link></Button>
              </div>
            </div>
            <div ref={rentalTrack} className="rental-track mt-14">{rentalProperties.map((property) => <PropertyCard key={property.id} property={property} />)}</div>
          </div>
        </section>

        {/* ——— Recherche guidée ——— */}
        <section id="chercher" className="scroll-mt-24 bg-panel px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div data-reveal className="reveal-section grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div><p className="eyebrow eyebrow-rule text-primary"><Search className="h-4 w-4" />Votre futur lieu de vie</p><h2 className="section-title mt-5">Construisez<br /><em>votre recherche.</em></h2></div>
              <p className="max-w-xl text-base leading-8 text-muted-foreground">Un parcours rapide, étape par étape. Chaque choix vous rapproche des adresses de La Marsa qui vous correspondent.</p>
            </div>
            <div className="mt-14"><GuidedSearch /></div>
          </div>
        </section>

        {/* ——— Vendre ——— */}
        <section id="confier" className="scroll-mt-24">
          <div data-reveal className="reveal-section grid lg:grid-cols-2">
            <div className="flex items-center px-5 py-20 md:px-12 lg:px-16 lg:py-28">
              <div className="max-w-xl">
                <span className="service-icon"><Building2 /></span>
                <p className="eyebrow eyebrow-rule mt-8 text-primary">Vendre ou louer votre bien</p>
                <h2 className="section-title mt-5">Confiez-nous<br /><em>votre propriété.</em></h2>
                <p className="mt-7 text-base leading-8 text-muted-foreground">Estimation offerte sous 48 h, mise en valeur professionnelle et diffusion auprès d’une clientèle tunisienne et internationale à la recherche de biens à La Marsa.</p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Button asChild className="h-12 rounded-full px-6"><a href={`mailto:${agency.email}?subject=${encodeURIComponent("Estimation de mon bien à La Marsa")}`}>Demander une estimation <ArrowRight /></a></Button>
                  <Button asChild variant="outline" className="h-12 rounded-full px-6"><a href={agency.phoneHref}><Phone /> {agency.phone}</a></Button>
                </div>
              </div>
            </div>
            <div className="depth-photo relative min-h-[55svh]"><img src={cuisine} alt="Cuisine lumineuse d’une villa confiée à l’agence" className="absolute inset-0 h-full w-full object-cover" /></div>
          </div>
          <div className="bg-menu px-5 py-20 text-menu-foreground md:px-10 md:py-24">
            <div data-reveal className="reveal-section mx-auto max-w-7xl">
              <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end"><div><p className="eyebrow text-menu-muted">Estimation & expertise</p><h2 className="section-title mt-5">La juste valeur,<br />en quatre étapes.</h2></div><p className="max-w-lg leading-8 text-menu-muted">Notre méthode associe connaissance du marché marsois, analyse des ventes comparables et présentation soignée de votre bien.</p></div>
              <ol className="mt-14 grid gap-px bg-menu-foreground/15 md:grid-cols-2 lg:grid-cols-4">
                {sellingSteps.map(({ title, text }, index) => <li key={title} className="bg-menu py-8 md:px-6 lg:first:pl-0"><span className="step-number">0{index + 1}</span><h3 className="mt-5 font-display text-3xl">{title}</h3><p className="mt-2 text-sm leading-6 text-menu-muted">{text}</p></li>)}
              </ol>
            </div>
          </div>
        </section>

        {/* ——— Témoignages ——— */}
        <section className="px-5 py-24 md:px-10 md:py-32">
          <div data-reveal className="reveal-section mx-auto max-w-7xl">
            <div className="text-center"><p className="eyebrow text-primary">Ils nous ont fait confiance</p><h2 className="section-title mt-5">Paroles <em>de clients.</em></h2></div>
            <div className="stagger-grid mt-14 grid gap-6 md:grid-cols-3">
              {testimonials.map(({ quote, author, context }) => (
                <figure key={author} className="testimonial-card flex flex-col">
                  <Quote className="h-7 w-7 text-primary" />
                  <blockquote className="mt-6 flex-1 font-display text-2xl leading-snug">« {quote} »</blockquote>
                  <figcaption className="mt-8 border-t border-border pt-5"><p className="text-sm font-semibold">{author}</p><p className="text-xs text-muted-foreground">{context}</p></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}

function ContactSection() {
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [`Nom : ${data.get("name")}`, `Téléphone : ${data.get("phone")}`, `E-mail : ${data.get("email")}`, `Projet : ${data.get("project")}`, "", String(data.get("message") ?? "")].join("\n");
    window.location.href = `mailto:${agency.email}?subject=${encodeURIComponent(`Projet ${data.get("project")} — ${data.get("name")}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden px-5 py-24 md:px-10 md:py-32">
      <img src={piscine} alt="Piscine face au coucher de soleil sur le golfe de Tunis" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-contact-overlay" />
      <div data-reveal className="reveal-section relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="text-on-image">
          <p className="eyebrow">Écrivons la suite</p>
          <h2 className="section-title mt-5">Parlons de<br /><em className="!text-on-image">votre projet.</em></h2>
          <p className="mt-6 max-w-md leading-8 text-on-image-muted">Un conseiller vous répond sous 24 h, ou venez nous rencontrer à l’agence de La Marsa.</p>
          <ul className="mt-10 space-y-4 text-sm">
            <li className="flex items-center gap-3"><MapPin className="h-4 w-4" />{agency.address}</li>
            <li><a href={agency.phoneHref} className="flex items-center gap-3 hover:underline"><Phone className="h-4 w-4" />{agency.phone}</a></li>
            <li><a href={`mailto:${agency.email}`} className="flex items-center gap-3 hover:underline"><Mail className="h-4 w-4" />{agency.email}</a></li>
            <li className="flex items-center gap-3"><Clock className="h-4 w-4" />{agency.hours}</li>
          </ul>
        </div>
        <form onSubmit={submit} className="shadow-soft grid gap-6 bg-card p-7 md:grid-cols-2 md:p-10">
          <p className="font-display text-3xl md:col-span-2">Prendre rendez-vous</p>
          <label className="contact-field">Nom<input name="name" required autoComplete="name" /></label>
          <label className="contact-field">Téléphone<input name="phone" type="tel" required autoComplete="tel" /></label>
          <label className="contact-field md:col-span-2">E-mail<input name="email" type="email" required autoComplete="email" /></label>
          <label className="contact-field md:col-span-2">Votre projet<select name="project" defaultValue="Achat"><option>Achat</option><option>Location</option><option>Vente</option><option>Estimation</option><option>Gestion locative</option></select></label>
          <label className="contact-field md:col-span-2">Message<textarea name="message" rows={3} placeholder="Quartier, budget, type de bien…" /></label>
          <Button type="submit" className="h-12 rounded-full md:col-span-2">Envoyer ma demande <ArrowRight /></Button>
          {sent && <p className="text-center text-sm text-muted-foreground md:col-span-2" role="status">Votre messagerie s’est ouverte avec votre demande pré-remplie.</p>}
        </form>
      </div>
    </section>
  );
}
