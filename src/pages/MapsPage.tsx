import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WildlifeMap, { wildlifeData, WildlifeSpecies } from "@/components/WildlifeMap";
import { MapPin, Filter, Info, X } from "lucide-react";

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

            {/* Legend */}
            <div className="hidden md:block">
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
