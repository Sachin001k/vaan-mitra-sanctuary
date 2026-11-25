import { Link } from "react-router-dom";
import { Mail, ExternalLink } from "lucide-react";
import { CONTACT_EMAIL, RESEARCH_LINKS } from "@/data/siteLinks";

const exploreLinks = [
  { to: "/", label: "Home" },
  { to: "/raptor", label: "RAPTOR" },
  { to: "/maps", label: "Maps" },
  { to: "/impact", label: "Impact" },
  { to: "/photography", label: "Photography" },
  { to: "/team", label: "Team" },
  { to: "/journal", label: "Journal" },
];

const involvedLinks = [
  { to: "/contact", label: "Volunteer" },
  { to: "/contact", label: "Collaborate with us" },
  { to: "/aawaz-do", label: "Aawaz Do — share a concern" },
  { to: "/donate", label: "Donate" },
];

const linkClass = "text-muted-foreground hover:text-jungle-canopy transition-colors text-sm";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal border-t border-jungle-medium/30">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* About */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="" className="h-12 w-12 object-contain" />
              <div>
                <p className="font-display text-xl text-ivory">Vann Mitra Foundation</p>
              </div>
            </div>
            <p className="font-display italic text-jungle-canopy">Living alongside wildlife.</p>
          </div>

          {/* Explore */}
          <nav aria-label="Explore">
            <h2 className="font-body font-semibold text-ivory uppercase tracking-wider text-sm mb-4">Explore</h2>
            <ul className="space-y-2">
              {exploreLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={linkClass}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Get involved */}
          <nav aria-label="Get involved">
            <h2 className="font-body font-semibold text-ivory uppercase tracking-wider text-sm mb-4">Get involved</h2>
            <ul className="space-y-2">
              {involvedLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className={linkClass}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Research & media */}
          <nav aria-label="Research and media">
            <h2 className="font-body font-semibold text-ivory uppercase tracking-wider text-sm mb-4">Research &amp; media</h2>
            <ul className="space-y-2">
              {RESEARCH_LINKS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} target="_blank" rel="noreferrer" className={`${linkClass} inline-flex items-center gap-1`}>
                    {item.label} <ExternalLink size={12} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="font-body font-semibold text-ivory uppercase tracking-wider text-sm mb-4">Contact</h2>
            <ul className="space-y-2">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className={`${linkClass} inline-flex items-center gap-2 break-all`}>
                  <Mail size={14} aria-hidden="true" /> {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <Link to="/contact" className={linkClass}>Start a conversation</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-jungle-medium/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm text-center">
            © {year} Vann Mitra Foundation. All rights reserved.
          </p>
          <Link to="/privacy" className={linkClass}>Privacy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
