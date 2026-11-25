import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Radio, Megaphone, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AmbientSound from "@/components/AmbientSound";
import PageMeta from "@/components/PageMeta";
import SectionHeader from "@/components/SectionHeader";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { FAULT_LINE_VIDEO_ID, IEEE_PAPER_URL, PRESS_LINKS } from "@/data/siteLinks";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const pillars = [
  {
    icon: Users,
    title: "People & coexistence",
    body: "Community conversations, local education, field observations and accessible information that help residents understand risks and response pathways.",
  },
  {
    icon: Radio,
    title: "Research & technology",
    body: "RAPTOR explores acoustic and visual monitoring to identify possible threats and support timely human review; it is a research system, not a replacement for trained responders.",
  },
  {
    icon: Megaphone,
    title: "Awareness & action",
    body: "Documentary storytelling, student outreach, photography and volunteering make conservation understandable and participatory.",
  },
];

const featuredWork = [
  {
    kicker: "RAPTOR",
    title: "Listening for signs of risk.",
    body: "An interdisciplinary research initiative examining how field sensors and AI-assisted detection may support human–elephant coexistence and conservation monitoring.",
    cta: "Explore RAPTOR",
    to: "/raptor",
  },
  {
    kicker: "Community programmes",
    title: "Knowledge rooted in place.",
    body: "Workshops and awareness activities invite residents and young people to discuss wildlife behaviour, reporting channels and everyday coexistence.",
    cta: "View our impact",
    to: "/impact",
  },
];

const fieldFeatures = [
  "What communities tell us about coexistence.",
  "Why early warning must be designed with people.",
  "Behind the lens: documenting human–tiger conflict.",
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Living alongside wildlife"
        description="Vann Mitra Foundation brings community knowledge, field research, conservation education and emerging technology together to support coexistence between people and wildlife in India."
        path="/"
      />
      <Navigation />

      <AmbientSound
        audioUrl="https://cdn.pixabay.com/download/audio/2022/03/10/audio_5f4ce1c24d.mp3"
        defaultVolume={0.25}
      />

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden flex items-center">
        <iframe
          src="https://www.youtube.com/embed/ZSMsuqBciGo?si=HmdYHcVQlXHe8kVV&autoplay=1&mute=1&controls=0&loop=1&playlist=ZSMsuqBciGo&modestbranding=1"
          title="Forest landscape background video"
          aria-hidden="true"
          tabIndex={-1}
          allow="autoplay; fullscreen; picture-in-picture"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-jungle-darkest/70 via-jungle-darkest/50 to-jungle-darkest" />
        <div className="absolute inset-0 bg-gradient-to-r from-jungle-darkest/80 via-jungle-darkest/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-jungle-canopy uppercase tracking-[0.25em] text-xs md:text-sm mb-6 font-medium">
              Vann Mitra Foundation · People and wildlife, together
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-ivory leading-tight mb-8">
              Living alongside wildlife.
            </h1>
            <p className="text-lg md:text-xl text-ivory/90 leading-relaxed mb-10">
              Forests do not end where villages begin. Across India, people and wildlife share
              landscapes, water, routes and resources. Vann Mitra Foundation works at this
              intersection—bringing community knowledge, field research, conservation education and
              emerging technology together to support coexistence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/impact" className="btn-hero gap-2">
                Explore our work <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/raptor" className="btn-ghost gap-2">
                Discover RAPTOR <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 01 — WHY COEXISTENCE MATTERS */}
      <section className="py-24 px-6 bg-jungle-darkest">
        <motion.div {...fadeUp} className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
          <div>
            <p className="text-jungle-canopy uppercase tracking-[0.25em] text-xs md:text-sm mb-4 font-medium">
              Why coexistence matters
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-ivory">
              Conservation begins with coexistence.
            </h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Human–wildlife conflict is not simply a question of animal encounters. Crop damage,
            livestock losses, uncertainty around movement, interrupted education and fear can affect
            households living close to wildlife habitat. Conservation responses must therefore
            address livelihoods and public safety alongside the ecological needs of species. Vann
            Mitra supports practical, community-informed approaches: listening first, identifying
            local risks, communicating responsibly and testing preventive solutions.
          </p>
        </motion.div>
      </section>

      {/* 02 — THREE PILLARS */}
      <section className="py-24 px-6 bg-jungle-dark border-y border-jungle-medium/20">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="Our work brings together" title="Three areas of practice" />
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar, index) => (
              <motion.article
                key={pillar.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-jungle p-8"
              >
                <pillar.icon className="w-10 h-10 text-jungle-canopy mb-6" aria-hidden="true" />
                <h3 className="font-display text-2xl text-ivory mb-3">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{pillar.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — FEATURED WORK */}
      <section className="py-24 px-6 bg-jungle-darkest">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="Featured work" title="What we are working on" />

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {featuredWork.map((item, index) => (
              <motion.article
                key={item.kicker}
                {...fadeUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-jungle p-8 flex flex-col"
              >
                <p className="text-jungle-canopy uppercase tracking-[0.2em] text-xs mb-3">{item.kicker}</p>
                <h3 className="font-display text-3xl text-ivory mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8 flex-1">{item.body}</p>
                <Link to={item.to} className="inline-flex items-center gap-2 text-jungle-canopy font-medium hover:gap-4 transition-all">
                  {item.cta} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Fault Line */}
          <motion.article {...fadeUp} className="card-jungle grid lg:grid-cols-2">
            <YouTubeEmbed videoId={FAULT_LINE_VIDEO_ID} title="Fault Line — a human–tiger conflict documentary" />
            <div className="p-8 flex flex-col justify-center">
              <p className="text-jungle-canopy uppercase tracking-[0.2em] text-xs mb-3">Fault Line</p>
              <h3 className="font-display text-3xl text-ivory mb-4">A human–tiger conflict documentary.</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Explore the experiences of people living near tiger landscapes through film and
                first-hand perspectives.
              </p>
              <a
                href={`https://www.youtube.com/watch?v=${FAULT_LINE_VIDEO_ID}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-jungle-canopy font-medium hover:gap-4 transition-all"
              >
                Watch the documentary <ExternalLink size={16} aria-hidden="true" />
              </a>
            </div>
          </motion.article>
        </div>
      </section>

      {/* 04 — FROM THE FIELD */}
      <section className="py-24 px-6 bg-jungle-dark border-y border-jungle-medium/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <SectionHeader eyebrow="From the field" title="Stories from the field">
              <p>Photography, documentaries and first-hand perspectives on the relationship between people and wildlife.</p>
            </SectionHeader>
            <Link to="/journal" className="mb-12 inline-flex items-center gap-2 text-jungle-canopy font-medium hover:gap-4 transition-all">
              Read and explore <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {fieldFeatures.map((title, index) => (
              <motion.div key={title} {...fadeUp} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Link to="/journal" className="card-jungle p-8 block h-full group">
                  <p className="text-jungle-canopy font-display text-4xl mb-6" aria-hidden="true">
                    0{index + 1}
                  </p>
                  <h3 className="font-display text-xl text-ivory group-hover:text-jungle-canopy transition-colors">
                    {title}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRESS / RESEARCH */}
      <section className="py-20 px-6 bg-jungle-darkest">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="Press & research" title="In the news" />
          <ul className="grid md:grid-cols-3 gap-6">
            {PRESS_LINKS.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noreferrer" className="card-jungle p-6 block h-full group">
                  <p className="text-jungle-canopy uppercase tracking-[0.2em] text-xs mb-3">{item.outlet}</p>
                  <p className="text-ivory font-display text-lg group-hover:text-jungle-canopy transition-colors">
                    {item.title}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-muted-foreground">
                    Read the article <ExternalLink size={14} aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
            <li>
              <a href={IEEE_PAPER_URL} target="_blank" rel="noreferrer" className="card-jungle p-6 block h-full group">
                <p className="text-jungle-canopy uppercase tracking-[0.2em] text-xs mb-3">IEEE Xplore</p>
                <p className="text-ivory font-display text-lg group-hover:text-jungle-canopy transition-colors">
                  RAPTOR publication
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-muted-foreground">
                  View the paper <ExternalLink size={14} aria-hidden="true" />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* 05 — JOIN THE WORK */}
      <section className="py-28 px-6 bg-jungle-deep">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
          <p className="text-jungle-canopy uppercase tracking-[0.25em] text-xs md:text-sm mb-4 font-medium">
            Join the work
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-ivory mb-6">
            Conservation is a shared responsibility.
          </h2>
          <p className="text-lg text-ivory/80 mb-10 leading-relaxed">
            Meaningful progress depends on residents, researchers, forest authorities, educators,
            volunteers and responsible partners. Join a programme, share expertise or begin a
            conversation about collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-hero">Volunteer</Link>
            <Link to="/aawaz-do" className="btn-ghost">Share a concern</Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
