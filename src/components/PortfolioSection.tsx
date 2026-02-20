import { motion } from "framer-motion";
import { Globe, ShoppingBag, LayoutDashboard } from "lucide-react";

const projects = [
  { title: "E-Commerce Platform", category: "E-Commerce", icon: ShoppingBag },
  { title: "Business Portfolio", category: "Business Website", icon: Globe },
  { title: "SaaS Dashboard", category: "Web Application", icon: LayoutDashboard },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-secondary uppercase tracking-widest">Portfolio</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Our Recent Work
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real projects we've built for businesses, startups, and creators.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl gradient-hero aspect-[4/3] flex flex-col items-center justify-center cursor-pointer border border-border hover:shadow-glow transition-all duration-300"
            >
              <project.icon size={40} className="text-secondary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-lg font-semibold text-primary-foreground">{project.title}</h3>
              <span className="text-xs text-primary-foreground/50 mt-1">{project.category}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm mt-10"
        >
          Want something similar for your business? <a href="#contact" className="text-secondary hover:underline font-medium">Start a project →</a>
        </motion.p>
      </div>
    </section>
  );
};

export default PortfolioSection;
