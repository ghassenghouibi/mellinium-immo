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
  priceLabel: string;
  rooms: number;
  bedrooms: number;
  area: number;
  image: string;
  gallery: string[];
  summary: string;
  features: string[];
};

export const properties: Property[] = [
  {
    id: "villa-solea-gammarth",
    transaction: "vente",
    city: "Gammarth",
    district: "Gammarth Supérieur",
    type: "Villa",
    name: "Villa Soléa",
    price: 2950000,
    priceLabel: "2 950 000 TND",
    rooms: 7,
    bedrooms: 5,
    area: 310,
    image: facade,
    gallery: [facade, salon, cuisine, suite, piscine],
    summary: "Une architecture méditerranéenne contemporaine ouverte sur un jardin confidentiel et sa piscine.",
    features: ["Piscine", "Vue dégagée", "Jardin paysager", "Garage double"],
  },
  {
    id: "appartement-lac-2-tunis",
    transaction: "vente",
    city: "Tunis",
    district: "Les Berges du Lac 2",
    type: "Appartement",
    name: "Appartement Azur",
    price: 890000,
    priceLabel: "890 000 TND",
    rooms: 4,
    bedrooms: 3,
    area: 142,
    image: salon,
    gallery: [salon, cuisine, suite, bain, entree],
    summary: "Un appartement traversant aux volumes lumineux, au cœur des Berges du Lac et de ses adresses emblématiques.",
    features: ["Terrasse", "Aperçu mer", "Conciergerie", "Parking"],
  },
  {
    id: "villa-des-oliviers-la-marsa",
    transaction: "vente",
    city: "La Marsa",
    district: "Sidi Abdelaziz",
    type: "Villa",
    name: "Villa des Oliviers",
    price: 1800000,
    priceLabel: "1 800 000 TND",
    rooms: 8,
    bedrooms: 6,
    area: 380,
    image: suite,
    gallery: [suite, entree, salon, cuisine, piscine],
    summary: "Une bastide chaleureuse posée au cœur d’un parc arboré, pensée pour recevoir en toute intimité.",
    features: ["Parc 4 000 m²", "Maison d’amis", "Piscine", "Cheminée"],
  },
  {
    id: "penthouse-sidi-bou-said",
    transaction: "vente",
    city: "Sidi Bou Saïd",
    district: "Village",
    type: "Appartement",
    name: "Penthouse Carthage",
    price: 1450000,
    priceLabel: "1 450 000 TND",
    rooms: 5,
    bedrooms: 3,
    area: 168,
    image: cuisine,
    gallery: [cuisine, salon, suite, bain, piscine],
    summary: "Un dernier étage précis et graphique prolongé par une terrasse panoramique ouverte sur la baie de Tunis.",
    features: ["Toit-terrasse", "Ascenseur privé", "Vue mer", "Deux garages"],
  },
  {
    id: "villa-yasmine-hammamet-location",
    transaction: "location",
    city: "Hammamet",
    district: "Yasmine Hammamet",
    type: "Villa",
    name: "Villa Azurée",
    price: 8500,
    priceLabel: "8 500 TND / mois",
    rooms: 6,
    bedrooms: 4,
    area: 260,
    image: piscine,
    gallery: [piscine, facade, salon, suite, bain],
    summary: "Une adresse saisonnière élégante entre pins et Méditerranée, avec service sur demande.",
    features: ["Location meublée", "Piscine chauffée", "Accès mer", "Gardien"],
  },
  {
    id: "loft-kantaoui-sousse-location",
    transaction: "location",
    city: "Sousse",
    district: "Port El Kantaoui",
    type: "Appartement",
    name: "Loft Kantaoui",
    price: 2800,
    priceLabel: "2 800 TND / mois",
    rooms: 3,
    bedrooms: 2,
    area: 118,
    image: entree,
    gallery: [entree, salon, cuisine, suite, bain],
    summary: "Un intérieur entièrement rénové où les matières naturelles dialoguent avec une belle hauteur sous plafond.",
    features: ["Meublé", "Climatisation", "Balcon", "Cave"],
  },
];

export const cities = Array.from(new Set(properties.map((property) => property.city)));
export const propertyTypes = Array.from(new Set(properties.map((property) => property.type)));

export function getProperty(id: string) {
  return properties.find((property) => property.id === id);
}