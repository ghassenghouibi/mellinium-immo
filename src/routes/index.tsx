import { createFileRoute } from "@tanstack/react-router";
import { EstateExperience } from "@/components/estate/EstateExperience";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Villa Soléa — Maison Azur" },
      { name: "description", content: "Visite immersive d’une villa méditerranéenne d’exception à Saint-Tropez." },
      { property: "og:title", content: "Villa Soléa — Maison Azur" },
      { property: "og:description", content: "Découvrez Villa Soléa au fil d’une visite immobilière immersive en 3D." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EstateExperience,
});
