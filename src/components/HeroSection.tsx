import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-hero opacity-85" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-secondary text-sm font-medium tracking-widest uppercase mb-6"
          >
            Premium Web Development Agency
          </motion.p>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6">
            We Build Modern Websites & Digital Products That Help Businesses{" "}
            <span className="gradient-text">Grow</span>
          </h1>

          <p className="text-primary-foreground/60 text-lg md:text-xl max-w-xl mb-4 font-body leading-relaxed">
            From UI/UX design to deployment — fast, secure, and conversion-friendly digital experiences.
          </p>

          <p className="text-primary-foreground/40 text-sm mb-10">
            Trusted by growing businesses that value quality, speed, and modern design.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="hero" size="lg" className="text-base px-8 py-6">
              Get a Free Website Audit
              <ArrowRight className="ml-2" size={18} />
            </Button>
            <Button variant="hero-outline" size="lg" className="text-base px-8 py-6">
              <Play size={16} className="mr-2" />
              View Our Work
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
