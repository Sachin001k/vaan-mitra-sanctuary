import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GlobeVisualization, { wildlifeHotspots } from "@/components/GlobeVisualization";
import { MapPin, Filter, Layers } from "lucide-react";

const MapsPage = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<typeof wildlifeHotspots[0] | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Species", icon: "🌍" },
    { id: "mammals", label: "Mammals", icon: "🐯" },
    { id: "birds", label: "Birds", icon: "🦅" },
    { id: "reptiles", label: "Reptiles", icon: "🐊" },
    { id: "marine", label: "Marine", icon: "🐋" },
  ];

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
              Global Conservation Intelligence
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-ivory mb-6">
              Wildlife Maps
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Explore our interactive 3D globe showing wildlife distribution, 
              conservation hotspots, and species populations across the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative min-h-[80vh] bg-jungle-darkest">
        <div className="absolute inset-0 flex">
          {/* Sidebar */}
          <div className="w-80 bg-jungle-dark border-r border-jungle-medium/30 p-6 overflow-y-auto z-10">
            {/* Filters */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={16} className="text-jungle-canopy" />
                <h3 className="text-ivory font-semibold uppercase tracking-wider text-sm">
                  Filter Species
                </h3>
              </div>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFilter(cat.id)}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                      filter === cat.id
                        ? "bg-jungle-amazon text-ivory"
                        : "bg-jungle-deep text-muted-foreground hover:bg-jungle-medium"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span className="text-sm">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hotspots List */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={16} className="text-jungle-canopy" />
                <h3 className="text-ivory font-semibold uppercase tracking-wider text-sm">
                  Hotspots
                </h3>
              </div>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {wildlifeHotspots.map((hotspot, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedHotspot(hotspot)}
                    className={`w-full text-left px-4 py-3 transition-colors ${
                      selectedHotspot?.name === hotspot.name
                        ? "bg-jungle-amazon border-l-2 border-jungle-canopy"
                        : "bg-jungle-deep hover:bg-jungle-medium"
                    }`}
                  >
                    <p className="text-ivory text-sm font-medium">{hotspot.name}</p>
                    <p className="text-xs text-muted-foreground">{hotspot.species}</p>
                    <p className="text-xs text-jungle-canopy mt-1">
                      Pop: {hotspot.count.toLocaleString()}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Globe */}
          <div className="flex-1 relative">
            <Suspense
              fallback={
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-jungle-canopy animate-pulse">Loading Globe...</div>
                </div>
              }
            >
              <GlobeVisualization onMarkerClick={setSelectedHotspot} />
            </Suspense>

            {/* Overlay Controls */}
            <div className="absolute top-6 right-6 space-y-2">
              <button className="p-3 bg-jungle-deep hover:bg-jungle-medium transition-colors">
                <Layers size={20} className="text-ivory" />
              </button>
            </div>

            {/* Selected Hotspot Info */}
            {selectedHotspot && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-6 left-6 right-6 md:left-auto md:w-80 bg-jungle-dark/95 backdrop-blur-sm border border-jungle-medium/30 p-6"
              >
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="absolute top-2 right-2 text-muted-foreground hover:text-ivory"
                >
                  ✕
                </button>
                <h4 className="font-display text-2xl text-ivory mb-2">
                  {selectedHotspot.name}
                </h4>
                <p className="text-jungle-canopy font-medium mb-4">
                  {selectedHotspot.species}
                </p>
                <div className="stat-card">
                  <p className="text-xs text-muted-foreground uppercase">Population</p>
                  <p className="text-3xl font-display text-ivory">
                    {selectedHotspot.count.toLocaleString()}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 px-6 bg-jungle-deep border-y border-jungle-medium/30">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { label: "Tracked Species", value: "1,254" },
            { label: "Conservation Zones", value: "847" },
            { label: "Countries Covered", value: "78" },
            { label: "Data Points", value: "2.3M" },
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
