import { ArrowRight, ChevronDown, Compass, Menu, Quote, Star, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import facade from "@/assets/tour/01-facade.jpg";
import entree from "@/assets/tour/02-entree.jpg";
import salon from "@/assets/tour/03-salon.jpg";
import cuisine from "@/assets/tour/04-cuisine.jpg";
import suite from "@/assets/tour/05-suite.jpg";
import bain from "@/assets/tour/06-bain.jpg";
import piscine from "@/assets/tour/07-piscine.jpg";

const rooms = [
  { img: facade, focus: [50, 58], motion: "door", kicker: "Villa Soléa · Saint-Tropez", title: "Bienvenue", copy: "Poussez la porte. Faites défiler pour visiter toute la maison.", stat: "430 m² · 2 400 m² de terrain" },
  { img: entree, focus: [50, 48], motion: "iris", kicker: "01 — L’entrée", title: "Un hall en pierre de Bourgogne", copy: "Sols anciens, arche sculptée et première échappée vers la mer.", stat: "Hauteur sous plafond 4,2 m" },
  { img: salon, focus: [50, 45], motion: "sweep", kicker: "02 — Le séjour", title: "Le salon face à l’horizon", copy: "Baies coulissantes toute largeur, poutres de chêne et terrasse suspendue.", stat: "85 m² traversants" },
  { img: cuisine, focus: [52, 42], motion: "light", kicker: "03 — La cuisine", title: "Marbre, laiton et oliviers", copy: "Îlot Calacatta, piano de cuisson et salle à manger ouverte sur le jardin.", stat: "Cuisine d’été attenante" },
  { img: suite, focus: [50, 42], motion: "door", kicker: "04 — La suite parentale", title: "Se réveiller face à la mer", copy: "Enduits à la chaux, lin naturel et vue dégagée sur la baie.", stat: "4 suites au total" },
  { img: bain, focus: [50, 40], motion: "iris", kicker: "05 — Salle de bains", title: "Un spa en travertin", copy: "Baignoire monolithe devant la baie et douche à l’italienne.", stat: "Travertin massif" },
  { img: piscine, focus: [70, 50], motion: "sweep", kicker: "06 — La piscine", title: "L’horizon à vos pieds", copy: "Bassin à débordement chauffé, terrasse et coucher de soleil sur la baie.", stat: "Prix sur demande" },
] as const;

const testimonials = [
  { quote: "Une écoute rare et un accompagnement d’une grande justesse, de la première visite jusqu’à la remise des clés.", name: "Éléonore & Marc", place: "Acquéreurs · Ramatuelle" },
  { quote: "Maison Azur a su raconter notre propriété avec sensibilité et trouver les bons acquéreurs, en toute discrétion.", name: "Sophie D.", place: "Propriétaire · Grimaud" },
  { quote: "Nous avons découvert la maison à distance puis organisé une visite privée. Tout était simple, précis et élégant.", name: "Alexander R.", place: "Acquéreur · Londres" },
];

const menuSections = [["agence", "L’agence"], ["avis", "Les avis"], ["collection", "La collection"], ["contact", "Organiser une visite"]] as const;

const N = rooms.length;
const ease = (t: number) => t * t * (3 - 2 * t);

export function EstateExperience() {
  const tour = useRef<HTMLElement>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const bar = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let target = 0, current = 0, mx = 0, my = 0, px = 0, py = 0, raf = 0, last = -1;
    const read = () => {
      const el = tour.current;
      if (!el) return;
      const max = Math.max(1, el.offsetHeight - window.innerHeight);
      target = Math.min(N - 1, Math.max(0, (-el.getBoundingClientRect().top / max) * (N - 1)));
    };
    const onPointer = (event: PointerEvent) => {
      mx = (event.clientX / window.innerWidth - 0.5) * 2;
      my = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    const frame = () => {
      current += (target - current) * (reduce ? 1 : 0.075);
      px += (mx - px) * 0.045;
      py += (my - py) * 0.045;
      layers.current.forEach((el, i) => {
        if (!el) return;
        const roomAtIndex = rooms[i];
        if (!roomAtIndex) return;
        const d = current - i;
        const entering = ease(Math.min(1, Math.max(0, 1 + d)));
        const leaving = ease(Math.min(1, Math.max(0, d)));
        let scale = 1, opacity = 0, blur = 0, x = -px * 14, y = -py * 10, clip = "inset(0 0 0 0)";
        if (d <= -1 || d >= 1) opacity = 0;
        else if (d <= 0) {
          opacity = Math.min(1, (1 + d) * 1.8);
          scale = 0.76 + 0.24 * entering;
          blur = (1 - entering) * 8;
          if (roomAtIndex.motion === "iris") clip = `circle(${entering * 72}% at ${roomAtIndex.focus[0]}% ${roomAtIndex.focus[1]}%)`;
          if (roomAtIndex.motion === "sweep") { clip = `inset(0 ${(1 - entering) * 100}% 0 0)`; x += (1 - entering) * 90; }
          if (roomAtIndex.motion === "light") scale = 1.08 - entering * 0.08;
        } else {
          scale = 1 + leaving * 2.65;
          opacity = 1 - Math.max(0, (d - 0.48) / 0.52);
          blur = leaving * 5;
          if (roomAtIndex.motion === "sweep") x -= leaving * 70;
        }
        el.style.opacity = String(opacity);
        el.style.visibility = opacity < 0.01 ? "hidden" : "visible";
        el.style.zIndex = String(d > 0 ? 20 - i : 10 - i + N);
        el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        el.style.filter = `blur(${blur.toFixed(1)}px) brightness(${roomAtIndex.motion === "light" ? 1 + (1 - entering) * 0.45 : 1})`;
        el.style.clipPath = clip;
      });
      if (bar.current) bar.current.style.transform = `scaleX(${current / (N - 1)})`;
      const idx = Math.round(current);
      if (idx !== last) { last = idx; setActive(idx); }
      raf = requestAnimationFrame(frame);
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    window.addEventListener("pointermove", onPointer, { passive: true });
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  const goToRoom = (i: number) => {
    const el = tour.current;
    if (!el) return;
    const max = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.offsetTop + (i / (N - 1)) * max, behavior: "smooth" });
    setMenuOpen(false);
  };

  const goToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const room = rooms[active] ?? rooms[0];

  return (
    <main className="bg-panel text-panel-foreground">
      <section ref={tour} id="visite" className="relative h-[770vh] bg-background text-foreground">
        <div className="sticky top-0 h-screen overflow-hidden bg-background">
          {rooms.map((item, i) => (
            <div
              key={item.title}
              ref={(el) => { layers.current[i] = el; }}
              className="absolute -inset-8 will-change-transform"
              style={{ transformOrigin: `${item.focus[0]}% ${item.focus[1]}%`, opacity: i === 0 ? 1 : 0 }}
            >
              <img src={item.img} alt={item.title} width={1920} height={1088} loading={i < 2 ? "eager" : "lazy"} className="h-full w-full object-cover" style={{ objectPosition: `${item.focus[0]}% ${item.focus[1]}%` }} />
            </div>
          ))}
          <div className="pointer-events-none absolute inset-0 z-30 bg-vignette" />

          <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-5 text-on-image md:px-10 md:py-7">
            <Button variant="ghost" onClick={() => goToRoom(0)} className="h-auto p-0 font-display text-xl text-on-image hover:bg-transparent hover:text-on-image">Maison Azur</Button>
            <span className="hidden text-xs uppercase tracking-[0.16em] md:block">Visite · {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}</span>
            <Button variant="glass" size="icon" aria-label="Ouvrir le menu" onClick={() => setMenuOpen(true)}><Menu /></Button>
          </header>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 px-5 pb-8 md:px-10 md:pb-12" aria-live="polite">
            <div key={active} className="chapter-enter max-w-4xl text-on-image">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-on-image-muted">{room.kicker}</p>
              <h1 className="font-display text-[clamp(2.6rem,6.5vw,7rem)] leading-[0.9]">{room.title}</h1>
              <p className="mt-5 max-w-xl text-sm leading-6 text-on-image-muted md:text-base">{room.copy}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.18em]">{room.stat}</p>
            </div>
            <div className="mt-8 h-px w-full bg-on-image/25"><div ref={bar} className="h-px origin-left bg-on-image" style={{ transform: "scaleX(0)" }} /></div>
            <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-on-image-muted">
              <ChevronDown className="scroll-cue h-4 w-4" /> {active === N - 1 ? "Découvrez Maison Azur" : "Continuez la visite"}
            </div>
          </div>
        </div>
      </section>

      <section id="agence" className="relative overflow-hidden px-5 py-24 md:px-10 md:py-36">
        <div className="editorial-grid mx-auto max-w-7xl">
          <div>
            <p className="eyebrow">L’agence</p>
            <h2 className="mt-5 max-w-4xl font-display text-5xl leading-[0.95] md:text-8xl">Des lieux rares,<br />une histoire à vivre.</h2>
          </div>
          <div className="max-w-xl md:ml-auto md:pt-24">
            <p className="text-lg leading-8 text-muted-foreground">Maison Azur sélectionne des propriétés singulières sur le littoral méditerranéen et accompagne chaque projet avec discrétion, du premier regard à la signature.</p>
            <div className="mt-12 grid grid-cols-3 gap-4 border-y border-border py-8">
              <div><strong className="font-display text-3xl md:text-5xl">12</strong><span className="mt-2 block text-xs uppercase text-muted-foreground">années</span></div>
              <div><strong className="font-display text-3xl md:text-5xl">68</strong><span className="mt-2 block text-xs uppercase text-muted-foreground">ventes</span></div>
              <div><strong className="font-display text-3xl md:text-5xl">4.9</strong><span className="mt-2 block text-xs uppercase text-muted-foreground">sur 5</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="avis" className="bg-background px-5 py-24 text-foreground md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><p className="eyebrow text-on-image-muted">Ils nous ont fait confiance</p><h2 className="mt-4 font-display text-5xl md:text-7xl">Paroles de clients</h2></div>
            <div className="flex gap-1 text-primary" aria-label="Note de cinq étoiles">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
          </div>
          <div className="mt-16 grid border-t border-on-image/20 md:grid-cols-3">
            {testimonials.map((item, i) => (
              <article key={item.name} className="testimonial-item relative border-b border-on-image/20 py-10 md:px-8 md:first:pl-0 md:last:pr-0">
                <Quote className="h-7 w-7 text-primary" />
                <blockquote className="mt-8 font-display text-2xl leading-snug">« {item.quote} »</blockquote>
                <p className="mt-10 text-sm font-semibold">{item.name}</p>
                <p className="mt-1 text-xs uppercase text-on-image-muted">{item.place}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="collection" className="px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">La collection</p>
          <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end"><h2 className="font-display text-5xl md:text-7xl">D’autres horizons</h2><p className="max-w-sm text-sm leading-6 text-muted-foreground">Une sélection confidentielle de maisons entre mer, pinède et villages de caractère.</p></div>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            <article className="property-card group"><div className="overflow-hidden"><img src={salon} alt="Villa contemporaine face à la mer" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div><div className="mt-5 flex items-start justify-between"><div><h3 className="font-display text-3xl">Villa Horizon</h3><p className="mt-2 text-sm text-muted-foreground">La Croix-Valmer · 5 chambres</p></div><ArrowRight className="mt-2 h-5 w-5" /></div></article>
            <article className="property-card group md:mt-24"><div className="overflow-hidden"><img src={suite} alt="Maison méditerranéenne lumineuse" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div><div className="mt-5 flex items-start justify-between"><div><h3 className="font-display text-3xl">Maison Alba</h3><p className="mt-2 text-sm text-muted-foreground">Saint-Tropez · 4 chambres</p></div><ArrowRight className="mt-2 h-5 w-5" /></div></article>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-scene relative flex min-h-[78vh] items-end overflow-hidden px-5 py-14 text-on-image md:px-10 md:py-20">
        <img src={piscine} alt="Piscine de la Villa Soléa au coucher du soleil" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-contact-overlay" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div><p className="eyebrow text-on-image-muted">Votre prochain chapitre</p><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[0.95] md:text-8xl">Organisons une<br />visite privée.</h2></div>
          <Button asChild size="lg" className="h-12 bg-on-image px-6 text-menu hover:bg-on-image/90"><a href="mailto:bonjour@maisonazur.fr">Nous contacter <ArrowRight /></a></Button>
        </div>
      </section>

      {menuOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-menu p-6 text-menu-foreground md:p-12">
          <div className="flex items-center justify-between"><p className="font-display text-2xl">Maison Azur</p><Button variant="glass" size="icon" aria-label="Fermer" onClick={() => setMenuOpen(false)}><X /></Button></div>
          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <div><p className="mb-5 text-xs uppercase text-menu-muted">La visite</p><ol>{rooms.map((item, i) => <li key={item.title}><Button variant="ghost" onClick={() => goToRoom(i)} className="h-auto w-full justify-start gap-4 border-b border-menu-muted/30 py-3 text-left text-menu-foreground hover:bg-transparent hover:text-primary"><span className="text-xs text-menu-muted">{String(i + 1).padStart(2, "0")}</span><span className="font-display text-2xl md:text-3xl">{item.kicker.split("— ")[1] ?? item.title}</span></Button></li>)}</ol></div>
            <nav><p className="mb-5 text-xs uppercase text-menu-muted">Découvrir</p>{menuSections.map(([id, label]) => <Button key={id} variant="ghost" onClick={() => goToSection(id)} className="h-auto w-full justify-between border-b border-menu-muted/30 py-4 text-menu-foreground hover:bg-transparent hover:text-primary"><span className="font-display text-3xl md:text-5xl">{label}</span><Compass /></Button>)}</nav>
          </div>
        </div>
      )}
    </main>
  );
}