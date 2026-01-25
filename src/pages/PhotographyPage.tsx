import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { X, MapPin } from "lucide-react";
import tigerImage from "@/assets/tiger.jpg";
import elephantImage from "@/assets/elephant.jpg";
import eagleImage from "@/assets/eagle.jpg";
import rhinoImage from "@/assets/rhino.jpg";
import snowLeopardImage from "@/assets/snow-leopard.jpg";
import langurImage from "@/assets/langur.jpg";
import heroForest from "@/assets/hero-forest.jpg";

const photos = [
  { id: 1, src: tigerImage, species: "Bengal Tiger", location: "Jim Corbett National Park", photographer: "Vaan Mitra Team" },
  { id: 2, src: elephantImage, species: "Asian Elephant", location: "Kaziranga National Park", photographer: "Vaan Mitra Team" },
  { id: 3, src: eagleImage, species: "Crested Serpent Eagle", location: "Western Ghats", photographer: "Vaan Mitra Team" },
  { id: 4, src: rhinoImage, species: "Greater One-Horned Rhino", location: "Kaziranga, Assam", photographer: "Vaan Mitra Team" },
  { id: 5, src: snowLeopardImage, species: "Snow Leopard", location: "Hemis, Ladakh", photographer: "Vaan Mitra Team" },
  { id: 6, src: langurImage, species: "Gray Langur", location: "Ranthambore", photographer: "Vaan Mitra Team" },
  { id: 7, src: heroForest, species: "Tropical Rainforest", location: "Western Ghats", photographer: "Vaan Mitra Team" },
  { id: 8, src: tigerImage, species: "Bengal Tiger", location: "Sundarbans", photographer: "Vaan Mitra Team" },
  { id: 9, src: elephantImage, species: "Asian Elephant", location: "Periyar, Kerala", photographer: "Vaan Mitra Team" },
];

const PhotographyPage = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedPhoto(photo)}
                className="relative aspect-square cursor-pointer group overflow-hidden"
              >
                <img
                  src={photo.src}
                  alt={photo.species}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
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
                
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.species}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                
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

      {/* CTA */}
      <section className="py-20 px-6 bg-jungle-deep border-t border-jungle-medium/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl text-ivory mb-4">
            Share Your Wildlife Photographs
          </h2>
          <p className="text-muted-foreground mb-8">
            Are you a wildlife photographer? Submit your work to be featured in our gallery.
          </p>
          <button className="btn-hero">
            Submit Photography
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PhotographyPage;
