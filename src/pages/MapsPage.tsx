import { useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WildlifeMap, { wildlifeData, WildlifeSpecies } from "@/components/WildlifeMap";
import NationalParkMaps from "@/components/NationalParkMaps";
import { MapPin, Filter, Info, X } from "lucide-react";

const wildlifeCategories = [
  { pageid: 9466823, title: "Wildlife of India" },
  { pageid: 11088470, title: "Wildlife of Karnataka" },
  { pageid: 3794812, title: "Wildlife of Kerala" },
  { pageid: 5430700, title: "Wildlife of Ladakh" },
  { pageid: 69563887, title: "Wildlife of Punjab, India" },
  { pageid: 49276011, title: "List of Indian states by wildlife population" },
  { pageid: 12523134, title: "Wildlife of Tamil Nadu" },
  { pageid: 69144916, title: "Tegenaria comstocki" },
  { pageid: 34511771, title: "Category:Wildlife conservation in India" },
  { pageid: 54683383, title: "Category:Hunting in India" },
  { pageid: 52317974, title: "Category:Indian wildlife photographers" },
  { pageid: 50899388, title: "Category:Wildlife of Rajasthan" },
  { pageid: 52913142, title: "Category:Wildlife of Uttarakhand" },
];

const wikiHighlightedAnimals = [
  "Bengal_tiger",
  "Asiatic_lion",
  "Indian_elephant",
  "Indian_rhinoceros",
  "Snow_leopard",
  "Red_panda",
  "Gharial",
  "Indian_leopard",
  "Sloth_bear",
  "Wild_water_buffalo",
  "Lion-tailed_macaque",
  "Indian_giant_squirrel",
  "Indian_peafowl",
  "Ganges_river_dolphin",
  "King_cobra",
  "Great_hornbill",
  "Olive_ridley_sea_turtle",
  "Mugger_crocodile",
  "Indian_wolf",
];

const fetchGbifRecords = async () => {
  const response = await fetch("https://api.gbif.org/v1/occurrence/search?country=IN&limit=50");
  if (!response.ok) {
    throw new Error("Failed to load GBIF occurrences");
  }
  const payload = await response.json();
  return payload.results ?? [];
};

const fetchWikiSummary = async (slug: string) => {
  const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(slug)}`);
  if (!response.ok) {
    throw new Error("Unable to load Wikipedia summary");
  }
  return response.json();
};

const MapsPage = () => {
  const [selectedSpecies, setSelectedSpecies] = useState<WildlifeSpecies | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Species", icon: "🌍", count: wildlifeData.length },
    { id: "mammals", label: "Mammals", icon: "🐯", count: wildlifeData.filter(s => s.category === "mammals").length },
    { id: "birds", label: "Birds", icon: "🦅", count: wildlifeData.filter(s => s.category === "birds").length },
    { id: "reptiles", label: "Reptiles", icon: "🐊", count: wildlifeData.filter(s => s.category === "reptiles").length },
    { id: "marine", label: "Marine", icon: "🐋", count: wildlifeData.filter(s => s.category === "marine").length },
  ];

  // Get unique species names for legend
  const uniqueSpecies = Array.from(new Set(wildlifeData.map(s => s.name))).map(name => {
    const species = wildlifeData.find(s => s.name === name);
    return { name, icon: species?.icon, color: species?.color };
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Critically Endangered": return "#DC2626";
      case "Endangered": return "#EA580C";
      case "Vulnerable": return "#CA8A04";
      case "Near Threatened": return "#65A30D";
      case "Least Concern": return "#16A34A";
      default: return "#6B7280";
    }
  };

  const gbifQuery = useQuery({
    queryKey: ["gbif", "india", "occurrences"],
    queryFn: fetchGbifRecords,
    staleTime: 1000 * 60 * 3,
    refetchInterval: 1000 * 60 * 5,
  });

  const wikiQueries = useQueries({
    queries: wikiHighlightedAnimals.map((animal) => ({
      queryKey: ["wiki", animal],
      queryFn: () => fetchWikiSummary(animal),
      staleTime: 1000 * 60 * 5,
    })),
  });

  const wikiCards = wikiQueries
    .map((result, index) => ({ ...result, slug: wikiHighlightedAnimals[index] }))
    .filter((card) => !!card.data);

  const gbifRecords = gbifQuery.data ?? [];
  const gbifSpeciesUnique = new Set(
    gbifRecords
      .map((record) => record.scientificName || record.vernacularName)
      .filter(Boolean),
  ).size;
  const wikiLoading = wikiQueries.some((query) => query.isLoading);
  const wikiError = wikiQueries.some((query) => query.isError);
  const speciesWikiMapping: Record<string, string> = {
    "Bengal Tiger": "Bengal_tiger",
    "Asiatic Lion": "Asiatic_lion",
    "Indian Elephant": "Indian_elephant",
    "Greater One-Horned Rhino": "Indian_rhinoceros",
    "Snow Leopard": "Snow_leopard",
    "Red Panda": "Red_panda",
    "Gharial": "Gharial",
    "Indian Leopard": "Indian_leopard",
    "Sloth Bear": "Sloth_bear",
    "Wild Water Buffalo": "Wild_water_buffalo",
    "Golden Langur": "Lion-tailed_macaque",
    "Indian Peafowl": "Indian_peafowl",
    "Ganges River Dolphin": "Ganges_river_dolphin",
    "King Cobra": "King_cobra",
    "Great Hornbill": "Great_hornbill",
    "Olive Ridley Turtle": "Olive_ridley_sea_turtle",
    "Mugger Crocodile": "Mugger_crocodile",
    "Indian Wolf": "Indian_wolf",
  };

  const wikiSummariesBySlug = wikiCards.reduce<Record<string, any>>((acc, card) => {
    if (card.slug && card.data) {
      acc[card.slug] = card.data;
    }
    return acc;
  }, {});

  const speciesImages = Object.fromEntries(
    Object.entries(speciesWikiMapping).map(([speciesName, slug]) => [
      speciesName,
      wikiSummariesBySlug[slug]?.thumbnail?.source,
    ]),
  );

  const photographyList = Object.entries(speciesImages)
    .map(([name, src]) => ({
      name,
      src,
      slug: speciesWikiMapping[name],
    }))
    .filter((item) => item.src)
    .slice(0, 8);

  const displayWikiCards = wikiCards.slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-8 px-6 bg-jungle-dark">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-jungle-canopy uppercase tracking-[0.3em] text-sm mb-4">
              Conservation Intelligence Dashboard
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-ivory mb-6">
              Wildlife Maps
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Explore India's wildlife distribution with our interactive map showing species locations, 
              populations, and conservation status across the subcontinent.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative h-[80vh] bg-jungle-darkest">
        <div className="absolute inset-0 flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-80 bg-jungle-dark border-b md:border-b-0 md:border-r border-jungle-medium/30 p-4 md:p-6 overflow-y-auto z-10 max-h-[30vh] md:max-h-full">
            {/* Filters */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={16} className="text-jungle-canopy" />
                <h3 className="text-ivory font-semibold uppercase tracking-wider text-sm">
                  Filter Species
                </h3>
              </div>
              <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFilter(cat.id)}
                    className={`flex-shrink-0 text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                      filter === cat.id
                        ? "bg-jungle-amazon text-ivory"
                        : "bg-jungle-deep text-muted-foreground hover:bg-jungle-medium"
                    }`}
                  >
                    <span className="text-lg">{cat.icon}</span>
                    <span className="text-sm whitespace-nowrap">{cat.label}</span>
                    <span className="ml-auto text-xs bg-jungle-darkest/50 px-2 py-0.5">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hotspots List */}
            <div className="hidden md:block mt-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={16} className="text-jungle-canopy" />
                <h3 className="text-ivory font-semibold uppercase tracking-wider text-sm">
                  Quick Access
                </h3>
              </div>
              <div className="space-y-1 max-h-[200px] overflow-y-auto">
                {wildlifeData.slice(0, 8).map((species, index) => (
                  <motion.button
                    key={species.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => setSelectedSpecies(species)}
                    className={`w-full text-left px-3 py-2 transition-colors flex items-center gap-2 ${
                      selectedSpecies?.id === species.id
                        ? "bg-jungle-amazon border-l-2 border-jungle-canopy"
                        : "bg-jungle-deep hover:bg-jungle-medium"
                    }`}
                  >
                    <span className="text-sm">{species.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-ivory text-xs font-medium truncate">{species.name}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{species.location}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="hidden md:block mt-6">
              <div className="flex items-center gap-2 mb-4">
                <Info size={16} className="text-jungle-canopy" />
                <h3 className="text-ivory font-semibold uppercase tracking-wider text-sm">
                  Species Legend
                </h3>
              </div>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {uniqueSpecies.slice(0, 10).map((species, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 bg-jungle-deep"
                  >
                    <span 
                      className="w-6 h-6 flex items-center justify-center text-sm"
                      style={{ backgroundColor: species.color }}
                    >
                      {species.icon}
                    </span>
                    <span className="text-xs text-ivory">{species.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="flex-1 relative h-[50vh] md:h-full">
            <WildlifeMap
              filter={filter}
              onSpeciesSelect={setSelectedSpecies}
              selectedSpecies={selectedSpecies}
              gbifRecords={gbifRecords}
              speciesImages={speciesImages}
            />

            {/* Selected Species Info Panel */}
            {selectedSpecies && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-jungle-dark/95 backdrop-blur-sm border border-jungle-medium/30 p-5 z-[1000]"
              >
                <button
                  onClick={() => setSelectedSpecies(null)}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-ivory transition-colors"
                >
                  <X size={18} />
                </button>
                
                <div className="flex items-start gap-3 mb-4">
                  <span 
                    className="w-12 h-12 flex items-center justify-center text-2xl"
                    style={{ backgroundColor: selectedSpecies.color }}
                  >
                    {selectedSpecies.icon}
                  </span>
                  <div>
                    <h4 className="font-display text-xl text-ivory">
                      {selectedSpecies.name}
                    </h4>
                    <p className="text-xs italic text-muted-foreground">
                      {selectedSpecies.scientificName}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-jungle-deep p-3">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Location</p>
                    <p className="text-sm text-ivory">{selectedSpecies.location}</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-1 bg-jungle-deep p-3">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Population</p>
                      <p className="text-2xl font-display text-ivory">
                        ~{selectedSpecies.population.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex-1 bg-jungle-deep p-3">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Status</p>
                      <span 
                        className="inline-block px-2 py-1 text-xs font-medium text-white mt-1"
                        style={{ backgroundColor: getStatusColor(selectedSpecies.status) }}
                      >
                        {selectedSpecies.status}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Map Controls Legend */}
            <div className="absolute top-4 left-4 bg-jungle-dark/90 backdrop-blur-sm border border-jungle-medium/30 p-3 z-[1000] hidden md:block">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Conservation Status</p>
              <div className="space-y-1">
                {["Critically Endangered", "Endangered", "Vulnerable", "Near Threatened", "Least Concern"].map(status => (
                  <div key={status} className="flex items-center gap-2">
                    <span 
                      className="w-3 h-3"
                      style={{ backgroundColor: getStatusColor(status) }}
                    />
                    <span className="text-[10px] text-ivory">{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated National Park Maps */}
      <NationalParkMaps />

      {/* Live GBIF Feed */}
      <section className="py-12 px-6 bg-jungle-darkest border-t border-jungle-medium/20">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-2">
                Live Data
              </p>
              <h2 className="text-3xl font-display text-ivory">GBIF Occurrence Stream</h2>
            </div>
            <div className="text-sm text-muted-foreground flex gap-4 flex-wrap">
              <span>Records: {gbifRecords.length}</span>
              <span>Species covered: {gbifSpeciesUnique}</span>
              <span>Updated every 5 min</span>
            </div>
          </div>
          {gbifQuery.isLoading && (
            <p className="text-sm text-muted-foreground">Fetching the latest 50 occurrences...</p>
          )}
          {gbifQuery.error && (
            <p className="text-sm text-rose-400">
              Unable to load occurrence stream. The API responded with:{" "}
              {(gbifQuery.error as Error).message}
            </p>
          )}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gbifRecords.slice(0, 6).map((record) => (
              <article key={record.key} className="bg-jungle-deep p-4 border border-jungle-medium/20 rounded-md">
                <p className="text-xs text-muted-foreground uppercase tracking-[0.3em] mb-2">
                  GBIF ID {record.key}
                </p>
                <h3 className="text-lg text-ivory font-display mb-1">
                  {record.vernacularName || record.scientificName || "Unnamed occurrence"}
                </h3>
                <p className="text-[11px] text-muted-foreground italic mb-2">
                  {record.scientificName && <span>{record.scientificName}</span>}
                </p>
                <p className="text-xs text-muted-foreground mb-1">
                  Location: {record.locality || record.country || "Coordinates not disclosed"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Coordinates:{" "}
                  {record.decimalLatitude && record.decimalLongitude
                    ? `${record.decimalLatitude.toFixed(3)}, ${record.decimalLongitude.toFixed(3)}`
                    : "unlisted"}
                </p>
                {record.eventDate && (
                  <p className="text-xs text-muted-foreground">Date: {record.eventDate}</p>
                )}
                <a
                  href={record.references}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-jungle-canopy hover:underline mt-2 inline-block"
                >
                  View record
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Wikipedia Spotlight & Category Links */}
      <section className="py-12 px-6 bg-jungle-deep border-t border-jungle-medium/20">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-2">
                Wikipedia spotlights
              </p>
              <h2 className="text-3xl font-display text-ivory">Photography + Species Summaries</h2>
            </div>
            {wikiLoading && (
              <p className="text-sm text-muted-foreground">Loading curated animal summaries...</p>
            )}
            {wikiError && (
              <p className="text-sm text-rose-400">
                Some summaries could not be fetched—Wikipedia may be rate limiting right now.
              </p>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {displayWikiCards.map((card) => (
              <article
                key={card.slug}
                className="bg-jungle-dark border border-jungle-medium/30 rounded-lg overflow-hidden flex flex-col"
              >
                {card.data?.thumbnail?.source ? (
                  <img
                    src={card.data.thumbnail.source}
                    alt={card.data.title}
                    className="w-full h-44 object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-44 w-full bg-jungle-deep flex items-center justify-center text-xs text-muted-foreground">
                    No preview
                  </div>
                )}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg text-ivory font-display mb-1">{card.data?.title}</h3>
                  {card.data?.description && (
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
                      {card.data.description}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground flex-1 overflow-hidden">
                    {card.data?.extract?.slice(0, 180)}…
                  </p>
                  <a
                    href={card.data?.content_urls?.desktop?.page}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 text-sm text-jungle-canopy hover:underline"
                  >
                    Read more
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-3">
              Rich category resources
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {wildlifeCategories.map((category) => (
                <a
                  key={category.pageid}
                  href={`https://en.wikipedia.org/wiki/${encodeURIComponent(category.title.replace(/ /g, "_"))}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block bg-jungle-dark border border-jungle-medium/30 p-4 rounded-md hover:border-jungle-canopy transition"
                >
                  <p className="text-sm text-ivory font-medium leading-snug">{category.title}</p>
                  <p className="text-xs text-muted-foreground mt-2">Page ID {category.pageid}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Photography Gallery */}
      <section className="py-10 px-6 bg-jungle-darkest border-t border-jungle-medium/20">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-2">
                Photography
              </p>
              <h2 className="text-3xl font-display text-ivory">Real Animal Imagery</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Pulled from the exact Wikipedia summaries powering this page.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {photographyList.map((item) => (
              <figure
                key={item.name}
                className="bg-jungle-deep border border-jungle-medium/30 rounded-lg overflow-hidden flex flex-col"
              >
                <img
                  src={item.src}
                  alt={item.name}
                  className="w-full h-40 object-cover"
                  loading="lazy"
                />
                <figcaption className="p-3 text-center text-sm text-ivory">
                  <a
                    href={`https://en.wikipedia.org/wiki/${item.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-jungle-canopy transition-colors font-semibold"
                  >
                    {item.name}
                  </a>
                </figcaption>
              </figure>
            ))}
            {photographyList.length === 0 && (
              <p className="text-sm text-muted-foreground col-span-full">
                Photographs are loading – please give the summaries a moment to resolve.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 px-6 bg-jungle-deep border-y border-jungle-medium/30">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { label: "Species Tracked", value: wildlifeData.length.toString() },
            { label: "Locations Mapped", value: new Set(wildlifeData.map(s => s.location)).size.toString() },
            { label: "Endangered Species", value: wildlifeData.filter(s => s.status === "Endangered" || s.status === "Critically Endangered").length.toString() },
            { label: "Total Population", value: "~" + (wildlifeData.reduce((acc, s) => acc + s.population, 0) / 1000).toFixed(0) + "K" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-display text-ivory">{stat.value}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MapsPage;
