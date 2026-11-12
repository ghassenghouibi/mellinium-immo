import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Clock, Compass, Eye, Globe2, Handshake, HeartHandshake, Home, KeyRound, Lock, Mail, MapPin, Search, ShieldCheck, Sparkles, Timer, UserCheck, Wrench, Zap } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import entree from "@/assets/tour/02-entree.jpg";
import salon from "@/assets/tour/03-salon.jpg";
import piscine from "@/assets/tour/07-piscine.jpg";
import laMarsa from "@/assets/tour/08-la-marsa.jpg";
import { Button } from "@/components/ui/button";
import { agency, whatsappHref } from "@/lib/agency";
import { about, approach, areasIntro, closing, diplomatic, services, servicesIntro, whyUs, type ServiceId } from "@/lib/content";
import { useI18n, type L } from "@/lib/i18n";
import { areas, rentalProperties, saleProperties } from "@/lib/properties";
import { team } from "@/lib/team";
import { GuidedSearch } from "./GuidedSearch";
import { HeroFilm } from "./HeroFilm";
import { PropertyCard } from "./PropertyCard";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { SelectField, TextAreaField, TextField } from "./fields";
import { PhoneContact, SocialIcon } from "./SocialLinks";

const serviceLinks: Record<ServiceId, { icon: typeof Home; cta: L; to: "/" | "/biens"; search?: { transaction: "vente" | "location" }; hash?: string }> = {
  rental: { icon: KeyRound, cta: { fr: "Voir les locations", en: "See rentals" }, to: "/biens", search: { transaction: "location" } },
  sales: { icon: Home, cta: { fr: "Voir les biens à vendre", en: "See homes for sale" }, to: "/biens", search: { transaction: "vente" } },
  search: { icon: Search, cta: { fr: "Construire ma recherche", en: "Build my search" }, to: "/", hash: "chercher" },
  visits: { icon: Handshake, cta: { fr: "Organiser une visite", en: "Arrange a visit" }, to: "/", hash: "contact" },
  relocation: { icon: Globe2, cta: { fr: "Préparer mon installation", en: "Plan my move" }, to: "/", hash: "diplomatie" },
  management: { icon: Wrench, cta: { fr: "Confier mon bien", en: "Entrust my property" }, to: "/", hash: "contact" },
};

const approachIcons = [Lock, Zap, UserCheck, ShieldCheck];
const reasonIcons = [Compass, Sparkles, Timer, Handshake, Eye, HeartHandshake];

export function EstateExperience() {
  const { t } = useI18n();
  const rentalTrack = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (reduceMotion) { reveals.forEach((element) => element.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    reveals.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollRentals = (direction: 1 | -1) => {
    const track = rentalTrack.current;
    if (track) track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  };

  const [featuredSale, ...otherSales] = saleProperties;

  return (
    <div className="bg-background text-foreground">
      <SiteHeader />
      <main className="overflow-x-clip">
        {/* ——— Accueil : film des quartiers ——— */}
        <HeroFilm />

        {/* ——— Notre approche ——— */}
        <section className="border-y border-border bg-panel px-5 py-12 md:px-10" aria-label={t({ fr: "Notre approche", en: "Our approach" })}>
          <div data-reveal className="reveal-section mx-auto grid max-w-7xl grid-cols-2 gap-y-10 lg:grid-cols-4">
            {approach.map((value, index) => {
              const Icon = approachIcons[index] ?? ShieldCheck;
              return <div key={value.en} className="border-l border-border pl-5 md:pl-8"><Icon className="h-5 w-5 text-primary" /><p className="stat-value approach-value mt-3">{t(value)}</p><p className="mt-2 text-xs uppercase tracking-[.16em] text-muted-foreground">{t({ fr: "Notre approche", en: "Our approach" })}</p></div>;
            })}
          </div>
        </section>

        {/* ——— À propos ——— */}
        <section id="agence" className="scroll-mt-24 px-5 py-24 md:px-10 md:py-32">
          <div data-reveal className="reveal-section mx-auto grid max-w-7xl gap-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div className="relative mx-auto w-full max-w-lg lg:mx-0">
              <div className="depth-photo"><img src={entree} alt={t({ fr: "Entrée voûtée d’une demeure de caractère", en: "Arched entrance of a characterful residence" })} className="aspect-[4/5] w-full object-cover" /></div>
              <div className="shadow-soft absolute -bottom-8 -right-4 bg-card p-6 md:-right-10 md:p-8">
                <p className="font-display text-4xl text-primary">La Marsa</p>
                <p className="mt-1 text-xs uppercase tracking-[.16em] text-muted-foreground">{agency.address.replace(", La Marsa", "")}</p>
              </div>
            </div>
            <div className="lg:pl-10">
              <p className="eyebrow eyebrow-rule text-primary">{t(about.eyebrow)}</p>
              <h2 className="section-title mt-5">{t(about.title)}<br /><em>{t(about.accent)}</em></h2>
              <div className="mt-8 max-w-2xl space-y-5 text-base leading-8 text-muted-foreground md:text-lg">
                {about.paragraphs.map((paragraph) => <p key={paragraph.en}>{t(paragraph)}</p>)}
              </div>
              <blockquote className="commitment-card mt-10">
                <p className="eyebrow text-primary">{t(about.commitmentTitle)}</p>
                <p className="mt-3 font-display text-2xl leading-snug md:text-[1.7rem]">{t(about.commitment)}</p>
              </blockquote>
            </div>
          </div>
        </section>

        {/* ——— Services ——— */}
        <section id="services" className="scroll-mt-24 bg-panel px-5 py-24 md:px-10 md:py-32">
          <div data-reveal className="reveal-section mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
              <div><p className="eyebrow eyebrow-rule text-primary">{t(servicesIntro.eyebrow)}</p><h2 className="section-title mt-5">{t(servicesIntro.title)}<br /><em>{t(servicesIntro.accent)}</em></h2></div>
              <p className="max-w-xl text-base leading-8 text-muted-foreground">{t(servicesIntro.text)}</p>
            </div>
            <div className="stagger-grid mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map(({ id, title, text }) => {
                const { icon: Icon, cta, ...link } = serviceLinks[id];
                return (
                  <Link key={id} to={link.to} {...(link.search ? { search: link.search } : {})} {...(link.hash ? { hash: link.hash } : {})} className="service-card group">
                    <span className="service-icon"><Icon /></span>
                    <h3 className="mt-7 font-display text-3xl">{t(title)}</h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{t(text)}</p>
                    <span className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-primary">{t(cta)}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ——— Locations ——— */}
        <section id="location" className="scroll-mt-24 px-5 py-24 md:px-10 md:py-32">
          <div data-reveal className="reveal-section mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div><p className="eyebrow eyebrow-rule text-primary">{t({ fr: "Biens à la une · À louer", en: "Featured · For rent" })}</p><h2 className="section-title mt-5">{t({ fr: "Meublé ou non meublé,", en: "Furnished or unfurnished," })}<br /><em>{t({ fr: "prêt à vivre.", en: "ready to live in." })}</em></h2><p className="mt-5 max-w-xl leading-7 text-muted-foreground">{t({ fr: "Des locations de longue durée soigneusement sélectionnées dans les quartiers résidentiels prisés, selon vos exigences, votre budget et votre mode de vie.", en: "Carefully selected long-term rentals in premium residential areas, according to your requirements, budget and lifestyle." })}</p></div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="rounded-full" aria-label={t({ fr: "Locations précédentes", en: "Previous rentals" })} onClick={() => scrollRentals(-1)}><ArrowLeft /></Button>
                <Button variant="outline" size="icon" className="rounded-full" aria-label={t({ fr: "Locations suivantes", en: "Next rentals" })} onClick={() => scrollRentals(1)}><ArrowRight /></Button>
                <Button asChild className="h-12 rounded-full px-6"><Link to="/biens" search={{ transaction: "location" }}>{t({ fr: "Toutes les locations", en: "All rentals" })} <ArrowRight /></Link></Button>
              </div>
            </div>
            <div ref={rentalTrack} className="rental-track mt-14">{rentalProperties.map((property) => <PropertyCard key={property.id} property={property} />)}</div>
          </div>
        </section>

        {/* ——— Quartiers ——— */}
        <section id="quartiers" className="scroll-mt-24 bg-panel">
          <div data-reveal className="reveal-section grid lg:grid-cols-2">
            <div className="relative">
              {/* Photo fixée à la hauteur de l’écran pendant le défilement de la liste des quartiers. */}
              <div className="depth-photo relative h-[min(34rem,80svh)] lg:sticky lg:top-[4.6rem] lg:h-[calc(100svh-4.6rem)]">
                <img src={laMarsa} alt={t({ fr: "Sidi Bou Saïd et sa marina face au golfe de Tunis", en: "Sidi Bou Saïd and its marina facing the Gulf of Tunis" })} className="absolute inset-0 h-full w-full object-cover object-[center_62%]" />
                <div className="absolute inset-0 bg-hero-veil" />
                <div className="absolute inset-x-0 bottom-0 p-8 text-on-image md:p-12">
                  <p className="font-display text-5xl leading-none md:text-6xl">{t(areasIntro.motto)}</p>
                  <p className="mt-3 max-w-md text-sm uppercase tracking-[.16em] text-on-image-muted">{t(areasIntro.mottoSub)}</p>
                </div>
              </div>
            </div>
            <div className="px-5 py-20 md:px-12 lg:px-16 lg:py-24">
              <p className="eyebrow eyebrow-rule text-primary"><MapPin className="h-4 w-4" />{t(areasIntro.eyebrow)}</p>
              <h2 className="section-title mt-5">{t(areasIntro.title)}<br /><em>{t(areasIntro.accent)}</em></h2>
              <p className="mt-7 max-w-xl leading-8 text-muted-foreground">{t(areasIntro.text)}</p>
              <div className="mt-10">
                {areas.map((area, index) => (
                  <Link key={area.name} to="/biens" search={{ transaction: "location", district: area.name }} className="district-row group" title={t(area.description)}>
                    <span className="flex items-baseline gap-4"><small className="text-xs text-primary">0{index + 1}</small><span><strong>{area.name}</strong><span className="mt-1 block text-sm text-muted-foreground">{t(area.tagline)}</span></span></span>
                    <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
              <p className="mt-8 max-w-xl text-sm leading-7 text-muted-foreground">{t(areasIntro.note)}</p>
            </div>
          </div>
        </section>

        {/* ——— Ventes ——— */}
        <section id="vente" className="scroll-mt-24 px-5 py-24 md:px-10 md:py-32">
          <div data-reveal className="reveal-section mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div><p className="eyebrow eyebrow-rule text-primary">{t({ fr: "Biens à la une · À vendre", en: "Featured · For sale" })}</p><h2 className="section-title mt-5">{t({ fr: "Investir ou s’établir", en: "Invest or settle" })}<br /><em>{t({ fr: "durablement en Tunisie.", en: "long-term in Tunisia." })}</em></h2></div>
              <Button asChild variant="outline" className="h-12 rounded-full px-6"><Link to="/biens" search={{ transaction: "vente" }}>{t({ fr: "Tous les biens à vendre", en: "All homes for sale" })} ({saleProperties.length}) <ArrowRight /></Link></Button>
            </div>
            <div className="stagger-grid mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {featuredSale && <PropertyCard property={featuredSale} featured />}
              {otherSales.slice(0, 3).map((property) => <PropertyCard key={property.id} property={property} />)}
            </div>
          </div>
        </section>

        {/* ——— Clients diplomatiques ——— */}
        <section id="diplomatie" className="scroll-mt-24 bg-menu text-menu-foreground">
          <div data-reveal className="reveal-section grid lg:grid-cols-[.85fr_1.15fr]">
            <div className="depth-photo relative min-h-[26rem] lg:min-h-full">
              <img src={salon} alt={t({ fr: "Salon lumineux d’une résidence meublée", en: "Bright living room of a furnished residence" })} className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="px-5 py-20 md:px-12 lg:px-16 lg:py-28">
              <p className="eyebrow eyebrow-rule text-menu-muted">{t(diplomatic.eyebrow)}</p>
              <h2 className="section-title mt-5">{t(diplomatic.title)}<br /><em className="!text-[oklch(0.85_0.09_80)]">{t(diplomatic.accent)}</em></h2>
              <div className="mt-7 max-w-2xl space-y-4 leading-8 text-menu-muted">{diplomatic.paragraphs.map((paragraph) => <p key={paragraph.en}>{t(paragraph)}</p>)}</div>
              <p className="eyebrow mt-12 text-menu-muted">{t(diplomatic.listTitle)}</p>
              <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
                {diplomatic.list.map((item) => <li key={item.en} className="flex items-start gap-3 border-b border-menu-foreground/15 py-3.5 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.85_0.09_80)]" />{t(item)}</li>)}
              </ul>
              <div className="mt-12 border-l-2 border-[oklch(0.85_0.09_80)] pl-6">
                <p className="eyebrow text-menu-muted">{t(diplomatic.priorityTitle)}</p>
                <p className="mt-3 font-display text-2xl leading-snug md:text-3xl">{t(diplomatic.priority)}</p>
              </div>
              <p className="mt-10 text-xs font-semibold uppercase tracking-[.18em] text-menu-muted">{t(diplomatic.closing)}</p>
            </div>
          </div>
        </section>

        {/* ——— Pourquoi nous ——— */}
        <section id="pourquoi" className="scroll-mt-24 px-5 py-24 md:px-10 md:py-32">
          <div data-reveal className="reveal-section mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
              <div><p className="eyebrow eyebrow-rule text-primary">{t(whyUs.eyebrow)}</p><h2 className="section-title mt-5">{t(whyUs.title)}<br /><em>{t(whyUs.accent)}</em></h2></div>
              <div className="max-w-xl space-y-4 leading-8 text-muted-foreground">{whyUs.intro.map((paragraph) => <p key={paragraph.en}>{t(paragraph)}</p>)}</div>
            </div>
            <p className="eyebrow mt-16 text-primary">{t(whyUs.reasonsTitle)}</p>
            <ol className="stagger-grid mt-6 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
              {whyUs.reasons.map(({ title, text }, index) => {
                const Icon = reasonIcons[index] ?? Compass;
                return (
                  <li key={title.en} className="reason-card">
                    <div className="flex items-center justify-between"><span className="service-icon"><Icon /></span><span className="reason-number">0{index + 1}</span></div>
                    <h3 className="mt-6 font-display text-3xl">{t(title)}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{t(text)}</p>
                  </li>
                );
              })}
            </ol>
            <div className="promise-banner mt-10">
              <p className="eyebrow text-primary">{t(whyUs.promiseTitle)}</p>
              <p className="mt-3 font-display text-3xl leading-tight md:text-4xl">{t(whyUs.promise)}</p>
            </div>
          </div>
        </section>

        {/* ——— Recherche guidée ——— */}
        <section id="chercher" className="scroll-mt-24 bg-panel px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div data-reveal className="reveal-section grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div><p className="eyebrow eyebrow-rule text-primary"><Search className="h-4 w-4" />{t({ fr: "Recherche & sélection", en: "Search & selection" })}</p><h2 className="section-title mt-5">{t({ fr: "Construisez", en: "Build" })}<br /><em>{t({ fr: "votre recherche.", en: "your search." })}</em></h2></div>
              <p className="max-w-xl text-base leading-8 text-muted-foreground">{t({ fr: "Un parcours rapide, étape par étape. Chaque choix vous rapproche des biens qui correspondent à votre emplacement, votre budget et vos exigences.", en: "A quick, step-by-step journey. Each choice brings you closer to homes that match your location, budget and requirements." })}</p>
            </div>
            <div className="mt-14"><GuidedSearch /></div>
          </div>
        </section>

        <TeamSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}

function TeamSection() {
  const { t } = useI18n();
  return (
    <section id="equipe" className="scroll-mt-24 px-5 py-24 md:px-10 md:py-32">
      <div data-reveal className="reveal-section mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div><p className="eyebrow eyebrow-rule text-primary">{t({ fr: "Notre équipe", en: "Our team" })}</p><h2 className="section-title mt-5">{t({ fr: "Vos interlocuteurs", en: "Your local contacts" })}<br /><em>{t({ fr: "à La Marsa.", en: "in La Marsa." })}</em></h2></div>
          <p className="max-w-xl text-base leading-8 text-muted-foreground">{t({ fr: "Une équipe à taille humaine, joignable via l’agence, qui vous accompagne en français et en anglais avec discrétion, réactivité et un suivi professionnel.", en: "A close-knit team you can reach through the agency, guiding you in English and French with discretion, responsiveness and professional follow-up." })}</p>
        </div>
        <div className="stagger-grid mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <article key={member.id} className={`team-card group ${member.lead ? "is-lead" : ""}`}>
              <div className="team-photo">
                <img src={member.photo} alt={`${member.name} — ${t(member.role)}`} loading="lazy" className="h-full w-full object-cover" />
                {member.lead && <span className="property-badge absolute left-1/2 top-8 -translate-x-1/2 whitespace-nowrap !bg-primary !text-primary-foreground">{t(member.role)}</span>}
              </div>
              <div className="p-6">
                <p className="eyebrow text-primary">{t(member.role)}</p>
                <h3 className="mt-2 font-display text-4xl leading-none">{member.name}</h3>
                <p className="mt-2 text-sm italic text-muted-foreground">{t(member.focus)}</p>
                <p className="mt-4 border-t border-border pt-4 text-sm leading-6 text-muted-foreground">{t(member.bio)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const [project, setProject] = useState(0);
  const projects: L[] = [
    { fr: "Location", en: "Rental" },
    { fr: "Achat", en: "Purchase" },
    { fr: "Recherche & sélection", en: "Property search" },
    { fr: "Relocation", en: "Relocation" },
    { fr: "Gestion de bien", en: "Property management" },
  ];

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const projectLabel = t(projects[project] ?? { fr: "Location", en: "Rental" });
    const body = [
      `${t({ fr: "Nom", en: "Name" })} : ${data.get("name")}`,
      `${t({ fr: "Téléphone", en: "Phone" })} : ${data.get("phone")}`,
      `E-mail : ${data.get("email")}`,
      `${t({ fr: "Projet", en: "Project" })} : ${projectLabel}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");
    window.location.href = `mailto:${agency.email}?subject=${encodeURIComponent(`${projectLabel} — ${data.get("name")}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden px-5 py-24 md:px-10 md:py-32">
      <img src={piscine} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-contact-overlay" />
      <div data-reveal className="reveal-section relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="text-on-image">
          <p className="eyebrow">{t(closing.eyebrow)}</p>
          <h2 className="section-title mt-5">{t({ fr: "Parlons de", en: "Let’s talk about" })}<br /><em className="!text-on-image">{t({ fr: "votre installation.", en: "your move." })}</em></h2>
          <div className="mt-6 max-w-md space-y-4 leading-8 text-on-image-muted">
            {closing.paragraphs.map((paragraph) => <p key={paragraph.en}>{t(paragraph)}</p>)}
            <p className="font-display text-xl italic text-on-image">{t(closing.signoff)}</p>
          </div>
          <ul className="mt-10 space-y-4 text-sm">
            <li className="flex items-center gap-3"><MapPin className="h-4 w-4" />{agency.address} — {t(agency.location).replace("La Marsa – ", "")}</li>
            {agency.phones.map((phone) => <li key={phone.href}><PhoneContact phone={phone} className="phone-contact-light" /></li>)}
            <li><a href={`mailto:${agency.email}`} className="flex items-center gap-3 hover:underline"><Mail className="h-4 w-4" />{agency.email}</a></li>
            <li className="flex items-center gap-3"><Clock className="h-4 w-4" />{t(agency.hours)}</li>
          </ul>
        </div>
        <form onSubmit={submit} className="shadow-soft grid gap-6 bg-card p-7 md:grid-cols-2 md:p-10">
          <p className="font-display text-3xl md:col-span-2">{t({ fr: "Prendre rendez-vous", en: "Book an appointment" })}</p>
          <TextField label={t({ fr: "Nom", en: "Name" })} name="name" required autoComplete="name" />
          <TextField label={t({ fr: "Téléphone", en: "Phone" })} name="phone" type="tel" required autoComplete="tel" />
          <TextField className="md:col-span-2" label="E-mail" name="email" type="email" required autoComplete="email" />
          <SelectField variant="underline" className="md:col-span-2" label={t({ fr: "Votre projet", en: "Your project" })} value={String(project)} onValueChange={(value) => setProject(Number(value))} options={projects.map((item, index) => ({ value: String(index), label: t(item) }))} />
          <TextAreaField className="md:col-span-2" label="Message" name="message" rows={3} placeholder={t({ fr: "Quartier, budget, date d’arrivée, meublé ou non…", en: "Area, budget, arrival date, furnished or not…" })} />
          <Button type="submit" className="h-12 rounded-full md:col-span-2">{t({ fr: "Envoyer ma demande", en: "Send my request" })} <ArrowRight /></Button>
          <Button asChild variant="outline" className="h-12 rounded-full md:col-span-2"><a href={whatsappHref} target="_blank" rel="noreferrer"><SocialIcon id="whatsapp" /> {t({ fr: "Ou écrivez-nous sur WhatsApp", en: "Or message us on WhatsApp" })}</a></Button>
          {sent && <p className="text-center text-sm text-muted-foreground md:col-span-2" role="status">{t({ fr: "Votre messagerie s’est ouverte avec votre demande pré-remplie.", en: "Your email app opened with your request pre-filled." })}</p>}
        </form>
      </div>
    </section>
  );
}
