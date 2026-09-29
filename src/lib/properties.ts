import facade from "@/assets/tour/01-facade.jpg";
import entree from "@/assets/tour/02-entree.jpg";
import salon from "@/assets/tour/03-salon.jpg";
import cuisine from "@/assets/tour/04-cuisine.jpg";
import suite from "@/assets/tour/05-suite.jpg";
import bain from "@/assets/tour/06-bain.jpg";
import piscine from "@/assets/tour/07-piscine.jpg";

export type PropertyTransaction = "vente" | "location";

export type Property = {
  id: string;
  transaction: PropertyTransaction;
  city: string;
  district: string;
  type: string;
  name: string;
  price: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  land?: number;
  badge?: string;
  highlight: string;
  image: string;
  gallery: string[];
  summary: string;
  features: string[];
};

export type MarsaDistrict = {
  name: string;
  tagline: string;
  description: string;
};

/** Les quartiers de La Marsa couverts par l’agence, dans l’ordre de présentation. */
export const marsaDistricts: MarsaDistrict[] = [
  { name: "Marsa Corniche", tagline: "Face à la mer", description: "Les adresses les plus recherchées, le long de la corniche et de ses terrasses, à quelques pas du sable." },
  { name: "Sidi Abdelaziz", tagline: "Le charme historique", description: "Ruelles bordées de bougainvilliers, anciennes demeures beylicales et le célèbre Saf-Saf à pied." },
  { name: "Gammarth", tagline: "Les hauteurs prisées", description: "Villas d’architecte sur les collines, vues panoramiques sur le golfe et plages confidentielles." },
  { name: "Marsa Cube", tagline: "Au cœur de la vie marsoise", description: "Commerces, cafés et écoles internationales accessibles à pied, dans un cadre résidentiel paisible." },
  { name: "Cité Les Pins", tagline: "Calme et verdure", description: "Un quartier arboré et discret, prisé des familles pour ses jardins et ses grandes parcelles." },
  { name: "Marsa Ennasim", tagline: "Résidentiel contemporain", description: "Résidences récentes et appartements lumineux, entre La Marsa et Gammarth." },
];

export const properties: Property[] = [
  {
    id: "villa-solea-gammarth",
    transaction: "vente",
    city: "La Marsa",
    district: "Gammarth",
    type: "Villa",
    name: "Villa Soléa",
    price: 4200000,
    rooms: 8,
    bedrooms: 5,
    bathrooms: 5,
    area: 420,
    land: 1100,
    badge: "Exclusivité",
    highlight: "Vue mer panoramique",
    image: facade,
    gallery: [facade, salon, cuisine, suite, bain, piscine],
    summary: "Sur les hauteurs de Gammarth, une villa d’architecte en pierre de pays ouverte sur le golfe de Tunis, avec jardin d’oliviers centenaires et piscine à débordement.",
    features: ["Piscine à débordement", "Vue mer", "Jardin d’oliviers", "Garage double", "Suite parentale", "Domotique"],
  },
  {
    id: "villa-des-oliviers-sidi-abdelaziz",
    transaction: "vente",
    city: "La Marsa",
    district: "Sidi Abdelaziz",
    type: "Villa",
    name: "Villa des Oliviers",
    price: 2650000,
    rooms: 7,
    bedrooms: 5,
    bathrooms: 4,
    area: 360,
    land: 900,
    badge: "Coup de cœur",
    highlight: "À 5 min à pied du Saf-Saf",
    image: entree,
    gallery: [entree, salon, cuisine, suite, piscine],
    summary: "Une demeure de caractère restaurée avec soin, entre arches, patio et boiseries, dans le quartier le plus authentique de La Marsa.",
    features: ["Patio andalou", "Maison de gardien", "Piscine", "Cheminée", "Cave", "Jardin arboré"],
  },
  {
    id: "penthouse-corniche-la-marsa",
    transaction: "vente",
    city: "La Marsa",
    district: "Marsa Corniche",
    type: "Appartement",
    name: "Penthouse Corniche",
    price: 1850000,
    rooms: 5,
    bedrooms: 3,
    bathrooms: 3,
    area: 210,
    badge: "Nouveauté",
    highlight: "Toit-terrasse face à la mer",
    image: salon,
    gallery: [salon, cuisine, suite, bain, piscine],
    summary: "Dernier étage d’une résidence de standing sur la corniche : une pièce de vie ouverte sur la mer et un toit-terrasse privatif de 120 m².",
    features: ["Toit-terrasse 120 m²", "Vue mer", "Ascenseur", "Deux parkings", "Concierge", "Climatisation centrale"],
  },
  {
    id: "maison-cite-les-pins",
    transaction: "vente",
    city: "La Marsa",
    district: "Cité Les Pins",
    type: "Maison",
    name: "Maison des Pins",
    price: 1350000,
    rooms: 6,
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    land: 650,
    highlight: "Jardin de 400 m²",
    image: cuisine,
    gallery: [cuisine, entree, salon, suite, bain],
    summary: "Une maison familiale lumineuse dans une rue calme et arborée, avec grande cuisine ouverte sur le jardin.",
    features: ["Jardin paysager", "Cuisine équipée", "Garage", "Buanderie", "Chauffage central"],
  },
  {
    id: "appartement-marsa-cube",
    transaction: "vente",
    city: "La Marsa",
    district: "Marsa Cube",
    type: "Appartement",
    name: "Appartement Jasmin",
    price: 780000,
    rooms: 4,
    bedrooms: 3,
    bathrooms: 2,
    area: 155,
    highlight: "Écoles et commerces à pied",
    image: suite,
    gallery: [suite, salon, cuisine, bain, entree],
    summary: "Un appartement traversant au sein d’une résidence sécurisée, à quelques minutes des écoles internationales et du centre de La Marsa.",
    features: ["Terrasse", "Résidence sécurisée", "Parking", "Cellier", "Double vitrage"],
  },
  {
    id: "villa-azur-gammarth-location",
    transaction: "location",
    city: "La Marsa",
    district: "Gammarth",
    type: "Villa",
    name: "Villa Azur",
    price: 12000,
    rooms: 7,
    bedrooms: 5,
    bathrooms: 4,
    area: 380,
    land: 1000,
    badge: "Meublée",
    highlight: "Piscine & accès plage",
    image: piscine,
    gallery: [piscine, facade, salon, suite, bain],
    summary: "Une villa meublée avec goût, piscine face au coucher de soleil et accès rapide aux plages de Gammarth. Service de ménage possible.",
    features: ["Meublée", "Piscine", "Vue mer", "Gardien", "Groupe électrogène", "Jardin"],
  },
  {
    id: "duplex-corniche-location",
    transaction: "location",
    city: "La Marsa",
    district: "Marsa Corniche",
    type: "Appartement",
    name: "Duplex Horizon",
    price: 6500,
    rooms: 5,
    bedrooms: 3,
    bathrooms: 3,
    area: 190,
    badge: "Vue mer",
    highlight: "À 50 m de la plage",
    image: bain,
    gallery: [bain, suite, salon, cuisine, piscine],
    summary: "Un duplex baigné de lumière à deux pas de la plage, avec terrasse filante et chambres ouvertes sur la mer.",
    features: ["Meublé", "Terrasse", "Vue mer", "Parking", "Climatisation"],
  },
  {
    id: "maison-sidi-abdelaziz-location",
    transaction: "location",
    city: "La Marsa",
    district: "Sidi Abdelaziz",
    type: "Maison",
    name: "Dar Yasmine",
    price: 5200,
    rooms: 5,
    bedrooms: 3,
    bathrooms: 2,
    area: 220,
    land: 400,
    highlight: "Patio et jardin de jasmins",
    image: entree,
    gallery: [entree, cuisine, salon, suite, bain],
    summary: "Une maison traditionnelle rénovée, arches et zelliges, organisée autour d’un patio fleuri au cœur du vieux Marsa.",
    features: ["Patio", "Jardin", "Cuisine équipée", "Garage", "Chauffage"],
  },
  {
    id: "appartement-ennasim-location",
    transaction: "location",
    city: "La Marsa",
    district: "Marsa Ennasim",
    type: "Appartement",
    name: "Appartement Nour",
    price: 3200,
    rooms: 4,
    bedrooms: 2,
    bathrooms: 2,
    area: 130,
    highlight: "Résidence avec piscine",
    image: salon,
    gallery: [salon, suite, bain, cuisine, piscine],
    summary: "Un appartement neuf dans une résidence avec piscine commune, finitions haut de gamme et grand balcon.",
    features: ["Piscine commune", "Balcon", "Parking sous-sol", "Ascenseur", "Climatisation"],
  },
  {
    id: "studio-marsa-cube-location",
    transaction: "location",
    city: "La Marsa",
    district: "Marsa Cube",
    type: "Appartement",
    name: "Studio Cube",
    price: 1900,
    rooms: 2,
    bedrooms: 1,
    bathrooms: 1,
    area: 68,
    highlight: "Idéal expatrié",
    image: cuisine,
    gallery: [cuisine, suite, bain, salon],
    summary: "Un deux-pièces entièrement meublé et équipé, prêt à vivre, au cœur de Marsa Cube.",
    features: ["Meublé", "Internet fibre", "Climatisation", "Balcon"],
  },
];

export const saleProperties = properties.filter((property) => property.transaction === "vente");
export const rentalProperties = properties.filter((property) => property.transaction === "location");
export const districts = marsaDistricts.map((district) => district.name);
export const propertyTypes = Array.from(new Set(properties.map((property) => property.type)));

export const saleBudgets = [800000, 1500000, 2500000, 5000000];
export const rentBudgets = [2000, 3500, 6000, 12000];

const priceFormatter = new Intl.NumberFormat("fr-TN");

export function formatAmount(value: number) {
  return `${priceFormatter.format(value)} TND`;
}

export function formatPrice(property: Property) {
  return property.transaction === "location" ? `${formatAmount(property.price)} / mois` : formatAmount(property.price);
}

export function getProperty(id: string) {
  return properties.find((property) => property.id === id);
}

export function getDistrict(name: string) {
  return marsaDistricts.find((district) => district.name === name);
}

export function getSimilarProperties(property: Property, count = 3) {
  return properties
    .filter((item) => item.id !== property.id && item.transaction === property.transaction)
    .sort((a, b) => Number(b.district === property.district) - Number(a.district === property.district))
    .slice(0, count);
}
