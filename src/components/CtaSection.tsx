import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

const CtaSection = () => {
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
            Ready to Build a Premium Website?
          </h2>
          <p className="text-primary-foreground/60 text-lg mb-10 leading-relaxed">
            Your website is your digital identity. Let's build something modern, fast, and premium that attracts customers and helps your business grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="text-base px-8 py-6">
              Get a Free Consultation
              <ArrowRight className="ml-2" size={18} />
            </Button>
            <Button variant="hero-outline" size="lg" className="text-base px-8 py-6">
              <MessageCircle size={16} className="mr-2" />
              Message Us on WhatsApp
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
