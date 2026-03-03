import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";
import CalendlyModal from "@/components/CalendlyModal";

const words = ["Intelligent", "Digital", "Systems", "for", "Modern"];
const glowWords = ["Intelligent", "Systems"];

const Orb = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 3, ease: "easeOut" }}
    className={`absolute rounded-full pointer-events-none ${className}`}
  />
);

const HeroSection = () => {
  const [calendlyOpen, setCalendlyOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 noise-overlay">
      {/* Deep layered gradient */}
      <div className="absolute inset-0 gradient-hero" />
      <div
        className="absolute inset-0 animate-gradient opacity-20"
        style={{
          background: "radial-gradient(ellipse at 20% 50%, hsl(250 60% 20% / 0.6) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, hsl(190 80% 20% / 0.4) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, hsl(270 50% 15% / 0.5) 0%, transparent 60%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(250 60% 58% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(250 60% 58% / 0.4) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />

      {/* Orbs */}
      <Orb className="w-[500px] h-[500px] bg-primary/8 blur-[100px] top-10 -right-32 animate-breathe" delay={0} />
      <Orb className="w-[400px] h-[400px] bg-secondary/6 blur-[80px] bottom-10 -left-20 animate-breathe" delay={1.5} />
      <Orb className="w-[200px] h-[200px] bg-primary/4 blur-[60px] top-1/3 left-1/4 animate-float-shape" delay={3} />

      {/* Orbital ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/5 opacity-30">
        <div className="absolute w-2 h-2 rounded-full bg-primary/40 animate-orbit" style={{ "--orbit-radius": "300px" } as React.CSSProperties} />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
              Digital Systems &amp; AI Automation Agency
            </span>
          </motion.div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.08] mb-6">
            {words.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.5 + i * 0.1,
                  duration: 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={`inline-block mr-[0.3em] ${glowWords.includes(word) ? "gradient-text" : ""}`}
              >
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="gradient-text"
            >
              Businesses
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease: "easeOut" }}
            className="text-muted-foreground text-lg md:text-xl max-w-xl mb-4 font-body leading-relaxed"
          >
            We design, automate, and scale high-performance web platforms and AI-driven workflows that reduce operational friction and increase measurable growth.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-muted-foreground/50 text-sm mb-12"
          >
            Trusted by startups and growing service businesses worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              variant="hero"
              size="lg"
              className="text-base px-8 py-6 animate-pulse-glow"
              onClick={() => setCalendlyOpen(true)}
            >
              Book a Free Strategy Call
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
            </Button>
            <Button
              variant="hero-outline"
              size="lg"
              className="text-base px-8 py-6"
              onClick={() => scrollToSection("case-studies")}
            >
              <Play size={16} className="mr-2" />
              View Our Work
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />

      <CalendlyModal open={calendlyOpen} onOpenChange={setCalendlyOpen} />
    </section>
  );
};

export default HeroSection;
