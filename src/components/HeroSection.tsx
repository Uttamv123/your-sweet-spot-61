import { useState, lazy, Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";
import CalendlyModal from "@/components/CalendlyModal";

const HeroScene = lazy(() => import("@/components/hero/HeroScene"));

const words = ["Intelligent", "Digital", "Systems", "for", "Modern"];
const glowWords = ["Intelligent", "Systems"];

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
};

const HeroSection = () => {
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 noise-overlay">
      {/* 3D animated background (particles + glow orbs) */}
      {!reducedMotion && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>
      )}
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80')",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/75" />
      {/* Top + bottom fade to blend into adjacent sections */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
      {/* Static layered glow — no per-frame animation */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, hsl(250 60% 20% / 0.6) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, hsl(190 80% 20% / 0.4) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, hsl(270 50% 15% / 0.5) 0%, transparent 60%)",
        }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(250 60% 58% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(250 60% 58% / 0.4) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />

      {/* Static decorative orbs (blur cached once, not re-painted per frame) */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-primary/8 blur-[100px] top-10 -right-32 pointer-events-none"
        animate={{ x: [0, 24, -16, 0], y: [0, -18, 12, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-secondary/6 blur-[80px] bottom-10 -left-20 pointer-events-none"
        animate={{ x: [0, -20, 14, 0], y: [0, 16, -10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Twinkling stars */}
      {[
        { top: "18%", left: "12%", delay: 0 },
        { top: "32%", left: "85%", delay: 0.8 },
        { top: "68%", left: "8%", delay: 1.4 },
        { top: "78%", left: "72%", delay: 0.4 },
        { top: "22%", left: "60%", delay: 2 },
      ].map((s, i) => (
        <span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-secondary/70 animate-twinkle pointer-events-none"
          style={{ top: s.top, left: s.left, animationDelay: `${s.delay}s` }}
        />
      ))}

      <div className="container relative z-10 mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
        >
          {/* ── Left: Text content ── */}
          <div className="flex-1 min-w-0">
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
                asChild
              >
                <a href="/portfolio">
                  <Play size={16} className="mr-2" />
                  View Our Work
                </a>
              </Button>
            </motion.div>
          </div>

          {/* ── Right: Hero image ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.8, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:flex flex-shrink-0 w-[52%] max-w-[640px]"
          >
            <div className="relative w-full">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80"
                alt="Team collaborating on digital systems"
                className="w-full h-auto object-cover"
                style={{
                  aspectRatio: "4/3",
                  opacity: 0.85,
                  maskImage:
                    "radial-gradient(ellipse 88% 88% at 50% 50%, black 30%, transparent 100%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 88% 88% at 50% 50%, black 30%, transparent 100%)",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade — extra tall to melt into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/90 to-transparent" />

      <CalendlyModal open={calendlyOpen} onOpenChange={setCalendlyOpen} />
    </section>
  );
};

export default HeroSection;
