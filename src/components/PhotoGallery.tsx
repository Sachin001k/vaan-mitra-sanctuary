import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "@/data/media";

type PhotoGalleryProps = {
  photos: Photo[];
  /** Tailwind grid column classes. */
  columns?: string;
  /** Tile aspect ratio class; use "aspect-auto" to keep each photo's own ratio. */
  aspect?: string;
};

// Grid of captioned photos with an accessible lightbox (Escape closes, arrow keys navigate).
const PhotoGallery = ({
  photos,
  columns = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  aspect = "aspect-[4/3]",
}: PhotoGalleryProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex === null ? null : photos[openIndex];

  const step = useCallback(
    (delta: number) =>
      setOpenIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, step]);

  return (
    <>
      <ul className={`grid ${columns} gap-4`}>
        {photos.map((photo, index) => (
          <li key={photo.src}>
            <figure className="group h-full bg-jungle-dark">
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className={`relative block w-full ${aspect} overflow-hidden`}
                aria-label={`Enlarge photo: ${photo.caption ?? photo.alt}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </button>
              {photo.caption && (
                <figcaption className="px-4 py-3 text-sm text-muted-foreground">{photo.caption}</figcaption>
              )}
            </figure>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-jungle-darkest/95 flex items-center justify-center p-4 md:p-10"
            role="dialog"
            aria-modal="true"
            aria-label={open.caption ?? open.alt}
            onClick={() => setOpenIndex(null)}
          >
            <figure className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                autoFocus
                aria-label="Close photo"
                className="absolute -top-12 right-0 p-2 text-ivory hover:text-jungle-canopy transition-colors"
              >
                <X size={30} />
              </button>
              <img src={open.src} alt={open.alt} className="w-full h-auto max-h-[78vh] object-contain" />
              <figcaption className="mt-4 text-center text-muted-foreground">{open.caption ?? open.alt}</figcaption>
              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous photo"
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-jungle-darkest/70 text-ivory hover:text-jungle-canopy"
                  >
                    <ChevronLeft size={26} />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next photo"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-jungle-darkest/70 text-ivory hover:text-jungle-canopy"
                  >
                    <ChevronRight size={26} />
                  </button>
                </>
              )}
            </figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PhotoGallery;
