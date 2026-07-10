import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const ParticleField = () => {
  const ref = useRef<THREE.Points>(null!);
  const { mouse } = useThree();

  const positions = useMemo(() => {
    const count = typeof window !== "undefined" && window.innerWidth < 768 ? 900 : 2200;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.5 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.04;
    ref.current.rotation.x += delta * 0.015;
    // subtle parallax to cursor
    const targetX = mouse.y * 0.15;
    const targetY = mouse.x * 0.25;
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.02;
    ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.02;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#60a5fa"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const GlowOrb = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.25;
    ref.current.position.x = position[0] + Math.cos(t * 0.4) * 0.15;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[0.6, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.12} />
    </mesh>
  );
};

const HeroScene = () => {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.4} />
      <ParticleField />
      <GlowOrb position={[-3, 1.5, -2]} color="#3B82F6" scale={1.6} />
      <GlowOrb position={[3, -1, -1]} color="#a855f7" scale={1.4} />
      <GlowOrb position={[2, 2, -3]} color="#06b6d4" scale={1.2} />
    </Canvas>
  );
};

export default HeroScene;
