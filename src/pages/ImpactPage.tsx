import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Shield, TreePine, Heart, Users, Globe } from "lucide-react";
import elephantImage from "@/assets/elephant.jpg";

const ImpactPage = () => {
  const stats = [
    {
      icon: Shield,
      value: 24,
      label: "Animals Rescued",
      description: "Direct rescue operations across India",
    },
    {
      icon: TreePine,
      value: 2000,
      suffix: "+",
      label: "Hectares Protected",
      description: "Critical habitat under conservation",
    },
    {
      icon: Users,
      value: 100000,
      suffix: "+",
      label: "People Reached",
      description: "Through awareness and outreach",
    },
    {
      icon: Heart,
      value: 3.7,
      prefix: "$",
      suffix: "k",
      decimals: 1,
      label: "Funds Raised",
      description: "For conservation initiatives",
    },
    {
      icon: Globe,
      value: 6,
      label: "States Covered",
      description: "Active conservation zones",
    },
  ];

  const milestones = [
    {
      year: "2024",
      title: "Foundation Established",
      description: "Vann Mitra started as a conservation project with a vision to protect India's wildlife.",
    },
    {
      year: "2025",
      title: "NGO Registration",
      description: "Officially registered as an NGO, enabling larger-scale conservation efforts.",
    },
    {
      year: "2025",
      title: "First Major Rescue",
      description: "Successfully coordinated rescue of 23 animals from flooding in Assam.",
    },
    {
      year: "2026",
      title: "Tech Initiative Launch",
      description: "Launched AI-powered monitoring system for early poaching detection.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={elephantImage}
            alt="Elephant"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-jungle-darkest via-jungle-dark/90 to-jungle-darkest" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-jungle-canopy uppercase tracking-[0.3em] text-sm mb-4">
              Conservation in Action
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-ivory mb-6">
              Our Impact
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Every number tells a story of hope. From rescued animals to protected 
              habitats, see how your support translates into real-world conservation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-20 px-6 bg-jungle-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="stat-card group hover:border-jungle-amazon transition-all duration-300"
              >
                <stat.icon className="w-10 h-10 text-jungle-canopy mb-6" />
                <AnimatedCounter
                  end={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  className="font-display text-5xl text-ivory mb-2"
                />
                <h3 className="text-lg text-ivory font-semibold mb-2">{stat.label}</h3>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 bg-jungle-darkest">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl text-ivory mb-4">
              Our Journey
            </h2>
            <p className="text-muted-foreground">
              Key milestones in our conservation mission
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-jungle-medium/50" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-20"
                >
                  {/* Year badge */}
                  <div className="absolute left-0 w-16 h-16 bg-jungle-amazon flex items-center justify-center">
                    <span className="text-ivory font-bold text-sm">{milestone.year}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="card-jungle p-6">
                    <h3 className="font-display text-xl text-ivory mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ImpactPage;
