import { motion } from "framer-motion";
import { Award, Zap, Smartphone, Search, Shield, HeartHandshake } from "lucide-react";

const reasons = [
  { icon: Award, title: "Premium Design That Builds Authority", desc: "We create clean, professional designs that build credibility with clients worldwide." },
  { icon: Zap, title: "Structured 5-Step Delivery", desc: "Our delivery framework ensures transparency and smooth execution at every stage." },
  { icon: Smartphone, title: "Mobile-First & Responsive", desc: "Every platform we build is fully optimised for mobile devices." },
  { icon: Search, title: "SEO & Conversion Focused", desc: "We build with proper SEO foundations and conversion-focused layouts." },
  { icon: Shield, title: "Secure & Scalable Systems", desc: "We follow best practices for performance, security, and scalability." },
  { icon: HeartHandshake, title: "Ongoing Support & Optimisation", desc: "We provide continuous support and improvement after launch." },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const WhyChooseUs = () => {
  return (
    <section className="py-28 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold text-secondary/80 uppercase tracking-[0.3em] inline-block"
          >
            Why Us
          </motion.span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-5">
            Why People Choose <span className="gradient-text">Code Reflections</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            We focus on quality, modern design, and scalable development to help businesses grow faster.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="flex gap-5 group cursor-default relative overflow-hidden rounded-xl p-4 -m-4 transition-shadow duration-500 hover:shadow-card"
            >
              {/* Sheen sweep on hover */}
              <span
                className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1400ms] ease-out opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 35%, hsl(250 60% 58% / 0.08) 50%, transparent 65%)",
                }}
              />

              <motion.div
                className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 group-hover:shadow-glow-sm transition-all duration-500 ease-out relative z-10"
                whileHover={{
                  rotate: [0, -15, 15, -10, 0],
                  scale: 1.15,
                  transition: { duration: 0.5 },
                }}
              >
                <reason.icon size={18} className="text-primary" />
              </motion.div>
              <div className="relative z-10">
                <h3 className="font-display font-semibold text-foreground mb-1.5 transition-transform duration-300 group-hover:translate-x-1">
                  {reason.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed transition-opacity duration-300 group-hover:opacity-90">
                  {reason.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
