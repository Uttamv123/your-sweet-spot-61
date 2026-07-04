import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useRef } from "react";

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

type Project = (typeof projects)[number];

const TiltCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);

  const rotateX = useSpring(rx, { stiffness: 200, damping: 20, mass: 0.4 });
  const rotateY = useSpring(ry, { stiffness: 200, damping: 20, mass: 0.4 });
  const glowBg = useTransform(
    [gx, gy],
    ([x, y]: number[]) =>
      `radial-gradient(500px circle at ${x}% ${y}%, hsl(250 60% 58% / 0.22), transparent 45%)`,
  );

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 12);
    rx.set(-(py - 0.5) * 12);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.12, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ perspective: 1000 }}
      className="block cursor-pointer group"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="portfolio-3d-card rounded-2xl overflow-hidden relative"
      >
        {/* ambient hover glow */}
        <motion.div
          aria-hidden
          style={{ background: glowBg }}
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        />

        <div className="relative h-48 overflow-hidden p3d-layer p3d-media">
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
          {/* sheen sweep */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1400ms] ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 p3d-layer p3d-badge">
            <ExternalLink size={14} className="text-foreground" />
          </div>
        </div>
        <div className="p-6 relative z-10">
          <span className="text-[10px] text-secondary/70 font-semibold uppercase tracking-[0.2em] p3d-layer p3d-title inline-block">
            {project.category}
          </span>
          <h3 className="font-display text-lg font-semibold text-card-foreground mt-2 mb-3 p3d-layer p3d-title">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 p3d-layer p3d-desc">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 p3d-layer p3d-tags">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2.5 py-1 rounded-full bg-secondary/10 text-secondary/80 font-medium transition-transform duration-300 group-hover:-translate-y-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.a>
  );
};

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
            <TiltCard key={project.title} project={project} index={i} />
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
