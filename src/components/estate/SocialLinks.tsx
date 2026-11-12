import { Phone } from "lucide-react";
import { agency, socialNetworks, whatsappHref, type SocialNetworkId } from "@/lib/agency";
import { useI18n } from "@/lib/i18n";

const iconPaths: Record<SocialNetworkId, string> = {
  whatsapp:
    "M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.42 9.42 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44a9.38 9.38 0 0 1 6.68 2.77 9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.44-9.45 9.44m8.04-17.48A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.7l6.1-1.6a11.33 11.33 0 0 0 5.37 1.37h.01c6.26 0 11.36-5.1 11.37-11.37 0-3.03-1.18-5.89-3.33-8.03",
  instagram:
    "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0m0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88",
  facebook:
    "M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07",
  linkedin:
    "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28M5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13M7.12 20.45H3.56V9h3.56v11.45M22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0",
};

export function SocialIcon({ id, className = "h-4 w-4" }: { id: SocialNetworkId; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d={iconPaths[id]} />
    </svg>
  );
}

export function SocialLinks({ compact = false, tone = "default" }: { compact?: boolean; tone?: "default" | "light" }) {
  const { t } = useI18n();
  return (
    <div className="flex items-center gap-2" aria-label={t({ fr: "Réseaux sociaux", en: "Social media" })}>
      {socialNetworks.map(({ id, label, href }) => (
        <a
          key={id}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          title={label}
          data-network={id}
          className={`social-dot ${tone === "light" ? "social-dot-light" : ""} ${compact ? "h-9 w-9" : "h-11 w-11"}`}
        >
          <SocialIcon id={id} />
        </a>
      ))}
    </div>
  );
}

type AgencyPhone = (typeof agency.phones)[number];

/** Un numéro de l’agence : appel direct et lien WhatsApp côte à côte. */
export function PhoneContact({ phone, className = "", iconClassName = "h-4 w-4" }: { phone: AgencyPhone; className?: string; iconClassName?: string }) {
  const { t } = useI18n();
  return (
    <span className={`phone-contact ${className}`}>
      <a href={phone.href} className="phone-contact-call" title={t({ fr: "Appeler", en: "Call" })}><Phone className={iconClassName} />{phone.label}</a>
      <a href={phone.whatsapp} target="_blank" rel="noreferrer" className="phone-contact-whatsapp" aria-label={`WhatsApp ${phone.label}`} title={`WhatsApp ${phone.label}`}><SocialIcon id="whatsapp" className={iconClassName} /></a>
    </span>
  );
}

/** Rail vertical fixé sur le bord gauche (grands écrans), comme sur la plupart des sites d’agences. */
export function SocialRail() {
  const { t } = useI18n();
  return (
    <aside className="social-rail" aria-label={t({ fr: "Suivez-nous", en: "Follow us" })}>
      <nav className="social-rail-list">
        {socialNetworks.map(({ id, label, handle, href }) => (
          <a key={id} href={href} target="_blank" rel="noreferrer" aria-label={`${label} — ${handle}`} data-network={id} className="social-rail-link">
            <SocialIcon id={id} />
            <span>{label} · {handle}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}

/** Bouton WhatsApp flottant, présent sur toutes les pages. */
export function WhatsAppFloat() {
  const { t } = useI18n();
  const label = t({ fr: "Écrivez-nous sur WhatsApp", en: "Chat with us on WhatsApp" });
  return (
    <a href={whatsappHref} target="_blank" rel="noreferrer" className="whatsapp-float" aria-label={label} title={label}>
      <SocialIcon id="whatsapp" className="h-6 w-6" />
      <span className="whatsapp-float-label">{t({ fr: "WhatsApp", en: "WhatsApp" })}</span>
    </a>
  );
}
