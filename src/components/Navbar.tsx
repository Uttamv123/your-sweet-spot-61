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
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blogs" },
  { label: "Services", href: "#services" },
  { label: "How We Work", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "#") return location.pathname === "/";
    if (href.startsWith("/")) return location.pathname === href || location.pathname.startsWith(href + "/");
    return false;
  };

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-nav" : "glass-nav-idle"
      }`}
    >
      {/* Subtle animated top gradient line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-70" />

      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <motion.a
          href="/"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="flex items-center gap-2.5 group"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-md blur-md bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              aria-hidden
            />
            <motion.img
              src={logo}
              alt="The Code Reflections"
              className="relative h-11 w-11 rounded-md object-contain"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="font-display text-lg font-bold text-foreground">
            Code <span className="gradient-text">Reflections</span>
          </span>
        </motion.a>

        <div
          className="hidden lg:flex items-center gap-1 relative"
          onMouseLeave={() => setHoveredKey(null)}
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const isHovered = hoveredKey === link.label;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                onMouseEnter={() => setHoveredKey(link.label)}
                className={`relative px-3 py-2 text-[13px] transition-colors duration-300 rounded-md ${
                  active ? "text-foreground" : "text-muted-foreground/75 hover:text-foreground"
                }`}
              >
                {isHovered && (
                  <motion.span
                    layoutId="nav-hover"
                    className="absolute inset-0 rounded-md bg-foreground/[0.06] border border-foreground/[0.06]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-primary via-secondary to-primary shadow-[0_0_8px_hsl(var(--primary)/0.6)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
          <div className="ml-4">
            <Button variant="hero" size="sm" onClick={() => setCalendlyOpen(true)}>
              Book a Strategy Call
            </Button>
          </div>
        </div>

        <button
          className="lg:hidden text-foreground p-2 rounded-md hover:bg-foreground/5 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isOpen ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="block"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 250 }}
            className="lg:hidden fixed top-16 left-0 bottom-0 w-72 glass-nav px-6 py-8 overflow-hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const active = isActive(link.href);
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    className={`text-sm py-2.5 px-3 rounded-md transition-colors duration-300 ${
                      active
                        ? "text-foreground bg-foreground/[0.06] border-l-2 border-primary"
                        : "text-muted-foreground/75 hover:text-foreground hover:bg-foreground/[0.04]"
                    }`}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </motion.a>
                );
              })}
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
