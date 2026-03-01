import { motion } from "framer-motion";
import { Unplug, HandMetal, Frown, TrendingDown, BotOff } from "lucide-react";

const problems = [
  { icon: Unplug, label: "Disconnected tools" },
  { icon: HandMetal, label: "Manual processes" },
  { icon: Frown, label: "Poor UX" },
  { icon: TrendingDown, label: "Low conversion rates" },
  { icon: BotOff, label: "No automation" },
];

const ProblemSection = () => {
  return (
    <section className="py-28 relative">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="text-xs font-semibold text-secondary/80 uppercase tracking-[0.3em]">The Real Problem</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-5 leading-tight">
            Most Businesses Don't Have a Website Problem.{" "}
            <br className="hidden md:block" />
            <span className="gradient-text">They Have a Systems Problem.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-14 leading-relaxed">
            Fragmented tools, manual workflows, and poor digital experiences are silently costing your business growth.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {problems.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-3 gradient-border-card rounded-2xl px-6 py-3.5 cursor-default group"
            >
              <p.icon size={16} className="text-destructive/80 flex-shrink-0 group-hover:text-destructive transition-colors duration-300" />
              <span className="text-sm font-medium text-foreground/90">{p.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="section-divider mt-28" />
    </section>
  );
};

export default ProblemSection;
