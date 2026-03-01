import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import CalendlyModal from "@/components/CalendlyModal";
import { scrollToContact } from "@/lib/scroll";

const CtaSection = () => {
  const [calendlyOpen, setCalendlyOpen] = useState(false);

  return (
    <section className="py-28 relative overflow-hidden noise-overlay">
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/6 blur-[120px] pointer-events-none animate-breathe" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5">
            Let's Build Something <span className="gradient-text">Intelligent.</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
            Ready to transform your digital operations? Book a free strategy call and let's discuss how we can build the right systems for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="text-base px-8 py-6" onClick={() => setCalendlyOpen(true)}>
              Book Your Strategy Call
              <ArrowRight className="ml-2" size={18} />
            </Button>
            <Button variant="hero-outline" size="lg" className="text-base px-8 py-6" onClick={scrollToContact}>
              <MessageCircle size={16} className="mr-2" />
              Get in Touch
            </Button>
          </div>
        </motion.div>
      </div>

      <CalendlyModal open={calendlyOpen} onOpenChange={setCalendlyOpen} />
    </section>
  );
};

export default CtaSection;
