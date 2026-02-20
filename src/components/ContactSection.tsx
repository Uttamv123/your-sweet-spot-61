import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-secondary uppercase tracking-widest">Contact Us</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Let's Build Something <span className="gradient-text">Great Together</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Share your requirements and we'll get back within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">Let's Discuss Your Project</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Tell us what you need, and we'll get back to you with the best solution, timeline, and pricing.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: Mail, label: "hello@thecodereflections.com" },
                { icon: Phone, label: "+91 XXXXX XXXXX" },
                { icon: MapPin, label: "India (Remote)" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <c.icon size={16} className="text-secondary" />
                  </div>
                  <span className="text-sm text-muted-foreground">{c.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-card"
              />
              <Input
                placeholder="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-card"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-card"
              />
              <Input
                placeholder="Company Name (Optional)"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="bg-card"
              />
            </div>
            <Textarea
              placeholder="Tell us about your project..."
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-card resize-none"
            />
            <Button variant="hero" size="lg" type="submit" className="w-full sm:w-auto">
              Send Message
              <Send size={16} className="ml-2" />
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
