import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ExternalLink } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import SectionHeader from "@/components/SectionHeader";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import PhotoGallery from "@/components/PhotoGallery";
import LocalVideo from "@/components/LocalVideo";
import { FAULT_LINE_VIDEO_ID } from "@/data/siteLinks";
import { ALL_PHOTOS_BY_CATEGORY, WILDLIFE_VIDEO } from "@/data/media";

const PhotographyPage = () => {
  const [category, setCategory] = useState(ALL_PHOTOS_BY_CATEGORY[0].id);
  const active = ALL_PHOTOS_BY_CATEGORY.find((c) => c.id === category) ?? ALL_PHOTOS_BY_CATEGORY[0];

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

      {/* Gallery */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div role="tablist" aria-label="Gallery categories" className="flex flex-wrap gap-2 mb-8">
            {ALL_PHOTOS_BY_CATEGORY.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={c.id === category}
                onClick={() => setCategory(c.id)}
                className={`px-4 py-2 text-sm border transition-colors ${
                  c.id === category
                    ? "bg-jungle-canopy text-jungle-darkest border-jungle-canopy"
                    : "border-jungle-medium/50 text-muted-foreground hover:text-ivory hover:border-jungle-canopy"
                }`}
              >
                {c.label}
                <span className="ml-2 opacity-70">{c.photos.length}</span>
              </button>
            ))}
          </div>
          <h2 className="sr-only">{active.label}</h2>
          <PhotoGallery key={active.id} photos={active.photos} />
        </div>
      </section>

      {/* Field video */}
      <section className="py-16 px-6 bg-jungle-deep border-t border-jungle-medium/20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <div>
            <SectionHeader eyebrow="From the field" title="A moment at the waterhole">
              <p>{WILDLIFE_VIDEO.title}.</p>
            </SectionHeader>
          </div>
          <LocalVideo video={WILDLIFE_VIDEO} className="max-w-sm mx-auto w-full" />
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

    <Footer />
  </div>
);
};

export default PhotographyPage;
