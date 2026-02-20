import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="/" className="font-display text-xl font-bold gradient-text">
          Boldify
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Results</a>
          <a href="#cta" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          <Button variant="hero" size="sm">Get Started</Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-border bg-background px-4 pb-4"
        >
          <div className="flex flex-col gap-3 pt-3">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground" onClick={() => setIsOpen(false)}>Features</a>
            <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground" onClick={() => setIsOpen(false)}>Results</a>
            <a href="#cta" className="text-sm text-muted-foreground hover:text-foreground" onClick={() => setIsOpen(false)}>Pricing</a>
            <Button variant="hero" size="sm">Get Started</Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
