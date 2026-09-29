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
    id: "villa-solea-saint-tropez",
    transaction: "vente",
    city: "Saint-Tropez",
    district: "La Moutte",
    type: "Villa",
    name: "Villa Soléa",
    price: 4850000,
    priceLabel: "4 850 000 €",
    rooms: 7,
    bedrooms: 5,
    area: 310,
    image: facade,
    gallery: [facade, salon, cuisine, suite, piscine],
    summary: "Une architecture méditerranéenne contemporaine ouverte sur un jardin confidentiel et sa piscine.",
    features: ["Piscine", "Vue dégagée", "Jardin paysager", "Garage double"],
  },
  {
    id: "appartement-croisette-cannes",
    transaction: "vente",
    city: "Cannes",
    district: "Croisette",
    type: "Appartement",
    name: "Appartement Riviera",
    price: 1950000,
    priceLabel: "1 950 000 €",
    rooms: 4,
    bedrooms: 3,
    area: 142,
    image: salon,
    gallery: [salon, cuisine, suite, bain, entree],
    summary: "Un appartement traversant aux volumes lumineux, à quelques pas de la mer et des adresses emblématiques.",
    features: ["Terrasse", "Aperçu mer", "Conciergerie", "Parking"],
  },
  {
    id: "bastide-des-oliviers-mougins",
    transaction: "vente",
    city: "Mougins",
    district: "Village",
    type: "Maison",
    name: "Bastide des Oliviers",
    price: 3250000,
    priceLabel: "3 250 000 €",
    rooms: 8,
    bedrooms: 6,
    area: 380,
    image: suite,
    gallery: [suite, entree, salon, cuisine, piscine],
    summary: "Une bastide chaleureuse posée au cœur d’un parc arboré, pensée pour recevoir en toute intimité.",
    features: ["Parc 4 000 m²", "Maison d’amis", "Piscine", "Cheminée"],
  },
  {
    id: "penthouse-port-antibes",
    transaction: "vente",
    city: "Antibes",
    district: "Port Vauban",
    type: "Appartement",
    name: "Penthouse Vauban",
    price: 2400000,
    priceLabel: "2 400 000 €",
    rooms: 5,
    bedrooms: 3,
    area: 168,
    image: cuisine,
    gallery: [cuisine, salon, suite, bain, piscine],
    summary: "Un dernier étage précis et graphique prolongé par une terrasse panoramique au-dessus du port.",
    features: ["Toit-terrasse", "Ascenseur privé", "Port à pied", "Deux garages"],
  },
  {
    id: "maison-cap-ferrat-location",
    transaction: "location",
    city: "Saint-Jean-Cap-Ferrat",
    district: "Presqu’île",
    type: "Villa",
    name: "Maison Azurée",
    price: 14500,
    priceLabel: "14 500 € / mois",
    rooms: 6,
    bedrooms: 4,
    area: 260,
    image: piscine,
    gallery: [piscine, facade, salon, suite, bain],
    summary: "Une adresse saisonnière élégante entre pins et Méditerranée, avec service sur demande.",
    features: ["Location meublée", "Piscine chauffée", "Accès mer", "Gardien"],
  },
  {
    id: "loft-centre-nice-location",
    transaction: "location",
    city: "Nice",
    district: "Carré d’Or",
    type: "Appartement",
    name: "Loft Masséna",
    price: 4200,
    priceLabel: "4 200 € / mois",
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