import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, type PointerEvent } from "react";
import { useI18n } from "@/lib/i18n";

type PhotoLightboxProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  photos: string[];
  index: number;
  onIndexChange: (index: number) => void;
  title: string;
  subtitle?: string;
};

/** Visionneuse plein écran : flèches, clavier (← →, Échap), balayage tactile et vignettes. */
export function PhotoLightbox({ open, onOpenChange, photos, index, onIndexChange, title, subtitle }: PhotoLightboxProps) {
  const { t } = useI18n();
  const count = photos.length;
  const strip = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<number | null>(null);

  const go = (step: number) => onIndexChange((index + step + count) % count);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Garde la vignette active visible dans la bande.
  useEffect(() => {
    strip.current?.querySelector<HTMLElement>(`[data-index="${index}"]`)?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index, open]);

  const onPointerDown = (event: PointerEvent) => { swipeStart.current = event.clientX; };
  const onPointerUp = (event: PointerEvent) => {
    if (swipeStart.current === null) return;
    const delta = event.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="lightbox-overlay" />
        <Dialog.Content className="lightbox" aria-describedby={undefined}>
          <header className="lightbox-header">
            <div className="min-w-0">
              <Dialog.Title className="lightbox-title">{title}</Dialog.Title>
              {subtitle && <p className="lightbox-subtitle">{subtitle}</p>}
            </div>
            <span className="lightbox-counter" aria-live="polite">{index + 1} / {count}</span>
            <Dialog.Close className="lightbox-button" aria-label={t({ fr: "Fermer", en: "Close" })}><X /></Dialog.Close>
          </header>

          <div className="lightbox-stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => { swipeStart.current = null; }}>
            <img key={photos[index]} src={photos[index]} alt={`${title} — photo ${index + 1} / ${count}`} className="lightbox-image" draggable={false} />
            {count > 1 && (
              <>
                <button type="button" className="lightbox-button lightbox-nav lightbox-prev" onClick={() => go(-1)} aria-label={t({ fr: "Photo précédente", en: "Previous photo" })}><ChevronLeft /></button>
                <button type="button" className="lightbox-button lightbox-nav lightbox-next" onClick={() => go(1)} aria-label={t({ fr: "Photo suivante", en: "Next photo" })}><ChevronRight /></button>
              </>
            )}
          </div>

          <div ref={strip} className="lightbox-strip" role="group" aria-label={t({ fr: "Toutes les photos", en: "All photos" })}>
            {photos.map((photo, photoIndex) => (
              <button
                key={`${photo}-${photoIndex}`}
                type="button"
                data-index={photoIndex}
                onClick={() => onIndexChange(photoIndex)}
                aria-label={`${t({ fr: "Afficher la photo", en: "Show photo" })} ${photoIndex + 1}`}
                aria-current={photoIndex === index}
                className={`lightbox-thumb ${photoIndex === index ? "is-active" : ""}`}
              >
                <img src={photo} alt="" draggable={false} />
              </button>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
