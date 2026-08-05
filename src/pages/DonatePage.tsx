import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Heart, TreePine, Shield, Users } from "lucide-react";
import tigerImage from "@/assets/tiger.jpg";

const donationTiers = [
  {
    amount: 500,
    title: "Seedling",
    description: "Provides food for rescued animals for a week",
    impact: "1 week of animal care",
  },
  {
    amount: 2000,
    title: "Sapling",
    description: "Funds camera trap maintenance for a month",
    impact: "1 month of monitoring",
  },
  {
    amount: 5000,
    title: "Guardian",
    description: "Supports anti-poaching patrol for a week",
    impact: "7 days of protection",
  },
  {
    amount: 10000,
    title: "Protector",
    description: "Enables community education program",
    impact: "100 people educated",
  },
  {
    amount: 25000,
    title: "Champion",
    description: "Funds emergency animal rescue operation",
    impact: "1 rescue mission",
  },
  {
    amount: 50000,
    title: "Legend",
    description: "Sponsors habitat restoration project",
    impact: "1 hectare restored",
  },
];

const DonatePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={tigerImage}
            alt="Tiger"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-jungle-darkest via-jungle-dark/90 to-jungle-darkest" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-jungle-canopy uppercase tracking-[0.3em] text-sm mb-4">
              Aawaz Do — Raise Your Voice
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-ivory mb-6">
              Be Their Voice
            </h1>
            <p className="text-xl text-muted-foreground">
              In the depths of the jungle, countless lives hang in the balance. 
              Your contribution becomes their shield, their sanctuary, their 
              chance at survival. Every rupee echoes through the forest as hope.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 px-6 bg-jungle-deep border-y border-jungle-medium/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, value: 847, label: "Animals Saved" },
              { icon: TreePine, value: 12500, label: "Hectares Protected" },
              { icon: Users, value: 15000, label: "People Educated" },
              { icon: Heart, value: 2450, label: "Donors" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-jungle-canopy mx-auto mb-3" />
                <AnimatedCounter
                  end={stat.value}
                  className="font-display text-3xl text-ivory"
                />
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Tiers */}
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
              Choose Your Impact
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every contribution, regardless of size, creates ripples of change 
              through the ecosystem.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donationTiers.map((tier, index) => (
              <motion.div
                key={tier.amount}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="stat-card hover:border-jungle-amazon transition-all duration-300 group"
              >
                <div className="mb-6">
                  <p className="text-jungle-canopy text-sm uppercase tracking-wider mb-1">
                    {tier.title}
                  </p>
                  <p className="font-display text-4xl text-ivory">
                    ₹{tier.amount.toLocaleString()}
                  </p>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {tier.description}
                </p>
                
                <div className="pt-4 border-t border-jungle-medium/30">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Your Impact
                  </p>
                  <p className="text-jungle-canopy font-semibold">{tier.impact}</p>
                </div>

                <button className="w-full btn-hero mt-6 group-hover:shadow-lg transition-shadow">
                  Donate ₹{tier.amount.toLocaleString()}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Custom Amount */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 max-w-md mx-auto"
          >
            <div className="stat-card text-center">
              <h3 className="font-display text-xl text-ivory mb-4">
                Custom Amount
              </h3>
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="input-jungle pl-8 text-center"
                  />
                </div>
                <button className="btn-hero px-8">Donate</button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Donate */}
      <section className="py-20 px-6 bg-jungle-darkest">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl text-ivory mb-6">
                Where Your Money Goes
              </h2>
              
              <div className="space-y-6">
                {[
                  { percent: 45, label: "Direct Conservation", desc: "Anti-poaching, rescue operations, habitat protection" },
                  { percent: 25, label: "Technology & Monitoring", desc: "Camera traps, drones, tracking systems" },
                  { percent: 20, label: "Community Programs", desc: "Education, alternative livelihoods, conflict mitigation" },
                  { percent: 10, label: "Administration", desc: "Operations, communications, fundraising" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-ivory font-medium">{item.label}</span>
                      <span className="text-jungle-canopy">{item.percent}%</span>
                    </div>
                    <div className="h-2 bg-jungle-deep overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percent}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-jungle-amazon to-jungle-canopy"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] overflow-hidden"
            >
              <img
                src={tigerImage}
                alt="Conservation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-jungle-darkest/50 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 px-6 bg-jungle-deep border-t border-jungle-medium/30">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-muted-foreground text-sm mb-4">
            Vann Mitra Foundation is a registered NGO (Reg. No: XXXXX)
          </p>
          <p className="text-xs text-muted-foreground">
            All donations are eligible for tax benefits under Section 80G of the Income Tax Act.
            Your contribution is secure and goes directly to conservation efforts.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DonatePage;
