import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Binoculars, Heart, Camera, ExternalLink } from "lucide-react";
import { useQueries } from "@tanstack/react-query";
import AnimatedCounter from "@/components/AnimatedCounter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VideoHero from "@/components/VideoHero";
import AmbientSound from "@/components/AmbientSound";

// Wikipedia animal slugs for fetching real images
const wikiAnimals = [
  { slug: "Bengal_tiger", name: "Bengal Tiger", count: "3,167" },
  { slug: "Indian_elephant", name: "Asian Elephant", count: "27,312" },
  { slug: "Snow_leopard", name: "Snow Leopard", count: "~7,500" },
  { slug: "Indian_rhinoceros", name: "Greater One-Horned Rhino", count: "4,014" },
  { slug: "Asiatic_lion", name: "Asiatic Lion", count: "891" },
  { slug: "Red_panda", name: "Red Panda", count: "~10,000" },
];

// Mission section Wikipedia slugs
const missionAnimals = [
  { slug: "Bengal_tiger", title: "Wildlife Protection", description: "Direct action to protect endangered species through patrols, monitoring, and rescue operations." },
  { slug: "Indian_elephant", title: "Human-Animal Conflict Mitigation", description: "Working with communities to create sustainable coexistence between humans and wildlife." },
  { slug: "Great_hornbill", title: "Technology-Driven Conservation", description: "Using cutting-edge technology like AI, drones, and tracking systems to protect species." },
];

// Photography section Wikipedia slugs
const photographyAnimals = [
  "Bengal_tiger",
  "Asiatic_lion",
  "Indian_elephant",
  "Indian_rhinoceros",
  "Snow_leopard",
  "Red_panda",
  "Gharial",
  "Indian_leopard",
  "Sloth_bear",
  "King_cobra",
  "Great_hornbill",
  "Indian_peafowl",
];

const fetchWikiSummary = async (slug: string) => {
  const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(slug)}`);
  if (!response.ok) {
    throw new Error("Unable to load Wikipedia summary");
  }
  return response.json();
};

// YouTube video IDs for hero background
const heroVideos = [
  {
    youtubeId: "ZSMsuqBciGo",
    label: "Bengal Tiger",
  },
  {
    youtubeId: "BY9outjlQfo",
    label: "Asian Elephant",
  },
  {
    youtubeId: "sRWcJrMTtMI",
    label: "Wildlife of India",
  },
];

const Index = () => {
  // Fetch Wikipedia data for Featured Species
  const featuredQueries = useQueries({
    queries: wikiAnimals.map((animal) => ({
      queryKey: ["wiki-featured", animal.slug],
      queryFn: () => fetchWikiSummary(animal.slug),
      staleTime: 1000 * 60 * 10,
    })),
  });

  // Fetch Wikipedia data for Mission section
  const missionQueries = useQueries({
    queries: missionAnimals.map((animal) => ({
      queryKey: ["wiki-mission", animal.slug],
      queryFn: () => fetchWikiSummary(animal.slug),
      staleTime: 1000 * 60 * 10,
    })),
  });

  // Fetch Wikipedia data for Photography section
  const photographyQueries = useQueries({
    queries: photographyAnimals.map((slug) => ({
      queryKey: ["wiki-photo", slug],
      queryFn: () => fetchWikiSummary(slug),
      staleTime: 1000 * 60 * 10,
    })),
  });

  const photographyCards = photographyQueries
    .map((result, index) => ({
      slug: photographyAnimals[index],
      data: result.data,
      isLoading: result.isLoading,
    }))
    .filter((card) => card.data?.thumbnail?.source);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Ambient Jungle Sound Controller */}
      <AmbientSound 
        audioUrl="https://cdn.pixabay.com/download/audio/2022/03/10/audio_5f4ce1c24d.mp3"
        defaultVolume={0.25}
      />

      {/* Hero Section with Video Background */}
      <VideoHero 
        videos={heroVideos}
        switchInterval={25000}
        className="h-screen"
        showControls={true}
      >
        <section className="h-screen flex items-center justify-center">
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
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
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
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
        </section>
      </VideoHero>

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
                Wikipedia Spotlights
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
                key={card.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-jungle-deep border border-jungle-medium/30 overflow-hidden group"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={card.data.thumbnail.source}
                    alt={card.data.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-jungle-darkest/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg text-ivory mb-1">{card.data.title}</h3>
                  {card.data.description && (
                    <p className="text-xs text-jungle-canopy uppercase tracking-wider mb-2">
                      {card.data.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {card.data.extract?.slice(0, 100)}…
                  </p>
                  <a
                    href={card.data.content_urls?.desktop?.page}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs text-jungle-canopy hover:underline"
                  >
                    Read more <ExternalLink size={10} />
                  </a>
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

      {/* Mission Section with Wikipedia Images */}
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
              Vaan Mitra Foundation was born in 2024 as a project to protect wildlife
              and the jungle. Registered as an NGO in 2025, we now work with
              conservationists, scientists, government officials, and other NGOs to
              create lasting change.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {missionAnimals.map((item, index) => {
              const wikiData = missionQueries[index]?.data;
              const imageUrl = wikiData?.thumbnail?.source;
              
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="stat-card group hover:border-jungle-amazon transition-all duration-300 overflow-hidden"
                >
                  {/* Real animal image from Wikipedia API */}
                  <div className="relative h-48 -mx-8 -mt-8 mb-6 overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-jungle-deep flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">Loading...</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-jungle-deep to-transparent" />
                  </div>
                  <h3 className="font-display text-xl text-ivory mb-4">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
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

      {/* Featured Species with Wikipedia Images */}
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
            {wikiAnimals.slice(0, 6).map((animal, index) => {
              const wikiData = featuredQueries[index]?.data;
              const imageUrl = wikiData?.thumbnail?.source || wikiData?.originalimage?.source;
              
              return (
                <motion.div
                  key={animal.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-jungle group overflow-hidden"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={animal.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-jungle-dark flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">Loading...</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-jungle-darkest via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="font-display text-2xl text-ivory">{animal.name}</h3>
                      <p className="text-jungle-canopy text-lg font-semibold">
                        {animal.count} in the wild
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
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
        {/* Background from Wikipedia */}
        <div className="absolute inset-0">
          {featuredQueries[0]?.data?.thumbnail?.source ? (
            <img
              src={featuredQueries[0].data.thumbnail.source}
              alt="Tiger"
              className="w-full h-full object-cover opacity-20"
            />
          ) : (
            <div className="w-full h-full bg-jungle-dark" />
          )}
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
