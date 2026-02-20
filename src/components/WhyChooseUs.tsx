import { motion } from "framer-motion";
import { Award, Zap, Smartphone, Search, Shield, HeartHandshake } from "lucide-react";

const reasons = [
  { icon: Award, title: "Premium Design That Builds Trust", desc: "We create clean and professional design that improves brand credibility." },
  { icon: Zap, title: "Fast Delivery With Clear Process", desc: "We follow a structured workflow to deliver projects smoothly." },
  { icon: Smartphone, title: "Mobile-First & Responsive", desc: "Every website we build is optimized for mobile devices." },
  { icon: Search, title: "SEO-Friendly Structure", desc: "We develop websites with proper SEO foundations." },
  { icon: Shield, title: "Secure & Scalable Development", desc: "We follow best practices for performance and security." },
  { icon: HeartHandshake, title: "Support Even After Launch", desc: "We provide support even after the website is delivered." },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-secondary uppercase tracking-widest">Why Us</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Why People Choose <span className="gradient-text">The Code Reflections</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We focus on quality, modern design, and scalable development to help businesses grow faster.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <reason.icon size={20} className="text-secondary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
