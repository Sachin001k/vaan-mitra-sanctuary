import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Youtube, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-jungle-darkest border-t border-jungle-medium/30">
      {/* Quote Section */}
      <div className="py-16 px-6 text-center border-b border-jungle-medium/20">
        <blockquote className="max-w-3xl mx-auto">
          <p className="font-display text-2xl md:text-3xl text-ivory italic leading-relaxed">
            "In every walk with nature, one receives far more than he seeks."
          </p>
          <cite className="block mt-4 text-jungle-canopy font-medium not-italic">
            — John Muir
          </cite>
        </blockquote>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <h3 className="font-display text-xl text-ivory mb-4">Vaan Mitra</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A network of young conservationists, scientists, and NGOs working 
              together to protect wildlife and mitigate human-animal conflict 
              through technology-driven solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-ivory uppercase tracking-wider text-sm mb-4">
              Explore
            </h4>
            <ul className="space-y-2">
              {["RAPTOR", "Maps", "Impact", "Photography", "Blog"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-jungle-canopy transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="font-semibold text-ivory uppercase tracking-wider text-sm mb-4">
              Get Involved
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/donate" className="text-muted-foreground hover:text-jungle-canopy transition-colors text-sm">
                  Donate
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-jungle-canopy transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground text-sm">Volunteer</span>
              </li>
              <li>
                <span className="text-muted-foreground text-sm">Partner With Us</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-ivory uppercase tracking-wider text-sm mb-4">
              Stay Connected
            </h4>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe for conservation updates and wildlife stories.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="input-jungle flex-1 text-xs py-3"
              />
              <button className="btn-hero px-4 py-3 text-xs">
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-16 pt-8 border-t border-jungle-medium/20 flex flex-col md:flex-row justify-between items-center gap-6">
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
                className="p-3 bg-jungle-deep hover:bg-jungle-medium transition-colors text-ivory"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          <p className="text-muted-foreground text-sm text-center">
            © 2026 Vaan Mitra Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
