import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Building2, KeyRound, Quote, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import facade from "@/assets/tour/01-facade.jpg";
import entree from "@/assets/tour/02-entree.jpg";
import salon from "@/assets/tour/03-salon.jpg";
import cuisine from "@/assets/tour/04-cuisine.jpg";
import piscine from "@/assets/tour/07-piscine.jpg";
import logoAsset from "@/assets/brand/mellinium-logo-transparent.png.asset.json";
import { Button } from "@/components/ui/button";
import { GuidedSearch } from "./GuidedSearch";
import { PropertyCard } from "./PropertyCard";
import { SiteHeader } from "./SiteHeader";
import { SocialLinks } from "./SocialLinks";
import { properties } from "@/lib/properties";

export function EstateExperience() {
  const heroImage = useRef<HTMLImageElement>(null);
  const heroTitle = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (reduceMotion) { reveals.forEach((element) => element.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    reveals.forEach((element) => observer.observe(element));
    const onScroll = () => {
      const y = window.scrollY;
      if (heroImage.current) heroImage.current.style.transform = `perspective(1000px) translate3d(0, ${y * .05}px, ${Math.min(y * .08, 75)}px) scale(${1.05 + y * .0001})`;
      if (heroTitle.current) heroTitle.current.style.transform = `translate3d(0, ${y * -.045}px, 0)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <section className="hero-perspective relative min-h-[100svh] overflow-hidden text-on-image">
        <img ref={heroImage} src={facade} alt="Propriété contemporaine présentée par Mellinium Immobilière" className="absolute inset-0 h-full w-full object-cover will-change-transform" />
        <div className="absolute inset-0 bg-brand-hero" />
        <SiteHeader overlay />
        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-96px)] max-w-7xl flex-col justify-end px-5 pb-10 md:px-10 md:pb-14">
          <div ref={heroTitle} className="max-w-5xl will-change-transform"><p className="eyebrow text-primary">Mellinium Immobilière Housing</p><h1 className="mt-6 max-w-5xl font-display text-[clamp(3.5rem,9vw,8.5rem)] leading-[.84]">L’immobilier,<br/><em className="font-normal text-primary">autrement.</em></h1><p className="mt-8 max-w-xl text-base leading-7 text-on-image-muted md:text-lg">Chercher, vendre et valoriser chaque lieu avec une attention rare.</p></div>
          <div className="mt-10 flex flex-wrap gap-4"><Button onClick={() => goTo("chercher")} size="lg" className="h-12 px-6">Chercher mon bien <ArrowRight /></Button><Button onClick={() => goTo("confier")} variant="glass" size="lg" className="h-12 px-6">Confier mon bien</Button></div>
          <Button variant="glass" size="icon" onClick={() => goTo("agence")} aria-label="Découvrir l’agence" className="scroll-cue absolute bottom-10 right-5 hidden rounded-full md:flex md:right-10"><ArrowDown /></Button>
        </div>
      </section>

      <section id="agence" className="px-5 py-24 md:px-10 md:py-36"><div data-reveal className="reveal-section mx-auto grid max-w-7xl gap-16 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
        <div className="depth-frame relative mx-auto w-full max-w-lg lg:mx-0"><div className="depth-shadow"/><img src={entree} alt="Entrée élégante d’une propriété" className="relative aspect-[4/5] w-full object-cover"/><div className="depth-plaque absolute -bottom-8 -right-4 border border-primary/40 bg-background p-5 md:-right-8 md:p-7"><p className="font-display text-4xl text-primary">À vos côtés</p><p className="mt-1 text-xs uppercase text-muted-foreground">À chaque étape</p></div></div>
        <div className="lg:pl-12"><p className="eyebrow text-primary">Notre agence</p><h2 className="mt-5 font-display text-5xl leading-[.95] md:text-7xl">Votre projet mérite<br/>une attention rare.</h2><p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">Écoute, discrétion et connaissance du marché guident chaque projet. Nous révélons la valeur d’un lieu et accompagnons les décisions qui comptent.</p><div className="mt-10 grid grid-cols-3 gap-px border-y border-border bg-border">{[["Sur mesure","Conseil dédié"],["Proximité","Équipe disponible"],["Exigence","Présentation soignée"]].map(([title,text]) => <div key={title} className="bg-background px-3 py-6"><strong className="font-display text-xl text-primary md:text-2xl">{title}</strong><span className="mt-1 block text-xs text-muted-foreground">{text}</span></div>)}</div></div>
      </div></section>

      <section id="chercher" className="relative bg-panel px-5 py-24 text-panel-foreground md:px-10 md:py-36"><div className="mx-auto max-w-7xl"><div data-reveal className="reveal-section grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-end"><div><p className="eyebrow text-primary">Votre futur lieu de vie</p><h2 className="mt-5 font-display text-5xl leading-[.92] md:text-7xl">Construisez<br/><em>votre recherche.</em></h2></div><p className="max-w-xl text-base leading-8 text-muted-foreground">Un parcours rapide, étape par étape. Chaque choix fait avancer votre recherche jusqu’aux adresses qui vous correspondent.</p></div><div className="mt-14"><GuidedSearch /></div></div></section>

      <section id="confier" className="relative min-h-[90svh]"><div data-reveal className="reveal-section grid min-h-[90svh] lg:grid-cols-2"><div className="depth-photo min-h-[55svh] overflow-hidden"><img src={cuisine} alt="Cuisine haut de gamme d’un bien confié à l’agence" className="h-full w-full object-cover"/></div><div className="flex items-center px-5 py-20 md:px-12 lg:px-[8vw]"><div className="max-w-xl"><span className="service-icon"><KeyRound /></span><p className="eyebrow mt-8 text-primary">Une stratégie pour votre patrimoine</p><h2 className="mt-5 font-display text-5xl leading-[.92] md:text-7xl">Confier<br/><em>mon bien.</em></h2><p className="mt-7 text-base leading-8 text-muted-foreground">Estimation argumentée, images soignées, diffusion ciblée et suivi transparent : nous présentons votre propriété aux bons acquéreurs.</p><Button asChild className="mt-9"><a href="mailto:contact@mellinium-immobiliere.fr?subject=Estimation de mon bien">Demander une estimation <ArrowRight /></a></Button></div></div></div></section>

      <section className="relative overflow-hidden bg-menu px-5 py-24 text-menu-foreground md:px-10 md:py-36"><div data-reveal className="reveal-section mx-auto max-w-7xl"><div className="grid gap-14 lg:grid-cols-[1.2fr_.8fr] lg:items-end"><div><p className="eyebrow text-primary">Estimation & expertise</p><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[.92] md:text-8xl">La juste valeur,<br/>sans approximation.</h2></div><p className="max-w-lg text-base leading-8 text-menu-muted">Notre analyse associe connaissance locale, caractéristiques du bien et réalité du marché.</p></div><div className="mt-16 grid border-t border-menu-muted/20 md:grid-cols-3">{[{icon:Building2,title:"Analyse locale",text:"Comparables récents et lecture précise du secteur."},{icon:Sparkles,title:"Mise en valeur",text:"Photographies, narration et diffusion qualitative."},{icon:ShieldCheck,title:"Suivi serein",text:"Un interlocuteur unique jusqu’à la signature."}].map(({icon:Icon,title,text}) => <article key={title} className="expertise-tile border-b border-menu-muted/20 py-9 md:px-8 md:first:pl-0"><Icon className="h-7 w-7 text-primary"/><h3 className="mt-7 font-display text-3xl">{title}</h3><p className="mt-3 text-sm leading-6 text-menu-muted">{text}</p></article>)}</div></div></section>

      <section className="bg-panel px-5 py-24 text-panel-foreground md:px-10 md:py-36"><div data-reveal className="reveal-section mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow text-primary">Sélection privée</p><h2 className="mt-5 font-display text-5xl md:text-7xl">Des biens à découvrir</h2></div><Button asChild variant="outline"><Link to="/biens" search={{ transaction: "vente" }}>Voir toute la collection <ArrowRight /></Link></Button></div><div className="mt-14 grid gap-8 lg:grid-cols-2">{properties.slice(0,3).map((property,index) => <PropertyCard key={property.id} property={property} featured={index === 0}/>)}</div></div></section>

      <section className="px-5 py-24 md:px-10 md:py-32"><div data-reveal className="reveal-section mx-auto max-w-5xl text-center"><Quote className="mx-auto h-8 w-8 text-primary"/><blockquote className="mt-8 font-display text-3xl leading-tight md:text-5xl">« Une équipe à l’écoute, une estimation claire et un accompagnement irréprochable jusqu’à la signature. »</blockquote><p className="mt-8 text-xs uppercase text-muted-foreground">Témoignage client</p></div></section>

      <section className="relative flex min-h-[82svh] items-end overflow-hidden px-5 py-14 text-on-image md:px-10 md:py-20"><img src={piscine} alt="Propriété avec piscine au coucher du soleil" className="depth-contact absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-contact-overlay"/><div data-reveal className="reveal-section relative mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-10 md:flex-row md:items-end"><div><p className="eyebrow text-primary">Écrivons la suite</p><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[.92] md:text-8xl">Parlons de<br/>votre projet.</h2></div><Button asChild size="lg" className="h-12 px-6"><a href="mailto:contact@mellinium-immobiliere.fr">Prendre contact <ArrowRight /></a></Button></div></section>

      <footer className="border-t border-border px-5 py-10 md:px-10"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center"><img src={logoAsset.url} alt="Mellinium Immobilière Housing" className="h-16 w-auto"/><div className="flex flex-col items-start gap-5 md:items-end"><SocialLinks compact/><p className="text-xs text-muted-foreground">© 2026 Mellinium Immobilière Housing · Mentions légales</p></div></div></footer>
    </main>
  );
}