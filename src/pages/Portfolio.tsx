import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

type Project = {
  title: string;
  category: string;
  description: string;
  image: string;
  link?: string;
  tags: string[];
};

const projects: Project[] = [
  {
    title: "Real Estate Property Marketplace",
    category: "Real Estate · Web Platform",
    description:
      "A modern property buying and selling platform with rich listings, advanced search, and a streamlined inquiry flow — designed to help buyers discover homes and sellers list properties effortlessly.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80",
    link: "https://1housetohome.netlify.app/",
    tags: ["Next.js", "Responsive UI", "Lead Capture"],
  },
];

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14 max-w-3xl mx-auto"
          >
            <span className="inline-block text-xs font-medium text-primary uppercase tracking-[0.2em] mb-4">
              Our Work
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-5 leading-tight">
              Portfolio & Project Samples
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              A curated selection of websites, platforms, and digital products
              we've designed and built. Click any project to explore the live
              sample.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 30, scale: 0.96, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -10, transition: { duration: 0.35, ease: "easeOut" } }}
                style={{ perspective: 800 }}
              >
                <a
                  href={project.link ?? "#"}
                  target={project.link && project.link !== "#" ? "_blank" : undefined}
                  rel={project.link && project.link !== "#" ? "noopener noreferrer" : undefined}
                  className="block"
                >
                  <Card className="h-full group overflow-hidden border-border/60 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer">
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110 group-hover:rotate-1"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
                      {/* sheen sweep on hover */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                      <motion.span
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-4 left-4 text-[10px] font-semibold text-primary-foreground bg-primary/90 backdrop-blur px-3 py-1.5 rounded-full uppercase tracking-wider shadow-glow-sm"
                      >
                        Live Sample
                      </motion.span>
                    </div>
                    <CardContent className="p-6 flex flex-col">
                      <span className="text-[11px] font-medium text-primary mb-3 uppercase tracking-[0.18em]">
                        {project.category}
                      </span>
                      <h2 className="font-display text-lg font-semibold text-card-foreground mb-3 leading-snug group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-medium text-muted-foreground bg-muted/40 border border-border/50 px-2.5 py-1 rounded-full uppercase tracking-wider transition-all duration-300 hover:bg-primary/10 hover:border-primary/40 hover:text-foreground hover:-translate-y-0.5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-3 transition-all duration-300 mt-auto">
                        View project <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-300" />
                      </span>
                    </CardContent>
                  </Card>
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
