import { Link } from "react-router-dom";

const companyLinks = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const Footer = () => {
  return (
    <footer className="py-16 border-t border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <a href="/" className="font-display text-xl font-bold text-card-foreground">
              The Code <span className="gradient-text">Reflections</span>
            </a>
            <p className="text-muted-foreground text-sm mt-3 max-w-sm leading-relaxed">
              We build premium websites and scalable digital solutions that help businesses grow faster.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-card-foreground mb-4 text-sm">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-card-foreground mb-4 text-sm">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 The Code Reflections. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
