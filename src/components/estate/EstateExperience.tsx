import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import facade from "@/assets/tour/01-facade.jpg";
import entree from "@/assets/tour/02-entree.jpg";
import salon from "@/assets/tour/03-salon.jpg";
import cuisine from "@/assets/tour/04-cuisine.jpg";
import suite from "@/assets/tour/05-suite.jpg";
import bain from "@/assets/tour/06-bain.jpg";
import piscine from "@/assets/tour/07-piscine.jpg";

// focus = the doorway / window the camera walks through (in % of the image)
const rooms = [
  { img: facade, focus: [50, 58], kicker: "Villa Soléa · Saint-Tropez", title: "Bienvenue", copy: "Poussez la porte. Faites défiler pour visiter toute la maison.", stat: "430 m² · 2 400 m² de terrain" },
  { img: entree, focus: [50, 48], kicker: "01 — L’entrée", title: "Un hall en pierre de Bourgogne", copy: "Sols anciens, arche sculptée et première échappée vers la mer.", stat: "Hauteur sous plafond 4,2 m" },
  { img: salon, focus: [50, 45], kicker: "02 — Le séjour", title: "Le salon face à l’horizon", copy: "Baies coulissantes toute largeur, poutres de chêne et terrasse suspendue.", stat: "85 m² traversants" },
  { img: cuisine, focus: [52, 42], kicker: "03 — La cuisine", title: "Marbre, laiton et oliviers", copy: "Îlot Calacatta, piano de cuisson et salle à manger ouverte sur le jardin.", stat: "Cuisine d’été attenante" },
  { img: suite, focus: [50, 42], kicker: "04 — La suite parentale", title: "Se réveiller face à la mer", copy: "Enduits à la chaux, lin naturel et vue dégagée sur la baie.", stat: "4 suites au total" },
  { img: bain, focus: [50, 40], kicker: "05 — Salle de bains", title: "Un spa en travertin", copy: "Baignoire monolithe devant la baie et douche à l’italienne.", stat: "Travertin massif" },
  { img: piscine, focus: [70, 50], kicker: "06 — La piscine", title: "L’horizon à vos pieds", copy: "Bassin à débordement chauffé, terrasse et coucher de soleil sur la baie.", stat: "Prix sur demande" },
] as const;

const N = rooms.length;
const ease = (t: number) => t * t * (3 - 2 * t);

export function EstateExperience() {
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const bar = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let target = 0, current = 0, mx = 0, my = 0, px = 0, py = 0, raf = 0, last = -1;
    const read = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = max > 0 ? (window.scrollY / max) * (N - 1) : 0;
    };
    const onPointer = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const frame = () => {
      current += (target - current) * (reduce ? 1 : 0.09);
      px += (mx - px) * 0.05; py += (my - py) * 0.05;
      layers.current.forEach((el, i) => {
        if (!el) return;
        const d = current - i; // <0 upcoming, 0 in room, >0 walked through
        let scale = 1, opacity = 0, blur = 0;
        if (d <= -1 || d >= 1) { opacity = 0; }
        else if (d <= 0) { // arriving: approach from inside the previous doorway
          const t = ease(1 + d);
          scale = 0.72 + 0.28 * t; opacity = Math.min(1, (1 + d) * 1.6); blur = (1 - t) * 6;
        } else { // walking forward through the focal door
          const t = ease(d);
          scale = 1 + t * 2.4; opacity = 1 - Math.max(0, (d - 0.45) / 0.55); blur = t * 4;
        }
        el.style.opacity = String(opacity);
        el.style.visibility = opacity < 0.01 ? "hidden" : "visible";
        el.style.zIndex = String(d > 0 ? 20 - i : 10 - i + N);
        el.style.transform = `translate3d(${-px * 14}px, ${-py * 10}px, 0) scale(${scale})`;
        el.style.filter = blur > 0.1 ? `blur(${blur.toFixed(1)}px)` : "none";
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

  const goTo = (i: number) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: (i / (N - 1)) * max, behavior: "smooth" });
    setMenuOpen(false);
  };

  const room = rooms[active] ?? rooms[0];

  return (
    <main className="relative bg-background text-foreground" style={{ height: `${N * 110}vh` }}>
      <div className="fixed inset-0 overflow-hidden bg-background">
        {rooms.map((r, i) => (
          <div
            key={r.title}
            ref={(el) => { layers.current[i] = el; }}
            className="absolute -inset-6 will-change-transform"
            style={{ transformOrigin: `${r.focus[0]}% ${r.focus[1]}%`, opacity: i === 0 ? 1 : 0 }}
          >
            <img src={r.img} alt={r.title} width={1920} height={1088} loading={i < 2 ? "eager" : "lazy"} className="h-full w-full object-cover" style={{ objectPosition: `${r.focus[0]}% ${r.focus[1]}%` }} />
          </div>
        ))}
        <div className="absolute inset-0 z-30 bg-vignette pointer-events-none" />
      </div>

      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-5 text-on-image md:px-10 md:py-7">
        <button onClick={() => goTo(0)} className="font-display text-xl">Maison Azur</button>
        <div className="hidden items-center gap-8 text-xs uppercase tracking-[0.16em] md:flex">
          <span>Visite · {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}</span>
        </div>
        <Button variant="glass" size="icon" aria-label="Plan de la maison" onClick={() => setMenuOpen(true)}><Menu /></Button>
      </header>

      <section className="fixed inset-x-0 bottom-0 z-40 px-5 pb-8 md:px-10 md:pb-12 pointer-events-none" aria-live="polite">
        <div key={active} className="chapter-enter max-w-3xl text-on-image">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-on-image-muted">{room.kicker}</p>
          <h1 className="font-display text-[clamp(2.6rem,6.5vw,7rem)] leading-[0.9]">{room.title}</h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-on-image-muted md:text-base">{room.copy}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.18em]">{room.stat}</p>
        </div>
        <div className="mt-8 h-px w-full bg-on-image/25">
          <div ref={bar} className="h-px origin-left bg-on-image" style={{ transform: "scaleX(0)" }} />
        </div>
        {active === 0 && (
          <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-on-image-muted">
            <ChevronDown className="h-4 w-4 animate-bounce" /> Défilez pour entrer
          </div>
        )}
      </section>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-menu text-menu-foreground p-6 md:p-12">
          <div className="flex items-center justify-between">
            <p className="font-display text-2xl">Plan de visite</p>
            <Button variant="glass" size="icon" aria-label="Fermer" onClick={() => setMenuOpen(false)}><X /></Button>
          </div>
          <ol className="mt-10 space-y-2">
            {rooms.map((r, i) => (
              <li key={r.title}>
                <button onClick={() => goTo(i)} className="flex w-full items-baseline gap-4 border-b border-menu-muted/30 py-3 text-left">
                  <span className="text-xs text-menu-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-2xl md:text-4xl">{r.kicker.split("— ")[1] ?? r.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}
    </main>
  );
}
