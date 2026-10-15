import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, Zap, Wifi, Volume2, CloudRain, Battery, Cpu, Radio } from "lucide-react";
import raptorDevice1 from "@/assets/raptor-device-1.png";
import raptorDevice2 from "@/assets/raptor-device-2.webp";
import tigerImage from "@/assets/tiger.jpg";

const features = [
  {
    icon: Volume2,
    title: "Advanced Bioacoustics",
    description: "Detects gunshots, animal distress calls, and suspicious human activity using precision audio sensors.",
  },
  {
    icon: Cpu,
    title: "Machine Learning",
    description: "AI-powered algorithms analyze sounds in real-time, distinguishing threats from natural forest sounds.",
  },
  {
    icon: Wifi,
    title: "Instant Alerts",
    description: "Immediately notifies forest rangers and protection teams when threats are detected.",
  },
  {
    icon: CloudRain,
    title: "Weatherproof Design",
    description: "Rugged construction withstands rain, heat, and harsh remote forest conditions year-round.",
  },
  {
    icon: Battery,
    title: "Energy Efficient",
    description: "Optimized power consumption enables extended deployment in off-grid locations.",
  },
  {
    icon: Shield,
    title: "Low-Cost Protection",
    description: "Affordable technology enables even resource-limited reserves to deploy comprehensive coverage.",
  },
];

const specs = [
  { label: "Detection Range", value: "500m+" },
  { label: "Battery Life", value: "6 months" },
  { label: "Response Time", value: "<5 sec" },
  { label: "Accuracy", value: "98.5%" },
  { label: "Weight", value: "1.2 kg" },
  { label: "Connectivity", value: "LoRa/GSM" },
];

const RaptorPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-jungle-dark relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--jungle-canopy)) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-jungle-amazon/20 border border-jungle-amazon/50 mb-6">
                <Radio size={16} className="text-jungle-canopy" />
                <span className="text-jungle-canopy text-sm font-medium uppercase tracking-wider">
                  Conservation Technology
                </span>
              </div>

              <h1 className="font-display text-5xl md:text-7xl text-ivory mb-6">
                RAPTOR
              </h1>

              <p className="text-2xl text-jungle-canopy font-display mb-6">
                Real-time Audio Protection & Threat Observation Relay
              </p>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                A next-generation, low-cost anti-poaching device built to protect wildlife 
                with precision and reliability. RAPTOR transforms sound into intelligence, 
                allowing rangers to act faster and save more lives.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="btn-hero flex items-center justify-center gap-2"
                >
                  <Zap size={18} />
                  Request Demo
                </Link>
                <a
                  href="/pdf/specs.pdf"
                  download="raptor-specs.pdf"
                  className="btn-ghost flex items-center justify-center gap-2"
                >
                  Download Specs
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square">
                <img
                  src={raptorDevice1}
                  alt="RAPTOR Device"
                  className="w-full h-full object-contain"
                />
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-radial from-jungle-canopy/20 to-transparent pointer-events-none" />
              </div>

              {/* Floating specs */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 right-4 px-4 py-2 bg-jungle-deep/90 border border-jungle-amazon/50 backdrop-blur-sm"
              >
                <p className="text-xs text-muted-foreground">Detection Range</p>
                <p className="text-jungle-canopy font-bold">500m+</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-4 left-4 px-4 py-2 bg-jungle-deep/90 border border-jungle-amazon/50 backdrop-blur-sm"
              >
                <p className="text-xs text-muted-foreground">Response Time</p>
                <p className="text-jungle-canopy font-bold">&lt;5 seconds</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-jungle-darkest">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl text-ivory mb-4">
              How RAPTOR Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A smart, elegant solution crafted for the frontline of conservation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Listen",
                description: "Advanced bioacoustic sensors continuously monitor the forest soundscape 24/7.",
                icon: Volume2,
              },
              {
                step: "02",
                title: "Analyze",
                description: "Machine learning models identify gunshots, distress calls, and suspicious activity in real-time.",
                icon: Cpu,
              },
              {
                step: "03",
                title: "Alert",
                description: "Instant notifications are sent to forest teams, enabling rapid response to threats.",
                icon: Radio,
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="stat-card relative group"
              >
                <div className="absolute top-6 right-6 text-6xl font-display text-jungle-medium/30">
                  {item.step}
                </div>
                <item.icon className="w-12 h-12 text-jungle-canopy mb-6" />
                <h3 className="font-display text-2xl text-ivory mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Device Showcase */}
      <section className="py-20 px-6 bg-jungle-deep">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src={raptorDevice2}
                alt="RAPTOR in the field"
                className="w-full h-auto"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl text-ivory mb-6">
                Built for the Wild
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                RAPTOR's weatherproof, rugged design allows it to perform flawlessly 
                in rain, heat, and remote forest conditions. Compact, energy-efficient, 
                and affordable, it enables even resource-limited reserves to strengthen 
                protection across vast landscapes.
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-4">
                {specs.map((spec, index) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-jungle-dark p-4 border border-jungle-medium/30"
                  >
                    <p className="text-2xl font-display text-jungle-canopy">
                      {spec.value}
                    </p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {spec.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-jungle-dark">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl text-ivory mb-4">
              Key Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every component designed with one purpose: protecting wildlife.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="stat-card hover:border-jungle-amazon transition-all duration-300 group"
              >
                <feature.icon className="w-10 h-10 text-jungle-canopy mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-display text-xl text-ivory mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 px-6 bg-jungle-darkest border-y border-jungle-medium/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "15+", label: "Deployments" },
              { value: "500km²", label: "Area Protected" },
              { value: "47", label: "Threats Detected" },
              { value: "12", label: "Lives Saved" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="font-display text-4xl md:text-5xl text-jungle-canopy">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mt-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={tigerImage}
            alt="Tiger"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-jungle-darkest/90" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl text-ivory mb-6">
              Deploy RAPTOR in Your Reserve
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join the growing network of protected areas using RAPTOR technology. 
              Contact us for pricing, pilot programs, and partnership opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-hero">
                Request a Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RaptorPage;
