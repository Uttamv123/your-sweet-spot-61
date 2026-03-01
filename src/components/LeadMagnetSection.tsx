import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { scrollToContact } from "@/lib/scroll";

const LeadMagnetSection = () => {
  return (
    <section className="py-28 relative">
      <div className="section-divider mb-28" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="relative gradient-border-card rounded-3xl p-14 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px] pointer-events-none" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mx-auto mb-6"
              >
                <Sparkles size={22} className="text-accent-foreground" />
              </motion.div>
              <span className="text-xs font-semibold text-secondary/80 uppercase tracking-[0.3em]">Free Audit</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-5">
                Get a Free Website &amp; <span className="gradient-text">Systems Audit</span>
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We'll review your current website and digital systems, then provide actionable recommendations — completely free.
              </p>
              <Button variant="hero" size="lg" onClick={scrollToContact}>
                Request Audit
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadMagnetSection;
