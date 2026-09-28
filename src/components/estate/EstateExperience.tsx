import { Canvas } from "@react-three/fiber";
import { ChevronDown, Compass, Menu, Pause, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { VillaScene } from "./VillaScene";

const chapters = [
  { kicker: "Propriété d’exception", title: "Villa Soléa", copy: "Une ligne d’horizon privée, suspendue entre oliviers et Méditerranée." },
  { kicker: "01 — L’arrivée", title: "Une architecture ouverte sur la lumière", copy: "430 m² de volumes sculptés dans la pierre claire, au cœur d’un domaine paysager." },
  { kicker: "02 — Le séjour", title: "Dedans, dehors, sans frontière", copy: "Les baies toute hauteur prolongent le salon vers les terrasses et la mer." },
  { kicker: "03 — La suite", title: "Le calme comme seul luxe", copy: "Une aile intime tournée vers le jardin, pensée comme un refuge silencieux." },
  { kicker: "04 — La piscine", title: "L’horizon à vos pieds", copy: "Un bassin miroir, 2 400 m² de terrain et des soirées baignées de soleil." },
] as const;
const fallbackChapter = chapters[0];

const details = [
  { label: "Architecture", value: "Pierre locale, enduits minéraux et menuiseries en chêne sur mesure." },
  { label: "Art de vivre", value: "Quatre suites, salon traversant, cuisine d’été et bassin miroir chauffé." },
  { label: "Situation", value: "À quelques minutes du village, dans un domaine confidentiel face à la mer." },
] as const;
const fallbackDetail = details[0];

export function EstateExperience() {
  const progress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const [chapter, setChapter] = useState(0);
  const [paused, setPaused] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [detail, setDetail] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (paused) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const next = max > 0 ? window.scrollY / max : 0;
      progress.current = Math.min(1, Math.max(0, next));
      setChapter(Math.min(chapters.length - 1, Math.round(progress.current * (chapters.length - 1))));
    };
    const onPointer = (event: PointerEvent) => {
      pointer.current = { x: (event.clientX / window.innerWidth - 0.5) * 2, y: (event.clientY / window.innerHeight - 0.5) * -2 };
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [paused]);

  const current = chapters[chapter] ?? fallbackChapter;
  const selectedDetail = details[detail ?? 0] ?? fallbackDetail;

  return (
    <main className="relative h-[500vh] bg-background text-foreground">
      <div className="fixed inset-0">
        <Canvas shadows dpr={[1, 1.5]} camera={{ position: [20, 9, 24], fov: 48 }} gl={{ antialias: true }} onCreated={() => setSceneReady(true)}>
          <VillaScene progress={progress} pointer={pointer} />
        </Canvas>
        <div className="absolute inset-0 bg-vignette pointer-events-none" />
      </div>

      {!sceneReady && <div className="fixed inset-0 z-40 grid place-items-center bg-background text-on-image"><div className="text-center"><p className="font-display text-3xl">Maison Azur</p><p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-on-image-muted">Ouverture de la propriété</p></div></div>}

      <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 text-on-image md:px-10 md:py-7">
        <a href="#top" className="font-display text-xl tracking-normal">Maison Azur</a>
        <div className="hidden items-center gap-8 text-xs uppercase tracking-[0.16em] md:flex">
          <span>Saint-Tropez, France</span><span>43°16′N · 6°38′E</span>
        </div>
        <Button variant="glass" size="icon" aria-label="Ouvrir le menu" onClick={() => setMenuOpen(true)}><Menu /></Button>
      </header>

      <section id="top" className="fixed inset-0 z-10 pointer-events-none" aria-live="polite">
        <div className="absolute inset-x-0 bottom-0 px-5 pb-8 md:px-10 md:pb-12">
          <div key={chapter} className="chapter-enter max-w-3xl text-on-image">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-on-image-muted">{current.kicker}</p>
            <h1 className="font-display text-[clamp(2.9rem,7vw,7.8rem)] leading-[0.88] tracking-normal">{current.title}</h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-on-image-muted md:text-base">{current.copy}</p>
          </div>
          <div className="mt-7 flex items-end justify-between gap-5 border-t border-overlay pt-5 text-on-image">
            <div className="flex items-center gap-4 text-xs uppercase tracking-[0.14em]"><span className="font-semibold">{String(chapter + 1).padStart(2, "0")}</span><div className="h-px w-20 bg-overlay md:w-40"><div className="h-px bg-on-image transition-[width] duration-500" style={{ width: `${((chapter + 1) / chapters.length) * 100}%` }} /></div><span>{String(chapters.length).padStart(2, "0")}</span></div>
            <div className="flex items-center gap-2 pointer-events-auto">
              <Button variant="glass" size="icon" aria-label={paused ? "Reprendre la visite" : "Mettre la visite en pause"} onClick={() => setPaused((value) => !value)}>{paused ? <Play /> : <Pause />}</Button>
              <Button variant="glass" size="icon" aria-label="Découvrir un détail" onClick={() => setDetail(Math.min(detail === null ? chapter % 3 : detail + 1, 2))}><Compass /></Button>
            </div>
          </div>
        </div>
        {chapter === 0 && <div className="absolute bottom-36 right-5 hidden items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-on-image-muted md:flex"><span>Défiler pour visiter</span><ChevronDown className="scroll-cue size-4" /></div>}
        {chapter > 0 && chapter < 4 && <button type="button" aria-label="Voir le détail de cet espace" onClick={() => setDetail(chapter % 3)} className="hotspot pointer-events-auto absolute right-[18%] top-[43%]"><span /> </button>}
      </section>

      {detail !== null && <aside className="fixed bottom-28 right-5 z-40 w-[calc(100%-2.5rem)] max-w-sm border border-overlay bg-panel p-5 text-panel-foreground shadow-editorial md:right-10 md:bottom-32"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Détail {String(detail + 1).padStart(2, "0")}</p><h2 className="mt-2 font-display text-3xl tracking-normal">{selectedDetail.label}</h2></div><Button variant="ghost" size="icon" aria-label="Fermer" onClick={() => setDetail(null)}><X /></Button></div><p className="mt-4 text-sm leading-6 text-muted-foreground">{selectedDetail.value}</p></aside>}

      {menuOpen && <div className="fixed inset-0 z-50 flex flex-col bg-menu px-6 py-6 text-menu-foreground md:px-12"><div className="flex items-center justify-between"><span className="font-display text-xl">Maison Azur</span><Button variant="glass" size="icon" aria-label="Fermer le menu" onClick={() => setMenuOpen(false)}><X /></Button></div><nav className="my-auto flex flex-col items-start gap-3 font-display text-[clamp(2.5rem,8vw,6.5rem)] leading-none"><button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setMenuOpen(false); }}>La propriété</button><button onClick={() => { window.scrollTo({ top: document.body.scrollHeight * 0.52, behavior: "smooth" }); setMenuOpen(false); }}>Les espaces</button><a href="mailto:visite@maisonazur.fr">Organiser une visite</a></nav><p className="max-w-xs text-xs leading-5 text-menu-muted">Une propriété présentée en exclusivité sur la presqu’île de Saint-Tropez.</p></div>}

      <div aria-hidden className="absolute inset-x-0 top-0 h-px" />
    </main>
  );
}
