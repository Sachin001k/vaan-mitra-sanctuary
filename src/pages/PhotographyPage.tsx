import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { X, MapPin } from "lucide-react";
import { useQueries } from "@tanstack/react-query";

const photoSpecies = [
  { id: 1, species: "Bengal Tiger", slug: "Bengal_tiger", location: "Jim Corbett National Park" },
  { id: 2, species: "Asian Elephant", slug: "Indian_elephant", location: "Kaziranga National Park" },
  { id: 3, species: "Crested Serpent Eagle", slug: "Crested_serpent_eagle", location: "Western Ghats" },
  { id: 4, species: "Greater One-Horned Rhino", slug: "Indian_rhinoceros", location: "Kaziranga, Assam" },
  { id: 5, species: "Snow Leopard", slug: "Snow_leopard", location: "Hemis, Ladakh" },
  { id: 6, species: "Gray Langur", slug: "Gray_langur", location: "Ranthambore" },
  { id: 7, species: "Tropical Rainforest", slug: "Tropical_rainforest", location: "Western Ghats" },
  { id: 8, species: "King Cobra", slug: "King_cobra", location: "South India" },
  { id: 9, species: "Sloth Bear", slug: "Sloth_bear", location: "Satpura Tiger Reserve" },
];

const fetchWikiSummary = async (slug: string) => {
  const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(slug)}`);
  if (!response.ok) {
    throw new Error("Unable to fetch wiki summary");
  }
  return response.json();
};

const PhotographyPage = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<null | (typeof photoSpecies)[0] & { thumbnail?: string }>(
    null,
  );

  const wikiQueries = useQueries({
    queries: photoSpecies.map((shot) => ({
      queryKey: ["photo", shot.slug],
      queryFn: () => fetchWikiSummary(shot.slug),
      staleTime: 1000 * 60 * 10,
    })),
  });

  const enrichedPhotos = photoSpecies.map((photo, index) => ({
    ...photo,
    thumbnail: wikiQueries[index]?.data?.thumbnail?.source,
    photographer: "Vaan Mitra Team",
  }));

  return (
    <div className="min-h-screen bg-jungle-darkest">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6 bg-jungle-dark">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-jungle-canopy uppercase tracking-[0.3em] text-sm mb-4">
              Through the Lens
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-ivory mb-6">
              Wildlife Photography
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Capturing the raw beauty and spirit of India's wildlife. Every 
              photograph tells a story of survival, hope, and the urgent need 
              for conservation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Wikipedia-sourced imagery
            </p>
            {wikiQueries.some((query) => query.isLoading) && (
              <p className="text-xs text-muted-foreground">Loading imagery…</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {enrichedPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedPhoto(photo)}
                className="relative aspect-square cursor-pointer group overflow-hidden"
              >
                {photo.thumbnail ? (
                  <img
                    src={photo.thumbnail}
                    alt={photo.species}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-jungle-dark via-jungle-darkest to-jungle-deep flex items-center justify-center text-xs text-muted-foreground">
                    Image pending…
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-jungle-darkest/0 group-hover:bg-jungle-darkest/70 transition-all duration-300 flex items-end">
                  <div className="p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-display text-xl text-ivory">{photo.species}</h3>
                    <p className="text-jungle-canopy text-sm flex items-center gap-1 mt-1">
                      <MapPin size={14} />
                      {photo.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-jungle-darkest/95 flex items-center justify-center p-6"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute -top-12 right-0 p-2 text-ivory hover:text-jungle-canopy transition-colors"
                >
                  <X size={32} />
                </button>
                
                {selectedPhoto.thumbnail ? (
                  <img
                    src={selectedPhoto.thumbnail}
                    alt={selectedPhoto.species}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                ) : (
                  <div className="w-full h-auto max-h-[70vh] flex items-center justify-center bg-jungle-dark text-xs text-muted-foreground">
                    Image coming from Wikipedia…
                  </div>
                )}
                
                <div className="bg-jungle-dark p-6 mt-0">
                  <h3 className="font-display text-2xl text-ivory">
                    {selectedPhoto.species}
                  </h3>
                  <div className="flex flex-wrap gap-6 mt-2 text-sm">
                    <p className="text-muted-foreground flex items-center gap-2">
                      <MapPin size={16} className="text-jungle-canopy" />
                      {selectedPhoto.location}
                    </p>
                    <p className="text-muted-foreground">
                      📷 {selectedPhoto.photographer}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    <Footer />
  </div>
);
};

export default PhotographyPage;
