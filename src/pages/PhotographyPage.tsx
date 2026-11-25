import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { X, ExternalLink } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import SectionHeader from "@/components/SectionHeader";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { FAULT_LINE_VIDEO_ID } from "@/data/siteLinks";
import { photoPortfolio, type PhotoPortfolioEntry } from "@/data/localPhotos";

const PhotographyPage = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoPortfolioEntry | null>(null);
  const enrichedPhotos = photoPortfolio;

  // Close the lightbox with Escape.
  useEffect(() => {
    if (!selectedPhoto) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelectedPhoto(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedPhoto]);

  return (
    <div className="min-h-screen bg-jungle-darkest">
      <PageMeta
        title="Photography — Stories from the field"
        description="Photography offering a closer look at the places, wildlife and communities that shape conservation."
        path="/photography"
      />
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
              Photography
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-ivory mb-6">
              Stories from the field.
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-6">
              Photography offers a closer look at the places, wildlife and communities that shape
              conservation.
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              An image can make a landscape feel immediate, but it also carries a responsibility. Our
              gallery pairs photographs with context: where and when an image was made, what it shows,
              who made it and whether it documents Vann Mitra's own work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-body">
              Wildlife and habitat
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrichedPhotos.map((photo, index) => (
              <motion.figure
                key={photo.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.08 }}
                viewport={{ once: true }}
                className="group"
              >
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(photo)}
                  className="relative block w-full aspect-square overflow-hidden"
                  aria-label={`Open photo: ${photo.species}, ${photo.location}`}
                >
                  <img
                    src={photo.image}
                    alt={`${photo.species}, ${photo.location}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </button>
                <figcaption className="bg-jungle-dark px-4 py-3">
                  <p className="text-ivory font-display">{photo.species}</p>
                  <p className="text-sm text-muted-foreground">{photo.location}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* Feature: Fault Line */}
      <section className="py-20 px-6 bg-jungle-dark border-t border-jungle-medium/20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <YouTubeEmbed videoId={FAULT_LINE_VIDEO_ID} title="Fault Line — a human–tiger conflict documentary" />
          <div>
            <SectionHeader eyebrow="Behind the documentary" title="Fault Line">
              <p>
                A documentary about human–tiger conflict, exploring the experiences of people living near
                tiger landscapes through film and first-hand perspectives.
              </p>
            </SectionHeader>
            <a
              href={`https://www.youtube.com/watch?v=${FAULT_LINE_VIDEO_ID}`}
              target="_blank"
              rel="noreferrer"
              className="btn-hero gap-2"
            >
              Watch the documentary <ExternalLink size={16} aria-hidden="true" />
            </a>
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
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedPhoto.species}, ${selectedPhoto.location}`}
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
                  autoFocus
                  aria-label="Close photo"
                  className="absolute -top-12 right-0 p-2 text-ivory hover:text-jungle-canopy transition-colors"
                >
                  <X size={32} />
                </button>
                
                <img
                  src={selectedPhoto.image}
                  alt={`${selectedPhoto.species}, ${selectedPhoto.location}`}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-ivory font-display text-xl">{selectedPhoto.species}</p>
                <p className="text-muted-foreground">{selectedPhoto.location} — {selectedPhoto.summary}</p>
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
