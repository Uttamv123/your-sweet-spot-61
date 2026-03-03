import { motion } from "framer-motion";

const TrustBar = () => {
  return (
    <section className="py-8 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center justify-center gap-3"
        >
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-border" />
          <p className="text-center text-sm text-muted-foreground/70 tracking-wide">
            Trusted by startups and growing service businesses worldwide
          </p>
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-border" />
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBar;
