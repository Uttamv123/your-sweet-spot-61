import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { scrollToContact } from "@/lib/scroll";

const LeadMagnetSection = () => {
  return (
    <section className="py-24 gradient-subtle">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="text-sm font-semibold text-secondary uppercase tracking-widest">Free Audit</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Get a Free Website &amp; <span className="gradient-text">Systems Audit</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            We'll review your current website and digital systems, then provide actionable recommendations — completely free.
          </p>
          <Button variant="hero" size="lg" onClick={scrollToContact}>
            Request Audit
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadMagnetSection;
