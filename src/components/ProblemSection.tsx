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
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold text-secondary uppercase tracking-widest">The Real Problem</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Most Businesses Don't Have a Website Problem.{" "}
            <span className="gradient-text">They Have a Systems Problem.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Fragmented tools, manual workflows, and poor digital experiences are silently costing your business growth. We build the structured solution.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {problems.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 bg-card border border-border rounded-xl px-5 py-3 shadow-card"
            >
              <p.icon size={18} className="text-destructive flex-shrink-0" />
              <span className="text-sm font-medium text-foreground">{p.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
