import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mail, MapPin, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

type FormErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((err) => { fieldErrors[err.path[0] as keyof FormErrors] = err.message; });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone || null,
        company: result.data.company || null,
        message: result.data.message,
      });
      if (error) throw error;

      // Send email notification
      await supabase.functions.invoke("send-contact-email", {
        body: {
          name: result.data.name,
          email: result.data.email,
          company: result.data.company || "",
          message: result.data.message,
        },
      });

      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
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
          <span className="text-xs font-semibold text-secondary/80 uppercase tracking-[0.3em]">Contact Us</span>
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
                { icon: Mail, label: "careers@thecodereflections.com" },
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
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-3 space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Input
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
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="Company Name (Optional)" value={formData.company} onChange={(e) => handleChange("company", e.target.value)} className="bg-muted/30 border-border/60 focus:border-primary/50 transition-colors duration-300" disabled={isSubmitting} />
              </div>
              <div>
                <Textarea
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
