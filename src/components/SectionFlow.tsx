/**
 * Invisible section spacer — no visual line, keeps sections flowing as one page.
 */
export const SectionConnector = ({ variant = "default" }: { variant?: "default" | "accent" }) => {
  return <div className="h-0" aria-hidden="true" />;
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
