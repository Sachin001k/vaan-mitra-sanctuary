import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Binoculars, Heart, Camera } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AmbientSound from "@/components/AmbientSound";
import {
  photoPortfolio,
  missionHighlights,
  featuredSpecies,
} from "@/data/localPhotos";

const Index = () => {
  const photographyCards = photoPortfolio;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Ambient Jungle Sound Controller */}
      <AmbientSound 
        audioUrl="https://cdn.pixabay.com/download/audio/2022/03/10/audio_5f4ce1c24d.mp3"
        defaultVolume={0.25}
      />

      {/* Hero Section with YouTube Video Background */}
      <section className="relative h-screen overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/ZSMsuqBciGo?si=HmdYHcVQlXHe8kVV&autoplay=1&mute=1&controls=0&loop=1&playlist=ZSMsuqBciGo&modestbranding=1"
          title="Vann Mitra Foundation Hero"
          allow="autoplay; fullscreen; picture-in-picture"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-jungle-darkest/60 via-transparent to-jungle-darkest/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-jungle-darkest/70 via-transparent to-jungle-darkest/50" />

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-jungle-canopy/30"
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                y: -10,
              }}
              animate={{
                y: (typeof window !== "undefined" ? window.innerHeight : 800) + 10,
                x: `+=${Math.random() * 100 - 50}`,
              }}
              transition={{
                duration: 12 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-jungle-canopy uppercase tracking-[0.3em] text-sm mb-6 font-medium">
                Conservation Through Connection
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl text-ivory leading-tight mb-8 drop-shadow-2xl"
            >
              Where forest songs and footsteps blend,
              <br />
              <span className="text-gradient-jungle">we walk the wild;</span>
              <br />
              we call it friend.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-ivory/90 max-w-2xl mx-auto mb-12 drop-shadow-lg"
            >
              A network of 15+ young conservationists, scientists, and NGOs
              protecting wildlife through technology-driven solutions since 2024.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/raptor" className="btn-hero flex items-center gap-2">
                <Binoculars size={18} />
                Explore Wildlife
              </Link>
              <Link to="/maps" className="btn-ghost flex items-center gap-2">
                <Globe size={18} />
                View Global Map
              </Link>
              <Link to="/donate" className="btn-ghost flex items-center gap-2">
                <Heart size={18} />
                Join the Cause
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Photography + Species Summaries Section */}
      <section className="py-16 px-6 bg-jungle-dark border-b border-jungle-medium/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-center md:justify-between mb-10"
          >
            <div>
              <p className="text-jungle-canopy uppercase tracking-[0.3em] text-xs mb-2 flex items-center gap-2">
                <Camera size={14} />
                Vann Mitra Spotlights
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-ivory">
                Photography + Species Summaries
              </h2>
            </div>
            <Link
              to="/photography"
              className="mt-4 md:mt-0 flex items-center gap-2 text-jungle-canopy hover:gap-4 transition-all text-sm"
            >
              View Full Gallery <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {photographyCards.slice(0, 8).map((card, index) => (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-jungle-deep border border-jungle-medium/30 overflow-hidden group"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.species}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-jungle-darkest/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg text-ivory mb-1">{card.species}</h3>
                  <p className="text-xs text-jungle-canopy uppercase tracking-wider mb-2">
                    {card.location}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {card.summary}
                  </p>
                </div>
              </motion.article>
            ))}
            {photographyCards.length === 0 && (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground text-sm">Loading wildlife photography...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Rangoli Divider */}
      <div className="relative py-6 bg-jungle-darkest overflow-hidden">
        <div className="flex items-center justify-center gap-4">
          <div className="h-px flex-1 max-w-[200px] bg-gradient-to-r from-transparent to-jungle-canopy/40" />
          <motion.div
            className="text-2xl animate-rangoli-spin"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            ✦
          </motion.div>
          <motion.div className="text-jungle-canopy text-lg animate-wiggle">❋</motion.div>
          <motion.div
            className="text-2xl animate-rangoli-spin"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            ✦
          </motion.div>
          <div className="h-px flex-1 max-w-[200px] bg-gradient-to-l from-transparent to-jungle-canopy/40" />
        </div>
        {/* Floating fireflies */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`firefly-${i}`}
            className="absolute w-1.5 h-1.5 bg-yellow-400/60"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.3, 0.8],
              x: [0, (Math.random() - 0.5) * 30, 0],
              y: [0, (Math.random() - 0.5) * 20, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Mission Section */}
      <section className="py-24 px-6 bg-jungle-darkest">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl text-ivory mb-6">
              Our Mission
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              Vann Mitra Foundation was born in 2024 as a project to protect wildlife
              and the jungle. Registered as an NGO in 2025, we now work with
              conservationists, scientists, government officials, and other NGOs to
              create lasting change.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {missionHighlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="stat-card group hover:border-jungle-amazon transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48 -mx-8 -mt-8 mb-6 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-jungle-deep to-transparent" />
                </div>
                <h3 className="font-display text-xl text-ivory mb-2">{item.title}</h3>
                <p className="text-xs uppercase tracking-[0.4em] text-jungle-canopy mb-3">
                  {item.year}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaf Divider */}
      <div className="relative py-4 bg-jungle-deep overflow-hidden flex items-center justify-center gap-6">
        <motion.span className="text-2xl animate-leaf-sway" style={{ animationDelay: "0s" }}>🍃</motion.span>
        <motion.span className="text-xl animate-leaf-sway" style={{ animationDelay: "0.5s" }}>🌿</motion.span>
        <motion.span className="text-2xl animate-leaf-sway" style={{ animationDelay: "1s" }}>🍃</motion.span>
        <motion.span className="text-xl animate-leaf-sway" style={{ animationDelay: "1.5s" }}>🌿</motion.span>
        <motion.span className="text-2xl animate-leaf-sway" style={{ animationDelay: "2s" }}>🍃</motion.span>
      </div>

      {/* Featured Species */}
      <section className="py-24 px-6 bg-jungle-deep">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-16"
          >
            <div>
              <p className="text-jungle-canopy uppercase tracking-widest text-sm mb-2">
                Featured Species
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-ivory">
                India's Magnificent Wildlife
              </h2>
            </div>
            <Link
              to="/raptor"
              className="mt-4 md:mt-0 flex items-center gap-2 text-jungle-canopy hover:gap-4 transition-all"
            >
              View All Species <ArrowRight size={18} />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredSpecies.map((animal, index) => (
              <motion.div
                key={animal.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-jungle group overflow-hidden"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={animal.image}
                    alt={animal.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-jungle-darkest via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-display text-2xl text-ivory">{animal.name}</h3>
                    <p className="text-jungle-canopy text-lg font-semibold">
                      {animal.count} in the wild
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="py-24 px-6 bg-jungle-darkest border-y border-jungle-medium/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-destructive uppercase tracking-widest text-sm mb-2 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-destructive animate-pulse" />
              Live Counter
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-ivory">
              The Cost of Inaction
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="stat-card animate-pulse-glow">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Animals Poached (2024)
              </p>
              <AnimatedCounter
                end={38247}
                className="font-display text-4xl text-destructive"
              />
            </div>
            <div className="stat-card">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Species Extinct (Century)
              </p>
              <AnimatedCounter
                end={543}
                className="font-display text-4xl text-jungle-tropical"
              />
            </div>
            <div className="stat-card">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Hectares Deforested
              </p>
              <AnimatedCounter
                end={4200000}
                suffix="+"
                className="font-display text-4xl text-jungle-amazon"
              />
            </div>
            <div className="stat-card border-jungle-amazon">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Species We Can Save
              </p>
              <AnimatedCounter
                end={41415}
                className="font-display text-4xl text-jungle-canopy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        {/* Background from a local photograph */}
        <div className="absolute inset-0">
          <img
            src={featuredSpecies[0]?.image}
            alt="Tiger"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-jungle-darkest/90" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-6xl text-ivory mb-6">
              Every Voice Matters
            </h2>
            <p className="text-lg text-ivory/80 mb-10 max-w-2xl mx-auto">
              Join the movement. Whether you donate, volunteer, or simply spread
              awareness—your action creates ripples that can save species.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/donate" className="btn-hero">
                Support Our Mission
              </Link>
              <Link to="/contact" className="btn-ghost">
                Get In Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
