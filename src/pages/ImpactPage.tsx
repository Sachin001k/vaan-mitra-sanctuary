import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, TreePine, Heart, Users, Globe, GraduationCap, Ear, Film, FlaskConical } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import SectionHeader from "@/components/SectionHeader";
import { FAULT_LINE_VIDEO_ID, IEEE_PAPER_URL, PRESS_LINKS } from "@/data/siteLinks";
import PhotoGallery from "@/components/PhotoGallery";
import LocalVideo from "@/components/LocalVideo";
import { ARTWORK_PHOTOS, FIELD_WALK_VIDEO, OUTREACH_PHOTOS, SCREENING_PHOTOS } from "@/data/media";

const programmes = [
  {
    icon: GraduationCap,
    title: "Community education",
    body: "Sessions introducing wildlife behaviour, safer reporting practices and coexistence principles in schools and villages.",
  },
  {
    icon: Ear,
    title: "Field listening",
    body: "Interviews and discussions about crop loss, livestock risks, movement, compensation and the daily costs of sharing landscapes with wildlife. These are qualitative insights, not representative surveys.",
  },
  {
    icon: Film,
    title: "Conservation storytelling",
    body: "Screenings and discussions around Fault Line, connecting the film to practical local questions and community perspectives.",
  },
  {
    icon: FlaskConical,
    title: "Research and experimentation",
    body: "RAPTOR prototype testing and documented research milestones.",
  },
];

const measurement = [
  { level: "Activities", body: "Sessions held, participants attending, materials distributed, locations visited." },
  { level: "Outputs", body: "Feedback collected, trained volunteers, prototype tests completed." },
  { level: "Outcomes", body: "Changes in awareness or reporting, adoption of practices, validated response improvements." },
  { level: "Long-term impact", body: "Independently documented reductions in harm — never inferred from activity totals alone." },
];

const ImpactPage = () => {
  // Figures supplied by the team in the Website doc (Nov 2026). Shown statically, not as animated counters.
  const stats = [
    { icon: Shield, value: "25", label: "Animals rescued" },
    { icon: TreePine, value: "100+", label: "Hectares protected" },
    { icon: Users, value: "1 lakh", label: "People reached" },
    { icon: Heart, value: "$17k", label: "Funds raised" },
    { icon: Globe, value: "8", label: "States covered" },
  ];

  // Only milestones with a public source.
  const milestones = [
    {
      date: "Nov 2025",
      title: "RAPTOR featured in The Hitavada",
      description: "Coverage of the RAPTOR acoustic monitoring prototype and its aim of detecting threats to elephants.",
      href: PRESS_LINKS[0].href,
    },
    {
      date: null,
      title: "Featured by EdexLive",
      description: "“Listening to the forest” — a profile of the mission to protect people and wildlife.",
      href: PRESS_LINKS[1].href,
    },
    {
      date: null,
      title: "RAPTOR research published on IEEE Xplore",
      description: "The research behind RAPTOR's detection approach.",
      href: IEEE_PAPER_URL,
    },
    {
      date: null,
      title: "Fault Line documentary released",
      description: "A human–tiger conflict documentary exploring the lives of people living near tiger landscapes.",
      href: `https://www.youtube.com/watch?v=${FAULT_LINE_VIDEO_ID}`,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Impact — Work measured in people, places and learning"
        description="Community education, field listening, conservation storytelling and RAPTOR research: how Vann Mitra Foundation works and how we measure it."
        path="/impact"
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={OUTREACH_PHOTOS[1].src}
            alt=""
            className="w-full h-full object-cover opacity-25"
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
              Impact
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-ivory mb-6 max-w-4xl">
              Work measured in people, places and learning.
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              We document community engagement, conservation education, research activity and field
              experience—while distinguishing activity counts from demonstrated conservation outcomes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programmes */}
      <section className="py-20 px-6 bg-jungle-darkest">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="Programmes" title="What we do" />
          <div className="grid md:grid-cols-2 gap-6">
            {programmes.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="card-jungle p-8"
              >
                <item.icon className="w-10 h-10 text-jungle-canopy mb-5" aria-hidden="true" />
                <h3 className="font-display text-2xl text-ivory mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* In the field */}
      <section className="py-20 px-6 bg-jungle-dark border-t border-jungle-medium/20">
        <div className="max-w-7xl mx-auto space-y-16">
          <div>
            <SectionHeader eyebrow="Field listening" title="Conversations where people live with wildlife">
              <p>
                Team members meet residents in villages near wildlife habitat, listen to their
                experiences and share practical conflict-prevention guidance.
              </p>
            </SectionHeader>
            <div className="grid lg:grid-cols-[3fr_1fr] gap-6 items-start">
              <PhotoGallery photos={OUTREACH_PHOTOS} columns="grid-cols-1 sm:grid-cols-3" aspect="aspect-[3/4]" />
              <LocalVideo video={FIELD_WALK_VIDEO} className="max-w-xs w-full mx-auto" />
            </div>
          </div>

          <div>
            <SectionHeader eyebrow="Education & storytelling" title="Screenings and sessions in schools">
              <p>
                Film screenings and sessions on wildlife behaviour and coexistence. Students are shown
                from behind to protect their privacy.
              </p>
            </SectionHeader>
            <PhotoGallery photos={SCREENING_PHOTOS} aspect="aspect-video" />
          </div>

          <div>
            <SectionHeader eyebrow="Awareness through art" title="Artwork from our awareness work" />
            <PhotoGallery photos={ARTWORK_PHOTOS} aspect="aspect-[4/5]" />
          </div>
        </div>
      </section>

      {/* Measurement framework */}
      <section className="py-20 px-6 bg-jungle-deep border-y border-jungle-medium/20">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="Measurement framework" title="How we count what matters">
            <p>Each level needs its own evidence. Activity totals alone are never presented as conservation outcomes.</p>
          </SectionHeader>
          <ol className="grid md:grid-cols-4 gap-4">
            {measurement.map((item, index) => (
              <li key={item.level} className="bg-jungle-dark border border-jungle-medium/40 p-6">
                <p className="text-jungle-canopy font-display text-3xl mb-3" aria-hidden="true">0{index + 1}</p>
                <h3 className="font-display text-xl text-ivory mb-2">{item.level}</h3>
                <p className="text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Figures */}
      <section className="py-20 px-6 bg-jungle-dark">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="In numbers" title="Activity so far" />
          <dl className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <stat.icon className="w-8 h-8 text-jungle-canopy mb-4" aria-hidden="true" />
                <dd className="font-display text-4xl md:text-5xl text-ivory mb-2">{stat.value}</dd>
                <dt className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</dt>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-muted-foreground">
            Figures reported by the Vann Mitra team. Last updated November 2026.
          </p>
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
              Milestones
            </h2>
            <p className="text-muted-foreground">
              Public milestones, each linked to its source.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-jungle-medium/50" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-20"
                >
                  {/* Year badge */}
                  <div className="absolute left-0 w-16 h-16 bg-jungle-amazon flex items-center justify-center text-center">
                    <span className="text-ivory font-bold text-xs leading-tight">{milestone.date ?? "•"}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="card-jungle p-6">
                    <h3 className="font-display text-xl text-ivory mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {milestone.description}
                    </p>
                    <a
                      href={milestone.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-jungle-canopy underline underline-offset-4"
                    >
                      View source
                    </a>
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
