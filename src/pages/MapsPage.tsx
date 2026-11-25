import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import SectionHeader from "@/components/SectionHeader";
import WildlifeMap, { wildlifeData, WildlifeSpecies } from "@/components/WildlifeMap";
import { LANDSCAPE_IMAGES, PARK_MAPS } from "@/data/media";
import { MapPin, Filter, Info, X } from "lucide-react";

// Contextual landscapes from the website master copy. "Programme status" stays
// "Contextual landscape" until Vann Mitra's work in an area is confirmed.
const featuredLandscapes = [
  {
    name: "Central Indian tiger landscapes",
    states: "Madhya Pradesh, Maharashtra and neighbouring states",
    species: "Tiger",
    image: LANDSCAPE_IMAGES.central,
    context: "Habitat mosaics linking forests, agriculture and settlements; movement, land use and livelihoods together shape encounters between people and tigers.",
  },
  {
    name: "Ranthambore landscape",
    states: "Rajasthan",
    species: "Tiger",
    image: LANDSCAPE_IMAGES.ranthambore,
    context: "A case study in the relationship between tourism, livelihoods, habitat edges and tiger conservation.",
  },
  {
    name: "Elephant landscapes",
    states: "Northeastern and central/eastern India",
    species: "Asian elephant",
    image: LANDSCAPE_IMAGES.elephants,
    context: "Seasonal movement and habitat connectivity, and the importance of community alert systems.",
  },
];

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

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Maps — Landscapes of coexistence"
        description="Explore the geography of India's shared landscapes—where forests, settlements, farms and wildlife corridors meet."
        path="/maps"
      />
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
              Maps
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-ivory mb-6">
              Landscapes of coexistence.
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Explore the geography of India's shared landscapes—where forests, settlements, farms and
              wildlife corridors meet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured landscapes */}
      <section className="py-16 px-6 bg-jungle-darkest border-b border-jungle-medium/20">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="Featured landscapes" title="Where people and wildlife share space">
            <p>
              A geographic overview, not a public incident tracker. Landscapes where Vann Mitra has not
              operated are labelled as contextual.
            </p>
          </SectionHeader>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredLandscapes.map((item) => (
              <article key={item.name} className="card-jungle flex flex-col overflow-hidden">
                <figure>
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    loading="lazy"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <figcaption className="sr-only">{item.image.caption}</figcaption>
                </figure>
                <div className="p-8 flex flex-col flex-1">
                <span className="self-start mb-4 px-2 py-1 text-xs uppercase tracking-wider border border-jungle-canopy/60 text-jungle-canopy">
                  Contextual landscape
                </span>
                <h3 className="font-display text-2xl text-ivory mb-2">{item.name}</h3>
                <dl className="text-sm text-muted-foreground mb-4 space-y-1">
                  <div><dt className="inline text-ivory/80">State(s): </dt><dd className="inline">{item.states}</dd></div>
                  <div><dt className="inline text-ivory/80">Focal species: </dt><dd className="inline">{item.species}</dd></div>
                </dl>
                <p className="text-muted-foreground leading-relaxed">{item.context}</p>
                </div>
              </article>
            ))}
          </div>
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

      {/* Park maps supplied by the team */}
      <section className="py-20 px-6 bg-jungle-darkest border-t border-jungle-medium/20">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="Park maps" title="Protected areas up close">
            <p>
              Visitor and sketch maps of protected areas in our featured landscapes. They are shown for
              orientation only and are not authoritative GIS layers.
            </p>
          </SectionHeader>
          <div className="grid md:grid-cols-2 gap-8">
            {PARK_MAPS.map((map) => (
              <figure key={map.src} className="bg-jungle-dark border border-jungle-medium/30">
                <a href={map.src} target="_blank" rel="noreferrer" className="block bg-ivory/95 p-2">
                  <img
                    src={map.src}
                    alt={map.alt}
                    width={map.width}
                    height={map.height}
                    loading="lazy"
                    className="w-full h-auto"
                  />
                </a>
                <figcaption className="p-5">
                  <p className="font-display text-xl text-ivory">{map.park}</p>
                  <p className="text-sm text-muted-foreground">{map.state} · {map.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MapsPage;
