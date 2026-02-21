import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const blogPosts = [
  {
    title: "Why Every Business Needs a Professional Website in 2026",
    excerpt:
      "Discover why a modern, professional website is essential for business growth, credibility, and customer acquisition in the digital age.",
    date: "Feb 15, 2026",
    category: "Business Growth",
  },
  {
    title: "Top 5 UI/UX Design Trends You Need to Know",
    excerpt:
      "Explore the latest UI/UX design trends shaping the web — from bold typography to micro-interactions and immersive layouts.",
    date: "Feb 10, 2026",
    category: "Design",
  },
  {
    title: "SEO Basics: How to Rank Your Website on Google",
    excerpt:
      "Learn the fundamental SEO strategies to improve your website's visibility, drive organic traffic, and rank higher on search engines.",
    date: "Feb 5, 2026",
    category: "SEO",
  },
  {
    title: "How to Choose the Right Web Development Partner",
    excerpt:
      "Not sure how to pick a web development team? Here's what to look for in terms of expertise, communication, and delivery.",
    date: "Jan 28, 2026",
    category: "Web Development",
  },
  {
    title: "E-Commerce Website Essentials for Startups",
    excerpt:
      "Building an online store? Learn the must-have features, payment integrations, and design principles for a successful e-commerce site.",
    date: "Jan 20, 2026",
    category: "E-Commerce",
  },
  {
    title: "The Importance of Website Speed and Performance",
    excerpt:
      "Slow websites lose visitors. Discover practical tips to optimize your site's loading speed and improve user experience.",
    date: "Jan 12, 2026",
    category: "Performance",
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
