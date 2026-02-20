import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Globe, Palette, Code2, ShoppingCart, Search, Wrench, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    description: "We build fast, responsive, and modern websites that look premium and perform smoothly across all devices.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "We design clean and modern user interfaces that improve user experience and build brand trust.",
  },
  {
    icon: Code2,
    title: "Web Application Development",
    description: "We build scalable web applications like dashboards, admin panels, and SaaS platforms.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Development",
    description: "We build e-commerce websites optimized for sales, speed, and smooth checkout experience.",
  },
  {
    icon: Search,
    title: "SEO & Performance Optimization",
    description: "We optimize websites for speed, SEO, and better ranking on Google.",
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    description: "We provide long-term maintenance so your website stays updated, secure, and smooth.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 gradient-subtle">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-secondary uppercase tracking-widest">Our Services</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Everything You Need to Build & Grow Online
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            All-in-one digital services to build, launch, and scale your business online.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={item}
              className="group bg-card p-8 rounded-2xl shadow-card hover:shadow-card-hover border border-border transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <service.icon size={22} className="text-accent-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-card-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">Not sure what you need? Start with a free consultation and we'll suggest the best plan.</p>
          <Button variant="hero" size="lg">
            Book a Free Call
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
