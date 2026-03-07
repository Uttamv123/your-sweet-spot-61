import { motion } from "framer-motion";
import { Code2, Workflow, Bot, ShoppingCart, Blocks } from "lucide-react";

const stack = [
  { icon: Blocks, title: "No-Code & Low-Code", desc: "Rapid prototyping and delivery with modern no-code tools." },
  { icon: Code2, title: "Custom API Integrations", desc: "Seamless connectivity between your existing business tools." },
  { icon: Workflow, title: "Automation Tools", desc: "Workflow automation that eliminates manual repetitive tasks." },
  { icon: Bot, title: "AI Workflow Systems", desc: "Intelligent automation powered by modern AI capabilities." },
  { icon: ShoppingCart, title: "E-commerce Platforms", desc: "Scalable online stores built for conversion and growth." },
];

const TechStackSection = () => {
  return (
    <section className="py-28 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-secondary/80 uppercase tracking-[0.3em]">Technology</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-5">
            Modern &amp; <span className="gradient-text">Scalable</span> Technology Stack
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            We use the right tools for every project — modern, reliable, and built to scale.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stack.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30, scale: 0.9, rotateY: 15 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{
                y: -12,
                scale: 1.05,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="gradient-border-card rounded-2xl p-6 text-center cursor-default group"
              style={{ perspective: 600 }}
            >
              <motion.div
                className="w-11 h-11 rounded-xl gradient-accent flex items-center justify-center mx-auto mb-4"
                whileHover={{
                  rotateY: 180,
                  transition: { duration: 0.6 },
                }}
              >
                <item.icon size={20} className="text-accent-foreground" />
              </motion.div>
              <h3 className="font-display text-sm font-semibold text-card-foreground mb-2">{item.title}</h3>
              <p className="text-xs text-muted-foreground/70 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
