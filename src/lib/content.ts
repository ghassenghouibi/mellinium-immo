import type { L } from "./i18n";

/** Textes de présentation de l’agence, repris de la brochure « About Mellinium Immobilière ». */

export const about = {
  eyebrow: { fr: "À propos de Mellinium Immobilière", en: "About Mellinium Immobilière" },
  title: { fr: "Une agence tunisienne,", en: "A Tunisian agency," },
  accent: { fr: "un service sur mesure.", en: "a tailored service." },
  paragraphs: [
    {
      fr: "Mellinium Immobilière est une agence immobilière basée à La Marsa, spécialisée dans les biens résidentiels haut de gamme et les services immobiliers personnalisés pour une clientèle locale et internationale.",
      en: "Mellinium Immobilière is a Tunisia-based real estate agency located in La Marsa, specializing in premium residential properties and personalized real estate services for local and international clients.",
    },
    {
      fr: "Nous accompagnons nos clients dans la recherche du bien qui correspond à leur mode de vie, à leurs exigences professionnelles et à leurs attentes, avec un accompagnement personnalisé tout au long du parcours immobilier.",
      en: "We assist our clients in finding the right property according to their lifestyle, professional requirements and expectations, while providing personalized guidance throughout the real estate process.",
    },
    {
      fr: "Notre approche associe une solide connaissance du marché local, des biens soigneusement sélectionnés, la discrétion, la réactivité et un suivi professionnel.",
      en: "Our approach combines strong local market knowledge, carefully selected properties, discretion, responsiveness and professional follow-up.",
    },
  ] satisfies L[],
  commitmentTitle: { fr: "Notre engagement", en: "Our commitment" },
  commitment: {
    fr: "Être un partenaire local de confiance pour nos clients, en offrant une expérience immobilière fluide, discrète et personnalisée en Tunisie — de la première recherche jusqu’à la finalisation de la transaction.",
    en: "To be a trusted local partner for our clients, providing a smooth, discreet and personalized real estate experience in Tunisia — from the initial property search to the completion of the transaction.",
  },
} as const;

export const approach: L[] = [
  { fr: "Discret", en: "Discreet" },
  { fr: "Réactif", en: "Responsive" },
  { fr: "Personnalisé", en: "Personalized" },
  { fr: "Professionnel", en: "Professional" },
];

export type ServiceId = "rental" | "sales" | "search" | "visits" | "relocation" | "management";

export const servicesIntro = {
  eyebrow: { fr: "Nos services", en: "Our services" },
  title: { fr: "Des solutions immobilières", en: "Personalized" },
  accent: { fr: "personnalisées.", en: "real estate solutions." },
  text: {
    fr: "Chez Mellinium Immobilière, nous proposons des services immobiliers personnalisés pensés pour les clients internationaux, expatriés, diplomates et professionnels qui s’installent en Tunisie.",
    en: "At Mellinium Immobilière, we provide personalized real estate services designed to meet the needs of international clients, expatriates, diplomats and professionals relocating to Tunisia.",
  },
} as const;

export const services: { id: ServiceId; title: L; text: L }[] = [
  {
    id: "rental",
    title: { fr: "Location résidentielle", en: "Residential rental" },
    text: {
      fr: "Des biens meublés et non meublés soigneusement sélectionnés dans les quartiers résidentiels prisés, selon les exigences, le budget et le mode de vie du client.",
      en: "Carefully selected furnished and unfurnished properties in premium residential areas, according to the client’s requirements, budget and lifestyle.",
    },
  },
  {
    id: "sales",
    title: { fr: "Vente de biens", en: "Property sales" },
    text: {
      fr: "Une sélection choisie de biens résidentiels pour les clients qui souhaitent investir ou s’établir durablement en Tunisie.",
      en: "A curated selection of residential properties for clients looking to invest or establish a long-term presence in Tunisia.",
    },
  },
  {
    id: "search",
    title: { fr: "Recherche & sélection", en: "Property search & selection" },
    text: {
      fr: "Nous identifions les biens adaptés selon l’emplacement, les caractéristiques, le budget et les besoins de chacun, pour faire gagner un temps précieux à nos clients.",
      en: "We identify suitable properties based on location, specifications, budget and individual requirements, saving our clients valuable time.",
    },
  },
  {
    id: "visits",
    title: { fr: "Visites & négociation", en: "Property visits & negotiation" },
    text: {
      fr: "Nous organisons les visites et accompagnons nos clients pendant toute la négociation, pour une communication claire et professionnelle avec les propriétaires.",
      en: "We organize property visits and assist our clients throughout the negotiation process to ensure clear and professional communication with property owners.",
    },
  },
  {
    id: "relocation",
    title: { fr: "Aide à la relocation", en: "Relocation assistance" },
    text: {
      fr: "Un soutien local pour les clients internationaux qui s’installent en Tunisie, de la recherche du logement aux démarches pratiques de leur installation.",
      en: "Local support for international clients settling in Tunisia, from finding suitable accommodation to facilitating the practical steps of their relocation.",
    },
  },
  {
    id: "management",
    title: { fr: "Gestion de biens", en: "Property management" },
    text: {
      fr: "Un suivi et une coordination professionnels pour les propriétaires qui ont besoin d’un partenaire local de confiance pour gérer leur bien.",
      en: "Professional follow-up and coordination for property owners who require a trusted local partner to manage their property.",
    },
  },
];

export const whyUs = {
  eyebrow: { fr: "Pourquoi Mellinium Immobilière ?", en: "Why Mellinium Immobilière?" },
  title: { fr: "Un partenaire local de confiance", en: "A trusted local partner" },
  accent: { fr: "pour les clients internationaux.", en: "for international clients." },
  intro: [
    {
      fr: "Choisir un logement dans un nouveau pays demande plus que trouver un bien. Il faut une connaissance du terrain, de la fiabilité, de la réactivité et une compréhension claire des besoins de chaque client.",
      en: "Choosing a home in a new country requires more than finding a property. It requires local knowledge, reliability, responsiveness and a clear understanding of each client’s needs.",
    },
    {
      fr: "Nous offrons un service personnalisé qui rend la location ou l’achat plus simple, plus fluide et plus efficace pour les clients internationaux et diplomatiques.",
      en: "We provide a personalized service designed to make the rental or purchase process easier, smoother and more efficient for international and diplomatic clients.",
    },
  ] satisfies L[],
  reasonsTitle: { fr: "Pourquoi travailler avec nous ?", en: "Why work with us?" },
  reasons: [
    { title: { fr: "Expertise locale", en: "Local expertise" }, text: { fr: "Une solide connaissance des banlieues nord du Grand Tunis et de ses quartiers résidentiels prisés.", en: "Strong knowledge of the Northern suburbs of Greater Tunis and its premium residential areas." } },
    { title: { fr: "Sélection personnalisée", en: "Personalized property selection" }, text: { fr: "Nous sélectionnons avec soin les biens à louer ou à acheter selon l’emplacement, le budget, le mode de vie et les exigences de chacun.", en: "We carefully select rental and purchase properties according to location, budget, lifestyle and specific requirements." } },
    { title: { fr: "Gain de temps", en: "Time efficiency" }, text: { fr: "Nous réduisons le temps de recherche en présentant uniquement des biens qui correspondent aux critères du client.", en: "We reduce the time spent searching by presenting relevant properties that match the client’s criteria." } },
    { title: { fr: "Négociation professionnelle", en: "Professional negotiation" }, text: { fr: "Nous facilitons la communication avec les propriétaires et vous assistons tout au long de la négociation.", en: "We facilitate communication with property owners and assist throughout the negotiation process." } },
    { title: { fr: "Discrétion & confidentialité", en: "Discretion & confidentiality" }, text: { fr: "Nous mesurons l’importance de la confidentialité et du professionnalisme auprès des clients diplomatiques et internationaux.", en: "We understand the importance of privacy and professionalism when assisting diplomatic and international clients." } },
    { title: { fr: "Suivi continu", en: "Continuous follow-up" }, text: { fr: "Notre rôle ne s’arrête pas à la visite. Nous restons disponibles pour vous accompagner et coordonner tout le processus de location ou d’achat.", en: "Our role does not end with the property visit. We remain available to assist and coordinate throughout the rental or purchase process." } },
  ] satisfies { title: L; text: L }[],
  promiseTitle: { fr: "Notre promesse", en: "Our promise" },
  promise: { fr: "Un service local professionnel, discret et fiable — adapté à chaque client.", en: "A professional, discreet and reliable local service — tailored to every client." },
} as const;

export const areasIntro = {
  eyebrow: { fr: "Les quartiers couverts", en: "Areas we cover" },
  title: { fr: "Les quartiers résidentiels", en: "Premium residential areas" },
  accent: { fr: "prisés du Grand Tunis.", en: "of Greater Tunis." },
  text: {
    fr: "Mellinium Immobilière intervient principalement dans les banlieues nord du Grand Tunis, avec des biens résidentiels soigneusement sélectionnés dans les quartiers les plus recherchés de la capitale.",
    en: "Mellinium Immobilière operates primarily across the Northern suburbs of Greater Tunis, offering carefully selected residential properties in some of the capital’s most sought-after areas.",
  },
  note: {
    fr: "Notre présence locale et notre connaissance de ces quartiers nous permettent d’orienter les clients internationaux et diplomatiques vers les emplacements qui conviennent le mieux à leurs besoins professionnels et personnels.",
    en: "Our local presence and knowledge of these areas allow us to guide international and diplomatic clients toward locations that best suit their professional and personal needs.",
  },
  motto: { fr: "L’emplacement compte.", en: "Location matters." },
  mottoSub: { fr: "Nous vous aidons à trouver le lieu où vous sentir chez vous.", en: "We help you find the right place to call home." },
} as const;

export const diplomatic = {
  eyebrow: { fr: "Clients diplomatiques & internationaux", en: "Diplomatic & international client services" },
  title: { fr: "Un accompagnement logement", en: "Personalized housing" },
  accent: { fr: "personnalisé en Tunisie.", en: "assistance in Tunisia." },
  paragraphs: [
    {
      fr: "Nous savons que les clients diplomatiques et internationaux ont des attentes spécifiques lorsqu’ils cherchent un logement en Tunisie.",
      en: "We understand that diplomatic and international clients have specific expectations when looking for accommodation in Tunisia.",
    },
    {
      fr: "Nous proposons un service dédié et discret, conçu pour simplifier la recherche de logement et offrir des solutions soigneusement sélectionnées.",
      en: "We offer a dedicated and discreet service designed to simplify the housing process and provide carefully selected solutions.",
    },
  ] satisfies L[],
  listTitle: { fr: "Nos services comprennent", en: "Our services include" },
  list: [
    { fr: "Locations résidentielles meublées et non meublées", en: "Furnished & unfurnished residential rentals" },
    { fr: "Logement résidentiel de longue durée", en: "Long-term residential accommodation" },
    { fr: "Sélection de biens selon des exigences précises", en: "Property selection based on specific requirements" },
    { fr: "Organisation de visites privées", en: "Organization of private property visits" },
    { fr: "Communication professionnelle avec les propriétaires", en: "Professional communication with property owners" },
    { fr: "Assistance dans la négociation des loyers", en: "Assistance with rental negotiations" },
    { fr: "Opportunités d’achat résidentiel", en: "Residential property purchase opportunities" },
    { fr: "Accompagnement local tout au long de la relocation", en: "Local guidance throughout the relocation process" },
    { fr: "Suivi continu si nécessaire", en: "Continued follow-up when required" },
  ] satisfies L[],
  priorityTitle: { fr: "Notre priorité", en: "Our priority" },
  priority: {
    fr: "Offrir une expérience de logement fluide, discrète et efficace, dans le respect de la vie privée, des exigences et de l’agenda professionnel de chaque client.",
    en: "To provide a smooth, discreet and efficient housing experience, while respecting each client’s privacy, requirements and professional schedule.",
  },
  closing: { fr: "Un partenaire local pour une installation sans accroc en Tunisie.", en: "A local partner for a seamless experience in Tunisia." },
} as const;

export const closing = {
  eyebrow: { fr: "Au plaisir de collaborer", en: "Looking forward to working together" },
  paragraphs: [
    {
      fr: "Chez Mellinium Immobilière, nous croyons qu’un service immobilier réussi commence par la confiance, la compréhension et un réel engagement envers les besoins de nos clients.",
      en: "At Mellinium Immobilière, we believe that a successful real estate service begins with trust, understanding and a genuine commitment to our clients’ needs.",
    },
    {
      fr: "Ambassades, organisations internationales, entreprises ou particuliers : que ce soit pour une location, un achat ou la recherche du bon logement, notre équipe s’engage à offrir un service discret, réactif et personnalisé.",
      en: "Embassies, international organisations, companies or private clients: whether for a rental, a property purchase, or assistance in finding the right home, our team is committed to providing a discreet, responsive and personalized service.",
    },
  ] satisfies L[],
  signoff: { fr: "Nous serions ravis d’établir avec vous une collaboration professionnelle et durable.", en: "We look forward to the opportunity to establish a professional and lasting collaboration." },
} as const;
