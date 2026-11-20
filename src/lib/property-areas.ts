import type { L } from "./i18n";

export type Area = {
  name: string;
  tagline: L;
  description: L;
};

/** Les quartiers du Grand Tunis couverts par l’agence, dans l’ordre de la brochure. */
export const areas: Area[] = [
  {
    name: "La Marsa",
    tagline: { fr: "Notre port d’attache", en: "Our home base" },
    description: {
      fr: "Corniche, plages, commerces et écoles internationales : le cœur résidentiel des banlieues nord, où se trouve notre agence.",
      en: "Seafront, beaches, shops and international schools: the residential heart of the Northern suburbs, home to our agency.",
    },
  },
  {
    name: "Gammarth",
    tagline: { fr: "Les hauteurs face à la mer", en: "Hillside sea views" },
    description: {
      fr: "Villas sur les collines, vues panoramiques sur le golfe et plages confidentielles.",
      en: "Hillside villas, panoramic views over the gulf and secluded beaches.",
    },
  },
  {
    name: "Sidi Bou Saïd",
    tagline: { fr: "Le village bleu et blanc", en: "The blue-and-white village" },
    description: {
      fr: "Ruelles pavées, maisons de caractère et vues mythiques sur la baie de Tunis.",
      en: "Cobbled lanes, characterful houses and iconic views over the Bay of Tunis.",
    },
  },
  {
    name: "Carthage",
    tagline: { fr: "Histoire & quartier diplomatique", en: "History & diplomatic quarter" },
    description: {
      fr: "Résidences arborées entre sites antiques, ambassades et résidences officielles.",
      en: "Leafy residences among ancient sites, embassies and official residences.",
    },
  },
  {
    name: "Les Jardins de Carthage",
    tagline: { fr: "Résidentiel contemporain", en: "Contemporary living" },
    description: {
      fr: "Un quartier récent et calme, prisé des familles pour ses villas et résidences sécurisées.",
      en: "A recent, quiet district favoured by families for its villas and gated residences.",
    },
  },
  {
    name: "Les Berges du Lac 1",
    tagline: { fr: "Affaires & organisations", en: "Business & organisations" },
    description: {
      fr: "Sièges d’entreprises, organisations internationales et appartements modernes au bord du lac.",
      en: "Corporate headquarters, international organisations and modern lakeside apartments.",
    },
  },
  {
    name: "Les Berges du Lac 2",
    tagline: { fr: "Moderne & familial", en: "Modern & family-friendly" },
    description: {
      fr: "Résidences neuves, écoles internationales et promenade au bord de l’eau.",
      en: "New residences, international schools and a lakeside promenade.",
    },
  },
];
