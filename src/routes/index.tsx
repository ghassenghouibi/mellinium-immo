import { createFileRoute } from "@tanstack/react-router";
import { EstateExperience } from "@/components/estate/EstateExperience";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Mellinium Immobilière Housing — Votre projet immobilier" },
      { name: "description", content: "Mellinium Immobilière Housing vous accompagne pour chercher, vendre, estimer et valoriser votre bien immobilier." },
      { property: "og:title", content: "Mellinium Immobilière Housing" },
      { property: "og:description", content: "Une agence engagée à vos côtés pour chercher, vendre et valoriser chaque lieu avec exigence." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EstateExperience,
});
