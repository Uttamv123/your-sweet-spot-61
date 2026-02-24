import { motion } from "framer-motion";
import { Globe, ShoppingBag, LayoutDashboard } from "lucide-react";

const caseStudies = [
  {
    title: "E-Commerce Platform",
    clientType: "UK Retail Startup",
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
    <section id="case-studies" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-secondary uppercase tracking-widest">Case Studies</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Real Systems. <span className="gradient-text">Measurable Outcomes.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real projects we've delivered for businesses, with structured solutions and measurable results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-5">
                <study.icon size={22} className="text-accent-foreground" />
              </div>
              <span className="text-xs text-secondary font-semibold uppercase tracking-wider">{study.clientType}</span>
              <h3 className="font-display text-lg font-semibold text-card-foreground mt-2 mb-3">{study.title}</h3>
              <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <p><span className="font-medium text-foreground">Challenge:</span> {study.challenge}</p>
                <p><span className="font-medium text-foreground">Solution:</span> {study.solution}</p>
                <p className="text-secondary font-semibold mt-3">→ {study.result}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm mt-10"
        >
          Want something similar for your business?{" "}
          <a href="#contact" className="text-secondary hover:underline font-medium">Start a project →</a>
        </motion.p>
      </div>
    </section>
  );
};

export default PortfolioSection;
