import facade from "@/assets/tour/01-facade.jpg";
import entree from "@/assets/tour/02-entree.jpg";
import salon from "@/assets/tour/03-salon.jpg";
import cuisine from "@/assets/tour/04-cuisine.jpg";
import suite from "@/assets/tour/05-suite.jpg";
import bain from "@/assets/tour/06-bain.jpg";
import piscine from "@/assets/tour/07-piscine.jpg";
import type { L, Lang } from "./i18n";
import { areas } from "./property-areas";
import { propertyTypeKeys, propertyTypeLabels, type PropertyType } from "./property-labels";

export { propertyTypeLabels, type PropertyType };
export { areas, type Area } from "./property-areas";

export type PropertyTransaction = "vente" | "location";

/**
 * Un bien du catalogue. En production il est publié depuis le CRM (voir `src/server/listings.ts`) ;
 * sans base de données (aperçu Lovable, développement), le site affiche `demoProperties`.
 */
export type Property = {
  /** Identifiant d’URL (`/biens/$propertyId`). */
  id: string;
  /** Référence CRM, absente des biens de démonstration. */
  reference?: string | undefined;
  /** `closed` : vendu ou loué, la fiche reste consultable mais le bien sort des listes. */
  status?: "available" | "closed" | undefined;
  transaction: PropertyTransaction;
  city: string;
  district: string;
  type: PropertyType;
  name: string;
  price: number;
  priceOnRequest?: boolean | undefined;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  land?: number | undefined;
  furnished?: boolean | undefined;
  badge?: L | undefined;
  highlight?: L | undefined;
  image: string;
  gallery: string[];
  summary: L;
  features: L[];
};

/** Catalogue de démonstration, affiché tant qu’aucune base de données n’est configurée. */
export const demoProperties: Property[] = [
  {
    id: "villa-solea-gammarth",
    transaction: "vente",
    city: "Grand Tunis",
    district: "Gammarth",
    type: "villa",
    name: "Villa Soléa",
    price: 4200000,
    rooms: 8,
    bedrooms: 5,
    bathrooms: 5,
    area: 420,
    land: 1100,
    badge: { fr: "Exclusivité", en: "Exclusive" },
    highlight: { fr: "Vue mer panoramique", en: "Panoramic sea view" },
    image: facade,
    gallery: [facade, salon, cuisine, suite, bain, piscine],
    summary: { fr: "Sur les hauteurs de Gammarth, une villa d’architecte en pierre de pays ouverte sur le golfe de Tunis, avec jardin d’oliviers centenaires et piscine à débordement.", en: "On the heights of Gammarth, an architect-designed stone villa opening onto the Gulf of Tunis, with a garden of century-old olive trees and an infinity pool." },
    features: [{ fr: "Piscine à débordement", en: "Infinity pool" }, { fr: "Vue mer", en: "Sea view" }, { fr: "Jardin d’oliviers", en: "Olive garden" }, { fr: "Garage double", en: "Double garage" }, { fr: "Suite parentale", en: "Master suite" }, { fr: "Domotique", en: "Smart home" }],
  },
  {
    id: "villa-des-oliviers-sidi-bou-said",
    transaction: "vente",
    city: "Grand Tunis",
    district: "Sidi Bou Saïd",
    type: "villa",
    name: "Villa des Oliviers",
    price: 2650000,
    rooms: 7,
    bedrooms: 5,
    bathrooms: 4,
    area: 360,
    land: 900,
    badge: { fr: "Coup de cœur", en: "Our favourite" },
    highlight: { fr: "À 5 min à pied du village", en: "5 min walk to the village" },
    image: entree,
    gallery: [entree, salon, cuisine, suite, piscine],
    summary: { fr: "Une demeure de caractère restaurée avec soin, entre arches, patio et boiseries, à deux pas du village de Sidi Bou Saïd.", en: "A carefully restored characterful residence of arches, patio and woodwork, a short walk from the village of Sidi Bou Saïd." },
    features: [{ fr: "Patio andalou", en: "Andalusian patio" }, { fr: "Maison de gardien", en: "Caretaker’s house" }, { fr: "Piscine", en: "Swimming pool" }, { fr: "Cheminée", en: "Fireplace" }, { fr: "Cave", en: "Cellar" }, { fr: "Jardin arboré", en: "Mature garden" }],
  },
  {
    id: "penthouse-corniche-la-marsa",
    transaction: "vente",
    city: "Grand Tunis",
    district: "La Marsa",
    type: "appartement",
    name: "Penthouse Corniche",
    price: 1850000,
    rooms: 5,
    bedrooms: 3,
    bathrooms: 3,
    area: 210,
    badge: { fr: "Nouveauté", en: "New" },
    highlight: { fr: "Toit-terrasse face à la mer", en: "Rooftop terrace facing the sea" },
    image: salon,
    gallery: [salon, cuisine, suite, bain, piscine],
    summary: { fr: "Dernier étage d’une résidence de standing sur la corniche : une pièce de vie ouverte sur la mer et un toit-terrasse privatif de 120 m².", en: "Top floor of a prestigious seafront residence: a living area opening onto the sea and a 120 m² private rooftop terrace." },
    features: [{ fr: "Toit-terrasse 120 m²", en: "120 m² rooftop terrace" }, { fr: "Vue mer", en: "Sea view" }, { fr: "Ascenseur", en: "Lift" }, { fr: "Deux parkings", en: "Two parking spaces" }, { fr: "Concierge", en: "Concierge" }, { fr: "Climatisation centrale", en: "Central air conditioning" }],
  },
  {
    id: "maison-jardins-de-carthage",
    transaction: "vente",
    city: "Grand Tunis",
    district: "Les Jardins de Carthage",
    type: "maison",
    name: "Maison des Pins",
    price: 1350000,
    rooms: 6,
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    land: 650,
    highlight: { fr: "Jardin de 400 m²", en: "400 m² garden" },
    image: cuisine,
    gallery: [cuisine, entree, salon, suite, bain],
    summary: { fr: "Une maison familiale lumineuse dans une rue calme des Jardins de Carthage, avec grande cuisine ouverte sur le jardin.", en: "A bright family house on a quiet street in Les Jardins de Carthage, with a large kitchen opening onto the garden." },
    features: [{ fr: "Jardin paysager", en: "Landscaped garden" }, { fr: "Cuisine équipée", en: "Fitted kitchen" }, { fr: "Garage", en: "Garage" }, { fr: "Buanderie", en: "Laundry room" }, { fr: "Chauffage central", en: "Central heating" }],
  },
  {
    id: "appartement-berges-du-lac-2",
    transaction: "vente",
    city: "Grand Tunis",
    district: "Les Berges du Lac 2",
    type: "appartement",
    name: "Appartement Jasmin",
    price: 780000,
    rooms: 4,
    bedrooms: 3,
    bathrooms: 2,
    area: 155,
    highlight: { fr: "Écoles internationales à proximité", en: "Close to international schools" },
    image: suite,
    gallery: [suite, salon, cuisine, bain, entree],
    summary: { fr: "Un appartement traversant au sein d’une résidence sécurisée, à quelques minutes des écoles internationales et de la promenade du Lac.", en: "A dual-aspect apartment in a gated residence, minutes from international schools and the lakeside promenade." },
    features: [{ fr: "Terrasse", en: "Terrace" }, { fr: "Résidence sécurisée", en: "Gated residence" }, { fr: "Parking", en: "Parking" }, { fr: "Cellier", en: "Storage room" }, { fr: "Double vitrage", en: "Double glazing" }],
  },
  {
    id: "villa-azur-gammarth-location",
    transaction: "location",
    city: "Grand Tunis",
    district: "Gammarth",
    type: "villa",
    name: "Villa Azur",
    price: 12000,
    rooms: 7,
    bedrooms: 5,
    bathrooms: 4,
    area: 380,
    land: 1000,
    furnished: true,
    badge: { fr: "Meublée", en: "Furnished" },
    highlight: { fr: "Piscine & accès plage", en: "Pool & beach access" },
    image: piscine,
    gallery: [piscine, facade, salon, suite, bain],
    summary: { fr: "Une villa meublée avec goût, piscine face au coucher de soleil et accès rapide aux plages de Gammarth. Idéale pour une résidence diplomatique.", en: "A tastefully furnished villa with a sunset-facing pool and quick access to Gammarth’s beaches. Ideal as a diplomatic residence." },
    features: [{ fr: "Meublée", en: "Furnished" }, { fr: "Piscine", en: "Swimming pool" }, { fr: "Vue mer", en: "Sea view" }, { fr: "Gardien", en: "Caretaker" }, { fr: "Groupe électrogène", en: "Backup generator" }, { fr: "Jardin", en: "Garden" }],
  },
  {
    id: "duplex-horizon-la-marsa-location",
    transaction: "location",
    city: "Grand Tunis",
    district: "La Marsa",
    type: "appartement",
    name: "Duplex Horizon",
    price: 6500,
    rooms: 5,
    bedrooms: 3,
    bathrooms: 3,
    area: 190,
    furnished: true,
    badge: { fr: "Vue mer", en: "Sea view" },
    highlight: { fr: "À 50 m de la plage", en: "50 m from the beach" },
    image: bain,
    gallery: [bain, suite, salon, cuisine, piscine],
    summary: { fr: "Un duplex meublé baigné de lumière à deux pas de la plage de La Marsa, avec terrasse filante et chambres ouvertes sur la mer.", en: "A light-filled furnished duplex a stone’s throw from La Marsa beach, with a wraparound terrace and sea-facing bedrooms." },
    features: [{ fr: "Meublé", en: "Furnished" }, { fr: "Terrasse", en: "Terrace" }, { fr: "Vue mer", en: "Sea view" }, { fr: "Parking", en: "Parking" }, { fr: "Climatisation", en: "Air conditioning" }],
  },
  {
    id: "dar-yasmine-carthage-location",
    transaction: "location",
    city: "Grand Tunis",
    district: "Carthage",
    type: "maison",
    name: "Dar Yasmine",
    price: 5200,
    rooms: 5,
    bedrooms: 3,
    bathrooms: 2,
    area: 220,
    land: 400,
    furnished: false,
    badge: { fr: "Non meublée", en: "Unfurnished" },
    highlight: { fr: "Patio et jardin de jasmins", en: "Patio and jasmine garden" },
    image: entree,
    gallery: [entree, cuisine, salon, suite, bain],
    summary: { fr: "Une maison traditionnelle rénovée, arches et zelliges, organisée autour d’un patio fleuri, à proximité des ambassades de Carthage.", en: "A renovated traditional house of arches and zellige tiles around a flowered patio, close to the embassies of Carthage." },
    features: [{ fr: "Patio", en: "Patio" }, { fr: "Jardin", en: "Garden" }, { fr: "Cuisine équipée", en: "Fitted kitchen" }, { fr: "Garage", en: "Garage" }, { fr: "Chauffage", en: "Heating" }],
  },
  {
    id: "appartement-nour-berges-du-lac-1-location",
    transaction: "location",
    city: "Grand Tunis",
    district: "Les Berges du Lac 1",
    type: "appartement",
    name: "Appartement Nour",
    price: 3200,
    rooms: 4,
    bedrooms: 2,
    bathrooms: 2,
    area: 130,
    furnished: false,
    highlight: { fr: "Résidence avec piscine", en: "Residence with pool" },
    image: salon,
    gallery: [salon, suite, bain, cuisine, piscine],
    summary: { fr: "Un appartement neuf non meublé dans une résidence avec piscine commune, finitions haut de gamme et grand balcon, à deux pas des sièges d’organisations internationales.", en: "A new unfurnished apartment in a residence with a shared pool, high-end finishes and a large balcony, close to international organisations’ headquarters." },
    features: [{ fr: "Piscine commune", en: "Shared pool" }, { fr: "Balcon", en: "Balcony" }, { fr: "Parking sous-sol", en: "Underground parking" }, { fr: "Ascenseur", en: "Lift" }, { fr: "Climatisation", en: "Air conditioning" }],
  },
  {
    id: "studio-marsa-location",
    transaction: "location",
    city: "Grand Tunis",
    district: "La Marsa",
    type: "appartement",
    name: "Studio Marsa",
    price: 1900,
    rooms: 2,
    bedrooms: 1,
    bathrooms: 1,
    area: 68,
    furnished: true,
    highlight: { fr: "Idéal expatrié", en: "Ideal for expats" },
    image: cuisine,
    gallery: [cuisine, suite, bain, salon],
    summary: { fr: "Un deux-pièces entièrement meublé et équipé, prêt à vivre, au cœur de La Marsa.", en: "A fully furnished and equipped one-bedroom apartment, ready to move into, in the heart of La Marsa." },
    features: [{ fr: "Meublé", en: "Furnished" }, { fr: "Internet fibre", en: "Fibre internet" }, { fr: "Climatisation", en: "Air conditioning" }, { fr: "Balcon", en: "Balcony" }],
  },
];

export const districts = areas.map((area) => area.name);

/** Types présents dans une liste, dans l’ordre du CRM. */
export function typesIn(list: Property[]): PropertyType[] {
  const present = new Set(list.map((property) => property.type));
  return propertyTypeKeys.filter((type) => present.has(type));
}

/** Prestations proposées dans le filtre avancé, testées sur le libellé français. */
export const featureFilters: { value: string; label: L; matches: (property: Property) => boolean }[] = [
  { value: "piscine", label: { fr: "Piscine", en: "Swimming pool" }, matches: (property) => property.features.some((item) => item.fr.toLowerCase().includes("piscine")) },
  { value: "vue-mer", label: { fr: "Vue mer", en: "Sea view" }, matches: (property) => property.features.some((item) => item.fr.toLowerCase().includes("vue mer")) },
  { value: "jardin", label: { fr: "Jardin", en: "Garden" }, matches: (property) => property.features.some((item) => item.fr.toLowerCase().includes("jardin")) },
  { value: "parking", label: { fr: "Parking", en: "Parking" }, matches: (property) => property.features.some((item) => /parking|garage/i.test(item.fr)) },
  { value: "terrasse", label: { fr: "Terrasse", en: "Terrace" }, matches: (property) => property.features.some((item) => item.fr.toLowerCase().includes("terrasse")) },
  { value: "meuble", label: { fr: "Meublé", en: "Furnished" }, matches: (property) => property.furnished === true },
  { value: "non-meuble", label: { fr: "Non meublé", en: "Unfurnished" }, matches: (property) => property.furnished === false },
];

export const saleBudgets = [800000, 1500000, 2500000, 5000000];
export const rentBudgets = [2000, 3500, 6000, 12000];

const formatters: Record<Lang, Intl.NumberFormat> = {
  fr: new Intl.NumberFormat("fr-TN"),
  en: new Intl.NumberFormat("en-GB"),
};

export function formatAmount(value: number, lang: Lang) {
  return `${formatters[lang].format(value)} TND`;
}

const compactFormatters: Record<Lang, Intl.NumberFormat> = {
  fr: new Intl.NumberFormat("fr-TN", { notation: "compact", maximumFractionDigits: 1 }),
  en: new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }),
};

/** Montant abrégé (« 1,5 M TND ») pour les champs étroits comme la recherche rapide. */
export function formatCompactAmount(value: number, lang: Lang) {
  return `${compactFormatters[lang].format(value)} TND`;
}

export function formatPrice(property: Property, lang: Lang) {
  if (property.priceOnRequest || !property.price) return lang === "fr" ? "Prix sur demande" : "Price on request";
  return property.transaction === "location" ? `${formatAmount(property.price, lang)} ${lang === "fr" ? "/ mois" : "/ month"}` : formatAmount(property.price, lang);
}

export function getArea(name: string) {
  return areas.find((area) => area.name === name);
}

export function getSimilarProperties(list: Property[], property: Property, count = 3) {
  return list
    .filter((item) => item.id !== property.id && item.transaction === property.transaction && item.status !== "closed")
    .sort((a, b) => Number(b.district === property.district) - Number(a.district === property.district))
    .slice(0, count);
}
