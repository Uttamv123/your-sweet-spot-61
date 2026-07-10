import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const companyLinks = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Blog", href: "/blogs" },
  { label: "Contact", href: "/#contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const Footer = () => {
  return (
    <footer className="py-16 border-t border-border/50 bg-card/30 relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 left-1/4 w-96 h-96 rounded-full float-orb-slow" style={{ background: "radial-gradient(circle, hsl(250 60% 58% / 0.10), transparent 70%)", filter: "blur(30px)" }} />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 rounded-full float-orb" style={{ background: "radial-gradient(circle, hsl(190 80% 50% / 0.08), transparent 70%)", filter: "blur(30px)" }} />
      </div>
      <div className="container mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14"
        >
          <div className="md:col-span-2">
            <a href="/" className="flex items-center gap-2.5 group w-fit">
              <motion.img
                whileHover={{ rotate: [0, -8, 8, -4, 0], scale: 1.08 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                src={logo}
                alt="The Code Reflections"
                className="h-12 w-12 rounded-md object-contain"
              />
              <span className="font-display text-xl font-bold text-foreground transition-transform duration-300 group-hover:translate-x-0.5">
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
              {companyLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                >
                  <Link to={link.href} className="text-sm text-muted-foreground/60 hover:text-foreground transition-all duration-300 animated-underline pb-0.5 inline-block hover:translate-x-1">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-foreground/80 mb-5 text-xs uppercase tracking-[0.2em]">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
                >
                  <Link to={link.href} className="text-sm text-muted-foreground/60 hover:text-foreground transition-all duration-300 animated-underline pb-0.5 inline-block hover:translate-x-1">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="section-divider origin-center"
        />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="pt-8 text-center"
        >
          <p className="text-xs text-muted-foreground/40">
            © 2026 The Code Reflections. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
