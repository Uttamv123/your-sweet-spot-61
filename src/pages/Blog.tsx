import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const blogPosts = [
  {
    title: "How AI Agents Are Transforming Modern Businesses",
    excerpt:
      "Discover how autonomous AI agents are reshaping operations, customer service, and decision-making across industries.",
    category: "AI & Automation",
    date: "Mar 12, 2026",
  },
  {
    title: "The Future of Web Development in 2026",
    excerpt:
      "From AI-assisted coding to edge-first architectures, here are the trends defining how we build for the web this year.",
    category: "Web Development",
    date: "Feb 28, 2026",
  },
  {
    title: "UI/UX Principles That Drive Conversions",
    excerpt:
      "Learn the design fundamentals that help premium brands convert visitors into loyal customers consistently.",
    category: "Design",
    date: "Feb 14, 2026",
  },
  {
    title: "Why Automation Is the New Competitive Advantage",
    excerpt:
      "Companies that automate repetitive workflows scale faster, reduce costs, and outperform their competitors.",
    category: "Automation",
    date: "Jan 30, 2026",
  },
  {
    title: "SEO in the Age of AI Search",
    excerpt:
      "How to optimize your content strategy as Google, Perplexity, and ChatGPT change the way users discover information.",
    category: "SEO",
    date: "Jan 18, 2026",
  },
  {
    title: "Building Scalable Digital Products",
    excerpt:
      "A practical framework for launching products that grow with your business — from MVP to enterprise scale.",
    category: "Product Strategy",
    date: "Jan 5, 2026",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Blog & Insights
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Read our latest articles about website development, UI/UX design,
              SEO tips, and business growth strategies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full group hover:border-primary/40 transition-colors cursor-pointer">
                  <CardContent className="p-6 flex flex-col h-full">
                    <span className="text-xs font-medium text-primary mb-3 uppercase tracking-wider">
                      {post.category}
                    </span>
                    <h2 className="font-display text-lg font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Calendar size={12} />
                        {post.date}
                      </span>
                      <span className="text-xs text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More <ArrowRight size={12} />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
