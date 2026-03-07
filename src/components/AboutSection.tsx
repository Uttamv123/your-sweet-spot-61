import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { scrollToContact } from "@/lib/scroll";

const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 24, suffix: "hr", label: "Response Time" },
  { value: 3, suffix: "+", label: "Years Experience" },
];

const AnimatedCounter = ({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      const duration = 1800;
      const steps = 40;
      const stepDuration = duration / steps;
      let current = 0;
      const increment = value / steps;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, stepDuration);
      return () => clearInterval(timer);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: delay, duration: 0.6, ease: "easeOut" }}
      whileHover={{
        y: -8,
        rotateX: 5,
        rotateY: -5,
        transition: { duration: 0.4, ease: "easeOut" },
      }}
      className="gradient-border-card rounded-2xl p-7 text-center hover-lift cursor-default"
      style={{ perspective: 800, transformStyle: "preserve-3d" }}
    >
      <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
        {count}{suffix}
      </div>
      <div className="text-xs text-muted-foreground tracking-wide uppercase">{label}</div>
    </motion.div>
  );
};

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
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "auto" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs font-semibold text-secondary/80 uppercase tracking-[0.3em] inline-block overflow-hidden"
            >
              About Us
            </motion.span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-7 leading-tight">
              We're Not Just Developers — We're a Digital{" "}
              <motion.span
                className="gradient-text inline-block"
                initial={{ backgroundSize: "0% 100%" }}
                whileInView={{ backgroundSize: "100% 100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Systems Partner
              </motion.span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground leading-relaxed mb-5"
            >
              The Code Reflections is a digital systems and AI automation agency focused on building intelligent platforms for modern businesses. We don't just build websites — we build connected systems that reduce friction, automate operations, and drive measurable growth.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-muted-foreground/70 leading-relaxed mb-10"
            >
              Our goal is to deliver premium design, structured delivery, and real business outcomes.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Button variant="outline" className="group" onClick={scrollToContact}>
                Know More About Us
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <AnimatedCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={0.15 + i * 0.15}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
