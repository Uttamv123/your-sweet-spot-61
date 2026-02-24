import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Globe, Palette, Code2, Search, Wrench, ArrowRight } from "lucide-react";
import CalendlyModal from "@/components/CalendlyModal";

const services = [
  {
    icon: Globe,
    title: "Custom Web Development",
    description: "We build fast, conversion-focused, scalable websites tailored to your business model.",
  },
  {
    icon: Code2,
    title: "AI Workflow Automation",
    description: "We eliminate repetitive tasks using intelligent automation systems that save time and reduce errors.",
  },
  {
    icon: Wrench,
    title: "CRM & System Integration",
    description: "We connect your marketing, sales, and operations into one seamless ecosystem.",
  },
  {
    icon: Palette,
    title: "UI/UX Optimisation",
    description: "We design intuitive digital experiences that increase engagement and retention.",
  },
  {
    icon: Search,
    title: "Ongoing Maintenance & Support",
    description: "We keep your platform updated, secure, and continuously optimised after launch.",
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
  const [calendlyOpen, setCalendlyOpen] = useState(false);

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
            Structured &amp; <span className="gradient-text">Premium</span> Digital Services
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            End-to-end digital solutions built to scale your business, automate operations, and drive measurable results.
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
          <Button variant="hero" size="lg" onClick={() => setCalendlyOpen(true)}>
            Book a Free Call
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </motion.div>
      </div>

      <CalendlyModal open={calendlyOpen} onOpenChange={setCalendlyOpen} />
    </section>
  );
};

export default ServicesSection;
