import { motion } from "framer-motion";
import { Award, Zap, Smartphone, Search, Shield, HeartHandshake } from "lucide-react";

const reasons = [
  { icon: Award, title: "Premium Design That Builds Authority", desc: "We create clean, professional designs that build credibility with UK clients." },
  { icon: Zap, title: "Structured 5-Step Delivery", desc: "Our delivery framework ensures transparency and smooth execution at every stage." },
  { icon: Smartphone, title: "Mobile-First & Responsive", desc: "Every platform we build is fully optimised for mobile devices." },
  { icon: Search, title: "SEO & Conversion Focused", desc: "We build with proper SEO foundations and conversion-focused layouts." },
  { icon: Shield, title: "Secure & Scalable Systems", desc: "We follow best practices for performance, security, and scalability." },
  { icon: HeartHandshake, title: "Ongoing Support & Optimisation", desc: "We provide continuous support and improvement after launch." },
];

const WhyChooseUs = () => {
  return (
    <section className="py-28 relative">
      <div className="section-divider mb-28" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-secondary/80 uppercase tracking-[0.3em]">Why Us</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-5">
            Why People Choose <span className="gradient-text">Code Reflections</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
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
              transition={{ delay: i * 0.06, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex gap-5 group"
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 group-hover:shadow-glow-sm transition-all duration-500 ease-out">
                <reason.icon size={18} className="text-primary transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1.5">{reason.title}</h3>
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
