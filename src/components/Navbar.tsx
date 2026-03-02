import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import CalendlyModal from "@/components/CalendlyModal";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Team", href: "/team" },
  { label: "Services", href: "#services" },
  { label: "How We Work", href: "#process" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    if (href.startsWith("/")) {
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (href === "#") {
      if (location.pathname !== "/") { navigate("/"); }
      else { window.scrollTo({ top: 0, behavior: "smooth" }); }
    } else {
      if (location.pathname !== "/") {
        navigate("/" + href);
      } else {
        const id = href.replace("#", "");
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "glass-strong shadow-elegant" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a
          href="/"
          className="flex items-center gap-2.5"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img src={logo} alt="The Code Reflections" className="h-11 w-11 rounded-md object-contain" />
          <span className="font-display text-lg font-bold text-foreground">
            Code <span className="gradient-text">Reflections</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[13px] text-muted-foreground/70 hover:text-foreground transition-colors duration-300 animated-underline pb-1"
            >
              {link.label}
            </a>
          ))}
          <Button variant="hero" size="sm" onClick={() => setCalendlyOpen(true)}>
            Book a Strategy Call
          </Button>
        </div>

        <button className="lg:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 250 }}
            className="lg:hidden fixed top-16 right-0 bottom-0 w-72 glass-strong px-6 py-8 overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className="text-sm text-muted-foreground/70 hover:text-foreground py-2.5 animated-underline inline-block transition-colors duration-300"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </motion.a>
              ))}
              <Button variant="hero" size="sm" className="mt-6" onClick={() => { setIsOpen(false); setCalendlyOpen(true); }}>
                Book a Strategy Call
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CalendlyModal open={calendlyOpen} onOpenChange={setCalendlyOpen} />
    </motion.nav>
  );
};

export default Navbar;
