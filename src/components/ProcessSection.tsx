import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, PenTool, Code, TestTube, Rocket } from "lucide-react";

const steps = [
  { icon: MessageSquare, num: "01", title: "Discovery & Strategy Call", desc: "We understand your business goals, challenges, and target audience." },
  { icon: PenTool, num: "02", title: "Requirement Mapping & Architecture", desc: "We map your requirements and design the system architecture." },
  { icon: Code, num: "03", title: "Design & Build Phase", desc: "We design and develop your platform using scalable, clean code." },
  { icon: TestTube, num: "04", title: "Testing & Performance Optimisation", desc: "We test for responsiveness, speed, SEO, and functionality." },
  { icon: Rocket, num: "05", title: "Launch & Ongoing Support", desc: "We deploy your platform and provide continuous support." },
];

const TimelineLine = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="hidden md:block absolute top-[28px] left-0 right-0 h-px z-0">
      <motion.div
        className="h-full w-full"
        style={{
          background: "linear-gradient(90deg, transparent 5%, hsl(250 60% 58% / 0.3) 20%, hsl(190 80% 50% / 0.3) 50%, hsl(250 60% 58% / 0.3) 80%, transparent 95%)",
          transformOrigin: "left",
        }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
      />
      {/* Dot: use x instead of left */}
      {isInView && (
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-secondary shadow-glow-sm"
          style={{ left: 0 }}
          initial={{ x: 0 }}
          animate={{ x: "calc(100% - 8px)" }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.8 }}
        />
      )}
    </div>
  );
};

const ProcessSection = () => {
  return (
    <section id="process" className="py-28 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/4 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
        >
          <span className="text-xs font-semibold text-secondary/80 uppercase tracking-[0.3em]">How We Work</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-5">
            Our 5-Step Delivery Framework
          </h2>
          <p className="text-muted-foreground/60 max-w-xl mx-auto leading-relaxed">
            Structured delivery with full transparency at every stage.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
          <TimelineLine />
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.4 + i * 0.15,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{
                y: -10,
                scale: 1.05,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="relative text-center group cursor-default"
              style={{ perspective: 600 }}
            >
              <motion.div
                className="w-14 h-14 rounded-2xl gradient-accent mx-auto flex items-center justify-center mb-5 relative z-10"
                whileHover={{
                  rotate: [0, -10, 10, -5, 0],
                  transition: { duration: 0.5 },
                }}
              >
                <step.icon size={22} className="text-accent-foreground" />
                {/* Ping animation on the icon */}
                <motion.div
                  className="absolute inset-0 rounded-2xl gradient-accent"
                  initial={{ opacity: 0, scale: 1 }}
                  whileInView={{ opacity: [0, 0.4, 0], scale: [1, 1.6, 1.8] }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.15, duration: 1, ease: "easeOut" }}
                />
              </motion.div>
              <span className="text-[10px] text-secondary/70 font-bold tracking-[0.3em] mb-2 block">{step.num}</span>
              <h3 className="font-display text-sm font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground/50 text-xs leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
