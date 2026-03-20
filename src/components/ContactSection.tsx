import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mail, MapPin, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type FormErrors = { name?: string; email?: string; message?: string };

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "Valid email is required";
    if (!formData.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length) { setErrors(fieldErrors); return; }

    setIsSubmitting(true);
    setErrors({});

    try {
      const res = await fetch("/.netlify/functions/send-contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to send");
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    } catch {
      toast({ title: "Something went wrong", description: "Please try again or email us directly.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-28 relative">
      <div className="section-divider mb-28" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs font-semibold text-secondary/80 uppercase tracking-[0.3em] inline-block"
          >
            Contact Us
          </motion.span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-5">
            Let's Build Something <span className="gradient-text">Great Together</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Share your requirements and we'll get back within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-14 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
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
                { icon: Mail, label: "support@thecodereflections.com" },
                { icon: MapPin, label: "Remote" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors duration-300">
                    <c.icon size={16} className="text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">{c.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="lg:col-span-3 flex flex-col items-center justify-center text-center py-16 gradient-border-card rounded-2xl"
            >
              <CheckCircle size={48} className="text-secondary mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
              <p className="text-muted-foreground text-sm mb-6">We'll get back to you within 24 hours.</p>
              <Button variant="outline" onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
            </motion.div>
          ) : (
            <motion.form
              name="contact"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-3 space-y-4"
            >
              <input type="hidden" name="form-name" value="contact" />
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    name="name"
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`bg-muted/30 border-border/60 focus:border-primary/50 transition-colors duration-300 ${errors.name ? "border-destructive" : ""}`}
                    disabled={isSubmitting}
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Input
                    name="email"
                    placeholder="Email Address *"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`bg-muted/30 border-border/60 focus:border-primary/50 transition-colors duration-300 ${errors.email ? "border-destructive" : ""}`}
                    disabled={isSubmitting}
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder="Tell us about your project... *"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className={`bg-muted/30 border-border/60 focus:border-primary/50 resize-none transition-colors duration-300 ${errors.message ? "border-destructive" : ""}`}
                  disabled={isSubmitting}
                />
                {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
              </div>
              <Button variant="hero" size="lg" type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 size={16} className="mr-2 animate-spin" />Sending...</> : <>Send Message<Send size={16} className="ml-2" /></>}
              </Button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
