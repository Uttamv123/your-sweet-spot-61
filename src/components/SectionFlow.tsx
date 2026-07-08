/**
 * Liquid Glass section transitions — Apple-inspired sticky refractive strip
 * that blurs and highlights the content scrolling underneath it.
 */
export const SectionConnector = ({ variant = "default" }: { variant?: "default" | "accent" }) => {
  return (
    <div
      aria-hidden="true"
      className="liquid-glass-divider"
      style={
        variant === "accent"
          ? {
              background:
                "linear-gradient(180deg, hsl(190 50% 12% / 0.22) 0%, hsl(250 40% 14% / 0.38) 50%, hsl(190 50% 12% / 0.22) 100%)",
            }
          : undefined
      }
    />
  );
};

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
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.05]"
        style={{
          left: posMap[position],
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, hsl(${hue} / 0.5) 0%, transparent 70%)`,
        }}
      />
    </div>
  );
};
