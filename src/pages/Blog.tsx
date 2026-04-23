import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

type BlogPost = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  link?: string;
};

const blogPosts: BlogPost[] = [
  {
    title: "What is an AI Agent And How Businesses Are Using It in 2026",
    excerpt:
      "A clear breakdown of what AI agents are, how they work, and the practical ways forward-thinking businesses are deploying them in 2026.",
    category: "AI & Automation",
    date: "Apr 22, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80",
    author: "Code Reflections Team",
    link: "https://what-is-an-agent.netlify.app/blogs/what-is-an-ai-agent-how-businesses-are-using-it-in-2026",
  },
  {
    title: "The Future of Web Development in 2026",
    excerpt:
      "From AI-assisted coding to edge-first architectures, here are the trends defining how we build for the web this year.",
    category: "Web Development",
    date: "Feb 28, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=1600&q=80",
    author: "Code Reflections Team",
  },
  {
    title: "UI/UX Principles That Drive Conversions",
    excerpt:
      "Learn the design fundamentals that help premium brands convert visitors into loyal customers consistently.",
    category: "Design",
    date: "Feb 14, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b8?auto=format&fit=crop&w=1600&q=80",
    author: "Code Reflections Team",
  },
  {
    title: "Why Automation Is the New Competitive Advantage",
    excerpt:
      "Companies that automate repetitive workflows scale faster, reduce costs, and outperform their competitors.",
    category: "Automation",
    date: "Jan 30, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    author: "Code Reflections Team",
  },
  {
    title: "SEO in the Age of AI Search",
    excerpt:
      "How to optimize your content strategy as Google, Perplexity, and ChatGPT change the way users discover information.",
    category: "SEO",
    date: "Jan 18, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1600&q=80",
    author: "Code Reflections Team",
  },
  {
    title: "Building Scalable Digital Products",
    excerpt:
      "A practical framework for launching products that grow with your business — from MVP to enterprise scale.",
    category: "Product Strategy",
    date: "Jan 5, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80",
    author: "Code Reflections Team",
  },
];

const Blog = () => {
  const [featured, ...rest] = blogPosts;

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
              Insights & Stories
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-5 leading-tight">
              The Code Reflections Blog
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Thoughts on AI, web development, design, and the craft of
              building premium digital products.
            </p>
          </motion.div>

          {/* Featured Post */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto mb-16"
          >
            <a
              href={featured.link ?? "#"}
              target={featured.link ? "_blank" : undefined}
              rel={featured.link ? "noopener noreferrer" : undefined}
              className="block"
            >
            <Card className="group overflow-hidden border-border/60 hover:border-primary/40 transition-all duration-500 cursor-pointer">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative overflow-hidden aspect-[16/10] lg:aspect-auto">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 text-[10px] font-semibold text-primary-foreground bg-primary/90 backdrop-blur px-3 py-1.5 rounded-full uppercase tracking-wider">
                    Featured
                  </span>
                </div>
                <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="text-xs font-medium text-primary mb-4 uppercase tracking-[0.18em]">
                    {featured.category}
                  </span>
                  <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-card-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {featured.date}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} />
                      {featured.readTime}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                    Read article <ArrowRight size={14} />
                  </span>
                </CardContent>
              </div>
            </Card>
            </a>
          </motion.article>

          {/* Divider label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto flex items-center gap-4 mb-8"
          >
            <h3 className="font-display text-sm font-semibold text-foreground uppercase tracking-[0.2em]">
              Latest Articles
            </h3>
            <div className="flex-1 h-px bg-border/60" />
          </motion.div>

          {/* Grid of posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {rest.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="h-full group overflow-hidden border-border/60 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 cursor-pointer">
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                  </div>
                  <CardContent className="p-6 flex flex-col">
                    <span className="text-[11px] font-medium text-primary mb-3 uppercase tracking-[0.18em]">
                      {post.category}
                    </span>
                    <h2 className="font-display text-lg font-semibold text-card-foreground mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={11} />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={11} />
                          {post.readTime}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read <ArrowRight size={11} />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
