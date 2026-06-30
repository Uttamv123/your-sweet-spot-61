import { motion } from "framer-motion";

const TrustBar = () => {
  return (
    <section className="py-8 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center justify-center gap-3 relative"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-border origin-right relative"
          >
            <span className="absolute -top-[3px] right-0 w-1.5 h-1.5 rounded-full bg-secondary/80 animate-twinkle" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.15em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.05em" }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            className="text-center text-sm text-muted-foreground/70 tracking-wide cursor-default"
          >
            Trusted by startups and growing service businesses worldwide
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-border origin-left relative"
          >
            <span
              className="absolute -top-[3px] left-0 w-1.5 h-1.5 rounded-full bg-primary/80 animate-twinkle"
              style={{ animationDelay: "1.2s" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBar;
