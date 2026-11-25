import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { CONTACT_EMAIL } from "@/data/siteLinks";

// Describes only what the site actually does today. Review with the team before launch.
const sections = [
  {
    title: "Forms",
    body: "The Contact and Aawaz Do forms do not store anything on this website. When you press send, your own email app opens with your message pre-filled, and nothing is shared until you send that email to the Vann Mitra team inbox.",
  },
  {
    title: "Analytics",
    body: "This website uses Google Analytics to understand which pages are visited. It collects standard usage information such as pages viewed, approximate location and device type, using cookies.",
  },
  {
    title: "Embedded videos",
    body: "Videos are embedded from YouTube in privacy-enhanced mode, so YouTube does not set cookies until you play a video.",
  },
  {
    title: "How we use what you send",
    body: "We use the details you send only to reply to you or to review your submission. We never publish names, identifying details or photographs without specific consent, and we never publish sensitive wildlife locations.",
  },
  {
    title: "Your choices",
    body: `To ask what we hold about you, or to have an email or submission deleted, write to ${CONTACT_EMAIL}.`,
  },
];

const PrivacyPage = () => (
  <div className="min-h-screen bg-background">
    <PageMeta
      title="Privacy"
      description="How the Vann Mitra Foundation website handles form submissions, analytics and embedded videos."
      path="/privacy"
    />
    <Navigation />
    <section className="pt-32 pb-20 px-6 bg-jungle-darkest">
      <div className="max-w-3xl mx-auto">
        <p className="text-jungle-canopy uppercase tracking-[0.3em] text-sm mb-4">Privacy</p>
        <h1 className="font-display text-5xl text-ivory mb-10">Privacy notice</h1>
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-2xl text-ivory mb-3">{section.title}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default PrivacyPage;
