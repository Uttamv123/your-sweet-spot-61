import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const companyLinks = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Case Studies", href: "/#case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const Footer = () => {
  return (
    <footer className="py-16 border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14"
        >
          <div className="md:col-span-2">
            <a href="/" className="flex items-center gap-2.5">
              <img src={logo} alt="The Code Reflections" className="h-12 w-12 rounded-md object-contain" />
              <span className="font-display text-xl font-bold text-foreground">
                Code <span className="gradient-text">Reflections</span>
              </span>
            </a>
            <p className="text-muted-foreground/60 text-sm mt-4 max-w-sm leading-relaxed">
              We build intelligent digital systems and AI-driven workflows that help businesses scale faster.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground/80 mb-5 text-xs uppercase tracking-[0.2em]">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-muted-foreground/60 hover:text-foreground transition-colors duration-300 animated-underline pb-0.5">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-foreground/80 mb-5 text-xs uppercase tracking-[0.2em]">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-muted-foreground/60 hover:text-foreground transition-colors duration-300 animated-underline pb-0.5">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="section-divider" />
        <div className="pt-8 text-center">
          <p className="text-xs text-muted-foreground/40">
            © 2026 The Code Reflections. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
