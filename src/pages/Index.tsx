import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Binoculars, Heart } from "lucide-react";
import heroForest from "@/assets/hero-forest.jpg";
import tigerImage from "@/assets/tiger.jpg";
import elephantImage from "@/assets/elephant.jpg";
import eagleImage from "@/assets/eagle.jpg";
import AnimatedCounter from "@/components/AnimatedCounter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroForest}
            alt="Tropical rainforest"
            className="w-full h-full object-cover animate-breathe"
          />
          <div className="image-overlay" />
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-jungle-canopy/40"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: -10,
              }}
              animate={{
                y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 10,
                x: `+=${Math.random() * 100 - 50}`,
              }}
              transition={{
                duration: 10 + Math.random() * 10,
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
            <p className="text-jungle-canopy uppercase tracking-[0.3em] text-sm mb-6">
              Conservation Through Connection
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-ivory leading-tight mb-8"
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
            className="text-lg text-ivory/80 max-w-2xl mx-auto mb-12"
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

      {/* Mission Section */}
      <section className="py-24 px-6 bg-jungle-dark">
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
            {[
              {
                icon: "🐯",
                title: "Wildlife Protection",
                description: "Direct action to protect endangered species through patrols, monitoring, and rescue operations.",
              },
              {
                icon: "🤝",
                title: "Human-Animal Conflict Mitigation",
                description: "Working with communities to create sustainable coexistence between humans and wildlife.",
              },
              {
                icon: "💻",
                title: "Technology-Driven Conservation",
                description: "Using cutting-edge technology like AI, drones, and tracking systems to protect species.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="stat-card group hover:border-jungle-amazon transition-all duration-300"
              >
                <div className="text-5xl mb-6">{item.icon}</div>
                <h3 className="font-display text-xl text-ivory mb-4">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Species */}
      <section className="py-24 px-6 bg-jungle-darkest">
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
            {[
              { image: tigerImage, name: "Bengal Tiger", count: "3,167" },
              { image: elephantImage, name: "Asian Elephant", count: "27,312" },
              { image: eagleImage, name: "Crested Serpent Eagle", count: "50,000+" },
            ].map((species, index) => (
              <motion.div
                key={species.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-jungle group overflow-hidden"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={species.image}
                    alt={species.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-jungle-darkest via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-display text-2xl text-ivory">{species.name}</h3>
                    <p className="text-jungle-canopy text-lg font-semibold">
                      {species.count} in the wild
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="py-24 px-6 bg-jungle-deep border-y border-jungle-medium/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-red-400 uppercase tracking-widest text-sm mb-2 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-red-500 animate-pulse" />
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
                className="font-display text-4xl text-red-400"
              />
            </div>
            <div className="stat-card">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Species Extinct (Century)
              </p>
              <AnimatedCounter
                end={543}
                className="font-display text-4xl text-orange-400"
              />
            </div>
            <div className="stat-card">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Hectares Deforested
              </p>
              <AnimatedCounter
                end={4200000}
                suffix="+"
                className="font-display text-4xl text-amber-400"
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
        <div className="absolute inset-0">
          <img
            src={tigerImage}
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
