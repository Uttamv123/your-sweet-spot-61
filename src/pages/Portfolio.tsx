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
    link: "#",
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <a
                  href={project.link ?? "#"}
                  target={project.link && project.link !== "#" ? "_blank" : undefined}
                  rel={project.link && project.link !== "#" ? "noopener noreferrer" : undefined}
                  className="block"
                >
                  <Card className="h-full group overflow-hidden border-border/60 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 cursor-pointer">
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                      <span className="absolute top-4 left-4 text-[10px] font-semibold text-primary-foreground bg-primary/90 backdrop-blur px-3 py-1.5 rounded-full uppercase tracking-wider">
                        Live Sample
                      </span>
                    </div>
                    <CardContent className="p-6 flex flex-col">
                      <span className="text-[11px] font-medium text-primary mb-3 uppercase tracking-[0.18em]">
                        {project.category}
                      </span>
                      <h2 className="font-display text-lg font-semibold text-card-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-medium text-muted-foreground bg-muted/40 border border-border/50 px-2.5 py-1 rounded-full uppercase tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all mt-auto">
                        View project <ArrowUpRight size={14} />
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
