import { motion } from "framer-motion";

/**
 * Premium ambient aurora background — slow, elegant gradients
 * that give the entire page a living, breathing feel.
 */
const AmbientBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {/* Primary aurora sweep */}
    <motion.div
      className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%]"
      style={{
        background:
          "radial-gradient(ellipse 60% 40% at 20% 30%, hsl(250 40% 14% / 0.5) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 80% 60%, hsl(190 50% 12% / 0.35) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 50% 80%, hsl(270 30% 10% / 0.3) 0%, transparent 60%)",
      }}
      animate={{
        x: [0, 60, -40, 30, 0],
        y: [0, -40, 30, -20, 0],
        scale: [1, 1.05, 0.98, 1.03, 1],
      }}
      transition={{ duration: 30, ease: "easeInOut", repeat: Infinity }}
    />

    {/* Secondary deep glow */}
    <motion.div
      className="absolute top-0 right-0 w-[80%] h-[80%]"
      style={{
        background:
          "radial-gradient(ellipse 50% 50% at 70% 20%, hsl(250 50% 18% / 0.25) 0%, transparent 70%)",
      }}
      animate={{
        x: [0, -50, 30, -20, 0],
        y: [0, 40, -30, 20, 0],
        opacity: [0.6, 0.8, 0.5, 0.7, 0.6],
      }}
      transition={{ duration: 25, ease: "easeInOut", repeat: Infinity, delay: 5 }}
    />

    {/* Subtle mid-page accent */}
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
      style={{
        background: "radial-gradient(circle, hsl(190 60% 15% / 0.15) 0%, transparent 70%)",
      }}
      animate={{
        scale: [1, 1.3, 0.9, 1.15, 1],
        opacity: [0.3, 0.5, 0.25, 0.4, 0.3],
      }}
      transition={{ duration: 20, ease: "easeInOut", repeat: Infinity, delay: 8 }}
    />

    {/* Very faint horizontal light streak for depth */}
    <motion.div
      className="absolute top-[35%] left-0 w-full h-px"
      style={{
        background: "linear-gradient(90deg, transparent 0%, hsl(250 60% 58% / 0.06) 30%, hsl(190 80% 50% / 0.04) 70%, transparent 100%)",
      }}
      animate={{ opacity: [0, 0.6, 0, 0.4, 0] }}
      transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
    />
    <motion.div
      className="absolute top-[70%] left-0 w-full h-px"
      style={{
        background: "linear-gradient(90deg, transparent 0%, hsl(190 80% 50% / 0.05) 40%, hsl(250 60% 58% / 0.04) 60%, transparent 100%)",
      }}
      animate={{ opacity: [0, 0.4, 0, 0.5, 0] }}
      transition={{ duration: 15, ease: "easeInOut", repeat: Infinity, delay: 4 }}
    />
  </div>
);

export default AmbientBackground;
