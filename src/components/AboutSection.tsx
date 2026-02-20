import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-secondary uppercase tracking-widest">About Us</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6 leading-tight">
              We're Not Just Developers — We're a Digital{" "}
              <span className="gradient-text">Growth Partner</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The Code Reflections is a digital solutions team focused on creating modern and impactful online experiences. We don't just build websites — we build platforms that help businesses attract customers, build trust, and scale faster.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our goal is to deliver premium design, clean development, and real business results.
            </p>
            <Button variant="outline" className="group">
              Know More About Us
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: "50+", label: "Projects Delivered" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "24hr", label: "Response Time" },
              { value: "3+", label: "Years Experience" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border text-center"
              >
                <div className="font-display text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
