import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CtaSection = () => {
  return (
    <section id="cta" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl gradient-hero p-12 md:p-20 text-center"
        >
          {/* Decorative circle */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full gradient-accent opacity-20 blur-3xl" />

          <div className="relative z-10">
            <Sparkles className="mx-auto mb-4 text-accent" size={36} />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Ready to Go Bold?
            </h2>
            <p className="text-primary-foreground/70 max-w-lg mx-auto mb-8 text-lg">
              Join thousands of teams already building the future. Start free, scale when you're ready.
            </p>
            <Button variant="hero" size="lg" className="text-base px-10 py-6">
              Get Started Now
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
