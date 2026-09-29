import {
  ArrowDown,
  ArrowRight,
  Building2,
  ChevronRight,
  KeyRound,
  Menu,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/brand/mellinium-logo.png.asset.json";
import facade from "@/assets/tour/01-facade.jpg";
import entree from "@/assets/tour/02-entree.jpg";
import salon from "@/assets/tour/03-salon.jpg";
import cuisine from "@/assets/tour/04-cuisine.jpg";
import suite from "@/assets/tour/05-suite.jpg";
import piscine from "@/assets/tour/07-piscine.jpg";

const navigation = [
  ["agence", "L’agence"],
  ["chercher", "Chercher un bien"],
  ["confier", "Confier un bien"],
  ["selection", "Nos biens"],
  ["contact", "Contact"],
] as const;

const properties = [
  { image: facade, place: "Saint-Tropez", name: "Villa contemporaine", detail: "6 pièces · Piscine · Vue mer" },
  { image: salon, place: "Cannes", name: "Appartement d’exception", detail: "4 pièces · Terrasse · Centre" },
  { image: suite, place: "Mougins", name: "Bastide confidentielle", detail: "8 pièces · Parc paysager" },
];

export function EstateExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const heroImage = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (reduceMotion) {
      reveals.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.16 },
    );
    reveals.forEach((element) => observer.observe(element));
    const onScroll = () => {
      if (heroImage.current) heroImage.current.style.transform = `scale(${1.04 + window.scrollY * 0.00008}) translateY(${window.scrollY * 0.035}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <section className="relative min-h-[100svh] overflow-hidden">
        <img ref={heroImage} src={facade} alt="Propriété contemporaine présentée par Mellinium Immobilière" className="absolute inset-0 h-full w-full object-cover will-change-transform" />
        <div className="absolute inset-0 bg-brand-hero" />

        <header className="relative z-20 flex items-center justify-between px-5 py-5 md:px-10 md:py-7">
          <Button variant="ghost" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="h-auto p-0 hover:bg-transparent">
            <img src={logoAsset.url} alt="Mellinium Immobilière Housing" className="h-12 w-auto object-contain md:h-16" />
          </Button>
          <div className="hidden items-center gap-8 lg:flex">
            {navigation.slice(0, 4).map(([id, label]) => (
              <Button key={id} variant="ghost" onClick={() => goTo(id)} className="h-auto p-0 text-[11px] uppercase text-on-image-muted hover:bg-transparent hover:text-primary">{label}</Button>
            ))}
          </div>
          <Button variant="glass" size="icon" aria-label="Ouvrir le menu" onClick={() => setMenuOpen(true)}><Menu /></Button>
        </header>

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-96px)] max-w-7xl flex-col justify-end px-5 pb-10 md:px-10 md:pb-14">
          <div className="max-w-5xl text-on-image">
            <p className="eyebrow text-primary">Mellinium Immobilière Housing</p>
            <h1 className="mt-6 max-w-5xl font-display text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.84]">L’immobilier,<br /><em className="font-normal text-primary">autrement.</em></h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-on-image-muted md:text-lg">Une agence engagée à vos côtés pour chercher, vendre et valoriser chaque lieu avec exigence.</p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button onClick={() => goTo("chercher")} size="lg" className="h-12 px-6">Chercher mon bien <ArrowRight /></Button>
            <Button onClick={() => goTo("confier")} variant="glass" size="lg" className="h-12 px-6 text-on-image">Confier mon bien</Button>
          </div>
          <button onClick={() => goTo("agence")} aria-label="Découvrir l’agence" className="absolute bottom-10 right-5 hidden h-14 w-14 place-items-center rounded-full border border-on-image/30 text-on-image transition-colors hover:border-primary hover:text-primary md:grid md:right-10"><ArrowDown className="h-5 w-5" /></button>
        </div>
      </section>

      <section id="agence" className="px-5 py-24 md:px-10 md:py-36">
        <div data-reveal className="reveal-section mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div className="relative mx-auto w-full max-w-lg lg:mx-0">
            <img src={entree} alt="Entrée élégante d’une propriété" className="aspect-[4/5] w-full object-cover" />
            <div className="absolute -bottom-8 -right-4 border border-primary/40 bg-background p-5 md:-right-8 md:p-7">
              <p className="font-display text-4xl text-primary">À vos côtés</p>
              <p className="mt-1 text-xs uppercase text-muted-foreground">À chaque étape</p>
            </div>
          </div>
          <div className="lg:pl-12">
            <p className="eyebrow text-primary">Notre agence</p>
            <h2 className="mt-5 font-display text-5xl leading-[0.95] md:text-7xl">Votre projet mérite<br />une attention rare.</h2>
            <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">Mellinium Immobilière Housing place l’écoute, la discrétion et la connaissance du marché au cœur de chaque projet. Nous révélons la valeur d’un lieu et accompagnons les décisions qui comptent.</p>
            <div className="mt-10 grid grid-cols-2 gap-px border-y border-border bg-border sm:grid-cols-3">
              {[['Sur mesure', 'Un conseil dédié'], ['Proximité', 'Une équipe disponible'], ['Exigence', 'Une présentation soignée']].map(([title, text]) => <div key={title} className="bg-background px-4 py-6"><strong className="font-display text-2xl text-primary">{title}</strong><span className="mt-1 block text-xs text-muted-foreground">{text}</span></div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="chercher" className="relative min-h-[90svh] bg-panel text-panel-foreground">
        <div data-reveal className="reveal-section grid min-h-[90svh] lg:grid-cols-2">
          <div className="order-2 flex items-center px-5 py-20 md:px-12 lg:order-1 lg:px-[8vw]">
            <div className="max-w-xl">
              <span className="service-icon"><Search /></span>
              <p className="eyebrow mt-8 text-primary">Votre futur lieu de vie</p>
              <h2 className="mt-5 font-display text-5xl leading-[0.92] md:text-7xl">Chercher<br /><em>mon bien.</em></h2>
              <p className="mt-7 text-base leading-8 text-muted-foreground">Parlez-nous de vos envies, de votre rythme de vie et de vos essentiels. Nous sélectionnons les opportunités qui vous ressemblent, y compris celles qui ne sont pas encore sur le marché.</p>
              <Button onClick={() => goTo("selection")} className="mt-9">Découvrir notre sélection <ArrowRight /></Button>
            </div>
          </div>
          <div className="order-1 min-h-[55svh] overflow-hidden lg:order-2"><img src={salon} alt="Salon lumineux d’une propriété à vendre" className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105" /></div>
        </div>
      </section>

      <section id="confier" className="relative min-h-[90svh] bg-background">
        <div data-reveal className="reveal-section grid min-h-[90svh] lg:grid-cols-2">
          <div className="min-h-[55svh] overflow-hidden"><img src={cuisine} alt="Cuisine haut de gamme d’un bien confié à l’agence" className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105" /></div>
          <div className="flex items-center px-5 py-20 md:px-12 lg:px-[8vw]">
            <div className="max-w-xl">
              <span className="service-icon"><KeyRound /></span>
              <p className="eyebrow mt-8 text-primary">Une stratégie pour votre patrimoine</p>
              <h2 className="mt-5 font-display text-5xl leading-[0.92] md:text-7xl">Confier<br /><em>mon bien.</em></h2>
              <p className="mt-7 text-base leading-8 text-muted-foreground">Estimation argumentée, images soignées, diffusion ciblée et suivi transparent : nous construisons un récit juste pour présenter votre propriété aux bons acquéreurs.</p>
              <Button onClick={() => goTo("estimation")} className="mt-9">Demander une estimation <ArrowRight /></Button>
            </div>
          </div>
        </div>
      </section>

      <section id="estimation" className="relative overflow-hidden bg-menu px-5 py-24 text-menu-foreground md:px-10 md:py-36">
        <div data-reveal className="reveal-section mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div><p className="eyebrow text-primary">Estimation & expertise</p><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[0.92] md:text-8xl">La juste valeur,<br />sans approximation.</h2></div>
            <p className="max-w-lg text-base leading-8 text-menu-muted">Notre analyse combine connaissance locale, caractéristiques du bien et réalité du marché pour vous donner une vision claire et défendable.</p>
          </div>
          <div className="mt-16 grid border-t border-menu-muted/20 md:grid-cols-3">
            {[{icon: Building2,title:'Analyse locale',text:'Comparables récents et lecture précise du secteur.'},{icon:Sparkles,title:'Mise en valeur',text:'Photographies, narration et diffusion qualitative.'},{icon:ShieldCheck,title:'Suivi serein',text:'Un interlocuteur unique jusqu’à la signature.'}].map(({icon:Icon,title,text}) => <article key={title} className="border-b border-menu-muted/20 py-9 md:px-8 md:first:pl-0 md:last:pr-0"><Icon className="h-7 w-7 text-primary"/><h3 className="mt-7 font-display text-3xl">{title}</h3><p className="mt-3 text-sm leading-6 text-menu-muted">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section id="selection" className="bg-panel px-5 py-24 text-panel-foreground md:px-10 md:py-36">
        <div data-reveal className="reveal-section mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow text-primary">Sélection privée</p><h2 className="mt-5 font-display text-5xl md:text-7xl">Des biens à découvrir</h2></div><p className="max-w-sm text-sm leading-6 text-muted-foreground">Une sélection de propriétés choisies pour leur adresse, leur architecture et leur caractère.</p></div>
          <div className="mt-14 grid gap-10 lg:grid-cols-3">
            {properties.map((property, index) => <article key={property.name} className={`property-card group ${index === 1 ? 'lg:mt-16' : ''}`}><div className="overflow-hidden"><img src={property.image} alt={property.name} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div><div className="mt-5 flex items-start justify-between border-t border-border pt-5"><div><p className="eyebrow text-primary">{property.place}</p><h3 className="mt-2 font-display text-3xl">{property.name}</h3><p className="mt-2 text-sm text-muted-foreground">{property.detail}</p></div><ChevronRight className="mt-1 h-5 w-5 text-primary" /></div></article>)}
          </div>
        </div>
      </section>

      <section className="bg-background px-5 py-24 md:px-10 md:py-32">
        <div data-reveal className="reveal-section mx-auto max-w-5xl text-center">
          <Quote className="mx-auto h-8 w-8 text-primary" />
          <blockquote className="mt-8 font-display text-3xl leading-tight md:text-5xl">« Une équipe à l’écoute, une estimation claire et un accompagnement irréprochable jusqu’à la signature. »</blockquote>
          <p className="mt-8 text-xs uppercase text-muted-foreground">Témoignage client</p>
        </div>
      </section>

      <section id="contact" className="relative flex min-h-[82svh] items-end overflow-hidden px-5 py-14 text-on-image md:px-10 md:py-20">
        <img src={piscine} alt="Propriété avec piscine au coucher du soleil" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-contact-overlay" />
        <div data-reveal className="reveal-section relative mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div><p className="eyebrow text-primary">Écrivons la suite</p><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[0.92] md:text-8xl">Parlons de<br />votre projet.</h2></div>
          <Button asChild size="lg" className="h-12 px-6"><a href="mailto:contact@mellinium-immobiliere.fr">Prendre contact <ArrowRight /></a></Button>
        </div>
      </section>

      <footer className="border-t border-border bg-background px-5 py-10 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center"><img src={logoAsset.url} alt="Mellinium Immobilière Housing" className="h-14 w-auto" /><p className="text-xs text-muted-foreground">© 2026 Mellinium Immobilière Housing · Mentions légales</p></div>
      </footer>

      {menuOpen && <div className="fixed inset-0 z-50 overflow-y-auto bg-menu p-6 text-menu-foreground md:p-12"><div className="flex items-center justify-between"><img src={logoAsset.url} alt="Mellinium Immobilière Housing" className="h-14 w-auto" /><Button variant="glass" size="icon" aria-label="Fermer le menu" onClick={() => setMenuOpen(false)}><X /></Button></div><nav className="mx-auto mt-16 max-w-5xl">{navigation.map(([id,label]) => <Button key={id} variant="ghost" onClick={() => goTo(id)} className="h-auto w-full justify-between border-b border-menu-muted/25 px-0 py-5 text-menu-foreground hover:bg-transparent hover:text-primary"><span className="font-display text-3xl md:text-6xl">{label}</span><ArrowRight /></Button>)}</nav></div>}
    </main>
  );
}