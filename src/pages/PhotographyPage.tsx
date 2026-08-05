import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { X } from "lucide-react";
import { photoPortfolio, type PhotoPortfolioEntry } from "@/data/localPhotos";

const PhotographyPage = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoPortfolioEntry | null>(null);
  const enrichedPhotos = photoPortfolio;

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
              Vann Mitra imagery
            </p>
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
                <img
                  src={photo.image}
                  alt="Wildlife photographed by Vann Mitra"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
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
                  src={selectedPhoto.image}
                  alt="Wildlife photographed by Vann Mitra"
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
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
