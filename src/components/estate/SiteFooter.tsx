import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/brand/mellinium-logo-housing.png";
import { agency } from "@/lib/agency";
import { districts } from "@/lib/properties";
import { SocialLinks } from "./SocialLinks";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-panel px-5 pb-8 pt-16 md:px-10 md:pt-20">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_.8fr_.8fr_1.1fr]">
        <div>
          <img src={logo} alt="Mellinium Immobilière Housing" className="h-20 w-auto" />
          <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">Agence immobilière de prestige à La Marsa : achat, vente, location et estimation de biens d’exception, entre mer et jardins.</p>
          <div className="mt-6"><SocialLinks compact /></div>
        </div>
        <div>
          <p className="eyebrow text-primary">Nos biens</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/biens" search={{ transaction: "vente" }} className="hover:text-primary">Acheter à La Marsa</Link></li>
            <li><Link to="/biens" search={{ transaction: "location" }} className="hover:text-primary">Louer à La Marsa</Link></li>
            <li><Link to="/" hash="confier" className="hover:text-primary">Vendre mon bien</Link></li>
            <li><Link to="/" hash="confier" className="hover:text-primary">Estimation offerte</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-primary">Quartiers</p>
          <ul className="mt-5 space-y-3 text-sm">
            {districts.map((district) => <li key={district}><Link to="/biens" search={{ transaction: "vente", district }} className="hover:text-primary">{district}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-primary">L’agence</p>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{agency.address}</li>
            <li><a href={agency.phoneHref} className="flex gap-3 hover:text-primary"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{agency.phone}</a></li>
            <li><a href={`mailto:${agency.email}`} className="flex gap-3 break-all hover:text-primary"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{agency.email}</a></li>
            <li className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{agency.hours}</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl flex-col justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
        <p>© 2026 {agency.name}. Tous droits réservés.</p>
        <p>Mentions légales · Politique de confidentialité</p>
      </div>
    </footer>
  );
}
