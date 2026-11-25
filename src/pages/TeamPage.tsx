import { motion } from "framer-motion";
import { Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Link } from "react-router-dom";

// Portraits from the team's Drive folder ("Website Images & Videos/Team").
const teamMembers: { name: string; role: string; initials: string; photo?: string }[] = [
  { name: "Atharva Agrawal", role: "Founder & President", initials: "AA", photo: "/media/team/atharva-agrawal.webp" },
  { name: "Vanssh Badhgare", role: "Vice President", initials: "VB", photo: "/media/team/vanssh-badghare.webp" },
  { name: "Amreen Kaur Bhatia", role: "Director of Marketing", initials: "AB", photo: "/media/team/amreen-kaur-bhatia.webp" },
  { name: "Vihaan Gupta", role: "Director of Operations & Outreach", initials: "VG", photo: "/media/team/vihaan-gupta.webp" },
  { name: "Rida Sethi", role: "Creative Director", initials: "RS", photo: "/media/team/rida-sethi.webp" },
  { name: "Shreya Banerjee", role: "Arts & Impact Head", initials: "SB", photo: "/media/team/shreya-banerjee.webp" },
  { name: "Aadvik Agrawal", role: "Team member", initials: "AA", photo: "/media/team/aadvik-agrawal.webp" },
];

const advisoryBoard = [
  {
    name: "Animesh Manna",
    role: "Wildlife Conservationist & Naturalist",
    description:
      "Experienced conservationist and field naturalist dedicated to biodiversity conservation, wildlife monitoring, and environmental education. Works across MP.",
  },
  {
    name: "Imran Khan",
    role: "Wildlife Naturalist & Conservation Expert",
    description:
      "Wildlife expert with extensive field experience in ecology, wildlife behaviour, and conservation awareness.",
  },
  {
    name: "Radhe Nagpure",
    role: "Wildlife Photographer, Conservationist & Wildlife Tour Specialist",
    description:
      "Wildlife photographer and conservation advocate, specializing in ethical wildlife tourism, nature interpretation, and conservation storytelling through photography.",
  },
  {
    name: "Dr. Vijay Ramesh",
    role: "Scientist & Researcher, Cornell Lab of Ornithology",
    description:
      "An ecoacoustics researcher whose work focuses on biodiversity monitoring, acoustic ecology, and the application of emerging technologies to wildlife conservation. He provides scientific guidance and research mentorship to RAPTOR.",
  },
];

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Team — People behind the work"
        description="Vann Mitra brings together young conservation advocates, volunteers, researchers and collaborators committed to responsible coexistence."
        path="/team"
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 bg-jungle-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-jungle-canopy uppercase tracking-[0.3em] text-sm mb-4 flex items-center gap-2">
              <Users size={16} />
              Team
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-ivory mb-6">
              People behind the work.
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Vann Mitra brings together young conservation advocates, volunteers, researchers and
              collaborators committed to responsible coexistence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our approach + founder note */}
      <section className="py-20 px-6 bg-jungle-darkest border-b border-jungle-medium/20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-jungle-canopy uppercase tracking-[0.25em] text-xs md:text-sm mb-4 font-medium">Our approach</p>
            <h2 className="font-display text-3xl md:text-4xl text-ivory mb-5">Field-based conservation is collaborative.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Community members contribute lived experience; educators create space for learning;
              scientists help evaluate evidence; volunteers make outreach possible. We aim to credit
              contributions accurately and avoid presenting informal conversations as institutional
              partnerships.
            </p>
          </div>
          <div className="card-jungle p-8 self-start">
            <p className="text-jungle-canopy uppercase tracking-[0.25em] text-xs md:text-sm mb-4 font-medium">Founder note</p>
            <p className="text-lg text-ivory/90 leading-relaxed font-display italic">
              Vann Mitra was created to connect an interest in wildlife with practical efforts to reduce
              conflict and improve understanding between people and nature. Its work spans community
              education, research and documentary storytelling.
            </p>
            <p className="mt-4 text-muted-foreground">— Atharva Agrawal, Founder</p>
          </div>
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
            <h2 className="font-display text-4xl text-ivory mb-2">The Mitras</h2>
            <p className="text-muted-foreground">The core team behind Vann Mitra Foundation</p>
          </motion.div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.li
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                viewport={{ once: true }}
                className="bg-jungle-dark border border-jungle-medium/30 group hover:border-jungle-amazon transition-colors duration-300"
              >
                <div className="aspect-[4/5] bg-jungle-deep overflow-hidden">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={`Portrait of ${member.name}`}
                      loading="lazy"
                      width={800}
                      height={1000}
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-display text-5xl text-jungle-canopy" aria-hidden="true">
                      {member.initials}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl text-ivory">{member.name}</h3>
                  <p className="text-jungle-canopy text-sm font-medium">{member.role}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="py-20 px-6 bg-jungle-deep border-t border-jungle-medium/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display text-4xl text-ivory mb-3">Advisers</h2>
            <p className="text-muted-foreground max-w-3xl">
              Advisers share expertise in conservation, research and storytelling. Advisers are listed
              with their approval and do not imply institutional endorsement.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {advisoryBoard.map((advisor, index) => (
              <motion.article
                key={advisor.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-jungle-dark border border-jungle-medium/30 p-6 hover:border-jungle-amazon transition-colors"
              >
                <h3 className="font-display text-2xl text-ivory mb-1">{advisor.name}</h3>
                <p className="text-jungle-canopy text-sm font-medium mb-4">{advisor.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {advisor.description}
                </p>
              </motion.article>
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
              Join the team
            </h2>
            <p className="text-muted-foreground mb-4 text-lg">
              Interested in education, photography, data analysis, conservation communication or local
              volunteering? Contact the team with your interests and availability.
            </p>
            <p className="text-muted-foreground mb-8 text-sm">
              Young volunteers take part with appropriate adult supervision and safeguarding.
            </p>
            <Link to="/contact" className="btn-hero inline-flex items-center gap-2">
              Get in touch
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TeamPage;
