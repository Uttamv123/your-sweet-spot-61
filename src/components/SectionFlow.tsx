import { motion } from "framer-motion";

/**
 * Elegant visual connector placed between sections.
 * Renders a soft gradient glow + animated dot that travels along the line.
 */
export const SectionConnector = ({ variant = "default" }: { variant?: "default" | "accent" }) => {
  const color = variant === "accent"
    ? "hsl(190 80% 50% / 0.15)"
    : "hsl(250 60% 58% / 0.12)";

  return (
    <div className="relative py-2 flex justify-center">
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-px h-16 origin-top"
        style={{
          background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
        }}
      />
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full top-1/2 -translate-x-1/2 left-1/2"
        style={{
          background: variant === "accent"
            ? "hsl(190 80% 50% / 0.4)"
            : "hsl(250 60% 58% / 0.3)",
          boxShadow: variant === "accent"
            ? "0 0 12px hsl(190 80% 50% / 0.3)"
            : "0 0 12px hsl(250 60% 58% / 0.2)",
        }}
        animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
      />
    </div>
  );
};

/**
 * Ambient glow overlay for individual sections.
 * Adds a radial glow at a specified position to create depth.
 */
export const SectionGlow = ({
  position = "center",
  color = "primary",
}: {
  position?: "left" | "center" | "right";
  color?: "primary" | "secondary";
}) => {
  const posMap = { left: "20%", center: "50%", right: "80%" };
  const hue = color === "secondary" ? "190 80% 50%" : "250 60% 58%";

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{
          left: posMap[position],
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, hsl(${hue} / 0.4) 0%, transparent 70%)`,
        }}
      />
    </div>
  );
};
