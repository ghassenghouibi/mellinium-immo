import { Facebook, Instagram, Linkedin } from "lucide-react";

const socials = [
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
] as const;

export function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2" aria-label="Réseaux sociaux">
      {socials.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          title={label}
          className={`${compact ? "h-9 w-9" : "h-11 w-11"} grid place-items-center border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary`}
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}