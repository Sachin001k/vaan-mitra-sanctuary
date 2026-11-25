import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, TreePine, Shield, Users, GraduationCap, Cpu, Film, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import SectionHeader from "@/components/SectionHeader";
import { CONTACT_EMAIL } from "@/data/siteLinks";
import { HERO_IMAGE } from "@/data/media";

// Figures supplied by the team in the Website doc (Nov 2026).
const stats = [
  { icon: Shield, value: "30", label: "Animals saved" },
  { icon: TreePine, value: "12,500", label: "Hectares saved" },
  { icon: Users, value: "2,50,000+", label: "People educated" },
  { icon: Heart, value: "37", label: "Donors" },
];

const supportAreas = [
  {
    icon: GraduationCap,
    title: "Community education",
    body: "Sessions in schools and villages on wildlife behaviour, safer reporting and coexistence.",
  },
  {
    icon: Cpu,
    title: "RAPTOR research",
    body: "Prototype hardware, field testing and the evaluation needed before any deployment claim.",
  },
  {
    icon: Film,
    title: "Storytelling",
    body: "Screenings of Fault Line and documentation of people's experience of living alongside wildlife.",
  },
];

const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Supporting Vann Mitra Foundation")}`;

const DonatePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Support our work"
        description="Support Vann Mitra Foundation's community education, RAPTOR research and conservation storytelling."
        path="/donate"
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE.src} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-jungle-darkest via-jungle-dark/90 to-jungle-darkest" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-jungle-canopy uppercase tracking-[0.3em] text-sm mb-4">Support</p>
            <h1 className="font-display text-5xl md:text-7xl text-ivory mb-6">Support our work.</h1>
            <p className="text-xl text-muted-foreground">
              Conservation becomes stronger when communities, researchers, institutions and young people
              can contribute to it. Your support helps us listen, learn and test practical ways for people
              and wildlife to coexist.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Figures */}
      <section className="py-16 px-6 bg-jungle-deep border-y border-jungle-medium/30">
        <div className="max-w-7xl mx-auto">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-8 h-8 text-jungle-canopy mx-auto mb-3" aria-hidden="true" />
                <dd className="font-display text-3xl md:text-4xl text-ivory">{stat.value}</dd>
                <dt className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</dt>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Figures reported by the Vann Mitra team. Last updated November 2026.
          </p>
        </div>
      </section>

      {/* What support funds */}
      <section className="py-20 px-6 bg-jungle-dark">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="Where support goes" title="What your support makes possible" />
          <div className="grid md:grid-cols-3 gap-6">
            {supportAreas.map((area) => (
              <article key={area.title} className="card-jungle p-8">
                <area.icon className="w-10 h-10 text-jungle-canopy mb-5" aria-hidden="true" />
                <h3 className="font-display text-2xl text-ivory mb-3">{area.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{area.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How to give */}
      <section className="py-20 px-6 bg-jungle-darkest">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader eyebrow="How to give" title="Talk to us about supporting the work" align="center">
            <p>
              We are setting up online giving. Until then, write to us and we will share how to contribute,
              what your support would fund and the documentation available.
            </p>
          </SectionHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={mailto} className="btn-hero gap-2">
              <Mail size={18} aria-hidden="true" /> Email {CONTACT_EMAIL}
            </a>
            <Link to="/contact" className="btn-ghost">
              Volunteer or collaborate
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DonatePage;
