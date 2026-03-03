import { motion } from "framer-motion";
import { Globe, ShoppingBag, LayoutDashboard } from "lucide-react";

const caseStudies = [
  {
    title: "E-Commerce Platform",
    clientType: "Retail Startup",
    challenge: "Low conversion rates and fragmented checkout flow",
    solution: "Custom e-commerce platform with streamlined UX and automated inventory management",
    result: "42% increase in conversion rate within 3 months",
    icon: ShoppingBag,
  },
  {
    title: "Business Portfolio & CRM",
    clientType: "Professional Services Firm",
    challenge: "Manual lead tracking and disconnected client management tools",
    solution: "Integrated web platform with CRM automation and lead capture workflows",
    result: "60% reduction in manual admin tasks",
    icon: Globe,
  },
  {
    title: "SaaS Dashboard",
    clientType: "Tech Startup",
    challenge: "Poor user engagement and high churn on existing dashboard",
    solution: "Complete UI/UX redesign with AI-powered analytics and automated reporting",
    result: "35% improvement in user retention",
    icon: LayoutDashboard,
  },
];

const PortfolioSection = () => {
  return (
    <section id="case-studies" className="py-28 relative">
      <div className="section-divider mb-28" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-secondary/80 uppercase tracking-[0.3em]">Case Studies</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-5">
            Real Systems. <span className="gradient-text">Measurable Outcomes.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Real projects we've delivered for businesses, with structured solutions and measurable results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="gradient-border-card rounded-2xl p-8 hover-lift cursor-default group"
            >
              <div className="w-11 h-11 rounded-xl gradient-accent flex items-center justify-center mb-6 group-hover:shadow-glow-sm group-hover:scale-110 transition-all duration-500 ease-out">
                <study.icon size={20} className="text-accent-foreground" />
              </div>
              <span className="text-[10px] text-secondary/70 font-semibold uppercase tracking-[0.2em]">{study.clientType}</span>
              <h3 className="font-display text-lg font-semibold text-card-foreground mt-2 mb-4">{study.title}</h3>
              <div className="space-y-2.5 text-sm text-muted-foreground leading-relaxed">
                <p><span className="font-medium text-foreground/80">Challenge:</span> {study.challenge}</p>
                <p><span className="font-medium text-foreground/80">Solution:</span> {study.solution}</p>
                <p className="text-secondary font-semibold mt-4 pt-3 border-t border-border/50">→ {study.result}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center text-muted-foreground/60 text-sm mt-12"
        >
          Want something similar?{" "}
          <a href="#contact" className="text-secondary hover:text-primary font-medium animated-underline pb-0.5 transition-colors duration-300">Start a project →</a>
        </motion.p>
      </div>
    </section>
  );
};

export default PortfolioSection;
