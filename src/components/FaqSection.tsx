import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "How long does a project take?", a: "Most projects are delivered within 4–8 weeks, depending on scope and complexity. We provide a clear timeline during the discovery phase." },
  { q: "Do you work with businesses globally?", a: "Yes, we work with startups and service businesses worldwide. Our remote-first approach allows us to collaborate seamlessly across regions." },
  { q: "What industries do you specialise in?", a: "We work across professional services, e-commerce, SaaS, and service-based businesses. Our systems-first approach applies to any industry." },
  { q: "Do you offer ongoing support?", a: "Yes. We provide maintenance, monitoring, and continuous improvement plans so your platform stays optimised after launch." },
  { q: "What is the typical investment range?", a: "Projects typically start from £2,000 for smaller builds, scaling based on complexity. We offer flexible partnership models — book a strategy call to discuss." },
];

const FaqSection = () => {
  return (
    <section id="faq" className="py-28 relative">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold text-secondary/80 uppercase tracking-[0.3em]">FAQ</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-5">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="gradient-border-card rounded-xl px-6 transition-all duration-500 data-[state=open]:shadow-elegant"
              >
                <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
