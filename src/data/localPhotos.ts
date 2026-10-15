export type PhotoPortfolioEntry = {
  id: number;
  species: string;
  summary: string;
  location: string;
  image: string;
};

export type MissionHighlight = {
  year: string;
  title: string;
  description: string;
  image: string;
};

export type FeaturedSpecies = {
  slug: string;
  name: string;
  count: string;
  image: string;
};

export const photoPortfolio: PhotoPortfolioEntry[] = [
  {
    id: 1,
    species: "Bengal Tiger",
    location: "Jim Corbett National Park",
    summary: "Golden stripes glimmer over the marsh during a pre-dawn patrol.",
    image: "/wildlife/bengal-tiger.webp",
  },
  {
    id: 2,
    species: "Asian Elephant",
    location: "Kaziranga National Park",
    summary: "A matriarch leads her herd across a misty river crossing.",
    image: "/wildlife/asian-elephant.webp",
  },
  {
    id: 3,
    species: "Crested Serpent Eagle",
    location: "Western Ghats",
    summary: "Caught mid-soar above the rain-soaked Western Ghats ridges.",
    image: "/wildlife/crested-serpent-eagle.webp",
  },
  {
    id: 4,
    species: "Greater One-Horned Rhino",
    location: "Kaziranga, Assam",
    summary: "Mud-coated guardian grazing along the Brahmaputra floodplains.",
    image: "/wildlife/one-horned-rhino.webp",
  },
  {
    id: 5,
    species: "Snow Leopard",
    location: "Hemis, Ladakh",
    summary: "Silent watchfulness from a rocky ledge in Hemis National Park.",
    image: "/wildlife/snow-leopard.webp",
  },
  {
    id: 6,
    species: "Gray Langur",
    location: "Ranthambore",
    summary: "A family cluster surveys the stone ramparts of Ranthambore fort.",
    image: "/wildlife/gray-langur.webp",
  },
  {
    id: 7,
    species: "Indian Peafowl",
    location: "Central India",
    summary: "India's national bird resting among the forest canopy.",
    image: "/wildlife/indian-peafowl.webp",
  },
  {
    id: 8,
    species: "King Cobra",
    location: "South India",
    summary: "The hood flares as it slithers through a teak plantation.",
    image: "/wildlife/king-cobra.webp",
  },
  {
    id: 9,
    species: "Sloth Bear",
    location: "Satpura Tiger Reserve",
    summary: "Nighttime forager emerging from a thicket of sal trees.",
    image: "/wildlife/sloth-bear.webp",
  },
];

export const missionHighlights: MissionHighlight[] = [
  {
    year: "2024",
    title: "Foundation Established",
    description: "Vann Mitra started as a conservation project with a vision to protect India's wildlife.",
    image: "/wildlife/rainforest.webp",
  },
  {
    year: "2025",
    title: "NGO Registration",
    description: "Officially registered as an NGO, enabling larger-scale conservation efforts.",
    image: "/wildlife/wildlife-conservation.webp",
  },
  {
    year: "2025",
    title: "First Major Rescue",
    description: "Successfully coordinated the rescue of 23 animals from flooding in Assam.",
    image: "/wildlife/animal-rescue.webp",
  },
  {
    year: "2026",
    title: "Tech Initiative Launch",
    description: "Launched an AI-powered monitoring system for early poaching detection.",
    image: "/wildlife/camera-trap.webp",
  },
];

export const featuredSpecies: FeaturedSpecies[] = [
  {
    slug: "Bengal_tiger",
    name: "Bengal Tiger",
    count: "3,167",
    image: "/wildlife/bengal-tiger.webp",
  },
  {
    slug: "Indian_elephant",
    name: "Asian Elephant",
    count: "27,312",
    image: "/wildlife/asian-elephant.webp",
  },
  {
    slug: "Snow_leopard",
    name: "Snow Leopard",
    count: "~7,500",
    image: "/wildlife/snow-leopard.webp",
  },
  {
    slug: "Indian_rhinoceros",
    name: "Greater One-Horned Rhino",
    count: "4,014",
    image: "/wildlife/one-horned-rhino.webp",
  },
  {
    slug: "Asiatic_lion",
    name: "Asiatic Lion",
    count: "891",
    image: "/wildlife/asiatic-lion.webp",
  },
  {
    slug: "Red_panda",
    name: "Red Panda",
    count: "~10,000",
    image: "/wildlife/red-panda.webp",
  },
];
