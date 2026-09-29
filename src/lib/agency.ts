/** Coordonnées de l’agence, partagées par l’en-tête, le menu, le contact et le pied de page. */
export const agency = {
  name: "Mellinium Immobilière Housing",
  email: "contact@mellinium-immobiliere.fr",
  phone: "+216 71 000 000",
  phoneHref: "tel:+21671000000",
  address: "Avenue Habib Bourguiba, 2070 La Marsa, Tunis",
  hours: "Lun – Sam · 9h00 – 19h00",
} as const;

export const mainNavigation = [
  { label: "Acheter", to: "/biens", search: { transaction: "vente" }, description: "Villas, maisons et appartements à vendre" },
  { label: "Louer", to: "/biens", search: { transaction: "location" }, description: "Locations meublées et à l’année" },
  { label: "Vendre", to: "/", hash: "confier", description: "Estimation et mise en vente de votre bien" },
  { label: "La Marsa", to: "/", hash: "la-marsa", description: "Nos quartiers et leur art de vivre" },
  { label: "L’agence", to: "/", hash: "agence", description: "Notre équipe et notre méthode" },
  { label: "Contact", to: "/", hash: "contact", description: "Parlons de votre projet" },
] as const;
