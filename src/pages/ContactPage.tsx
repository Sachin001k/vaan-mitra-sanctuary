import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Youtube } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
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
              Get In Touch
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-ivory mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Have questions about conservation? Want to volunteer or partner with us? 
              We'd love to hear from you.
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
                Send Us a Message
              </h2>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-muted-foreground uppercase tracking-wider mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="input-jungle"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="input-jungle"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <select className="input-jungle">
                    <option value="">Select a topic</option>
                    <option value="volunteer">Volunteer Inquiry</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="donation">Donation Question</option>
                    <option value="media">Media Request</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Tell us how we can help..."
                    className="input-jungle resize-none"
                  />
                </div>

                <button type="submit" className="btn-hero w-full md:w-auto">
                  Send Message
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
                    <h4 className="text-ivory font-semibold mb-1">Office Address</h4>
                    <p className="text-muted-foreground text-sm">
                      Vann Mitra NGO<br />
                      Nagpur, Maharashtra 440010
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-jungle-amazon flex items-center justify-center flex-shrink-0">
                    <Mail className="text-ivory" size={20} />
                  </div>
                  <div>
                    <h4 className="text-ivory font-semibold mb-1">Email</h4>
                    <a
                      href="mailto:vannmitrafoundation.org@gmail.com"
                      className="text-muted-foreground text-sm hover:text-jungle-canopy transition-colors"
                    >
                      vannmitrafoundation.org@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-jungle-amazon flex items-center justify-center flex-shrink-0">
                    <Phone className="text-ivory" size={20} />
                  </div>
                  <div>
                    <h4 className="text-ivory font-semibold mb-1">Phone</h4>
                    <a
                      href="tel:+917350511500"
                      className="text-muted-foreground text-sm hover:text-jungle-canopy transition-colors"
                    >
                      +91 73505 11500
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-jungle-amazon flex items-center justify-center flex-shrink-0">
                    <Clock className="text-ivory" size={20} />
                  </div>
                  <div>
                    <h4 className="text-ivory font-semibold mb-1">Working Hours</h4>
                    <p className="text-muted-foreground text-sm">
                      Monday - Saturday: 9:00 AM - 6:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-8 border-t border-jungle-medium/30">
                <h4 className="text-ivory font-semibold mb-4">Follow Our Journey</h4>
                <div className="flex gap-4">
                  {[
                    { icon: Instagram, label: "Instagram" },
                    { icon: Facebook, label: "Facebook" },
                    { icon: Twitter, label: "Twitter" },
                    { icon: Youtube, label: "Youtube" },
                  ].map(({ icon: Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="w-12 h-12 bg-jungle-deep hover:bg-jungle-amazon transition-colors flex items-center justify-center"
                    >
                      <Icon size={20} className="text-ivory" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="aspect-video bg-jungle-deep border border-jungle-medium/30 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={40} className="text-jungle-canopy mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm">
                    Interactive Map
                  </p>
                </div>
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
