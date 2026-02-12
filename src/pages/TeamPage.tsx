import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Handshake, ExternalLink, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const teamMembers = [
  {
    name: "Arjun Mehta",
    role: "Founder & Director",
    bio: "Wildlife biologist with 8+ years in tiger conservation across Central India. Led field operations in Pench and Kanha.",
    focus: "Tiger Conservation",
    emoji: "🐯",
  },
  {
    name: "Priya Sharma",
    role: "Head of Technology",
    bio: "AI/ML engineer building RAPTOR — our drone and camera trap monitoring system for real-time poaching alerts.",
    focus: "Conservation Tech",
    emoji: "🛰️",
  },
  {
    name: "Dr. Kavitha Nair",
    role: "Chief Scientist",
    bio: "PhD in Ecology from IISc Bangalore. Specializes in elephant corridor mapping and human-wildlife conflict mitigation.",
    focus: "Elephant Corridors",
    emoji: "🐘",
  },
  {
    name: "Rohit Verma",
    role: "Field Operations Lead",
    bio: "Former forest ranger turned conservationist. Coordinates ground teams across 12 national parks in India.",
    focus: "Field Operations",
    emoji: "🌿",
  },
  {
    name: "Ananya Desai",
    role: "Community Outreach",
    bio: "Works with indigenous communities to build sustainable coexistence models between humans and wildlife.",
    focus: "Community Work",
    emoji: "🤝",
  },
  {
    name: "Vikram Singh",
    role: "Wildlife Photographer",
    bio: "Award-winning photographer documenting India's endangered species. Published in National Geographic India.",
    focus: "Visual Documentation",
    emoji: "📷",
  },
];

const upcomingEvents = [
  {
    title: "Kaziranga Rhino Census 2026",
    date: "March 15-20, 2026",
    location: "Kaziranga National Park, Assam",
    type: "Wildlife Survey",
    description: "Annual population count of the Greater One-Horned Rhinoceros using drone-assisted technology.",
  },
  {
    title: "Tree Planting Drive — Western Ghats",
    date: "April 5, 2026",
    location: "Coorg, Karnataka",
    type: "Tree Planting",
    description: "Community-driven reforestation of 5,000 native trees to restore elephant corridor connectivity.",
  },
  {
    title: "Conservation Tech Workshop",
    date: "April 22, 2026",
    location: "IIT Delhi (Virtual + In-person)",
    type: "Workshop",
    description: "Hands-on workshop on AI-powered camera trap analysis and drone surveying for wildlife monitoring.",
  },
  {
    title: "World Tiger Day — Awareness Campaign",
    date: "July 29, 2026",
    location: "Pan-India, Online",
    type: "Campaign",
    description: "Nationwide digital campaign with live tiger tracking demos and donation drives.",
  },
  {
    title: "Pench-Kanha Corridor Survey",
    date: "September 10-18, 2026",
    location: "Madhya Pradesh",
    type: "Wildlife Survey",
    description: "Field survey mapping elephant movement along the critical Pench-Kanha wildlife corridor.",
  },
];

const partners = [
  { name: "Wildlife Institute of India", type: "Research", location: "Dehradun" },
  { name: "WWF India", type: "Conservation", location: "New Delhi" },
  { name: "IISc Centre for Ecological Sciences", type: "Research", location: "Bangalore" },
  { name: "Wildlife Trust of India", type: "Conservation", location: "Noida" },
  { name: "National Tiger Conservation Authority", type: "Government", location: "New Delhi" },
  { name: "Bombay Natural History Society", type: "Research", location: "Mumbai" },
  { name: "Centre for Wildlife Studies", type: "Research", location: "Bangalore" },
  { name: "Forest Survey of India", type: "Government", location: "Dehradun" },
];

const eventTypeColors: Record<string, string> = {
  "Wildlife Survey": "bg-jungle-amazon",
  "Tree Planting": "bg-jungle-tropical",
  Workshop: "bg-jungle-canopy text-jungle-darkest",
  Campaign: "bg-jungle-medium",
};

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 bg-jungle-dark relative overflow-hidden">
        {/* Decorative floating elements */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-jungle-canopy/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${16 + Math.random() * 24}px`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 5 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
          >
            🍃
          </motion.div>
        ))}

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-jungle-canopy uppercase tracking-[0.3em] text-sm mb-4 flex items-center gap-2">
              <Users size={16} />
              Our People
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-ivory mb-6">
              The Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Meet the conservationists, scientists, and technologists working together
              to protect India's wildlife through innovation and community action.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 px-6 bg-jungle-darkest">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display text-4xl text-ivory mb-2">Team Members</h2>
            <p className="text-muted-foreground">The people behind Vaan Mitra Foundation</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-jungle-dark border border-jungle-medium/30 p-6 group hover:border-jungle-amazon transition-all duration-300"
              >
                {/* Avatar & Emoji */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-jungle-deep border border-jungle-medium/50 flex items-center justify-center text-3xl flex-shrink-0 group-hover:border-jungle-canopy transition-colors">
                    {member.emoji}
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-ivory">{member.name}</h3>
                    <p className="text-jungle-canopy text-sm font-medium">{member.role}</p>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{member.bio}</p>

                <div className="pt-4 border-t border-jungle-medium/20">
                  <span className="inline-block px-3 py-1 bg-jungle-deep text-xs text-jungle-canopy uppercase tracking-wider">
                    {member.focus}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rangoli Divider */}
      <div className="relative py-6 bg-jungle-deep overflow-hidden">
        <div className="flex items-center justify-center gap-4">
          <div className="h-px flex-1 max-w-[200px] bg-gradient-to-r from-transparent to-jungle-canopy/40" />
          <motion.div className="text-2xl animate-rangoli-spin">✦</motion.div>
          <motion.div className="text-jungle-canopy text-lg animate-wiggle">❋</motion.div>
          <motion.div className="text-2xl animate-rangoli-spin" style={{ animationDirection: "reverse" }}>✦</motion.div>
          <div className="h-px flex-1 max-w-[200px] bg-gradient-to-l from-transparent to-jungle-canopy/40" />
        </div>
      </div>

      {/* Upcoming Events */}
      <section className="py-20 px-6 bg-jungle-deep">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-jungle-canopy uppercase tracking-[0.3em] text-xs mb-3 flex items-center gap-2">
              <Calendar size={14} />
              What's Coming
            </p>
            <h2 className="font-display text-4xl text-ivory mb-2">Upcoming Events</h2>
            <p className="text-muted-foreground">Conservation workshops, surveys, and community drives</p>
          </motion.div>

          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-jungle-dark border border-jungle-medium/30 p-6 flex flex-col md:flex-row md:items-center gap-4 group hover:border-jungle-amazon transition-all duration-300"
              >
                {/* Date badge */}
                <div className="flex-shrink-0 w-20 text-center">
                  <div className="bg-jungle-deep border border-jungle-medium/30 p-3">
                    <p className="text-jungle-canopy font-display text-lg leading-tight">
                      {event.date.split(" ")[0]}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {event.date.split(" ")[1]?.replace(",", "")}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-display text-lg text-ivory">{event.title}</h3>
                    <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold text-ivory ${eventTypeColors[event.type] || "bg-jungle-medium"}`}>
                      {event.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {event.location}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaf Divider */}
      <div className="relative py-4 bg-jungle-darkest overflow-hidden flex items-center justify-center gap-6">
        <motion.span className="text-2xl animate-leaf-sway" style={{ animationDelay: "0s" }}>🍃</motion.span>
        <motion.span className="text-xl animate-leaf-sway" style={{ animationDelay: "0.7s" }}>🌿</motion.span>
        <motion.span className="text-2xl animate-leaf-sway" style={{ animationDelay: "1.4s" }}>🍃</motion.span>
      </div>

      {/* Partners */}
      <section className="py-20 px-6 bg-jungle-darkest">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p className="text-jungle-canopy uppercase tracking-[0.3em] text-xs mb-3 flex items-center justify-center gap-2">
              <Handshake size={14} />
              Collaborations
            </p>
            <h2 className="font-display text-4xl text-ivory mb-2">Our Partners</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We work alongside India's leading research institutions, conservation NGOs, and government bodies.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -3, scale: 1.02 }}
                className="bg-jungle-dark border border-jungle-medium/30 p-5 group hover:border-jungle-canopy transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 bg-jungle-deep border border-jungle-medium/50 flex items-center justify-center mx-auto mb-3 text-xl group-hover:border-jungle-canopy transition-colors">
                  {partner.type === "Research" ? "🔬" : partner.type === "Government" ? "🏛️" : "🌍"}
                </div>
                <h3 className="font-display text-sm text-ivory mb-1 leading-tight">{partner.name}</h3>
                <p className="text-[10px] text-jungle-canopy uppercase tracking-wider mb-1">{partner.type}</p>
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                  <MapPin size={10} /> {partner.location}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-jungle-deep border-t border-jungle-medium/20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-ivory mb-4">
              Want to Join Our Team?
            </h2>
            <p className="text-muted-foreground mb-8">
              We're always looking for passionate conservationists, developers, and volunteers.
            </p>
            <a href="/contact" className="btn-hero inline-flex items-center gap-2">
              Get In Touch <ExternalLink size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TeamPage;
