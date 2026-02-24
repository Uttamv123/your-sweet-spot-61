import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How long does a project take?",
    a: "Most projects are delivered within 4–8 weeks, depending on scope and complexity. We provide a clear timeline during the discovery phase.",
  },
  {
    q: "Do you work with UK businesses only?",
    a: "We primarily serve UK startups and service businesses, but we also work with clients in India and other regions.",
  },
  {
    q: "What industries do you specialise in?",
    a: "We work across professional services, e-commerce, SaaS, and service-based businesses. Our systems-first approach applies to any industry.",
  },
  {
    q: "Do you offer ongoing support?",
    a: "Yes. We provide maintenance, monitoring, and continuous improvement plans so your platform stays optimised after launch.",
  },
  {
    q: "What is the typical investment range?",
    a: "Projects typically start from £2,000 for smaller builds, scaling based on complexity. We offer flexible partnership models — book a strategy call to discuss.",
  },
];

const FaqSection = () => {
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-secondary uppercase tracking-widest">FAQ</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
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
