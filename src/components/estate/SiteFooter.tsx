import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin } from "lucide-react";
import logo from "@/assets/brand/mellinium-logo-housing.png";
import { agency } from "@/lib/agency";
import { approach } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { districts } from "@/lib/properties";
import { PhoneContact, SocialLinks, SocialRail, WhatsAppFloat } from "./SocialLinks";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border bg-panel px-5 pb-8 pt-16 md:px-10 md:pt-20">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_.8fr_.8fr_1.1fr]">
        <div>
          <img src={logo} alt="Mellinium Immobilière" className="h-20 w-auto" />
          <p className="eyebrow mt-6 text-primary">{t(agency.tagline)}</p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-muted-foreground">{t({ fr: "Des solutions de logement professionnelles pour une clientèle diplomatique et internationale, à La Marsa et dans les banlieues nord du Grand Tunis.", en: "Professional housing solutions for diplomatic and international clients in La Marsa and the Northern suburbs of Greater Tunis." })}</p>
          <p className="mt-4 text-xs uppercase tracking-[.16em] text-muted-foreground">{approach.map(t).join(" · ")}</p>
          <div className="mt-6"><SocialLinks compact /></div>
        </div>
        <div>
          <p className="eyebrow text-primary">{t({ fr: "Services", en: "Services" })}</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/biens" search={{ transaction: "location" }} className="hover:text-primary">{t({ fr: "Location résidentielle", en: "Residential rental" })}</Link></li>
            <li><Link to="/biens" search={{ transaction: "vente" }} className="hover:text-primary">{t({ fr: "Vente de biens", en: "Property sales" })}</Link></li>
            <li><Link to="/" hash="diplomatie" className="hover:text-primary">{t({ fr: "Clients diplomatiques", en: "Diplomatic clients" })}</Link></li>
            <li><Link to="/" hash="services" className="hover:text-primary">{t({ fr: "Relocation & gestion", en: "Relocation & management" })}</Link></li>
            <li><Link to="/" hash="equipe" className="hover:text-primary">{t({ fr: "Notre équipe", en: "Our team" })}</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-primary">{t({ fr: "Quartiers", en: "Areas" })}</p>
          <ul className="mt-5 space-y-3 text-sm">
            {districts.map((district) => <li key={district}><Link to="/biens" search={{ transaction: "location", district }} className="hover:text-primary">{district}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-primary">{t({ fr: "L’agence", en: "The agency" })}</p>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{agency.address}, {t(agency.location).replace("La Marsa – ", "")}</li>
            {agency.phones.map((phone) => <li key={phone.href}><PhoneContact phone={phone} /></li>)}
            <li><a href={`mailto:${agency.email}`} className="flex gap-3 break-all hover:text-primary"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{agency.email}</a></li>
            <li className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{t(agency.hours)}</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl flex-col justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
        <p>© 2026 {agency.name}. {t({ fr: "Tous droits réservés.", en: "All rights reserved." })}</p>
        <p>{t({ fr: "Mentions légales · Politique de confidentialité", en: "Legal notice · Privacy policy" })}</p>
      </div>
      <SocialRail />
      <WhatsAppFloat />
    </footer>
  );
}
