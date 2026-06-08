import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Information We Collect",
    items: [
      "Name, email address, phone number",
      "Business information (if provided)",
      "Project details shared through forms",
      "Website usage data (analytics cookies)",
    ],
  },
  {
    title: "2. How We Use the Information",
    items: [
      "Respond to inquiries",
      "Provide project quotes and services",
      "Improve our website and customer experience",
      "Communicate about services, updates, or offers",
    ],
  },
  {
    title: "3. Cookies & Consent",
    content: null,
    cookiesSection: true,
  },
  {
    title: "4. Data Protection",
    content:
      "We take reasonable steps to protect user information from unauthorized access, loss, or misuse.",
  },
  {
    title: "5. Third-Party Services",
    content:
      "We may use third-party services like Google Analytics or hosting providers.",
  },
  {
    title: "6. Sharing Information",
    content:
      "We do not sell or trade personal information. We may share information only if required by law or to deliver services.",
  },
  {
    title: "7. Changes to Privacy Policy",
    content:
      "We may update this policy at any time. Updated versions will be posted on this page.",
  },
];

const PrivacyPolicy = () => {
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
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              At The Code Reflections, we respect privacy and are committed to
              protecting personal information. This Privacy Policy explains how
              we collect, use, and protect data when users visit our website or
              contact us.
            </p>

            <div className="space-y-8">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                    {section.title}
                  </h2>
                  {section.items ? (
                    <ul className="list-disc list-inside space-y-1.5 text-muted-foreground text-sm leading-relaxed">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : section.cookiesSection ? (
                    <div className="text-muted-foreground text-sm leading-relaxed space-y-3">
                      <p>
                        We use cookies to keep this website running smoothly and to understand how visitors use it. When you visit the site, a value is stored in your browser's <code className="text-xs bg-muted px-1 py-0.5 rounded">localStorage</code> under the key <code className="text-xs bg-muted px-1 py-0.5 rounded">cookie_notice_dismissed</code> to record that you have acknowledged the cookie notice.
                      </p>
                      <p>
                        If you wish to withdraw acknowledgement, you can clear this entry at any time via your browser's developer tools (Application → Local Storage) or by clearing your browser's site data for this domain.
                      </p>
                      <p>
                        For a full breakdown of the cookies used on this site, visit our{" "}
                        <Link to="/cookie-policy" className="text-primary hover:underline">
                          Cookie Policy
                        </Link>
                        .
                      </p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {section.content}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                Contact Us
              </h2>
              <p className="text-muted-foreground text-sm">
                If you have questions about this Privacy Policy, contact us at:{" "}
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

export default PrivacyPolicy;
