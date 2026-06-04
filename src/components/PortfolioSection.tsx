import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Real Estate Property Marketplace",
    category: "Real Estate · Web Platform",
    description: "A modern property buying and selling platform with advanced search, lead capture, and responsive design.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80",
    link: "#",
    tags: ["Next.js", "Responsive UI", "Lead Capture"],
  },
  {
    title: "AI-Powered Analytics Dashboard",
    category: "SaaS · Dashboard",
    description: "Intelligent data visualization platform with automated reporting and predictive insights.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    link: "#",
    tags: ["React", "AI Integration", "Data Viz"],
  },
  {
    title: "E-Commerce Experience Platform",
    category: "Retail · E-Commerce",
    description: "Streamlined shopping experience with smart inventory management and conversion-optimized checkout.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    link: "#",
    tags: ["Shopify", "UX Design", "Automation"],
  },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-28 relative">
      <div className="section-divider mb-28" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-secondary/80 uppercase tracking-[0.3em]">Portfolio</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-5">
            Selected <span className="gradient-text">Work.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            A showcase of projects we've built — from real estate platforms to AI-driven dashboards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="gradient-border-card rounded-2xl overflow-hidden cursor-pointer group relative block"
              style={{ perspective: 600 }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                <motion.div
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <ExternalLink size={14} className="text-foreground" />
                </motion.div>
              </div>
              <div className="p-6 relative z-10">
                <span className="text-[10px] text-secondary/70 font-semibold uppercase tracking-[0.2em]">{project.category}</span>
                <h3 className="font-display text-lg font-semibold text-card-foreground mt-2 mb-3">{project.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-secondary/10 text-secondary/80 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center text-muted-foreground/60 text-sm mt-12"
        >
          Want to see more?{" "}
          <a href="/portfolio" className="text-secondary hover:text-primary font-medium animated-underline pb-0.5 transition-colors duration-300">View full portfolio →</a>
        </motion.p>
      </div>
    </section>
  );
};

export default PortfolioSection;
