import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { scrollToContact } from "@/lib/scroll";

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 gradient-subtle">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-secondary uppercase tracking-widest">Pricing</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Website Building is Completely <span className="gradient-text">FREE</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We are open to custom requirements and do not charge any upfront payment.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-card border border-border">
            <h3 className="font-display text-2xl font-bold text-card-foreground mb-6">Our Partnership Model</h3>
            
            <div className="space-y-4 mb-8">
              {[
                "We partner with clients to build their website and help them grow online.",
                "We only take a percentage share from profit AFTER revenue begins.",
                "We support clients until they start generating revenue.",
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <Check size={18} className="text-secondary flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-6 mb-8">
              <h4 className="font-display font-semibold text-card-foreground mb-3 text-sm">Terms & Conditions</h4>
              <ul className="space-y-2">
                {[
                  "Website ownership remains with The Code Reflections under this partnership model.",
                  "If full ownership is requested, charges apply based on scale and traffic.",
                  "Final ownership terms are defined before project start.",
                ].map((t, i) => (
                  <li key={i} className="text-xs text-muted-foreground leading-relaxed">• {t}</li>
                ))}
              </ul>
            </div>

            <Button variant="hero" size="lg" className="w-full" onClick={scrollToContact}>
              Start a Project
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
