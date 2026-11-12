import amel from "@/assets/team/amel.jpg";
import hela from "@/assets/team/hela.jpg";
import mehrez from "@/assets/team/mehrez.jpg";
import riadh from "@/assets/team/riadh.jpg";
import type { L } from "./i18n";

export type TeamMember = {
  id: string;
  name: string;
  role: L;
  focus: L;
  bio: L;
  photo: string;
  lead?: boolean;
};

/** Portraits de Riadh, Amel et Mehrez : photos Unsplash (licence Unsplash) en attendant les photos de l’équipe.
 *  unsplash.com/photos/6HnrvVZPANA · unsplash.com/photos/QXevDflbl8A · unsplash.com/photos/OFSQ6bHjFjs */
const salesRole: L = { fr: "Commercial", en: "Sales consultant" };

export const team: TeamMember[] = [
  {
    id: "hela",
    name: "Hela",
    role: { fr: "Chef d’agence", en: "Agency manager" },
    focus: { fr: "Direction & clients diplomatiques", en: "Management & diplomatic clients" },
    bio: {
      fr: "Hela dirige Mellinium Immobilière et suit personnellement les dossiers des ambassades et des clients internationaux, de la première demande jusqu’à la remise des clés.",
      en: "Hela leads Mellinium Immobilière and personally oversees embassy and international client files, from the first request to the handover of keys.",
    },
    photo: hela,
    lead: true,
  },
  {
    id: "riadh",
    name: "Riadh",
    role: salesRole,
    focus: { fr: "Location & relocation", en: "Rentals & relocation" },
    bio: {
      fr: "Recherche de logements meublés et non meublés et accompagnement des familles qui s’installent en Tunisie.",
      en: "Finds furnished and unfurnished homes and supports families settling in Tunisia.",
    },
    photo: riadh,
  },
  {
    id: "amel",
    name: "Amel",
    role: { fr: "Commerciale", en: "Sales consultant" },
    focus: { fr: "Vente & achat", en: "Sales & purchase" },
    bio: {
      fr: "Sélection de biens à vendre et accompagnement des acquéreurs jusqu’à la finalisation de la transaction.",
      en: "Curates properties for sale and guides buyers through to the completion of the transaction.",
    },
    photo: amel,
  },
  {
    id: "mehrez",
    name: "Mehrez",
    role: salesRole,
    focus: { fr: "Visites & gestion de biens", en: "Visits & property management" },
    bio: {
      fr: "Organisation des visites privées, négociation avec les propriétaires et suivi des biens confiés à l’agence.",
      en: "Organizes private visits, negotiates with owners and follows up on properties entrusted to the agency.",
    },
    photo: mehrez,
  },
];
