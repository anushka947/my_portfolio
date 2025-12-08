import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

function Particles({ count = 1000 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const isMobile = useIsMobile();
  const actualCount = isMobile ? Math.floor(count / 3) : count;
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(actualCount * 3);
    for (let i = 0; i < actualCount; i++) {
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 15;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, [actualCount]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ff3399"
        size={isMobile ? 0.03 : 0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function FloatingShape({ position, color, type, scale = 1 }: { position: [number, number, number]; color: string; type: "sphere" | "torus" | "box"; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  const actualScale = isMobile ? scale * 0.7 : scale;

  return (
    <Float speed={isMobile ? 1 : 2} rotationIntensity={isMobile ? 0.5 : 1} floatIntensity={isMobile ? 1 : 2}>
      <mesh
        ref={meshRef}
        position={position}
        scale={hovered ? actualScale * 1.2 : actualScale}
        onPointerOver={() => !isMobile && setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {type === "sphere" && <sphereGeometry args={[0.5, 32, 32]} />}
        {type === "torus" && <torusGeometry args={[0.4, 0.15, 16, 100]} />}
        {type === "box" && <boxGeometry args={[0.6, 0.6, 0.6]} />}
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={isMobile ? 0.2 : 0.3}
          speed={isMobile ? 1 : 2}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
        />
      </mesh>
    </Float>
  );
}

function MouseTracker() {
  const lightRef = useRef<THREE.PointLight>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x: x * 5, y: y * 5 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x += (mousePos.x - lightRef.current.position.x) * 0.1;
      lightRef.current.position.y += (mousePos.y - lightRef.current.position.y) * 0.1;
    }
  });

  return <pointLight ref={lightRef} color="#ff3399" intensity={2} distance={10} />;
}

function Scene() {
  const isMobile = useIsMobile();

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} color="#00d4ff" intensity={0.5} />
      <pointLight position={[-10, -10, -10]} color="#ff3399" intensity={0.5} />
      {!isMobile && <MouseTracker />}
      
      <Particles count={isMobile ? 400 : 1000} />
      
      <FloatingShape position={[-3, 2, -2]} color="#ff3399" type="sphere" />
      <FloatingShape position={[3, -1, -3]} color="#00d4ff" type="torus" />
      {!isMobile && (
        <>
          <FloatingShape position={[-2, -2, -4]} color="#9966ff" type="box" />
          <FloatingShape position={[2, 2, -5]} color="#00ff88" type="sphere" scale={0.8} />
          <FloatingShape position={[0, -3, -3]} color="#ff9900" type="torus" scale={0.7} />
        </>
      )}
      
      <Sphere args={[1.5, 64, 64]} position={[0, 0, -6]}>
        <MeshDistortMaterial
          color="#1a0a20"
          attach="material"
          distort={isMobile ? 0.2 : 0.4}
          speed={isMobile ? 1 : 1.5}
          roughness={0.1}
          metalness={0.9}
          emissive="#ff3399"
          emissiveIntensity={0.1}
        />
      </Sphere>
    </>
  );
}

export function HeroScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 -z-10 bg-background" />;
  }

  return (
    <div className="absolute inset-0 -z-10" data-testid="hero-scene">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
