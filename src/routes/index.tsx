import { createFileRoute } from "@tanstack/react-router";
import { EstateExperience } from "@/components/estate/EstateExperience";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Mellinium Immobilière — Agence immobilière de prestige à La Marsa" },
      { name: "description", content: "Villas, maisons et appartements à vendre et à louer à La Marsa, Gammarth et Sidi Abdelaziz. Estimation offerte sous 48 h." },
      { property: "og:title", content: "Mellinium Immobilière Housing" },
      { property: "og:description", content: "Une agence engagée à vos côtés pour chercher, vendre et valoriser chaque lieu avec exigence." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EstateExperience,
});
