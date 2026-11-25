import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Volume2, Cpu, Radio, Eye, UserCheck, ShieldAlert, ArrowRight, ExternalLink, FileText } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import SectionHeader from "@/components/SectionHeader";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { IEEE_PAPER_URL, RAPTOR_VIDEO_ID } from "@/data/siteLinks";
import raptorDevice1 from "@/assets/raptor-device-1.png";
import raptorDevice2 from "@/assets/raptor-device-2.webp";
import tigerImage from "@/assets/tiger.jpg";

// Research architecture, as described in project materials.
const architecture = [
  {
    title: "Prototype hardware",
    body: "Raspberry Pi-class edge processor, microphones, camera, positioning module and a power enclosure, as discussed in project materials.",
  },
  {
    title: "Analytical methods",
    body: "Candidate methods include spectrogram-based acoustic classification and object detection, run on the device.",
  },
  {
    title: "Deployed vs planned",
    body: "Configurations that have actually been deployed are described separately from planned modules. An untested sensor or algorithm is not presented as field-proven.",
  },
];

const steps = [
  { step: "01", title: "Observe", icon: Volume2, body: "Microphones and optional cameras or environmental sensors gather signals in a monitored area." },
  { step: "02", title: "Analyse", icon: Cpu, body: "On-device models assess selected acoustic and visual patterns for possible events of interest." },
  { step: "03", title: "Review", icon: Eye, body: "Potential detections are logged and routed for human interpretation; confidence scores and false alarms matter." },
  { step: "04", title: "Respond", icon: UserCheck, body: "Any action remains with authorised forest personnel and trained responders under local protocols." },
];

const safetyPoints = [
  "RAPTOR is decision support, not an emergency dispatch service.",
  "No real-time public wildlife location feeds.",
  "No public disclosure of patrol routes, vulnerable animal locations or exact device placements.",
  "Data retention, community consent, privacy and model error-handling are documented as part of the research.",
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
      <PageMeta
        title="RAPTOR — Listening to the forest"
        description="RAPTOR (Rapid Alert & Patrol Tracking for Operational Rescue) is a research initiative exploring edge AI and acoustic monitoring to support human–elephant coexistence."
        path="/raptor"
      />
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
                  Conservation technology / Field research
                </span>
              </div>

              <h1 className="font-display text-5xl md:text-7xl text-ivory mb-6">
                Listening to the forest.
              </h1>

              <p className="text-xl text-jungle-canopy font-display mb-6">
                RAPTOR — Rapid Alert &amp; Patrol Tracking for Operational Rescue
              </p>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                RAPTOR investigates how edge AI, acoustic monitoring and visual sensing can help
                identify possible wildlife distress and threats, enabling faster assessment by people
                responsible for conservation response.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={IEEE_PAPER_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-hero flex items-center justify-center gap-2"
                >
                  <FileText size={18} aria-hidden="true" />
                  Read the research
                </a>
                <Link
                  to="/contact"
                  className="btn-ghost flex items-center justify-center gap-2"
                >
                  Research collaboration
                </Link>
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
                  alt="RAPTOR prototype acoustic monitoring device"
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

      {/* The Problem */}
      <section className="py-20 px-6 bg-jungle-darkest">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-12">
          <div>
            <p className="text-jungle-canopy uppercase tracking-[0.25em] text-xs md:text-sm mb-4 font-medium">The problem</p>
            <h2 className="font-display text-4xl md:text-5xl text-ivory">Alerts only help when people can act on them.</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Human–elephant conflict takes different forms across Indian landscapes, from crop-raiding
            encounters to barriers along elephant movement routes. Field teams need context-sensitive
            information, reliable reporting and safe procedures. A sensor alert is useful only when it
            is accurate enough, interpretable and connected to an appropriate response.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-jungle-dark border-y border-jungle-medium/20">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="How RAPTOR works" title="Four steps, with people in the loop" align="center" />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item, index) => (
              <motion.li
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="stat-card text-left relative"
              >
                <span className="absolute top-6 right-6 text-5xl font-display text-jungle-medium/60" aria-hidden="true">
                  {item.step}
                </span>
                <item.icon className="w-10 h-10 text-jungle-canopy mb-6" aria-hidden="true" />
                <h3 className="font-display text-2xl text-ivory mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.body}</p>
              </motion.li>
            ))}
          </ol>
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
                alt="RAPTOR prototype"
                className="w-full h-auto"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-jungle-canopy uppercase tracking-[0.25em] text-xs md:text-sm mb-4 font-medium">Prototype</p>
              <h2 className="font-display text-4xl text-ivory mb-6">
                The device
              </h2>

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

      {/* Research Architecture */}
      <section className="py-20 px-6 bg-jungle-dark">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="Research architecture" title="What the system is made of" />
          <div className="grid md:grid-cols-3 gap-6">
            {architecture.map((item) => (
              <article key={item.title} className="card-jungle p-8">
                <h3 className="font-display text-xl text-ivory mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Field Validation */}
      <section className="py-20 px-6 bg-jungle-darkest border-y border-jungle-medium/20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <SectionHeader eyebrow="Field validation" title="A demonstration is not a validated deployment">
              <p>
                Results are presented with their methodology, dates, the number of independently
                evaluated recordings, precision, recall, false-positive rate, test conditions,
                limitations and authorisations as they become available.
              </p>
              <p>Sensitive device coordinates and wildlife locations are never published.</p>
            </SectionHeader>
          </div>
          <div className="card-jungle p-8 self-start">
            <h3 className="font-display text-xl text-ivory mb-4 flex items-center gap-2">
              <ShieldAlert className="text-jungle-canopy" size={22} aria-hidden="true" /> Safety &amp; ethics
            </h3>
            <ul className="space-y-3">
              {safetyPoints.map((point) => (
                <li key={point} className="text-muted-foreground leading-relaxed flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 bg-jungle-canopy" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Research & Media */}
      <section className="py-20 px-6 bg-jungle-dark">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <YouTubeEmbed videoId={RAPTOR_VIDEO_ID} title="RAPTOR project video" />
          <div>
            <SectionHeader eyebrow="Research & media" title="Read the research">
              <p>
                The RAPTOR research is published on IEEE Xplore. The project video shows the prototype
                and how it is being explored.
              </p>
            </SectionHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={IEEE_PAPER_URL} target="_blank" rel="noreferrer" className="btn-hero gap-2">
                IEEE publication <ExternalLink size={16} aria-hidden="true" />
              </a>
              <a
                href={`https://www.youtube.com/watch?v=${RAPTOR_VIDEO_ID}`}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost gap-2"
              >
                Watch on YouTube <ExternalLink size={16} aria-hidden="true" />
              </a>
            </div>
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
            alt=""
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
              Work with us on RAPTOR
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              We welcome conversations with researchers, forest authorities and institutions
              interested in responsible conservation monitoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-hero gap-2">
                Research collaboration <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/impact" className="btn-ghost gap-2">
                Explore fieldwork <ArrowRight size={16} aria-hidden="true" />
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
