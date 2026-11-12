import type { L } from "./i18n";

/** Coordonnées de l’agence, partagées par l’en-tête, le menu, le contact et le pied de page. */
export const agency = {
  name: "Mellinium Immobilière",
  tagline: { fr: "Immobilier & services de relocation", en: "Real Estate & Relocation Services" } satisfies L,
  location: { fr: "La Marsa – Tunisie", en: "La Marsa – Tunisia" } satisfies L,
  email: "stemelliniumimmo@gmail.com",
  /**
   * Les deux numéros répondent aux appels et sur WhatsApp.
   * Le 22 098 006 est le numéro principal : il reste en tête de liste et sert à tous les boutons WhatsApp uniques.
   */
  phones: [
    { label: "+216 22 098 006", href: "tel:+21622098006", whatsapp: "https://wa.me/21622098006", primary: true },
    { label: "+216 22 914 366", href: "tel:+21622914366", whatsapp: "https://wa.me/21622914366", primary: false },
  ],
  address: "Route de Gammarth, Cité Mimouza, La Marsa",
  hours: { fr: "Lun – Sam · 9h00 – 19h00", en: "Mon – Sat · 9:00 am – 7:00 pm" } satisfies L,
} as const;

export const primaryPhone = agency.phones.find((phone) => phone.primary) ?? agency.phones[0];

/** Réseaux sociaux officiels de l’agence. */
export const socialNetworks = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    handle: primaryPhone.label,
    href: primaryPhone.whatsapp,
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@mellinium_immobliere",
    href: "https://www.instagram.com/mellinium_immobliere",
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "facebook.com/Malihacity",
    href: "https://www.facebook.com/Malihacity/",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "Hela Dhaïbi",
    href: "https://www.linkedin.com/in/hela-dha%C3%AFbi-204020418/",
  },
] as const satisfies readonly { id: string; label: string; handle: string; href: string }[];

export type SocialNetworkId = (typeof socialNetworks)[number]["id"];

export const whatsappHref = socialNetworks[0].href;

export const mainNavigation = [
  { label: { fr: "Louer", en: "Rent" }, to: "/biens", search: { transaction: "location" }, description: { fr: "Locations meublées et non meublées", en: "Furnished and unfurnished rentals" } },
  { label: { fr: "Acheter", en: "Buy" }, to: "/biens", search: { transaction: "vente" }, description: { fr: "Une sélection de biens résidentiels à vendre", en: "A curated selection of homes for sale" } },
  { label: { fr: "Services", en: "Services" }, to: "/", hash: "services", description: { fr: "Location, vente, relocation et gestion", en: "Rental, sales, relocation and management" } },
  { label: { fr: "Diplomatie", en: "Diplomatic" }, to: "/", hash: "diplomatie", description: { fr: "Clients diplomatiques et internationaux", en: "Diplomatic & international clients" } },
  { label: { fr: "Quartiers", en: "Areas" }, to: "/", hash: "quartiers", description: { fr: "Les banlieues nord du Grand Tunis", en: "The Northern suburbs of Greater Tunis" } },
  { label: { fr: "L’équipe", en: "Team" }, to: "/", hash: "equipe", description: { fr: "Vos interlocuteurs à La Marsa", en: "Your local contacts in La Marsa" } },
  { label: { fr: "Contact", en: "Contact" }, to: "/", hash: "contact", description: { fr: "Parlons de votre installation", en: "Let’s talk about your move" } },
] as const;
