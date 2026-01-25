import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SpeciesCard from "@/components/SpeciesCard";
import tigerImage from "@/assets/tiger.jpg";
import elephantImage from "@/assets/elephant.jpg";
import eagleImage from "@/assets/eagle.jpg";
import rhinoImage from "@/assets/rhino.jpg";
import snowLeopardImage from "@/assets/snow-leopard.jpg";
import langurImage from "@/assets/langur.jpg";

const species = [
  {
    name: "Bengal Tiger",
    scientificName: "Panthera tigris tigris",
    population: "3,167",
    status: "Endangered",
    habitat: "Tropical Forests",
    image: tigerImage,
    diet: "Carnivore - deer, wild boar, buffalo",
    behavior: "Solitary, territorial, nocturnal hunter",
    threats: "Poaching, habitat loss, human-wildlife conflict",
  },
  {
    name: "Asian Elephant",
    scientificName: "Elephas maximus",
    population: "27,312",
    status: "Endangered",
    habitat: "Grasslands & Forests",
    image: elephantImage,
    diet: "Herbivore - grasses, bark, roots",
    behavior: "Social, matriarchal herds, highly intelligent",
    threats: "Habitat fragmentation, human-elephant conflict",
  },
  {
    name: "Crested Serpent Eagle",
    scientificName: "Spilornis cheela",
    population: "50,000+",
    status: "Least Concern",
    habitat: "Tropical Forests",
    image: eagleImage,
    diet: "Carnivore - snakes, lizards, frogs",
    behavior: "Diurnal, soaring hunter, loud calls",
    threats: "Habitat degradation, pesticide poisoning",
  },
  {
    name: "Greater One-Horned Rhino",
    scientificName: "Rhinoceros unicornis",
    population: "4,014",
    status: "Vulnerable",
    habitat: "Alluvial Grasslands",
    image: rhinoImage,
    diet: "Herbivore - grasses, leaves, fruits",
    behavior: "Semi-aquatic, solitary, territorial",
    threats: "Poaching for horn, habitat loss, flooding",
  },
  {
    name: "Snow Leopard",
    scientificName: "Panthera uncia",
    population: "718",
    status: "Vulnerable",
    habitat: "High Mountains",
    image: snowLeopardImage,
    diet: "Carnivore - blue sheep, ibex, marmots",
    behavior: "Solitary, crepuscular, elusive",
    threats: "Retaliatory killing, poaching, climate change",
  },
  {
    name: "Gray Langur",
    scientificName: "Semnopithecus entellus",
    population: "300,000+",
    status: "Least Concern",
    habitat: "Various Forests",
    image: langurImage,
    diet: "Herbivore - leaves, fruits, flowers",
    behavior: "Social troops, arboreal, vocal",
    threats: "Urbanization, road accidents, electrocution",
  },
];

const RaptorPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-jungle-dark">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-jungle-canopy uppercase tracking-[0.3em] text-sm mb-4">
              India's Fauna
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-ivory mb-6">
              RAPTOR
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              <span className="text-ivory font-semibold">R</span>are{" "}
              <span className="text-ivory font-semibold">A</span>nd{" "}
              <span className="text-ivory font-semibold">P</span>rotected{" "}
              <span className="text-ivory font-semibold">T</span>hreatened{" "}
              <span className="text-ivory font-semibold">O</span>rganisms{" "}
              <span className="text-ivory font-semibold">R</span>egistry — 
              A comprehensive database of India's keystone species requiring 
              immediate conservation attention.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Animated Bird Silhouettes */}
      <div className="fixed top-0 left-0 right-0 h-40 pointer-events-none overflow-hidden z-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-jungle-canopy/10"
            initial={{ x: -100, y: 50 + i * 20 }}
            animate={{ x: "100vw" }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              delay: i * 4,
              ease: "linear",
            }}
          >
            <svg width="40" height="20" viewBox="0 0 40 20" fill="currentColor">
              <path d="M20 10 L0 0 L5 10 L0 20 L20 10 L40 0 L35 10 L40 20 Z" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Species Grid */}
      <section className="py-20 px-6 bg-jungle-darkest relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {species.map((sp, index) => (
              <SpeciesCard key={sp.name} {...sp} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Species Detail */}
      <section className="py-20 px-6 bg-jungle-dark">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={tigerImage}
                alt="Bengal Tiger"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-jungle-dark/50 to-transparent" />
            </div>

            <div>
              <p className="text-jungle-canopy uppercase tracking-widest text-sm mb-2">
                Spotlight Species
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-ivory mb-4">
                The Bengal Tiger
              </h2>
              <p className="text-jungle-canopy italic text-lg mb-6">
                Panthera tigris tigris
              </p>

              <div className="space-y-6 text-muted-foreground">
                <p>
                  The Bengal Tiger is India's national animal and one of the most 
                  iconic species in global conservation. With approximately 3,167 
                  individuals remaining in the wild, India is home to over 70% of 
                  the world's wild tiger population.
                </p>
                <p>
                  These majestic cats are apex predators, playing a crucial role in 
                  maintaining the ecological balance of their habitats. Their 
                  presence indicates a healthy ecosystem with adequate prey and 
                  forest cover.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="stat-card">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Population Trend</p>
                  <p className="text-jungle-canopy text-2xl font-bold">+33%</p>
                  <p className="text-xs text-muted-foreground">Since 2014</p>
                </div>
                <div className="stat-card">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Protected Reserves</p>
                  <p className="text-ivory text-2xl font-bold">53</p>
                  <p className="text-xs text-muted-foreground">Tiger Reserves</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RaptorPage;
