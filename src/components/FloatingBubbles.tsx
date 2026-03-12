import { motion } from "framer-motion";

/**
 * Refined floating particles — subtle, elegant dots that drift upward
 * with gentle horizontal sway. Designed to feel premium, not playful.
 */
const particles = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  size: Math.random() * 3 + 1.5,
  x: Math.random() * 100,
  delay: Math.random() * 15,
  duration: Math.random() * 18 + 16,
  opacity: Math.random() * 0.08 + 0.02,
  blur: Math.random() > 0.5 ? 1 : 0,
}));

const FloatingBubbles = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {particles.map((p) => (
      <motion.div
        key={p.id}
        className="absolute rounded-full"
        style={{
          width: p.size,
          height: p.size,
          left: `${p.x}%`,
          bottom: `-${p.size + 10}px`,
          background: p.id % 3 === 0
            ? "hsl(190 80% 50%)"
            : "hsl(250 60% 58%)",
          filter: p.blur ? `blur(${p.blur}px)` : undefined,
        }}
        animate={{
          y: [0, -(typeof window !== "undefined" ? window.innerHeight : 1200) - 100],
          x: [0, Math.sin(p.id * 0.8) * 25, 0],
          opacity: [0, p.opacity, p.opacity * 0.8, 0],
        }}
        transition={{
          duration: p.duration,
          delay: p.delay,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    ))}
  </div>
);

export default FloatingBubbles;
