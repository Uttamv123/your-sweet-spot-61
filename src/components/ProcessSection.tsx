import { motion } from "framer-motion";
import { MessageSquare, PenTool, Code, TestTube, Rocket } from "lucide-react";

const steps = [
  { icon: MessageSquare, num: "01", title: "Discovery & Strategy Call", desc: "We understand your business goals, challenges, and target audience." },
  { icon: PenTool, num: "02", title: "Requirement Mapping & Architecture", desc: "We map your requirements and design the system architecture." },
  { icon: Code, num: "03", title: "Design & Build Phase", desc: "We design and develop your platform using scalable, clean code." },
  { icon: TestTube, num: "04", title: "Testing & Performance Optimisation", desc: "We test for responsiveness, speed, SEO, and functionality." },
  { icon: Rocket, num: "05", title: "Launch & Ongoing Support", desc: "We deploy your platform and provide continuous support." },
];

const ProcessSection = () => {
  return (
    <section id="process" className="py-24 gradient-hero">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-secondary uppercase tracking-widest">How We Work</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mt-3 mb-4">
            Our 5-Step Delivery Framework
          </h2>
          <p className="text-primary-foreground/60 max-w-xl mx-auto">
            Structured delivery with full transparency at every stage — so you always know what's happening.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative text-center"
            >
              <div className="w-14 h-14 rounded-2xl gradient-accent mx-auto flex items-center justify-center mb-4">
                <step.icon size={24} className="text-accent-foreground" />
              </div>
              <span className="text-xs text-secondary font-bold tracking-widest mb-1 block">{step.num}</span>
              <h3 className="font-display text-sm font-semibold text-primary-foreground mb-2">{step.title}</h3>
              <p className="text-primary-foreground/50 text-xs leading-relaxed">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-px bg-primary-foreground/10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
