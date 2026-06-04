import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import CalendlyModal from "@/components/CalendlyModal";
import { scrollToContact } from "@/lib/scroll";

const CtaSection = () => {
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-50px" });
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const shouldAnimate = isInView && !reducedMotion;

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden noise-overlay">
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Morphing gradient blobs */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/6 blur-[120px] pointer-events-none"
        animate={shouldAnimate ? {
          scale: [1, 1.2, 0.9, 1.1, 1],
          x: [0, 50, -30, 20, 0],
          y: [0, -30, 20, -10, 0],
          borderRadius: ["50%", "40% 60% 50% 50%", "50% 40% 60% 50%", "60% 50% 40% 50%", "50%"],
        } : { scale: 1, x: 0, y: 0, borderRadius: "50%" }}
        transition={{ duration: 12, ease: "easeInOut", repeat: shouldAnimate ? Infinity : 0 }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-secondary/4 blur-[100px] pointer-events-none"
        animate={shouldAnimate ? {
          scale: [1, 0.8, 1.15, 0.95, 1],
          x: [0, -40, 30, -20, 0],
          y: [0, 20, -40, 15, 0],
        } : { scale: 1, x: 0, y: 0 }}
        transition={{ duration: 10, ease: "easeInOut", repeat: shouldAnimate ? Infinity : 0, delay: 2 }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={shouldAnimate ? {
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          } : { y: 0, opacity: 0.2, scale: 1 }}
          transition={{
            duration: 3 + i * 0.5,
            ease: "easeInOut",
            repeat: shouldAnimate ? Infinity : 0,
            delay: i * 0.4,
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5">
            Let's Build Something{" "}
            <motion.span
              className="gradient-text inline-block relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Intelligent.
              {/* Shimmer sweep across the text */}
              <motion.span
                className="absolute inset-0 gradient-text"
                style={{
                  backgroundImage: "linear-gradient(90deg, transparent, hsl(190 80% 55% / 0.6), transparent)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
                animate={shouldAnimate ? { backgroundPosition: ["-200% 0", "200% 0"] } : { backgroundPosition: "-200% 0" }}
                transition={{ duration: 3, repeat: shouldAnimate ? Infinity : 0, repeatDelay: 2, ease: "easeInOut" }}
              />
            </motion.span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-muted-foreground text-lg mb-12 leading-relaxed"
          >
            Ready to transform your digital operations? Book a free strategy call and let's discuss how we can build the right systems for your business.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button variant="hero" size="lg" className="text-base px-8 py-6" onClick={() => setCalendlyOpen(true)}>
                Book Your Strategy Call
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button variant="hero-outline" size="lg" className="text-base px-8 py-6" onClick={scrollToContact}>
                <MessageCircle size={16} className="mr-2" />
                Get in Touch
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <CalendlyModal open={calendlyOpen} onOpenChange={setCalendlyOpen} />
    </section>
  );
};

export default CtaSection;
