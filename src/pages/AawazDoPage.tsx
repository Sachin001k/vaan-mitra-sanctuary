import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Lock } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { CONTACT_EMAIL } from "@/data/siteLinks";

const STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh",
  "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal",
];

const TOPICS = ["Wildlife encounter", "Education", "Habitat concern", "Collaboration", "Other"];

const labelClass = "block text-sm text-muted-foreground uppercase tracking-wider mb-2";

const AawazDoPage = () => {
  const [submitted, setSubmitted] = useState(false);

  // No backend yet: open the visitor's email app with the submission pre-filled.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const get = (key: string) => String(form.get(key) ?? "").trim();
    const lines = [
      `Topic: ${get("topic")}`,
      `State: ${get("state")}`,
      `District: ${get("district")}`,
      get("area") ? `Broad location: ${get("area")}` : null,
      "",
      get("description"),
      "",
      `Name: ${get("name") || "Not given"}`,
      `Contact: ${get("contact") || "Not given"}`,
      "",
      "I consent to Vann Mitra Foundation reviewing this submission.",
    ].filter((line): line is string => line !== null);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `Aawaz Do: ${get("topic")} — ${get("district")}, ${get("state")}`,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Aawaz Do — Make your voice heard"
        description="Share a conservation concern, a community experience or an idea that could help people and wildlife coexist more safely."
        path="/aawaz-do"
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6 bg-jungle-dark">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-jungle-canopy uppercase tracking-[0.3em] text-sm mb-4">Aawaz Do</p>
            <h1 className="font-display text-5xl md:text-7xl text-ivory mb-6">Make your voice heard.</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Share a conservation concern, a community experience or an idea that could help people and
              wildlife coexist more safely.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Not an emergency service */}
      <section className="px-6 bg-jungle-darkest pt-12">
        <div className="max-w-7xl mx-auto">
          <div role="note" className="border-l-4 border-jungle-canopy bg-jungle-dark p-6 flex gap-4">
            <AlertTriangle className="text-jungle-canopy flex-shrink-0 mt-1" size={24} aria-hidden="true" />
            <div>
              <h2 className="font-display text-xl text-ivory mb-2">This is not an emergency service</h2>
              <p className="text-muted-foreground leading-relaxed">
                Aawaz Do is a listening and community-information initiative. It is not an emergency
                response service, wildlife rescue hotline or substitute for the Forest Department. For an
                immediate threat, contact local emergency services or the responsible forest authorities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-jungle-darkest">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.5fr_1fr] gap-12">
          {/* Form */}
          <div>
            <h2 className="font-display text-3xl text-ivory mb-3">Share your experience</h2>
            <p className="text-muted-foreground mb-8">
              Sending opens your email app with your submission ready to send to {CONTACT_EMAIL}. You
              can attach a photograph there if you wish.
            </p>

            {submitted && (
              <div role="status" className="mb-8 bg-jungle-deep border border-jungle-amazon p-6 flex gap-4">
                <CheckCircle2 className="text-jungle-canopy flex-shrink-0 mt-1" size={22} aria-hidden="true" />
                <div className="text-muted-foreground leading-relaxed">
                  <p className="text-ivory font-semibold mb-1">Thank you for sharing your experience.</p>
                  <p>
                    We review submissions for relevance and safety. Submission does not guarantee a
                    response or action. Do not approach, chase, feed or attempt to rescue wildlife while
                    documenting an incident.
                  </p>
                </div>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="ad-name" className={labelClass}>Name (optional)</label>
                  <input id="ad-name" name="name" type="text" autoComplete="name" className="input-jungle" />
                </div>
                <div>
                  <label htmlFor="ad-contact" className={labelClass}>Email or phone (optional)</label>
                  <input id="ad-contact" name="contact" type="text" className="input-jungle" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="ad-state" className={labelClass}>State *</label>
                  <select id="ad-state" name="state" required className="input-jungle" defaultValue="">
                    <option value="" disabled>Select a state</option>
                    {STATES.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="ad-district" className={labelClass}>District *</label>
                  <input id="ad-district" name="district" type="text" required className="input-jungle" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="ad-area" className={labelClass}>Broad location (optional)</label>
                  <input
                    id="ad-area"
                    name="area"
                    type="text"
                    placeholder="e.g. near a village or forest range"
                    aria-describedby="ad-area-hint"
                    className="input-jungle"
                  />
                  <p id="ad-area-hint" className="mt-2 text-sm text-muted-foreground">
                    Please don't share exact coordinates.
                  </p>
                </div>
                <div>
                  <label htmlFor="ad-topic" className={labelClass}>Topic *</label>
                  <select id="ad-topic" name="topic" required className="input-jungle" defaultValue="">
                    <option value="" disabled>Select a topic</option>
                    {TOPICS.map((topic) => (
                      <option key={topic} value={topic}>{topic}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="ad-description" className={labelClass}>Description *</label>
                <textarea
                  id="ad-description"
                  name="description"
                  rows={6}
                  required
                  className="input-jungle resize-y"
                  placeholder="What happened, or what would you like to share?"
                />
              </div>

              <label className="flex items-start gap-3 text-muted-foreground">
                <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[hsl(var(--ochre))]" />
                <span>
                  I consent to Vann Mitra Foundation reviewing this submission as described in the{" "}
                  <Link to="/privacy" className="text-jungle-canopy underline">privacy notice</Link>. *
                </span>
              </label>

              <button type="submit" className="btn-hero w-full md:w-auto">Send submission</button>
            </form>
          </div>

          {/* Privacy & moderation */}
          <aside className="card-jungle p-8 self-start">
            <h2 className="font-display text-2xl text-ivory mb-4 flex items-center gap-2">
              <Lock size={20} className="text-jungle-canopy" aria-hidden="true" /> Privacy &amp; moderation
            </h2>
            <ul className="space-y-4 text-muted-foreground leading-relaxed">
              <li>Your submission is sent by email to the Vann Mitra team inbox ({CONTACT_EMAIL}).</li>
              <li>Name and contact details are optional. You can share anonymously.</li>
              <li>
                We never publish names, identifying details or photographs without specific consent, and
                we never publish sensitive wildlife locations.
              </li>
              <li>
                To ask for a submission to be deleted, email {CONTACT_EMAIL} from the same address.
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AawazDoPage;
