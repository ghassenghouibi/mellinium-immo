import { ArrowDown, Globe2, MapPin, Pause, Play, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { agency } from "@/lib/agency";
import { useI18n, type L } from "@/lib/i18n";
import { GuidedSearch } from "./GuidedSearch";

/**
 * Chapitres du film d’accueil (public/videos/hero-film.*), dans l’ordre du montage Remotion.
 * Chaque plan dure 5 s avec un fondu d’une seconde : un nouveau lieu toutes les 4 s.
 */
const chapters: { start: number; place: string; detail: L }[] = [
  { start: 0, place: "Sidi Bou Saïd", detail: { fr: "Le village bleu et blanc face à la mer", en: "The blue-and-white village above the sea" } },
  { start: 4, place: "Golfe de Tunis", detail: { fr: "Voiliers au large des banlieues nord", en: "Sailboats off the Northern suburbs" } },
  { start: 8, place: "La Marsa", detail: { fr: "Kobbet El Haoua, sur la plage", en: "Kobbet El Haoua, on the beach" } },
  { start: 12, place: "Sidi Bou Saïd", detail: { fr: "Le Café des Délices et la marina", en: "Café des Délices and the marina" } },
  { start: 16, place: "Carthage", detail: { fr: "Les thermes d’Antonin", en: "The Antonine Baths" } },
  { start: 20, place: "Sidi Bou Saïd", detail: { fr: "Ruelles pavées jusqu’à la mer", en: "Cobbled lanes down to the sea" } },
  { start: 24, place: "Sidi Bou Saïd", detail: { fr: "Terrasses sur la Méditerranée", en: "Terraces over the Mediterranean" } },
  { start: 28, place: "Carthage", detail: { fr: "Architecture tunisienne traditionnelle", en: "Traditional Tunisian architecture" } },
  { start: 32, place: "Tunis", detail: { fr: "Minaret au coucher du soleil", en: "A minaret at sunset" } },
  { start: 36, place: "Sidi Bou Saïd", detail: { fr: "Le village bleu et blanc face à la mer", en: "The blue-and-white village above the sea" } },
];

export function HeroFilm() {
  const { t } = useI18n();
  const video = useRef<HTMLVideoElement>(null);
  const section = useRef<HTMLElement>(null);
  const [chapter, setChapter] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const userPaused = useRef(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    // Mouvement réduit : on reste sur l’image d’ouverture, le visiteur peut lancer le film lui-même.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      userPaused.current = true;
      element.pause();
      setPlaying(false);
    }
    // Le film s’interrompt hors de l’écran pour économiser batterie et processeur.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry || userPaused.current) return;
      if (entry.isIntersecting) void element.play().catch(() => setPlaying(false));
      else element.pause();
    }, { threshold: 0.15 });
    if (section.current) observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  const onTimeUpdate = () => {
    const element = video.current;
    if (!element || !element.duration) return;
    const time = element.currentTime;
    let index = 0;
    chapters.forEach((item, i) => { if (time >= item.start) index = i; });
    setChapter(index);
    setProgress(time / element.duration);
  };

  const togglePlay = () => {
    const element = video.current;
    if (!element) return;
    if (element.paused) {
      userPaused.current = false;
      void element.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      userPaused.current = true;
      element.pause();
      setPlaying(false);
    }
  };

  const current = chapters[chapter] ?? chapters[0]!;

  const controls = (
    <div className="hero-film-controls">
      <span className="hero-film-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></span>
      <button type="button" onClick={togglePlay} className="hero-film-toggle" aria-label={playing ? t({ fr: "Mettre le film en pause", en: "Pause the film" }) : t({ fr: "Lire le film", en: "Play the film" })}>
        {playing ? <Pause /> : <Play />}
      </button>
    </div>
  );

  return (
    <section ref={section} className="hero-film" aria-label={t({ fr: "Présentation", en: "Introduction" })}>
      <video
        ref={video}
        className="hero-film-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/videos/hero-poster.jpg"
        onTimeUpdate={onTimeUpdate}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-hidden="true"
      >
        <source src="/videos/hero-film.mp4" type="video/mp4" />
      </video>
      <div className="hero-film-veil" aria-hidden="true" />

      <div className="hero-film-content">
        <div className="hero-film-copy rise-in">
          <p className="eyebrow eyebrow-rule text-gold">{t(agency.tagline)} · {t(agency.location)}</p>
          <h1 className="hero-film-title">{t({ fr: "Votre chez-vous", en: "Your home" })} <em>{t({ fr: "en Tunisie.", en: "in Tunisia." })}</em></h1>
          <p className="hero-film-lead">{t({ fr: "Des solutions de logement professionnelles pour une clientèle diplomatique et internationale.", en: "Professional housing solutions for diplomatic & international clients." })}</p>
          <p className="hero-film-text">{t({ fr: "Location, vente et relocation à La Marsa, Gammarth, Sidi Bou Saïd, Carthage et aux Berges du Lac : nous vous accompagnons de la première recherche jusqu’à la remise des clés.", en: "Rentals, sales and relocation in La Marsa, Gammarth, Sidi Bou Saïd, Carthage and Les Berges du Lac: we guide you from the first search to the handover of keys." })}</p>
          <div className="mt-7"><GuidedSearch hero /></div>
          <div className="hero-film-badges">
            <span><ShieldCheck />{t({ fr: "Service discret et confidentiel", en: "Discreet, confidential service" })}</span>
            <span><Globe2 />{t({ fr: "Français · English", en: "English · Français" })}</span>
          </div>
        </div>
      </div>

      <div className="hero-film-now">
        <div className="hero-film-caption" aria-hidden="true">
          <MapPin />
          <span key={chapter} className="hero-film-place">
            <span className="hero-film-now-label">{t({ fr: "À l’écran", en: "Now showing" })}</span>
            <strong>{current.place}</strong>
            <small>{t(current.detail)}</small>
          </span>
        </div>
        {controls}
      </div>

      <div className="hero-film-bar">
        <a href="#agence" className="hero-film-scroll" aria-label={t({ fr: "Découvrir l’agence", en: "Discover the agency" })}><ArrowDown /></a>
        <div className="hero-film-caption" aria-live="polite">
          <MapPin />
          <span key={chapter} className="hero-film-place">
            <strong>{current.place}</strong>
            <small>{t(current.detail)}</small>
          </span>
        </div>
        {controls}
      </div>
    </section>
  );
}
