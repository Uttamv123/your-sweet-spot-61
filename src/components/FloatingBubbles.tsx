import { motion } from "framer-motion";

const bubbles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: Math.random() * 8 + 3,
  x: Math.random() * 100,
  delay: Math.random() * 10,
  duration: Math.random() * 12 + 10,
  opacity: Math.random() * 0.15 + 0.03,
}));

const FloatingBubbles = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {bubbles.map((b) => (
      <motion.div
        key={b.id}
        className="absolute rounded-full bg-primary"
        style={{
          width: b.size,
          height: b.size,
          left: `${b.x}%`,
          bottom: `-${b.size}px`,
          opacity: b.opacity,
        }}
        animate={{
          y: [0, -window.innerHeight - 100],
          x: [0, Math.sin(b.id) * 40, 0],
          opacity: [0, b.opacity, b.opacity, 0],
        }}
        transition={{
          duration: b.duration,
          delay: b.delay,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    ))}
  </div>
);

export default FloatingBubbles;
