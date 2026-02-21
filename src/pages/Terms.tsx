import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Services",
    content:
      "The Code Reflections provides website development, UI/UX design, web application development, SEO services, and maintenance support.",
  },
  {
    title: "2. Project Confirmation",
    content:
      "Projects begin only after confirmation, payment agreement, and final requirements discussion.",
  },
  {
    title: "3. Payments",
    content:
      "Payment terms will be discussed before starting the project. Advance payments may be required depending on project type.",
  },
  {
    title: "4. Revisions",
    content:
      "We provide revisions based on the plan chosen. Additional revisions beyond the agreed scope may include extra charges.",
  },
  {
    title: "5. Project Delivery Timeline",
    content:
      "Delivery timelines depend on project complexity and client feedback speed.",
  },
  {
    title: "6. Intellectual Property",
    content:
      "Once full payment is completed, the client owns the final website or design. The Code Reflections may showcase the project in our portfolio unless confidentiality is requested.",
  },
  {
    title: "7. Liability",
    content:
      "The Code Reflections is not responsible for losses caused by third-party hosting issues, downtime, or external service failures.",
  },
  {
    title: "8. Termination",
    content:
      "We reserve the right to terminate a project if there is a breach of agreement or misuse of services.",
  },
  {
    title: "9. Updates to Terms",
    content:
      "We may update these terms anytime. Changes will be posted on this page.",
  },
];

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-4xl font-bold text-foreground mb-4">
              Terms & Conditions
            </h1>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              By using The Code Reflections website and services, you agree to
              the following terms and conditions.
            </p>

            <div className="space-y-8">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                10. Contact Us
              </h2>
              <p className="text-muted-foreground text-sm">
                For any questions, contact us at:{" "}
                <a
                  href="mailto:contact@codereflections.com"
                  className="text-primary hover:underline"
                >
                  contact@codereflections.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
