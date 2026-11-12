import { createFileRoute } from "@tanstack/react-router";
import { EstateExperience } from "@/components/estate/EstateExperience";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Mellinium Immobilière — Real Estate & Relocation Services, La Marsa – Tunisia" },
      { name: "description", content: "Furnished and unfurnished rentals, property sales and relocation assistance for diplomatic and international clients in the Northern suburbs of Greater Tunis." },
      { property: "og:title", content: "Mellinium Immobilière" },
      { property: "og:description", content: "Professional housing solutions for diplomatic & international clients — La Marsa, Tunisia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EstateExperience,
});
