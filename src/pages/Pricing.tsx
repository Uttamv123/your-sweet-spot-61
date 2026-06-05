import { motion } from "framer-motion";
import { Check, ArrowRight, Zap, Star, Shield } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import CalendlyModal from "@/components/CalendlyModal";

const freeTier = {
  name: "Free — Starter Partnership",
  price: "₹0",
  priceNote: "No upfront cost. Ever.",
  badge: "For Beginners",
  badgeColor: "text-secondary",
  description:
    "We build your website for free and grow alongside you. You pay nothing until your business starts generating revenue.",
  features: [
    "Full custom website design & development",
    "Responsive across all devices",
    "SEO-ready structure out of the box",
    "Basic AI automation integrations",
    "Ongoing support until first revenue",
    "Revenue-share model after launch",
  ],
  cta: "Start for Free",
  highlight: false,
};

const customTier = {
  name: "Custom — Pro Plan",
  price: "$10",
  priceNote: "per month",
  badge: "Most Popular",
  badgeColor: "text-primary",
  description:
    "Full website ownership, advanced features, and dedicated support — everything you need to scale professionally.",
  features: [
    "Everything in Free tier",
    "Full website ownership from day one",
    "Custom domain + hosting setup",
    "Advanced AI workflow automation",
    "Priority support (24-hr response)",
    "Monthly performance reports",
    "Scalable to any traffic volume",
    "Tailored to your specific business needs",
  ],
  cta: "Get Started",
  highlight: true,
};

const faqs = [
  {
    q: "What exactly is the Free tier?",
    a: "We partner with you — we design and build the site at zero cost. After your business starts generating revenue, we take a small percentage share. No hidden fees.",
  },
  {
    q: "What does the $10/month Custom plan include?",
    a: "You get full website ownership, hosting setup, AI automation, priority support, and monthly reports. It's built entirely around your requirements.",
  },
  {
    q: "Can I upgrade from Free to Custom later?",
    a: "Absolutely. You can switch to the Custom plan at any time and we'll migrate everything cleanly with no interruption to your site.",
  },
  {
    q: "Are there any setup fees?",
    a: "None. The Free tier is genuinely free, and the Custom plan starts at $10/month flat — no onboarding fees.",
  },
];

const Pricing = () => {
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background photo — very low opacity so text is crystal clear */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.08]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/98 via-background/95 to-background" />
        {/* Accent glows */}
        <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-48 h-48 rounded-full bg-secondary/8 blur-[60px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
                Transparent Pricing
              </span>
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Simple Plans.{" "}
              <span className="gradient-text">Zero Surprises.</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Start completely free and grow with us — or jump straight into the
              Custom plan with full ownership and dedicated support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Pricing Cards ── */}
      <section className="pb-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[freeTier, customTier].map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`relative rounded-3xl p-8 md:p-10 flex flex-col border transition-all duration-500 ${
                  tier.highlight
                    ? "border-primary/40 bg-card shadow-glow"
                    : "border-border bg-card shadow-card"
                }`}
              >
                {/* Popular badge */}
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-glow-sm">
                      <Star size={11} fill="white" />
                      {tier.badge}
                    </span>
                  </div>
                )}

                {!tier.highlight && (
                  <span
                    className={`text-xs font-semibold ${tier.badgeColor} uppercase tracking-widest mb-4 block`}
                  >
                    {tier.badge}
                  </span>
                )}

                {tier.highlight && <div className="mb-4" />}

                <h2 className="font-display text-xl font-bold text-foreground mb-2">
                  {tier.name}
                </h2>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {tier.description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <span
                    className={`font-display text-5xl font-bold ${
                      tier.highlight ? "gradient-text" : "text-foreground"
                    }`}
                  >
                    {tier.price}
                  </span>
                  <span className="text-muted-foreground text-sm ml-2">
                    {tier.priceNote}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-10 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 rounded-full p-0.5 ${
                          tier.highlight
                            ? "text-primary"
                            : "text-secondary"
                        }`}
                      >
                        <Check size={15} />
                      </span>
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={tier.highlight ? "hero" : "outline"}
                  size="lg"
                  className="w-full"
                  onClick={() => setCalendlyOpen(true)}
                >
                  {tier.cta}
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us Strip ── */}
      <section className="py-16 relative overflow-hidden">
        {/* Subtle background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-background" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center"
          >
            {[
              {
                icon: <Zap size={22} className="text-secondary" />,
                title: "No Hidden Fees",
                desc: "What you see is what you pay. No surprise invoices.",
              },
              {
                icon: <Shield size={22} className="text-primary" />,
                title: "Risk-Free Start",
                desc: "Begin with zero investment. Scale when you're ready.",
              },
              {
                icon: <Star size={22} className="text-secondary" />,
                title: "Custom-Tailored",
                desc: "Every plan is adapted to your specific business goals.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="gradient-border-card rounded-2xl p-7 hover-lift"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-muted/60 mb-4">
                  {item.icon}
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold text-secondary uppercase tracking-widest">
              FAQs
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">
              Common Questions
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="border border-border rounded-2xl overflow-hidden"
              >
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-muted/20 transition-colors duration-200"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="font-display font-semibold text-foreground text-sm">
                    {faq.q}
                  </span>
                  <span
                    className={`text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
                      openFaq === i ? "rotate-45" : ""
                    }`}
                  >
                    <ArrowRight size={16} />
                  </span>
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-6 pb-5"
                  >
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.08]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/96 to-background" />
        <div className="absolute inset-0 bg-primary/5" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Not Sure Which Plan{" "}
              <span className="gradient-text">Fits You?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Book a free 15-minute strategy call and we'll walk you through the
              best option for your specific goals — no pressure, no sales pitch.
            </p>
            <Button
              variant="hero"
              size="lg"
              className="text-base px-10 py-6"
              onClick={() => setCalendlyOpen(true)}
            >
              Book a Free Strategy Call
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <CalendlyModal open={calendlyOpen} onOpenChange={setCalendlyOpen} />
    </div>
  );
};

export default Pricing;
