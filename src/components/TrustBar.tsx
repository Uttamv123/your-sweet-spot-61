import { motion } from "framer-motion";

const TrustBar = () => {
  return (
    <section className="py-8 bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground tracking-wide"
        >
          Trusted by startups and growing service businesses across the{" "}
          <span className="font-semibold text-foreground">UK &amp; India</span>
        </motion.p>
      </div>
    </section>
  );
};

export default TrustBar;
