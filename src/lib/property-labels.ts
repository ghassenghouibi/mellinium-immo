import type { L } from "./i18n";

/** Types de bien du CRM (Orion CRM, `PropertyType`) : le site reçoit la clé telle quelle. */
export const propertyTypeKeys = [
  "appartement",
  "maison",
  "studio",
  "villa",
  "duplex",
  "triplex",
  "penthouse",
  "immeuble",
  "bureau",
  "open_space",
  "plateau_bureau",
  "showroom",
  "terrain_constructible",
  "terrain_agricole",
  "ferme",
  "local_commercial",
  "local_industriel",
  "entrepot",
  "parking",
  "autre",
] as const;

export type PropertyType = (typeof propertyTypeKeys)[number];

export function isPropertyType(value: unknown): value is PropertyType {
  return typeof value === "string" && (propertyTypeKeys as readonly string[]).includes(value);
}

export const propertyTypeLabels: Record<PropertyType, { singular: L; plural: L }> = {
  appartement: {
    singular: { fr: "Appartement", en: "Apartment" },
    plural: { fr: "Appartements", en: "Apartments" },
  },
  maison: { singular: { fr: "Maison", en: "House" }, plural: { fr: "Maisons", en: "Houses" } },
  studio: { singular: { fr: "Studio", en: "Studio" }, plural: { fr: "Studios", en: "Studios" } },
  villa: { singular: { fr: "Villa", en: "Villa" }, plural: { fr: "Villas", en: "Villas" } },
  duplex: { singular: { fr: "Duplex", en: "Duplex" }, plural: { fr: "Duplex", en: "Duplexes" } },
  triplex: {
    singular: { fr: "Triplex", en: "Triplex" },
    plural: { fr: "Triplex", en: "Triplexes" },
  },
  penthouse: {
    singular: { fr: "Penthouse", en: "Penthouse" },
    plural: { fr: "Penthouses", en: "Penthouses" },
  },
  immeuble: {
    singular: { fr: "Immeuble", en: "Building" },
    plural: { fr: "Immeubles", en: "Buildings" },
  },
  bureau: { singular: { fr: "Bureau", en: "Office" }, plural: { fr: "Bureaux", en: "Offices" } },
  open_space: {
    singular: { fr: "Open space", en: "Open-plan office" },
    plural: { fr: "Open spaces", en: "Open-plan offices" },
  },
  plateau_bureau: {
    singular: { fr: "Plateau de bureaux", en: "Office floor" },
    plural: { fr: "Plateaux de bureaux", en: "Office floors" },
  },
  showroom: {
    singular: { fr: "Showroom", en: "Showroom" },
    plural: { fr: "Showrooms", en: "Showrooms" },
  },
  terrain_constructible: {
    singular: { fr: "Terrain constructible", en: "Building plot" },
    plural: { fr: "Terrains constructibles", en: "Building plots" },
  },
  terrain_agricole: {
    singular: { fr: "Terrain agricole", en: "Agricultural land" },
    plural: { fr: "Terrains agricoles", en: "Agricultural land" },
  },
  ferme: { singular: { fr: "Ferme", en: "Farm" }, plural: { fr: "Fermes", en: "Farms" } },
  local_commercial: {
    singular: { fr: "Local commercial", en: "Retail space" },
    plural: { fr: "Locaux commerciaux", en: "Retail spaces" },
  },
  local_industriel: {
    singular: { fr: "Local industriel", en: "Industrial unit" },
    plural: { fr: "Locaux industriels", en: "Industrial units" },
  },
  entrepot: {
    singular: { fr: "Entrepôt", en: "Warehouse" },
    plural: { fr: "Entrepôts", en: "Warehouses" },
  },
  parking: {
    singular: { fr: "Parking", en: "Parking space" },
    plural: { fr: "Parkings", en: "Parking spaces" },
  },
  autre: {
    singular: { fr: "Autre bien", en: "Other property" },
    plural: { fr: "Autres biens", en: "Other properties" },
  },
};

/** Types dont les chambres et salles de bain n’ont pas de sens (terrains, locaux, bureaux). */
export const nonResidentialTypes: ReadonlySet<PropertyType> = new Set<PropertyType>([
  "immeuble",
  "bureau",
  "open_space",
  "plateau_bureau",
  "showroom",
  "terrain_constructible",
  "terrain_agricole",
  "ferme",
  "local_commercial",
  "local_industriel",
  "entrepot",
  "parking",
]);

/** Prestations du CRM (libellés français de `amenitiesOptions`) et leur traduction. */
export const amenityLabels: Record<string, L> = {
  Alarme: { fr: "Alarme", en: "Alarm system" },
  Ascenseur: { fr: "Ascenseur", en: "Lift" },
  Balcon: { fr: "Balcon", en: "Balcony" },
  Barbecue: { fr: "Barbecue", en: "Barbecue" },
  Cellier: { fr: "Cellier", en: "Storage room" },
  "Chauffage au sol": { fr: "Chauffage au sol", en: "Underfloor heating" },
  "Chauffage central": { fr: "Chauffage central", en: "Central heating" },
  Climatisation: { fr: "Climatisation", en: "Air conditioning" },
  "Douche extérieure": { fr: "Douche extérieure", en: "Outdoor shower" },
  Four: { fr: "Four", en: "Oven" },
  Hotte: { fr: "Hotte", en: "Extractor hood" },
  Jacuzzi: { fr: "Jacuzzi", en: "Jacuzzi" },
  Jardin: { fr: "Jardin", en: "Garden" },
  "Lave-linge": { fr: "Lave-linge", en: "Washing machine" },
  "Lave-vaisselle": { fr: "Lave-vaisselle", en: "Dishwasher" },
  Parking: { fr: "Parking", en: "Parking" },
  Pelouse: { fr: "Pelouse", en: "Lawn" },
  Piscine: { fr: "Piscine", en: "Swimming pool" },
  Plaque: { fr: "Plaque de cuisson", en: "Hob" },
  "Salle de sport": { fr: "Salle de sport", en: "Gym" },
  Sauna: { fr: "Sauna", en: "Sauna" },
  "Suite parentale": { fr: "Suite parentale", en: "Master suite" },
  "Sèche-linge": { fr: "Sèche-linge", en: "Tumble dryer" },
  Terrasse: { fr: "Terrasse", en: "Terrace" },
  "Vue dégagée": { fr: "Vue dégagée", en: "Open view" },
  "Vue mer": { fr: "Vue mer", en: "Sea view" },
  "Wi-Fi": { fr: "Wi-Fi", en: "Wi-Fi" },
  Meublé: { fr: "Meublé", en: "Furnished" },
};

/** Étiquettes de publication courantes du CRM ; une étiquette inconnue garde son libellé français. */
export const publicationTagLabels: Record<string, L> = {
  exclusivite: { fr: "Exclusivité", en: "Exclusive" },
  coup_de_coeur: { fr: "Coup de cœur", en: "Our favourite" },
  nouveaute: { fr: "Nouveauté", en: "New" },
  nouveau: { fr: "Nouveau", en: "New" },
  prix_en_baisse: { fr: "Prix en baisse", en: "Price reduced" },
  urgent: { fr: "Urgent", en: "Urgent" },
};
