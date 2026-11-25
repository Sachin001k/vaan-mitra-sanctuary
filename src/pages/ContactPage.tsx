import type { FormEvent } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { MapPin, Mail } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import { CONTACT_EMAIL } from "@/data/siteLinks";

const enquiryTypes = [
  { value: "General enquiry", label: "General enquiries" },
  { value: "Research and technology", label: "Research and technology" },
  { value: "School programmes", label: "School programmes" },
  { value: "Documentary and photography", label: "Documentary and photography" },
  { value: "Volunteering and collaboration", label: "Volunteering and collaboration" },
  { value: "Media request", label: "Media requests" },
];

// No backend yet: open the visitor's email app with the message pre-filled.
const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = String(form.get("name") ?? "");
  const email = String(form.get("email") ?? "");
  const organisation = String(form.get("organisation") ?? "");
  const subject = String(form.get("subject") ?? "") || "General enquiry";
  const message = String(form.get("message") ?? "");
  const from = organisation ? `${name}, ${organisation}` : name;
  const body = `${message}\n\n— ${from} (${email})`;
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Website enquiry: ${subject}`,
  )}&body=${encodeURIComponent(body)}`;
};

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Contact — Start a conversation"
        description="Research partnerships, educational sessions, field collaboration, media requests and volunteering with Vann Mitra Foundation."
        path="/contact"
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6 bg-jungle-dark">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-jungle-canopy uppercase tracking-[0.3em] text-sm mb-4">
              Contact
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-ivory mb-6">
              Start a conversation.
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Research partnerships, educational sessions, field collaboration, media requests and
              volunteering all begin with a thoughtful exchange.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-6 bg-jungle-darkest">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl text-ivory mb-8">
                Send us a message
              </h2>
              <p className="text-muted-foreground mb-8 -mt-4">
                Sending opens your email app with the message ready to send to {CONTACT_EMAIL}.
              </p>
              
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm text-muted-foreground uppercase tracking-wider mb-2">
                      Your name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      required
                      placeholder="Enter your name"
                      className="input-jungle"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm text-muted-foreground uppercase tracking-wider mb-2">
                      Email address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      placeholder="Enter your email"
                      className="input-jungle"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-org" className="block text-sm text-muted-foreground uppercase tracking-wider mb-2">
                      Organisation (optional)
                    </label>
                    <input
                      id="contact-org"
                      type="text"
                      name="organisation"
                      autoComplete="organization"
                      placeholder="School, institution or group"
                      className="input-jungle"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="block text-sm text-muted-foreground uppercase tracking-wider mb-2">
                      Enquiry type
                    </label>
                    <select id="contact-subject" name="subject" required className="input-jungle">
                      <option value="">Select a topic</option>
                      {enquiryTypes.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm text-muted-foreground uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={6}
                    name="message"
                    required
                    placeholder="Tell us how we can help..."
                    className="input-jungle resize-none"
                  />
                </div>

                <label className="flex items-start gap-3 text-muted-foreground">
                  <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[hsl(var(--ochre))]" />
                  <span>
                    I agree that Vann Mitra Foundation may use these details to reply to my enquiry.
                    See our <Link to="/privacy" className="text-jungle-canopy underline">privacy notice</Link>.
                  </span>
                </label>

                <button type="submit" className="btn-hero w-full md:w-auto">
                  Send message
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-display text-3xl text-ivory mb-8">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-jungle-amazon flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-ivory" size={20} />
                  </div>
                  <div>
                    <h3 className="text-ivory font-semibold mb-1 font-body text-base">Based in</h3>
                    <p className="text-muted-foreground text-sm">Nagpur, Maharashtra, India</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-jungle-amazon flex items-center justify-center flex-shrink-0">
                    <Mail className="text-ivory" size={20} />
                  </div>
                  <div>
                    <h3 className="text-ivory font-semibold mb-1 font-body text-base">Email</h3>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-muted-foreground text-sm hover:text-jungle-canopy transition-colors"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>

              </div>

              {/* What to contact us about */}
              <div className="pt-8 border-t border-jungle-medium/30">
                <h3 className="text-ivory font-semibold mb-4">We can help with</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {enquiryTypes.map((t) => (
                    <li key={t.value} className="flex gap-3">
                      <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 bg-jungle-canopy" aria-hidden="true" />
                      {t.label}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-muted-foreground">
                  To report a wildlife concern or share a community experience, use{" "}
                  <Link to="/aawaz-do" className="text-jungle-canopy underline">Aawaz Do</Link>. For an
                  immediate threat, contact local emergency services or the forest department.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
