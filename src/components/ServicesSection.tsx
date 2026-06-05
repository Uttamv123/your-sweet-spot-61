import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Globe, Palette, Code2, Search, Wrench, ArrowRight } from "lucide-react";
import CalendlyModal from "@/components/CalendlyModal";

const services = [
  { icon: Globe, title: "Custom Web Development", description: "We build fast, conversion-focused, scalable websites tailored to your business model." },
  { icon: Code2, title: "AI Workflow Automation", description: "We eliminate repetitive tasks using intelligent automation systems that save time and reduce errors." },
  { icon: Wrench, title: "CRM & System Integration", description: "We connect your marketing, sales, and operations into one seamless ecosystem." },
  { icon: Palette, title: "UI/UX Optimisation", description: "We design intuitive digital experiences that increase engagement and retention." },
  { icon: Search, title: "Ongoing Maintenance & Support", description: "We keep your platform updated, secure, and continuously optimised after launch." },
];

const TiltCard = ({ children, className, delay }: { children: React.ReactNode; className?: string; delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const glareOpacity = useSpring(0, { stiffness: 300, damping: 30 });

  // Detect coarse pointer once at render time (SSR-safe)
  const isCoarsePointer =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  const handleMouse = isCoarsePointer ? undefined : (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    glareOpacity.set(0.15);
  };

  const handleLeave = isCoarsePointer ? undefined : () => {
    x.set(0);
    y.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={
        isCoarsePointer
          ? { transformStyle: "preserve-3d", perspective: 800 }
          : { rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }
      }
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
      {!isCoarsePointer && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            opacity: glareOpacity,
            background: "linear-gradient(135deg, hsl(250 60% 58% / 0.3), transparent 60%)",
          }}
        />
      )}
    </motion.div>
  );
};

const ServicesSection = () => {
  const [calendlyOpen, setCalendlyOpen] = useState(false);

  return (
    <section id="services" className="py-28 relative overflow-hidden">
      {/* Subtle background image — code/tech theme */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.10] pointer-events-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1800&q=80')",
        }}
      />
      {/* Heavy top + bottom fades so image melts into page */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-secondary/80 uppercase tracking-[0.3em]">Our Services</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-5">
            Structured &amp; <span className="gradient-text">Premium</span> Digital Services
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            End-to-end digital solutions built to scale your business, automate operations, and drive measurable results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <TiltCard
              key={service.title}
              delay={i * 0.08}
              className="relative group gradient-border-card rounded-2xl p-8 cursor-default"
            >
              <div className="w-11 h-11 rounded-xl gradient-accent flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-glow-sm transition-all duration-500 ease-out">
                <service.icon size={20} className="text-accent-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-card-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </TiltCard>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-14"
        >
          <p className="text-muted-foreground/70 mb-5 text-sm">Not sure what you need? Start with a free consultation.</p>
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
