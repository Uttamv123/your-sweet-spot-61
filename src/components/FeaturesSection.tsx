import { motion } from "framer-motion";
import { Zap, Shield, BarChart3, Palette, Globe, Layers } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for speed. Your projects launch in seconds, not minutes.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption and compliance built into every layer.",
  },
  {
    icon: BarChart3,
    title: "Deep Analytics",
    description: "Real-time insights that help you make smarter decisions faster.",
  },
  {
    icon: Palette,
    title: "Beautiful Design",
    description: "Stunning templates and components that make your brand shine.",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Deploy worldwide with edge computing and CDN infrastructure.",
  },
  {
    icon: Layers,
    title: "Smart Integrations",
    description: "Connect with 200+ tools your team already uses every day.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-secondary uppercase tracking-widest">Features</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Everything You Need to <span className="gradient-text">Win</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Powerful tools designed for teams that refuse to settle for average.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group p-8 rounded-2xl bg-card shadow-card hover:shadow-card-hover border border-border transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-5">
                <feature.icon size={22} className="text-accent-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-card-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
