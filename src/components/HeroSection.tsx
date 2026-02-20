import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-hero opacity-80" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block gradient-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6"
          >
            🚀 Now in Public Beta
          </motion.span>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-tight mb-6">
            Build Something{" "}
            <span className="gradient-text">Extraordinary</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10 font-body">
            The all-in-one platform that turns your boldest ideas into reality.
            Ship faster, scale smarter, and stand out from the crowd.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="hero" size="lg" className="text-base px-8 py-6">
              Start Building Free
              <ArrowRight className="ml-2" size={18} />
            </Button>
            <Button variant="hero-outline" size="lg" className="text-base px-8 py-6 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating shapes */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[10%] w-16 h-16 rounded-xl gradient-accent opacity-20 blur-sm"
        />
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 right-[15%] w-24 h-24 rounded-full bg-secondary opacity-20 blur-sm"
        />
      </div>
    </section>
  );
};

export default HeroSection;
