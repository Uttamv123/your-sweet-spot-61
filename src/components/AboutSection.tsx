import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { scrollToContact } from "@/lib/scroll";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "24hr", label: "Response Time" },
  { value: "3+", label: "Years Experience" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-28 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="text-xs font-semibold text-secondary/80 uppercase tracking-[0.3em]">About Us</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-7 leading-tight">
              We're Not Just Developers — We're a Digital{" "}
              <span className="gradient-text">Systems Partner</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              The Code Reflections is a digital systems and AI automation agency focused on building intelligent platforms for UK businesses. We don't just build websites — we build connected systems that reduce friction, automate operations, and drive measurable growth.
            </p>
            <p className="text-muted-foreground/70 leading-relaxed mb-10">
              Our goal is to deliver premium design, structured delivery, and real business outcomes.
            </p>
            <Button variant="outline" className="group" onClick={scrollToContact}>
              Know More About Us
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                className="gradient-border-card rounded-2xl p-7 text-center hover-lift cursor-default"
              >
                <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-xs text-muted-foreground tracking-wide uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
