import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import CalendlyModal from "@/components/CalendlyModal";
import { scrollToContact } from "@/lib/scroll";

const CtaSection = () => {
  const [calendlyOpen, setCalendlyOpen] = useState(false);

  return (
    <section className="py-24 gradient-hero">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
            Let's Build Something <span className="gradient-text">Intelligent.</span>
          </h2>
          <p className="text-primary-foreground/60 text-lg mb-10 leading-relaxed">
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
