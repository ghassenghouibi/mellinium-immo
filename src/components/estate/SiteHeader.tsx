import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logoAsset from "@/assets/brand/mellinium-logo-cropped.png.asset.json";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "./SocialLinks";

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const textClass = overlay ? "text-on-image" : "text-foreground";

  return (
    <>
      <header className={`relative z-40 flex items-center justify-between px-5 py-5 md:px-10 md:py-7 ${textClass}`}>
        <Link to="/" aria-label="Accueil Mellinium Immobilière" className="block">
          <img src={logoAsset.url} alt="Mellinium Immobilière Housing" className="h-12 w-auto object-contain md:h-16" />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
          <Link to="/" className="text-[11px] font-semibold uppercase transition-colors hover:text-primary">L’agence</Link>
          <Link to="/biens" search={{ transaction: "vente" }} className="text-[11px] font-semibold uppercase transition-colors hover:text-primary">Vente</Link>
          <Link to="/biens" search={{ transaction: "location" }} className="text-[11px] font-semibold uppercase transition-colors hover:text-primary">Location</Link>
          <Link to="/" hash="confier" className="text-[11px] font-semibold uppercase transition-colors hover:text-primary">Confier</Link>
        </nav>
        <Button variant={overlay ? "glass" : "outline"} size="icon" aria-label="Ouvrir le menu" onClick={() => setOpen(true)}><Menu /></Button>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-menu p-6 text-menu-foreground md:p-12">
          <div className="flex items-center justify-between">
            <Link to="/" onClick={() => setOpen(false)}><img src={logoAsset.url} alt="Mellinium Immobilière Housing" className="h-14 w-auto" /></Link>
            <Button variant="glass" size="icon" aria-label="Fermer le menu" onClick={() => setOpen(false)}><X /></Button>
          </div>
          <nav className="mx-auto mt-16 max-w-5xl">
            <Link to="/" onClick={() => setOpen(false)} className="menu-link"><span>L’agence</span><span aria-hidden="true">↗</span></Link>
            <Link to="/biens" search={{ transaction: "vente" }} onClick={() => setOpen(false)} className="menu-link"><span>Vente</span><span aria-hidden="true">↗</span></Link>
            <Link to="/biens" search={{ transaction: "location" }} onClick={() => setOpen(false)} className="menu-link"><span>Location</span><span aria-hidden="true">↗</span></Link>
            <Link to="/" hash="confier" onClick={() => setOpen(false)} className="menu-link"><span>Confier mon bien</span><span aria-hidden="true">↗</span></Link>
          </nav>
          <div className="mx-auto mt-12 flex max-w-5xl items-center justify-between gap-5 border-t border-menu-muted/20 pt-8">
            <span className="text-xs uppercase text-menu-muted">Suivez Mellinium</span><SocialLinks compact />
          </div>
        </div>
      )}
    </>
  );
}