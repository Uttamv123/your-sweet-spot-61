import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CookiePolicy = () => {
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
              Cookie Policy
            </h1>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              This Cookie Policy explains what cookies are, how The Code Reflections uses them on this website, and what you can do to manage them.
            </p>

            <div className="space-y-10">
              {/* Section 1 */}
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  1. What Are Cookies?
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Cookies are small text files placed on your device when you visit a website. They help the site remember information about your visit — such as your preferences or session state — so you don't have to re-enter details each time you return. Cookies cannot execute code or carry viruses.
                </p>
              </div>

              {/* Section 2 */}
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  2. Types of Cookies We Use
                </h2>
                <div className="space-y-4">
                  <div className="rounded-xl border border-border p-5">
                    <h3 className="font-display font-semibold text-foreground text-sm mb-2">Essential Cookies</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      These cookies are strictly necessary for the website to function. They enable core features such as page navigation and access to secure areas. The website cannot operate properly without them.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border p-5">
                    <h3 className="font-display font-semibold text-foreground text-sm mb-2">Analytics Cookies</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      These cookies help us understand how visitors interact with the website by collecting and reporting information anonymously. We may use services such as Google Analytics for this purpose.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  3. Cookies Set by This Site
                </h2>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="text-left px-4 py-3 font-semibold text-foreground">Name</th>
                        <th className="text-left px-4 py-3 font-semibold text-foreground">Purpose</th>
                        <th className="text-left px-4 py-3 font-semibold text-foreground">Duration</th>
                        <th className="text-left px-4 py-3 font-semibold text-foreground">Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-4 py-3 text-muted-foreground font-mono text-xs">cookie_notice_dismissed</td>
                        <td className="px-4 py-3 text-muted-foreground">Records that the visitor has acknowledged the cookie notice</td>
                        <td className="px-4 py-3 text-muted-foreground">Session / until cleared</td>
                        <td className="px-4 py-3 text-muted-foreground">Essential (localStorage)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-muted-foreground font-mono text-xs">_ga</td>
                        <td className="px-4 py-3 text-muted-foreground">Google Analytics — distinguishes unique visitors</td>
                        <td className="px-4 py-3 text-muted-foreground">2 years</td>
                        <td className="px-4 py-3 text-muted-foreground">Analytics</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-muted-foreground font-mono text-xs">_gid</td>
                        <td className="px-4 py-3 text-muted-foreground">Google Analytics — distinguishes visitors within a day</td>
                        <td className="px-4 py-3 text-muted-foreground">24 hours</td>
                        <td className="px-4 py-3 text-muted-foreground">Analytics</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 4 */}
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  4. Managing Cookies in Your Browser
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  You can control and delete cookies through your browser settings. Note that disabling cookies may affect the functionality of this and other websites.
                </p>
                <ul className="space-y-2">
                  {[
                    {
                      browser: "Google Chrome",
                      url: "https://support.google.com/chrome/answer/95647",
                    },
                    {
                      browser: "Mozilla Firefox",
                      url: "https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop",
                    },
                    {
                      browser: "Apple Safari",
                      url: "https://support.apple.com/guide/safari/manage-cookies-sfri11471",
                    },
                    {
                      browser: "Microsoft Edge",
                      url: "https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406",
                    },
                  ].map((item) => (
                    <li key={item.browser} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-0.5 text-secondary">•</span>
                      <span>
                        <span className="font-medium text-foreground">{item.browser}:</span>{" "}
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Cookie settings guide
                        </a>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 5 */}
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  5. Changes to This Policy
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-muted-foreground text-sm">
                For full details on how we handle your personal data, see our{" "}
                <Link to="/privacy-policy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                . If you have questions, contact us at{" "}
                <a href="mailto:contact@codereflections.com" className="text-primary hover:underline">
                  contact@codereflections.com
                </a>
                .
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
